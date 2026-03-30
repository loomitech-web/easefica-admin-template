<template>
  <v-container fluid fill-height class="w3-animate-opacity">
    <v-row align="start" justify="center">
  <v-layout>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card elevation=15 >
        <v-container fluid>
          <v-row>
            <div class="accent optionsScreen" style="margin-top:-12px; border-top-left-radius:8px; border-bottom-right-radius:8px">
              <v-icon class="page-icon" color="white" x-large v-text="'mdi-account-search-outline'"></v-icon>
            </div>
          </v-row>
          <v-row >
            <v-col align="center" justify="center">
              <v-img
                class="white--text"
                width="220px"
                src="../assets/logo-blue.png"
              >
              </v-img>
            </v-col>
          </v-row>

          <v-row style="height:32px" />

          <v-row justify="center">
            <v-col cols="8">
            <v-divider ></v-divider>
            </v-col>
          </v-row>  

          <v-row justify="center">
            <h4>ENTER IDENTITY OR REGISTRATION NUMBER</h4>
          </v-row>  

          <v-row justify="center">
            <v-col cols="8">
            <v-divider ></v-divider>
            </v-col>
          </v-row>  

          <v-row style="height:32px" />

          <v-row justify="center">
            <v-col cols="6">
              <v-form
                ref="form"

                lazy-validation
                min-width="350px"
              >
                <v-text-field
                  class="center"
                  dense
                  rounded
                  outlined
                  v-model="searchText"
                  required
                  clearable
                  autofocus
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>  

          <v-row justify="center">
            <v-btn
              rounded
              color="accent"
            >
              <v-icon>mdi-magnify</v-icon>
              <div style="padding-left:4px"> Search </div>
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


  </v-container>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {

  },
  data: ()=>({
        searchText :''
      }),
  methods: {

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
    text-align: center!important;
}
</style>
