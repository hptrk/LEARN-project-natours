/* eslint-disable */

export const displayMap = (locationsData) => {
  const map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false,
  }).setView([-118.113491, 34.111745], 5);
  L.tileLayer(
    'https://tile.jawg.io/735c5d29-8b81-4d01-90a1-0ed205afe9fa/{z}/{x}/{y}{r}.png?access-token=CIkVU1QoyQGSOb5J7ePgQnFfwZJYvYv0iQlqCJ6Q7XmM6lvu4g6QbBGlHXV1RHpQ',
    {}
  ).addTo(map);
  map.attributionControl
    .addAttribution(
      '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
    )
    .addTo(map);

  const markerArray = [];
  locationsData.forEach((loc) => {
    const reversedArr = [...loc.coordinates].reverse();

    const myIcon = L.icon({
      iconUrl: '/img/pin.png',
      iconSize: [32, 40], // size of the icon
      iconAnchor: [16, 45], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
    });

    L.marker(reversedArr, { icon: myIcon })
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        className: 'mapPopup',
      })
      .openPopup()
      .on('mouseover', function (e) {
        this.closePopup();
      })
      .on('mouseout', function (e) {
        this.openPopup();
      });
    markerArray.push(reversedArr);
  });
  const bounds = L.latLngBounds(markerArray);
  map.fitBounds(bounds);
  map.scrollWheelZoom.disable();
};
