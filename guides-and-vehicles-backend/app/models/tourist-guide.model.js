module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
        fullname: String,
        nic: String,
        email : String,
        phone : String,
        gender : String,
        race : String,
        languages : String,
        skills : String,
        address : String,
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

  const TouristGuide = mongoose.model("touristGuide", schema);
  return TouristGuide;
};
