function loadData(id) {
  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/transaksi/manifest/data/byid/" + id)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("mnfid").setValue(datanya.data.mnfid);
      $$("mnfdate").setValue(datanya.data.mnfdate);
      $$("mnftlcorg").setValue(datanya.data.mnftlcorg);
      $$("mnftlcdst").setValue(datanya.data.mnftlcdst);
      $$("mnfmoda").setValue(datanya.data.mnfmoda);
      $$("mnfvendordelivery").setValue(datanya.data.mnfvendordelivery);
      $$("mnfplatno").setValue(datanya.data.mnfplatno);
      $$("mnftypearmada").setValue(datanya.data.mnftypearmada);
      $$("mnfpic").setValue(datanya.data.mnfpic);
      $$("mnfphone").setValue(datanya.data.mnfphone);
      $$("mnfremark").setValue(datanya.data.mnfremark);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadHawbForEdit(mnfid) {
  Promise.all([
    webix.ajax().get("http://localhost:3000/orbit/api/transaksi/awb/data/nmnf"),
    webix
      .ajax()
      .get(
        "http://localhost:3000/orbit/api/transaksi/manifest-detail/bymnid/" +
          mnfid
      ),
  ])
    .then(([allHawbData, manifestHawbData]) => {
      var allHawbs = JSON.parse(allHawbData.text()).data;
      var manifestHawbs = JSON.parse(manifestHawbData.text()).data.map(
        (i) => i.cldtracehtrans_trnnohawb
      );

      var combinedHawbs = [...new Set([...allHawbs, ...manifestHawbs])];

      var options = combinedHawbs.map(function (hawb) {
        let isSelected = manifestHawbs.includes(hawb) ? "selected" : "";
        let dataSave = manifestHawbs.includes(hawb) ? `data-save="true"` : "";
        return `<option value="${
          hawb.trnnohawb ? hawb.trnnohawb : hawb
        }" ${isSelected} ${dataSave}>${hawb.trnnohawb ? hawb.trnnohawb : hawb}</option>`;
      });

      $("#hawbSelect").html(options.join("")).trigger("change");

      webix
        .ajax()
        .headers({
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        })
        .post(
          "http://localhost:3000/orbit/api/transaksi/awb/bylist",
          JSON.stringify({ awbs: manifestHawbs })
        )
        .then(function (data) {
          var datanya = JSON.parse(data.text());

          loadTable(datanya.data);
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadHawb() {
  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/transaksi/awb/data/nmnf")
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        var options = datanya.data.map(function (i) {
          return `<option value="${i.trnnohawb}">${i.trnnohawb}</option>`;
        });
      }

      $("#hawbSelect").html(options.join("")).trigger("change");
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

function loadTable(data) {
  if (data.length > 0) {
    const transformedData = data.map(function (i) {
      return {
        trnnohawb: i.trnnohawb,
        cltbcust_csacc: i.cltbcust.csname,
        trndate: i.trndate,
        trntypeofservice: i.cldtsrv.svname,
        trntypeofpackage: i.cltbtypeofpackage.pkdesc,
        trnorg: i.cltbtlc.tlname,
        trndest: i.trndest,
      };
    });

    $$("table").clearAll();
    $$("table").hideOverlay();
    $$("table").parse(transformedData);
  } else {
    $$("table").clearAll();
    $$("table").showOverlay("Maaf, data tidak ditemukan");
  }
}

function loadComboData(url, comboId, varid, varbesname) {
  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/" + url)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      const transformedData = datanya.data.map(function (i) {
        return {
          id: i[varid],
          value: i[varbesname],
        };
      });
      const cbbox = $$(comboId);
      cbbox.define("options", transformedData);
      cbbox.refresh();
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

var form = {
  view: "form",
  id: "manifestForm",
  margin: 20,
  elements: [
    {
      id: "formres",
      margin: 10,
      rows: [
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Manifest" },
                {
                  view: "text",
                  name: "method",
                  id: "method",
                  hidden: true,
                },
                {
                  view: "text",
                  name: "mnfid",
                  id: "mnfid",
                  label: "No. Manifest",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "datepicker",
                  name: "mnfdate",
                  id: "mnfdate",
                  label: "Tanggal Manifest",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "combo",
                  label: "Origin",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "mnftlcorg",
                  id: "mnftlcorg",
                  required: true,
                },
                {
                  view: "combo",
                  label: "Destinasi",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "mnftlcdst",
                  id: "mnftlcdst",
                  required: true,
                },
              ],
            },
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Pengiriman" },
                {
                  view: "combo",
                  label: "Moda",
                  value: "",
                  labelPosition: "top",
                  options: [
                    {
                      id: "darat",
                      value: "Darat",
                    },
                    {
                      id: "laut",
                      value: "Laut",
                    },
                    {
                      id: "udara",
                      value: "Udara",
                    },
                  ],
                  minWidth: 300,
                  name: "mnfmoda",
                  id: "mnfmoda",
                  required: true,
                },
                {
                  view: "text",
                  name: "mnftypearmada",
                  id: "mnftypearmada",
                  label: "Jenis Armada",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "text",
                  name: "mnfvendordelivery",
                  id: "mnfvendordelivery",
                  label: "Vendor",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "text",
                  name: "mnfplatno",
                  id: "mnfplatno",
                  label: "No. Kendaraan",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "mnfpic",
                  id: "mnfpic",
                  label: "Nama PIC",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "text",
                  name: "mnfphone",
                  id: "mnfphone",
                  label: "Telp PIC",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "textarea",
                  id: "mnfremark",
                  name: "mnfremark",
                  height: 120,
                  label: "Remark",
                  labelPosition: "top",
                  minWidth: 300,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "formres2",
      margin: 10,
      rows: [
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data HAWB" },
                {
                  template: `<div class="row">
                                <div class="col-12 col-lg-10">
                                    <select id="hawbSelect" multiple="multiple" style="width:100%;">
                                    </select>
                                </div>
                                <div class="col-12 col-lg-2 mt-3 mt-lg-0">
                                    <button class="btn btn-warning" style="font-size:11px" id="submitHawb">Cari HAWB</button>
                                </div>
                              </div>
                                `,
                  css: "select2style",
                  autoheight: true,
                  on: {
                    onAfterRender: function () {
                      webix.delay(function () {
                        let select2Instance = $("#hawbSelect").select2({
                          closeOnSelect: false,
                        });

                        function adjustHeight() {
                          let select2Height =
                            $(".select2-container").outerHeight();
                          let parentId = $$("hawbTemplate").config.id;
                          $$("hawbTemplate").define("height", select2Height);
                          $$("hawbTemplate").resize();
                        }

                        select2Instance.on(
                          "select2:open select2:close change",
                          function () {
                            adjustHeight();
                          }
                        );

                        adjustHeight();

                        $("#hawbSelect").on("select2:unselect", function (e) {
                          let removedHawb = e.params.data.id;
                          let option = $("#hawbSelect").find(
                            `option[value="${removedHawb}"]`
                          );

                          if (option.attr("data-save") === "true") {
                            webix
                              .confirm({
                                title: "Hapus Data",
                                ok: "Ya",
                                cancel: "Tidak",
                                text: "Data HAWB yang sudah terdaftar pada manifest ini akan dihapus.",
                              })
                              .then(function () {
                                console.log("Removed saved HAWB:", removedHawb);
                                webix
                                  .ajax()
                                  // .headers({
                                  //   Authorization: "Bearer " + token,
                                  // })
                                  .get(
                                    "http://localhost:3000/orbit/api/transaksi/manifest/awb/delete/byawb/" +
                                      removedHawb
                                  )
                                  .then(function (data) {
                                    var datanya = JSON.parse(data.text());
                                    setTimeout(() => {
                                      window.location.href =
                                        "/transaksi/manifest/form/" +
                                        window.pageId;
                                    }, 1000);
                                    console.log(datanya.data);
                                  })
                                  .catch(function (error) {
                                    console.error("Error:", error);
                                  });
                              })
                              .fail(function () {
                                let $select = $("#hawbSelect");
                                let currentValues = $select.val() || [];
                                currentValues.push(removedHawb);
                                $select.val(currentValues).trigger("change");
                              });
                          }
                        });

                        $("#submitHawb").on("click", function () {
                          let selectedValues = $("#hawbSelect").val();

                          if (!selectedValues || selectedValues.length === 0) {
                            webix.message({
                              type: "error",
                              text: "Setidaknya pilih satu HAWB",
                            });
                            return;
                          }

                          webix
                            .ajax()
                            .headers({
                              "Content-Type": "application/json",
                              // Authorization: "Bearer " + token,
                            })
                            .post(
                              "http://localhost:3000/orbit/api/transaksi/awb/bylist",
                              JSON.stringify({ awbs: selectedValues })
                            )
                            .then(function (data) {
                              var datanya = JSON.parse(data.text());

                              loadTable(datanya.data);
                            })
                            .catch(function (error) {
                              console.error("Error:", error);
                            });
                        });
                      });
                    },
                  },
                  id: "hawbTemplate",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "formresBtnSubmit",
      rows: [
        {
          responsive: "formresBtnSubmit",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "rowBtnSubmit",
                  margin: 10,
                  rows: [
                    {
                      responsive: "rowBtnSubmit",
                      cols: [
                        {
                          view: "button",
                          value: "Simpan",
                          css: "btnSimpan",
                          autowidth: true,
                          click: submit_manifest,
                        },
                        {},
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  rules: {
    mnfid: webix.rules.isNotEmpty,
    mnfdate: webix.rules.isNotEmpty,
    mnftlcorg: webix.rules.isNotEmpty,
    mnftlcdst: webix.rules.isNotEmpty,
    mnfmoda: webix.rules.isNotEmpty,
    mnftypearmada: webix.rules.isNotEmpty,
    mnfvendordelivery: webix.rules.isNotEmpty,
    mnfplatno: webix.rules.isNotEmpty,
    mnfpic: webix.rules.isNotEmpty,
    mnfphone: webix.rules.isNotEmpty,
  },
};

function submit_manifest() {
  const form = $$("manifestForm");
  if (form.validate()) {
    let selectedHAWB = $("#hawbSelect").val();

    if (!selectedHAWB || selectedHAWB.length === 0) {
      webix.message({ type: "error", text: "Setidaknya pilih satu HAWB" });
      return;
    }

    let mdate = $$("mnfdate").getValue();
    if (mdate) {
      mdate.setMinutes(mdate.getMinutes() - mdate.getTimezoneOffset());
    }

    var formData = form.getValues();
    formData.mnfdate = mdate;
    formData.awbs = selectedHAWB;

    if (formData.method === "update") {
      console.log(formData);
      webix
        .ajax()
        .headers({ "Content-Type": "application/json" })
        .put(
          "http://localhost:3000/orbit/api/transaksi/manifest/edit/" +
            formData.mnfid,
          formData
        )
        .then(function (data) {
          var datanya = JSON.parse(data.text());
          webix.message({
            type: "success",
            text: datanya.data,
          });
          setTimeout(() => {
            window.location.href = "/transaksi/manifest" + window.pageId;
          }, 1200);
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    } else {
      webix
        .ajax()
        .headers({ "Content-Type": "application/json" })
        .post(
          "http://localhost:3000/orbit/api/transaksi/manifest/tambah",
          formData
        )
        .then(function (data) {
          var datanya = JSON.parse(data.text());
          webix.message({
            type: "success",
            text: datanya.data,
          });
          setTimeout(() => {
            window.location.href = "/transaksi/manifest" + window.pageId;
          }, 1200);
        })
        .catch(function (err) {
          console.error("Error loading data:", err);
          webix.message({ type: "error", text: err.responseText });
        });
    }
  }
}

var tabcols = [
  { id: "trnnohawb", hidden: true },
  {
    id: "trnnohawb",
    header: "No. HAWB",
    width: 150,
    sort: "string",
  },
  {
    id: "cltbcust_csacc",
    header: "Customer",
    width: 250,
    sort: "string",
  },
  {
    id: "trndate",
    header: "Tanggal",
    width: 170,
  },
  {
    id: "trntypeofservice",
    header: "Tipe Service",
    width: 180,
    sort: "string",
  },
  {
    id: "trntypeofpackage",
    header: "Tipe Kiriman",
    width: 100,
    sort: "string",
  },
  {
    id: "trnorg",
    header: "Origin",
    width: 150,
    sort: "string",
  },
  {
    id: "trndest",
    header: "Destinasi",
    width: 150,
    sort: "string",
  },
];

var table = {
  view: "datatable",
  id: "table",
  columns: tabcols,
  css: "tableStyle",
  autoheight: true,
  minHeight: 80,
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

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form, datatable],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadComboData("master/tlc/data", "mnftlcorg", "tltlccode", "tlname");
  loadComboData("master/tlc/data", "mnftlcdst", "tltlccode", "tlname");

  if (window.pageId) {
    loadData(window.pageId);
    loadHawbForEdit(window.pageId);
    $$("method").setValue("update");
  } else {
    $$("method").setValue("create");
    loadHawb();
  }
});
