<template>
  <v-main data-testid="register">
    <v-container fluid>
      <v-row align="center">
        <v-col align="center">
          <validation-observer v-slot="{ invalid }">
            <form>
              <validation-provider v-slot="{ errors }" name="username" rules="required">
                <v-text-field v-model="username" data-testid="usernameInput" :error-messages="errors"></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="password" rules="required">
                <v-text-field v-model="password" data-testid="passwordInput" :error-messages="errors"></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="repassword" rules="required|repassword:@password">
                <v-text-field v-model="repassword" data-testid="repasswordInput" :error-messages="errors"></v-text-field>
              </validation-provider>
              <v-btn @click="register" data-testid="registerButton" :disabled="invalid">Register</v-btn>
              <v-btn @click="login" data-testid="loginButton">Log in</v-btn>
            </form>
          </validation-observer>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';

  extend('required', required);

  extend('repassword', {
    params: ['password'],
    validate(repassword, { password }) {
      return repassword === password
    },
    message: 'repassword is not matching.'
  });

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      return {
        username: '',
        password: '',
        repassword: '',
      };
    },

    methods: {
      login() {
        this.$router.push('/login');
      },

      async register() {
        await this.$store.dispatch('register', {
          username: this.username,
          password: this.password,
          repassword: this.repassword
        });
        this.$router.push('/');
      }
    }
  };
</script>