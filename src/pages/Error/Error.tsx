import { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";

/**
 * Компонент, отображающий страницу с ошибкой 404 - страница не найдена.
 */
export const Error: FC = () => {
    return (
        <MainLayout>
            <div className=" text-center mt-5 md:text-8xl text-5xl font-extrabold">404</div>
            <div className=" text-center md:text-3xl text-xl font-bold">ХММ... Страница не найдена!</div>
        </MainLayout >
    );
};
