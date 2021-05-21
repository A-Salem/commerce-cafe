const db = require("../models");
const Products = db.products;
const Sizes = db.sizes;
const Flavors = db.flavors;
const SKUList = db.SKUList;

(async () => {
  // adding products on first run
  const product = await Products.findOne({}).exec();
  if (!product) {
    const products = require('./documents/products');
    await Products.create(...products);
  }

  // adding sizes on first run
  const size = await Sizes.findOne({}).exec();
  if (!size) {
    const sizes = require('./documents/sizes');
    await Sizes.create(...sizes);
  }

  // adding flavors on first run
  const flavor = await Flavors.findOne({}).exec();
  if (!flavor) {
    const flavors = require('./documents/flavors');
    await Flavors.create(...flavors);
  }

  // adding SKUList on first run
  const sku = await SKUList.findOne({}).exec();
  if (!sku) {
    const list = await require('./documents/SKUList');
    await SKUList.create(...list);
  }
})();