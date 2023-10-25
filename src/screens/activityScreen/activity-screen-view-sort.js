import React from 'react';
import {Modal, Portal, Text} from 'react-native-paper';
import ActivityViewSortingButtons from '../../components/activityViewSortingButtons';
import {SafeAreaView} from 'react-native-safe-area-context';

const ActivityScreenViewSorting = ({
  visible,
  showModal,
  selectedValue,
  setSelectedValue,
  actProps,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={showModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
        }}
        style={{flex: 1}}>
        <SafeAreaView>
          <Text variant="titleLarge" style={{marginBottom: 20}}>
            Filtering Options
          </Text>
          <ActivityViewSortingButtons
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            props={actProps}
          />
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default ActivityScreenViewSorting;
