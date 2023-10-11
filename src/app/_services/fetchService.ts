import { HttpService } from "./httpService";

export class FetchService {

    constructor(private readonly httpService: HttpService) { }

    public async get(url: string, options?: RequestInit) {
        return this.httpService.get(url, options);
    }

}