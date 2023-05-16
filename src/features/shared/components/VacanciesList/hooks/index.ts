import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/superjob/axiosInstance";
import { SearchResponse, Vacancy } from "../types";

export const DEFAULT_SEARCH_PARAMS = {
  page: process.env.NEXT_PUBLIC_SEARCH_RESULTS_DEFAULT_PAGE ?? "0",
  count: process.env.NEXT_PUBLIC_SEARCH_RESULTS_DEFAULT_COUNT ?? "4",
};

export const getVacancies = (params: SearchParams = DEFAULT_SEARCH_PARAMS) => {
  return axiosInstance<SearchResponse>({
    url: `/vacancies/`,
    method: "get",
    params: new URLSearchParams(params as Record<string, string>),
  });
};

interface SearchParams {
  count?: string;
  page?: string;
}

export const useSearch = (params: SearchParams = DEFAULT_SEARCH_PARAMS) => {
  return useQuery({
    queryKey: ["vacancies", params],
    queryFn: () => getVacancies(params),
    staleTime: 1000 * 60 * 1,
  });
};

const VACANCIES_LIST: Array<Vacancy> = [
  {
    canEdit: false,
    is_closed: false,
    id: 27949902,
    id_client: 870655,
    payment_from: 35000,
    payment_to: 38000,
    date_pub_to: 1684511403,
    date_archived: 1616143501,
    date_published: 1684164603,
    address: "Краснодарский край, Горячий Ключ",
    profession: "Электромонтер по ремонту и обслуживанию электрооборудования",
    work: null,
    compensation: null,
    candidat:
      "Обязанности:\n\n Техническое обслуживание и ремонт электрооборудования и электрических сетей напряжением до и выше 1000 В. \n\nТребования:\n\n\n- наличие среднего проф. образования и квалификационного удостоверения; \n\n- приветствуется опыт работы от 1 года. Имеются вакансии 4 и 5 разряда.\n\n\nУсловия:\n\n- трудоустройство, отпуск, больничный и пр. в соответствии с ТК РФ; \n\n- сменный режим работы;\n\n- соц. пакет.",
    metro: [],
    currency: "rub",
    vacancyRichText:
      "<b>Обязанности:</b><br /><br />\nТехническое обслуживание и ремонт\nэлектрооборудования и электрических сетей напряжением до и выше 1000 В.\n\n\n\n<br /><br /><b>Требования:</b><br /><br /><p>- наличие среднего проф. образования и квалификационного удостоверения; <br /></p><p>- приветствуется опыт работы от 1 года. Имеются вакансии 4 и 5 разряда.<br /></p><br /><b>Условия:</b><br /><p>- трудоустройство, отпуск, больничный и пр. в соответствии с ТК РФ; <br /></p><p>- сменный режим работы;<br /></p><p>- соц. пакет.</p>\n\n",
    covid_vaccination_requirement: {
      id: 1,
      title: "Не важно",
    },
    moveable: true,
    agreement: false,
    anonymous: false,
    is_archive: false,
    is_storage: false,
    type_of_work: {
      id: 12,
      title: "Сменный график работы",
    },
    place_of_work: {
      id: 0,
      title: "Не имеет значения",
    },
    education: {
      id: 4,
      title: "Среднее специальное",
    },
    experience: {
      id: 1,
      title: "Без опыта",
    },
    maritalstatus: {
      id: 0,
      title: "Не имеет значения",
    },
    children: {
      id: 0,
      title: "Не имеет значения",
    },
    client: {
      id: 870655,
      title: "Краснодарнефтегаз",
      link: "https://www.superjob.ru/clients/krasnodarneftegaz-870655/vacancies.html",
      industry: [],
      description: "Разработка и эксплуатация нефтяных месторождений.",
      vacancy_count: 14,
      staff_count: "1000 — 5000",
      client_logo: null,
      address: null,
      addresses: [],
      url: null,
      short_reg: false,
      is_blocked: false,
      registered_date: 1328858676,
      town: {
        id: 25,
        title: "Краснодар",
        declension: "в Краснодаре",
        hasMetro: false,
        genitive: "Краснодара",
      },
    },
    languages: [],
    driving_licence: [],
    catalogues: [
      {
        id: 362,
        title: "Услуги, ремонт, сервисное обслуживание",
        key: 362,
        positions: [
          {
            id: 372,
            title: "Промышленное оборудование",
            key: 372,
          },
        ],
      },
      {
        id: 505,
        title: "Рабочий персонал",
        key: 505,
        positions: [
          {
            id: 600,
            title: "Квалифицированный рабочий",
            key: 600,
          },
        ],
      },
    ],
    agency: {
      id: 1,
      title: "прямой работодатель",
    },
    town: {
      id: 1323,
      title: "Горячий Ключ",
      declension: "в Горячем Ключе",
      hasMetro: false,
      genitive: "Горячего Ключа",
    },
    already_sent_on_vacancy: false,
    rejected: false,
    response_info: [],
    phone: "+7 (861) 20163XX",
    phones: [
      {
        number: "786120163XX",
        additionalNumber: null,
      },
    ],
    fax: null,
    faxes: null,
    client_logo: null,
    highlight: true,
    age_from: 0,
    age_to: 0,
    gender: {
      id: 0,
      title: "Не имеет значения",
    },
    firm_name: "Краснодарнефтегаз",
    firm_activity: "Разработка и эксплуатация нефтяных месторождений.",
    link: "https://goryachij-klyuch.superjob.ru/vakansii/elektromonter-po-remontu-i-obsluzhivaniyu-elektrooborudovaniya-27949902.html",
    latitude: 44.634247,
    longitude: 39.136425,
  },
  {
    canEdit: false,
    is_closed: false,
    id: 45188535,
    id_client: 4231261,
    payment_from: 80000,
    payment_to: 100000,
    date_pub_to: 1686756662,
    date_archived: 1676791501,
    date_published: 1684164662,
    address: "Ленинградская область, Всеволожск, Всеволожский проспект, 17",
    profession: "Электромонтажник",
    work: null,
    compensation: null,
    candidat:
      'Компания ООО "Альянс Сервис" (г. Всеволожск, Ленинградская обл.) - на рынке электроэнергетики 15 лет - официальный подрядчик Китайской компании "СС7", которая входит в 10-ку крупнейших строительных компаний Китая, осуществляет, в связи с увеличением объёмов работ на строительном объекте "Балтийский химический комплекс" (БХК) дополнительный набор специалистов по электромонтажу (гр. РФ, Беларусь, Казахстана), имеющих опыт работы по слаботочным системам (пожарка, видеонаблюдение и т.п.)\nОбязанности: Проведение электромонтажных и слаботочных работ в Кингисеппском районе на объектах: -"Балтийский химический комплекс (БХК). Вахтовый жилой городок строителей"; - "Промышленно-логистический парк (комплекс) по хранению и перевалке минеральных удобрений со складским хозяйством и железнодорожной инфраструктурой на территории муниципального образования "Вистинское сельское поселение, Кингисеппский муниципальный район Ленинградской области"\nТребования:\n• Опыт работы по направлениям: ЭМР, слаботочные системы (пожарка, или видеонаблюдение, или СКУД, СОТ, или КИПиА, АСУТП\n• Навыки работы со слаботочными системами, расключения слаботочных систем, чтение эл. схем.\n• Желание работать и зарабатывать.\nУсловия:\n• Достойная, своевременная оплата труда (выплаты 2 раза в месяц: 15 числа след. месяца - зарплата за предыдущий месяц; аванс 30 (31) -текущего месяца), выплаты производятся без задержек, начисление всей зарплаты на банк. карту:\nЗарплата вместе с суточными составляет:\nпо 3 разряду: от 80 - 85 тыс. руб. и выше\nпо 4 разряду: от 85 - 90 тыс. руб. и выше\nпо 5 разряду: от 90 - 95 тыс. руб. и выше\nпо 6 разряду: от 95 - 100 тыс. руб. и выше\nДоплата за бригадирские - 5 тыс. руб.\nКомпания обеспечивает спецодеждой (СИЗ).\n\nМиграционное сопровождение (постановка на миграционный учет и снятие с миграционного учета) иностранных работников - специалистов.\nПроживание бесплатное (за счёт компании) в комфортабельных квартирах в гор. Кингисепп Ленинградская область, для иногородних.\nОформление по ТК РФ с первого рабочего дня, заключается трудовой договор.\nДоставка к месту работ и обратно транспортом компании (автобус) за счёт компании.\nОбучение, повышение квалификации за счёт компании.\nОплата суточных 15 тыс. руб. (из расчета 500 руб. в день), выплаты суточных 2раза в месяц на след.1-2 дня после начисления зарплаты и аванса.\nРассматривается постоянный режим работы: шестидневка, или вахтовый метод работы для иногородних.\nПриветствуется (!) опыт работы в БРИГАДЕ, или наличие БРИГАДЫ электромонтажников.\nРассматриваются бригады по электромонтажным работам с опытом по слаботочным системам.\nРежим работы - вахта до 2- 2,5 месяцев при шестидневной рабочей неделе (суббота - сокращенный рабочий день, воскресение - выходной день), от 14 дней - межвахтовый отдых, или разъездной характер работ.\nВозмещение расходов от дома до места работы, на проезд к месту проведения ежегодного оплачиваемого отпуска, отпуска за свой счет до постоянного места жительства и обратно производится в соответствии с установленными приказами и регламентами.',
    metro: [],
    currency: "rub",
    vacancyRichText:
      '<p><b>Компания ООО "Альянс Сервис" (г. Всеволожск, Ленинградская обл.) - на рынке электроэнергетики 15 лет - официальный подрядчик Китайской компании "СС7", которая входит в 10-ку крупнейших строительных компаний Китая, осуществляет, в связи с увеличением объёмов работ на строительном объекте "Балтийский химический комплекс" (БХК) дополнительный набор специалистов по электромонтажу (гр. РФ, Беларусь, Казахстана), имеющих опыт работы по слаботочным системам (пожарка, видеонаблюдение и т.п.)</b></p><p><b>Обязанности:</b> Проведение электромонтажных и слаботочных работ в Кингисеппском районе на объектах: -"Балтийский химический комплекс (БХК). Вахтовый жилой городок строителей"; - "Промышленно-логистический парк (комплекс) по хранению и перевалке минеральных удобрений со складским хозяйством и железнодорожной инфраструктурой на территории муниципального образования "Вистинское сельское поселение, Кингисеппский муниципальный район Ленинградской области"</p><p><b>Требования:</b></p><ul><li>Опыт работы по направлениям: ЭМР, слаботочные системы (пожарка, или видеонаблюдение, или СКУД, СОТ, или КИПиА, АСУТП</li><li>Навыки работы со слаботочными системами, расключения слаботочных систем, чтение эл. схем.</li><li>Желание работать и зарабатывать.</li></ul><p><b>Условия:</b></p><ul><li><b>Достойная, своевременная оплата труда (выплаты 2 раза в месяц: 15 числа след. месяца - зарплата за предыдущий месяц; аванс 30 (31) -текущего месяца), выплаты производятся без задержек, начисление всей зарплаты на банк. карту:</b></li></ul><p><b>Зарплата вместе с суточными составляет:<br />по 3 разряду: от 80 - 85 тыс. руб. и выше</b></p><p><b>по 4 разряду: от 85 - 90 тыс. руб. и выше</b></p><p><b>по 5 разряду: от 90 - 95 тыс. руб. и выше</b></p><p><b>по 6 разряду: от 95 - 100 тыс. руб. и выше</b></p><p><b>Доплата за бригадирские - 5 тыс. руб.</b></p><p><b>Компания обеспечивает спецодеждой (СИЗ).</b><br /></p><p><b>Миграционное сопровождение (постановка на миграционный учет и снятие с миграционного учета) иностранных работников - специалистов.</b></p><p><b>Проживание бесплатное (за счёт компании) в комфортабельных квартирах в гор. Кингисепп Ленинградская область, для иногородних.</b></p><p>Оформление по ТК РФ с первого рабочего дня, заключается трудовой договор.</p><p>Доставка к месту работ и обратно транспортом компании (автобус) за счёт компании.</p><p>Обучение, повышение квалификации за счёт компании.</p><p><b>Оплата суточных 15 тыс. руб. (из расчета 500 руб. в день), выплаты суточных 2раза в месяц на след.1-2 дня после начисления зарплаты и аванса.</b></p><p>Рассматривается постоянный режим работы: шестидневка, или вахтовый метод работы для иногородних.<br /><b>Приветствуется (!) опыт работы в БРИГАДЕ, или наличие БРИГАДЫ электромонтажников.</b></p><p><b>Рассматриваются бригады по электромонтажным работам с опытом по слаботочным системам.</b></p><p><b>Режим работы - вахта до 2- 2,5 месяцев при шестидневной рабочей неделе (суббота - сокращенный рабочий день, воскресение - выходной день), от 14 дней - межвахтовый отдых, или разъездной характер работ.</b></p><p><b>Возмещение расходов от дома до места работы, на проезд к месту проведения ежегодного оплачиваемого отпуска, отпуска за свой счет до постоянного места жительства и обратно производится в соответствии с установленными приказами и регламентами.</b></p>',
    covid_vaccination_requirement: {
      id: 1,
      title: "Не важно",
    },
    moveable: true,
    agreement: false,
    anonymous: false,
    is_archive: false,
    is_storage: false,
    type_of_work: {
      id: 9,
      title: "Работа вахтовым методом",
    },
    place_of_work: {
      id: 0,
      title: "Не имеет значения",
    },
    education: {
      id: 0,
      title: "Не имеет значения",
    },
    experience: {
      id: 2,
      title: "От 1 года",
    },
    maritalstatus: {
      id: 0,
      title: "Не имеет значения",
    },
    children: {
      id: 0,
      title: "Не имеет значения",
    },
    client: {
      id: 4231261,
      title: "Альянс Сервис",
      link: "https://www.superjob.ru/clients/alyans-servis-4231261/vacancies.html",
      industry: [],
      description:
        "КОМПАНИЯ ООО «АЛЬЯНС СЕРВИС» БОЛЕЕ 15 ЛЕТ РАБОТЫ В РОССИИ и СТРАНАХ БЛИЖНЕГО ЗАРУБЕЖЬЯ В СФЕРЕ ЭЛЕКТРОЭНЕРГЕТИКИ, ПРОМЫШЛЕННОГО ЭЛЕКТРОМОНТАЖА, НАЛАДКИ, СЕРВИСНОГО ОБСЛУЖИВАНИЯ",
      vacancy_count: 18,
      staff_count: "менее 50",
      client_logo: null,
      address: null,
      addresses: [],
      url: "http://alservice.info",
      short_reg: false,
      is_blocked: false,
      registered_date: 1634821202,
      town: {
        id: 869,
        title: "Всеволожск",
        declension: "во Всеволожске",
        hasMetro: false,
        genitive: "Всеволожска",
      },
    },
    languages: [],
    driving_licence: [],
    catalogues: [
      {
        id: 306,
        title: "Строительство, проектирование, недвижимость",
        key: 306,
        positions: [
          {
            id: 319,
            title: "Строительно-монтажные работы",
            key: 319,
          },
          {
            id: 323,
            title: "Эксплуатация зданий",
            key: 323,
          },
          {
            id: 506,
            title: "Слаботочные системы и сети",
            key: 506,
          },
        ],
      },
      {
        id: 505,
        title: "Рабочий персонал",
        key: 505,
        positions: [
          {
            id: 504,
            title: "Рабочий персонал, разное",
            key: 504,
          },
          {
            id: 600,
            title: "Квалифицированный рабочий",
            key: 600,
          },
        ],
      },
    ],
    agency: {
      id: 1,
      title: "прямой работодатель",
    },
    town: {
      id: 2144,
      title: "Окуловка",
      declension: "в Окуловке",
      hasMetro: false,
      genitive: "Окуловки",
    },
    already_sent_on_vacancy: false,
    rejected: false,
    response_info: [],
    phone: "+7 (981) 68772XX",
    phones: [
      {
        number: "798168772XX",
        additionalNumber: null,
      },
    ],
    fax: null,
    faxes: null,
    client_logo: null,
    highlight: false,
    age_from: 0,
    age_to: 0,
    gender: {
      id: 0,
      title: "Не имеет значения",
    },
    firm_name: "Альянс Сервис",
    firm_activity:
      "КОМПАНИЯ ООО «АЛЬЯНС СЕРВИС» БОЛЕЕ 15 ЛЕТ РАБОТЫ В РОССИИ и СТРАНАХ БЛИЖНЕГО ЗАРУБЕЖЬЯ В СФЕРЕ ЭЛЕКТРОЭНЕРГЕТИКИ, ПРОМЫШЛЕННОГО ЭЛЕКТРОМОНТАЖА, НАЛАДКИ, СЕРВИСНОГО ОБСЛУЖИВАНИЯ",
    link: "https://okulovka.superjob.ru/vakansii/elektromontazhnik-45188535.html",
    latitude: 60.021198,
    longitude: 30.646448,
  },
  {
    canEdit: false,
    is_closed: false,
    id: 45906340,
    id_client: 38260,
    payment_from: 36000,
    payment_to: 48000,
    date_pub_to: 1686756698,
    date_archived: 1683717302,
    date_published: 1684164698,
    address: "Калуга, ул. Московская 289/3",
    profession: "Оператор на входящую линию",
    work: null,
    compensation: null,
    candidat:
      "Привет, это билайн. Мы ищем специалистов, которые смогут усилить нашу команду поддержки клиентов. \nСпециалисты поддержки выполняют очень важную работу – с заботой и пониманием решают каждый отдельный запрос от клиентов. А мы в свою очередь, заботимся о сотрудниках – предоставляем комфортные условия для работы, строим планы развития и бережно помогаем достигать цели каждого.\nБудущий специалист поддержки будет:\n• Принимать входящие звонки. На данной позиции нет продаж.\n• Отвечать на вопросы по продуктам компании и помогать их решить. Например, подсказать баланс, подобрать тариф, принять заявку на проверку качества связи.\nМы предлагаем:\n• Фиксированный оклад + премия, уже на старте ты будешь получать от 36000 руб.\n• Удобные графики по 7, 9 или 12 часов.\n• 28 дней отпуска по ТК, и +2 дня отпуска бонусом от компании.\n• 1500 руб. в месяц на оплату мобильной связи для тебя и твоей семьи.\n• ДМС (включая стоматологию).\n• Комфортный офис с чаем, кофе и пледами.\n• Оплачиваемое обучение с первого дня.\n• Билайн университет: десятки курсов от тайм-менеджмента до дата-инжиниринга.\n• Доступ к электронным библиотекам МИФ, Альпина и Периодика.\n• Крутую команду и помощь руководителя, активную корпоративную жизнь.\n• Помощь карьерного консультанта и понятный карьерный трек. В личном кабинете ты увидишь все должности, до которых ты можешь вырасти и список действий, чтобы получить повышение.\n• Крутой зарплатный проект с кэшбеком 25% на покупки в билайне и 5% на все покупки в Пятерочке.\n• Реферальная программа: ты приглашаешь друга работать в билайн и получаешь 7000 руб.\n• Корпоративный психолог.\n• Оплата такси, если смена заканчивается после 23:00.\nОтлично, если у тебя есть опыт работы в таких компаниях, как Ростелеком, Теле 2, Дом.ру, Yota, Мегафон, МТС, Яндекс, Тинькофф, Сбербанк, Связной на позиции специалиста по работе с клиентами, менеджера по сопровождению клиентов, оператора call-центра, оператора по работе со входящими звонками. Если нет - не страшно, мы всему научим.\nБудем рады рассказать о позиции подробнее – откликайся!",
    metro: [],
    currency: "rub",
    vacancyRichText:
      "<p><b>Привет, это билайн. Мы ищем специалистов, которые смогут усилить нашу команду поддержки клиентов. </b></p><p>Специалисты поддержки выполняют очень важную работу – с заботой и пониманием решают каждый отдельный запрос от клиентов. А мы в свою очередь, заботимся о сотрудниках – предоставляем комфортные условия для работы, строим планы развития и бережно помогаем достигать цели каждого.</p><p><b>Будущий специалист поддержки будет:</b></p><p>• Принимать входящие звонки. На данной позиции нет продаж.</p><p>• Отвечать на вопросы по продуктам компании и помогать их решить. Например, подсказать баланс, подобрать тариф, принять заявку на проверку качества связи.</p><p><b>Мы предлагаем:</b></p><p>• Фиксированный оклад + премия, уже на старте ты будешь получать от 36000 руб.</p><p>• Удобные графики по 7, 9 или 12 часов.</p><p>• 28 дней отпуска по ТК, и +2 дня отпуска бонусом от компании.</p><p>• 1500 руб. в месяц на оплату мобильной связи для тебя и твоей семьи.</p><p>• ДМС (включая стоматологию).</p><p>• Комфортный офис с чаем, кофе и пледами.</p><p>• Оплачиваемое обучение с первого дня.</p><p>• Билайн университет: десятки курсов от тайм-менеджмента до дата-инжиниринга.</p><p>• Доступ к электронным библиотекам МИФ, Альпина и Периодика.</p><p>• Крутую команду и помощь руководителя, активную корпоративную жизнь.</p><p>• Помощь карьерного консультанта и понятный карьерный трек. В личном кабинете ты увидишь все должности, до которых ты можешь вырасти и список действий, чтобы получить повышение.</p><p>• Крутой зарплатный проект с кэшбеком 25% на покупки в билайне и 5% на все покупки в Пятерочке.</p><p>• Реферальная программа: ты приглашаешь друга работать в билайн и получаешь 7000 руб.</p><p>• Корпоративный психолог.</p><p>• Оплата такси, если смена заканчивается после 23:00.</p><p><i>Отлично, если у тебя есть опыт работы в таких компаниях, как Ростелеком, Теле 2, Дом.ру, Yota, Мегафон, МТС, Яндекс, Тинькофф, Сбербанк, Связной на позиции специалиста по работе с клиентами, менеджера по сопровождению клиентов, оператора call-центра, оператора по работе со входящими звонками. Если нет - не страшно, мы всему научим.</i></p><p><b>Будем рады рассказать о позиции подробнее – откликайся!</b></p>",
    covid_vaccination_requirement: {
      id: 1,
      title: "Не важно",
    },
    moveable: true,
    agreement: false,
    anonymous: false,
    is_archive: false,
    is_storage: false,
    type_of_work: {
      id: 6,
      title: "Полный рабочий день",
    },
    place_of_work: {
      id: 0,
      title: "Не имеет значения",
    },
    education: {
      id: 0,
      title: "Не имеет значения",
    },
    experience: {
      id: 1,
      title: "Без опыта",
    },
    maritalstatus: {
      id: 0,
      title: "Не имеет значения",
    },
    children: {
      id: 0,
      title: "Не имеет значения",
    },
    client: {
      id: 38260,
      title: "Билайн",
      link: "https://www.superjob.ru/clients/bilajn-38260/vacancies.html",
      industry: [],
      description:
        "«ВымпелКом» - один из крупнейших мировых операторов связи и представлен в России, Италии, Украине, Казахстане, Узбекистане, Таджикистане, Армении, Грузии, Кыргызстане, Лаосе, Алжире, Бангладеш, Пакистане и Зимбабве.\n\nВ России «ВымпелКом» оказывает услуги связи под брендом «билайн», и наш бренд – один из самых популярных и узнаваемых торговых знаков в России и странах СНГ. Мы предлагаем услуги различных видов связи, особое внимание уделяем развитию услуг по передаче данных, которые на сегодняшний день наиболее востребованы.\n\nМы очень хорошо понимаем, что связь нужна в современном мире, как воздух: с помощью наших услуг десятки миллионов людей ежедневно, ежеминутно и ежесекундно решают свои задачи, и поэтому мы знаем, что должны работать всегда и везде, и на самом высоком уровне. Поэтому в нашей команде только лучшие и правильные люди – те, кто четко знают, что в центре работы все компании – каждый клиент, и что наша задача – помогать ему каждый день.\n\nКаждый сотрудник – профессионал в своей области, и билайн как работодатель делает для развития и поддержки своих сотрудников много таких шагов, которые помогают нам расти, развиваться, учиться и достигать намеченных целей.\n\nВ нашей более чем 20-летней истории множество примеров успешного карьерного роста, когда рядовой сотрудник колл-центра или офиса продаж становится директором филиала, региона или отдельно взятого направления. Каждому новому сотруднику мы окажем поддержку – научим, подготовим и всегда придем на помощь! У нас есть настоящий корпоративный университет, где ты можешь совершенно бесплатно приобрести дополнительные знания в самых разных областях – от технологий GSM до менеджмента. Для тех, кто только задумывается над своей будущей карьерой – студентов старших курсов — существуют программы стажировки. Не упусти свой шанс, пусть твой опыт тоже войдет в нашу общую историю успеха!\n\nНо мы не просто предоставляем связь, а стремимся сделать технологии доступными для всех, в том числе социально незащищенных слоев населения. Наша основная помощь социального характера - адаптация слабослышащих абонентов в обществе с помощью специальных тарифов и обслуживания на языке жестов, на сайте или через SMS. Мы активно сотрудничаем с LizaAlert в поиске потерявшихся детей, развиваем m-charity, m-health, предлагаем онлайн-защиту детей от мошенничества и активно участвуем в волонтерской деятельности. Наши сотрудники добрые и отзывчивые!\n\nЕсли ты такой же, как мы – яркий, инициативный, веселый, добрый и целеустремленный – присоединяйся к нашей команде, мы будем рады тебе!",
      vacancy_count: 1078,
      staff_count: "более 5000",
      client_logo:
        "https://public.superjob.ru/images/clients_logos.ru/38260_631431f81707443cd83c352711ae1585.png",
      address: null,
      addresses: [],
      url: "http://www.job.beeline.ru",
      short_reg: false,
      is_blocked: false,
      registered_date: 1157113048,
      town: {
        id: 4,
        title: "Москва",
        declension: "в Москве",
        hasMetro: true,
        genitive: "Москвы",
      },
    },
    languages: [],
    driving_licence: [],
    catalogues: [
      {
        id: 438,
        title: "Продажи",
        key: 438,
        positions: [
          {
            id: 34,
            title: "Call Center",
            key: 34,
          },
        ],
      },
    ],
    agency: {
      id: 1,
      title: "прямой работодатель",
    },
    town: {
      id: 127,
      title: "Калуга",
      declension: "в Калуге",
      hasMetro: false,
      genitive: "Калуги",
    },
    already_sent_on_vacancy: false,
    rejected: false,
    response_info: [],
    phone: "+7 (915) 65546XX",
    phones: [
      {
        number: "791565546XX",
        additionalNumber: null,
      },
    ],
    fax: null,
    faxes: null,
    client_logo:
      "https://public.superjob.ru/images/clients_logos.ru/38260_631431f81707443cd83c352711ae1585.png",
    highlight: true,
    age_from: 0,
    age_to: 0,
    gender: {
      id: 0,
      title: "Не имеет значения",
    },
    firm_name: "Билайн",
    firm_activity:
      "«ВымпелКом» - один из крупнейших мировых операторов связи и представлен в России, Италии, Украине, Казахстане, Узбекистане, Таджикистане, Армении, Грузии, Кыргызстане, Лаосе, Алжире, Бангладеш, Пакистане и Зимбабве. \n\nВ России «ВымпелКом» оказывает услуги связи под брендом «билайн», и наш бренд – один из самых популярных и узнаваемых торговых знаков в России и странах СНГ. Мы предлагаем услуги различных видов связи, особое внимание уделяем развитию услуг по передаче данных, которые на сегодняшний день наиболее востребованы. \n\nМы очень хорошо понимаем, что связь нужна в современном мире, как воздух: с помощью наших услуг десятки миллионов людей ежедневно, ежеминутно и ежесекундно решают свои задачи, и поэтому мы знаем, что должны работать всегда и везде, и на самом высоком уровне. Поэтому в нашей команде только лучшие и правильные люди – те, кто четко знают, что в центре работы все компании – каждый клиент, и что наша задача – помогать ему каждый день. \n\nКаждый сотрудник – профессионал в своей области, и билайн как работодатель делает для развития и поддержки своих сотрудников много таких шагов, которые помогают нам расти, развиваться, учиться и достигать намеченных целей. \n\nВ нашей более чем 20-летней истории множество примеров успешного карьерного роста, когда рядовой сотрудник колл-центра или офиса продаж становится директором филиала, региона или отдельно взятого направления. Каждому новому сотруднику мы окажем поддержку – научим, подготовим и всегда придем на помощь! У нас есть настоящий корпоративный университет, где ты можешь совершенно бесплатно приобрести дополнительные знания в самых разных областях – от технологий GSM до менеджмента. Для тех, кто только задумывается над своей будущей карьерой – студентов старших курсов — существуют программы стажировки. Не упусти свой шанс, пусть твой опыт тоже войдет в нашу общую историю успеха!\n\nНо мы не просто предоставляем связь, а стремимся сделать технологии доступными для всех, в том числе социально незащищенных слоев населения. Наша основная помощь социального характера - адаптация слабослышащих абонентов в обществе с помощью специальных тарифов и обслуживания на языке жестов, на сайте или через SMS. Мы активно сотрудничаем с LizaAlert в поиске потерявшихся детей, развиваем m-charity, m-health, предлагаем онлайн-защиту детей от мошенничества и активно участвуем в волонтерской деятельности. Наши сотрудники добрые и отзывчивые!\n\nЕсли ты такой же, как мы – яркий, инициативный, веселый, добрый и целеустремленный – присоединяйся к нашей команде, мы будем рады тебе!",
    link: "https://kaluga.superjob.ru/vakansii/operator-na-vhodyaschuyu-liniyu-45906340.html",
    latitude: null,
    longitude: null,
  },
  {
    canEdit: false,
    is_closed: false,
    id: 46371879,
    id_client: 280168,
    payment_from: 0,
    payment_to: 46700,
    date_pub_to: 1686756709,
    date_archived: 0,
    date_published: 1684164709,
    address: null,
    profession: "Товаровед магазина Магнит (Самара, Алексея Толстого, 135)",
    work: null,
    compensation: null,
    candidat:
      "Обязанности:\n• Организация и контроль приемки товара\n• Контроль качества, количества и сроков реализации товара, наличия сопроводительных документов\n• Организация выкладки товаров в соответствии со стандартами\n• Контроль продаж и наличия ассортимента товаров в магазине\n• Организация учета товара, участие в инвентаризациях\n\n\nУсловия:\n• Оформление по Трудовому кодексу с первого дня (стабильная заработная плата, оплачиваемый отпуск, социальные гарантии)\n• График работы 2/2\n• Работа рядом с домом\n• Возможен карьерный рост через 6 месяцев\n• Обучение за счет компании\n• Кэшбек 10% для сотрудников в магазинах сети Магнит\n• Фирменная спецодежда\n• Бесплатное оформление медицинской книжки\n• А еще у «Магнита» есть преимущество - если у вас в планах переезд в другой город, вам не придётся менять компанию. Наши магазины есть в более чем 4 000 городов, деревень, сёл, станиц!\n\n\nТребования:\n• Образование не ниже средне-специального\n• Базовый уровень владения ПК и стандартными офисными программами\n• Опыт работы в аналогичной сфере от 1 года",
    metro: [],
    currency: "rub",
    vacancyRichText:
      "<p>Обязанности:</p><p>• Организация и контроль приемки товара</p><p>• Контроль качества, количества и сроков реализации товара, наличия сопроводительных документов</p><p>• Организация выкладки товаров в соответствии со стандартами</p><p>• Контроль продаж и наличия ассортимента товаров в магазине</p><p>• Организация учета товара, участие в инвентаризациях</p><p><br /></p><p>Условия:</p><p>• Оформление по Трудовому кодексу с первого дня (стабильная заработная плата, оплачиваемый отпуск, социальные гарантии)</p><p>• График работы 2/2</p><p>• Работа рядом с домом</p><p>• Возможен карьерный рост через 6 месяцев</p><p>• Обучение за счет компании</p><p>• Кэшбек 10% для сотрудников в магазинах сети Магнит</p><p>• Фирменная спецодежда</p><p>• Бесплатное оформление медицинской книжки</p><p>• А еще у «Магнита» есть преимущество - если у вас в планах переезд в другой город, вам не придётся менять компанию. Наши магазины есть в более чем 4 000 городов, деревень, сёл, станиц!</p><p><br /></p><p>Требования:</p><p>• Образование не ниже средне-специального</p><p>• Базовый уровень владения ПК и стандартными офисными программами</p><p>• Опыт работы в аналогичной сфере от 1 года</p>",
    covid_vaccination_requirement: {
      id: 1,
      title: "Не важно",
    },
    moveable: true,
    agreement: false,
    anonymous: false,
    is_archive: false,
    is_storage: false,
    type_of_work: {
      id: 12,
      title: "Сменный график работы",
    },
    place_of_work: {
      id: 0,
      title: "Не имеет значения",
    },
    education: {
      id: 0,
      title: "Не имеет значения",
    },
    experience: {
      id: 2,
      title: "От 1 года",
    },
    maritalstatus: {
      id: 0,
      title: "Не имеет значения",
    },
    children: {
      id: 0,
      title: "Не имеет значения",
    },
    client: {
      id: 280168,
      title: "Магнит, Розничная сеть",
      link: "https://www.superjob.ru/clients/magnit-roznichnaya-set-280168/vacancies.html",
      industry: [],
      description:
        "«Магнит» – не просто один из крупнейших частных работодателей России. Мы – семья магазинов, поэтому ценим каждого из 360 тысяч сотрудников. И очень гордимся, что люди остаются с нами надолго: ежегодно около 5 000 человек отмечают 10-летие работы в «Магните», получая «Золотой значок». Всего в компании работает 21 000 «золотых» сотрудников!\n«Магнит» — лидер по количеству магазинов и географии их расположения. Наша сеть включает в себя 26 077 торговых объектов в 67 регионах. А значит, вы можете работать ближе к дому, семье и детям. А ещё в семью «Магнита» входят 13 предприятий по производству продуктов, 4 агропромышленных комплекса, 45 складских и 37 автотранспортных центров. Какой формат притягивает вас больше? Выбирайте работу по душе!\n«Магнит» всегда поддержит ваше стремление вырасти: в компании мы создаём безопасную рабочую среду и прозрачную систему корпоративного роста. Нацелены на карьеру? Постройте её вместе с «Магнитом»!\nСтаньте частью семьи «Магнит»!",
      vacancy_count: 28191,
      staff_count: "более 5000",
      client_logo:
        "https://public.superjob.ru/images/clients_logos.ru/280168_b9d2fbd4cd89b501e77dc847b88fe8d4.png",
      address:
        "КРАСНОДАР, Г. Краснодар, ул. Солнечная, д. 15/5 (Головной офис)",
      addresses: [
        {
          addressString:
            "КРАСНОДАР, Г. Краснодар, ул. Солнечная, д. 15/5 (Головной офис)",
          latitude: 45.073388,
          longitude: 39.003879,
          phones: [],
        },
      ],
      url: "https://rabota.magnit.ru",
      short_reg: false,
      is_blocked: false,
      registered_date: 1239790517,
      town: {
        id: 4,
        title: "Москва",
        declension: "в Москве",
        hasMetro: true,
        genitive: "Москвы",
      },
    },
    languages: [],
    driving_licence: [],
    catalogues: [
      {
        id: 438,
        title: "Продажи",
        key: 438,
        positions: [
          {
            id: 448,
            title: "Косметика, бытовая химия",
            key: 448,
          },
          {
            id: 453,
            title: "Продукты питания",
            key: 453,
          },
        ],
      },
      {
        id: 478,
        title: "Топ-персонал",
        key: 478,
        positions: [
          {
            id: 502,
            title: "Продажи",
            key: 502,
          },
        ],
      },
      {
        id: 512,
        title: "Закупки, снабжение",
        key: 512,
        positions: [
          {
            id: 524,
            title: "Косметика, бытовая химия",
            key: 524,
          },
          {
            id: 530,
            title: "Продукты питания",
            key: 530,
          },
        ],
      },
    ],
    agency: {
      id: 1,
      title: "прямой работодатель",
    },
    town: {
      id: 5,
      title: "Самара",
      declension: "в Самаре",
      hasMetro: true,
      genitive: "Самары",
    },
    already_sent_on_vacancy: false,
    rejected: false,
    response_info: [],
    phone: "+7 (800) 70063XX",
    phones: [
      {
        number: "780070063XX",
        additionalNumber: null,
      },
    ],
    fax: null,
    faxes: null,
    client_logo:
      "https://public.superjob.ru/images/clients_logos.ru/280168_b9d2fbd4cd89b501e77dc847b88fe8d4.png",
    highlight: false,
    age_from: 0,
    age_to: 0,
    gender: {
      id: 0,
      title: "Не имеет значения",
    },
    firm_name: "Магнит, Розничная сеть",
    firm_activity:
      "Мы растём и меняемся уже много лет, становимся ближе к сотрудникам и покупателям, окружая их заботой. \n«Магнит» начинал свою историю как логистический оператор, за четверть века превратившись в крупнейшую ритейл-сеть страны. Такой успех стал возможен, в первую очередь, благодаря людям, которые у нас работают. \nНаша родина – Краснодар, и сегодня «Магнит» насчитывает свыше 22 000 магазинов в разных уголках России, 4 агропредприятия, 16 собственных производств, 35 АТП и 37 распределительных центров! А это значит, что мы объединяем десятки и сотни тысяч людей в одну большую и дружную семью! Кто однажды прошёл школу ритейла «Магнит», навсегда остаются лучшими специалистами и добрыми друзьями. \nМы гордимся нашей командой и приглашаем лучших присоединиться. \nС заботой о людях. Ваш «Магнит».",
    link: "https://samara.superjob.ru/vakansii/tovaroved-magazina-magnit-46371879.html",
    latitude: null,
    longitude: null,
  },
];
