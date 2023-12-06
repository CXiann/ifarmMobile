import Realm, {BSON} from 'realm';

export class Pesticide_Name extends Realm.Object {
  static schema = {
    name: 'pesticides_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}
// Define your object model
export class Pesticide extends Realm.Object {
  static schema = {
    name: 'pesticides',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'pesticides_name',
      tags: 'string[]',
      unitType: 'string?',
      _v: 'int?',
    },
    primaryKey: '_id',
  };
}
