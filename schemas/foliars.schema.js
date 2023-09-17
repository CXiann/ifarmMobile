import Realm, {BSON} from 'realm';

// Define your object model
export class Foliars extends Realm.Object {
  static schema = {
    name: 'Foliars',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'string',
      tags: 'string?[]',
    },
    primaryKey: '_id',
  };
}
