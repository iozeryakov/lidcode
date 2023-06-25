import axios from 'axios';
import { API_URL } from '../utils/consts';

/**
 * Экземпляр Axios, предназначенный для отправки HTTP-запросов к API.
 */
export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
/**
 * Экземпляр Axios с авторизационным заголовком.
 */
export const $authHost = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
/**
 * Интерцептор для добавления авторизационного заголовка в запросы.
 *
 * @param config - Конфигурация запроса.
 * @returns - Конфигурация запроса с добавленным авторизационным заголовком.
 */
export const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);