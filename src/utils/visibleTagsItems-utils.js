export const getVisibleTagsItems = (selectedFarmAllProps, options) => {
  const allSelectedActionItems = [...selectedFarmAllProps[0][options]] || [];
  console.log(
    'Current Farm Selected Item Props length: ',
    allSelectedActionItems.length,
  );
  const allVisibleTags = [...selectedFarmAllProps[0]['visibleTags']] || [];
  // console.log('Current Farm Visible Tags: ', allVisibleTags);
  const visibleTagsOptions = allSelectedActionItems
    .filter(item => item['tags'].some(tag => allVisibleTags.includes(tag)))
    .sort((a, b) => {
      const nameA = a['name']['eng'];
      const nameB = b['name']['eng'];
      // Compare the names
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  return visibleTagsOptions;
};
