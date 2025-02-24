function loadTable(data) {
  $$("table").showProgress({
    type: "icon",
  });

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
                  name: "trnmnomanifest",
                  id: "trnmnomanifest",
                  label: "No. Manifest",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "datepicker",
                  name: "trnmanifestdate",
                  id: "trnmanifestdate",
                  label: "Tanggal Manifest",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "combo",
                  label: "Nama Customer",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "cltbcust_csacc",
                  id: "cltbcust_csacc",
                  required: true,
                  on: {
                    onChange: function (newValue, oldValue) {
                      if (newValue) {
                        webix
                          .ajax()
                          // .headers({
                          //   Authorization: "Bearer " + token,
                          // })
                          .get(
                            "http://localhost:3000/orbit/api/master/customer/wawb/bycustid/" +
                              newValue
                          )
                          .then(function (data) {
                            var datanya = JSON.parse(data.text());

                            if (datanya.data.cldtracehtrans.length > 0) {
                              var options = datanya.data.cldtracehtrans.map(
                                function (i) {
                                  return `<option value="${i.trnnohawb}">${i.trnnohawb}</option>`;
                                }
                              );
                            }

                            $("#hawbSelect")
                              .html(options.join(""))
                              .trigger("change");
                          })
                          .catch(function (error) {
                            console.error("Error:", error);
                          });
                      }
                    },
                  },
                },
              ],
            },
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data MAWB" },
                {
                  id: "formMawb",
                  rows: [
                    {
                      responsive: "formMawb",
                      cols: [
                        {
                          margin: 10,
                          rows: [
                            {
                              id: "rowMawb",
                              margin: 10,
                              rows: [
                                {
                                  responsive: "rowMawb",
                                  cols: [
                                    {
                                      view: "text",
                                      name: "trnmmawbprefix",
                                      id: "trnmmawbprefix",
                                      label: "Prefix",
                                      labelPosition: "top",
                                      minWidth: 150,
                                      required: true,
                                      on: {
                                        onChange: function () {
                                          let value = this.getValue().replace(
                                            /[^0-9]/g,
                                            ""
                                          );

                                          this.setValue(value);
                                        },
                                      },
                                    },
                                    {
                                      view: "text",
                                      name: "trnmmawbsmu",
                                      id: "trnmmawbsmu",
                                      label: "SMU",
                                      labelPosition: "top",
                                      minWidth: 150,
                                      required: true,
                                      on: {
                                        onChange: function () {
                                          let value = this.getValue().replace(
                                            /[^0-9]/g,
                                            ""
                                          );

                                          this.setValue(value);
                                        },
                                      },
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
                },
                {
                  view: "text",
                  name: "trnmflightnumber",
                  id: "trnmflightnumber",
                  label: "No. Penerbangan",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "datepicker",
                  name: "trnmflightdate",
                  id: "trnmflightdate",
                  label: "Tanggal Keberangkatan",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "datepicker",
                  name: "trnmarrivaldate",
                  id: "trnmarrivaldate",
                  label: "Tanggal Kedatangan",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "text",
                  name: "trnmpcs",
                  id: "trnmpcs",
                  label: "Pcs",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  required: true,
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9]/g, "");

                      this.setValue(value);
                    },
                  },
                },
                {
                  view: "text",
                  name: "trnmgrossswt",
                  id: "trnmgrossswt",
                  label: "Gross Weight",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  required: true,
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9.]/g, "");

                      this.setValue(value);
                    },
                  },
                },
                {
                  view: "text",
                  name: "trnmchargeswt",
                  id: "trnmchargeswt",
                  label: "Chargeable Weight",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  required: true,
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9.]/g, "");

                      this.setValue(value);
                    },
                  },
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
    trnmnomanifest: webix.rules.isNotEmpty,
    trnmanifestdate: webix.rules.isNotEmpty,
    cltbcust_csacc: webix.rules.isNotEmpty,
    trnmmawbprefix: webix.rules.isNotEmpty,
    trnmmawbsmu: webix.rules.isNotEmpty,
    trnmflightnumber: webix.rules.isNotEmpty,
    trnmflightdate: webix.rules.isNotEmpty,
    trnmarrivaldate: webix.rules.isNotEmpty,
    trnmpcs: webix.rules.isNotEmpty,
    trnmgrossswt: webix.rules.isNotEmpty,
    trnmchargeswt: webix.rules.isNotEmpty,
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

    let mdate = $$("trnmanifestdate").getValue();
    if (mdate) {
      mdate.setMinutes(mdate.getMinutes() - mdate.getTimezoneOffset());
    }
    let fdate = $$("trnmflightdate").getValue();
    if (fdate) {
      fdate.setMinutes(fdate.getMinutes() - fdate.getTimezoneOffset());
    }
    let adate = $$("trnmarrivaldate").getValue();
    if (adate) {
      adate.setMinutes(adate.getMinutes() - adate.getTimezoneOffset());
    }

    var formData = form.getValues();
    formData.trnmanifestdate = mdate;
    formData.trnmflightdate = fdate;
    formData.trnmarrivaldate = adate;
    formData.awbs = selectedHAWB;

    console.log(formData)
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
  minHeight: 100,
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

  webix.extend($$("table"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadComboData("master/customer/data", "cltbcust_csacc", "csacc", "csname");
});
