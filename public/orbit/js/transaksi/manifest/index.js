function loadData(status = "all") {
  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/transaksi/manifest/data")
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        const transformedData = datanya.data.map(function (i) {
          return {
            mnfid: i.mnfid,
            mnfdate: i.mnfdate,
            mnftlcorg: i.cltbtlc.tlname,
            mnftlcdst: i.mnftlcdst,
            mnfmoda: i.mnfmoda.toUpperCase(),
            mnftypearmada: i.mnftypearmada,
            mnfplatno: i.mnfplatno,
            mnfvendordelivery: i.mnfvendordelivery,
            mnfpic: i.mnfpic,
            mnfphone: i.mnfphone,
            mnfremark: i.mnfremark,
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

function deleteData(id) {
  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .del(`http://localhost:3000/orbit/api/transaksi/awb/delete/byid/${id}`)
    .then(function (data) {
      var datanya = JSON.parse(data.text());
      webix.message({ type: "success", text: datanya.data });
      loadData();
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
var trash =
  "<span class='webix_icon delBtn' style='cursor:pointer;'><iconify-icon icon='solar:trash-bin-2-linear' style='color:red;'></iconify-icon></span>";
var pod =
  "<span class='webix_icon me-1 podBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-check-rounded-outline' style='color:#6e006e;'></iconify-icon></span>";
// var changeInactive =
//   "<span class='webix_icon me-1 inactiveBtn' style='cursor:pointer;'><iconify-icon icon='solar:user-cross-linear' style='color:#6e006e;'></iconify-icon></span>";

var tabcols = [
  { id: "mnfid", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
  {
    id: "mnfid",
    header: "No. Manifest",
    width: 150,
    sort: "string",
  },
  {
    id: "mnfdate",
    header: "Tanggal",
    width: 170,
  },
  {
    id: "mnftlcorg",
    header: "Origin",
    width: 150,
    sort: "string",
  },
  {
    id: "mnftlcdst",
    header: "Destinasi",
    width: 150,
    sort: "string",
  },
  {
    id: "mnfmoda",
    header: "Moda",
    width: 140,
    sort: "string",
  },
  {
    id: "mnftypearmada",
    header: "Tipe Armada",
    width: 140,
    sort: "string",
  },
  {
    id: "mnfplatno",
    header: "No. Kendaraan",
    width: 180,
    sort: "string",
  },
  {
    id: "mnfvendordelivery",
    header: "Vendor",
    width: 250,
    sort: "string",
  },
  {
    id: "mnfpic",
    header: "PIC",
    width: 180,
    sort: "string",
  },
  {
    id: "mnfphone",
    header: "No. Telp",
    width: 180,
    sort: "string",
  },
  {
    id: "mnfremark",
    header: "Remark",
    width: 250,
    sort: "string",
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
      var mnfid = item.mnfid;
      window.location.href = `/transaksi/manifest/form/${mnfid}`;
    },
    delBtn: function (event, id, node) {
      var item = this.getItem(id.row);
      var trnnohawb = item.trnnohawb;
      deleteData(trnnohawb);
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = edit + trash;
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
                <span style='font-size: 1.5rem'>Daftar Manifest</span>
                <a class='btn btn-primary' href="/transaksi/manifest/form">Tambah</a>
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
    { columnId: "mnfid" },
    {
      getValue: function (view) {
        return view.getValue();
      },
      setValue: function (view, value) {
        view.setValue(value);
      },
    }
  );

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadData();
});
