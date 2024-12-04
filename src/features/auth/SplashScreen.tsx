import {View, StatusBar, Platform, Image} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {splashStyles} from '@unistyles/authStyles';
import Animated, {FadeInDown} from 'react-native-reanimated';

const SplashScreen: FC = () => {
  const {styles} = useStyles(splashStyles);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image
        source={require('@assets/images/logo_t.png')}
        style={styles.logoImage}
      />

      <Animated.View
        entering={FadeInDown.delay(400).duration(800)}
        style={styles.animatedContainer}>
        <Image
          source={require('@assets/images/tree.png')}
          style={styles.treeImage}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;