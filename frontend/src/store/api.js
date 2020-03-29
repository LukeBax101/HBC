import { API_URL } from '@/properties';

async function getAllSessions({ commit }) {
  const req = await fetch(`${API_URL}/sessions`);
  const sessions = await req.json();
  commit('updateAllSessions', sessions);
}

async function getAllSongs({ commit }) {
  const req = await fetch(`${API_URL}/songs`);
  const songs = await req.json();
  commit('updateAllSongs', songs);
}

// eslint-disable-next-line
async function wait(time) {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function addSession() {
  console.log('add session');
}

async function addSong() {
  console.log('add song');
}

export const api = {
  getAllSessions,
  getAllSongs,
  addSong,
  addSession,
};
