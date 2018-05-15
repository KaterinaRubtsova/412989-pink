ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [59.93863106417265,30.3230545],
          zoom: 17
      }, {
          searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/icon-map-marker.svg',
          // Размеры метки.
          iconImageSize: [30, 30],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [0, 0]
      });

  myMap.geoObjects
      .add(myPlacemark);
});
