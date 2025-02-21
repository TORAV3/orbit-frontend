function addCheckpoint() {
  const hawbNumber = $$("search_number").getValue();

  if (!hawbNumber) {
    webix.message({
      type: "error",
      text: "Masukkan nomor HAWB terlebih dahulu!",
    });
    return;
  }

  webix
    .ui({
      view: "window",
      id: "checkpointPopup",
      width: 300,
      modal: true,
      position: "center",
      head: {
        view: "toolbar",
        cols: [
          { width: 10 },
          { view: "label", label: "Input Checkpoint Shipment" },
          {
            view: "icon",
            icon: "wxi-close",
            click: function () {
              $$("checkpointPopup").close();
            },
          },
        ],
      },
      body: {
        view: "form",
        id: "checkpointForm",
        elements: [
          {
            view: "datepicker",
            label: "Date  <span style='color: red;'>* </span>",
            name: "date",
            labelPosition: "top",
            format: "%d-%m-%Y",
          },
          {
            view: "datepicker",
            label: "Time  <span style='color: red;'>* </span>",
            name: "time",
            labelPosition: "top",
            type: "time",
            format: "%H:%i",
          },
          {
            view: "richselect",
            label: "Status <span style='color: red;'>* </span>",
            name: "status",
            labelPosition: "top",
            options: [
              { id: "In Transit", value: "In Transit" },
              { id: "Delivered", value: "Delivered" },
              { id: "Pending", value: "Pending" },
              { id: "Custom", value: "Custom..." },
            ],
            on: {
              onChange: function (newValue) {
                if (newValue === "Custom") {
                  webix
                    .prompt({
                      title: "Enter Custom Status",
                      ok: "Set",
                      cancel: "Cancel",
                      input: {
                        required: true,
                        placeholder: "Type status here...",
                      },
                    })
                    .then(function (result) {
                      $$("checkpointForm").setValues({ status: result }, true);
                    });
                }
              },
            },
          },
          {
            view: "textarea",
            label: "Remarks",
            name: "remarks",
            labelPosition: "top",
            height: 200,
          },
          {
            cols: [
              {},
              {
                view: "button",
                value: "Save",
                css: "button-save-checkpoint",
                click: function () {
                  saveCheckpoint();
                },
              },
            ],
          },
        ],
      },
    })
    .show();
}

function saveCheckpoint() {
  var formValues = $$("checkpointForm").getValues();

  if (!formValues.date || !formValues.time || !formValues.status) {
    webix.message({
      type: "error",
      text: "Please fill in all required fields!",
    });
    return;
  }

  let formattedDate = webix.Date.dateToStr("%Y-%m-%d")(formValues.date);

  let formattedTime = webix.Date.dateToStr("%H:%i:%s")(formValues.time);

  var requestDataSave = {
    checkhawb: $$("search_number").getValue(),
    checkdate: formattedDate,
    checktime: formattedTime,
    checkstatus: formValues.status,
    checkremarks: formValues.remarks || "",
  };

  axios
    .post(
      "http://localhost:3000/orbit/api/transaction/checkpoint/tambah",
      requestDataSave
    )
    .then(function () {
      webix.message({
        type: "success",
        text: "Checkpoint added successfully!",
      });
      $$("checkpointPopup").close();
      loadData();
    })
    .catch(function (error) {
      webix.message({ type: "error", text: "Error adding checkpoint!" });
      console.error("Error adding data:", error);
    });
}

function deleteCheckpoint() {
  var selectedId = $$("checkpointTable").getSelectedId();

  if (!selectedId) {
    webix.message({
      type: "error",
      text: "Silahkan pilih data untuk di delete!",
    });
    return;
  }

  var selectedItem = $$("checkpointTable").getItem(selectedId);
  var checkpointId = selectedItem.checkid;

  webix.confirm({
    title: "Konfirmasi Delete",
    text: "Apakah ingin hapus checkpoint ini?",
    ok: "Yes",
    cancel: "No",
    callback: function (result) {
      if (result) {
        axios
          .delete(
            `http://localhost:3000/orbit/api/transaction/checkpoint/delete/${checkpointId}`
          )
          .then(function () {
            webix.message({
              type: "success",
              text: "Checkpoint deleted successfully!",
            });
            loadData();
          })
          .catch(function (error) {
            webix.message({
              type: "error",
              text: "Error deleting checkpoint!",
            });
            console.error("Error deleting data:", error);
          });
      }
    },
  });
}

function loadData() {
  const hawb = $$("search_number").getValue();

  if (!hawb) {
    webix.message({ type: "error", text: "Masukkan HAWB yang ingin dicari!" });
    return;
  }

  axios
    .get(`http://localhost:3000/orbit/api/transaction/checkpoint/${hawb}`)
    .then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const formattedData = res.data.data.map((item, index) => ({
          no: index + 1,
          checkid: item.checkid,
          checkdate: webix.Date.dateToStr("%d/%m/%Y")(
            webix.Date.strToDate("%Y-%m-%d")(item.checkdate)
          ),
          checktime: webix.Date.dateToStr("%H:%i")(
            webix.Date.strToDate("%H:%i:%s")(item.checktime)
          ),
          checkstatus: item.checkstatus,
          checkremarks: item.checkremarks,
        }));

        $$("checkpointTable").clearAll();
        $$("checkpointTable").parse(formattedData);
      } else {
        webix.message({ type: "error", text: "Data tidak ditemukan!" });
        $$("checkpointTable").clearAll();
      }
    })
    .catch((err) => {
      webix.message({ type: "error", text: "Data tidak ditemukan!" });
      console.error("Error fetching data:", err);
    });
}

var header = {
  view: "toolbar",
  css: "toolbar",
  padding: 20,
  cols: [
    {
      view: "text",
      id: "search_number",
      name: "search_number",
      label: "HAWB",
      labelPosition: "top",
      placeholder: "Ketik HAWB",
      width: 400,
    },
    {
      width: 20,
    },
    {
      view: "button",
      value: "Cari",
      width: 80,
      align: "center",
      css: "button-cari",
      click: function () {
        loadData();
      },
    },
  ],
};

var table = {
  rows: [
    {
      view: "toolbar",
      css: "toolbar",
      padding: 10,
      cols: [
        {
          view: "template",
          id: "saveButton",
          template: `<iconify-icon icon="solar:add-circle-outline" class="menu-icon"></iconify-icon>`,
          tooltip: "Add",
          width: 40,
          autoheight: true,
          css: "add-icon-button",
          onClick: {
            "add-icon-button": function () {
              addCheckpoint();
            },
          },
        },
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
              deleteCheckpoint();
            },
          },
        },
      ],
    },
    {
      view: "datatable",
      id: "checkpointTable",
      autoConfig: true, // Auto-detects columns from data
      columns: [
        { id: "no", header: "No", width: 50 },
        // { id: "checkhawb", header: "HAWB", width: 150 },
        {
          id: "checkdate",
          header: "Date",
          width: 120,
        },
        { id: "checktime", header: "Time", width: 100 },
        { id: "checkstatus", header: "Status", width: 150 },
        { id: "checkremarks", header: "Keterangan", fillspace: true },
      ],
      height: 400,
      select: true,
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [header, table],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
