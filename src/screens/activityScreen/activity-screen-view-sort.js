import Realm, {BSON} from 'realm';
import {Modal, Portal, Text, useTheme, Button} from 'react-native-paper';
import ActivityViewSortingButtons from '../../components/activityViewSortingButtons';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutocompleteItemSortInput from '../../components/autocompleteItemSortInput';
import {Item_Props as itemProps} from '../../constants/item-props';

const ActivityScreenViewSort = ({
  visible,
  showModal,
  dataForm,
  setDataForm,
  actProps,
}) => {
  const initialButtonValues = actProps.map(prop => {
    return prop.action;
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={showModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          // height: 500,
        }}
        style={{flex: 1}}>
        <SafeAreaView>
          <Text variant="titleLarge" style={{marginBottom: 20}}>
            Filtering Options
          </Text>

          {itemProps.map((prop, index) => {
            return (
              <AutocompleteItemSortInput
                dataForm={dataForm}
                setDataForm={setDataForm}
                initialValue={true}
                label={prop.label}
                id={'_id'}
                title={'name'}
                options={prop.options}
                myKey={index}
              />
            );
          })}
          <ActivityViewSortingButtons
            dataForm={dataForm}
            setDataForm={setDataForm}
            props={actProps}
          />
          <SafeAreaView
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() =>
                setDataForm({
                  ...dataForm,
                  selectedValue: [],
                  plants: '',
                  fertilizers: '',
                  pesticides: '',
                  foliars: '',
                })
              }
              rippleColor={'white'}>
              Clear All Options
            </Button>
            <Button
              onPress={() =>
                setDataForm({...dataForm, selectedValue: initialButtonValues})
              }
              rippleColor={'white'}>
              Select All Options
            </Button>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default ActivityScreenViewSort;
