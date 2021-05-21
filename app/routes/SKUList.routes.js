module.exports = async app => {
  const SKUList = require("../controllers/SKUList.controller.js");

  var router = require("express").Router();

  // Retrieve all and filtered products
  router.get("/", await SKUList.findAll);
  
  app.use('/api/SKUList', router);
};