import Workout from "./Workout";

class Running extends Workout {
    #cadence;
    #pace;

    constructor(cadence, pace) {
        this.#cadence = cadence;
        this.#pace = pace;
    }
}

export default Running;
