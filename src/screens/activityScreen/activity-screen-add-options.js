import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Activity_Props as actProps} from '../../constants/activity-props';

const ActivityScreenAddOptions = ({navigation, route}) => {
  const handleActivityPressed = action => {
    navigation.navigate('Add_Form', {action: action});
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={actProps.filter(item => item.action != 'default')}
        keyExtractor={item => item.id.toString()} // Replace 'id' with the unique identifier in your data
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
        renderItem={({item}) => (
          <Card
            mode="contained"
            style={styles.cardContainer}
            onPress={() => handleActivityPressed(item.action)}>
            <Card.Title
              title={item.action}
              //   subtitle={item?.item.eng}
              left={props => (
                <Avatar.Icon
                  {...props}
                  icon={item.icon}
                  style={{
                    backgroundColor: item.bgColor,
                  }}
                />
              )}
            />
            {/* <Card.Content>
              <Text variant="titleLarge">
                {item?.quantity + ' ' + item?.unit}
              </Text>
              <Text variant="bodyLarge">
                {'F' + item?.field + ' R' + item?.row}
              </Text>
            </Card.Content> */}
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default ActivityScreenAddOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    minWidth: '48%', // Adjust the width as needed to fit two cards in a row
    // margin: '1%',
  },
  card: {},
});
