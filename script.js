"usescrict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

const getCurrentPositionCallbackSuccess = (position) => {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const mapsTemplate = `https://www.google.com.br/maps/@${latitude},${longitude}`;
    console.log(mapsTemplate);

    const coords = [latitude, longitude];
    const map = L.map("map").setView(coords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.on("click", (event) => {
        const { lat } = event.latlng;
        const { lng } = event.latlng;
        console.log(lat, lng);
        let marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
                L.popup({
                    maxWidth: 100,
                    minWidth: 50,
                    autoClose: false,
                    className: "running-popup",
                })
            )
            .setPopupContent("<p> Opa World! </p>")
            .openPopup();
    });
};

const getCurrentPositionCallbackFailure = (position) => {
    alert("Couldn't get your position");
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        getCurrentPositionCallbackSuccess,
        getCurrentPositionCallbackFailure
    );
}
