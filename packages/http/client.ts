import axios, {
    AxiosDefaults,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource
} from 'axios'

import { defaultConfig, HTTP_CLIENT_CONFIG } from './config'
import type { HttpClientConfig } from './config'
import { forwardRef, Inject, Injectable, Optional } from 'injection-js'
import {
    HTTP_INTERCEPTORS,
    HTTP_INTERCEPTORS_LOGGER,
    HttpInterceptorHandler
} from './interceptor'

import { Logger } from './logger.interceptor'

@Injectable()
class HttpClient {
    static defaults: AxiosDefaults = axios.defaults
    static interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosResponse>
    } = axios.interceptors

    private axiosInstance: AxiosInstance

    constructor(
        private interceptorHandler: HttpInterceptorHandler,
        @Optional()
        @Inject(HTTP_INTERCEPTORS_LOGGER)
        private logger: Logger,
        @Optional()
        @Inject(HTTP_CLIENT_CONFIG)
        config?: HttpClientConfig
    ) {
        this.axiosInstance = axios.create({ ...defaultConfig, ...config })

        this.interceptorHandler.register(this.axiosInstance.interceptors)
    }
    moduleService = true
    private LoggerInterceptorRequest: any = null
    private LoggerInterceptorResponse: any = null

    showLog() {
        this.LoggerInterceptorRequest =
            this.axiosInstance.interceptors.request.use(
                this.logger.interceptRequest,
                this.logger.interceptRequestError
            )
        this.LoggerInterceptorResponse =
            this.axiosInstance.interceptors.response.use(
                this.logger.interceptResponse,
                this.logger.interceptResponseError
            )
    }
    hiddenLog() {
        this.axiosInstance.interceptors.request.eject(
            this.LoggerInterceptorRequest
        )
        this.axiosInstance.interceptors.request.eject(
            this.LoggerInterceptorResponse
        )
    }

    get defaults() {
        return this.axiosInstance.defaults
    }

    get interceptors() {
        return this.axiosInstance.interceptors
    }

    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.request(config)
    }

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.get(url, config)
    }

    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.head(url, config)
    }

    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise<T> {
        return this.axiosInstance.post(url, data, config)
    }

    put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise<T> {
        return this.axiosInstance.put(url, data, config)
    }

    patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise<T> {
        return this.axiosInstance.patch(url, data, config)
    }

    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.delete(url, config)
    }
}

export default HttpClient

export { HttpClient }
