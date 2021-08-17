const db = require("../models");
const TouristGuide = db.touristGuides;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new TouristGuide
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fullname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a TouristGuide
  const touristGuide = new TouristGuide({
    fullname: req.body.fullname,
    nic: req.body.nic,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    race: req.body.race,
    languages: req.body.languages,
    skills: req.body.skills,
    address: req.body.address,
    availability: req.body.availability,
    published: req.body.published ? req.body.published : false,
  });

  // Save TouristGuide in the database
  touristGuide
    .save(touristGuide)
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
  const { page, size, fullname } = req.query;
  var condition = fullname
    ? { fullname: { $regex: new RegExp(fullname), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  TouristGuide.paginate(condition, { offset, limit })
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
          err.message || "Some error occurred while retrieving touristGuides.",
      });
    });
};

// Find a single TouristGuide with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TouristGuide.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found TouristGuide with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving TouristGuide with id=" + id });
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

  TouristGuide.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update TouristGuide with id=${id}. Maybe TouristGuide was not found!`,
        });
      } else res.send({ message: "TouristGuide was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating TouristGuide with id=" + id,
      });
    });
};

// Delete a TouristGuide with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TouristGuide.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete TouristGuide with id=${id}. Maybe TouristGuide was not found!`,
        });
      } else {
        res.send({
          message: "TouristGuide was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete TouristGuide with id=" + id,
      });
    });
};

// Delete all TouristGuides from the database.
exports.deleteAll = (req, res) => {
  TouristGuide.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} TouristGuides were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all touristGuides.",
      });
    });
};

// Find all published TouristGuides
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  TouristGuide.paginate({ published: true }, { offset, limit })
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
          err.message || "Some error occurred while retrieving touristGuides.",
      });
    });
};
