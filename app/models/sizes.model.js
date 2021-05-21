module.exports = mongoose => {
  const schema = mongoose.Schema({
    productType: {
      type: String,
      enum: ['machine', 'pod'],
    },
    size: {
      type: String,
      enum: ["base", "premium", "deluxe"],
    },
    dozens: Number
  }, {
    timestamps: true
  })

  const Sizes = mongoose.model("sizes", schema);

  return Sizes;
};