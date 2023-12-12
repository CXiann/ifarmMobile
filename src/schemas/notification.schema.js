import Realm, {BSON} from 'realm';

export class Notification_FarmName extends Realm.Object {
  static schema = {
    name: 'notification_farmName',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Notification_UserName extends Realm.Object {
  static schema = {
    name: 'notification_userName',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Notification_AssigneeName extends Realm.Object {
  static schema = {
    name: 'notification_assigneeName',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Notification extends Realm.Object {
  static schema = {
    name: 'notifications',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      userId: 'string?',
      userName: 'notification_userName',
      farmId: 'string?',
      farmName: 'notification_farmName',
      assigneeId: 'string?',
      assigneeName: 'notification_assigneeName',
      content: 'string',
      createdAt: 'date',
      date: 'date',
      readUsers: 'string[]',
      category: 'string',
      __v: 'int?',
    },
    primaryKey: '_id',
  };
}
