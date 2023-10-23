import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import DateCard from './dateCard';

const {width: screenWidth} = Dimensions.get('window');
const width = Dimensions.get('window').width;

const DateCardCarousel = ({handleChangeDate}) => {
  const today = new Date();

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [loop, setLoop] = useState(false);

  const numberOfDays = 14; // Number of days you want to show

  // Create an array of date objects starting from today date
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    carouselItems.push(date);
  }

  // Define the onPress function to update the activeIndex
  const handleCardPress = index => {
    setActiveIndex(index);
    handleChangeDate(carouselItems[index]);
    console.log('carouselItems[index]: ', carouselItems[index]);
  };

  const renderItem = ({item, index}) => {
    return (
      <DateCard
        date={item.getDate()}
        day={item.getDay()}
        currentIndex={index}
        onPress={handleCardPress}
        isActive={index === activeIndex}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        key={`${loop}`}
        mode={'stack'}
        modeConfig={{
          stackInterval: 1,
          scaleInterval: 0.01,
          opacityInterval: 0.01,
          snapDirection: 'left',
        }}
        style={{
          width: width,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        loop={loop}
        repeat={false}
        autoPlay={false}
        data={carouselItems}
        width={width / 5}
        height={100}
        defaultIndex={0}
        renderItem={renderItem}
        overscrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateCardCarousel;
