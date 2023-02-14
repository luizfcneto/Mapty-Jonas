import Workout from "./Workout";

class Cycling extends Workout {
    #elevationGain;
    #speed;

    constructor(elevationGain, speed) {
        this.#elevationGain = elevationGain;
        this.#speed = speed;
    }
}

export default Cycling;
