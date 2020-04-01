<template>
  <div class="sessions">
    <b-overlay
      :show="loading"
      spinner-type="grow"
      rounded="sm"
      class="overlay"
    >
      <Header
        title="Current Sessions"
        leftIcon="arrow-left"
        leftScale="1.7"
        v-on:left-clicked="$router.push('/')"
      ></Header>
      <div class="sessions-list">
        <List
          v-if="sessions"
          :items="sessions"
          :iconA="circle"
          :iconB="calcLocked"
          v-on:item-clicked="sessionClicked"
        >
        </List>
        <Modal
          id = "login-modal"
          :title="loginTitle"
          :fields="loginModal"
          v-on:submit="loginModalSubmit"
        ></Modal>
        <Modal
          id = "new-session-modal"
          title="New Session"
          :fields="newSessionModal"
          v-on:submit="newSessionModalSubmit"
        ></Modal>
      </div>
      <FloatButton
        icon="plus"
        v-on:float-button-clicked="$bvModal.show('new-session-modal')"
      >
      </FloatButton>
      <NavBar
        :icons="navBarIcons"
        :selected="0"
        v-on:nav-bar-clicked="navBarClicked"
      ></NavBar>
    </b-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header.vue';
import NavBar from '@/components/NavBar.vue';
import FloatButton from '@/components/FloatButton.vue';
import Modal from '@/components/Modal.vue';

import List from '@/components/List.vue';

export default {
  name: 'Sessions',
  components: {
    Header,
    NavBar,
    List,
    FloatButton,
    Modal,
  },
  data() {
    return {
      loginAttemptId: '',
      loading: false,
      periodicCheck: 0,
      circle: () => 'Circle',
      navBarIcons: ['list-task', 'music-note-list'],
      loginModal: [{
        id: 'password',
        label: 'Password',
        invalidFeedback: 'Password must be at least 4 characters long',
        isValid: (id) => (id && id.length >= 4),
        type: 'password',
      }],
      newSessionModal: [{
        id: 'name',
        label: 'Name',
        invalidFeedback: 'Name must be at least a character long',
        isValid: (id) => (id && id.length >= 0),
        type: 'text',
      },
      {
        id: 'password',
        label: 'Password',
        invalidFeedback: 'Password must be at least 4 characters long',
        isValid: (id) => (id && id.length >= 4),
        type: 'password',
      }],
    };
  },
  computed: {
    ...mapGetters([
      'sessions',
      'activeSessionId',
    ]),
    loginTitle() {
      return (this.sessions && this.loginAttemptId && this.showLoginModal
        && this.sessions[this.loginAttemptId]
        && this.sessions[this.loginAttemptId].name)
        ? `Login to ${this.sessions[this.loginAttemptId].name}`
        : 'Login';
    },
  },
  async mounted() {
    this.load();
    this.periodicCheck = setInterval(this.getAllSessions, 60000);
  },
  destroyed() {
    clearInterval(this.periodicCheck);
  },
  methods: {
    ...mapActions([
      'addSession',
      'getAllSessions',
      'setActiveSessionId',
      'loginToSession',
    ]),
    async loginModalSubmit(vals) {
      this.loading = true;
      await this.loginToSession({
        session_id: this.loginAttemptId,
        password: vals.password,
      });
      this.loading = false;
      this.loginAttemptId = '';
    },
    newSessionModalSubmit(vals) {
      this.addSession({ name: vals.name, password: vals.password });
    },
    calcLocked(session) {
      return session.session_id !== this.activeSessionId ? 'lock' : 'unlock';
    },
    sessionClicked(session) {
      this.loginAttemptId = session.session_id;
      this.$bvModal.show('login-modal');
    },
    navBarClicked(idx) {
      if (idx === 1) {
        this.$router.push('/songs');
      }
    },
    async load() {
      this.loading = true;
      await this.getAllSessions();
      this.loading = false;
    },
  },
};
</script>

<style>
.sessions {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sessions-list {
  height: calc(100% - 60px);
}

.overlay{
  width: 100%;
  height: 100%;
  color: #e87121;
}

</style>
