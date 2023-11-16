import Realm, {BSON} from 'realm';

export class Fertilizer_Name extends Realm.Object {
  static schema = {
    name: 'fertilizers_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}
export class Fertilizer_Quantity extends Realm.Object {
  static schema = {
    name: 'fertilizers_quantity',
    embedded: true,
    properties: {
      volume: 'double?',
      mass: 'double?',
    },
  };
}
// Define your object model
export class Fertilizer extends Realm.Object {
  static schema = {
    name: 'fertilizers',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'fertilizers_name',
      tags: 'string[]',
      unitType: 'string?',
      quantity: 'fertilizers_quantity',
      _v: 'int?',
    },
    primaryKey: '_id',
  };
}
