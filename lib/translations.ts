import { Language } from '@/types';

export const translations = {
  RU: {
    nav: {
      about: 'О Лиге',
      activities: 'Чем мы занимаемся',
      info: 'Полезная информация',
      projects: 'Наши проекты',
      news: 'Новости',
      residents: 'Резиденты',
      contacts: 'Контакты',
      gallery: 'Галерея',
      opinion: 'Мнение',
      logout: 'Выйти',
    },
    hero: {
      badge: 'LCK.KZ',
      title: {
        top: 'Лига',
        highlight: 'Кинематографистов',
        bottom: 'Казахстана',
      },
      description: 'Независимая общественная организация, целью которой является содействие развитию казахстанского кинематографа.',
      joinBtn: 'Вступить в Лигу',
      applyBtn: 'Подать заявку',
    },
    about: {
      title: {
        first: 'Кто',
        highlight: 'Мы?',
      },
      description: 'Мы объединяем профессионалов киноиндустрии, продвигая национальный кинематограф и создавая условия для его развития.',
      cards: [
        {
          title: 'Идея Создания',
          quote: '«Молодым кинематографистам не хватает сплоченности...»',
          text: 'Вдохновившись объединением усилий с коллегами, Олжас Аскаров инициировал создание объединения, которое уже собрало более 120 участников, чтобы вместе развивать индустрию.',
        },
        {
          title: 'Миссия',
          text: 'Содействие устойчивому развитию киноиндустрии страны через раскрытие потенциала молодых кинематографистов, представляя их права и интересы для комплексного развития национального кинематографа.',
        },
        {
          title: 'Название (LCK)',
          text: 'Для удобства международного взаимодействия мы используем аббревиатуру LCK (League of Cinematographers of Kazakhstan), что подчеркивает наше стремление к развитию казахстанского кинематографа на мировой арене.',
        },
      ],
    },
    benefits: {
      title: {
        top: 'Стань частью Лиги —',
        highlight: 'открой новые возможности',
        bottom: 'своей карьеры',
      },
      description: 'Вы — режиссёр, сценарист, оператор или продюсер? Лига кинематографистов Казахстана приглашает вас стать частью крупнейшего профессионального сообщества.',
      list: [
        'Участвуйте в мастер-классах, фестивалях и питчингах.',
        'Получите юридическую помощь и консультации по грантам.',
        'Пользуйтесь базой профессионального оборудования и локаций.',
      ],
      cta: 'Подать заявку',
      cards: [
        { title: "Нетворкинг", desc: "С лидерами отрасли" },
        { title: "Поддержка", desc: "Специалистов отрасли" },
        { title: "Карьера", desc: "В индустрии кино" },
        { title: "Ресурсы", desc: "Доступность актуальных баз" },
      ]
    },
    leadingOrg: {
      title: {
        first: 'Ведущая',
        highlight: 'общественная организация',
      },
      mainDesc: 'Представляющая интересы профессионалов киноиндустрии на национальном и международном уровнях. Лига объединяет режиссёров, продюсеров, сценаристов и других специалистов, формируя единый голос отрасли.',
      cards: [
        { title: 'Авторитет', text: 'Лига является основным партнёром государства в вопросах развития кино, сотрудничая с министерствами и фондами. Мы участвуем в разработке законодательных инициатив.' },
        { title: 'Влияние', text: 'Лига организует ключевые события, такие как национальные и международные кинофестивали, способствуя продвижению казахстанской культуры.' },
        { title: 'Поддержка', text: 'Мы защищаем права кинематографистов, обеспечиваем юридическую поддержку и создаём условия для роста отрасли, включая обучение и грантовые программы.' },
      ]
    },
    activities: {
      badge: 'Сфера деятельности',
      title: 'Чем мы занимаемся',
      items: [
        { title: 'Основные Задачи', description: 'Организация деятельности, развитие кинематографа, поддержка молодых талантов.' },
        { title: 'Стратегия', description: 'Поиск, поддержка талантов. Участие в разработке дорожной карты развития кинематографии.' },
        { title: 'Важные Шаги', description: 'Совершенствование законодательства, выстраивание идеологического вектора, защита прав.' },
        { title: 'Наши Функции', description: 'Сбор и анализ информации, обмен опытом и повышение квалификации кинематографистов.' },
        { title: 'Образование', description: 'Организация образования, исследования деятельности, популяризация кино.' },
        { title: 'Содействие', description: 'Привлечение финансирования от гос. и коммерческих структур. Решение проблем отрасли.' },
        { title: 'Защита', description: 'Защита законных прав участников Лиги. Организация единой диалоговой площадки.' },
        { title: 'Финансирование', description: 'Поддержка ветеранов кино. Поиск инвесторов. Сотрудничество с фин. институтами.' },
        { title: 'Система', description: 'Регулирование стоимости услуг, международное сотрудничество, повышение компетенций.' },
      ]
    },
    usefulInfo: {
      title: {
        first: 'Полезная',
        highlight: 'информация',
      },
      contracts: {
        title: 'Типовые договоры',
        desc: 'В этом разделе мы разместили Типовые договоры для резидентов Лиги. Скачивайте и используйте в работе.',
      },
      analytics: {
        title: 'Аналитические материалы',
        desc: 'Актуальные исследования, отчёты и аналитика о состоянии и развитии киноиндустрии Казахстана.',
      }
    },
    stats: {
      marquee: 'РАЗВИТИЕ ОТРАСЛИ • ПОДДЕРЖКА ТАЛАНТОВ • СИЛА СООБЩЕСТВА • ',
      participants: 'участника',
      projects: 'проектов',
      experience: 'лет опыта',
    },
    news: {
      title: {
        first: 'Последние',
        highlight: 'Новости',
      },
      desc: 'Держим вас в курсе последних событий в жизни казахстанского и мирового кинематографа.',
      moreBtn: 'Больше новостей',
      readBtn: 'Читать',
      items: [
        { title: "Фильм «Почтальон Победы» под Минском снимают кинематографисты из Беларуси, Казахстана и России" },
        { title: "Битва форматов вертикаль VS кино: между трендом и искусством" },
        { title: "Лига кинематографистов приняла активное участие в Международном форуме «Культура. Медиа. Цифра»" },
        { title: "Обращение Министерству культуры и информации Республики Казахстан" },
      ]
    },
    cta: {
      title: {
        first: 'Давайте создавать',
        highlight: 'будущее кино',
        last: 'вместе',
      },
      desc: 'Нет ничего эффективнее, чем сообщество людей, объединенных общей идеей. Присоединяйтесь сегодня!',
      btn: 'Подать заявку',
    },
    footer: {
      title: 'Обратная связь',
      desc: 'Остались вопросы? Свяжитесь с нами, и мы ответим в ближайшее время.',
      form: {
        name: 'Ваше Имя',
        email: 'Ваш Email',
        message: 'Сообщение',
        submit: 'Отправить',
      },
      contacts: {
        title: 'Контакты',
        address: 'Казахстан, город Алматы',
      },
      menu: {
        title: 'Меню',
      },
      join: {
        title: 'Станьте членом лиги',
        desc: 'Введите свой Email и мы пришлем Вам приглашение',
      },
      copyright: 'Разработано',
    },
    chatbot: {
      title: 'Aperture — LCK AI Assistant',
      status: 'ЗАПИСЬ ● ЭФИР',
      systemReady: 'Система готова',
      awaiting: 'Ожидание команды режиссера',
      placeholder: 'Введите команду...',
      generating: 'ГЕНЕРАЦИЯ СЦЕНЫ...',
      roleUser: 'РЕЖИССЕР (ВЫ)',
      roleAi: 'AI АССИСТЕНТ',
      prompts: ['О членстве', 'Текущие проекты', 'Контакты']
    }
  },
  KZ: {
    nav: {
      about: 'Лига туралы',
      activities: 'Қызметіміз',
      info: 'Пайдалы ақпарат',
      projects: 'Жобаларымыз',
      news: 'Жаңалықтар',
      residents: 'Резиденттер',
      contacts: 'Байланыс',
      gallery: 'Галерея',
      opinion: 'Пікір',
      logout: 'Шығу',
    },
    hero: {
      badge: 'LCK.KZ',
      title: {
        top: 'Қазақстан',
        highlight: 'Кинематографистер',
        bottom: 'Лигасы',
      },
      description: 'Қазақстандық кинематографияның дамуына жәрдемдесуді мақсат ететін тәуелсіз қоғамдық ұйым.',
      joinBtn: 'Лигаға қосылу',
      applyBtn: 'Өтінім беру',
    },
    about: {
      title: {
        first: 'Біз',
        highlight: 'Кімбіз?',
      },
      description: 'Біз киноиндустрия мамандарын біріктіреміз, ұлттық кинематографияны дамытамыз және оған жағдай жасаймыз.',
      cards: [
        {
          title: 'Құрылу идеясы',
          quote: '«Жас кинематографистерге ынтымақтастық жетіспейді...»',
          text: 'Әріптестермен күш біріктіруден шабыттанған Олжас Асқаров индустрияны бірге дамыту үшін 120-дан астам қатысушыны жинаған бірлестік құруға бастамашы болды.',
        },
        {
          title: 'Миссия',
          text: 'Жас кинематографистердің әлеуетін ашу арқылы елдің киноиндустриясының тұрақты дамуына жәрдемдесу, ұлттық киноны кешенді дамыту үшін олардың құқықтары мен мүдделерін білдіру.',
        },
        {
          title: 'Атауы (LCK)',
          text: 'Халықаралық өзара іс-қимылдың ыңғайлылығы үшін біз LCK (League of Cinematographers of Kazakhstan) аббревиатурасын қолданамыз, бұл біздің қазақстандық киноны әлемдік аренада дамытуға деген ұмтылысымызды көрсетеді.',
        },
      ],
    },
    benefits: {
      title: {
        top: 'Лиганың бір бөлігі бол —',
        highlight: 'мансабың үшін жаңа',
        bottom: 'мүмкіндіктер аш',
      },
      description: 'Сіз режиссер, сценарист, оператор немесе продюсерсіз бе? Қазақстан Кинематографистер Лигасы сізді ең ірі кәсіби қоғамдастықтың мүшесі болуға шақырады.',
      list: [
        'Мастер-класстарға, фестивальдерге және питчингтерге қатысыңыз.',
        'Гранттар бойынша заңгерлік көмек пен кеңестер алыңыз.',
        'Кәсіби жабдықтар мен локациялар базасын пайдаланыңыз.',
      ],
      cta: 'Өтінім беру',
      cards: [
        { title: "Нетворкинг", desc: "Сала көшбасшыларымен" },
        { title: "Қолдау", desc: "Сала мамандарын қолдау" },
        { title: "Мансап", desc: "Кино индустриясында" },
        { title: "Ресурстар", desc: "Өзекті базаларға қолжетімділік" },
      ]
    },
    leadingOrg: {
      title: {
        first: 'Жетекші',
        highlight: 'қоғамдық ұйым',
      },
      mainDesc: 'Киноиндустрия мамандарын ұлттық және халықаралық деңгейде білдіретін ұйым. Лига режиссерлерді, продюсерлерді, сценаристерді біріктіріп, саланың бірыңғай дауысын қалыптастырады.',
      cards: [
        { title: 'Бедел', text: 'Лига киноны дамыту мәселелерінде мемлекеттің негізгі серіктесі болып табылады, министрліктермен және қорлармен ынтымақтасады.' },
        { title: 'Ықпал', text: 'Лига қазақстандық мәдениетті ілгерілетуге ықпал ете отырып, ұлттық және халықаралық кинофестивальдер сияқты маңызды оқиғаларды ұйымдастырады.' },
        { title: 'Қолдау', text: 'Біз кинематографистердің құқықтарын қорғаймыз, заңгерлік қолдау көрсетеміз және саланы дамыту үшін жағдай жасаймыз.' },
      ]
    },
    activities: {
      badge: 'Қызмет саласы',
      title: 'Біз немен айналысамыз',
      items: [
        { title: 'Негізгі Міндеттер', description: 'Қызметті ұйымдастыру, кинематографияны дамыту, жас таланттарды қолдау.' },
        { title: 'Стратегия', description: 'Таланттарды іздеу және қолдау. Кинематографияны дамытудың жол картасын әзірлеуге қатысу.' },
        { title: 'Маңызды Қадамдар', description: 'Заңнаманы жетілдіру, идеологиялық векторды құру, құқықтарды қорғау.' },
        { title: 'Біздің Функциялар', description: 'Ақпаратты жинау және талдау, тәжірибе алмасу және кинематографистердің біліктілігін арттыру.' },
        { title: 'Білім Беру', description: 'Білім беруді ұйымдастыру, қызметті зерттеу, киноны насихаттау.' },
        { title: 'Жәрдемдесу', description: 'Мемлекеттік және коммерциялық құрылымдардан қаржыландыру тарту. Сала мәселерін шешу.' },
        { title: 'Қорғау', description: 'Лига қатысушыларының заңды құқықтарын қорғау. Бірыңғай диалог алаңын ұйымдастыру.' },
        { title: 'Қаржыландыру', description: 'Кино ардагерлерін қолдау. Инвесторларды іздеу. Қаржы институттарымен ынтымақтастық.' },
        { title: 'Жүйе', description: 'Қызметтер құнын реттеу, халықаралық ынтымақтастық, құзыреттілікті арттыру.' },
      ]
    },
    usefulInfo: {
      title: {
        first: 'Пайдалы',
        highlight: 'ақпарат',
      },
      contracts: {
        title: 'Үлгілік шарттар',
        desc: 'Бұл бөлімде біз Лига резиденттері үшін Үлгілік шарттарды орналастырдық. Жүктеп алыңыз және жұмыста қолданыңыз.',
      },
      analytics: {
        title: 'Талдамалық материалдар',
        desc: 'Қазақстанның киноиндустриясының жай-күйі мен дамуы туралы өзекті зерттеулер, есептер және талдаулар.',
      }
    },
    stats: {
      marquee: 'САЛАНЫ ДАМЫТУ • ТАЛАНТТАРДЫ ҚОЛДАУ • ҚОҒАМДАСТЫҚ КҮШІ • ',
      participants: 'қатысушы',
      projects: 'жоба',
      experience: 'жыл тәжірибе',
    },
    news: {
      title: {
        first: 'Соңғы',
        highlight: 'Жаңалықтар',
      },
      desc: 'Біз сізді қазақстандық және әлемдік кинематография өміріндегі соңғы оқиғалардан хабардар етіп отырамыз.',
      moreBtn: 'Көбірек жаңалық',
      readBtn: 'Оқу',
      items: [
        { title: "Минск түбінде «Жеңіс пошташысы» фильмін Беларусь, Қазақстан және Ресей кинематографистері түсіруде" },
        { title: "Форматтар шайқасы вертикаль VS кино: тренд пен өнер арасында" },
        { title: "Кинематографистер лигасы «Мәдениет. Медиа. Цифр» халықаралық форумына белсенді қатысты" },
        { title: "Қазақстан Республикасы Мәдениет және ақпарат министрлігіне үндеу" },
      ]
    },
    cta: {
      title: {
        first: 'Болашақ киноны',
        highlight: 'бірге',
        last: 'жасайық',
      },
      desc: 'Ортақ идеямен біріккен адамдар қауымдастығынан тиімдірек ештеңе жоқ. Бүгін қосылыңыз!',
      btn: 'Өтінім беру',
    },
    footer: {
      title: 'Кері байланыс',
      desc: 'Сұрақтарыңыз қалды ма? Бізбен хабарласыңыз, біз жақын арада жауап береміз.',
      form: {
        name: 'Сіздің атыңыз',
        email: 'Сіздің Email',
        message: 'Хабарлама',
        submit: 'Жіберу',
      },
      contacts: {
        title: 'Байланыс',
        address: 'Қазақстан, Алматы қаласы',
      },
      menu: {
        title: 'Мәзір',
      },
      join: {
        title: 'Лига мүшесі болыңыз',
        desc: 'Email енгізіңіз және біз сізге шақыру жібереміз',
      },
      copyright: 'Әзірлеген',
    },
    chatbot: {
      title: 'Aperture — LCK AI Assistant',
      status: 'ЖАЗУ ● ТІКЕЛЕЙ ЭФИР',
      systemReady: 'Жүйе дайын',
      awaiting: 'Режиссердің пәрменін күтуде',
      placeholder: 'Пәрмен енгізіңіз...',
      generating: 'САХНА ЖАСАЛУДА...',
      roleUser: 'РЕЖИССЕР (СІЗ)',
      roleAi: 'AI АССИСТЕНТ',
      prompts: ['Мүшелік туралы', 'Ағымдағы жобалар', 'Байланыс']
    }
  },
  EN: {
    nav: {
      about: 'About',
      activities: 'Activities',
      info: 'Useful Info',
      projects: 'Projects',
      news: 'News',
      residents: 'Residents',
      contacts: 'Contacts',
      gallery: 'Gallery',
      opinion: 'Opinion',
      logout: 'Logout',
    },
    hero: {
      badge: 'LCK.KZ',
      title: {
        top: 'League of',
        highlight: 'Cinematographers',
        bottom: 'of Kazakhstan',
      },
      description: 'An independent public organization aimed at facilitating the development of Kazakhstani cinema.',
      joinBtn: 'Join the League',
      applyBtn: 'Apply Now',
    },
    about: {
      title: {
        first: 'Who',
        highlight: 'Are We?',
      },
      description: 'We unite film industry professionals, promoting national cinema and creating conditions for its development.',
      cards: [
        {
          title: 'Creation Idea',
          quote: '«Young cinematographers lack cohesion...»',
          text: 'Inspired by uniting efforts with colleagues, Olzhas Askarov initiated the creation of an association that has already gathered over 120 participants to develop the industry together.',
        },
        {
          title: 'Mission',
          text: 'Facilitating the sustainable development of the country\'s film industry by unlocking the potential of young cinematographers, representing their rights and interests for the comprehensive development of national cinema.',
        },
        {
          title: 'Name (LCK)',
          text: 'For the convenience of international interaction, we use the abbreviation LCK (League of Cinematographers of Kazakhstan), which emphasizes our desire to develop Kazakhstani cinema in the global arena.',
        },
      ],
    },
    benefits: {
      title: {
        top: 'Become part of the League —',
        highlight: 'unlock new opportunities',
        bottom: 'for your career',
      },
      description: 'Are you a director, screenwriter, cameraman, or producer? The League of Cinematographers of Kazakhstan invites you to become part of the largest professional community.',
      list: [
        'Participate in master classes, festivals, and pitchings.',
        'Get legal assistance and advice on grants.',
        'Use the database of professional equipment and locations.',
      ],
      cta: 'Apply Now',
      cards: [
        { title: "Networking", desc: "With industry leaders" },
        { title: "Support", desc: "For industry specialists" },
        { title: "Career", desc: "In the film industry" },
        { title: "Resources", desc: "Access to relevant databases" },
      ]
    },
    leadingOrg: {
      title: {
        first: 'Leading',
        highlight: 'Public Organization',
      },
      mainDesc: 'Representing the interests of film industry professionals at national and international levels. The League unites directors, producers, screenwriters, and other specialists, forming a unified voice of the industry.',
      cards: [
        { title: 'Authority', text: 'The League is the main partner of the state in film development issues, cooperating with ministries and funds. We participate in the development of legislative initiatives.' },
        { title: 'Influence', text: 'The League organizes key events, such as national and international film festivals, promoting Kazakhstani culture.' },
        { title: 'Support', text: 'We protect the rights of cinematographers, provide legal support, and create conditions for industry growth, including training and grant programs.' },
      ]
    },
    activities: {
      badge: 'Scope of Activity',
      title: 'What We Do',
      items: [
        { title: 'Main Tasks', description: 'Organization of activities, development of cinema, support for young talents.' },
        { title: 'Strategy', description: 'Search and support for talents. Participation in the development of a roadmap for cinema development.' },
        { title: 'Important Steps', description: 'Improvement of legislation, building an ideological vector, protection of rights.' },
        { title: 'Our Functions', description: 'Collection and analysis of information, exchange of experience, and professional development of cinematographers.' },
        { title: 'Education', description: 'Organization of education, research of activities, popularization of cinema.' },
        { title: 'Assistance', description: 'Attracting financing from state and commercial structures. Solving industry problems.' },
        { title: 'Protection', description: 'Protection of legal rights of League members. Organization of a unified dialogue platform.' },
        { title: 'Financing', description: 'Support for cinema veterans. Search for investors. Cooperation with financial institutions.' },
        { title: 'System', description: 'Regulation of the cost of services, international cooperation, increasing competence.' },
      ]
    },
    usefulInfo: {
      title: {
        first: 'Useful',
        highlight: 'Information',
      },
      contracts: {
        title: 'Standard Contracts',
        desc: 'In this section, we have placed Standard Contracts for League residents. Download and use in your work.',
      },
      analytics: {
        title: 'Analytical Materials',
        desc: 'Current research, reports, and analytics on the state and development of the film industry in Kazakhstan.',
      }
    },
    stats: {
      marquee: 'INDUSTRY DEVELOPMENT • TALENT SUPPORT • COMMUNITY POWER • ',
      participants: 'participants',
      projects: 'projects',
      experience: 'years experience',
    },
    news: {
      title: {
        first: 'Latest',
        highlight: 'News',
      },
      desc: 'We keep you informed of the latest events in the life of Kazakhstani and world cinema.',
      moreBtn: 'More News',
      readBtn: 'Read',
      items: [
        { title: "Filmmakers from Belarus, Kazakhstan, and Russia are shooting the movie 'Postman of Victory' near Minsk" },
        { title: "Battle of formats Vertical VS Cinema: between trend and art" },
        { title: "The League of Cinematographers took an active part in the International Forum 'Culture. Media. Digital'" },
        { title: "Appeal to the Ministry of Culture and Information of the Republic of Kazakhstan" },
      ]
    },
    cta: {
      title: {
        first: 'Let\'s create',
        highlight: 'future cinema',
        last: 'together',
      },
      desc: 'There is nothing more effective than a community of people united by a common idea. Join today!',
      btn: 'Apply Now',
    },
    footer: {
      title: 'Feedback',
      desc: 'Have questions? Contact us, and we will answer shortly.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Message',
        submit: 'Send',
      },
      contacts: {
        title: 'Contacts',
        address: 'Kazakhstan, Almaty city',
      },
      menu: {
        title: 'Menu',
      },
      join: {
        title: 'Become a Member',
        desc: 'Enter your Email and we will send you an invitation',
      },
      copyright: 'Developed by',
    },
    chatbot: {
      title: 'Aperture — LCK AI Assistant',
      status: 'REC ● LIVE',
      systemReady: 'System Ready',
      awaiting: 'Awaiting Director\'s Command',
      placeholder: 'Enter command...',
      generating: 'GENERATING SCENE...',
      roleUser: 'DIRECTOR (YOU)',
      roleAi: 'AI ASSISTANT',
      prompts: ['About Membership', 'Current Projects', 'Contact Info']
    }
  }
};