const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bookshelf = require('./bookshelf');

const Dates = bookshelf.model('Dates', {
  tableName: 'dates',
  idAttribute: "dates_id",
  uuid: true,
});

const Team = bookshelf.model('Team', {
  tableName: 'teams',
  idAttribute: "team_id",
  uuid: true,
});

const Session = bookshelf.model('Session', {
  tableName: 'sessions',
  idAttribute: "session_id",
  uuid: true,
  songs: function () {
    return this.belongsToMany('Song');
  },
  dates: function () {
    return this.hasOne(Dates);
  },
  state: function () {
    return this.hasOne(State);
  },
});

const Song = bookshelf.model('Song', {
  tableName: 'songs',
  idAttribute: "song_id",
  uuid: true,
  session: function () {
    return this.belongsToMany('Session');
  }
});

const Slide = bookshelf.model('Slide', {
  tableName: 'slides',
  idAttribute: "slide_id",
  uuid: true,
  song: function () {
    return this.belongsTo(Song);
  },
});

const State = bookshelf.model('State', {
  tableName: 'state',
  idAttribute: "state_id",
  uuid: true,
  session: function () {
    return this.belongsTo(Session);
  },
  slide: function () {
    return this.hasOne(Slide);
  }
});

async function newSession(req) {
    try {
        let testDates = await Dates.forge({'day_1': (req && req['day_1']) || new Date(), 'day_2': (req && req['day_2']) || new Date(), 'day_3': (req && req['day_3']) || new Date(), 'final': (req && req.final) || new Date()}).save();
        const datesId = testDates.toJSON()['dates_id'];
        let testState = await State.forge({'home': true, 'race': false, 'song_overlay': false, 'slide_id': null}).save();
        const stateId = testState.toJSON()['state_id'];
        let testSesh = await Session.forge({'name': (req && req.name) || 'Default', 'password_hash': req && req['password_hash'], 'dates_id': datesId, 'state_id': stateId}).save();
        return testSesh.toJSON();
    } catch (e) {
        console.log(`Could not add new session: ${e}`);
    }
}

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/frontend/dist'));

app.get('/sessions', (req, res) => {
    Session.fetchAll().then((messages) => {
        res.json(messages);
    });
});

app.post('/sessions', async (req, res) => {
    const message = await newSession(req.body);
    res.json(message);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
