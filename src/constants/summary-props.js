import {validateRange} from '../utils/field-utils';

export const Summary_Props = [
  {
    id: 0,
    title: 'Aerating',
    action: ['Aerating'],
    icon: 'shovel',
    color: '#FFE4B5',
    type: 'bar',
  },
  {
    id: 1,
    title: 'Sowing',
    action: ['Sowing'],
    icon: 'seed',
    color: 'darkseagreen',
    type: 'stack',
  },
  {
    id: 2,
    title: 'Fertilizer Used',
    action: ['Fertilizer'],
    icon: 'flower-pollen-outline',
    color: 'lightblue',
    type: 'stack',
  },
  {
    id: 3,
    title: 'Pesticide Used',
    action: ['Pesticide'],
    icon: 'bug',
    color: 'lavender',
    type: 'stack',
  },
  {
    id: 4,
    title: 'Foliar Used',
    action: ['Foliar'],
    icon: 'leaf',
    color: '#FFB6C1',
    type: 'stack',
  },
  {
    id: 5,
    title: 'Fungicide Used',
    action: ['Fungicide'],
    icon: 'mushroom',
    color: '#FFA07A',
    type: 'stack',
  },
  {
    id: 6,
    title: 'Harvest',
    action: ['Harvest'],
    icon: 'sickle',
    color: 'mintgreen',
    type: 'stack',
  },

  {
    id: 7,
    title: 'Transplant',
    action: ['Transplant'],
    icon: 'swap-horizontal',
    color: 'greenyellow',
    type: 'stack',
  },
  {
    id: 8,
    title: 'Others',
    action: ['Others'],
    icon: 'unfold-more-vertical',
    color: 'dodgerblue',
    type: 'bar',
  },
  {
    id: 9,
    title: 'Total Sales',
    action: ['Sales'],
    icon: 'currency-usd',
    color: '#FFFACD',
    type: 'stack',
  },
  {
    id: 10,
    title: 'Total Expenses',
    action: ['Pesticide', 'Fertilizer', 'Foliar', 'Fungicide'],
    icon: 'currency-usd',
    color: '#E6A8D7',
    type: 'line',
  },
  {
    id: '11',
    title: 'Profit/Loss',
    action: 'calculate',
    color: 'lightgray',
    type: 'normal',
  },
];
