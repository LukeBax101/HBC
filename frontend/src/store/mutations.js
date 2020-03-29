export const mutations = {
  updateSessions: (state, data) => {
    state.sessions = {
      ...state.sessions,
      [data.session_id]: data,
    };
  },
  setActiveSessionIdMutation: (state, id) => {
    state.activeSessionId = id;
  },
  setActiveSongIdMutation: (state, id) => {
    state.activeSongId = id;
  },
  updateAllSessions: (state, data) => {
    state.sessions = data.reduce((acc, session) => ({
      ...acc,
      [session.session_id]: session,
    }), {});
  },
  updateAllSongs: (state, data) => {
    state.songs = data.reduce((acc, song) => ({
      ...acc,
      [song.song_id]: song,
    }), {});
  },
};
