import { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { IResult } from "./misc";

export class FetchPrice {
    private _instance: AxiosInstance;

    public constructor(baseUrl: string, timeOut: number = 10000) {
        // console.log('baseUrl:', baseUrl)

        this._instance = axios.create({
            baseURL: baseUrl,
            timeout: timeOut
        })
    }
    public Get(url: string, params: any) {
        return new Promise<IResult>(async (resolve, reject) => {
            try {
                let result: AxiosResponse = await this._instance.get(url, {
                    params: params
                })

                if (result.status === 200) {
                    resolve({ err: 0, data: result.data })
                } else {
                    resolve({ err: 1, data: result.status })
                }
            } catch (e) {
                // console.error(e)
                resolve({ err: 1, data: e.response.status + ' ' + e.response.statusText })
            }
        })

    }
    public Post(url: string, params: any) {
        return new Promise<IResult>(async (resolve) => {
            try {
                let result: AxiosResponse = await this._instance.post(url, params)

                // console.log(result)
                if (result.status === 200) {
                    resolve({ err: 0, data: result.data })
                } else {
                    resolve({ err: 1, data: result.status })
                }
            } catch (e) {
                console.error(e)
                resolve({ err: 1, data: e })
            }
        })
    }
}