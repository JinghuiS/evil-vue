import { AxiosRequestConfig } from 'axios';
import { InjectionToken } from 'injection-js';

export type HttpClientConfig = Readonly<typeof defaultConfig>;
export const HTTP_CLIENT_CONFIG = new InjectionToken('HttpClientConfig');

export const defaultConfig = {} as AxiosRequestConfig;
