<template>
  <v-container fluid fill-height class="w3-animate-opacity">
    <v-row align="start" justify="center">
      <v-layout>
        <v-flex xs12 sm12 md8 offset-md2 lg6 offset-lg3>
          <v-card elevation="15">
            <v-row>

              <div class="accent optionsScreen"
                style="margin-left:12px;margin-bottom:12px;border-top-left-radius:8px; border-bottom-right-radius:8px">
                <v-icon class="page-icon" color="white" x-large v-text="'mdi-account-box-multiple'"></v-icon>
              </div>
            </v-row>

            <v-tabs v-model="tab" active-class="light-green lighten-1" background-color="blue-grey lighten-4" dark
              fixed-tabs flat hide-slider>
              <v-tab v-for="t in tabs" :key="t.href" :href="t.href" style="">
                {{ t.title }}
              </v-tab>

              <v-tab-item :value="'tab-detail'">
                <ai-editor/>
              </v-tab-item>
            </v-tabs>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text>Next</v-btn>
              <v-btn text :disabled="true">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>
    <v-fab-transition>
      <v-btn v-show="!hidden" color="pink" dark fixed bottom right fab large
        style="margin-right:64px;margin-bottom:16px;">
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="!hidden" color="pink" dark fixed bottom right fab medium
        style="margin-right:136px;margin-bottom:19px;">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn v-show="!hidden" color="pink" dark fixed bottom right fab medium
        style="margin-right:0px;margin-bottom:19px;">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import AiEditor from "../components/AiEditor.vue";
// @ is an alias to /src
import store from "../store";

export default {
  name: "Home",
  components: {
    AiEditor,
  },
  data: () => ({
    searchText: "",
    drawer: true,
    item: 0,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    tab: null,
    hidden: false,
    tabs: [
      {
        href: "#tab-detail",
        title: "AI Details",
      },
      {
        href: "#tab-risk",
        title: "Risk Management",
      },
      {
        href: "#tab-users",
        title: "User Hierarchy",
      },
    ],
  }),
  methods: {},
  async created() {

  },
  computed: {
    items() {
      return store.getters.users;
    },
    loading() {
      return store.getters.loading;
    }
  },
};
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

.upload-button {
  border-style: none;
  border-width: 0px;
  border-radius: 5px;
  padding: 16px;
  width: 100%;
  background-color: #01579b;
  color: white;
}
</style>
