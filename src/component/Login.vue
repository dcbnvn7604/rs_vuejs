<template>
  <v-row align="center" data-testid="login">
    <v-col align="center">
      <validation-observer v-slot="{ invalid }">
        <form>
        <validation-provider v-slot="{ errors }" name="username" rules="required">
          <v-text-field v-model="username" data-testid="usernameInput" :error-messages="errors"></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="password" rules="required">
          <v-text-field v-model="password" data-testid="passwordInput" :error-messages="errors"></v-text-field>
        </validation-provider>
        <v-btn @click="login" data-testid="loginButton" :disabled="invalid">Log in</v-btn>
        <div>{{invalid}}</div>
      </form>
      </validation-observer>
    </v-col>
  </v-row>
</template>

<script>
  import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';

  import { UnauthenticatedException } from '../api';

  extend('required', required);

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      return {
        username: '',
        password: ''
      };
    },

    methods: {
      async login() {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        this.$router.push('/');
      }
    },

    mounted() {
      try {
        this.$store.dispatch('checkLogin');
        this.$router.push('/');
      } catch(e) {
        if (!(e instanceof UnauthenticatedException)) {
          throw e;
        }
      }
    }
  };
</script>