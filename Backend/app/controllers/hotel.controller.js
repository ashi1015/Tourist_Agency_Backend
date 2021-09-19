const db = require("../models");
const Hotel = db.hotels;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hotelName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const hotel = new Hotel({
    hotelName: req.body.hotelName,
    description: req.body.description,
    address: req.body.address,
    date_of_registration: req.body.date_of_registration,
    registrationFee: req.body.registrationFee,
    altitude: req.body.altitude,
    priceRange: req.body.priceRange,
    contactNo: req.body.contactNo,
    email: req.body.email,
    amenity1: req.body.amenity1,
    amenity2: req.body.amenity2,
    amenity3: req.body.amenity3,
    feature1: req.body.feature1,
    feature2: req.body.feature2,
    feature3: req.body.feature3,
    cuisine1: req.body.cuisine1,
    cuisine2: req.body.cuisine2,
    cuisine3: req.body.cuisine3,
    published: req.body.published ? req.body.published : false,
  });

  // Save Tutorial in the database
  hotel
    .save(hotel)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hotel.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, hotelName } = req.query;
  var condition = hotelName
    ? { hotelName: { $regex: new RegExp(hotelName), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Hotel.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        hotels: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Hotels.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hotel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Hotel with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotel with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Hotel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found!`,
        });
      } else res.send({ message: "Hotel was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Hotel with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hotel.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`,
        });
      } else {
        res.send({
          message: "Hotel was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hotel with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Hotel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Hotels were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Hotels.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Hotel.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        hotels: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Hotels.",
      });
    });
};
