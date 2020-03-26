const { SessionSong }  = require('./models');

async function newSessionSong(req) {
    if (req && req['song_id'] && req['session_id'] && req['song_no']) {
      const sessionSong = await SessionSong.forge({
        'session_id': req['session_id'],
        'song_id': req['song_id'],
        'song_no': req['song_no'],
      }).save();
      return sessionSong.toJSON();
    } else {
      throw new Error('Please provide song ID, session ID and song number')
    }
}

async function getSessionSongs(sessionId) {
    const sessionSongs = await SessionSong.where({ 'session_id': sessionId}).fetchAll();
    return sessionSongs.toJSON();
}

async function editSessionSong(req) {
    if (req && req['song_id'] && req['session_id'] && req['song_no']) {
      const sessionSongModel = await new SessionSong({
        'session_id': req['session_id'],
        'song_id': req['song_id'],
      });
      const sessionSongRequest = await sessionSongModel.set({
        'session_id': req['session_id'],
        'song_id': req['song_id'],
        'song_no': req['song_no'],
      });
      return sessionSongModel.save();
    } else {
      throw new Error('Please provide song ID, session ID and song number')
    }
}

async function getSongSessions(songId) {
  const sessionSongs = await SessionSong.where({ 'song_id': songId}).fetchAll();
  return sessionSongs.toJSON();
}

async function deleteSessionSong(sessionId, songId) {
    await SessionSong.where({
       ['session_id']: sessionId,
       ['song_id']: songId,
     }).destroy({require: true});

    return 'Successfully deleted session-song';
}

module.exports = {
    newSessionSong,
    getSessionSongs,
    getSongSessions,
    deleteSessionSong,
    editSessionSong,
};
