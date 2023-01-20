"usescrict";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

const getCurrentPositionCallbackFailure = (position) => {
    alert("Couldn't get your position");
};

class App {
    #map; //private property
    #mapEvent; //private property

    constructor() {
        this._getPosition();
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener(
            "change",
            this._toggleElevationField.bind(this)
        );
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                getCurrentPositionCallbackFailure
            );
        }
    }

    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const mapsTemplate = `https://www.google.com.br/maps/@${latitude},${longitude}`;

        const coords = [latitude, longitude];
        this.#map = L.map("map").setView(coords, 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
        inputCadence
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
    }

    _newWorkout(event) {
        event.preventDefault();

        // Clear input fields
        inputDistance.value = "";
        inputCadence.value = "";
        inputDuration.value = "";
        inputElevation.value = "";

        const { lat, lng } = this.#mapEvent.latlng;
        let marker = L.marker([lat, lng])
            .addTo(this.#map)
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
    }
}

const app = new App();
