import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode"

export default class UserStore {
    private _isAuth: boolean;
    private _isLoading: boolean;
    private _user: string;
    private _access: string;
    constructor() {
        this._isAuth = false;
        this._user = "";
        this._isLoading = true
        this._access = "0"
        makeAutoObservable(this);
    }
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
    setAccess(access: string) {
        this._access = access
    }
    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }
    setUser(user: string) {
        this._user = user;
    }
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