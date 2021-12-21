const conn = require("./conn");
const Movie = require("./Movie");
const faker = require("faker");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    const movies = new Array(3)
      .fill("")
      .map((el) => faker.company.catchPhrase());

    await Promise.all(movies.map((mov) => Movie.create({ name: mov })));

    console.log(`
    
      Seeding successful!
    
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  conn,
  syncAndSeed,
  models: { Movie },
};
