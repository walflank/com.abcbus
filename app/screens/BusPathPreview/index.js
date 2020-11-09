import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function BusPathPreview({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Confirmar assento'}
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
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <View style={[styles.blockView, {borderBottomColor: colors.border}]}>
            <Text body2 style={{marginBottom: 10}}>
              Viagem realizada por {/*t('bus_name')*/}
            </Text>
            <Text body1 semibold>
              ABC Bus
            </Text>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                <Text body2>
                  Saída da viagem
                  {/*t('depart_time')*/}
                  </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text body2 semibold>
                  02 Dez 2018
                </Text>
                <Text caption1 grayColor>
                  14:00h
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                <Text body2>
                  Chegada da viagem
                  {/*t('arrive_time')*/}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text body2 semibold>
                  02 Dez 2018
                </Text>
                <Text caption1 grayColor>
                  16:00h
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                <Text body2>
                  Duração
                  {/*t('duration')*/}
                  </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text body2 semibold>
                  2 horas {/*t('hours')*/}
                </Text>
                <Text caption1 grayColor></Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                <Text body2>Total de tickets {/*t('total_ticket')*/}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text body2 semibold>
                  4 tickets {/*t('tickets')*/}
                </Text>
                <Text caption1 grayColor></Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
        <View>
          <Text caption1 semibold>
            5 {t('tickets')}
          </Text>
          <Text title3 primaryColor semibold>
            R$ 250
          </Text>
          <Text caption1 semibold style={{marginTop: 5}}>
            Valor total {/*t('total_price')*/}
          </Text>
        </View>
        <Button
          onPress={() =>
            navigation.navigate('BusPathCheckOut', {
              bookingType: 'Bus',
            })
          }>
          Continuar {/*t('continue')*/}
        </Button>
      </View>
    </SafeAreaView>
  );
}
