const bookshelf = require('./bookshelf');

const Dates = bookshelf.Model.extend({
  tableName: 'dates',
  idAttribute: "dates_id",
  uuid: true,
});

const Team = bookshelf.Model.extend({
  tableName: 'teams',
  idAttribute: "team_id",
  uuid: true,
});

const Session = bookshelf.Model.extend({
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
}, { dependents: ['dates', 'state']});

const Song = bookshelf.Model.extend({
  tableName: 'songs',
  idAttribute: "song_id",
  uuid: true,
  session: function () {
    return this.belongsToMany('Session');
  }
});

const SessionSong = bookshelf.Model.extend({
  tableName: 'session_songs',
  idAttribute: 'session_song_id',
  uuid: true,
  session: function() {
      return this.hasMany(Session).atach(sessions['session_id']);
  },
  song: function() {
      return this.hasMany(Song).attach(songs['song_id']);
  }
})

const Slide = bookshelf.Model.extend({
  tableName: 'slides',
  idAttribute: "slide_id",
  uuid: true,
  song: function () {
    return this.belongsTo(Song);
  },
});

const State = bookshelf.Model.extend({
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

module.exports = { Dates, State, Session, Team, Song, Slide, SessionSong };
