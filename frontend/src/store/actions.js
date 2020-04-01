import { api } from './api';

export const actions = {
  ...api,
  setActiveSongId: ({ commit }, id) => commit('setActiveSongIdMutation', id),
  socket_newSession({ commit }, data) {
    commit('updateSessions', data);
  },
};
