module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
        title: String,
        description: String,
        city : String,
        coordinates : String,
        area : String,
        altitude : String,
        temperature : String,
        contact : String,
        entranceFees : String,
        visaRequirement : String,
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

  const Destination = mongoose.model("destination", schema);
  return Destination;
};
