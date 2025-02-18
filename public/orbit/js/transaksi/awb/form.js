function loadComboData(url, comboId, varid, varbesname) {
  axios
    .get(`http://localhost:3000/orbit/api/${url}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const transformedData = res.data.data.map(function (i) {
        return {
          id: i[varid],
          value: i[varbesname],
        };
      });
      const cbbox = $$(comboId);
      cbbox.define("options", transformedData);
      cbbox.refresh();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
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
                  label: "No. Waybill",
                  labelPosition: "top",
                  minWidth: 300,
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
                },
                {
                  view: "combo",
                  label: "Tipe Barang",
                  value: "",
                  labelPosition: "top",
                  options: [],
                  minWidth: 300,
                  name: "trntypeofpackage",
                  id: "trntypeofpackage",
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
                  view: "text",
                  name: "trnweight",
                  id: "trnweight",
                  label: "Berat Aktual",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnkoli",
                  id: "trnkoli",
                  label: "Jumlah Koli",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trndim_l",
                  id: "trndim_l",
                  label: "Panjang Dimensi",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trndim_w",
                  id: "trndim_w",
                  label: "Lebar Dimensi",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trndim_h",
                  id: "trndim_h",
                  label: "Tinggi Dimensi",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnvalue",
                  id: "trnvalue",
                  label: "Nilai Barang",
                  labelPosition: "top",
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "trnunit",
                  id: "trnunit",
                  label: "Satuan Unit",
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
                  readonly: true,
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
                  readonly: true,
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
                        },
                        {
                          view: "text",
                          name: "trnchargekg",
                          id: "trnchargekg",
                          label: "1kg berikutnya",
                          labelPosition: "top",
                          minWidth: 300,
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
                        },
                        {
                          view: "text",
                          name: "trnchargeinsurance",
                          id: "trnchargeinsurance",
                          label: "Asuransi",
                          labelPosition: "top",
                          minWidth: 300,
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
                        },
                        {
                          view: "text",
                          name: "trndiscamount",
                          id: "trndiscamount",
                          label: "Total Diskon",
                          labelPosition: "top",
                          minWidth: 300,
                          readonly: true,
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
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  //   loadComboData("customer", "cltbcust_csacc", "csacc", "csname");
  //   loadComboData("service", "trntypeofservice", "svsrv", "svname");
  //   loadComboData("packaging", "trntypeofpackage", "pkid", "pkdesc");
  //   loadComboData("tlc", "trnorg", "tltlccode", "tlname");
  //   loadComboData("tlc", "trndest", "tltlccode", "tlname");
  //   loadComboData("payment", "trntypeofpayment", "pyid", "pydesc");
});
