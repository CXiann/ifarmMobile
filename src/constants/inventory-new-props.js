export const Inventory_Props = [
  {
    id: 'name',
    name: 'Item Name',
    type: 'text',
    validate: (v, action) => {
      if (v == '') {
        return false;
      }
      console.log(
        'test: ',
        !action.some(e => {
          console.log('e.name.eng: ', e.name.eng);
          return v && v == e.name.eng;
        }),
      );
      return !action.some(e => {
        return v && v == e.name.eng;
      });
    },
    width: '25%',
  },

  {
    id: 'originalUnit',
    name: 'Unit',
    type: 'unit',
    validate: v => {
      return !!v;
    },
    units: [
      {id: '0', title: 'kg'},
      {id: '1', title: 'ℓ'},
    ],
    width: '12%',
  },
];
