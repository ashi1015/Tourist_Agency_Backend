module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
        vehicleNo: String,
        seating: String,
        capacity : String,
        loading : String,
        fee : String,
        driver : String,
        ac : String,
        availability : String,
        published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Vehicle = mongoose.model("vehicle", schema);
  return Vehicle;
};
