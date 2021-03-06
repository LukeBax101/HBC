const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const morgan = require('morgan');
const bookshelf = require('./bookshelf');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
var http = require('http');

const {
    slideUpload,
    raceUpload,
    homeUpload,
    teamUpload,
} = require('./uploads');

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
    editState,
    sessionRaceUpload,
    sessionHomeUpload,
    deleteSessionRace,
    deleteSessionHome,
    loginToSession,
} = require('./sessions');

const {
    newTeam,
    deleteTeam,
    editTeam,
    teamIconUpload,
    deleteTeamIcon,
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
    editSessionSong,
} = require('./session-songs');

const app = express();

const password = fs.readFileSync('./secrets/postgres-passwd', 'utf8').trim();


app.use(morgan('tiny'));
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(bodyParser.json());
app.use(cookieParser(password));
app.use('/', express.static(__dirname + '/frontend/dist'));

var server = http.createServer(app);
let io = socketIO.listen(server, {
    transports: ['websocket']
});

// Session CRUD

app.use('/session/race', express.static(__dirname + '/database/images/sessions/race'));
app.use('/session/home', express.static(__dirname + '/database/images/sessions/home'));

app.post('/session/race/:id', raceUpload.single('race'), async (req, res) => {
    try {
      res.json(await sessionRaceUpload(req.params.id, req.file.filename));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.post('/session/home/:id', homeUpload.single('home'), async (req, res) => {
    try {
      res.json(await sessionHomeUpload(req.params.id, req.file.filename));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/session/race/:id', async (req, res) => {
    try {
      res.send(await deleteSessionRace(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/session/home/:id', async (req, res) => {
    try {
      res.send(await deleteSessionHome(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

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

app.post('/session/login/:id', async (req, res) => {
    try {
      const valid = await loginToSession(req.params.id, req.body);
      if (valid) {
        res.cookie('session_id', req.params.id, {
          httpOnly: true,
          signed: true,
          secure: true,
        });
        res.send('Logged in');
      } else {
        res.status(401).send('Invalid credentials')
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.post('/session', async (req, res) => {
    try {
      const session = await newSession(req.body);
      io.emit('new_session', session);
      res.json(session);
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

// Team CRUD

app.use('/team/icon', express.static(__dirname + '/database/images/teams'));

app.post('/team/icon/:id', teamUpload.single('team'), async (req, res) => {
    try {
      res.json(await teamIconUpload(req.params.id, req.file.filename));
    } catch (e) {
      res.status(400).send(e.message);
    }
});

app.delete('/team/icon/:id', async (req, res) => {
    try {
      res.send(await deleteTeamIcon(req.params.id));
    } catch (e) {
      res.status(400).send(e.message);
    }
});


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

app.patch('/session-song', async (req, res) => {
    try {
      res.json(await editSessionSong(req.body));
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
server.listen(port, () => {
    console.log(`listening on ${port}`);
});
