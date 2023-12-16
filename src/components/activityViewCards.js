import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Avatar, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const ActivityViewCards = ({item, actProps}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    card: {
      marginVertical: 5,
      minWidth: '100%',
      backgroundColor: colors.secondaryContainer,
    },
    cardTitle: {
      fontWeight: 'bold',
    },
    cardSubtitle: {
      color: colors.primary,
      fontWeight: 'bold',
      fontSize: 15,
    },
    cardBodyText: {
      fontSize: 20,
      color: 'dimgray',
      marginBottom: '2%',
    },
    cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardBottomText: {
      color: 'red',
      fontWeight: 'bold',
    },
  });

  const getActionFromActivityProp = action => {
    return action === 'Add Inventory'
      ? 'inbox-full'
      : actProps.find(item => item.action == action).icon;
  };

  const getBgColorFromActivityProp = action => {
    return action === 'Add Inventory'
      ? 'wheat'
      : actProps.find(item => item.action == action).bgColor;
  };

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Title
        title={item?.action}
        titleStyle={styles.cardTitle}
        subtitle={item?.item.eng}
        subtitleStyle={styles.cardSubtitle}
        left={props => (
          <Avatar.Icon
            {...props}
            icon={getActionFromActivityProp(item.action)}
            style={{
              backgroundColor: getBgColorFromActivityProp(item.action),
              elevation: 3,
            }}
          />
        )}
      />
      <Card.Content>
        {item?.remarks && (
          <Text variant="bodyLarge" style={styles.cardBodyText}>
            {item.remarks}
          </Text>
        )}
        {item?.originalUnit && (
          <Text variant="bodyLarge" style={styles.cardBodyText}>
            {item.originalQuantity + ' ' + item.originalUnit}
            <Text
              variant="bodyLarge"
              style={{
                fontSize: 20,
                color: colors.tertiary,
              }}>
              {' (Std. unit: ' + item.quantity + ' ' + item.unit + ')'}
            </Text>
          </Text>
        )}
        {item?.price != 0 && (
          <Text
            variant="titleMedium"
            style={{
              ...styles.cardBodyText,
              fontWeight: 'bold',
            }}>
            {'RM ' + item.price}
          </Text>
        )}
        <SafeAreaView style={styles.cardBottom}>
          {item?.field != 0 || item?.row != 0 ? (
            <Text variant="bodyLarge" style={styles.cardBottomText}>
              {'F' + item.field + ' R' + item.row}
            </Text>
          ) : (
            <Text variant="bodyLarge" style={styles.cardBottomText}>
              {'N/A'}
            </Text>
          )}
          <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
            {item?.date.toLocaleDateString()}
          </Text>
        </SafeAreaView>
      </Card.Content>
    </Card>
  );
};
function arePropsEqual(prevProps, nextProps) {
  return prevProps.id === nextProps.id;
}
export default memo(ActivityViewCards, arePropsEqual);
