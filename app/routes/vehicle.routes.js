module.exports = app => {
  const vehicles = require("../controllers/vehicle.controller");

  var router = require("express").Router();

  // Create a new TouristGuide
  router.post("/", vehicles.create);

  // Retrieve all TouristGuides
  router.get("/", vehicles.findAll);

  // Retrieve a single TouristGuide with id
  router.get("/:id", vehicles.findOne);

  // Update a TouristGuide with id
  router.put("/:id", vehicles.update);

  // Delete a TouristGuide with id
  router.delete("/:id", vehicles.delete);

  // Create a new TouristGuide
  router.delete("/", vehicles.deleteAll);

  app.use("/api/vehicles", router);
};
