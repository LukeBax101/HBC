import { api } from './api';

export const actions = {
  ...api,
  setActiveSessionId: ({ commit }, id) => commit('setActiveSessionIdMutation', id),
  setActiveSongId: ({ commit }, id) => commit('setActiveSongIdMutation', id),
  socket_newSession({ commit }, data) {
    commit('updateSessions', data);
  },
};
