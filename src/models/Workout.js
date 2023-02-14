// abstract class
class Workout {
    #id;
    #distance;
    #duration;
    #coords;
    #date;

    constructor(id, distance, duration, coords, date) {
        this.#id = id;
        this.#distance = distance;
        this.#duration = duration;
        this.#coords = coords;
        this.#date = date;
    }
}

export default Workout;
