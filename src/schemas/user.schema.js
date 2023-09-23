import Realm from 'realm';

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
    name: 'user',
    properties: {
      _id: 'objectId',
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
