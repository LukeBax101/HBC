import axios from 'axios';
import { API_URL } from '@/properties';
import EventBus from '@/event-bus';

async function getAllSessions({ commit }) {
  try {
    const req = await axios.get(`${API_URL}/sessions`);
    commit('updateAllSessions', req.data);
  } catch (e) {
    EventBus.$emit('show-alert', { text: `Error: ${e.response.data}` });
  }
}

async function getAllSongs({ commit }) {
  try {
    const req = await axios.get(`${API_URL}/songs`);
    commit('updateAllSongs', req.data);
  } catch (e) {
    EventBus.$emit('show-alert', { text: `Error: ${e.response.data}` });
  }
}

async function loginToSession({ commit }, data) {
  try {
    const req = await axios.post(`${API_URL}/session/login/${data.session_id}`, {
      password: data.password,
    });
    if (req.status === 200) {
      commit('setActiveSessionIdMutation', data.session_id);
      EventBus.$emit('show-alert', { text: 'Login Successful', type: 'success' });
    }
  } catch (e) {
    if (e.response.status === 401) {
      EventBus.$emit('show-alert', { text: 'Incorrect Password' });
    } else {
      EventBus.$emit('show-alert', { text: `Error: ${e.response.data}` });
    }
  }
}

// eslint-disable-next-line
async function wait(time) {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function addSession(_, data) {
  console.log(data);
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
  loginToSession,
};
