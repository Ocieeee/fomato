import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useSharedState} from '@features/tabs/SharedContext';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/Custom';

const LocationHeader: FC = () => {
  const {scrollYGlobal} = useSharedState();
  const {styles} = useStyles(homeStyles);
  const textColor = '#fff';
  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);
    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.View style={[opacityFadingStyles]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon
            name="map-marker"
            color={textColor}
            iconFamily="MaterialCommunityIcons"
            size={32}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.flexRow}>
            <CustomText variant="h5" color={textColor} fontFamily="Okra-Bold">
              Pune, Maharahshtra
            </CustomText>
            <Icon
              name="chevron-down"
              color={textColor}
              iconFamily="MaterialCommunityIcons"
              size={18}
            />
          </TouchableOpacity>
          <CustomText color={textColor} fontFamily="Okra-Medium">
            Jalgaon, Maharahshtra
          </CustomText>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
