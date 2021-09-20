module.exports = app => {
  const hotels = require("../controllers/hotel.controller.js");

  var router = require("express").Router();

  // Create a new Hotel
  router.post("/", hotels.create);

  // Retrieve all Hotels
  router.get("/", hotels.findAll);

  // Retrieve all published Hotels
  router.get("/published", hotels.findAllPublished);

  // Retrieve a single Hotel with id
  router.get("/:id", hotels.findOne);

  // Update a Hotel with id
  router.put("/:id", hotels.update);

  // Delete a Hotel with id
  router.delete("/:id", hotels.delete);

  // delete a Hotel
  router.delete("/", hotels.deleteAll);

  //Retrieve data for report 
  router.get("/", hotels.hotelReport);

  app.use("/api/hotels", router);
};
