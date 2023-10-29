class Vehicle {
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        console.log("Beep");
    }

    toString() {
        console.log(`The vehicle is a ${this.make} ${this.model} from ${this.year}.`);
    }
}

class Car extends Vehicle {
    constructor (make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
    
}

class Motorcycle extends Vehicle {
    constructor (make, model, year){
        super (make, model, year)
        this.numWheels = 2;
    }
    revEngine(){
        console.log("VROOOOM!");
    }
}

class Garage {
    constructor(num){
        this.vehicles = [];
        this.maxVehicles = num;
    }
    add(vehicle){
        if (!(vehicle instanceof Vehicle)){
            return "Only vehicles are allowed in here!";
        }
        if (this.vehicles.length >= this.maxVehicles){
                return "Sorry, we're full!";
        }
            this.vehicles.push(vehicle);
            return "Vehicle Added!";
    }
}