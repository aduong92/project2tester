/* eslint-disable camelcase */
var Prod = require("../models/product");

module.exports = function(app) {
  // Get all chirps
  app.get("/product", function(req, res) {
    Prod.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  app.get("/api/:id?", function(req, res) {
    if (req.params.id) {
      Prod.findOne({
        where: {
          prod_id: req.params.id
        }
      }).then(function(result) {
        return res.json(result);
      });
    }
  });
};
