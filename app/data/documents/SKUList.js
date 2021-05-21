const {
  ObjectId
} = require("mongodb");

const db = require("../../models");
const Products = db.products;
const Sizes = db.sizes;
const Flavors = db.flavors;

const SKUList = [];
const mainList = [
  "CM001– small machine, base model",
  "CM002– small machine, premium model",
  "CM003– small machine, deluxe model, water line compatible",
  "CM101– large machine, base model",
  "CM102– large machine, premium model, water line compatible",
  "CM103– large machine, deluxe model, water line compatible",
  "EM001– espresso machine, base model",
  "EM002– espresso machine, premium model",
  "EM003– espresso machine, deluxe model, water line compatible",
  "CP001– small coffee pod, 1 dozen, vanilla",
  "CP003– small coffee pod, 3 dozen, vanilla",
  "CP011– small coffee pod, 1 dozen, caramel",
  "CP013– small coffee pod, 3 dozen, caramel",
  "CP021– small coffee pod, 1 dozen, psl",
  "CP023– small coffee pod, 3 dozen, psl",
  "CP031– small coffee pod, 1 dozen, mocha",
  "CP033– small coffee pod, 3 dozen, mocha",
  "CP041– small coffee pod, 1 dozen, hazelnut",
  "CP043– small coffee pod, 3 dozen, hazelnut",
  "CP101– large coffee pod, 1 dozen, vanilla",
  "CP103– large coffee pod, 3 dozen, vanilla",
  "CP111– large coffee pod, 1 dozen, caramel",
  "CP113– large coffee pod, 3 dozen, caramel",
  "CP121– large coffee pod, 1 dozen, psl",
  "CP123– large coffee pod, 3 dozen, psl",
  "CP131– large coffee pod, 1 dozen, mocha",
  "CP133– large coffee pod, 3 dozen, mocha",
  "CP141– large coffee pod, 1 dozen, hazelnut",
  "CP143– large coffee pod, 3 dozen, hazelnut",
  "EP003– espresso pod, 3 dozen, vanilla",
  "EP005– espresso pod, 5 dozen, vanilla",
  "EP007– espresso pod, 7 dozen, vanilla",
  "EP013– espresso pod, 3 dozen, caramel",
  "EP015– espresso pod, 5 dozen, caramel",
  "EP017– espresso pod, 7 dozen, caramel"
];

module.exports = (async () => {
  for (const item of mainList) {
    const code = item.split("–")[0].trim();
    const water_line_compatible = (item.indexOf("water line compatible") >= 0) ? true : false;
    const productType = (item.indexOf("machine") >= 0) ? "machine" : "pod";

    // flavor
    let flavorId;
    let flavor = item.split("–")[1].split(',').pop().trim();
    const flavorDoc = await Flavors.findOne({
      name: `COFFEE_FLAVOR_${flavor.toUpperCase()}`
    }).exec();
    if (flavorDoc) {
      flavor = flavorDoc.name;
      flavorId = ObjectId(flavorDoc._id);
    }

    // size
    let sizeQuery;
    size = item.split("–")[1].split(',')[1].trim();
    if (size.indexOf("dozen") < 0) {
      size = size.split("model")[0].trim();
      sizeQuery = {
        size
      };
    } else {
      sizeQuery = {
        dozens: parseInt(size.split('dozen')[0])
      }
    }
    const sizeDoc = await Sizes.findOne(sizeQuery).exec();
    const sizeId = ObjectId(sizeDoc._id);

    // product
    switch (item.split("–")[1].split(',')[0].trim()) {
      case "small machine":
        productName = "COFFEE_MACHINE_SMALL";
        break;
      case "large machine":
        productName = "COFFEE_MACHINE_LARGE";
        break;
      case "espresso machine":
        productName = "ESPRESSO_MACHINE";
        break;
      case "small coffee pod":
        productName = "COFFEE_POD_SMALL";
        break;
      case "large coffee pod":
        productName = "COFFEE_POD_LARGE";
        break;
      case "espresso pod":
        productName = "ESPRESSO_POD";
        break;
    }
    const productDoc = await Products.where({
      name: productName
    }, {
      water_line_compatible
    }).findOne({}).exec();
    const productId = ObjectId(productDoc._id);
    const SKUListItem = {
      code,
      productId,
      productName,
      flavorId,
      flavor,
      sizeId,
      size,
      productType,
      water_line_compatible
    };

    if (!SKUListItem.flavorId) {
      delete SKUListItem["flavorId"];
      delete SKUListItem["flavor"];
    }

    SKUList.push(SKUListItem);
  }

  return SKUList;
})();
