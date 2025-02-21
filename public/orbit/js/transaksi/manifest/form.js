var form = {
  view: "form",
  id: "manifestForm",
  margin: 40,
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
                                      <option value="1">HAWB 1</option>
                                      <option value="2">HAWB 2</option>
                                      <option value="3">HAWB 3</option>
                                    </select>
                                </div>
                                <div class="col-12 col-lg-2 mt-3 mt-lg-0">
                                    <button class="btn btn-primary" id="submitHawb">Cari HAWB</button>
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
                          console.log(selectedValues);
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
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
