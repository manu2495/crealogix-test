export class Species {
  name: string = '';
  skinColors: string = '';
  language: string = '';
  classification: string = '';
  averageLifespan: string = '';
  homeWorld: string = '';

  constructor(props?: any) {
    if (props) {
      this.name = props.name;
      this.skinColors = props.skin_colors;
      this.language = props.language;
      this.classification = props.classification;
      this.averageLifespan = props.average_lifespan;
      this.homeWorld = props.homeWorld;
    }
  }
}
