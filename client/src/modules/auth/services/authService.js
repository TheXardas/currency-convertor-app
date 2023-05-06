import api from "../../core/services/api";

const JWT_TOKEN_KEY = 'JWT_TOKEN';

class AuthService {
    token = '';
    currentUser = null;

    constructor() {
        this.initTokenFromStorage();
        // If we login/logout in another tab, we need to ensure, that token is valid.
        window.addEventListener('storage', this.initTokenFromStorage);
    }

    initTokenFromStorage = () => {
        // Init token from localStorage
        const currentToken = localStorage.getItem(JWT_TOKEN_KEY) || '';
        if (currentToken && currentToken !== this.token) {
            this.fetchCurrentUser().then((data) => {
                this.currentUser = data.user;
                window.dispatchEvent(new Event('loginChange'));
            });
        }
        this.saveToken(localStorage.getItem(JWT_TOKEN_KEY) || '');
    };

    saveToken(token) {
        localStorage.setItem(JWT_TOKEN_KEY, token);
        this.token = token;
        api.setAuthToken(token);
        window.dispatchEvent(new Event('loginChange'));
    }

    isLoggedIn() {
        return !!this.token;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    async login(login, password) {
        const data = await api.post('auth/login', {login, password}, {noAuth: true});
        if (data && data.token && data.user) {
            this.currentUser = data.user;
            this.saveToken(data.token);
        }
        return data;
    }

    logout = () => {
        this.saveToken('');
    };

    async fetchCurrentUser() {
        return api.get('auth/current-user');
    }
}

const authService = new AuthService();
export default authService;