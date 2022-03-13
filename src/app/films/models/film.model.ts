export class Film {
  director: string = '';
  episodeId: number = 0;
  producer: string = '';
  releaseDate: string = '';
  title: string = '';
  openingCrawl: string = '';

  constructor(props?: any) {
    if (props) {
      this.director = props.director;
      this.episodeId = props.episode_id;
      this.producer = props.producer;
      this.releaseDate = props.release_date;
      this.title = props.title;
      this.openingCrawl = props.opening_crawl;
    }
  }
}
