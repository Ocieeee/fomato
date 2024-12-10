import {Image, TouchableOpacity, View} from 'react-native';
import React, {FC, memo} from 'react';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles';
import CustomText from '@components/global/Custom';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import AddButton from './AddButton';

const FoodCard: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const {styles} = useStyles(foodStyles);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={
            item?.isVeg
              ? require('@assets/icons/veg.png')
              : require('@assets/icons/non_veg.png')
          }
          style={styles.vegIcon}
        />
        <CustomText fontFamily="Okra-Medium" fontSize={12} numberOfLines={1}>
          {item?.name}
        </CustomText>
        <CustomText
          style={styles.lowOpacity}
          fontFamily="Okra-Medium"
          fontSize={10}
          numberOfLines={2}>
          {item?.description}
        </CustomText>
        <CustomText fontFamily="Okra-Medium" fontSize={11} numberOfLines={1}>
          ₹{item?.price}
        </CustomText>
        <TouchableOpacity style={styles.addToCollectionContainer}>
          <Icon
            name="bookmark-outline"
            iconFamily="Ionicons"
            size={16}
            color={Colors.primary}
          />
          <CustomText color="#888" fontFamily="Okra-Medium" fontSize={9.5}>
            Add to Collection
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image source={{uri: item?.image}} style={styles.foodImage} />
          <AddButton item={item} restaurant={restaurant} />
        </View>
      </View>
    </View>
  );
};

export default memo(FoodCard);
