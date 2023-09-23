import Realm, {BSON} from 'realm';

// Define your object model
export class Foliar extends Realm.Object {
  static schema = {
    name: 'foliars',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'string',
      tags: 'string[]',
    },
    primaryKey: '_id',
  };
}
