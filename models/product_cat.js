/* eslint-disable camelcase */
// Import the ORM to create functions that will interact with the database.
// This may be confusing but here Sequelize (capital) references the standard library
// Creates a "Chirp" model that matches up with DB
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

var Cat = sequelize.define(
  "product_cat",
  {
    cat_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    prod_name: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  },
  (Prod = sequelize.define(
    "product",
    {
      prod_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      cat_id: {
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
    // eslint-disable-next-line prettier/prettier
  ))
);

// Syncs with DB
Cat.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Cat;
