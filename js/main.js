const menuMob = document.querySelector('.nav__burger');
if (menuMob) {
    const menuBlock = document.querySelector('.nav__list');
    menuMob.addEventListener("click", function (e) {
        menuBlock.classList.toggle('nav__list--active');
    })
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // loop: true,
    // slidesPerView: 3,
    // slidesPerGroup: 3,
    // spaceBetween: 70,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
            loop: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10

        },
        575: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40,
            loop: true
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40,
            loop: true
        },
        991: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
            loop: true
        },
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
            loop: true
        },
        1440: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
            loop: true
        },
        // when window width is >= 640px
        1600: {
            loop: true,
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 70
        }
    }
});

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.754698, 37.637833],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 17,
        controls: ['zoomControl', 'fullscreenControl']
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('zoomControl');

    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин ломаной.
        [55.754133, 37.634924],
        [55.753828, 37.635194],
        [55.754241, 37.636880],
        [55.754743, 37.636179],
        [55.754860, 37.636466],
        [55.754736, 37.636690],
        [55.755037, 37.637196]
    ], {
        // Описываем свойства геообъекта.
        // Содержимое балуна.
        balloonContent: "Как пройти..."
    }, {
        // Задаем опции геообъекта.
        // Отключаем кнопку закрытия балуна.
        balloonCloseButton: false,
        // Цвет линии.
        strokeColor: "#0000ed",
        // Ширина линии.
        strokeWidth: 3,
        // Коэффициент прозрачности.
        strokeOpacity: 0.7
    });

    myMap.geoObjects
        .add(myPolyline);

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

        myPlacemarkWithContent = new ymaps.Placemark([55.755037, 37.637196], {
            hintContent: 'АДРЕС: 101000, Москва,<br> Большой Спасоглинищевский переулок, <br> дом 9/1, стр. 10, 2 этаж, офис 15. <br> В 3-х минутах от м. Китай-Город! <br> +7 (495) 585-10-67',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: './img/map/metka.png',
            // Размеры метки.
            iconImageSize: [160, 122],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-90, -110],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPolyline)
        .add(myPlacemarkWithContent);
}