class Repository {
    constructor(database) {
        this.database = database;
    }

    getActors() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM actors', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows.map((row) => this.decorator(row)));
                }
            });
        });
    };

    getActorsWithID(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM actors WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this.decorator(row));
                }
            });
        });
    };

    postActor(data) {
        return new Promise((resolve, reject) => {
            this.database.run('INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?, ?, ?, ?)',
                [data.first_name, data.last_name, data.date_of_birth, data.date_of_death], (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    };

    putActorWithID(id, data) {
        return new Promise((resolve, reject) => {
            this.database.run('UPDATE actors SET first_name = ?, last_name = ?, date_of_birth = ?, date_of_death = ? WHERE id = ?',
                [data.first_name, data.last_name, data.date_of_birth, data.date_of_death, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    };

    deleteActorWithID(id) {
        return new Promise((resolve, reject) => {
            this.database.run('DELETE FROM actors where id = ?', [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },);
        });
    };

    getGenres() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM genres', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows.map((row) => this.decorator(row)));
                }
            });
        });
    };

    postGenres(genre) {
        return new Promise((resolve, reject) => {
            this.database.run('INSERT INTO genres (name) VALUES (?)',
                [genre], (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    };

    deleteGenresWithID(id) {
        return new Promise((resolve, reject) => {
            this.database.run('DELETE FROM genres where id = ?', [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    };

    getFilms() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM films', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows.map((row) => this.decorator(row)));
                }
            });
        });
    };

    getFilmWithID(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM films WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(this.decorator(row));
                }
            });
        });
    };

    postFilm(data) {
        return new Promise((resolve, reject) => {
            this.database.run('INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?, ?, ?, ?)',
                [data.name, data.synopsis, data.release_year, data.genre_id], (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    };

    putFilmWithID(id, data) {
        return new Promise((resolve, reject) => {
            this.database.run('UPDATE films SET name = ?, synopsis = ?, release_year = ?, genre_id = ? WHERE id = ?',
                [data.name, data.synopsis, data.release_year, data.genre_id, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    };

    deleteFilmWithID(id) {
        return new Promise((resolve, reject) => {
            this.database.run('DELETE FROM films where id = ?', [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    };

    decorator(decorator) {
        return {
            ...decorator
        };
    }
}

module.exports = Repository;