import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Avatar, Text, IconButton, useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Activity_Props as actProps} from '../../constants/activity-props';

const ActivityScreenAddOptions = ({navigation, route}) => {
  const {colors} = useTheme();

  const handleActivityPressed = item => {
    navigation.navigate('Add Form', {action: item.action, color: item.bgColor});
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainer: {
      minWidth: '48%', // Adjust the width as needed to fit two cards in a row
      // margin: '1%',
    },
    topBar: {
      backgroundColor: colors.primaryContainer,
      maxHeight: '15%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'black',
    },
    actionList: {
      padding: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {route.params.action}
          </Text>
        </View>
      </View>
      <View style={styles.actionList}>
        <FlatList
          data={actProps.filter(actProp => actProp.action !== 'Add Inventory')}
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
              onPress={() => handleActivityPressed(item)}>
              <Card.Title
                title={item.action}
                titleStyle={{fontSize: 12}}
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
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityScreenAddOptions;
