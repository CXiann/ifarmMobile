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
    name: 'activities',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      userId: 'string?',
      userName: 'activity_userName',
      farmId: 'string?',
      farmName: 'activity_farmName',
      row: 'int',
      field: 'int',
      quantity: 'double',
      price: 'double?',
      unit: 'string?',
      item: 'activity_item',
      action: 'string',
      remarks: 'string?',
      date: 'date',
      isActual: 'bool',
      originalQuantity: 'double?',
      originalUnit: 'string?',
      convertQuantity: 'double?',
      createdAt: 'date?',
      __v: 'int?',
    },
    primaryKey: '_id',
  };
}
