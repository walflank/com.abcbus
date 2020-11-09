import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function BusPathSelectSeat({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [bus, setBus] = useState([
    {id: '1', number: '1', status: 'booked'},
    {id: '2', number: '2', status: 'empty'},
    {id: '3', number: '3', status: 'empty'},
    {id: '4', number: '4', status: 'empty'},
    {id: '5', number: '5', status: 'empty'},
    {id: '6', number: '6', status: 'empty'},
    {id: '7', number: '7', status: 'empty'},
    {id: '8', number: '8', status: 'booked'},
    {id: '9', number: '9', status: 'empty'},
    {id: '10', number: '10', status: 'empty'},
    {id: '11', number: '11', status: 'empty'},
    {id: '12', number: '12', status: 'empty'},
    {id: '13', number: '13', status: 'empty'},
    {id: '14', number: '14', status: 'empty'},
    {id: '15', number: '15', status: 'empty'},
    {id: '16', number: '16', status: 'empty'},
    {id: '17', number: '17', status: 'booked'},
    {id: '18', number: '18', status: 'empty'},
    {id: '19', number: '19', status: 'empty'},
    {id: '20', number: '20', status: 'empty'},
    {id: '21', number: '21', status: 'booked'},
    {id: '22', number: '22', status: 'empty'},
    {id: '23', number: '23', status: 'empty'},
    {id: '24', number: '24', status: 'empty'},
    {id: '25', number: '25', status: 'empty'},
    {id: '26', number: '26', status: 'empty'},
    {id: '27', number: '27', status: 'empty'},
    {id: '28', number: '28', status: 'empty'},
    {id: '29', number: '29', status: 'empty'},
    {id: '30', number: '30', status: 'empty'},
  ]);

  
  const selectSeat = selected => {
    switch (selected.status) {
      case 'selected':
        setBus(
          bus.map(item => {
            return {
              ...item,
              status: item.number == selected.number ? 'empty' : item.status,
            };
          }),
        );
        break;
      case 'booked':
        break;
      default:
        setBus(
          bus.map(item => {
            return {
              ...item,
              status: item.number == selected.number ? 'selected' : item.status,
            };
          }),
        );
        break;
    }
  };

  /**
   * Render item seat
   * @param {*} item
   * @param {*} index
   * @returns
   */
  const renderItem = (item, index) => {
    let styleSeat = {};
    switch (item.status) {
      case 'selected':
        styleSeat = {backgroundColor: colors.accent};
        break;
      case 'booked':
        styleSeat = {backgroundColor: colors.primaryDark};
        break;
      default:
        styleSeat = {};
        break;
    }
    return (
      <View style={styles.itemSeat}>
        <TouchableOpacity
          style={[styles.empty, styleSeat]}
          onPress={() => selectSeat(item)}>
          <Text title3 whiteColor semibold>
            {item.number}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ticket = bus.filter(item => item.status == 'selected').length;
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Selecionar assentos'}
        subTitle="Campinas - São Paulo - ABCBus"
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
      <View style={{paddingHorizontal: 20, flex: 1}}>
        {/* Status */}
        <View style={[styles.lineSeatType, {borderColor: colors.border}]}>
          <View style={{alignItems: 'center'}}>
            <View
              style={[styles.booked, {backgroundColor: colors.primaryDark}]}
            />
            <Text footnote semibold>
              Reservado {/*t('booked')*/}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={[styles.selected, {backgroundColor: colors.accent}]} />
            <Text footnote semibold>
              Selecionado {/*t('selected')*/}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.empty} />
            <Text footnote semibold>
              Vazio {/*t('empty')*/}
            </Text>
          </View>
        </View>
        {/* Icons */}
        <View style={styles.lineDirection}>
          <Icon
            name="tachometer-alt"
            color={BaseColor.grayColor}
            size={32}
            solid
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text footnote light style={{marginRight: 5}}>
              Sair {/*t('exit')*/}
            </Text>
            <Icon
              name="sign-out-alt"
              color={BaseColor.grayColor}
              size={32}
              solid
            />
          </View>
        </View>
        {/* Seat render for select */}
        <FlatList
          numColumns={5}
          data={bus}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
      {/* Total Price */}
      <View
        style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
        <View style={{alignItems: 'flex-start'}}>
          <Text caption1 semibold>
            {ticket} {t('tickets')}
          </Text>
          <Text title3 primaryColor semibold>
            R$ 250
          </Text>
          <Text caption1 semibold style={{marginTop: 5}}>
            Valor total {/*t('total_price')*/}
          </Text>
        </View>
        <Button onPress={() => navigation.navigate('BusPathPreview')}>
          Reservar Assentos {/*t('book_now')*/}
        </Button>
      </View>
    </SafeAreaView>
  );
}
