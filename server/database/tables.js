const UserRepository = require("./models/UserRepository");
const VideoRepository = require("./models/VideoRepository");
const CategoryRepository = require("./models/CategoryRepository");
const FavoriteRepository = require("./models/FavoriteRepository");
const HerosliderRepository = require("./models/HerosliderRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table

/** table user */
tables.user = new UserRepository();
/** table video */
tables.video = new VideoRepository();
/** table category */
tables.category = new CategoryRepository();
/** table favorite */
tables.favorite = new FavoriteRepository();
/** table heroslider */
tables.heroslider = new HerosliderRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
