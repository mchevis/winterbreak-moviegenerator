const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/winterbreak-movies",
  {
    logging: false,
  }
);

module.exports = conn;
