/* eslint-disable camelcase */
// Creates a "Chirp" model that matches up with DB
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

var Prod = sequelize.define(
  "product",
  {
    prod_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    prod_name: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(10, 2)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

// Syncs with DB
Prod.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Prod;
