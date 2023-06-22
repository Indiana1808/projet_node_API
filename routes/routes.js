const express = require('express');
const controller = require('../controller/Controller');
const router = express.Router();

router.get('/actor', controller.getActors);
router.get('/actor/:id', controller.getActorWithID);
router.post('/actor', controller.postActor);
router.put('/actor/:id', controller.putActorWithID);
router.delete('/actor/:id', controller.deleteActorWithID);

router.get('/genre', controller.getGenres);
router.post('/genre', controller.postGenres);
router.delete('/genre/:id', controller.deleteGenresWithID);

router.get('/film', controller.getFilms);
router.get('/film/:id', controller.getFilmWithID);
router.post('/film', controller.postFilm);
router.put('/film/:id', controller.putFilmWithID);
router.delete('/film/:id', controller.deleteFilmWithID);

module.exports = router;