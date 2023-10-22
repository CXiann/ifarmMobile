import * as React from 'react';
import {View, Pressable, Dimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const {width: screenWidth} = Dimensions.get('window');

const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 400;
const DATA = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const TestDateCarousel = () => {
  const width = Dimensions.get('window').width;
  const r = React.useRef(null);
  const [loop, setLoop] = React.useState(false);

  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: 100}}>
        <Carousel
          key={`${loop}`}
          ref={r}
          loop={loop}
          style={{
            width: width,
            height: PAGE_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#0071fa',
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={DATA}
          renderItem={({item, animationValue}) => {
            return (
              <Item
                animationValue={animationValue}
                label={item}
                onPress={() =>
                  r.current?.scrollTo({
                    count: animationValue.value,
                    animated: true,
                  })
                }
              />
            );
          }}
          autoPlay={true}
        />
      </View>
    </View>
  );
};

export default TestDateCarousel;

function Item(props) {
  const {animationValue, label, onPress} = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#b6bbc0', '#0071fa', '#b6bbc0'],
    );

    return {
      transform: [{scale}, {translateY: translateY.value}],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, {duration: 250});
  }, [translateY]);

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, {duration: 250});
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          containerStyle,
        ]}>
        <Animated.Text style={[{fontSize: 18, color: '#26292E'}, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
