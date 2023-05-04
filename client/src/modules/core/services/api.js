import ky from 'ky';

class ApiFetcher {
    fetcher = null;
    token = '';

    constructor() {
        this.fetcher = ky.create({
            retry: 0,
            prefixUrl: process.env.REACT_APP_API_PREFIX || '/api',
            hooks: {
                beforeError: [
                    async error => {
                        const {response} = error;
                        const errorData = await error.response.json();
                        if (response.status === 400 && errorData) {
                            error.message = `${errorData.error}`;
                        }
                        return error;
                    }
                ],
                beforeRetry: [
                    async ({request, options, error, retryCount}) => {
                        // TODO refresh token
                        //this.token = await this.fetcher('auth/refresh-token');
                        //request.headers.set('Authorization', `Bearer ${this.token}`);
                    }
                ],
                beforeRequest: [
                    (request, options) => {
                        if (!options.headers.get('Authorization') && !options.noAuth) {
                            request.headers.set('Authorization', `Bearer ${this.token}`);
                        }
                    }
                ]
            }
        });
    }

    setAuthToken = (token) => {
        this.token = token;
    }

    get = (url, options) => {
        return this.makeRequest(url, { ...options, method: 'GET' })
    }

    post = (url, body, options) => {
        return this.makeRequest(url, {json: body, ...options, method: 'POST'})
    }

    makeRequest = async (url, options) => {
        const response = await this.fetcher(url, options)
        if (!response.ok) {
            throw new Error(`Fetch error: ${response.statusText}`);
        }
        return await response.json();
    }
}

const apiFetcher = new ApiFetcher();
export default apiFetcher;