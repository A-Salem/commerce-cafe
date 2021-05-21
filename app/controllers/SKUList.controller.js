const db = require("../models");
const SKUList = db.SKUList;
const Products = db.products;
const Flavors = db.flavors;
const Sizes = db.sizes;

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  // validate filters
  const {
    product_type,
    water_line,
    coffee_flavor,
    pack_size
  } = req.query;
  const allowed_product_type = [
    "machine",
    "pod",
    "COFFEE_MACHINE_LARGE",
    "COFFEE_MACHINE_SMALL",
    "ESPRESSO_MACHINE",
    "COFFEE_MACHINE_LARGE",
    "COFFEE_MACHINE_SMALL",
    "ESPRESSO_MACHINE",
    "COFFEE_POD_LARGE",
    "COFFEE_POD_SMALL",
    "ESPRESSO_POD"
  ];
  const allowed_water_line = [true, false];
  const allowed_coffee_flavor = [
    "COFFEE_FLAVOR_VANILLA",
    "COFFEE_FLAVOR_CARAMEL",
    "COFFEE_FLAVOR_PSL",
    "COFFEE_FLAVOR_MOCHA",
    "COFFEE_FLAVOR_HAZELNUT"
  ];
  const allowed_pack_size = ["base", "premium", "deluxe", "1 dozen", "3 dozen", "5 dozen", "7 dozen"];
  const allowed_sizes_for_machine = ["base", "premium", "deluxe"];

  if (
    product_type && !allowed_product_type.includes(product_type) ||
    water_line && !allowed_water_line.includes(water_line) ||
    coffee_flavor && !allowed_coffee_flavor.includes(coffee_flavor) ||
    pack_size && !allowed_pack_size.includes(pack_size)
  ) {
    return res.status(400).send({
      message: "Invalid query."
    });
  }

  if (
    (product_type.indexOf("machine") >= 0 || product_type.indexOf("MACHINE") >= 0) &&
    (coffee_flavor || (pack_size && pack_size.indexOf("dozen") >= 0))
  ) {
    return res.status(400).send({
      message: "Flavor or size filter don't match with your product selection."
    });
  }

  if (
    (product_type.indexOf("pod") >= 0 || product_type.indexOf("POD") >= 0) &&
    (water_line || (pack_size && allowed_sizes_for_machine.includes(pack_size)))
  ) {
    return res.status(400).send({
      message: "Flavor or size filter don't match with your product selection."
    });
  }

  // apply filters
  const condition = {};

  // setting waterLine
  if (water_line) {
    condition.water_line_compatible = water_line;
  }

  // setting flavorId
  if (coffee_flavor) {
    const flavorId = await Flavors.findOne({
      name: coffee_flavor
    }).exec();
    condition.flavorId = flavorId;
  }

  // setting sizeId
  if (pack_size) {
    const sizeCondition = pack_size.indexOf("dozen") >= 0 ? {
      dozens: parseInt(pack_size.split(" ")[0])
    } : {
      size: pack_size
    };
    const sizeId = await Sizes.findOne(sizeCondition).exec();
    condition.sizeId = sizeId;
  }

  // setting productType
  if (product_type && ["machine", "pod"].includes(product_type)) {
    condition.productType = product_type;
  } else if (product_type) {
    const products = await Products.find({
      name: product_type,
      water_line
    }).exec();
    const productsIds = products.map((product) => product._id);
    condition.productId = {
      $in: productsIds
    };
  }

  try {
    const data = await SKUList.find(condition)
      .select({
        "_id": 0,
        "code": 1,
        "productName": 1,
        "size": 1,
        "productType": 1,
        "water_line_compatible": 1
      })
      .exec();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving SKUList."
    });
  }
};