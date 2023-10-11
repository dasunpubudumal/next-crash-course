export class HttpService {

    constructor() {
        // empty constructor
    }

    public async get(url: string, options?: RequestInit) {
        return fetch(url, {
            ...options,
            method: "GET",
        });
    }

}