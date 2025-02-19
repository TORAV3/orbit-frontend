function loadData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/awb/data")
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        const transformedData = datanya.data.map(function (i) {
          return {
            trnnohawb: i.trnnohawb,
            cltbcust_csacc: i.cltbcust_csacc,
            trndate: i.trndate,
            trntypeofservice: i.trntypeofservice,
            trntypeofpackage: i.trntypeofpackage,
            trnorg: i.trnorg,
            trndest: i.trndest,
            trnsubdest: i.trnsubdest,
          };
        });

        $$("table").clearAll();
        $$("table").hideOverlay();
        $$("table").parse(transformedData);
      } else {
        $$("table").clearAll();
        $$("table").showOverlay("Maaf, data tidak ditemukan");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

var searchForm = {
  maxWidth: 230,
  minWidth: 160,
  view: "text",
  id: "textSearch",
  placeholder: "Ketik disini untuk mencari data",
  align: "right",
  on: {
    onTimedKeyPress: function () {
      $$("table").filterByAll();
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [{}, {}, searchForm],
};

var edit =
  "<span class='webix_icon me-1 editBtn' style='cursor:pointer;'><iconify-icon icon='solar:pen-new-round-linear' style='color:#398bf1;'></iconify-icon></span>";
// var trash =
//   "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";
// var changeActive =
//   "<span class='webix_icon me-1 activeBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-check-rounded-outline' style='color:#6e006e;'></iconify-icon></span>";
// var changeInactive =
//   "<span class='webix_icon me-1 inactiveBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-cross-linear' style='color:#6e006e;'></iconify-icon></span>";

var tabcols = [
  { id: "trnnohawb", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "trnnohawb",
    header: { text: "No. AWB", css: { "text-align": "center" } },
    width: 150,
    sort: "string",
    css: { "text-align": "center" },
  },
  {
    id: "cltbcust_csacc",
    header: "Customer",
    width: 300,
    sort: "string",
  },
  {
    id: "trndate",
    header: { text: "Tanggal", css: { "text-align": "center" } },
    width: 170,
    css: { "text-align": "center" },
  },
  {
    id: "trntypeofservice",
    header: "Tipe Service",
    width: 100,
    sort: "string",
  },
  { id: "trntypeofpackage", header: "Tipe Barang", width: 100, sort: "string" },
  {
    id: "trnorg",
    header: { text: "Origin", css: { "text-align": "center" } },
    width: 100,
    sort: "string",
    css: { "text-align": "center" },
  },
  {
    id: "trndest",
    header: { text: "Destinasi", css: { "text-align": "center" } },
    width: 100,
    sort: "string",
    css: { "text-align": "center" },
  },
  {
    id: "trnsubdest",
    header: { text: "HUB", css: { "text-align": "center" } },
    width: 100,
    sort: "string",
    css: { "text-align": "center" },
  },
];

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  css: "tableStyle",
  autoheight: true,
  minHeight: 100,
  onClick: {
    editBtn: function (event, id, node) {
      var item = this.getItem(id.row);
      var trnnohawb = item.trnnohawb;
      window.location.href = `/transaksi/awb/form/${trnnohawb}`;
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = edit;
    },
  },
  navigation: true,
  pager: "pager",
};

var pagination = {
  view: "pager",
  id: "pager",
  css: "pagerstyle",
  template: "{common.prev()}{common.next()}",
  size: 10,
};

var datatable = {
  margin: 5,
  rows: [table, pagination],
};

var title = {
  view: "template",
  template: `<div style='display:flex; align-items:center; justify-content: space-between'>
                <span style='font-size: 1.5rem'>Daftar AWB</span>
                <a class='btn btn-primary' href="/transaksi/awb/form">Tambah</a>
            </div>`,
  autoheight: true,
  css: "title",
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [title, toolbar, datatable],
  });

  $$("table").registerFilter(
    $$("textSearch"),
    { columnId: "trnnohawb" },
    {
      getValue: function (view) {
        return view.getValue();
      },
      setValue: function (view, value) {
        view.setValue(value);
      },
    }
  );

  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadData();
});
