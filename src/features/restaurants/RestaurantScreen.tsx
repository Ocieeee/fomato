/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {View, Platform, FlatList} from 'react-native';
import React, {FC} from 'react';
import {useRoute} from '@react-navigation/native';
import {useStyles} from 'react-native-unistyles';
import {restaurantHeaderStyles} from '@unistyles/restuarantStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomeSafeAreaView from '@components/global/CustomeSafeAreaView';
import RestaurantHeader from '@components/restaurant/RestaurantHeader';
import SortingAndFilters from '@components/home/SortingAndFilters';
import {
  restaurantItemsData,
  restaurantsItemfiltersOption,
} from '@utils/dummyData';
import DottedLine from '@components/ui/DottedLine';
import FoodCard from '@components/restaurant/FoodCard';

const RestaurantScreen: FC = () => {
  const route = useRoute() as any;
  const restaurant = route?.params?.item;
  const {styles} = useStyles(restaurantHeaderStyles);
  const inset = useSafeAreaInsets();

  const renderItem = ({item}: any) => {
    return <FoodCard item={item} restaurant={restaurant} />;
  };

  return (
    <>
      <View style={{height: Platform.OS === 'android' ? inset.top : 0}}></View>
      <CustomeSafeAreaView>
        <RestaurantHeader title={restaurant?.name} />
        <View style={styles.sortingContainer}>
          <SortingAndFilters
            menuTitle={'Filter'}
            options={restaurantsItemfiltersOption}
          />
        </View>

        <FlatList
          data={restaurantItemsData}
          renderItem={renderItem}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.mainPadding}>
              <DottedLine />
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
        />
      </CustomeSafeAreaView>
    </>
  );
};

export default RestaurantScreen;
