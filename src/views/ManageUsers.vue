<template>
  <v-container fluid fill-height class="w3-animate-opacity">
    <v-row align="start" justify="center">
      <v-layout>
        <v-flex xs12 sm12 md10 offset-md1 lg8 offset-lg2>
          <v-card elevation=15>

            <v-container fluid>
              <v-row>
                <div class="accent optionsScreen"
                  style="margin-top:-12px; border-top-left-radius:8px; border-bottom-right-radius:8px">
                  <v-icon class="page-icon" color="white" x-large v-text="'mdi-account-edit'"></v-icon>
                </div>
              </v-row>
              <v-row>
                <v-col align="center" justify="center">
                  <v-img class="white--text" width="220px" src="../assets/logo-blue.png">
                  </v-img>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="6">
                  <v-form ref="form" min-width="350px">
                    <v-text-field class="center" dense rounded outlined v-model="searchText" required clearable autofocus
                      prepend-inner-icon="mdi-account-search"></v-text-field>
                  </v-form>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="10">
                  <v-data-table v-if="!loading" :headers="headers" :items="items" :sort-by="['calories', 'fat']"
                    :sort-desc="[false, true]" class="elevation-1"></v-data-table>
                </v-col>
              </v-row>

              <v-row style="height:32px" />

              <v-row justify="center">
                <v-btn rounded color="accent">
                  <v-icon>mdi-account-plus</v-icon>
                  <div style="padding-left:4px"> Add User </div>
                </v-btn>
              </v-row>

              <v-row style="height:32px" />
            </v-container>

            <v-card-actions>
            </v-card-actions>
          </v-card>

        </v-flex>
      </v-layout>
    </v-row>

    <v-fab-transition>
      <v-btn v-show="!hidden" color="pink" dark fixed bottom right fab medium
        style="margin-right:32px;margin-bottom:19px;">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
// @ is an alias to /src
import store from '../store';

export default {
  name: 'Home',
  components: {

  },
  data: () => ({
    searchText: '',
    drawer: true,
    item: 0,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName',
      },
      {
        text: 'Last Name',
        align: 'start',
        sortable: true,
        value: 'lastName',
      },
      {
        text: 'ID Number',
        align: 'start',
        sortable: true,
        value: 'idNumber',
      },
      {
        text: 'Role',
        align: 'start',
        sortable: true,
        value: 'role',
      }
    ],
  }),
  methods: {

  },
  created() {
    store.dispatch('getUsers', { id: store.getters.user.aiId });
  },
  computed: {
    items() {
      return store.getters.users;
    },
    loading() {
      return store.getters.loading;
    }
  }

}
</script>

<style scoped>
h4 {
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 300;
}

.v-text-field.v-text-field--solo .v-input__control input {
  text-align: center !important;
}
</style>
