<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="primary darken-1"
      style="opacity:0.9"
      width=200
      app
      mini-variant
      expand-on-hover
      permanent
      v-if="$authLock.isAuthorised()"
    >

      <div style="height:64px; width:200px;padding:0px 16px">
        <v-row>  
          <v-col>
          <v-img
            style="margin-left:56px;opacity:0.5"
            contain
            src="./assets/logo-white.png"
            width="120"
          />
          </v-col>
        </v-row>
      </div>  

      <v-list 
        dense 
        shaped
        dark
      >
      <v-list-item-group v-model="item" color="accent" active-class="pink lighten-1" dark>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" color="white">
          <v-list-item-icon>
            <v-icon color="white" v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title  >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="transparent"
      dark
      flat
      v-if="$authLock.isAuthorised()"
    >
      <v-toolbar-title >
        <v-row>  
          <v-col>
          <v-img
            class="shrink"
            contain
            src="./assets/logo-white.png"
            transition="scale-transition"
            width="120"
          />
          </v-col>
        </v-row>
      </v-toolbar-title>

    
      <v-card style="margin-left:48px;margin-top:-16px;border-top-left-radius:0px;border-top-right-radius:0px;opacity:0.9" dark elevation="10">
        
          <v-row class="ai-info accent" align="center">
            <v-col cols="12" align="center" justify="center">
              <v-btn elevation="0" color="accent">
                <v-icon>mdi-laptop</v-icon> 
                <div class='role'>{{ user.company }}<br>{{ user.role }} </div>
              </v-btn> 
            </v-col> 
          </v-row>
        
      </v-card>
      

      <v-spacer></v-spacer>

      <v-card style="margin-right:32px;margin-top:-16px;border-top-left-radius:0px;border-top-right-radius:0px;opacity:0.9" dark elevation="10">
        
          <v-row class="ai-info primary darken-2" align="center">
            <v-col cols="8" align="center" justify="center">
              <v-btn elevation="0" color="primary darken-2">
                <v-icon>mdi-account</v-icon>
                <div class='role'>{{ user.firstName }} {{ user.lastName }}</div>
              </v-btn>
            </v-col> 
            <v-col cols="2">
              <v-btn elevation="0" color="primary darken-2" @click="$authLock.logout()">
                <v-icon >mdi-logout-variant</v-icon>
              </v-btn>
            </v-col>  
          </v-row>
        
      </v-card>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    <v-progress-circular
            v-if="loading"
            color="accent"
            class="progress"
            :indeterminate="true"
          />
    </v-main>

    <footer style="position: sticky; bottom:0px;background:#0a7cb9aa">
      <Legal />      
      </footer>

    
  </v-app>
</template>

<script>
import Legal from './components/Legal';
import store from './store';

export default {
  name: 'App',

  components: {
    Legal
  },

  data: () => ({
    drawer : true,
    item : 0,
    mini : true,
    items : [
      { title : 'Manage AI',icon : 'mdi-account-box-multiple', role : '', to:"/manage-ai"},
      { title : 'Incomplete', icon : 'mdi-puzzle-star', role : '', to:"/incomplete"},
      { title : 'Outstanding Issues', icon : 'mdi-alert-outline', role : '', to:"/outstanding-issues"},
      { title : 'Search', icon : 'mdi-account-search-outline', to:"/services"},
      { title : 'Manage Users', icon : 'mdi-account-edit',  role : '',  to:"/manage-users"},
      { title : 'Reports', icon : 'mdi-file-chart',  role : '',   to:"/reports"},
      { title : 'Remedial Actions', icon : 'mdi-alarm', role : '',  to:"/remedial-actions"},
      { title : 'Tutorials', icon : 'mdi-frequently-asked-questions', role : '',   to:"/tutorials"},
      { title : 'Training', icon : 'mdi-head-question', role : '',   to:"/training"}
    ]
  }),
  computed: {
    user() {
      return store.getters.user;
    },
    loading() {
      return store.getters.loading;
    }
  },
  mounted() {
    window.onpopstate = event => {
        
      
      if (
        window.localStorage.getItem("info") !== null &&
        this.$route.path == "/login"
      ) {
        this.$router.push("/"); // redirect to home, for example
      }
    };
  }
};
</script>

<style>
  .app-name {
    color : #f26897;
    font-size : 32px;
  }

.ai-info {
  color:black;
  background-color: #e1e1e1;
}

  .light-text {
    font-weight: lighter;
    padding-left: 32px;
    color: white;
  }

  .role {
    font-size: 12px;
    font-weight: lighter;
    padding-right: 16px;
    padding-left: 8px;
    color:white;
  }

  body {
    background-image: url('./assets/header-background.jpg');
    background-color: white;
    background-repeat: none;
    background-size: 100% 100%;
    background-position-y: 0px;
    background-attachment: fixed;
  }
.theme--light.v-application {
  background: transparent!important;
}

.v-card {
  border-radius: 8px!important;
}

  .v-toolbar__title {
    padding-left: 0px!important; 
  }

  /*.v-list-item--active {
    background-color: #f26897!important;
    font-weight: lighter!important;
    color: white;
  }*/

  .v-list-item__icon {
    color : white;
    margin-right:8px!important;
    font-weight: lighter!important;
    border-radius: 16px;
    border-width: 2px;
    border-color:#aae6e6e6;
    border-style:solid;
    width:32px!important;
    min-width:32px!important;
    height:32px!important;
    padding-left: 2px;
  }

  .v-navigation-drawer__content .v-list-item__title {
    font-weight: lighter!important;
  }

  .v-navigation-drawer__content .v-list-item {
    font-weight: lighter!important;
    padding-left: 8px!important;
    margin-top:8px;
  }
 
  /*.v-list-item:hover { background-color: #f26897!important; opacity: 0.8; }*/

  .v-tabs--fixed-tabs > .v-tabs-bar .v-tab {
      flex: unset!important;
      width: 30%!important;
  }

  .v-application .elevation-5 {
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.1), 0px 5px 8px 0px rgba(0, 0, 0, 0.05), 0px 1px 14px 0px rgba(0, 0, 0, 0.01) !important;
  }

  hr {
    margin: 0px;
  }

  .progress {
      display: block;
      position: absolute!important;
      right: 50%;
      top: 50%;
      width: 32px;
      height: 32px;
      margin: -16px 0 0 -16px;
  }

  .page-icon {
    border-radius: 24px;
    border-width: 2px;
    border-color:#e6e6e6;
    border-style:solid;
    margin:24px;
  }
</style>
