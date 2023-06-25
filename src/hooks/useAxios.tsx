
import { useState, useEffect } from "react";
import { IAxios, IData } from "../types/IAxios";


/**
 * Хук для отправки HTTP-запросов с помощью Axios.
 *
 * @returns {[IData?, string, boolean, (configObj: IAxios) => Promise<void>]} Массив с данными ответа, ошибкой, состоянием загрузки и функцией для отправки запроса.
 */
const useAxios = () => {
    const [response, setResponse] = useState<IData>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState<AbortController>();

    /**
     * Функция для отправки HTTP-запроса.
     *
     * @param {IAxios} configObj - Объект конфигурации запроса.
     * @returns {Promise<void>} Промис, который выполняется после отправки запроса.
     */
    const axiosFetch = async (configObj: IAxios) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setError("")
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method](url, {
                ...requestConfig,
                signal: ctrl.signal
            });

            setResponse(res.data);
        } catch (err: any) {
            if (err.message === "canceled") {
                setError("");
            } else {
                setError(err.message);
            }

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return [response, error, loading, axiosFetch] as const;
}

export default useAxios