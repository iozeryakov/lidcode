import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode"

/**
 * Класс, представляющий хранилище информации о пользователе.
 */
export default class UserStore {
    /**
     * Флаг, указывающий на аутентификацию пользователя.
     * @private
     */
    private _isAuth: boolean;
    /**
     * Флаг, указывающий на загрузку данных пользователя.
     * @private
     */
    private _isLoading: boolean;
    /**
     * Имя пользователя.
     * @private
     */
    private _user: string;
    /**
     * Уровень доступа пользователя.
     * @private
     */
    private _access: string;
    /**
     * Создает экземпляр класса UserStore.
     */
    constructor() {
        this._isAuth = false;
        this._user = "";
        this._isLoading = true
        this._access = "0"
        makeAutoObservable(this);
    }
    /**
     * Устанавливает новый токен авторизации и обновляет информацию о пользователе.
     * @param {string} token - Токен авторизации.
     */
    newToken(token: string) {
        try {
            const data: any = jwt_decode(token);
            localStorage.setItem("token", token)
            this.setAccess(data.access)
            this.setUser(data.login)
            this.setIsAuth(true)

        }
        catch {
            localStorage.setItem("token", "")
            this.setIsAuth(false)
            this.setUser("")
        }
    }
    /**
     * Изменяет уровень доступа пользователя.
     * @param {string} access - Уровень доступа пользователя.
     */
    setAccess(access: string) {
        this._access = access
    }
    /**
     * Изменяет состояние аутентификации пользователя.
     * @param {boolean} bool - Флаг состояния аутентификации.
     */
    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }
    /**
     * Изменяет имя пользователя.
     * @param {string} user - Имя пользователя.
     */
    setUser(user: string) {
        this._user = user;
    }
    /**
     * Изменяет состояние загрузки данных пользователя.
     * @param {boolean} loading - Флаг состояния загрузки.
     */
    setLoading(loading: boolean) {
        this._isLoading = loading;
    }
    get isLoading() {
        return this._isLoading
    }
    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
    get access() {
        return this._access
    }
}