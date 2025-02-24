function loadData(status = "all") {
  $$("table").showProgress({
    type: "icon",
  });

  webix
    .ajax()
    // .headers({
    //   Authorization: "Bearer " + token,
    // })
    .get("http://localhost:3000/orbit/api/transaksi/awb/data")
    .then(function (data) {
      var datanya = JSON.parse(data.text());

      if (datanya.data.length > 0) {
        const transformedData = datanya.data.map(function (i) {
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

var podForm = {
  view: "form",
  id: "podForm",
  css: "formStyle",
  margin: 40,
  elements: [
    {
      id: "podFormres",
      margin: 10,
      rows: [
        {
          responsive: "podFormres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "trnnohawb",
                  id: "trnnohawb",
                  readonly: true,
                  hidden: true,
                },
                {
                  view: "datepicker",
                  name: "trndelivereddate",
                  id: "trnelivereddate",
                  label: "Tanggal Diterima",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                  on: {
                    onAfterRender: function () {
                      this.getPopup().define("zIndex", 1056);
                      this.getPopup().resize();
                    },
                  },
                },
                {
                  view: "datepicker",
                  name: "trneliveredtime",
                  id: "trneliveredtime",
                  label: "Jam Diterima",
                  labelPosition: "top",
                  minWidth: 300,
                  type: "time",
                  stringResult: true,
                  required: true,
                  on: {
                    onAfterRender: function () {
                      this.getPopup().define("zIndex", 1056);
                      this.getPopup().resize();
                    },
                  },
                },
                {
                  view: "text",
                  name: "trndeliverebyname",
                  id: "trndeliverebyname",
                  label: "Penerima",
                  labelPosition: "top",
                  minWidth: 300,
                  required: true,
                },
                {
                  view: "text",
                  name: "podImage",
                  id: "podImage",
                  readonly: true,
                  hidden: true,
                },
                {
                  view: "label",
                  label:
                    "<span>Gambar POD<span class='text-danger ms-1'> *</span></span>",
                },
                {
                  view: "template",
                  css: "uploadstyle",
                  template: `
                    <div class="upload-image-wrapper d-flex align-items-center gap-3">
                      <div class="uploaded-img d-none position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                        <button type="button" class="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex">
                          <iconify-icon icon="radix-icons:cross-2" class="text-xl text-danger-600"></iconify-icon>
                        </button>
                        <img id="uploaded-img__preview" class="w-100 h-100 object-fit-cover" src="/assets/images/user.png" alt="image">
                      </div>

                      <label class="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1" for="upload-file">
                        <iconify-icon icon="solar:camera-outline" class="text-xl text-secondary-light"></iconify-icon>
                        <span class="fw-semibold text-secondary-light">Upload</span>
                        <input id="upload-file" type="file" hidden>
                      </label>
                    </div>
                  `,
                  autoheight: true,
                  on: {
                    onAfterRender: function () {
                      const fileInput = document.getElementById("upload-file");
                      const imagePreview = document.getElementById(
                        "uploaded-img__preview"
                      );
                      const uploadedImgContainer =
                        document.querySelector(".uploaded-img");
                      const removeButton = document.querySelector(
                        ".uploaded-img__remove"
                      );

                      const podInputImage = $$("podImage");

                      fileInput.addEventListener("change", (e) => {
                        if (e.target.files.length) {
                          const file = e.target.files[0];
                          const reader = new FileReader();

                          reader.onload = function (event) {
                            const base64String = event.target.result;

                            podInputImage.setValue(base64String);

                            imagePreview.src = base64String;
                            uploadedImgContainer.classList.remove("d-none");
                          };

                          reader.readAsDataURL(file);
                        }
                      });

                      removeButton.addEventListener("click", () => {
                        imagePreview.src = "";
                        uploadedImgContainer.classList.add("d-none");
                        fileInput.value = "";

                        podInputImage.setValue("");
                      });
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
      id: "btnresPod",
      rows: [
        {
          responsive: "btnresPod",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "btnresPodrow",
                  margin: 10,
                  rows: [
                    {
                      responsive: "btnresPodrow",
                      cols: [
                        {},
                        {
                          view: "button",
                          value: "Simpan",
                          css: "btnSimpan",
                          autowidth: true,
                          click: submit_pod,
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
    trndelivereddate: webix.rules.isNotEmpty,
    trndeliveredtime: webix.rules.isNotEmpty,
    trndeliveredbyname: webix.rules.isNotEmpty,
    podImage: webix.rules.isNotEmpty,
  },
};

function submit_pod() {
  const form = $$("podForm");
  if (form.validate()) {
    let ddate = $$("trndelivereddate").getValue();
    if (ddate) {
      ddate.setMinutes(ddate.getMinutes() - ddate.getTimezoneOffset());
    }

    var formData = form.getValues();
    formData.trndelivereddate = ddate;

    console.log(formData);
  }
}

function podData(id) {
  var myModal = new bootstrap.Modal(document.getElementById("podModal"));
  myModal.show();

  setTimeout(() => {
    var modalWidth = document.querySelector(
      ".modal-md .modal-content"
    ).clientWidth;

    if ($$("podForm")) {
      $$("podForm").destructor();
    }

    webix.ui({
      container: "pod-modal-page",
      width: modalWidth - 40,
      rows: [podForm],
    });

    $$("podForm").setValues({ trnnohawb: id });
  }, 300);
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
  { id: "trnnohawb", hidden: true },
  {
    id: "action",
    header: { text: "Action", css: { "text-align": "center" } },
    css: { "text-align": "center" },
    width: 100,
  },
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
  onClick: {
    editBtn: function (event, id, node) {
      var item = this.getItem(id.row);
      var trnnohawb = item.trnnohawb;
      window.location.href = `/transaksi/awb/form/${trnnohawb}`;
    },
    delBtn: function (event, id, node) {
      var item = this.getItem(id.row);
      var trnnohawb = item.trnnohawb;
      deleteData(trnnohawb);
    },
    podBtn: function (event, id, node) {
      var item = this.getItem(id.row);
      var trnnohawb = item.trnnohawb;
      podData(trnnohawb);
    },
  },
  scheme: {
    $change: function (obj) {
      obj.action = edit + trash + pod;
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
                <a class='btn btn-primary' href="/transaksi/hawb/form">Tambah</a>
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
