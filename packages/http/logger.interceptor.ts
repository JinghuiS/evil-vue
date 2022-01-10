import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { HttpInterceptor } from './interceptor'

let started = Date.now()

export class Logger implements HttpInterceptor {
    interceptRequest(config: AxiosRequestConfig) {
        started = Date.now()

        return config
    }

    interceptRequestError(error: any): any {
        console.group(
            ` %c request error  `,
            'color: white; font-size: q4px; background: #f5222d; padding: 3px'
        )
        console.log(
            '%c params: ',
            'color: white; font-size: q4px; background: #FDE047; padding: 3px',
            error.config.data || error.config.params
        )
        console.groupEnd()
    }

    interceptResponseError(config: any) {
        const elapsed = Date.now() - started
        if (!config.config) {
            console.group(
                ` %c error `,
                'color: white; font-size: q4px; background: #f5222d; padding: 3px',
                ` ${elapsed} ms`
            )
            console.groupEnd()

            return
        }
        console.group(
            ` %c error ${config.config.method} /url:${config.config.url} `,
            'color: white; font-size: q4px; background: #f5222d; padding: 3px',
            ` ${elapsed} ms`
        )
        console.log(
            '%c params:',
            'color: white; font-size: q4px; background: #FDE047; padding: 3px',
            config.config.data || config.config.params
        )
        console.log(
            '%c response: ',
            'color: white; font-size: q4px; background: #FDE047; padding: 3px',
            config.data
        )
        console.groupEnd()
        return Promise.reject(config)
    }

    interceptResponse(config: AxiosResponse) {
        const elapsed = Date.now() - started

        if (!config || !config.config) {
            console.group(
                ` %c error `,
                'color: white; font-size: q4px; background: #f5222d; padding: 3px',
                `${elapsed} ms`
            )
            console.groupEnd()
            return Promise.reject(config)
        }
        console.group(
            ` %c success ${config.config.method}/url:${config.config.url} `,
            'color: white; font-size: q4px; background: #409EFF; padding: 3px',
            `${elapsed} ms`
        )
        console.log(
            '%c params: ',
            'color: white; font-size: q4px; background: #67C23A; padding: 3px',
            config.config.data || config.config.params
        )

        console.log(
            '%c response: ',
            'color: white; font-size: q4px; background: #67C23A; padding: 3px',
            config.data
        )

        console.groupEnd()

        return config
    }
}
