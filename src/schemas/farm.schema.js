import Realm, {BSON} from 'realm';

export class Farm_Address extends Realm.Object {
  static schema = {
    name: 'farm_address',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm_Fertilizers extends Realm.Object {
  static schema = {
    name: 'farm_fertilizers',
    embedded: true,
    properties: {
      _id: 'objectId?',
      name: 'farm_fertilizers_name',
      tags: 'string[]',
      quantity: 'farm_fertilizers_quantity',
    },
  };
}

export class Farm_Fertilizers_Name extends Realm.Object {
  static schema = {
    name: 'farm_fertilizers_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm_Fertilizers_Quantity extends Realm.Object {
  static schema = {
    name: 'farm_fertilizers_quantity',
    embedded: true,
    properties: {
      mass: 'double?',
      volume: 'double?',
    },
  };
}

export class Farm_Foliars extends Realm.Object {
  static schema = {
    name: 'farm_foliars',
    embedded: true,
    properties: {
      _id: 'objectId?',
      name: 'farm_foliars_name',
      tags: 'string[]',
      quantity: 'farm_foliars_quantity',
    },
  };
}

export class Farm_Foliars_Name extends Realm.Object {
  static schema = {
    name: 'farm_foliars_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm_Foliars_Quantity extends Realm.Object {
  static schema = {
    name: 'farm_foliars_quantity',
    embedded: true,
    properties: {
      mass: 'double?',
      volume: 'double?',
    },
  };
}

export class Farm_Name extends Realm.Object {
  static schema = {
    name: 'farm_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm_Pesticides extends Realm.Object {
  static schema = {
    name: 'farm_pesticides',
    embedded: true,
    properties: {
      _id: 'objectId?',
      name: 'farm_pesticides_name',
      tags: 'string[]',
      quantity: 'farm_pesticides_quantity',
    },
  };
}

export class Farm_Pesticides_Name extends Realm.Object {
  static schema = {
    name: 'farm_pesticides_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm_Pesticides_Quantity extends Realm.Object {
  static schema = {
    name: 'farm_pesticides_quantity',
    embedded: true,
    properties: {
      mass: 'double?',
      volume: 'double?',
    },
  };
}

export class Farm_Fungicides extends Realm.Object {
  static schema = {
    name: 'farm_fungicides',
    embedded: true,
    properties: {
      _id: 'objectId?',
      name: 'farm_fungicides_name',
      tags: 'string[]',
      quantity: 'farm_fungicides_quantity',
    },
  };
}

export class Farm_Fungicides_Name extends Realm.Object {
  static schema = {
    name: 'farm_fungicides_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm_Fungicides_Quantity extends Realm.Object {
  static schema = {
    name: 'farm_fungicides_quantity',
    embedded: true,
    properties: {
      mass: 'double?',
      volume: 'double?',
    },
  };
}

export class Farm_Plants extends Realm.Object {
  static schema = {
    name: 'farm_plants',
    embedded: true,
    properties: {
      _id: 'objectId?',
      name: 'farm_plants_name',
      tags: 'string[]',
    },
  };
}

export class Farm_Plants_Name extends Realm.Object {
  static schema = {
    name: 'farm_plants_name',
    embedded: true,
    properties: {
      chs: 'string?',
      cht: 'string?',
      eng: 'string?',
    },
  };
}

export class Farm extends Realm.Object {
  static schema = {
    name: 'farms',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      __v: 'int?',
      activities: 'string[]',
      address: 'farm_address',
      fertilizers: 'farm_fertilizers[]',
      foliars: 'farm_foliars[]',
      fungicides: 'farm_fungicides[]',
      name: 'farm_name',
      pesticides: 'farm_pesticides[]',
      plants: 'farm_plants[]',
      tags: 'string[]',
      visibleTags: 'string[]',
    },
    primaryKey: '_id',
  };
}
