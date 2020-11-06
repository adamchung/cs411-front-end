export class Futurama {
  synopsis: string;
  yearsAired: string;
  creators: Creators[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export interface Creators {
  name: string;
  url: string;
}
