/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {modelStyles} from '@unistyles/modelStyles';
import CustomText from '@components/global/Custom';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';
import ScalePress from '@components/ui/ScalePress';
import AnimatedNumber from 'react-native-animated-numbers';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppDispatch} from '@states/reduxHook';
// import {selectCart} from '@states/reducer/cartSlice';

function tranformSelectedOption(
  selectedOption: any,
  customizationOptions: any,
) {
  return Object.entries(selectedOption).map(([type, index]) => {
    const customization = customizationOptions?.find(
      (option: any) => option.type === type,
    );
    if (!customization || !customization?.options[index as number]) {
      throw new Error(`Invaild customization type or index for ${type}`);
    }
    return {
      type,
      selectedOption: customization?.options[index as number],
    };
  });
}

const AddItemmodal: FC<{item: any; restaurant: any; onClose: () => void}> = ({
  item,
  restaurant,
  onClose,
}) => {
  const {styles} = useStyles(modelStyles);
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    quantity: 1,
    price: item?.price,
    selectedOption: {} as Record<string, number>,
  });

  useEffect(() => {
    const defaultSelectedOption: Record<string, number> = {};
    let initialPrice = item?.price || 0;

    item?.customizationOptions?.forEach((customization: any) => {
      if (customization?.required) {
        const defaultOptionIndex = customization?.options?.findIndex(
          (option: any) => option?.price === 0,
        );
        if (defaultOptionIndex !== -1) {
          defaultSelectedOption[customization.type] = defaultOptionIndex;
          initialPrice +=
            customization?.options[defaultOptionIndex]?.price || 0;
        }
      }
    });
    setData(prevData => ({
      ...prevData,
      selectedOption: defaultSelectedOption,
      price: initialPrice,
    }));
  }, [item]);

  const addCartHandler = () => {
    setData(prevData => ({
      ...prevData,
      quantity: prevData?.quantity + 1,
      price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOption),
    }));
  };

  const removeCartHandler = () => {
    if (data?.quantity > 1) {
      setData(prevData => ({
        ...prevData,
        quantity: prevData?.quantity - 1,
        price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
      }));
    } else {
      onClose();
    }
  };

  const addItemIntoCart = async () => {
    const customizationOptions = tranformSelectedOption(
      data?.selectedOption,
      item?.customizationOptions,
    ).sort((a, b) => a.type.localeCompare(b.type));

    const customizedData = {
      restaurant: restaurant,
      item: item,
      customization: {
        quantity: data?.quantity,
        price: data?.price,
        customizationOptions: customizationOptions,
      },
    };
    // dispatch(addCustomizableItem(customizedData));
    onClose();
  };

  const calculatePrice = (
    quantity: number,
    selectedOption: Record<string, number>,
  ) => {
    const basePrice = item?.price || 0;
    let customizationPrice = 0;

    Object.keys(selectedOption).forEach(type => {
      const optionIndex = selectedOption[type];
      const optionPrice =
        item?.customizationOptions?.find((c: any) => c.type === type)
          ?.options?.[optionIndex]?.price || 0;
      customizationPrice += optionPrice;
    });

    return (basePrice + customizationPrice) * quantity;
  };

  const selectedOptionHandler = (type: string, index: number) => {
    setData(prevData => {
      const updatedSelectOption = {...prevData.selectedOption, [type]: index};
      const updatedPrice = calculatePrice(
        prevData?.quantity,
        updatedSelectOption,
      );
      return {
        ...prevData,
        selectedOption: updatedSelectOption,
        price: updatedPrice,
      };
    });
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.flexRowGap}>
          <Image source={{uri: item?.image}} style={styles.headerImage} />
          <CustomText fontFamily="Okra-Medium" fontSize={12}>
            {item?.name}
          </CustomText>
        </View>
        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="bookmark-outline"
              iconFamily="Ionicons"
              color={Colors.primary}
              size={16}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="share-outline"
              iconFamily="Ionicons"
              color={Colors.primary}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {item?.customizationOptions?.map(
          (customization: any, index: number) => {
            return (
              <View style={styles.subContainer} key={index}>
                <CustomText fontFamily="Okra-Medium">
                  {customization?.type}
                </CustomText>
                <CustomText fontFamily="Okra-Medium" variant="h7" color="#888">
                  {customization?.required
                    ? 'Required • Select any 1 Option '
                    : `Add on your ${customization?.type}`}
                </CustomText>
                <DottedLine />

                {customization?.options?.map((option: any, i: number) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.optionContainer}
                      onPress={() => {
                        selectedOptionHandler(customization?.type, i);
                      }}>
                      <CustomText fontFamily="Okra-Medium" fontSize={11}>
                        {option?.name}
                      </CustomText>
                      <View style={styles.flexRowGap}>
                        <CustomText fontFamily="Okra-Medium" fontSize={11}>
                          ₹{option?.price}
                        </CustomText>
                        <Icon
                          name={
                            data?.selectedOption[customization.type] === i
                              ? 'radiobox-marked'
                              : 'radiobox-blank'
                          }
                          iconFamily="MaterialCommunityIcons"
                          size={16}
                          color={
                            data?.selectedOption[customization.type] === i
                              ? Colors.active
                              : '#888'
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          },
        )}
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.selectedContainer}>
          <ScalePress onPress={removeCartHandler}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              color={Colors.active}
              name="minus-thick"
              size={RFValue(13)}
            />
          </ScalePress>
          <AnimatedNumber
            includeComma={false}
            animationDuration={300}
            animateToNumber={data?.quantity}
            fontStyle={styles.animatedCount}
          />
          <ScalePress onPress={addCartHandler}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              color={Colors.active}
              name="plus-thick"
              size={RFValue(13)}
            />
          </ScalePress>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={addItemIntoCart}>
          <CustomText color="#fff" fontFamily="Okra-Medium" variant="h5">
            Add item - ₹{data?.price}
          </CustomText>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  );
};

export default AddItemmodal;
