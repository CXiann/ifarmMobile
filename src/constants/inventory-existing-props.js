export const Inventory_Props = [
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
    name: 'Item Name',
    type: 'autocomplete',
    validate: v => {
      return !!v.eng;
    },
    width: '25%',
  },
  {
    id: 'originalQuantity',
    name: 'Quantity',
    type: 'number',
    props: {type: 'number'},
    validate: v => {
      return parseFloat(v) > 0;
    },
    width: '12%',
  },
  {
    id: 'originalUnit',
    name: 'Unit',
    type: 'unit',
    validate: v => {
      return !!v;
    },
    units: [
      {id: '0', title: 'g'},
      {id: '1', title: 'kg'},
      {id: '2', title: 'mg'},
      {id: '3', title: 'mℓ'},
      {id: '4', title: 'ℓ'},
    ],
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
];
