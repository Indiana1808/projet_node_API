const db = require('../database');
const repository = require('../repository/Repository');
const middlewares = require('./middlewares');

exports.getActors = (req, res) => {
    const repo = new repository(db);
    repo.getActors()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.getActorWithID = (req, res) => {
    const repo = new repository(db);
    repo.getActorsWithID(req.params.id)
        .then((result) => {
            res.json({
                data: result
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

exports.postActor = (req, res) => {
    const errors = [];
    ['first_name', 'last_name', 'date_of_birth', 'date_of_death'].forEach((field) => {
        if (field === 'date_of_death' && req.body[field] === null) {
            // Skip null value for date_of_death
            return;
        }
        if (!req.body[field]) {
            errors.push(`Le champ '${field}' est absent du corps de la requête`);
        }

        if (field === 'date_of_birth' || field === 'date_of_death') {
            const dateValue = req.body[field];
            if (dateValue && !middlewares.isValidDate(dateValue)) {
                errors.push(`La valeur '${dateValue}' pour le champ '${field}' n'est pas une date valide. Date prévue au format aaaa-mm-jj`);
            }
        }
    });
    if (errors.length) {
        res.status(400).json({
            errors
        });
        return;
    }

    const repo = new repository(db);

    repo.postActor({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
    })
        .then(() => {
            res
                .status(201)
                .json({
                    status: "Un nouvel acteur a été ajouté à la base de données"
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.putActorWithID = (req, res) => {
    const errors = [];
    ['first_name', 'last_name', 'date_of_birth', 'date_of_death'].forEach((field) => {
        if (field === 'date_of_death' && req.body[field] === null) {
            // Skip null value for date_of_death
            return;
        }
        if (!req.body[field]) {
            errors.push(`Le champ '${field}' est absent du corps de la requête`);
        }

        if (field === 'date_of_birth' || field === 'date_of_death') {
            const dateValue = req.body[field];
            if (dateValue && !middlewares.isValidDate(dateValue)) {
                errors.push(`La valeur '${dateValue}' pour le champ '${field}' n'est pas une date valide. Date prévue au format aaaa-mm-jj`);
            }
        }
    });
    if (errors.length) {
        res.status(400).json({
            errors
        });
        return;
    }

    const repo = new repository(db);
    console.log(req.body);

    repo.putActorWithID(
        req.params.id,
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        }
    )
        .then(() => {
            repo.getActorsWithID(req.params.id)
                .then((result) => {
                    res.status(200)
                        .json({
                            data: result
                        });
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.deleteActorWithID = (req, res) => {
    const repo = new repository(db);

    repo.deleteActorWithID(req.params.id)
        .then(() => {
            res.status(204).json();
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.getGenres = (req, res) => {
    const repo = new repository(db);
    repo.getGenres()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.postGenres = (req, res) => {
    const errors = [];
    if (!req.body.name || req.body.name.trim().length === 0) {
        errors.push("Le champ 'name' est vide ou absent du corps de la requête");
    }
    if (errors.length) {
        res.status(400).json({
            errors
        });
        return;
    }

    const repo = new repository(db);

    repo.postGenres(req.body.name)
        .then(() => {
            res
                .status(201)
                .json({
                    status: "Un nouveau genre a été ajouté à la base de données"
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.deleteGenresWithID = (req, res) => {
    const repo = new repository(db);

    repo.deleteGenresWithID(req.params.id)
        .then(() => {
            res.status(204).json();
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.getFilms = (req, res) => {
    const repo = new repository(db);
    repo.getFilms()
        .then(result => {
            res.status(200).json({ data: result });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.getFilmWithID = (req, res) => {
    const repo = new repository(db);
    repo.getFilmWithID(req.params.id)
        .then((result) => {
            res.json({
                data: result
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

exports.postFilm = (req, res) => {
    const errors = [];
    ['name', 'synopsis', 'release_year', 'genre_id'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Le champ '${field}' est absent du corps de la requête`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            errors
        });
        return;
    }

    const repo = new repository(db);

    repo.postFilm({
        name: req.body.name,
        synopsis: req.body.synopsis,
        release_year: req.body.release_year,
        genre_id: req.body.genre_id
    })
        .then(() => {
            res
                .status(201)
                .json({
                    status: "Un nouveau film a été ajouté à la base de données"
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.putFilmWithID = (req, res) => {
    const errors = [];
    ['name', 'synopsis', 'release_year', 'genre_id'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Le champ '${field}' est absent du corps de la requête`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            errors
        });
        return;
    }

    const repo = new repository(db);
    console.log(req.body);

    repo.putFilmWithID(
        req.params.id,
        {
            name: req.body.name,
            synopsis: req.body.synopsis,
            release_year: req.body.release_year,
            genre_id: req.body.genre_id
        }
    )
        .then(() => {
            repo.getFilmWithID(req.params.id)
                .then((result) => {
                    res.status(200)
                        .json({
                            data: result
                        });
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.deleteFilmWithID = (req, res) => {
    const repo = new repository(db);

    repo.deleteFilmWithID(req.params.id)
        .then(() => {
            res.status(204).json();
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};
