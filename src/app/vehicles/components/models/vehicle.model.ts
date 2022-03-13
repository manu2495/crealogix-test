export class Vehicle {
  name: string = '';
  crew: string = '';
  model: string = '';
  passengers: string = '';
  manufacturer: string = '';
  costInCredits: string = '';

  constructor(props?: any) {
    if (props) {
      this.name = props.name;
      this.crew = props.crew;
      this.model = props.model;
      this.passengers = props.passengers;
      this.manufacturer = props.manufacturer;
      this.costInCredits = props.cost_in_credits;
    }
  }
}
