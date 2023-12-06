import Realm, {BSON} from 'realm';

export class Fungicide_Name extends Realm.Object {
  static schema = {
    name: 'fungicides_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}
// Define your object model
export class Fungicide extends Realm.Object {
  static schema = {
    name: 'fungicides',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'fungicides_name',
      tags: 'string[]',
      unitType: 'string?',
      _v: 'int?',
    },
    primaryKey: '_id',
  };
}
