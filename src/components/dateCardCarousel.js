import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import DateCard from './dateCard';

const {width: screenWidth} = Dimensions.get('window');

const DateCardCarousel = () => {
  const width = Dimensions.get('window').width;
  const today = new Date();

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);

  const numberOfDays = 14; // Number of days you want to show

  // Create an array of date objects starting from today date
  for (let i = 0; i < numberOfDays; i++) {
    var date = new Date();
    date.setDate(today.getDate() + i);
    carouselItems.push(date);
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <DateCard date={item.getDate()} day={item.getDay()} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        mode={'stack'}
        modeConfig={{
          stackInterval: 1,
          scaleInterval: 0.01,
          opacityInterval: 0.01,
          snapDirection: 'left',
        }}
        loop={false}
        autoPlay={false}
        data={carouselItems}
        width={width}
        height={100}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateCardCarousel;
