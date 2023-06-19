import { makeAutoObservable } from "mobx";
export default class ModalStore {
    private _isVisible: boolean;
    private _info: string;
    private _isRed: boolean;
    private _isTime: boolean;
    private _Time: number;
    constructor() {
        this._isVisible = false;
        this._info = "";
        this._isRed = false;
        this._isTime = false;
        this._Time = 0;
        makeAutoObservable(this);
    }
    setIsVisible(info: string, isRed: boolean) {
        this._info = info;
        this._isRed = isRed;
        this._Time += 3;
        this._isVisible = true;
        if (this._Time / 3 > 100) {
            this._info = "Убери нож!"
        }
        if (!this._isTime) {
            this.setTime()
        }
    }
    otcl() {
        this._Time = 0;
        this._isVisible = false
        this._info = "";
        this._isRed = false
        this._isTime = false

    }
    private setTime() {
        this._isTime = true
        if (this._Time > 0) {
            this._Time -= 1;
            setTimeout(() => this.setTime(), 1000);
        } else {
            this.otcl()
        }

    }

    get isVisible() {
        return this._isVisible;
    }
    get info() {
        return this._info;
    }
    get isRed() {
        return this._isRed;
    }
}
