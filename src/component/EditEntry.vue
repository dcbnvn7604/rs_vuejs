<template>
  <v-main data-testid="editentry">
    <v-container fluid>
      <v-row align="center">
        <v-col align="center">
          <validation-observer v-slot="{ invalid }">
            <form>
              <validation-provider v-slot="{ errors }" name="title" rules="required">
                <v-text-field v-model="title" data-testid="titleInput" :error-messages="errors"></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="content" rules="required">
                <v-textarea v-model="content" data-testid="contentInput" :error-messages="errors"></v-textarea>
              </validation-provider>
              <v-btn @click="create" data-testid="editButton" :disabled="invalid">Create</v-btn>
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

  import { UnauthenticatedException } from '../api';

  extend('required', required);

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      return {
        title: '',
        contend: ''
      };
    },

    methods: {
      async create() {
        await this.$store.dispatch('createEntry', {
            'title': this.title,
            'content': this.content
        });
        this.$router.push('/entry');
      }
    }
  };
</script>