module.exports = mongoose => {
  const schema = mongoose.Schema({
    name: String,
    type: {
      type: String,
      enum: ['machine', 'pod'],
    },
    water_line_compatible: Boolean
  }, {
    timestamps: true
  })

  const Products = mongoose.model("products", schema);

  return Products;
};