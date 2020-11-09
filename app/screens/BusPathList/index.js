import React, {useState} from 'react';
import {FlatList, RefreshControl, View, Animated} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, BusItem, FilterSort} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {BusData} from '@data';

export default function BusPathList({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );

  const [bus] = useState(BusData);

 
  const onChangeSort = () => {};


  const onFilter = () => {
    navigation.navigate('BusPathFilter');
  };

  
  const renderContent = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 50,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={bus}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <BusItem
              style={{
                marginBottom: 15,
              }}
              from={item.from}
              to={item.to}
              totalHour={item.totalHour}
              brand={item.brand}
              type={item.type}
              price={item.price}
              route={item.route}
              onPress={() => navigation.navigate('BusPathSelectSeat')}
            />
          )}
        />
        <Animated.View
          style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
          <FilterSort
            labelCustom={'204' + t('results')}
            onChangeSort={onChangeSort}
            onFilter={onFilter}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Nova viagem'}
        subTitle="Campinas - São Paulo - 01 Nov 2020"
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {renderContent()}
    </SafeAreaView>
  );
}
