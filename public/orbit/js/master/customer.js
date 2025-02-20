function loadCustomerData() {
  axios
    .get("http://localhost:3000/orbit/api/master/customer/data")
    .then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const formattedData = res.data.data.map((item) => {
          return {
            account: item.csacc,
            nickname: item.cssicode,
            name: item.csname,
            city: item.cscity,
            phone: item.csphone,
            contact: item.cscontact,
            top: item.cstop,
            groupcustomer: item.cspickupzone,
            active: item.csenable ? "✔" : "✘",
          };
        });

        $$("customerTable").clearAll();
        $$("customerTable").hideOverlay();
        $$("customerTable").parse(formattedData);
      } else {
        $$("customerTable").clearAll();
        $$("customerTable").showOverlay("No data found");
      }
    })
    .catch((err) => {
      $$("customerTable").clearAll();
      $$("customerTable").showOverlay("Failed to load data.");
      console.error("Error fetching data:", err);
    });
}

function loadData(id) {
  webix
    .ajax()
    .get("http://localhost:3000/orbit/api/master/customer/data/" + id)
    .then(function (data) {
      var response = JSON.parse(data.text());
      var customerData = response.data;

      var formValues = {
        id: customerData.csacc,
        account: customerData.csacc,
        name: customerData.csname,
        // nickname: customerData.cscontact,
        address1: customerData.csalm1,
        address2: customerData.csalm2,
        address3: customerData.csalm3,
        city: customerData.cscity,
        postcode: customerData.cspost,
        phone: customerData.csphone,
        fax: customerData.csfax,
        contact: customerData.cscontact,
        email: customerData.csemail,
        npwp: customerData.csnpwp,
        top: customerData.cstop,
        discount: customerData.csdisc,
        desmaker: customerData.csdescmaker,
        joiningdate: customerData.csdate,
        groupcustomer: customerData.cspickupzone,
        active: customerData.csenable ? 1 : 0,
        hidden: customerData.csenable ? 0 : 1,
        accounthandler: customerData.csuser,
        saleshandler: customerData.cssales,
      };

      $$("customerForm").setValues(formValues);
    })
    .catch(function (error) {
      console.error("Error fetching customer data:", error);
    });
}

function saveCustomer() {
  var formValues = $$("customerForm").getValues();

  if (!$$("customerForm").validate()) {
    webix.message({
      type: "error",
      text: "Please fill in all required fields!",
    });
    return;
  } else {
    clearCustomerForm();
  }

  var requestDataSave = {
    csacc: formValues.account,
    csname: formValues.name,
    csalm1: formValues.address1,
    csalm2: formValues.address2,
    csalm3: formValues.address3,
    cscity: formValues.city,
    cspost: formValues.postcode,
    csphone: formValues.phone,
    csfax: formValues.fax,
    csemail: formValues.email,
    cscontact: formValues.contact,
    csnpwp: formValues.npwp,
    cstop: formValues.top,
    csdisc: formValues.discount,
    csdescmaker: formValues.desmaker,
    csdate: formValues.joiningdate,
    cspickupzone: formValues.groupcustomer,
    csenable: formValues.active ? true : false,
    csuser: formValues.accounthandler,
    cssales: formValues.saleshandler,
  };

  var requestDataUpdate = {
    csname: formValues.name,
    // cscontact: formValues.nickname,
    csalm1: formValues.address1,
    csalm2: formValues.address2,
    csalm3: formValues.address3,
    cscity: formValues.city,
    cspost: formValues.postcode,
    csphone: formValues.phone,
    csfax: formValues.fax,
    csemail: formValues.email,
    cscontact: formValues.contact,
    csnpwp: formValues.npwp,
    cstop: formValues.top,
    csdisc: formValues.discount,
    csdescmaker: formValues.desmaker,
    csdate: formValues.joiningdate,
    cspickupzone: formValues.groupcustomer,
    csenable: formValues.active ? true : false,
    csuser: formValues.accounthandler,
    cssales: formValues.saleshandler,
  };

  if (formValues.id) {
    axios
      .put(
        `http://localhost:3000/orbit/api/master/customer/edit/${formValues.account}`,
        requestDataUpdate
      )
      .then(function () {
        webix.message({
          type: "success",
          text: "Customer updated successfully!",
        });
        $$("mainTab").getTabbar().setValue("browseTab");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error updating customer!" });
        console.error("Error updating data:", error);
      })
      .finally(loadCustomerData);
  } else {
    axios
      .post(
        "http://localhost:3000/orbit/api/master/customer/tambah",
        requestDataSave
      )
      .then(function () {
        webix.message({
          type: "success",
          text: "Customer added successfully!",
        });
        $$("mainTab").getTabbar().setValue("browseTab");
      })
      .catch(function (error) {
        webix.message({ type: "error", text: "Error adding customer!" });
        console.error("Error adding data:", error);
      })
      .finally(loadCustomerData);
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

function clearCustomerForm() {
  $$("customerForm").clear();
  $$("customerForm").elements.account.enable();
}

function deleteCustomer() {
  var id = $$("customerTable").getSelectedId();

  if (id) {
    var selectedData = $$("customerTable").getItem(id);
    console.log(selectedData);
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
            `http://localhost:3000/orbit/api/master/customer/delete/${selectedData.account}`
          )
          .then(function () {
            webix.message({
              type: "success",
              text: "Customer deleted successfully!",
            });
            loadCustomerData();
          })
          .catch(function (error) {
            webix.message({ type: "error", text: "Error deleting service!" });
            console.error("Error deleting data:", error);
          });
      }
    },
  });
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
          saveCustomer();
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
          deleteCustomer();
          clearCustomerForm();
        },
      },
    },
  ],
};

