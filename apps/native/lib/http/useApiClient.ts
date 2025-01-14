/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from "react"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios"
import { HTTPStatusCode } from "./HttpStatusCode"
import { API_URL } from "../common/Environment"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"

const CancelToken = axios.CancelToken

class ApiClient {
  private source: CancelTokenSource
  private api: AxiosInstance

  constructor(baseUrl: string) {
    this.source = CancelToken.source()

    this.api = axios.create({
      baseURL: baseUrl,
      cancelToken: this.source.token
    })

    this.api.interceptors.request.use(
      async (config: any = {}) => {
        if (!config.headers) {
          config.headers = {}
        }
        if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json"
        }

        if (!config.headers["Idtoken"]) {
          config.headers["Idtoken"] = ""
        }

        const accessToken = await AsyncStorage.getItem("access_token")
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
      },
      (err) => {
        console.error("Request interceptor error.", err.config?.url, err)
        return Promise.reject(err)
      }
    )

    this.api.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.status >= 200 && res.status < 300) {
          res.data && console.log(JSON.stringify(res.data))
          return res.data
        }

        const err = new Error(`HTTP Error ${res.status}.`)
        console.error(err, res.config?.url, res)
        return Promise.reject(err)
      },
      async (err) => {
        if (err.response?.status === HTTPStatusCode.Unauthorized) {
          console.error("Request unauthorized.", err.config?.url, err)
          await AsyncStorage.removeItem("access_token")
          router.replace("/")
          return
        }
        return Promise.reject(err)
      }
    )
  }

  _exec<O, I>(req: Promise<AxiosResponse<O, I>>) {
    return new Promise<any>((resolve, reject) => {
      req
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            console.error("Request error.", err.config?.url, err)
            reject(err)
          }
        })
    })
  }

  get<O>(url: string, params?: any, config?: AxiosRequestConfig): Promise<O> {
    console.log("GET", url, JSON.stringify(params || {}))
    return this._exec<undefined, O>(
      this.api.get(url, {
        ...config,
        params
      })
    )
  }

  post<I, O>(url: string, data?: any, config?: AxiosRequestConfig): Promise<O> {
    console.log("POST", url, JSON.stringify(data || {}))
    return this._exec<O, I>(this.api.post(url, data, config))
  }

  put<I, O>(url: string, data?: any, config?: AxiosRequestConfig): Promise<O> {
    console.log("PUT", url, JSON.stringify(data || {}))
    return this._exec<O, I>(this.api.put(url, data, config))
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    console.log("PATCH", url, JSON.stringify(data || {}))
    return this._exec(this.api.patch(url, data, config))
  }

  delete(url: string, config?: AxiosRequestConfig) {
    console.log("DELETE", url)
    return this._exec(this.api.delete(url, config))
  }

  uploadFile(url: string, file: any, config: AxiosRequestConfig = {}) {
    console.log("UPLOAD", url)
    const formData = new FormData()
    formData.append("name", file.name)
    formData.append("file", file)

    if (!config.headers) {
      config.headers = {}
    }
    config.headers["Content-Type"] = "multipart/form-data"

    return this._exec(this.api.post(url, formData, config))
  }

  cancel() {
    this.source.cancel()
  }
}

const useApiClient = (baseUrl: string = API_URL) => {
  const api = useMemo(() => {
    return new ApiClient(baseUrl)
  }, [baseUrl])

  useEffect(() => {
    return () => {
      api.cancel()
    }
  }, [baseUrl])

  return api
}

export { useApiClient }

export default ApiClient
