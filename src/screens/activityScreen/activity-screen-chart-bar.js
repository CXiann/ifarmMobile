import React, {useState, useEffect} from 'react';
import {BSON} from 'realm';
import {BarChart, LineChart} from 'react-native-gifted-charts';

import {Text, useTheme, IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
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
  var queryAction = option.action;

  const {farmId} = useGlobal();
  const {useQuery} = realmContext;

  const [chartData, setChartData] = useState([]);

  const allActivities = useQuery('activities');

  useEffect(() => {
    var barData = [];
    var lineData = [];
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
        barData = pastMonthsArray.map(month => {
          var total = 0;
          allData.map(act => {
            act.date.getMonth() + 1 == month.id ? (total += 1) : total;
          });
          return {
            value: total,
            label: month.month,
            color: 'skyblue',
            stacks: [{value: total, name: 'Total Count', color: 'skyblue'}],
          };
        });
        console.log('bar data: ', barData);
        setChartData(barData);
        break;

      case 'stack':
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
        console.log('stack data: ', stackedData);
        setChartData(stackedData);
        break;
      case 'line':
        lineData = queryAction.map(action => {
          var actionObj = {item: action, lineData: []};
          pastMonthsArray.map(month => {
            var price = 0;

            allData.map(act => {
              if (act.date.getMonth() + 1 == month.id && act.action == action) {
                price += act.price ?? 0;
              }
            });
            actionObj.lineData.push({
              value: price,
              label: month.month,
            });
          });
          return actionObj;
        });
        // console.log('Pes data3: ', lineData[0].lineData);
        // console.log('Fer data3: ', lineData[1].lineData);
        // console.log('Fo data3: ', lineData[2].lineData);
        // console.log('Fung data3: ', lineData[3].lineData);
        const dataSet = lineData.map(data => {
          return {data: data.lineData};
        });
        console.log('linedata: ', dataSet[1].data);
        setChartData(dataSet);

        let maxValueExpenses = Number.MIN_SAFE_INTEGER;
        for (const item of lineData) {
          for (const data of item.lineData) {
            if (data.value > maxValueExpenses) {
              maxValueExpenses = data.value;
            }
          }
        }
        console.log('MaxExpenses: ', Math.ceil(maxValueExpenses));
        break;

      default:
        break;
    }
  }, [allActivities, option]);

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

  console.log('main data: ', chartData);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{option.title}</Text>
      <View style={{flex: 1}}>
        {/* empty chart */}
        {chartData.length == 0 && (
          <Text style={{color: 'red', marginVertical: 20, alignSelf: 'center'}}>
            No data available
          </Text>
        )}
        {/* <LineChart
          noOfSections={5}
          // maxValue={maxValueExpenses}
          dataSet={chartData ?? []}
          // data={[{value: 50}, {value: 80}, {value: 90}, {value: 70}]}
          // data={chartData[0]?.lineData}
          // data2={chartData[0]?.lineData}
          // data3={chartData[1]?.lineData}
          // data4={chartData[2]?.lineData}
          // data5={chartData[3]?.lineData}
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
        /> */}
        {/* aerating, others, fertilizer, foliar, pesticide, fungicide, sowing, transplant, harvest, sales*/}

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
          stackData={chartData}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLength={20}
          xAxisLabelTextStyle={{color: 'black', fontWeight: 'bold'}}
          yAxisTextStyle={{color: 'black', fontSize: 10}}
          isAnimated
        />
      </View>
      <ActivityScreenChartDetails
        data={chartData}
        type={option.type}
        pastMonthsArray={pastMonthsArray}
        queryAction={queryAction}
      />
    </View>
  );
};

export default ActivityScreenChartBar;
