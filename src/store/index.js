import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let client = null;

export default new Vuex.Store({
  state: {
    authenticated : false,
    client : null,
    user : {},
    users : [],
    institutionTypes : [],
    ai : {
      accountingContact : {}
    },
    countries : [],
    loading : false
  },
  mutations: {
    authenticate (state, payload){
      if(payload) {
        state.authenticated = payload.authenticated;
      }
      return state.authenticated;
    },
    client (state, payload){
      if(payload) {
        client = payload.client;
        state.client = payload.client;
      }
      return state.client;
    },
    user(state,payload) {
      return state.user = payload;
    },
    users(state,payload) {
      return state.users = payload;
    },
    institutionTypes(state,payload) {
      return state.institutionTypes = payload;
    },
    ai(state,payload) {
      return state.ai = payload;
    },
    loading(state,payload) {
      return state.loading = payload;
    }
  },
  actions: {
    authenticate (context, payload) {
      context.commit('authenticate', payload);
    },
    client (context, payload) {
      context.commit('client', payload);
    },
    async getUser (context, payload) {
      context.commit('loading', true);
      let result = await client.get('https://odata.easefica.co.za/easefica/default/Users(' + payload.id + ')');
      context.commit('loading', false);
      if(result.data.value && result.data.value.length) {
        let user = result.data.value[0];
        context.commit('user', user);
        return user;
      }
      
      return null;
    },
    async getUsers (context, payload) {
      if(payload.id) {
        context.commit('loading', true);
        client.get('https://odata.easefica.co.za/easefica/default/Users?$filter=aiId eq \'' + payload.id + '\'').then((result)=>{
          result.data.value && context.commit('users', result.data.value);  
        }).finally(()=>{
          context.commit('loading', false);
        });
      }
    },
    getInstitutionTypes(context, payload) {
      context.commit('loading', true);
      client.get('https://odata.easefica.co.za/easefica/default/InstitutionTypes').then((result)=>{
        result.data.value && (result.data.value = result.data.value.map((v) => v.institution));
        result.data.value && context.commit('institutionTypes', result.data.value);  
      }).finally(()=>{
        context.commit('loading', false);
      });
    },
    getAI(context, payload) {
      if(payload.id) {
        context.commit('loading', true);
        client.get('https://odata.easefica.co.za/easefica/default/AccountableInstitution(' + payload.id + ')' ).then((result)=>{
          result.data.value && result.data.value[0] && context.commit('ai', result.data.value[0]);  
        }).finally(()=>{
          context.commit('loading', false);
        });
      }
    }
  },
  modules: {
  },
  getters: {
    authenticated: state => state.authenticated,
    client: state => state.client,
    user : state => state.user,
    ai : state => state.ai,
    users : state => state.users,
    institutionTypes : state => state.institutionTypes,
    loading : state => state.loading,
  }
})
