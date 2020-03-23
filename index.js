const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bookshelf = require('./bookshelf');

const {
    Session,
     Dates,
     Team,
     State,
     Song,
     Slide
} = require('./models');

const {
    newSession,
    getAllSessions,
    getSession,
    editSession,
    deleteSession,
    editDates,
    editState
} = require('./sessions');

const {
    newTeam,
    deleteTeam,
    editTeam,
} = require('./teams');

const {
    newSong,
    deleteSong,
    editSong,
    getSong,
    getAllSongs,
} = require('./songs');

const {
    newSlide,
    deleteSlide,
    editSlide,
    getSlide,
} = require('./slides');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/frontend/dist'));

// Session CRUD

app.get('/sessions', async (req, res) => {
    try {
      res.json(await getAllSessions());
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.get('/session/:id', async (req, res) => {
    try {
      res.json(await getSession(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.post('/session', async (req, res) => {
    try {
      res.json(await newSession(req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.patch('/session/:id', async (req, res) => {
    try {
      res.json(await editSession(req.params.id, req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.patch('/state/:id', async (req, res) => {
    try {
      res.json(await editState(req.params.id, req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.patch('/dates/:id', async (req, res) => {
    try {
      res.json(await editDates(req.params.id, req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/session/:id', async (req, res) => {
    try {
      res.send(await deleteSession(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

// Team

app.post('/team', async (req, res) => {
    try {
      res.json(await newTeam(req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.patch('/team/:id', async (req, res) => {
    try {
      res.json(await editTeam(req.params.id, req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/team/:id', async (req, res) => {
    try {
      res.send(await deleteTeam(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

// Song CRUD

app.get('/songs', async (req, res) => {
    try {
      res.json(await getAllSongs());
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.get('/song/:id', async (req, res) => {
    try {
      res.json(await getSong(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.post('/song', async (req, res) => {
    try {
      res.json(await newSong(req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.patch('/song/:id', async (req, res) => {
    try {
      res.json(await editSong(req.params.id, req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/song/:id', async (req, res) => {
    try {
      res.send(await deleteSong(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

// Slide CRUD

app.get('/slide/:id', async (req, res) => {
    try {
      res.json(await getSlide(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.post('/slide', async (req, res) => {
    try {
      res.json(await newSlide(req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.patch('/slide/:id', async (req, res) => {
    try {
      res.json(await editSlide(req.params.id, req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/slide/:id', async (req, res) => {
    try {
      res.send(await deleteSlide(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
