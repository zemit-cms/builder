import Hash from '@/utils/hash';

interface IModel {
  id: string
}

export default class Model<P = IModel> {

  public id = Hash.guid()

  constructor(data?: IModel) {
    this.assign(data);
  }

  get data(): any {
    return {
      id: this.id
    };
  }

  assign(data?: IModel): void {
    Object.assign(this, data || {});
  }

  clone(resetId = true): Model<P> {
    // @ts-ignore
    const clone = new this.constructor<P>(JSON.parse(JSON.stringify(this.data)));
    if (resetId) {
      clone.id = Hash.guid();
    }
    return clone;
  }
}
