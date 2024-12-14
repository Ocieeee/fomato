import {TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useRef} from 'react';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles';
import {useAppDispatch, useAppSelector} from '@states/reduxHook';
import {
  addItemToCart,
  removeItemFromCart,
  selectRestaurantCartItem,
} from '@states/reducer/cartSlice';
import CustomText from '@components/global/Custom';
import {Colors} from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';
import Icon from '@components/global/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import AnimatedNumbers from 'react-native-animated-numbers';
import CustomModal from '@components/modal/CustomModal';
import AddItemmodal from '@components/modal/AddItemmodal';
import RepeatItemModal from '@components/modal/RepeatItemModal';

const AddButton: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const dispatch = useAppDispatch();
  const {styles} = useStyles(foodStyles);
  const cart = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id), // Now returns a function, no error
  );
  const modalref = useRef<any>(null);

  const openRepeatAddmodal = () => {
    modalref?.current?.openModal(
      <RepeatItemModal
        item={item}
        onOpenAddModal={() => {
          modalref?.current?.closeModal();
          setTimeout(() => {
            openAddmodal();
          }, 200);
        }}
        closeModal={() => modalref.current?.closeModal()}
        restaurant={restaurant}
      />,
    );
  };

  const openAddmodal = () => {
    modalref?.current?.openModal(
      <AddItemmodal
        item={item}
        onClose={() => modalref.current?.closeModal()}
        restaurant={restaurant}
      />,
    );
  };

  const addCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart != null) {
        openRepeatAddmodal();
        return;
      }
      openAddmodal();
    } else {
      dispatch(
        addItemToCart({
          restaurant: restaurant,
          item: {...item, customization: []},
        }),
      );
    }
  }, [dispatch, item, restaurant, cart]);

  const removeCartHandler = useCallback(() => {
    if (item?.isCustomizable) {
      if (cart !== null) {
        return;
      }
    } else {
      dispatch(
        removeItemFromCart({
          restaurant_id: restaurant?.id,
          itemId: item?.id,
        }),
      );
    }
  }, [dispatch, item, restaurant, cart]);

  return (
    <>
      <CustomModal ref={modalref} />
      <View style={styles.addButtonContainer(cart != null)}>
        {cart ? (
          <View style={styles.selectedContainer}>
            <ScalePress onPress={removeCartHandler}>
              <Icon
                iconFamily="MaterialCommunityIcons"
                color="#fff"
                name="minus-thick"
                size={RFValue(13)}
              />
            </ScalePress>
            <AnimatedNumbers
              includeComma={false}
              animationDuration={300}
              animateToNumber={cart?.quantity}
              fontStyle={styles.animatedCount}
            />
            <ScalePress onPress={addCartHandler}>
              <Icon
                iconFamily="MaterialCommunityIcons"
                color="#fff"
                name="plus-thick"
                size={RFValue(13)}
              />
            </ScalePress>
          </View>
        ) : (
          <TouchableOpacity
            onPress={addCartHandler}
            style={styles.noSelectionContainer}
            activeOpacity={0.6}
            accessibilityLabel="Add item to cart">
            <CustomText
              fontFamily="Okra-Bold"
              variant="h5"
              color={Colors.primary}>
              ADD
            </CustomText>
            <CustomText
              fontFamily="Okra-Bold"
              variant="h5"
              color={Colors.primary}
              style={styles.plusSmallIcon}>
              +
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      {item?.isCustomizable && (
        <CustomText fontFamily="Okra-Medium" style={styles.customizeText}>
          Customisable
        </CustomText>
      )}
    </>
  );
};

export default AddButton;
