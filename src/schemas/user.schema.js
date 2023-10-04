import Realm, {BSON} from 'realm';

export class User_Name extends Realm.Object {
  static schema = {
    name: 'user_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class User extends Realm.Object {
  static schema = {
    name: 'users',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      __v: 'int?',
      accountStatus: 'string',
      currentHashedRefreshToken: 'string?',
      email: 'string',
      farms: 'objectId[]',
      name: 'user_name',
      password: 'string',
      phoneNumber: 'string',
      role: 'string',
    },
    primaryKey: '_id',
  };
}
