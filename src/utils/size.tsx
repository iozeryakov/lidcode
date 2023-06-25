import { useState, useEffect } from 'react';

/**
 * Возвращает текущие размеры окна браузера.
 * @returns {Object} Объект с шириной и высотой окна.
 */
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

/**
 * Хук для получения текущих размеров окна браузера.
 * @returns {Object} Объект с шириной и высотой окна.
 */
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}