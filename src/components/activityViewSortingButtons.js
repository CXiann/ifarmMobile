import React from 'react';
import {StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';

const ActivityViewSortingButtons = ({
  selectedValue,
  setSelectedValue,
  props,
}) => {
  const styles = StyleSheet.create({
    segmentedButtonsContainer: {
      paddingVertical: 5,
      elevation: 10,
    },
  });
  const buttonList = [];
  for (let i = 0; i < props.length; i = i + 3) {
    buttonList.push(
      <SegmentedButtons
        key={i}
        multiSelect
        density="small"
        value={selectedValue}
        onValueChange={setSelectedValue}
        style={styles.segmentedButtonsContainer}
        buttons={props
          .filter((item, index) => index >= i && index <= i + 2)
          .map(prop => {
            const newObj = {
              icon: '',
              value: '',
              label: '',
              style: {borderWidth: 0.5},
            };
            newObj['icon'] = prop.icon;
            newObj['value'] = prop.action;
            newObj['label'] = prop.action;
            return newObj;
          })}
      />,
    );
  }
  return <>{buttonList}</>;
};

export default ActivityViewSortingButtons;
