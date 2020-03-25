const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const morgan = require('morgan');
const bookshelf = require('./bookshelf');

var slideStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./database/images/slides"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.png`)
  }
});
var slideUpload = multer({ storage: slideStorage });

const {
     Session,
     Dates,
     Team,
     State,
     Song,
     Slide,
     SessionSong
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
    replaceSlide,
} = require('./slides');

const {
    getSessionSongs,
    getSongSessions,
    newSessionSong,
    deleteSessionSong,
} = require('./session-songs');

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

app.use('/slide', express.static(__dirname + '/database/images/slides'));

app.post('/slide', slideUpload.single('slide'), async (req, res) => {
    try {
      res.json(await newSlide(req.body, req.file.filename));
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

app.post('/slide/:id', slideUpload.single('slide'), async (req, res) => {
    try {
      res.json(await replaceSlide(req.params.id, req.file.filename));
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

// SessionSong CRUD

app.get('/session-song/session/:id', async (req, res) => {
    try {
      res.json(await getSessionSongs(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.get('/session-song/song/:id', async (req, res) => {
    try {
      res.json(await getSongSessions(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.post('/session-song', async (req, res) => {
    try {
      res.json(await newSessionSong(req.body));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/session-song/session/:sessionId/song/:songId', async (req, res) => {
    try {
      res.send(await deleteSessionSong(req.params.sessionId, req.params.songId));
    } catch (e) {
      res.status(400).send(e.message);
    }
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
