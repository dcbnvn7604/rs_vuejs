<template>
  <v-row align="center" data-testid="home">
    <v-col align="center">
      <div>Home</div>
    </v-col>
  </v-row>
</template>

<script>
  import { UnauthenticatedException } from '../api';
  export default {
    async mounted() {
      try {
        await this.$store.dispatch('listEntry');
      } catch (e) {
        if (e instanceof UnauthenticatedException) {
          this.$router.push('/login');
        } else {
          throw e;
        }
      }
    }
  };
</script>