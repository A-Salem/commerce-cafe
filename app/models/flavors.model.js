module.exports = mongoose => {
  const schema = mongoose.Schema({
    name: String
  }, {
    timestamps: true
  })

  const Flavors = mongoose.model("flavors", schema);

  return Flavors;
};