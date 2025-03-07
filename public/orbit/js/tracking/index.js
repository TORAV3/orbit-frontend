var time_data = [
  {
    status: "POD",
    statusTime: "2025-03-07",
    remarks: "HAWB telah diterima dan POD ditandatangani oleh Yono",
    statusCode: "PS",
  },
  {
    status: "Out BDO sorting facility (with courier)",
    statusTime: "2025-03-07",
    remarks: "Shipment sedang dikirim oleh courier",
    statusCode: "10",
  },
  {
    status: "Receive dest hub (BDO)",
    statusTime: "2025-03-06",
    remarks: "Shipment telah diterima di dest hub (BDO)",
    statusCode: "HD",
  },
  {
    status: "Receive dest gateway (BDO)",
    statusTime: "2025-03-06",
    remarks: "Shipment telah diterima di dest gateway (BDO)",
    statusCode: "HC",
  },
  {
    status: "Departure gateway",
    statusTime: "2025-03-06",
    remarks: "Shipment akan diberangkatkan ke Sorting facility tujuan (BDO)",
    statusCode: "DP",
  },
  {
    status: "Out JKT sorting facility",
    statusTime: "2025-03-05",
    remarks:
      "Shipment sedang dalam proses serah terima untuk diberangkatkan ke Gateway",
    statusCode: "ST",
  },
  {
    status: "Bagging",
    statusTime: "2025-03-05",
    remarks: "Shipment sedang dalam proses Bagging di Sorting Facility",
    statusCode: "MB",
  },
  {
    status: "Receive JKT sorting facility",
    statusTime: "2025-03-05",
    remarks: "Shipment diterima di sorting facility JKT",
    statusCode: "RW",
  },
  {
    status: "Pickup Shipment",
    statusTime: "2025-03-05",
    remarks: "Shipment telah selesai Pickup",
    statusCode: "PU",
  },
];

time_data = time_data.map(function (item) {
  return {
    value: item.status,
    date: item.statusTime,
    details: item.remarks,
  };
});

var color = function (obj) {
  if (obj.value == "POD") return "#55CD97";
  else return "#1CA1C1";
};

var timeline = {
  view: "timeline",
  height: 400,
  width: 500,
  type: {
    height: 120,
    lineColor: color,
  },
  data: time_data,
};

var details = {
  view: "template",
  id: "trackingTemplate",
  width: 650,
  height: 300,
  template: function (obj) {
    return `
          <div style="font-family: Arial, sans-serif; color: #000; font-size: 14px; padding: 10px;">
            <table style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
              <tr>
                <td style="font-weight: bold; width: 150px; padding-bottom: 5px;">No HAWB </td>
                <td style="padding-bottom: 5px;">: ${obj.awb}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px;">Tanggal Pengiriman </td>
                <td style="padding-bottom: 5px;">: ${obj.shipment_date}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px;">Asal </td>
                <td style="padding-bottom: 5px;">: ${obj.sender_address}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px;">Tujuan </td>
                <td style="padding-bottom: 5px;">: ${obj.receiver_address}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px;">Pengirim </td>
                <td style="padding-bottom: 5px;">: ${obj.sender}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px;">Penerima </td>
                <td style="padding-bottom: 5px;">: ${obj.receiver_name}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px;">Status </td>
                <td style="padding-bottom: 5px;">: ${obj.status}<br>${obj.POD_receiver_time}</td>
              </tr>
            </table>
          </div>
        `;
  },
  borderless: true,
  data: {
    awb: "123",
    status: "POD",
    sender: "ORBIT, PT",
    receiver_name: "Yono Bakrie",
    sender_address: "JL. RAYA JAKARTA",
    receiver_address: "JALAN RAYA BANDUNG",
    shipment_date: "05 Maret 2025",
    POD_receiver_time: "07 Maret 2027 18:12:09 (Ditandatangai oleh Yono)",
  },
};

var layout = {
  view: "layout",
  margin: 20,
  cols: [details, timeline],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [layout],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
