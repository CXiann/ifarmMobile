import React from 'react';
import {StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';

const ActivityViewSortingButtons = ({dataForm, setDataForm, props}) => {
  const styles = StyleSheet.create({
    segmentedButtonsContainer: {
      paddingVertical: 5,
    },
  });
  const buttonList = [];
  for (let i = 0; i < props.length; i = i + 2) {
    buttonList.push(
      <SegmentedButtons
        key={i}
        multiSelect
        density="small"
        value={dataForm['selectedValue']}
        onValueChange={value =>
          setDataForm({...dataForm, selectedValue: value})
        }
        style={styles.segmentedButtonsContainer}
        buttons={props
          .filter((item, index) => index >= i && index <= i + 1)
          .map(prop => {
            const newObj = {
              icon: '',
              value: '',
              label: '',
              style:
                i == props.length - 1 && i % 2 == 0 //odd number options
                  ? {
                      borderRightWidth: 1,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    }
                  : {},
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
