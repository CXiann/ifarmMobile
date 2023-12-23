import React, {useState} from 'react';
import {BSON} from 'realm';
import {BarChart, LineChart} from 'react-native-gifted-charts';
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
  const allData = useQuery('activities').filtered(
    'farmId == $0 && action IN $1 && date >= $2 && date <= $3',
    farmId.toString(),
    queryAction,
    new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
    new Date(),
  );
  console.log('length: ', allData.length);

  const barData = pastMonthsArray.map(month => {
    var total = 0;
    allData.map(act => {
      act.date.getMonth() + 1 == month.id ? (total += 1) : total;
    });
    return {value: total, label: month.month};
  });
  console.log('bar data: ', barData);

  const barData2 = pastMonthsArray.map(month => {
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
  console.log('bar data2: ', barData2[5]);

  let maxValue = Number.MIN_SAFE_INTEGER;
  for (const data of barData2) {
    for (const stack of data.stacks) {
      if (stack.value > maxValue) {
        maxValue = stack.value;
      }
    }
  }
  console.log('Max: ', Math.ceil(maxValue));

  const barData3 = queryAction.map(action => {
    var actionObj = {item: action, lineData: []};
    pastMonthsArray.map(month => {
      var price = 0;

      allData.map(act => {
        if (act.date.getMonth() + 1 == month.id && act.action == action) {
          price += act.price ?? 0;
          console.log('total: ', price);
        }
      });
      actionObj.lineData.push({
        value: price,
        label: month.month,
      });
    });
    return actionObj;
  });
  console.log('Pes data3: ', barData3[0]);
  console.log('Fer data3: ', barData3[1]);
  console.log('Fo data3: ', barData3[2]);
  console.log('Fung data3: ', barData3[3]);
  const dataSet = barData3.map(data => {
    return {data: data.lineData};
  });
  console.log('linedata: ', dataSet);
  let maxValueExpenses = Number.MIN_SAFE_INTEGER;
  for (const item of barData3) {
    for (const data of item.lineData) {
      if (data.value > maxValueExpenses) {
        maxValueExpenses = data.value;
      }
    }
  }
  console.log('MaxExpenses: ', Math.ceil(maxValueExpenses));

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
      fontSize: 20,
      fontWeight: 'bold',
    },
    legendColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>{option.title}</Text>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        {/* empty chart */}
        {maxValue == 0 && (
          <Text style={{color: 'red', marginVertical: 10}}>
            No data available
          </Text>
        )}
        {/* total expenses OR aerating, others  */}
        {option.type == 'line' && (
          <LineChart
            noOfSections={5}
            maxValue={maxValueExpenses}
            // dataSet={dataSet}
            data={barData3[0].lineData ?? []}
            data2={barData3[1].lineData ?? []}
            data3={barData3[2].lineData ?? []}
            // data4={barData3[3].lineData ?? []}
            focusEnabled
            color="black"
            color1="blue"
            color2="green"
            color3="blue"
            color4="yellow"
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLength={20}
            xAxisLabelTextStyle={{color: 'black'}}
            yAxisTextStyle={{color: 'black'}}
            isAnimated
          />
        )}
        {option.type == 'bar' && (
          <BarChart
            barWidth={25}
            barBorderRadius={4}
            frontColor="skyblue"
            // showGradient
            noOfSections={5}
            data={barData ?? []}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLength={20}
            xAxisLabelTextStyle={{color: 'black'}}
            yAxisTextStyle={{color: 'black'}}
            isAnimated
            renderTooltip={(item, index) => {
              return (
                <SafeAreaView
                  style={{
                    marginBottom: 20,
                    marginLeft: -6,
                    backgroundColor: 'lightgray',
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 4,
                    transform: [{rotate: '-90deg'}],
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {item.value}
                  </Text>
                </SafeAreaView>
              );
            }}
          />
        )}
        {/* fertilizer, foliar, pesticide, fungicide, sowing, transplant, harvest, sales*/}
        {option.type == 'stack' && (
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
            stackData={barData2 ?? []}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLength={20}
            xAxisLabelTextStyle={{color: 'black'}}
            yAxisTextStyle={{color: 'black'}}
            isAnimated
          />
        )}
      </SafeAreaView>
      <ActivityScreenChartDetails barData={barData2} />
    </SafeAreaView>
  );
};

export default ActivityScreenChartBar;
