/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {cardStyles} from '@unistyles/cardStyles';
import {recommendedListData} from '@utils/dummyData';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/Custom';
import {Colors} from '@unistyles/Constants';
import CustomGradient from '@components/global/CustomGradient';

const RecommendedList = () => {
  const {styles} = useStyles(cardStyles);

  const renderitem = ({item}: any) => {
    return (
      <ScalePress
        style={styles.itemContainer}
        onPress={() => {
          navigate('RestaurantScreen', {
            item: item,
          });
        }}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
          {item?.discount && (
            <View style={styles.discountContainer}>
              <CustomText
                color={Colors.background}
                fontFamily="Okra-Bold"
                fontSize={10}>
                {item?.discount}
              </CustomText>
              {item?.discountAmount && (
                <CustomText
                  style={{lineHeight: 11}}
                  color={Colors.background}
                  fontSize={9}
                  fontFamily="Okra-Medium">
                  {item?.discountAmount}
                </CustomText>
              )}
            </View>
          )}
          <TouchableOpacity style={styles.bookmarkIcon}>
            <Image
              style={styles.bookmarkIconImage}
              source={require('@assets/icons/bookmark.png')}
            />
          </TouchableOpacity>
          <CustomGradient position={'bottom'} />
        </View>

        <View style={styles.itemInfo}>
          <CustomText
            fontFamily="Okra-Medium"
            fontSize={10}
            color={Colors.text}
            numberOfLines={1}>
            {item?.name}
          </CustomText>
        </View>
        <View style={styles.flexRow}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.clockIcon}
          />
          <CustomText
            fontFamily="Okra-Medium"
            color={Colors.lightText}
            fontSize={9}
            numberOfLines={1}>
            {`${item.time} • ${item?.discount}`}
          </CustomText>
        </View>
      </ScalePress>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        numColumns={Math.ceil(recommendedListData?.length / 2)}
        data={recommendedListData}
        renderItem={renderitem}
        scrollEnabled={false}
        keyExtractor={item => item?.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={styles.recommendedContainer}
      />
    </ScrollView>
  );
};

export default RecommendedList;
