const db = require("../models");
const Vehicle = db.vehicles;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Vehicle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fullname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Vehicle
  const vehicle = new Vehicle({
    vehicleNo: req.body.vehicleNo,
    capacity: req.body.capacity,
    seating: req.body.seating,
    loading: req.body.loading,
    ac: req.body.ac,
    driver: req.body.driver,
    fee: req.body.fee,
    availability: req.body.availability,
    published: req.body.published ? req.body.published : false,
  });

  // Save TouristGuide in the database
  vehicle
    .save(vehicle)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TouristGuide.",
      });
    });
};

// Retrieve all TouristGuides from the database.
exports.findAll = (req, res) => {
  const { page, size, vehicleNo } = req.query;
  var condition = vehicleNo
    ? { vehicleNo: { $regex: new RegExp(vehicleNo), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Vehicle.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        vehicles: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles.",
      });
    });
};

// Find a single Vehicle with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicle.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Vehicle with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Vehicle with id=" + id });
    });
};

// Update a TouristGuide by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      } else res.send({ message: "Vehicle was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vehicle with id=" + id,
      });
    });
};

// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      } else {
        res.send({
          message: "Vehicle was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Vehicle with id=" + id,
      });
    });
};

// Delete all Vehicles from the database.
exports.deleteAll = (req, res) => {
  Vehicle.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Vehicles were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vehicles.",
      });
    });
};

// Find all published Vehicles
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Vehicle.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        touristGuides: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles.",
      });
    });
};
