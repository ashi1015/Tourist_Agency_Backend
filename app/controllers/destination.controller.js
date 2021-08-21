const db = require("../models");
const Destination = db.destinations;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Destination
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Destination
  const destination = new Destination({
    title: req.body.title,
    description: req.body.description,
    city: req.body.city,
    coordinates: req.body.coordinates,
    area: req.body.area,
    altitude: req.body.altitude,
    temperature: req.body.temperature,
    contact: req.body.contact,
    visaRequirement: req.body.visaRequirement,
    published: req.body.published ? req.body.published : false,
  });

  // Save Destination in the database
  destination
    .save(destination)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Destination.",
      });
    });
};

// Retrieve all Destinations from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

  const { limit, offset } = getPagination(page, size);

  Destination.paginate(condition, { offset, limit })
      .then((data) => {
        res.send({
          totalItems: data.totalDocs,
          destinations: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving destinations.",
        });
      });
};

// Find a single Destination with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Destination.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found Destination with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res
            .status(500)
            .send({ message: "Error retrieving Destination with id=" + id });
      });
};


// Update a Destination by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Destination.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Destination with id=${id}. Maybe Destination was not found!`,
          });
        } else res.send({ message: "Destination was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Destination with id=" + id,
        });
      });
};