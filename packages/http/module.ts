import { Provider } from 'injection-js'
import { HttpClient } from './client'
import { HTTP_CLIENT_CONFIG } from './config'
import type { HttpClientConfig } from './config'
import {
    HTTP_INTERCEPTORS,
    HTTP_INTERCEPTORS_LOGGER,
    HttpInterceptorHandler,
    NoopInterceptor
} from './interceptor'
import { Logger } from './logger.interceptor'
import { ModuleWithProviders } from '..'

export class HttpClientModule {
    /**

   * @param config
   */
    static forRoot(config?: HttpClientConfig): ModuleWithProviders {
        return {
            providers: [
                {
                    useClass: NoopInterceptor,
                    provide: HTTP_INTERCEPTORS,
                    multi: true
                },
                {
                    useClass: Logger,
                    provide: HTTP_INTERCEPTORS_LOGGER
                },
                HttpInterceptorHandler,
                { provide: HTTP_CLIENT_CONFIG, useValue: config }
            ],
            vueModule: HttpClient
        }
    }
}

/**
 * Register all providers needed for HttpClient within injector
 * @param config
 */
export function registerHttpClientProviders(
    config?: HttpClientConfig
): Provider[] {
    return [
        {
            useClass: NoopInterceptor,
            provide: HTTP_INTERCEPTORS
        },
        HttpInterceptorHandler,
        { provide: HTTP_CLIENT_CONFIG, useValue: config },
        HttpClient
    ]
}
