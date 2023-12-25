import React, {useState, useEffect} from 'react';
import {BSON} from 'realm';
import {BarChart} from 'react-native-gifted-charts';
import {LineChart} from 'react-native-chart-kit';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';
import {getColor} from '../../utils/colorGenerator-utils';
import ActivityScreenChartDetails from './activity-screen-chart-details';

const ActivityScreenChartBar = ({option}) => {
  function getPastSixMonths() {
    const monthNames = [
      {id: 1, month: 'Jan'},
      {id: 2, month: 'Feb'},
      {id: 3, month: 'Mar'},
      {id: 4, month: 'Apr'},
      {id: 5, month: 'May'},
      {id: 6, month: 'Jun'},
      {id: 7, month: 'Jul'},
      {id: 8, month: 'Aug'},
      {id: 9, month: 'Sep'},
      {id: 10, month: 'Oct'},
      {id: 11, month: 'Nov'},
      {id: 12, month: 'Dec'},
    ];

    const currentDate = new Date();
    const pastSixMonths = [];

    for (let i = 5; i >= 0; i--) {
      const pastDate = new Date(currentDate);
      pastDate.setMonth(currentDate.getMonth() - i);
      const monthName = monthNames[pastDate.getMonth()];
      pastSixMonths.push(monthName);
    }

    return pastSixMonths;
  }

  const pastMonthsArray = getPastSixMonths();
  // console.log(pastMonthsArray);

  const queryAction = option.action;
  const {farmId} = useGlobal();
  const {useQuery} = realmContext;

  const allActivities = useQuery('activities');

  var barData = [];
  // var lineData = {
  //   labels: [],
  //   legends: [],
  //   datasets: [
  //     {data: [], color: (opacity = 1) => `#3498db`},
  //     {data: [], color: (opacity = 1) => `#e74c3c`},
  //     {data: [], color: (opacity = 1) => `#2ecc71`},
  //     {data: [], color: (opacity = 1) => `#f39c12`},
  //   ],
  // };

  var stackedData = [];
  const allData = allActivities.filtered(
    'farmId == $0 && action IN $1 && date >= $2 && date <= $3',
    farmId.toString(),
    queryAction,
    new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
    new Date(),
  );
  console.log('length: ', allData.length);
  switch (option.type) {
    case 'bar':
      // old
      barData = pastMonthsArray.map(month => {
        var total = 0;
        allData.map(act => {
          act.date.getMonth() + 1 == month.id ? (total += 1) : total;
        });
        return {value: total, label: month.month, color: 'skyblue'};
      });
      console.log('bar data: ', barData);

      break;

    // case 'line':
    //   pastMonthsArray.map(month => {
    //     queryAction.map((action, index) => {
    //       var price = 0;

    //       allData.map(act => {
    //         if (act.date.getMonth() + 1 == month.id && act.action == action) {
    //           price += act.price ?? 0;
    //         }
    //       });

    //       lineData.datasets[index].data.push(price);
    //     });
    //   });
    //   pastMonthsArray.map(month => {
    //     lineData.labels.push(month.month);
    //   });
    //   queryAction.map(action => {
    //     lineData.legends.push(action);
    //   });

    //   console.log('dataline: ', lineData);
    //   console.log('label: ', lineData.labels);
    //   console.log('data: ', lineData.datasets);
    //   console.log('color: ', lineData.datasets[0]);

    //   break;

    case 'stack':
      //old
      stackedData = pastMonthsArray.map(month => {
        const stacksArr = [];

        allData.map(act => {
          if (act.date.getMonth() + 1 == month.id) {
            const existingItemIndex = stacksArr.findIndex(
              item => item.name === act.item.eng,
            );

            if (existingItemIndex !== -1) {
              // If the item already exists, update its value by incrementing quantity
              stacksArr[existingItemIndex].value += act.quantity;
            } else {
              // If the item doesn't exist, add a new object to stacksArr
              stacksArr.push({
                value: act.quantity,
                name: act.item.eng,
                color: getColor()[0],
              });
            }
          }
        });
        stacksArr.length == 0 &&
          stacksArr.push({
            value: 0,
            name: '',
            color: getColor()[0],
          });
        return {stacks: stacksArr, label: month.month};
      });
      console.log('bar data2: ', stackedData);

      break;

    default:
      break;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: option.color,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      elevation: 8,
      minHeight: 700,
    },
    titleText: {
      margin: 5,
      marginBottom: 30,
      fontSize: 20,
      fontWeight: 'bold',
    },
    legendColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
  });

  const lineConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    propsForHorizontalLabels: {
      dx: -40, // Adjust this value to move the labels closer to the y-axis
      textAnchor: 'start', // Align text to the end of the label
      fontSize: 10,
    },
    propsForVerticalLabels: {
      fontWeight: 'bold', // Set the font weight to bold
      // fontSize: 12, // Adjust the font size as needed
    },
    propsForBackgroundLines: {
      x1: 50,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>{option.title}</Text>
      <SafeAreaView style={{flex: 1}}>
        {/* empty chart */}
        {allData.length == 0 && (
          <Text style={{color: 'red', marginVertical: 20, alignSelf: 'center'}}>
            No data available
          </Text>
        )}
        {/* total expenses*/}
        {/* {option.type == 'line' && (
          <LineChart
            yAxisLabel={option.unit + ' '}
            chartConfig={lineConfig}
            height={220}
            width={300}
            data={lineData}
            withVerticalLines={false}
          />
        )} */}
        {/* aerating, others */}
        {option.type == 'bar' && barData.length !== 0 && (
          <BarChart
            barWidth={25}
            barBorderRadius={4}
            frontColor="skyblue"
            // showGradient
            noOfSections={5}
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLength={20}
            xAxisLabelTextStyle={{color: 'black', fontWeight: 'bold'}}
            yAxisTextStyle={{color: 'black'}}
            isAnimated
          />
        )}
        {/* fertilizer, foliar, pesticide, fungicide, sowing, transplant, harvest, sales*/}
        {option.type == 'stack' && stackedData.length !== 0 && (
          <BarChart
            barWidth={25} // Increase the barWidth to make the bars wider
            barBorderRadius={2}
            // frontColor="skyblue"
            leftShiftForLastIndexTooltip={50}
            // showGradient
            // maxValue={Math.ceil(maxValue)}
            showFractionalValues
            roundToDigits={1}
            noOfSections={5}
            stackData={stackedData}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLength={20}
            xAxisLabelTextStyle={{color: 'black', fontWeight: 'bold'}}
            yAxisTextStyle={{color: 'black'}}
            isAnimated
          />
        )}
      </SafeAreaView>
      <ActivityScreenChartDetails
        // lineData={lineData}
        stackedData={stackedData}
        barData={barData}
        type={option.type}
        pastMonthsArray={pastMonthsArray}
        queryAction={queryAction}
      />
    </SafeAreaView>
  );
};

export default ActivityScreenChartBar;
