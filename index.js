var createTemplate = require("passbook");
var fs = require("fs");

exports.handler = (event, context, callback) => {

    var template = createTemplate("storeCard", {
      passTypeIdentifier: "pass.com.glidewelldental.glidewellnow",
      teamIdentifier:     "43VE5L2LNH",
      backgroundColor:   "rgb(229,25,55)",
      foregroundColor: "rgb(255,255,255)",
      labelColor: "rgb(250,250,250)",
      organizationName: "Glidewell Dental Laboratories",
      logoText: "Glidewell NOW",
      barcode : {
        "format" : "PKBarcodeFormatAztec",
        "message" : "Hello world",
        "messageEncoding" : "utf-8"
      },
      backFields: [
        {
          "key": "website",
          "label": "Website",
          "value": "http://www.glidewelldental.com"
        },{
          "key" : "doctorName",
          "label" : "DOCTOR",
          "value" : "George Kortsaridis"
        },{
          "key" : "address",
          "label" : "Address",
          "value" : "23021 Red Corral Str."
        },{
          "key" : "city",
          "label" : "City",
          "value" : "Laguna Hills"
        },{
          "key" : "state",
          "label" : "State",
          "value" : "CA"
        }]

    });

    template.keys("keys", "secret");
    template.loadImagesFrom("images");

    var pass = template.createPass({
      serialNumber:  "clientCard_10-11222",
      description:   "Glidewell NOW customer card"
    });

    pass.primaryFields.add({key: "id", label: "Client ID", value: "10-11222"});
    pass.secondaryFields.add({ key: "clientName", label: "Doctor Name", value : "George Kortsaridis"});
    //pass.auxiliaryFields.add({ key: "clientID", label: "Client ID", value : "10-11222"});

    var file = fs.createWriteStream("mypass1.pkpass");
    pass.on("error", function(error) {
      console.error(error);
      process.exit(1);
    })
    pass.pipe(file);

    callback(null, file);
};
