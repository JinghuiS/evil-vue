import {
    forwardRef,
    Inject,
    Injectable,
    InjectionToken,
    Optional
} from 'injection-js'
import { AxiosClient, HttpResponse } from './types'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { isArray } from '../utils/is'

export interface HttpResponseInterceptor {
    interceptResponse(
        response: HttpResponse
    ): HttpResponse | Promise<HttpResponse>
    interceptResponseError?(error: any): Promise<any> | any
}
export interface HttpRequestInterceptor {
    interceptRequest(
        request: AxiosRequestConfig
    ): AxiosRequestConfig | Promise<AxiosRequestConfig>
    interceptRequestError?(error: any): Promise<any> | any
}

export interface HttpInterceptor {
    /**
     * Intercept an outgoing `HttpRequest` and optionally transform it or the
     * response.
     *
     * Typically an interceptor will transform the outgoing request before returning
     * `next.handle(transformedReq)`. An interceptor may choose to transform the
     * response event stream as well, by applying additional Rx operators on the stream
     * returned by `next.handle()`.
     *
     * More rarely, an interceptor may choose to completely handle the request itself,
     * and compose a new event stream instead of invoking `next.handle()`. This is
     * acceptable behavior, but keep in mind further interceptors will be skipped entirely.
     *
     * It is also rare but valid for an interceptor to return multiple responses on the
     * event stream for a single request.q
     */

    interceptRequest?(
        request: AxiosRequestConfig
    ): AxiosRequestConfig | Promise<AxiosRequestConfig>
    interceptRequestError?(error: any): Promise<any> | any
    interceptResponse?(
        response: HttpResponse
    ): HttpResponse | Promise<HttpResponse>
    interceptResponseError?(error: any): Promise<any> | any
}

/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 */
export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
    'HTTP_INTERCEPTORS'
)

export const HTTP_INTERCEPTORS_LOGGER = new InjectionToken<HttpInterceptor[]>(
    'HTTP_INTERCEPTORS_LOGGER'
)

/**
 * `HttpInterceptorHandler` which registers an `HttpInterceptor[]` to `HttpClient` instance.
 * @private
 */
@Injectable()
export class HttpInterceptorHandler {
    private _registeredInterceptors = [] as number[]
    get registeredInterceptors() {
        return this._registeredInterceptors
    }

    constructor(
        @Optional()
        @Inject(forwardRef(() => HTTP_INTERCEPTORS))
        private _interceptors:
            | HttpResponseInterceptor[]
            | HttpRequestInterceptor[]
            | HttpResponseInterceptor
            | HttpRequestInterceptor
    ) {}

    register(httpClientInterceptors: AxiosClient['interceptors']) {
        // tslint:disable-next-line: no-console
        const defaultError = (error: any) => console.error(error)

        if (isArray(this._interceptors)) {
            this._interceptors.forEach((interceptor) => {
                if ((interceptor as HttpRequestInterceptor).interceptRequest) {
                    this._registeredInterceptors.push(
                        httpClientInterceptors.request.use(
                            (interceptor as HttpRequestInterceptor)
                                .interceptRequest,
                            (interceptor as HttpRequestInterceptor)
                                .interceptRequestError || defaultError
                        )
                    )
                }
                if (
                    (interceptor as HttpResponseInterceptor).interceptResponse
                ) {
                    this.registeredInterceptors.push(
                        httpClientInterceptors.response.use(
                            (interceptor as HttpResponseInterceptor)
                                .interceptResponse,
                            (interceptor as HttpResponseInterceptor)
                                .interceptResponseError
                                ? (interceptor as HttpResponseInterceptor)
                                      .interceptResponseError
                                : defaultError
                        )
                    )
                }
            })
        } else {
            if (
                (this._interceptors as HttpRequestInterceptor).interceptRequest
            ) {
                httpClientInterceptors.request.use(
                    (this._interceptors as HttpRequestInterceptor)
                        .interceptRequest,
                    (this._interceptors as HttpRequestInterceptor)
                        .interceptRequestError
                        ? (this._interceptors as HttpRequestInterceptor)
                              .interceptRequestError
                        : defaultError
                )
            }
            if (
                (this._interceptors as HttpResponseInterceptor)
                    .interceptResponse
            ) {
                httpClientInterceptors.response.use(
                    (this._interceptors as HttpResponseInterceptor)
                        .interceptResponse,
                    (this._interceptors as HttpResponseInterceptor)
                        .interceptResponseError
                        ? (this._interceptors as HttpResponseInterceptor)
                              .interceptResponseError
                        : defaultError
                )
            }
        }
    }
}

export class NoopInterceptor
    implements HttpResponseInterceptor, HttpRequestInterceptor
{
    interceptRequest(request: any) {
        return request
    }

    interceptResponse(response: HttpResponse) {
        return response
    }
}
