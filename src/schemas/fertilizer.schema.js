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
// Define your object model
export class Fertilizer extends Realm.Object {
  static schema = {
    name: 'fertilizers',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'fertilizers_name',
      tags: 'string[]',
    },
    primaryKey: '_id',
  };
}
