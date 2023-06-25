import { makeAutoObservable } from "mobx";

/**
 * Класс, представляющий хранилище модального окна.
 */
export default class ModalStore {
    /**
    * Флаг, указывающий на видимость модального окна.
    * @private
    */
    private _isVisible: boolean;
    /**
     * Информация, отображаемая в модальном окне.
     * @private
     */
    private _info: string;
    /**
     * Флаг, указывающий на необходимость отображения красного цвета в модальном окне.
     * @private
     */
    private _isRed: boolean;
    /**
    * Флаг, указывающий на то, что таймер запущен в модальном окне.
    * @private
    */
    private _isTime: boolean;
    /**
     * Значение таймера в модальном окне.
     * @private
     */
    private _Time: number;
    /**
     * Создает экземпляр класса ModalStore.
     */
    constructor() {
        this._isVisible = false;
        this._info = "";
        this._isRed = false;
        this._isTime = false;
        this._Time = 0;
        makeAutoObservable(this);
    }
    /**
     * Устанавливает значения для отображения модального окна.
     * @param {string} info - Информация, отображаемая в модальном окне.
     * @param {boolean} isRed - Флаг, указывающий на необходимость отображения красного цвета.
     */
    setIsVisible(info: string, isRed: boolean) {
        this._info = info;
        this._isRed = isRed;
        this._Time += 3;
        this._isVisible = true;
        if (!this._isTime) {
            this.setTime()
        }
    }
    /**
     * Сбрасывает значения модального окна.
     */
    otcl() {
        this._Time = 0;
        this._isVisible = false
        this._info = "";
        this._isRed = false
        this._isTime = false

    }
    /**
     * Запускает таймер для модального окна.
     * @private
     */
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
