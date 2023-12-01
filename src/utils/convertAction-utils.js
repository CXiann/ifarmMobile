export const convertItemName = ori => {
  let items;
  switch (ori) {
    case 'Foliar':
      items = 'foliars';
      break;
    case 'Pesticide':
      items = 'pesticides';
      break;
    case 'Fungicide':
      items = 'fungicides';
      break;
    case 'Fertilizer':
      items = 'fertilizers';
      break;
    default:
      items = 'NotItem';
      break;
  }
  return items;
};
