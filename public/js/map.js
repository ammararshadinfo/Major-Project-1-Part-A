mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates) //Listing.geometry.coordinates
  .setPopup(new mapboxgl.Popup({ offset: 25 }))
  .setHTML("<h1>Hello World!</h1>")
  .addTo(map);
