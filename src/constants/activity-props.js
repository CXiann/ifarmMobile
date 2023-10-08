export const Activity_Props = [
  {
    id: 0,
    action: 'Aerating',
    icon: 'shovel',
    bgColor: 'orange',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => !!v,
        width: '34%',
      },
      {
        id: 'field',
        name: 'Field Number*',
        type: 'field',
        props: {type: 'number'},
        validate: v => !!parseInt(v),
        width: '33%',
      },
      {
        id: 'row',
        name: 'Row Range*',
        type: 'number',
        validate: v => {
          if (parseInt(v) === 0) return false;
          return !!validateRange(v);
        },
        width: '33%',
      },
    ],
    standardUnit: '',
    units: [],
  },
  {
    id: 1,
    action: 'Sowing',
    icon: 'seed',
    bgColor: 'darkseagreen',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => !!v,
        width: '15%',
      },
      {
        id: 'item',
        name: 'Plant Name',
        type: 'autocomplete',
        options: 'plants',
        validate: v => !!v.eng || !!v.chs || !!v.cht,
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => v > 0,
        width: '10%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => !!v,
        units: [
          {id: '0', title: 'g'},
          {id: '1', title: 'kg'},
          {id: '2', title: 'mg'},
          {id: '3', title: 'pack (1kg)'},
          {id: '4', title: 'pack (500g)'},
          {id: '5', title: 'pieces'},
          {id: '6', title: 'tsp (5mℓ)'},
          {id: '7', title: 'tsp (15mℓ)'},
        ],
        width: '10%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '14%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '10%',
      },
      {
        id: 'convertQuantity',
        name: 'Average pieces per 1 kg',
        type: 'number',
        validate: v => {
          if (parseInt(v) === 0) return true; //average pieces per 1 kg 0 is valid
          return parseInt(v) > 0;
        },
        width: '16%',
      },
    ],
    standardUnit: 'pieces',
    units: [
      'g',
      'kg',
      'mg',
      'pack (1kg)',
      'pack (500g)',
      'pieces',
      'tsp (5mℓ)',
      'tsp (15mℓ)',
    ],
  },
  {
    id: 2,
    action: 'Fertilizer',
    icon: 'flower-pollen-outline',
    bgColor: 'gold',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '15%',
      },
      {
        id: 'item',
        name: 'Fertilizer Name',
        type: 'autocomplete',
        options: 'fertilizers',
        validate: v => {
          return !!v.eng || !!v.chs || !!v.cht;
        },
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => {
          return v > 0;
        },
        width: '12%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => {
          return !!v;
        },
        units: [
          {id: '0', title: 'g'},
          {id: '1', title: 'kg'},
          {id: '2', title: 'mg'},
          {id: '3', title: 'pack (1kg)'},
          {id: '4', title: 'pack (500g)'},
          {id: '5', title: 'mℓ'},
          {id: '6', title: 'ℓ'},
        ],
        width: '12%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '12%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '12%',
      },
      {
        id: 'price',
        name: 'Price(RM)',
        type: 'number',
        validate: v => {
          if (parseFloat(v) === 0) return true; //price 0 is valid
          return parseFloat(v) > 0;
        },
        width: '12%',
      },
    ],
    standardUnit: 'kg',
    units: ['g', 'kg', 'mg', 'pack (1kg)', 'pack (500g)', 'mℓ', 'ℓ'],
  },
  {
    id: 3,
    action: 'Pesticide',
    icon: 'bug',
    bgColor: 'dimgrey',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '15%',
      },
      {
        id: 'item',
        name: 'Pesticide Name',
        type: 'autocomplete',
        options: 'pesticides',
        validate: v => {
          return !!v.eng || !!v.chs || !!v.cht;
        },
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => {
          return v > 0;
        },
        width: '12%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => {
          return !!v;
        },
        units: [
          {id: '0', title: 'g'},
          {id: '1', title: 'kg'},
          {id: '2', title: 'mg'},
          {id: '3', title: 'pack (1kg)'},
          {id: '4', title: 'pack (500g)'},
          {id: '5', title: 'mℓ'},
          {id: '6', title: 'ℓ'},
        ],
        width: '12%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '12%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '12%',
      },
      {
        id: 'price',
        name: 'Price(RM)',
        type: 'number',
        validate: v => {
          if (parseFloat(v) === 0) return true; //price 0 is valid
          return parseFloat(v) > 0;
        },
        width: '12%',
      },
    ],
    standardUnit: 'ℓ',
    units: ['g', 'kg', 'mg', 'pack (1kg)', 'pack (500g)', 'mℓ', 'ℓ'],
  },
  {
    id: 4,
    action: 'Foliar',
    icon: 'leaf',
    bgColor: 'violet',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '15%',
      },
      {
        id: 'item',
        name: 'Foliar Name',
        type: 'autocomplete',
        options: 'foliars',
        validate: v => {
          return !!v.eng || !!v.chs || !!v.cht;
        },
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => {
          return v > 0;
        },
        width: '12%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => {
          return !!v;
        },
        units: [
          {id: '0', title: 'g'},
          {id: '1', title: 'kg'},
          {id: '2', title: 'mg'},
          {id: '3', title: 'pack (1kg)'},
          {id: '4', title: 'pack (500g)'},
          {id: '5', title: 'mℓ'},
          {id: '6', title: 'ℓ'},
        ],
        width: '12%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '12%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '12%',
      },
      {
        id: 'price',
        name: 'Price(RM)',
        type: 'number',
        validate: v => {
          if (parseFloat(v) === 0) return true; //price 0 is valid
          return parseFloat(v) > 0;
        },
        width: '12%',
      },
    ],
    standardUnit: 'ℓ',
    units: ['g', 'kg', 'mg', 'pack (1kg)', 'pack (500g)', 'mℓ', 'ℓ'],
  },
  {
    id: 5,
    action: 'Harvest',
    icon: 'sickle',
    bgColor: 'forestgreen',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '15%',
      },
      {
        id: 'item',
        name: 'Plant Name',
        type: 'autocomplete',
        options: 'plants',
        validate: v => {
          return !!v.eng || !!v.chs || !!v.cht;
        },
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => {
          return v > 0;
        },
        width: '10%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => {
          return !!v;
        },
        units: [
          {id: '0', title: 'g'},
          {id: '1', title: 'kg'},
          {id: '2', title: 'pieces'},
        ],
        width: '10%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '13%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '12%',
      },
      {
        id: 'convertQuantity',
        name: 'Average kg per 1 piece',
        type: 'number',
        validate: v => {
          return v > 0;
        },
        width: '15%',
      },
    ],
    standardUnit: 'kg',
    units: ['g', 'kg', 'pieces'],
  },
  {
    id: 6,
    action: 'Sales',
    icon: 'currency-usd',
    bgColor: 'red',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '15%',
      },
      {
        id: 'item',
        name: 'Plant Name',
        type: 'autocomplete',
        options: 'plants',
        validate: v => {
          return !!v.eng || !!v.chs || !!v.cht;
        },
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => {
          return v > 0;
        },
        width: '12%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => {
          return !!v;
        },
        units: [
          {id: '0', title: 'kg'},
          {id: '1', title: 'pack (1kg)'},
          {id: '2', title: 'pack (500g)'},
        ],
        width: '12%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '12%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '12%',
      },
      {
        id: 'price',
        name: 'Price(RM)',
        type: 'number',
        validate: v => {
          if (parseFloat(v) === 0) return true; //price 0 is valid
          return parseFloat(v) > 0;
        },
        width: '12%',
      },
    ],
    standardUnit: 'kg',
    units: ['kg', 'pack (1kg)', 'pack (500g)'],
  },
  {
    id: 7,
    action: 'Transplant',
    icon: 'swap-horizontal',
    bgColor: 'greenyellow',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '15%',
      },
      {
        id: 'item',
        name: 'Plant Name',
        type: 'autocomplete',
        options: 'plants',
        validate: v => {
          return !!v.eng || !!v.chs || !!v.cht;
        },
        width: '25%',
      },
      {
        id: 'quantity',
        name: 'Quantity',
        type: 'number',
        props: {type: 'number'},
        validate: v => {
          return v > 0;
        },
        width: '15%',
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'unit',
        validate: v => {
          return !!v;
        },
        units: [{id: '0', title: 'pieces'}],
        width: '15%',
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '15%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '15%',
      },
    ],
    standardUnit: 'pieces',
    units: ['pieces'],
  },
  {
    id: 8,
    action: 'Others',
    icon: 'unfold-more-vertical',
    bgColor: 'dodgerblue',
    fields: [
      {
        id: 'date',
        name: 'Date',
        type: 'date',
        validate: v => {
          return !!v;
        },
        width: '20%',
      },
      {
        id: 'remarks',
        name: 'Remarks',
        type: 'number',
        validate: v => {
          return !!v;
        },
        width: '40%',
        props: {fullWidth: true},
      },
      {
        id: 'field',
        name: 'Field Number',
        type: 'field',
        props: {type: 'number'},
        validate: v => {
          if (parseInt(v) === 0) return true; //field number 0 is valid
          return parseInt(v) > 0;
        },
        width: '20%',
      },
      {
        id: 'row',
        name: 'Row Range',
        type: 'number',
        validate: v => {
          return !!validateRange(v);
        },
        width: '20%',
      },
    ],
    standardUnit: '',
    units: [],
  },
  {
    id: 9,
    action: 'default',
    icon: 'file-image',
    bgColor: 'grey',
    fields: [],
  },
];
