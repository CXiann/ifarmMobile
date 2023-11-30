import Realm, {BSON} from 'realm';

export class Task_FarmName extends Realm.Object {
  static schema = {
    name: 'task_farmName',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Creator_Name extends Realm.Object {
  static schema = {
    name: 'creator_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Assignee_Name extends Realm.Object {
  static schema = {
    name: 'assignee_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Task extends Realm.Object {
  static schema = {
    name: 'tasks',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      title: 'string?',
      farmId: 'string?',
      farmName: 'task_farmName',
      date: 'date',
      completed: 'bool',
      creatorId: 'string?',
      creatorName: 'creator_name',
      assigneeId: 'string?',
      assigneeName: 'assignee_name',
      createdAt: 'date?',
      __v: 'int?',
    },
    primaryKey: '_id',
  };
}
