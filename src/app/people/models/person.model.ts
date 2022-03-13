export class Person {
  name: string = '';
  height: string = '';
  gender: string = '';
  birthYear: string = '';
  homeWorld: string = '';

  constructor(props?: any) {
    if (props) {
      let height = 'High';

      if (+props.height >= 100 && +props.height <= 200)
        height = 'Normal'
      else if (+props.height < 100)
        height = 'Small';

      this.name = props.name;
      this.height = height;
      this.gender = props.gender;
      this.birthYear = props.birth_year;
      this.homeWorld = props.homeWorld;
    }
  }
}
