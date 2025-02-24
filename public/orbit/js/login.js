webix.ui({
  view: "form",
  id: "loginForm",
  container: "login-card",
  css: "loginForm",
  elements: [
    {
      id: "row",
      margin: 10,
      rows: [
        {
          view: "text",
          name: "username",
          id: "username",
          label: "Username",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "text",
          type: "password",
          name: "password",
          id: "password",
          label: "Password",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        { view: "button", value: "Masuk", css: "btnmasuk", click: submit_form },
      ],
    },
  ],
  rules: {
    password: webix.rules.isNotEmpty,
    username: webix.rules.isNotEmpty,
  },
});

function submit_form() {
  const form = $$("loginForm");
  if (form.validate()) {
    var formData = form.getValues();
    webix
      .ajax()
      // .headers({ Authorization: "Bearer " + token })
      .post("http://localhost:3000/orbit/api/login", formData)
      .then(function (data) {
        var datanya = JSON.parse(data.text());
        document.cookie = `token=${datanya.data}; path=/; max-age=${
          60 * 60
        }; Secure; SameSite=Strict`;
        form.clear();
        webix.message({
          type: "success",
          text: "Login berhasil",
        });
        setTimeout(() => {
          window.location.href = "/transaksi/hawb";
        }, 1300);
      })
      .catch(function (err) {
        console.error("Error loading data:", err);
        webix.message({ type: "error", text: err.responseText });
      });
  }
}
