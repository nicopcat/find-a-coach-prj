<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card @submit.prevent="submitForm">
      <form>
        <div class="form-control">
          <label for="useremail">Email</label>
          <input
            type="email"
            name="useremail"
            id="useremail"
            v-model.trim="useremail"
            autocomplete="username"
          />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password"
            :autocomplete="autocompeleteAttr"
          />
        </div>
        <p class="errors" v-if="formInvalid">
          Pleas check your email and password...
        </p>
        <base-button>{{ submitButtonCap }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCap
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useremail: '',
      password: '',
      formInvalid: false,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCap() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCap() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
    autocompeleteAttr() {
      if (this.mode === 'login') {
        return 'current-password';
      } else {
        return 'new-password';
      }
    },
  },
  methods: {
    async submitForm() {
      if (
        this.useremail === '' ||
        !this.useremail.includes('@') ||
        this.password.length < 6
      ) {
        this.formInvalid = true;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.useremail,
        password: this.password,
      };

      // send requests...
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }

        // 点击时 to="/auth?redirect=register"
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.messge || 'Failed to authenticate.. Try later';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  /* border: 1px solid #ccc;
  border-radius: 12px; */
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>