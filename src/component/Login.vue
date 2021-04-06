<template>
  <v-row align="center" data-testid="login">
    <v-col align="center">
      <div>Login</div>
    </v-col>
  </v-row>
</template>

<script>
  import { UnauthenticatedException } from '../api';

  export default {
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