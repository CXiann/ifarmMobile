import Realm, {BSON} from 'realm';

export class Foliar_Name extends Realm.Object {
  static schema = {
    name: 'foliars_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}
// Define your object model
export class Foliar extends Realm.Object {
  static schema = {
    name: 'foliars',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'foliars_name',
      tags: 'string[]',
      unitType: 'string?',
      _v: 'int?',
    },
    primaryKey: '_id',
  };
}
