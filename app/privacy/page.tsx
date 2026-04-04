import React from 'react';

export const metadata = {
    title: 'Политика конфиденциальности - LCK',
    description: 'Политика обработки персональных данных',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-slate-300 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8 glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />
                
                <h1 className="text-3xl md:text-4xl font-display uppercase text-white mb-8 border-b border-white/10 pb-4">
                    Политика конфиденциальности и обработки персональных данных
                </h1>

                <div className="space-y-6 text-sm leading-relaxed text-slate-300 font-light">
                    <p>
                        Настоящая Политика конфиденциальности составлена в соответствии с требованиями Закона Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных.
                    </p>

                    <h2 className="text-xl text-gold-400 font-medium mt-8">1. Какие данные мы собираем</h2>
                    <p>
                        Для предоставления функционала нашего веб-приложения (подачи заявки на участие) мы собираем следующие персональные данные:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Фамилия, Имя, Отчество (при наличии);</li>
                        <li>Контактный телефон;</li>
                        <li>Адрес электронной почты (e-mail);</li>
                        <li>Город проживания;</li>
                        <li>Сведения об образовании и профессии;</li>
                        <li>Ссылки на фильмографию и портфолио.</li>
                    </ul>

                    <h2 className="text-xl text-gold-400 font-medium mt-8">2. Цели сбора и обработки</h2>
                    <p>Мы собираем ваши данные исключительно для следующих целей:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Идентификация пользователя в рамках работы платформы;</li>
                        <li>Рассмотрение заявок на участие в проектах/конкурсах;</li>
                        <li>Установление обратной связи, включая направление уведомлений и запросов, касающихся использования сервиса.</li>
                    </ul>

                    <h2 className="text-xl text-gold-400 font-medium mt-8">3. Хранение и передача данных</h2>
                    <p>
                        Хранение персональных данных осуществляется на серверах, соответствующих требованиям безопасности. Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, прямо предусмотренных законодательством Республики Казахстан.
                    </p>

                    <h2 className="text-xl text-gold-400 font-medium mt-8">4. Права субъекта персональных данных</h2>
                    <p>Вы имеете право:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Запрашивать информацию о наличии у нас ваших персональных данных;</li>
                        <li>Требовать изменения или удаления ваших персональных данных;</li>
                        <li>Отозвать свое согласие на сбор и обработку данных в любой момент.</li>
                    </ul>

                    <h2 className="text-xl text-gold-400 font-medium mt-8">5. Изменение Политики конфиденциальности</h2>
                    <p>
                        Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Новая редакция вступает в силу с момента ее размещения на этой странице.
                    </p>

                    <div className="mt-12 pt-8 border-t border-white/10 text-slate-500">
                        <p>Редакция от: {new Date().toLocaleDateString('ru-RU')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
