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
