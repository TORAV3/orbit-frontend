function loadData(id) {
  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/transaksi/awb/data/byid/" + id)
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      $$("trnnohawb").setValue(datanya.data.trnnohawb);
      $$("trnsubdest").setValue(datanya.data.trnsubdest);
      $$("trnweight").setValue(datanya.data.trnweight);
      $$("trnkoli").setValue(datanya.data.trnkoli);
      $$("trndim_l").setValue(datanya.data.trndim_l);
      $$("trndim_w").setValue(datanya.data.trndim_w);
      $$("trndim_h").setValue(datanya.data.trndim_h);
      $$("trnvalue").setValue(datanya.data.trnvalue);
      $$("trnpickupbyname").setValue(datanya.data.trnpickupbyname);
      $$("trnname").setValue(datanya.data.trnname);
      $$("trnalm1").setValue(datanya.data.trnalm1);
      $$("trnalm2").setValue(datanya.data.trnalm2);
      $$("trnalm3").setValue(datanya.data.trnalm3);
      $$("trncity").setValue(datanya.data.trncity);
      $$("trnpost").setValue(datanya.data.trnpost);
      $$("trnphone").setValue(datanya.data.trnphone);
      $$("trnfax").setValue(datanya.data.trnfax);
      $$("trncontact").setValue(datanya.data.trncontact);
      $$("trnconsname").setValue(datanya.data.trnconsname);
      $$("trnconsalm1").setValue(datanya.data.trnconsalm1);
      $$("trnconsalm2").setValue(datanya.data.trnconsalm2);
      $$("trnconsalm3").setValue(datanya.data.trnconsalm3);
      $$("trnconscity").setValue(datanya.data.trnconscity);
      $$("trnconspost").setValue(datanya.data.trnconspost);
      $$("trnconsphone").setValue(datanya.data.trnconsphone);
      $$("trnconsfax").setValue(datanya.data.trnconsfax);
      $$("trnconscontact").setValue(datanya.data.trnconscontact);
      $$("trnspecialinstruction").setValue(datanya.data.trnspecialinstruction);
      $$("trncustref").setValue(datanya.data.trncustref);
      $$("trninsuranceid").setValue(datanya.data.trninsuranceid);
      $$("trncharge1stkg").setValue(
        parseFloat(datanya.data.trncharge1stkg.replace(".00", "").trim())
      );
      $$("trnchargekg").setValue(
        parseFloat(datanya.data.trnchargekg.replace(".00", "").trim())
      );
      $$("trnchargepacking").setValue(
        parseFloat(datanya.data.trnchargepacking.replace(".00", "").trim())
      );
      $$("trnchargeinsurance").setValue(
        parseFloat(datanya.data.trnchargeinsurance.replace(".00", "").trim())
      );
      $$("trnchargeothers").setValue(
        parseFloat(datanya.data.trnchargeothers.replace(".00", "").trim())
      );
      $$("trndisc").setValue(
        parseFloat(datanya.data.trndisc.replace(".00", "").trim())
      );
      $$("trnchargeothers").setValue(
        parseFloat(datanya.data.trnchargeothers.replace(".00", "").trim())
      );

      $$("cltbcust_csacc").setValue(datanya.data.cltbcust_csacc);
      $$("trndate").setValue(datanya.data.trndate);
      $$("trntypeofservice").setValue(datanya.data.trntypeofservice);
      $$("trntypeofpackage").setValue(datanya.data.trntypeofpackage);
      $$("trnorg").setValue(datanya.data.trnorg);
      $$("trndest").setValue(datanya.data.trndest);
      $$("trntypeofpayment").setValue(datanya.data.trntypeofpayment);
      $$("trnunit").setValue(datanya.data.trnunit);
      $$("trntypeofpackage").setValue(datanya.data.trntypeofpackage);
      $$("trntypeofpackage").setValue(datanya.data.trntypeofpackage);
      $$("trnpickupbyname").setValue(datanya.data.trnpickupbyname);
      $$("trnpickupdate").setValue(datanya.data.trnpickupdate);
      $$("trnpickuptime").setValue(datanya.data.trnpickuptime);
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
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
  id: "awbForm",
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
                { type: "section", template: "Data Transaksi" },
                {
                  view: "text",
                  name: "trnnohawb",
                  id: "trnnohawb",
                  label: "No. HAWB",
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
                },
                {
                  view: "datepicker",
                  name: "trndate",
                  id: "trndate",
                  label: "Tanggal Transaksi",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "combo",
                  label: "Tipe Service",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "trntypeofservice",
                  id: "trntypeofservice",
                  required: true,
                },
                {
                  view: "combo",
                  label: "Tipe Kiriman",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "trntypeofpackage",
                  id: "trntypeofpackage",
                  required: true,
                },
                {
                  view: "combo",
                  label: "Origin",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "trnorg",
                  id: "trnorg",
                  required: true,
                },
                {
                  view: "combo",
                  label: "Destinasi",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "trndest",
                  id: "trndest",
                  required: true,
                },
                {
                  view: "text",
                  name: "trnsubdest",
                  id: "trnsubdest",
                  label: "HUB",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "combo",
                  label: "Tipe Pembayaran",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "trntypeofpayment",
                  id: "trntypeofpayment",
                },
              ],
            },
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Barang" },
                {
                  id: "formWeight",
                  rows: [
                    {
                      responsive: "formWeight",
                      cols: [
                        {
                          margin: 10,
                          rows: [
                            {
                              id: "rowWeight",
                              margin: 10,
                              rows: [
                                {
                                  responsive: "rowWeight",
                                  cols: [
                                    {
                                      view: "text",
                                      name: "trnweight",
                                      id: "trnweight",
                                      label: "Berat Aktual",
                                      labelPosition: "top",
                                      minWidth: 150,
                                      inputAlign: "right",
                                      required: true,
                                      value: "0",
                                      on: {
                                        onChange: function () {
                                          let value = this.getValue().replace(
                                            /[^0-9.]/g,
                                            ""
                                          );

                                          // let parts = value.split(",");
                                          // if (parts.length > 2) {
                                          //   value =
                                          //     parts[0] +
                                          //     "," +
                                          //     parts.slice(1).join("");
                                          // }

                                          // let integerPart = parts[0].replace(
                                          //   /\./g,
                                          //   ""
                                          // );

                                          // integerPart = integerPart.replace(
                                          //   /\B(?=(\d{3})+(?!\d))/g,
                                          //   "."
                                          // );

                                          // value =
                                          //   parts.length > 1
                                          //     ? integerPart + "," + parts[1]
                                          //     : integerPart;

                                          this.setValue(value);
                                        },
                                      },
                                    },
                                    {
                                      view: "combo",
                                      label: "Satuan Unit",
                                      value: "kgs",
                                      labelPosition: "top",
                                      options: [
                                        { id: "kgs", value: "Kgs" },
                                        { id: "cly", value: "Koli" },
                                        { id: "cbm", value: "CBM" },
                                      ],
                                      minWidth: 150,
                                      name: "trnunit",
                                      id: "trnunit",
                                      required: true,
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
                  name: "trnkoli",
                  id: "trnkoli",
                  label: "Jumlah Koli",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9]/g, "");

                      // let parts = value.split(",");
                      // if (parts.length > 2) {
                      //   value = parts[0] + "," + parts.slice(1).join("");
                      // }

                      // let integerPart = parts[0].replace(/\./g, "");

                      // integerPart = integerPart.replace(
                      //   /\B(?=(\d{3})+(?!\d))/g,
                      //   "."
                      // );

                      // value =
                      //   parts.length > 1
                      //     ? integerPart + "," + parts[1]
                      //     : integerPart;

                      this.setValue(value);
                    },
                  },
                },
                {
                  view: "text",
                  name: "trndim_l",
                  id: "trndim_l",
                  label: "Panjang Dimensi",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9.]/g, "");

                      // let parts = value.split(",");
                      // if (parts.length > 2) {
                      //   value = parts[0] + "," + parts.slice(1).join("");
                      // }

                      // let integerPart = parts[0].replace(/\./g, "");

                      // integerPart = integerPart.replace(
                      //   /\B(?=(\d{3})+(?!\d))/g,
                      //   "."
                      // );

                      // value =
                      //   parts.length > 1
                      //     ? integerPart + "," + parts[1]
                      //     : integerPart;

                      this.setValue(value);
                    },
                  },
                },
                {
                  view: "text",
                  name: "trndim_w",
                  id: "trndim_w",
                  label: "Lebar Dimensi",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9.]/g, "");

                      // let parts = value.split(",");
                      // if (parts.length > 2) {
                      //   value = parts[0] + "," + parts.slice(1).join("");
                      // }

                      // let integerPart = parts[0].replace(/\./g, "");

                      // integerPart = integerPart.replace(
                      //   /\B(?=(\d{3})+(?!\d))/g,
                      //   "."
                      // );

                      // value =
                      //   parts.length > 1
                      //     ? integerPart + "," + parts[1]
                      //     : integerPart;

                      this.setValue(value);
                    },
                  },
                },
                {
                  view: "text",
                  name: "trndim_h",
                  id: "trndim_h",
                  label: "Tinggi Dimensi",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9.]/g, "");

                      // let parts = value.split(",");
                      // if (parts.length > 2) {
                      //   value = parts[0] + "," + parts.slice(1).join("");
                      // }

                      // let integerPart = parts[0].replace(/\./g, "");

                      // integerPart = integerPart.replace(
                      //   /\B(?=(\d{3})+(?!\d))/g,
                      //   "."
                      // );

                      // value =
                      //   parts.length > 1
                      //     ? integerPart + "," + parts[1]
                      //     : integerPart;

                      this.setValue(value);
                    },
                  },
                },
                {
                  view: "text",
                  name: "trnvalue",
                  id: "trnvalue",
                  label: "Nilai Barang",
                  labelPosition: "top",
                  minWidth: 300,
                  inputAlign: "right",
                  value: "0",
                  on: {
                    onChange: function () {
                      let value = this.getValue().replace(/[^0-9]/g, "");

                      // let parts = value.split(",");
                      // if (parts.length > 2) {
                      //   value = parts[0] + "," + parts.slice(1).join("");
                      // }

                      // let integerPart = parts[0].replace(/\./g, "");

                      // integerPart = integerPart.replace(
                      //   /\B(?=(\d{3})+(?!\d))/g,
                      //   "."
                      // );

                      // value =
                      //   parts.length > 1
                      //     ? integerPart + "," + parts[1]
                      //     : integerPart;

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
      id: "formres3",
      rows: [
        {
          responsive: "formres3",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Pickup" },
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "trnpickupbyname",
                          id: "trnpickupbyname",
                          label: "Courier",
                          labelPosition: "top",
                          minWidth: 300,
                        },
                        {
                          view: "datepicker",
                          name: "trnpickupdate",
                          id: "trnpickupdate",
                          label: "Tanggal Pickup",
                          labelPosition: "top",
                          minWidth: 300,
                          required: true,
                        },
                        {
                          view: "datepicker",
                          name: "trnpickuptime",
                          id: "trnpickuptime",
                          label: "Jam Pickup",
                          labelPosition: "top",
                          minWidth: 300,
                          type: "time",
                          stringResult: true,
                          required: true,
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
      id: "formres2",
      margin: 10,
      rows: [
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Pengirim" },
                {
                  view: "text",
                  name: "trnname",
                  id: "trnname",
                  label: "Nama Shipper",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnalm1",
                  id: "trnalm1",
                  label: "Alamat Pengirim 1",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnalm2",
                  id: "trnalm2",
                  label: "Alamat Pengirim 2",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnalm3",
                  id: "trnalm3",
                  label: "Alamat Pengirim 3",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trncity",
                  id: "trncity",
                  label: "Kota Pengirim",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnpost",
                  id: "trnpost",
                  label: "Kodepos Pengirim",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnphone",
                  id: "trnphone",
                  label: "Telp Pengirim",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnfax",
                  id: "trnfax",
                  label: "Fax Pengirim",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trncontact",
                  id: "trncontact",
                  label: "Nama Pengirim",
                  labelPosition: "top",
                  minWidth: 300,
                },
              ],
            },
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Penerima" },
                {
                  view: "text",
                  name: "trnconsname",
                  id: "trnconsname",
                  label: "Nama Consignee",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconsalm1",
                  id: "trnconsalm1",
                  label: "Alamat Penerima 1",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconsalm2",
                  id: "trnconsalm2",
                  label: "Alamat Penerima 2",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconsalm3",
                  id: "trnconsalm3",
                  label: "Alamat Penerima 3",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconscity",
                  id: "trnconscity",
                  label: "Kota Penerima",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconspost",
                  id: "trnconspost",
                  label: "Kodepos Penerima",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconsphone",
                  id: "trnconsphone",
                  label: "Telp Penerima",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconsfax",
                  id: "trnconsfax",
                  label: "Fax Penerima",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnconscontact",
                  id: "trnconscontact",
                  label: "Nama Penerima",
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
      id: "formres6",
      margin: 10,
      rows: [
        {
          responsive: "formres6",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Tambahan" },
                {
                  view: "textarea",
                  id: "trnspecialinstruction",
                  name: "trnspecialinstruction",
                  height: 120,
                  label: "SP Instruction",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trncustref",
                  id: "trncustref",
                  label: "Customer Ref",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trninsuranceid",
                  id: "trninsuranceid",
                  label: "No Asuransi",
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
      id: "formres4",
      rows: [
        {
          responsive: "formres4",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data Billing" },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
                      cols: [
                        {
                          view: "text",
                          name: "trncharge1stkg",
                          id: "trncharge1stkg",
                          label: "1kg pertama",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                        // {
                        //   view: "text",
                        //   name: "trnchargekg",
                        //   id: "trnchargekg",
                        //   label: "1kg berikutnya",
                        //   labelPosition: "top",
                        //   minWidth: 300,
                        //   inputAlign: "right",
                        //   value: "0",
                        //   on: {
                        //     onChange: function () {
                        //       let value = this.getValue().replace(
                        //         /[^0-9]/g,
                        //         ""
                        //       );

                        //       // let parts = value.split(",");
                        //       // if (parts.length > 2) {
                        //       //   value =
                        //       //     parts[0] + "," + parts.slice(1).join("");
                        //       // }

                        //       // let integerPart = parts[0].replace(/\./g, "");

                        //       // integerPart = integerPart.replace(
                        //       //   /\B(?=(\d{3})+(?!\d))/g,
                        //       //   "."
                        //       // );

                        //       // value =
                        //       //   parts.length > 1
                        //       //     ? integerPart + "," + parts[1]
                        //       //     : integerPart;

                        //       this.setValue(value);
                        //     },
                        //   },
                        // },
                        {
                          view: "text",
                          name: "trnchargeswt",
                          id: "trnchargeswt",
                          label: "Charges Weight",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          readonly: true,
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                        {
                          view: "text",
                          name: "trnfreightcharges",
                          id: "trnfreightcharges",
                          label: "Freight Charges",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          readonly: true,
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row3",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row3",
                      cols: [
                        {
                          view: "text",
                          name: "trnchargepacking",
                          id: "trnchargepacking",
                          label: "Packaging",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                        {
                          view: "text",
                          name: "trnchargeinsurance",
                          id: "trnchargeinsurance",
                          label: "Asuransi",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row4",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row4",
                      cols: [
                        {
                          view: "text",
                          name: "trnchargeothers",
                          id: "trnchargeothers",
                          label: "Biaya lain-lain",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row5",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row5",
                      cols: [
                        {
                          view: "text",
                          name: "trndisc",
                          id: "trndisc",
                          label: "Diskon",
                          labelPosition: "top",
                          minWidth: 300,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");
                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value + "%");
                            },
                            onAfterRender: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );
                              this.setValue(value + "%");
                            },
                          },
                        },
                        {
                          view: "text",
                          name: "trndiscamount",
                          id: "trndiscamount",
                          label: "Total Diskon",
                          labelPosition: "top",
                          minWidth: 300,
                          readonly: true,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

                              this.setValue(value);
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row6",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row6",
                      cols: [
                        {
                          view: "text",
                          name: "trntotalcharge",
                          id: "trntotalcharge",
                          label: "Total",
                          labelPosition: "top",
                          minWidth: 300,
                          readonly: true,
                          inputAlign: "right",
                          value: "0",
                          on: {
                            onChange: function () {
                              let value = this.getValue().replace(
                                /[^0-9]/g,
                                ""
                              );

                              // let parts = value.split(",");
                              // if (parts.length > 2) {
                              //   value =
                              //     parts[0] + "," + parts.slice(1).join("");
                              // }

                              // let integerPart = parts[0].replace(/\./g, "");

                              // integerPart = integerPart.replace(
                              //   /\B(?=(\d{3})+(?!\d))/g,
                              //   "."
                              // );

                              // value =
                              //   parts.length > 1
                              //     ? integerPart + "," + parts[1]
                              //     : integerPart;

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
      id: "formres5",
      rows: [
        {
          responsive: "formres5",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row10",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row10",
                      cols: [
                        {},
                        {
                          view: "button",
                          value: "Simpan",
                          css: "btnSimpan",
                          autowidth: true,
                          click: submit_awb,
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
  ],
  rules: {
    trnnohawb: webix.rules.isNotEmpty,
    trndate: webix.rules.isNotEmpty,
    trnorg: webix.rules.isNotEmpty,
    trndest: webix.rules.isNotEmpty,
    trntypeofservice: webix.rules.isNotEmpty,
    trntypeofpackage: webix.rules.isNotEmpty,
    trnpickupdate: webix.rules.isNotEmpty,
    trnpickuptime: webix.rules.isNotEmpty,
    trnweight: webix.rules.isNotEmpty,
  },
};

function submit_awb() {
  const form = $$("awbForm");
  if (form.validate()) {
    let date = $$("trndate").getValue();
    if (date) {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    }

    let pdate = $$("trnpickupdate").getValue();
    if (pdate) {
      pdate.setMinutes(pdate.getMinutes() - pdate.getTimezoneOffset());
    }

    var formData = form.getValues();
    formData.trndisc = parseFloat(formData.trndisc.replace("%", "").trim());
    formData.trndate = date;
    formData.trnpickupdate = pdate;

    webix
      .ajax()
      // .headers({ Authorization: "Bearer " + token })
      .post("http://localhost:3000/orbit/api/transaksi/awb/tambah", formData)
      .then(function (data) {
        var datanya = JSON.parse(data.text());
        webix.message({
          type: "success",
          text: datanya.data,
        });
      })
      .catch(function (err) {
        console.error("Error loading data:", err);
        webix.message({ type: "error", text: err.responseText });
      });
  }
}

function calculateTotalCharge() {
  let weight = parseFloat($$("trnweight").getValue()) || 0;
  let charge1stKg = parseFloat($$("trncharge1stkg").getValue()) || 0;
  let freightcharges = parseFloat($$("trnfreightcharges").getValue()) || 0;
  // let chargePerKg = parseFloat($$("trnchargekg").getValue()) || 0;
  let chargePacking = parseFloat($$("trnchargepacking").getValue()) || 0;
  let chargeInsurance = parseFloat($$("trnchargeinsurance").getValue()) || 0;
  let chargeOthers = parseFloat($$("trnchargeothers").getValue()) || 0;
  let discountPercent = parseFloat($$("trndisc").getValue()) || 0;

  // let totalBeforeDiscount =
  //   charge1stKg +
  //   Math.max(0, weight - 1) * chargePerKg +
  //   chargePacking +
  //   chargeInsurance +
  //   chargeOthers;
  let totalBeforeDiscount =
    freightcharges + chargePacking + chargeInsurance + chargeOthers;

  let discountAmount = (discountPercent / 100) * totalBeforeDiscount;
  discountAmount = Math.round(discountAmount);
  $$("trndiscamount").setValue(discountAmount);

  let totalCharge = totalBeforeDiscount - discountAmount;

  $$("trntotalcharge").setValue(totalCharge);
}

function calculateMaxChargesWeight() {
  let weight = parseFloat($$("trnweight").getValue()) || 0;
  let dim_l = parseFloat($$("trndim_l").getValue()) || 0;
  let dim_w = parseFloat($$("trndim_w").getValue()) || 0;
  let dim_h = parseFloat($$("trndim_h").getValue()) || 0;

  if (weight > (dim_h * dim_l * dim_w) / 6000) {
    $$("trnchargeswt").setValue(Math.ceil(weight));
  } else {
    $$("trnchargeswt").setValue(Math.ceil((dim_h * dim_l * dim_w) / 6000));
  }

  $$("trnfreightcharges").setValue(
    $$("trnchargeswt").getValue() * $$("trncharge1stkg").getValue()
  );

  // let totalBeforeDiscount =
  //   charge1stKg +
  //   Math.max(0, weight - 1) * chargePerKg +
  //   chargePacking +
  //   chargeInsurance +
  //   chargeOthers;

  // let discountAmount = (discountPercent / 100) * totalBeforeDiscount;
  // discountAmount = Math.round(discountAmount);
  // $$("trndiscamount").setValue(discountAmount);

  // let totalCharge = totalBeforeDiscount - discountAmount;

  // $$("trntotalcharge").setValue(totalCharge);
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadComboData("master/customer/data", "cltbcust_csacc", "csacc", "csname");
  loadComboData("master/service/data", "trntypeofservice", "svsrv", "svname");
  loadComboData(
    "master/typepackage/data",
    "trntypeofpackage",
    "pkid",
    "pkdesc"
  );
  loadComboData("master/tlc/data", "trnorg", "tltlccode", "tlname");
  loadComboData("master/tlc/data", "trndest", "tltlccode", "tlname");
  loadComboData(
    "master/typepayment/data",
    "trntypeofpayment",
    "pyid",
    "pydesc"
  );

  [
    "trnfreightcharges",
    "trncharge1stkg",
    // "trnchargekg",
    "trnchargepacking",
    "trnchargeinsurance",
    "trnchargeothers",
    "trndisc",
  ].forEach((id) => {
    $$(id).attachEvent("onChange", calculateTotalCharge);
  });

  ["trnweight", "trndim_l", "trndim_w", "trndim_h", "trncharge1stkg"].forEach(
    (id) => {
      $$(id).attachEvent("onChange", calculateMaxChargesWeight);
    }
  );

  if (window.pageId) {
    loadData(window.pageId);
  }
});
