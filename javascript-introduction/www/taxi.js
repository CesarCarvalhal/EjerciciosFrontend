class Taxi {
  constructor(name, distance, numTravels) {
    this.name = name;
    this.distance = distance;
    this.numTravels = numTravels;
  }

  moneyMade() {
    return this.distance * 0.13 + this.numTravels * 3.71;
  }

}

export default Taxi;