module.exports = app => {
  const touristGuides = require("../controllers/tourist-guide.controller.js");

  var router = require("express").Router();

  // Create a new TouristGuide
  router.post("/", touristGuides.create);

  // Retrieve all TouristGuides
  router.get("/", touristGuides.findAll);

  // Retrieve a single TouristGuide with id
  router.get("/:id", touristGuides.findOne);

  // Update a TouristGuide with id
  router.put("/:id", touristGuides.update);

  // Delete a TouristGuide with id
  router.delete("/:id", touristGuides.delete);

  // Create a new TouristGuide
  router.delete("/", touristGuides.deleteAll);

  app.use("/api/touristGuides", router);
};
