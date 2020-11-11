import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, DatePicker} from '@components';
import RangeSlider from 'rn-range-slider';
import Modal from 'react-native-modal';
import * as Utils from '@utils';

import styles from './styles';

export default function BusPathFilter({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [priceBegin, setPriceBegin] = useState(0);
  const [priceEnd, setPriceEnd] = useState(1000);
  const [people, setPeople] = useState(2);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [modalVisible, setmModalVisible] = useState(false);

  
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setmModalVisible(false)}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View
            style={[
              styles.contentActionModalBottom,
              {borderBottomColor: colors.border},
            ]}>
            <TouchableOpacity onPress={() => setmModalVisible(false)}>
              <Text body1>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setmModalVisible(false)}>
              <Text body1 primaryColor>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.lineRow, {marginBottom: 40}]}>
            <View>
              <Text body1>{t('passenger')}</Text>
              <Text caption1 grayColor>
                {t('people')}
              </Text>
            </View>
            <View style={styles.iconRight}>
              <TouchableOpacity
                onPress={() => setPeople(people - 1 > 0 ? people : 0)}>
                <Icon
                  name="minus-circle"
                  size={24}
                  color={BaseColor.grayColor}
                />
              </TouchableOpacity>
              <Text title1>{people}</Text>
              <TouchableOpacity onPress={() => setPeople(people + 1)}>
                <Icon name="plus-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Filtro'}
        renderLeft={() => {
          return <Icon name="times" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              Pronto {/*t('apply')*/}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.goBack()}
      />
      {renderModal()}
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }>
        <View style={{padding: 20}}>
          <View
            style={[styles.contentPickDate, {backgroundColor: colors.card}]}>
            <TouchableOpacity
              style={styles.itemPick}
              onPress={() => navigation.navigate('SelectBus')}>
              <Text caption1 light style={{marginBottom: 5}}>
                {/*t('from')*/}
                Saída
              </Text>
              <Text headline semibold numberOfLines={1}>
                Campinas
              </Text>
            </TouchableOpacity>
            <View style={[styles.linePick, {backgroundColor: colors.border}]} />
            <TouchableOpacity
              style={styles.itemPick}
              onPress={() => navigation.navigate('SelectBus')}>
              <Text caption1 light style={{marginBottom: 5}}>
                {/*t('to')*/}
                Chegada
              </Text>
              <Text headline semibold numberOfLines={1}>
                São Paulo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentQuest}>
            <DatePicker
              //label={t('date')}
              label={'Data'}
              selected="01/02/2021"
              style={{flex: 6, marginRight: 15}}
            />
            <TouchableOpacity
              style={[styles.duration, {backgroundColor: colors.card}]}
              onPress={() => setmModalVisible(true)}>
              <Text caption1 grayColor style={{marginBottom: 5}}>
                {/*t('passenger')*/} Passageiros
              </Text>
              <Text body1 semibold>
                {people} {/*t('people')*/} Pessoas
              </Text>
            </TouchableOpacity>
          </View>
          <Text headline semibold>
            {/*t('price').toUpperCase()*/}
            {'PREÇO'}
          </Text>
          <View style={styles.contentRange}>
            <Text caption1 grayColor>
              R$ 50
            </Text>
            <Text caption1 grayColor>
              R$ 1000
            </Text>
          </View>
          <RangeSlider
            style={{
              width: '100%',
              height: 40,
            }}
            thumbRadius={12}
            lineWidth={5}
            gravity={'center'}
            labelStyle="none"
            min={100}
            max={1000}
            step={1}
            selectionColor={colors.primary}
            blankColor={BaseColor.dividerColor}
            onValueChanged={(low, high, fromUser) => {
              setPriceBegin(low);
              setPriceEnd(high);
            }}
            onTouchStart={() => {
              setScrollEnabled(false);
            }}
            onTouchEnd={() => {
              setScrollEnabled(true);
            }}
          />
          <View style={styles.contentResultRange}>
            <Text caption1>Valor da passagem {/*t('avg_price')*/}</Text>
            <Text caption1>
              R$ {priceBegin} - R$ {priceEnd}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
