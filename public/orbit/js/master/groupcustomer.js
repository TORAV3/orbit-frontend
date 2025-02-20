function loadData() {
  axios
    .get("http://localhost:3000/orbit/api/master/groupcustomer/data")
    .then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const formattedData = res.data.data.map((item) => {
          return {
            code: item.cltbcust_cspickupzone, // Map API field to "code"
            name: item.groupdesc, // Map API field to "name"
          };
        });

        $$("customerTable").clearAll();
        $$("customerTable").hideOverlay();
        $$("customerTable").parse(formattedData);
      } else {
        $$("customerTable").clearAll();
        $$("customerTable").showOverlay("No data found");
      }
    })
    .catch((err) => {
      $$("customerTable").clearAll();
      $$("customerTable").showOverlay("Failed to load data.");
      console.error("Error fetching data:", err);
    });
}

function clearForm() {
  $$("inputForm").clear();
  $$("inputForm").elements.code.enable();
}

function deleteItem() {
  var id = $$("customerTable").getSelectedId();

  if (id) {
    var selectedData = $$("customerTable").getItem(id);
  } else {
    webix.message({ type: "error", text: "Please select a record to delete!" });
    return;
  }

  // Confirmation before deleting
  webix.confirm({
    title: "Delete Confirmation",
    text: "Apakah kamu ingin menghapus data ini?",
    ok: "Yes",
    cancel: "No",
    callback: function (result) {
      if (result) {
        axios
          .delete(
            `http://localhost:3000/orbit/api/master/groupcustomer/delete/${selectedData.code}`
          )
          .then(function () {
            webix.message({
              type: "success",
              text: "Data berhasil dihapus!",
            });
            loadData(); // Reload data after deletion
          })
          .catch(function (error) {
            webix.message({ type: "error", text: "Error deleting record!" });
            console.error("Error deleting data:", error);
          });
      }
    },
  });
}

function saveCustomer() {
  var form = $$("inputForm");
  var formValues = $$("inputForm").getValues();

  if (!form.validate()) {
    webix.message({
      type: "error",
      text: "Please fill in all required fields!",
    });
    return;
  } else {
    clearForm();
  }

  var requestData = {
    cltbcust_cspickupzone: formValues.code,
    groupdesc: formValues.name,
  };

  if (formValues.id) {
    // UPDATE existing data
    axios
      .put(
        `http://localhost:3000/orbit/api/master/groupcustomer/edit/${formValues.code}`,
        requestData
      )
      .then(function (response) {
        webix.message({ type: "success", text: "Data updated successfully!" });
        $$("mainTab").setValue("Browse Mode");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error updating data!" });
        console.error("Error updating data:", error);
      })
      .finally(loadData); // Always reload data
  } else {
    // ADD new data
    axios
      .post(
        "http://localhost:3000/orbit/api/master/groupcustomer/tambah",
        requestData
      )
      .then(function (response) {
        webix.message({ type: "success", text: "Data added successfully!" });
        $$("mainTab").setValue("Browse Mode");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error adding data!" });
        console.error("Error adding data:", error);
      })
      .finally(loadData); // Always reload data
  }
}

var header = {
  view: "toolbar",
  css: "webix_header",
  paddingY: 5,
  elements: [
    // {
    //   view: "icon",
    //   type: "icon",
    //   icon: "wxi-plus",
    //   tooltip: "Add",
    //   width: 40,
    //   click: function () {
    //     clearForm();
    //     var tabview = $$("mainTab");
    //     console.log(tabview);
    //     tabview.getTabbar().setValue("inputTab");
    //   },
    // },
    {
      view: "template",
      id: "saveButton",
      template: `<iconify-icon icon="solar:diskette-outline" class="menu-icon"></iconify-icon>`,
      tooltip: "Save",
      width: 40,
      autoheight: true,
      css: "save-icon-button",
      onClick: {
        "save-icon-button": function () {
          saveCustomer();
        },
      },
    },
    // Save jadi icon 💾
    {
      view: "template",
      id: "deleteButton",
      template: `<iconify-icon icon="solar:trash-bin-minimalistic-outline" class="menu-icon"></iconify-icon>`,
      tooltip: "Delete",
      width: 40,
      autoheight: true,
      css: "delete-icon-button",
      onClick: {
        "delete-icon-button": function () {
          deleteItem();
          clearForm();
        },
      },
    },
  ],
};

var tabview = {
  view: "tabview",
  id: "mainTab",
  animate: false,
  cells: [
    {
      header: "Input Mode",
      id: "inputTab",
      width: 150,
      body: {
        view: "form",
        id: "inputForm",
        elements: [
          {
            view: "text",
            label: "Code <span style='color: red;'>* </span>",
            name: "code",
            labelWidth: 120, // Adjust width to fit the asterisk
            width: 400,
          },
          {
            view: "text",
            label: "Name <span style='color: red;'>* </span>",
            name: "name",
            labelWidth: 120, // Adjust width to fit the asterisk
            width: 400,
          },
        ],
        rules: {
          code: webix.rules.isNotEmpty, // Code is required
          name: webix.rules.isNotEmpty, // Name is required
        },
      },
    },
    {
      header: "Browse Mode",
      id: "browseTab",
      width: 150,
      body: {
        rows: [
          {
            view: "toolbar",
            css: "toolbar",
            padding: 15,
            cols: [
              {
                width: 480,
                view: "text",
                id: "textSearch",
                placeholder: "Ketik disini untuk mencari data",
                align: "right",
                on: {
                  onTimedKeyPress: function () {
                    const value = this.getValue().toLowerCase();
                    $$("customerTable").filter(function (obj) {
                      for (let key in obj) {
                        if (
                          obj[key] &&
                          obj[key].toString().toLowerCase().includes(value)
                        ) {
                          return true;
                        }
                      }
                      return false;
                    });
                  },
                },
              },
            ],
          },
          {
            view: "datatable",
            id: "customerTable",
            columns: [
              { id: "code", header: "Code", width: 200 },
              { id: "name", header: "Name", width: 300 },
            ],
            autoheight: true,
            select: true,
            on: {
              onItemClick: function (id) {
                var selected = this.getItem(id);
                $$("inputForm").setValues(selected);
                $$("inputForm").elements.code.disable();
                $$("mainTab").getTabbar().setValue("inputTab");
              },
            },
          },
        ],
      },
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    width: 1200,
    rows: [header, tabview],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadData();
});
