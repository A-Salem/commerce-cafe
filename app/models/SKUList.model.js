const { ObjectId } = require("mongodb");

module.exports = mongoose => {
  const schema = mongoose.Schema({
    code: String,
    productId: ObjectId,
    productName: String,
    flavorId: ObjectId,
    flavor: String,
    sizeId: ObjectId,
    size: String,
    productType: {
      type: String,
      enum: ['machine', 'pod'],
    },
    water_line_compatible: Boolean
  }, {
    timestamps: true
  })

  const SKUList = mongoose.model("SKUList", schema);

  return SKUList;
};