import React, { useState } from 'react';
import { FlatList, RefreshControl, Alert } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, BookingHistory } from '@components';
import { BookingHistoryData } from '@data';
import { useTranslation } from 'react-i18next';
import styles from './styles';

export default function Travels({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = item => {
    return (
      <BookingHistory
        name={item.name}
        checkIn={item.checkIn}
        checkOut={item.checkOut}
        total={item.total}
        price={item.price}
        cashback={item.cashback}
        style={{ paddingVertical: 10, marginHorizontal: 20 }}
        onPress={() => {
          //navigation.navigate('BookingDetail');
          Alert.alert('Minha viagem', 'Proxeloca Hotel');
        }}
      />
    );
  };

  
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header title={'Minhas viagens'} />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => { }}
          />
        }
        data={bookingHistory}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => renderItem(item)}
      />
    </SafeAreaView>
  );
}
