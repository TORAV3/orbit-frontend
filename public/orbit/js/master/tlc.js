function loadTlcData() {
  axios
    .get("http://localhost:3000/orbit/api/master/tlc/data")
    .then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const formattedData = res.data.data.map((item) => {
          return {
            code: item.tltlccode,
            name: item.tlname,
            hub: item.tlvia,
            mainBranch: item.tlmain === "True" ? "True" : "False",
            international: item.tlint === "True" ? "True" : "False",
          };
        });

        const hubOptions = res.data.data.map((item) => item.tltlccode);

        $$("tlcTable").clearAll();
        $$("tlcTable").hideOverlay();
        $$("tlcTable").parse(formattedData);
        $$("tlcForm").elements.hub.define("options", hubOptions);
        $$("tlcForm").elements.hub.refresh();
      } else {
        $$("tlcTable").clearAll();
        $$("tlcTable").showOverlay("No data found");
      }
    })
    .catch((err) => {
      $$("tlcTable").clearAll();
      $$("tlcTable").showOverlay("Failed to load data.");
      console.error("Error fetching data:", err);
    });
}

function clearTlcForm() {
  $$("tlcForm").clear();
  $$("tlcForm").elements.code.enable();
}

function deleteTlc() {
  var id = $$("tlcTable").getSelectedId();

  if (id) {
    var selectedData = $$("tlcTable").getItem(id);
  } else {
    webix.message({ type: "error", text: "Please select a record to delete!" });
    return;
  }

  webix.confirm({
    title: "Delete Confirmation",
    text: "Are you sure you want to delete this record?",
    ok: "Yes",
    cancel: "No",
    callback: function (result) {
      if (result) {
        axios
          .delete(
            `http://localhost:3000/orbit/api/master/tlc/delete/${selectedData.code}`
          )
          .then(function () {
            webix.message({
              type: "success",
              text: "Service deleted successfully!",
            });
            loadServiceData();
          })
          .catch(function (error) {
            webix.message({ type: "error", text: "Error deleting service!" });
            console.error("Error deleting data:", error);
          });
      }
    },
  });
}

function saveTlc() {
  var formValues = $$("tlcForm").getValues();

  if (!$$("tlcForm").validate()) {
    webix.message({
      type: "error",
      text: "Please fill in all required fields!",
    });
    return;
  } else {
    clearTlcForm();
  }

  var requestDataSave = {
    tltlccode: formValues.code,
    tlname: formValues.name,
    tlvia: formValues.hub,
    tlmain: formValues.mainBranch ? "True" : "False",
    tlint: formValues.international ? "True" : "False",
  };

  var requestDataUpdate = {
    tltlccode: formValues.code,
    tlname: formValues.name,
    tlvia: formValues.hub,
    tlmain: formValues.mainBranch ? "True" : "False",
    tlint: formValues.international ? "True" : "False",
  };

  if (formValues.id) {
    axios
      .put(
        `http://localhost:3000/orbit/api/master/tlc/edit/${formValues.code}`,
        requestDataUpdate
      )
      .then(function (response) {
        webix.message({
          type: "success",
          text: "Data updated successfully!",
        });
        $$("mainTab").getTabbar().setValue("browseTab");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error updating service!" });
        console.error("Error updating data:", error);
      })
      .finally(loadTlcData);
  } else {
    axios
      .post(
        "http://localhost:3000/orbit/api/master/tlc/tambah",
        requestDataSave
      )
      .then(function () {
        webix.message({ type: "success", text: "TLC added successfully!" });
        $$("mainTab").getTabbar().setValue("browseTab");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error adding TLC!" });
        console.error("Error adding data:", error);
      })
      .finally(loadTlcData);
  }
}

var header = {
  view: "toolbar",
  css: "webix_header",
  paddingY: 5,
  elements: [
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
          saveTlc();
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
          deleteTlc();
          clearTlcForm();
        },
      },
    },
  ],
};

var tabview = {
  view: "tabview",
  id: "mainTab",
  cells: [
    {
      header: "Input Mode",
      id: "inputTab",
      width: 150,
      body: {
        view: "form",
        id: "tlcForm",
        elements: [
          {
            view: "text",
            label: "Code <span style='color: red;'>* </span>",
            name: "code",
            labelPosition: "top",
            width: 400,
          },
          {
            view: "text",
            label: "Name <span style='color: red;'>* </span>",
            name: "name",
            labelPosition: "top",
            width: 400,
          },
          {
            view: "richselect",
            label: "HUB (Via) <span style='color: red;'>* </span>",
            name: "hub",
            labelPosition: "top",
            width: 400,
            options: [],
          },
          {
            cols: [
              {
                view: "checkbox",
                label: "Cabang Utama",
                name: "mainBranch",
                labelPosition: "top",
              },
              {
                view: "checkbox",
                label: "International",
                name: "international",
                labelPosition: "top",
              },
              { width: 420 },
            ],
          },
        ],
        rules: {
          code: webix.rules.isNotEmpty,
          name: webix.rules.isNotEmpty,
          hub: webix.rules.isNotEmpty,
        },
      },
    },
    {
      header: "Browse Mode",
      id: "browseTab",
      width: 150,
      body: {
        view: "datatable",
        id: "tlcTable",
        columns: [
          { id: "code", header: "TLC Code", width: 100 },
          { id: "name", header: "TLC Name", width: 200 },
          { id: "hub", header: "HUB (Via)", width: 100 },
          { id: "mainBranch", header: "Cabang Utama", width: 120 },
          { id: "international", header: "International", width: 120 },
        ],
        autoheight: true,
        select: true,
        on: {
          onItemClick: function (id) {
            var selected = this.getItem(id);
            selected.mainBranch = selected.mainBranch === "True" ? 1 : 0;
            selected.international = selected.international === "True" ? 1 : 0;
            $$("tlcForm").setValues(selected);
            $$("tlcForm").elements.code.disable();
            $$("mainTab").getTabbar().setValue("inputTab");
          },
        },
      },
    },
  ],
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    margin: 10,
    width: 1200,
    rows: [header, tabview],
  });

  loadTlcData();
});
