import Realm, {BSON} from 'realm';

export class Activity_FarmName extends Realm.Object {
  static schema = {
    name: 'activity_farmName',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Activity_Item extends Realm.Object {
  static schema = {
    name: 'activity_item',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Activity_UserName extends Realm.Object {
  static schema = {
    name: 'activity_userName',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Activity extends Realm.Object {
  static schema = {
    name: 'activity',
    properties: {
      _id: 'objectId?',
      __v: 'int?',
      action: 'string',
      convertQuantity: 'double?',
      createdAt: 'date?',
      date: 'date',
      farmId: 'string?',
      farmName: 'activity_farmName',
      field: 'int',
      isActual: 'bool',
      item: 'activity_item',
      originalQuantity: 'double?',
      originalUnit: 'string?',
      quantity: 'double',
      remarks: 'string?',
      row: 'int',
      unit: 'string?',
      userId: 'string?',
      userName: 'activity_userName',
    },
    primaryKey: '_id',
  };
}
