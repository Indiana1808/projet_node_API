const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "database.sqlite";

const db = new sqlite3.Database(DBSOURCE, (errConnect) => {

  if (errConnect) {
    console.log(errConnect.message);
    throw errConnect;
  } else {
    console.log("Connecté à la base de données SQLite");
    const sql = `CREATE TABLE 'genres' (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'name' varchar(255) NOT NULL
    );
    
    CREATE TABLE 'actors' (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'first_name' varchar(255) NOT NULL,
      'last_name' varchar(255) NOT NULL,
      'date_of_birth' date NOT NULL,
      'date_of_death' date
    );
    
    CREATE TABLE 'films' (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'name' varchar(255) NOT NULL,
      'synopsis' text NOT NULL,
      'release_year' int,
      'genre_id' int NOT NULL
    );
    
    CREATE TABLE 'films_actors' (
      'film_id' INTEGER,
      'actor_id' INTEGER,
      FOREIGN KEY (film_id) REFERENCES films(id),
      FOREIGN KEY (actor_id) REFERENCES actors(id),
      PRIMARY KEY ('film_id', 'actor_id')
    );`;

    db.exec(sql,
      (errQuery) => {
        if (errQuery) {
          
        } else {

          const insertGenre = "INSERT INTO genres (name) VALUES (?)";
          const insertActorsData =
            "INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?, ?, ?, ?)";
          const insertFilmData =
            "INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?, ?, ?, ?)";
          const insertFilmActorsData =
            "INSERT INTO films_actors (film_id, actor_id) VALUES (?, ?)";

          const genres = ["Action", "Comedy", "Drama", "Thriller", "Romance", "Horror", "Adventure", "Sci-Fi", "Fantasy", "Mystery"];

          const actorsData = [
            ['Tom', 'Hanks', '1956-07-09', null],
            ['Brad', 'Pitt', '1963-12-18', null],
            ['Leonardo', 'DiCaprio', '1974-11-11', null],
            ['Jennifer', 'Lawrence', '1990-08-15', null],
            ['Robert', 'Downey Jr.', '1965-04-04', null],
            ['Natalie', 'Portman', '1981-06-09', null],
            ['Johnny', 'Depp', '1963-06-09', null],
            ['Emma', 'Stone', '1988-11-06', null],
            ['Ryan', 'Reynolds', '1976-10-23', null],
            ['Scarlett', 'Johansson', '1984-11-22', null]
          ];

          const filmData = [
            ["The Dark Knight", "Batman fights crime in Gotham City.", 2008, 1],
            ["Inception", "A thief enters people's dreams to steal information.", 2010, 7],
            ["Pulp Fiction", "Various interconnected stories in the criminal underworld.", 1994, 3],
            ["The Shawshank Redemption", "A man finds hope in prison.", 1994, 3],
            ["The Avengers", "Superheroes team up to save the world.", 2012, 1],
            ["Titanic", "A tragic love story on the ill-fated Titanic.", 1997, 5],
            ["Jurassic Park", "Dinosaurs come to life in a theme park.", 1993, 7],
            ["The Matrix", "A computer hacker discovers the truth about reality.", 1999, 7],
            ["The Godfather", "The story of a powerful mafia family.", 1972, 3],
            ["Forrest Gump", "A simple man experiences historical events.", 1994, 3],
          ];

          const filmActorData = [
            [1, 1],
            [1, 5],
            [2, 3],
            [2, 6],
            [3, 4],
            [3, 7],
            [4, 2],
            [4, 8],
            [5, 5],
            [5, 10],
          ];


          genres.forEach((genre) => {
            db.run(insertGenre, [genre], function (err) {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`Genre '${genre}' inserted successfully`);
              }
            });
          });

          actorsData.forEach((data) => {
            db.run(insertActorsData, data, function (err) {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`Actor '${data[0]} ${data[1]}' inserted successfully`);
              }
            });
          });

          filmData.forEach((data) => {
            db.run(insertFilmData, data, function (err) {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`Film '${data[0]}' inserted successfully`);
              }
            });
          });

          filmActorData.forEach((data) => {
            db.run(insertFilmActorsData, data, function (err) {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`Film-Actor relationship [Film ID: ${data[0]}, Actor ID: ${data[1]}] inserted successfully`);
              }
            });
          });
        }
      }
    );
  }
});

module.exports = db;
