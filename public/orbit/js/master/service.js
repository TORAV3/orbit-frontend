function loadServiceData() {
  axios
    .get("http://localhost:3000/orbit/api/master/service/data")
    .then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const formattedData = res.data.data.map((item) => {
          return {
            code: item.svsrv, // Map API field to "code"
            name: item.svname, // Map API field to "name"
            discount: item.svdiscount === "True" ? 1 : 0,
            volume: item.svvoldiv, // Map API field to "volume"
            minKg: item.svminkg, // Map API field to "minimum kg"
          };
        });

        $$("serviceTable").clearAll();
        $$("serviceTable").hideOverlay();
        $$("serviceTable").parse(formattedData);
      } else {
        $$("serviceTable").clearAll();
        $$("serviceTable").showOverlay("No data found");
      }
    })
    .catch((err) => {
      $$("serviceTable").clearAll();
      $$("serviceTable").showOverlay("Failed to load data.");
      console.error("Error fetching data:", err);
    });
}

function clearServiceForm() {
  $$("serviceForm").clear();
  $$("serviceForm").elements.code.enable();
}

function deleteService() {
  var id = $$("serviceTable").getSelectedId();

  if (id) {
    var selectedData = $$("serviceTable").getItem(id);
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
            `http://localhost:3000/orbit/api/master/service/delete/${selectedData.code}`
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

function saveService() {
  var form = $$("serviceForm");
  var formValues = $$("serviceForm").getValues();

  if (!form.validate()) {
    webix.message({
      type: "error",
      text: "Please fill in all required fields!",
    });
    return;
  } else {
    clearServiceForm();
  }

  var requestDataUpdate = {
    svname: formValues.name,
    svdiscount: formValues.discount ? "True" : "False",
    svvoldiv: formValues.volume,
    svminkg: formValues.minKg,
  };

  var requestDataSave = {
    svsrv: formValues.code,
    svname: formValues.name,
    svdiscount: formValues.discount ? "True" : "False",
    svvoldiv: formValues.volume,
    svminkg: formValues.minKg,
  };

  if (formValues.id) {
    axios
      .put(
        `http://localhost:3000/orbit/api/master/service/edit/${formValues.code}`,
        requestDataUpdate
      )
      .then(function (response) {
        webix.message({
          type: "success",
          text: "Service updated successfully!",
        });
        $$("mainTab").getTabbar().setValue("browseTab");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error updating service!" });
        console.error("Error updating data:", error);
      })
      .finally(loadServiceData);
  } else {
    axios
      .post(
        "http://localhost:3000/orbit/api/master/service/tambah",
        requestDataSave
      )
      .then(function (response) {
        webix.message({ type: "success", text: "Service added successfully!" });
        $$("mainTab").getTabbar().setValue("browseTab");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error adding service!" });
        console.error("Error adding data:", error);
      })
      .finally(loadServiceData);
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
          saveService();
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
          deleteService();
          clearServiceForm();
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
        id: "serviceForm",
        elements: [
          {
            view: "text",
            label: "Service Code <span style='color: red;'>* </span>",
            name: "code",
            labelPosition: "top",
            width: 400,
          },
          {
            view: "text",
            label: "Service Name <span style='color: red;'>* </span>",
            name: "name",
            labelPosition: "top",
            width: 600,
          },
          {
            cols: [
              {
                view: "text",
                label: "Volume",
                name: "volume",
                labelPosition: "top",
                width: 300,
              },
              { width: 20 },
              {
                view: "text",
                label: "Min. Kg",
                name: "minKg",
                labelPosition: "top",
                width: 300,
              },
            ],
          },
          {
            view: "checkbox",
            label: "Discount Affected",
            name: "discount",
            labelWidth: 150,
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
                placeholder: "Search...",
                align: "right",
                on: {
                  onTimedKeyPress: function () {
                    const value = this.getValue().toLowerCase();
                    $$("serviceTable").filter(function (obj) {
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
            id: "serviceTable",
            columns: [
              { id: "code", header: "Kode", width: 100 },
              { id: "name", header: "Service Name", width: 200 },
              { id: "volume", header: "Volume", width: 100 },
              {
                id: "discount",
                header: "Discount",
                width: 100,
                css: "text-center",
                template: function (obj) {
                  return obj.discount ? "✔" : "✘";
                },
              },
              { id: "minKg", header: "Min Kg", width: 100 },
            ],
            autoheight: true,
            select: true,
            on: {
              onItemClick: function (id) {
                var selected = this.getItem(id);
                selected.discount = selected.discount ? 1 : 0;
                $$("serviceForm").setValues(selected);
                $$("serviceForm").elements.code.disable();
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

  loadServiceData();
});
