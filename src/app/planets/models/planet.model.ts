export class Planet {
  climate: string = '';
  diameter: string = '';
  name: string = '';
  population: string = '';
  terrain: string = '';

  constructor(props?: any) {
    if (props) {
      this.climate = props.climate;
      this.diameter = props.diameter;
      this.name = props.name;
      this.population = props.population;
      this.terrain = props.terrain;
    }
  }
}
