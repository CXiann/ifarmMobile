export const getVisibleTagsItems = (selectedFarmAllProps, options) => {
  const allSelectedActionItems = selectedFarmAllProps[0][options] || [];
  console.log(
    'Current Farm Selected Item Props length: ',
    allSelectedActionItems.length,
  );
  const allVisibleTags = convertToArray(
    selectedFarmAllProps[0]['visibleTags'] || [],
  );

  const visibleTagsOptions = allSelectedActionItems
    .filtered('tags.@size > 0 AND ANY tags IN $0', allVisibleTags)
    .sorted([['name.eng', false]]);

  return visibleTagsOptions;
};

function convertToArray(realmObjectsArray) {
  let copyOfJsonArray = Array.from(realmObjectsArray);
  let jsonArray = JSON.parse(JSON.stringify(copyOfJsonArray));
  return jsonArray;
}
