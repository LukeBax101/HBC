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
        v-on:left-clicked="goToHome"
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
        <b-modal
          id="login-modal"
          v-model="showLoginModal"
          ref="modal"
          :title="loginTitle"
          v-on:show="resetModal"
          v-on:hidden="resetModal"
          v-on:ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="passwordState"
              label="Password"
              label-for="password-input"
              invalid-feedback="Password must be at least 4 characters long"
            >
              <b-form-input
                id="password-input"
                v-model="password"
                type="password"
                :state="passwordState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
      <FloatButton
        icon="plus"
        v-on:float-button-clicked="addNewSession"
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
import List from '@/components/List.vue';

export default {
  name: 'Sessions',
  components: {
    Header,
    NavBar,
    List,
    FloatButton,
  },
  data() {
    return {
      loginAttemptId: '',
      showLoginModal: false,
      loading: false,
      periodicCheck: 0,
      password: '',
      passwordState: null,
      navBarIcons: ['list-task', 'music-note-list'],
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
  watch: {
    showLoginModal(newVal) {
      if (!newVal) this.loginAttemptId = '';
    },
  },
  methods: {
    ...mapActions([
      'addSession',
      'getAllSessions',
      'setActiveSessionId',
    ]),
    circle() {
      return 'circle';
    },
    calcLocked(session) {
      return session.session_id !== this.activeSessionId ? 'lock' : 'unlock';
    },
    login(pass) {
      console.log('validate password');
      console.log(pass);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      this.setActiveSessionId(this.loginAttemptId);
    },
    sessionClicked(session) {
      this.loginAttemptId = session.session_id;
      this.showLoginModal = true;
    },
    goToHome() {
      this.$router.push('/');
    },
    navBarClicked(idx) {
      if (idx === 1) {
        this.$router.push('/songs');
      }
    },
    addNewSession() {
      this.addSession();
    },
    async load() {
      this.loading = true;
      await this.getAllSessions();
      this.loading = false;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity() && this.password.length >= 4;
      this.passwordState = valid;
      return valid;
    },
    resetModal() {
      this.password = '';
      this.passwordState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.login(this.password);
      this.$nextTick(() => {
        this.$bvModal.hide('login-modal');
      });
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