var tabview = {
  view: "tabview",
  id: "mainTab",
  height: 1200,
  cells: [
    {
      header: "Input Mode",
      id: "inputTab",
      width: 150,
      autoheight: true,
      body: {
        view: "form",
        id: "customerForm",
        elements: [
          {
            view: "template",
            template: "<b>GENERAL INFO</b>",
            type: "section",
          },
          {
            cols: [
              {
                view: "text",
                label: "Account <span style='color: red;'>* </span>",
                name: "account",
                labelPosition: "top",
                width: 350,
              },

              { width: 20 },
              {
                view: "text",
                label: "Customer <span style='color: red;'>* </span>",
                name: "name",
                labelPosition: "top",
                width: 350,
              },
            ],
          },
          // {
          //   cols: [
          //     {
          //       view: "text",
          //       label: "Customer <span style='color: red;'>* </span>",
          //       name: "name",
          //       labelPosition: "top",
          //       width: 350,
          //     },
          //     { width: 20 },
          //     // {
          //     //   view: "text",
          //     //   label: "Nickname <span style='color: red;'>* </span>",
          //     //   name: "nickname",
          //     //   labelPosition: "top",
          //     //   width: 350,
          //     // },
          //   ],
          // },
          {
            view: "text",
            label: "Address <span style='color: red;'>* </span>",
            name: "address1",
            labelPosition: "top",
            width: 800,
          },
          {
            view: "text",
            name: "address2",
            labelPosition: "top",
            width: 800,
          },
          {
            view: "text",
            name: "address3",
            labelPosition: "top",
            width: 800,
          },
          {
            cols: [
              {
                view: "text",
                label: "City <span style='color: red;'>* </span>",
                name: "city",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "text",
                label: "Post Code <span style='color: red;'>* </span>",
                name: "postcode",
                labelPosition: "top",
                width: 350,
              },
            ],
          },
          // {
          //   cols: [
          //     {
          //       view: "textarea",
          //       label: "Completed Address",
          //       name: "completedaddress",
          //       labelPosition: "top",
          //       width: 800,
          //     },
          //   ],
          // },
          {
            view: "template",
            template: "<b>CONTACT INFO</b>",
            type: "section",
          },
          {
            cols: [
              {
                view: "text",
                label: "Phone",
                name: "phone",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "text",
                label: "Fax",
                name: "fax",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "text",
                label: "Contact <span style='color: red;'>* </span>",
                name: "contact",
                labelPosition: "top",
                width: 350,
              },
            ],
          },
          {
            cols: [
              {
                view: "text",
                label: "Email",
                name: "email",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "text",
                label: "NPWP",
                name: "npwp",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "text",
                label: "Term Of Payment <span style='color: red;'>* </span>",
                name: "top",
                labelPosition: "top",
                width: 350,
              },
            ],
          },
          {
            cols: [
              {
                view: "text",
                label: "Discount <span style='color: red;'>* </span>",
                name: "discount",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "text",
                label: "Dessicion Maker",
                name: "desmaker",
                labelPosition: "top",
                width: 350,
              },
            ],
          },
          {
            view: "template",
            template: "<b>ADDITIONAL INFO</b>",
            type: "section",
          },
          {
            cols: [
              {
                view: "datepicker",
                label: "Joining Date <span style='color: red;'>* </span>",
                name: "joiningdate",
                labelPosition: "top",
                width: 350,
              },
              { width: 20 },
              {
                view: "richselect",
                label: "Group Customer <span style='color: red;'>* </span>",
                name: "groupcustomer",
                id: "groupcustomer",
                labelPosition: "top",
                width: 350,
                options: [],
              },
            ],
          },
          {
            cols: [
              {
                view: "checkbox",
                label: "Active",
                name: "active",
                labelPosition: "top",
                width: 200,
              },
            ],
          },
          {
            cols: [
              {
                view: "richselect",
                label: "Account Handler <span style='color: red;'>* </span>",
                name: "accounthandler",
                labelPosition: "top",
                width: 350,
                options: [
                  { id: "A0001", value: "Andi Pratama" },
                  { id: "A0002", value: "Dewi Lestari" },
                ],
              },
              { width: 20 },
              {
                view: "richselect",
                label: "Sales Handler <span style='color: red;'>* </span>",
                name: "saleshandler",
                labelPosition: "top",
                width: 350,
                options: [
                  { id: "S0001", value: "Budi Santoso" },
                  { id: "S0002", value: "Siti Rahma" },
                ],
              },
            ],
          },
        ],
        rules: {
          account: webix.rules.isNotEmpty,
          name: webix.rules.isNotEmpty,
          address1: webix.rules.isNotEmpty,
          city: webix.rules.isNotEmpty,
          postcode: webix.rules.isNotEmpty,
          discount: webix.rules.isNotEmpty,
          contact: webix.rules.isNotEmpty,
          top: webix.rules.isNotEmpty,
          joiningdate: webix.rules.isNotEmpty,
          groupcustomer: webix.rules.isNotEmpty,
          accounthandler: webix.rules.isNotEmpty,
          saleshandler: webix.rules.isNotEmpty,
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
                placeholder: "Ketik disini untuk mencari data",
                align: "right",
                on: {
                  onTimedKeyPress: function () {
                    const value = this.getValue().toLowerCase();
                    $$("customerTable").filter(function (obj) {
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
            id: "customerTable",
            columns: [
              { id: "account", header: "Account", width: 150 },
              // { id: "nickname", header: "NickName", width: 150 },
              { id: "name", header: "Name", width: 200 },
              { id: "city", header: "City", width: 150 },
              { id: "phone", header: "Phone", width: 150 },
              { id: "top", header: "TOP", width: 150 },
              { id: "groupcustomer", header: "Group Customer", width: 150 },
              { id: "active", header: "Active", width: 100 },
            ],
            autoheight: true,
            select: true,
            on: {
              onItemClick: function (id) {
                var selected = this.getItem(id);
                selected.active = selected.active === "True" ? 1 : 0;
                $$("customerForm").setValues(selected);
                $$("customerForm").elements.account.disable();
                $$("mainTab").getTabbar().setValue("inputTab");
                loadData(selected.account);
              },
            },
          },
        ],
      },
    },
  ],
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    width: 1200,
    margin: 10,
    rows: [header, tabview],
  });

  loadCustomerData();

  loadComboData(
    "master/groupcustomer/data",
    "groupcustomer",
    "cltbcust_cspickupzone",
    "groupdesc"
  );
});
