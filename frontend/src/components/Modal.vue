<template>
    <b-modal
      :id="id"
      :ref="id"
      :title="title"
      v-on:show="resetModal"
      v-on:hidden="resetModal"
      v-on:ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          v-for="(field, idx) in fields"
          :state="validity[field.id]"
          :label="field.label"
          :label-for="field.id"
          :invalid-feedback="field.invalidFeedback"
          :key="field.id"
        >
          <div v-if="field.type === 'password'" class="password-entry">
            <b-form-input
              :id="field.id"
              v-model="values[field.id]"
              :type="calcType(field.id, field.type)"
              :state="validity[field.id]"
              required
              :autofocus="idx === 0"
            >
            </b-form-input>
            <b-icon
              scale="1.3"
              class="password-eye"
              :icon="(passwordState[field.id]) ? 'eye-fill' : 'eye-slash-fill'"
              v-on:click.prevent.stop="passwordState[field.id] = !passwordState[field.id]"
              ></b-icon>
          </div>
          <b-form-input
            v-else
            :id="field.id"
            v-model="values[field.id]"
            :type="calcType(field.id, field.type)"
            :state="validity[field.id]"
            required
            :autofocus="idx === 0"
          >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: String,
    title: String,
    fields: Array,
  },
  data() {
    return {
      values: {},
      validity: {},
      passwordState: {},
    };
  },
  mounted() {
    this.$root.$on('bv::modal::show', () => {
      this.values = {};
      this.validity = {};
      this.passwordState = this.calcInitialPasswordState();
    });
  },
  destoyed() {
    this.$root.$off('bv::modal::show');
  },
  methods: {
    calcType(id, type) {
      if (type !== 'password') return type;
      return this.passwordState[id] ? 'password' : 'text';
    },
    calcInitialPasswordState() {
      return this.fields.reduce((acc, field) => (field.type === 'password' ? ({
        ...acc,
        [field.id]: true,
      }) : acc), {});
    },
    checkFormValidity() {
      this.validity = this.fields.reduce((acc, field) => (
        {
          ...acc,
          [field.id]: !!field.isValid(this.values[field.id]),
        }), {});
      return this.$refs.form.checkValidity() && Object.values(this.validity).every((x) => x);
    },
    resetModal() {
      this.values = {};
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.$emit('submit', this.values);
      this.$nextTick(() => {
        this.$bvModal.hide(this.id);
      });
    },
  },
};
</script>

<style>
.password-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.password-eye {
  width: 40px;
}
</style>
