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
    validate: {
      max: 5,
      min: 1,
    },
  },
});

Movie.createRandom = function () {
  return Movie.create({
    name: faker.company.catchPhrase(),
  });
};

Movie.prototype.updateRating = function (method) {
  try {
    const newRating = method === "subtract" ? this.rating - 1 : this.rating + 1;
    if (newRating < 1 || newRating > 5) {
      const error = Error("Ratings have to be between 1 and 5");
      error.status = 400;
      throw error;
    }
    return Movie.update(
      {
        rating: method === "subtract" ? this.rating - 1 : this.rating + 1,
      },
      { where: { id: this.id } }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = Movie;
