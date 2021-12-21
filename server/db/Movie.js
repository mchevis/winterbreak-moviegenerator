const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize.DataTypes;
const conn = require("./conn");
const faker = require("faker");

const Movie = conn.define("movie", {
  name: {
    type: STRING,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
});

Movie.createRandom = function () {
  return Movie.create({
    name: faker.company.catchPhrase(),
  });
};

Movie.prototype.updateRating = function (method) {
  return Movie.update(
    {
      rating: method === "subtract" ? this.rating - 1 : this.rating + 1,
    },
    { where: { id: this.id } }
  );
};

module.exports = Movie;
