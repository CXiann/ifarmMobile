import Realm, {BSON} from 'realm';

export class Plant_Name extends Realm.Object {
  static schema = {
    name: 'plants_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}
// Define your object model
export class Plant extends Realm.Object {
  static schema = {
    name: 'plants',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'plants_name',
      tags: 'string[]',
    },
    primaryKey: '_id',
  };
}
