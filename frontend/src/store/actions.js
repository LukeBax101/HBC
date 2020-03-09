export const actions = {
  decrementCounterAction: ({ commit }) => commit('decrementCounterMutation'),
  incrementCounterAction: ({ commit }) => commit('incrementCounterMutation'),
  getSessions: () => {
    console.log('get all sessions');
  },
  addSession: () => {
    console.log('add session');
  },
};
