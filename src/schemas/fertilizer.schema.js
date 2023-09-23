import Realm, {BSON} from 'realm';

// Define your object model
export class Fertilizer extends Realm.Object {
  static schema = {
    name: 'fertilizers',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      name: 'string',
      tags: 'string[]',
    },
    primaryKey: '_id',
  };
}
