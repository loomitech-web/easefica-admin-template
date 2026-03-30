import Vue from "vue";
import Auth0Lock from 'auth0-lock';
import store from '../store';        
import axios from 'axios';

let wm = new WeakMap();
let privateStore = {};
wm.set(privateStore, {
    appName: "easefica Admin"
});

class AuthLockService {
    constructor(options, router) {
        options.options.auth.redirectUrl = this.getHost();

        let self= this;

        this.lock = new Auth0Lock(
            options.clientID,
            options.domain,
            options.options
        );

        this.client = null;

        this.apiKey = options.apiKey;

        this.router = router;

        this.lock.on("authenticated", function(authResult) {
            // Use the token in authResult to getUserInfo() and save it if necessary
            this.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) {
                // Handle error
                return;
                }
        
     
                localStorage.setItem('profile',JSON.stringify(profile));
                localStorage.setItem('token',JSON.stringify(authResult));

                self.createClient();

                store.commit('authenticate', { authenticated : true });
                

                router.push({ path: '/services' });
            });
        });
    }

    login() {
        this.lock.show();
    }

    async createClient() {
        if(!this.client) {
            let headers = this.headers();
    
            this.client = axios.create({
                baseURL: 'https://odata.easefica.co.za/easefica/',
                timeout: 5000,
                headers: headers
            });
    
            await store.commit('client', { client : this.client });
            await store.dispatch('getUser', { id : this.getProfile().name });
            await store.dispatch("getAI", { id: store.getters.user.aiId });
            await store.dispatch("getUsers", { id: store.getters.user.aiId });
        }
    }

    getHost() {
        let url = window.location.href;
        let arr = url.split("/");
        let result = arr[0] + "//" + arr[2];

        return result;
    }

    assignAuthHeaders(request) {
        if(this.isAuthorised()) {
            let authResult = localStorage.get('token');
            request.headers['Authorization'] = 'Bearer ' + authResult.accessToken;
            request.headers['apiKey'] = this.apiKey;
        }
    }

    headers() {
    
        try {
            let authResult = JSON.parse(localStorage.getItem('token'));
            return {
                'Authorization' : 'Bearer ' + authResult.accessToken,
                'apiKey' : this.apiKey
            }
        } catch(e) {
            console.error(e.message);
        }
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('token');

        this.lock.logout({
            returnTo: this.getHost()
          });
    }

    getProfile() {
        return JSON.parse(localStorage.getItem('profile'));
    }

    isAuthorised() {
        try {
            let p = JSON.parse(localStorage.getItem('token'));
            if(!p) return false;
            this.createClient();
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }

    hasPrivilege(priv) {
        // todo get user privileges
        return true;
    }

    getTenant() {
        return 'Easey Comply (PTY) Ltd';
    }

    getRole() {
        return 'AI Super User';
    }
}  

export const AuthLock = {
    install(Vue, options, router) {
      Vue.prototype.$authLock = new AuthLockService(options, router);
    }
};  