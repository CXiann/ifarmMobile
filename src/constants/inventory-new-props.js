export const Inventory_Props = [
  {
    id: 'name',
    name: 'Item Name',
    type: 'text',
    validate: v => {
      return !!v;
    },
    width: '25%',
  },

  {
    id: 'unitType',
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
];
