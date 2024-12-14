import {TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useAppSelector} from '@states/reduxHook';
import {selectRestaurantCartItem} from '@states/reducer/cartSlice';
import {useStyles} from 'react-native-unistyles';
import {modelStyles} from '@unistyles/modelStyles';
import CustomText from '@components/global/Custom';
import {Colors} from '@unistyles/Constants';

const RepeatItemModal: FC<{
  item: any;
  restaurant: any;
  onOpenAddModal: () => void;
  closeModal: () => void;
}> = ({item, restaurant, closeModal, onOpenAddModal}) => {
  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );
  const {styles} = useStyles(modelStyles);

  return (
    <View>
      <View style={styles.noShadowHeaderContainer}>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily="Okra-Bold" fontSize={13}>
            Repeat Last used customization{' '}
          </CustomText>
        </View>
      </View>

      <View style={styles.noShadowFooterContainer}>
        <TouchableOpacity onPress={onOpenAddModal}>
          <CustomText
            fontFamily="Okra-Bold"
            color={Colors.active}
            fontSize={11}>
            + Add new customization
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepeatItemModal;
