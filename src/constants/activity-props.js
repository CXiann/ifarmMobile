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
        type: 'row',
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
  },
  {
    id: 2,
    action: 'Fertilizer',
    icon: 'flower-pollen-outline',
    bgColor: 'gold',
  },
  {
    id: 3,
    action: 'Pesticide',
    icon: 'bug',
    bgColor: 'dimgrey',
  },
  {
    id: 4,
    action: 'Foliar',
    icon: 'leaf',
    bgColor: 'violet',
  },
  {
    id: 5,
    action: 'Harvest',
    icon: 'sickle',
    bgColor: 'forestgreen',
  },
  {
    id: 6,
    action: 'Sales',
    icon: 'currency-usd',
    bgColor: 'red',
  },
  {
    id: 7,
    action: 'Transplant',
    icon: 'swap-horizontal',
    bgColor: 'greenyellow',
  },
  {
    id: 8,
    action: 'Others',
    icon: 'unfold-more-vertical',
    bgColor: 'dodgerblue',
  },
  {
    id: 9,
    action: 'default',
    icon: 'file-image',
    bgColor: 'grey',
  },
];
