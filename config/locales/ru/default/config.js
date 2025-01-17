module.exports = {
  "database": {
    "key": "FREE",
    "date": ""
  },
  "protocol": "http://",
  "subdomain": "",
  "domain": "example.com",
  "email": "support@example.com",
  "theme": "default",
  "country": "RU",
  "language": "ru",
  "random": 0,
  "homepage": "127.0.0.1",
  "geolite2": {
    "countries": [],
    "ips": []
  },
  "image": {
    "addr": "k.1poster.net",
    "size": 180,
    "proxy": 0
  },
  "cache": {
    "time": 3600,
    "addr": "127.0.0.1:11211"
  },
  "sphinx": {
    "addr": "127.0.0.1:9306"
  },
  "nginx": {
    "addr": "127.0.0.1:3000"
  },
  "pagespeed": 0,
  "loadavg": {
    "one": 480,
    "five": 360,
    "fifteen": 240,
    "message": "Сервер перегружен на <i>[percent]%</i> пожалуйста зайдите позже."
  },
  "publish": {
    "start": 400000,
    "stop": 1100000,
    "every" : {
      "hours": 1,
      "movies": 2
    },
    "text": 0,
    "required": [
      "title_ru",
      "poster"
    ],
    "thematic": {
      "type": "",
      "year": "",
      "genre": "",
      "country": "",
      "actor": "",
      "director": "",
      "query_id": "",
      "search": "",
      "kp_vote": 0,
      "imdb_vote": 0
    },
    "indexing": {
      "condition": ""
    }
  },
  "default": {
    "count": 15,
    "sorting": "kinopoisk-vote-up",
    "pages": 4,
    "lastpage": 0,
    "days": 0,
    "image": "/themes/default/public/desktop/img/player.png",
    "votes": {
      "kp": 5000,
      "imdb": 5000
    },
    "donotuse": ["actor","director","search"],
    "categories": {
      "countries": ["США","Россия","СССР","Индия","Франция","Япония","Великобритания","Испания","Италия","Канада"],
      "genres": ["аниме","биография","боевик","вестерн","военный","детектив","детский","документальный","драма","игра","история","комедия","концерт","короткометражка","криминал","мелодрама","музыка","мультфильм","мюзикл","новости","приключения","реальное ТВ","семейный","спорт","ток-шоу","триллер","ужасы","фантастика","фильм-нуар","фэнтези","церемония"],
      "years": ["2019","2018","2017","2016","2015","2014","2013","2012","2011","2010"]
    },
    "types": {
      "movie": "!мультфильм !аниме !короткометражка !шоу !новости !реальное !церемония !концерт !детский !документальный",
      "serial": "!аниме !короткометражка",
      "mult": "мультфильм | детский !аниме !короткометражка",
      "multserial": "мультфильм | детский !аниме !короткометражка",
      "anime": "аниме",
      "tv": "шоу | новости | реальное | церемония | концерт"
    },
    "moment": "DD MMM YYYY",
    "loc": 2000,
    "tag": 2000
  },
  "codes": {
    "head": "",
    "footer": "",
    "robots": "User-agent: *\nDisallow: /\nDisallow: /type/*/*\nDisallow: /type-*/*\nDisallow: /movie/*/*\nDisallow: /movie-*/*\nDisallow: /year/*/*\nDisallow: /year-*/*\nDisallow: /genre/*/*\nDisallow: /genre-*/*\nDisallow: /country/*/*\nDisallow: /country-*/*\nDisallow: /director/*/*\nDisallow: /director-*/*\nDisallow: /actor/*/*\nDisallow: /actor-*/*\nDisallow: /search\nDisallow: /*?sorting*\nDisallow: /*?tag*\nDisallow: /*?q*\nDisallow: /*?random*\nDisallow: /*?PageSpeed*\nDisallow: /*?desktop*\nDisallow: /iframe\nDisallow: /noindex\nDisallow: /admin*"
  },
  "index": {
    "type": {
      "name": "Лучшие [type]",
      "keys": "",
      "sorting": "kinopoisk-rating-up",
      "count": 15,
      "order": 2
    },
    "year": {
      "name": "Фильмы [year] года",
      "keys": "2019",
      "sorting": "premiere-up",
      "count": 15,
      "order": 3
    },
    "genre": {
      "name": "Фильмы в жанре [genre]",
      "keys": "",
      "sorting": "imdb-vote-up",
      "count": 10,
      "order": 4
    },
    "country": {
      "name": "Фильмы из страны [country]",
      "keys": "",
      "sorting": "imdb-rating-up",
      "count": 10,
      "order": 5
    },
    "actor": {
      "name": "Лучшие фильмы [actor]",
      "keys": "",
      "sorting": "kinopoisk-vote-up",
      "count": 10,
      "order": 6
    },
    "director": {
      "name": "Лучшие фильмы [director]",
      "keys": "",
      "sorting": "kinopoisk-vote-up",
      "count": 10,
      "order": 7
    },
    "ids": {
      "name": "Новые фильмы",
      "keys": "",
      "count": 10,
      "order": 1
    },
    "count": {
      "type": "year",
      "key": "2019",
      "sorting": "premiere-up"
    },
    "link": 0
  },
  "titles": {
    "index": "Легальный каталог фильмов",
    "year" : "Фильмы [year] года [sorting] [page]",
    "years" : "Фильмы по годам",
    "genre": "Фильмы в жанре [genre] [sorting] [page]",
    "genres" : "Фильмы по жанрам",
    "country": "Фильмы из страны [country] [sorting] [page]",
    "countries": "Фильмы по странам",
    "actor": "Фильмы с участием [actor] [sorting] [page]",
    "actors": "Самые популярные актеры",
    "director": "Фильмы которые срежиссировал [director] [sorting] [page]",
    "directors": "Самые популярные режиссеры",
    "type": "[type] [sorting] [page]",
    "search": "Поиск фильма «[search]» [sorting] [page]",
    "num": "на странице [num]",
    "movie": {
      "movie": "[title]",
      "online": "[title] онлайн",
      "download": "[title] скачать",
      "trailer": "[title] трейлер",
      "picture": "[title] кадры"
    },
    "sorting": {
      "kinopoisk-rating-up": "отсортировано по рейтингу КиноПоиска",
      "kinopoisk-rating-down": "отсортировано по рейтингу КиноПоиска",
      "imdb-rating-up": "отсортировано по рейтингу IMDb",
      "imdb-rating-down": "отсортировано по рейтингу IMDb",
      "kinopoisk-vote-up": "отсортировано по популярности на КиноПоиске",
      "kinopoisk-vote-down": "отсортировано по популярности на КиноПоиске",
      "imdb-vote-up": "отсортировано по популярности на IMDb",
      "imdb-vote-down": "отсортировано по популярности на IMDb",
      "year-up": "отсортировано по году",
      "year-down": "отсортировано по году",
      "premiere-up": "отсортировано по дате премьеры",
      "premiere-down": "отсортировано по дате премьеры"
    }
  },
  "h1": {
    "index": "Все фильмы в мире",
    "year" : "Фильмы [year] года [sorting] [page]",
    "years" : "Фильмы по годам",
    "genre": "Фильмы в жанре [genre] [sorting] [page]",
    "genres" : "Фильмы по жанрам",
    "country": "Фильмы из страны [country] [sorting] [page]",
    "countries": "Фильмы по странам",
    "actor": "Фильмы с участием [actor] [sorting] [page]",
    "actors": "Самые популярные актеры",
    "director": "Фильмы которые срежиссировал [director] [sorting] [page]",
    "directors": "Самые популярные режиссеры",
    "type": "[type] [sorting] [page]",
    "search": "Поиск фильма «[search]» [sorting] [page]",
    "num": "на странице [num]",
    "movie": {
      "movie": "[title]",
      "online": "[title] [year] онлайн",
      "download": "[title] [year] скачать",
      "trailer": "[title] [year] трейлер",
      "picture": "[title] [year] кадры"
    },
    "sorting": {
      "kinopoisk-rating-up": "отсортировано по рейтингу КиноПоиска",
      "kinopoisk-rating-down": "отсортировано по рейтингу КиноПоиска",
      "imdb-rating-up": "отсортировано по рейтингу IMDb",
      "imdb-rating-down": "отсортировано по рейтингу IMDb",
      "kinopoisk-vote-up": "отсортировано по популярности на КиноПоиске",
      "kinopoisk-vote-down": "отсортировано по популярности на КиноПоиске",
      "imdb-vote-up": "отсортировано по популярности на IMDb",
      "imdb-vote-down": "отсортировано по популярности на IMDb",
      "year-up": "отсортировано по году",
      "year-down": "отсортировано по году",
      "premiere-up": "отсортировано по дате премьеры",
      "premiere-down": "отсортировано по дате премьеры"
    }
  },
  "descriptions": {
    "index": "Сколько фильмов Вам удалось посмотреть на данный момент? Вероятней всего, довольно много, несколько сотен, а может и тысяч, если Вы заядлый киноман и не представляете себе вечер, без просмотра одного или нескольких кинолент. Либо Вы возможно очень любите сериалы и вечера проводите за просмотром нескольких серий увлекательного сериала. Как бы там ни было, Мы очень рады что Вы выбрали Наш сайт, как площадку для обсуждения и дискуссий с такими же кинолюбителями, как и Вы. Усаживайтесь поудобней, заварите чаю и да начнётся <span style='text-decoration:line-through'>срач</span> критика :)",
    "year" : "Фильмы [year] года",
    "years" : "Фильмы по годам",
    "genre": "Фильмы в жанре [genre]",
    "genres" : "Фильмы по жанрам",
    "country": "Фильмы из страны [country]",
    "countries": "Фильмы по странам",
    "actor": "Фильмы с участием [actor]",
    "actors": "Самые популярные актеры",
    "director": "Фильмы которые срежиссировал [director]",
    "directors": "Самые популярные режиссеры",
    "type": "[type]",
    "search" : "Поиск фильма «[search]»",
    "movie": {
      "movie": "Картина «[title]» была выпущена в [year] году и сразу завоевала внимание зрителей в разных [уголках Земли|частях планеты]. Киноленты из жанра [genre] всегда пользовались особой популярностью, к тому же, когда их снимают такие именитые режиссеры, как [director]. Страна, которая приложила руку к этому кинопроизведению считается [country], потому зрители уже могут приблизительно представить уровень [красочности|логики|картинки|искусства] по аналогичным творениям.",
      "online": "[title] онлайн",
      "download": "[title] скачать",
      "trailer": "[title] трейлер",
      "picture": "[title] кадры"
    }
  },
  "sorting": {
    "kinopoisk-rating-up": "По рейтингу КП ⬆",
    "kinopoisk-rating-down": "По рейтингу КП ⬇",
    "imdb-rating-up": "По рейтингу IMDb ⬆",
    "imdb-rating-down": "По рейтингу IMDb ⬇",
    "kinopoisk-vote-up": "По популярности КП ⬆",
    "kinopoisk-vote-down": "По популярности КП ⬇",
    "imdb-vote-up": "По популярности IMDb ⬆",
    "imdb-vote-down": "По популярности IMDb ⬇",
    "year-up": "По году ⬆",
    "year-down": "По году ⬇",
    "premiere-up": "По дате премьеры ⬆",
    "premiere-down": "По дате премьеры ⬇"
  },
  "urls": {
    "prefix_id": "id",
    "unique_id": 0,
    "separator": "-",
    "translit": 0,
    "movie_url": "[prefix_id][separator][title]",
    "movie": "movie",
    "year" : "year",
    "genre": "genre",
    "country": "country",
    "actor": "actor",
    "director": "director",
    "type": "type",
    "search" : "search",
    "sitemap" : "sitemap",
    "admin": "admin-secret",
    "types": {
      "serial": "сериалы",
      "movie": "фильмы",
      "mult": "мультфильмы",
      "multserial": "мультсериалы",
      "tv": "передачи",
      "anime": "аниме"
    },
    "movies": {
      "online": "",
      "download": "",
      "trailer": "",
      "picture": ""
    },
    "noindex": "",
    "slash": "/"
  },
  "l": {
    "more": "Подробнее",
    "home": "Главная",
    "information": "Информация",
    "online": "Онлайн",
    "download": "Скачать",
    "trailer": "Трейлер",
    "picture": "Кадры",
    "episode": "Серия",
    "movies": "Фильмы",
    "series": "Сериалы",
    "cartoons": "Мультфильмы",
    "animated": "Мультсериалы",
    "tv": "ТВ",
    "anime": "Аниме",
    "collection": "Коллекция",
    "collections": "Коллекции",
    "season": "Сезон",
    "year": "Год",
    "years": "Годы",
    "genre": "Жанр",
    "genres": "Жанры",
    "actor": "Актер",
    "actors": "Актеры",
    "director": "Режиссер",
    "directors": "Режиссеры",
    "country": "Страна",
    "countries": "Страны",
    "quality": "Качество",
    "translate": "Перевод",
    "premiere": "Премьера",
    "rating": "Рейтинг",
    "kp": "КиноПоиск",
    "imdb": "IMDb",
    "episodes": "серии",
    "storyline": "Описание",
    "later": "Досмотреть позже",
    "continue": "Продолжить",
    "saved": "Сохранено",
    "allCategories": "Все категории",
    "allYears": "Все годы",
    "allGenres": "Все жанры",
    "allCountries": "Все страны",
    "allActors": "Все актеры",
    "allDirectors": "Все режиссеры",
    "watched": "Вы недавно смотрели",
    "search": "Поиск",
    "share": "Поделиться",
    "subscribe": "Подписаться",
    "vk": "ВКонтакте",
    "facebook": "facebook",
    "twitter": "Twitter",
    "google": "Google",
    "telegram": "Telegram",
    "youtube": "YouTube",
    "instagram": "Instagram",
    "up": "Вверх",
    "soon": "Скоро выйдут",
    "contacts": "Контакты",
    "news": "Новости",
    "menu": "Меню",
    "comments": "Комментарии",
    "movieTitle": "Название фильма",
    "votes": "голосов",
    "hide": "Скрыть",
    "navigation": "Навигация",
    "and": "и",
    "overall": "Общий",
    "premieres": "Премьеры",
    "popular": "Популярные",
    "top": "Топ",
    "sorting": "Сортировка",
    "tags": "Теги",
    "mentions": "Упоминания",
    "said": "сказал(а)",
    "full": "Полная версия",
    "original": "Оригинал",
    "notFound": "Данной страницы нет на сайте. Возможно Вы ошиблись в URL или это внутренняя ошибка сайта, о которой администратор уже знает и предпринимает действия для её устранения.",
    "notMobile": "Мобильная версия сайта не активирована. Сайт адаптируется под экран и одинаково прекрасно отображается, как на больших экранах, так и на мобильных устройствах под управлением iOS, Android или WindowsPhone.",
    "notTv": "ТВ версия сайта не активирована.",
    "lucky": "Мне повезет!",
    "random": "Случайный фильм из категории",
    "results": "Все результаты"
  }
};