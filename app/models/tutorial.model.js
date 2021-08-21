module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      hotelName: {type: String},
      description:{type: String},
      address: {type: String},
      date_of_registration: {type: String},
      registrationFee: {type: String},
      priceRange: {type: String},
      contactNo: {type: String},
      email: {type: String},
      amenity1: {type: String},
      amenity2: {type: String},
      amenity3: {type: String},
      feature1: {type: String},
      feature2: {type: String},
      feature3: {type: String},
      cuisine1: {type: String},
      cuisine2: {type: String},
      cuisine3: {type: String},
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

  const Tutorial = mongoose.model("hotels", schema);
  return Tutorial;
};
