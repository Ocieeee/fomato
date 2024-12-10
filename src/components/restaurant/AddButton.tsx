/* eslint-disable react/self-closing-comp */
import {View} from 'react-native';
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useStyles} from 'react-native-unistyles';
import {foodStyles} from '@unistyles/foodStyles';
import {useAppSelector} from '@states/reduxHook';

const AddButton: FC<{item: any; restaurant: any}> = ({item, restaurant}) => {
  const dispatch = useDispatch();
  const {styles} = useStyles(foodStyles);
  const cart = useAppSelector(state => state.cart.carts);

  return (
    <>
      <View style={styles.addButtonContainer(cart != null)}></View>
    </>
  );
};

export default AddButton;
