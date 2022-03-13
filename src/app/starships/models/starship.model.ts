export class Starship {
  name: string = '';
  model: string = '';
  starshipClass: string = '';
  length: string = '';
  MGLT: string = '';
  maxAtmospheringSpeed: string = '';

  constructor(props?: any) {
    if (props) {
      let length = 'Large';

      if (props.length < 1000 && props.length >= 100)
        length = 'Normal';
      else if (props.length < 100)
        length = 'Small';

      this.name = props.name;
      this.model = props.model;
      this.length = length;
      this.MGLT = props.MGLT;
      this.starshipClass = props.starship_class;
      this.maxAtmospheringSpeed = props.max_atmosphering_speed;
    }
  }
}
