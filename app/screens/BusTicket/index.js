import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, BusPlan, Button} from '@components';
import styles from './styles';

export default function BusTicket({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        //title={t('tickets')}
        title={'Seu Ticket'}
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
        <View style={styles.contain}>
          <BusPlan
            fromCode="CAMP"
            toCode="SPO"
            from="Campinas"
            to="São Paulo"
          />
          <View style={styles.line} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Companhia
              </Text>
              <Text headline style={{marginTop: 5}}>
                ABCBus
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Horário {/*t('time')*/}
              </Text>
              <Text headline style={{marginTop: 5}}>
                05:45h
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 25}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Passageiros {/*t('passenger')*/}
              </Text>
              <Text headline style={{marginTop: 5}}>
                5 pessoas {/*t('persons')*/}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Assentos selecionados {/*t('seat_number')*/}
              </Text>
              <Text headline style={{marginTop: 5}}>
                1, 2, 3, 7, 10
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 25}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Venda código {/*t('ticket_no')*/}
              </Text>
              <Text headline style={{marginTop: 5}}>
                CLMVBG
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Data da venda {/*t('confirm_date')*/}
              </Text>
              <Text headline style={{marginTop: 5}}>
                13/01/2021
              </Text>
            </View>
          </View>

          <View style={styles.line} />
          
          <View style={{flexDirection: 'row', marginTop: 25}}>

            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Cashback na carteira
              </Text>
              <Text title1 style={{marginTop: 5}}>
                + R$ 25.00
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text caption1 light>
                Total da compra
              </Text>
              <Text title1 style={{marginTop: 5}}>
                R$ 250.00
              </Text>
            </View>

          </View>

          {/*<View style={{alignItems: 'flex-end'}}>
            <Text caption1 light>
              Total da compra
            </Text>
            <Text title3 semibold>
              R$ 250.00
            </Text>
          </View>

          <View style={styles.code}>
            <Icon name="qrcode" size={150} color={colors.text} />
          </View>*/}

        </View>
      </ScrollView>
      <View style={{margin: 20}}>
        {/*<Button full>{t('download')}</Button>*/}
        <Button full>{'Baixar o comprovante'}</Button>
      </View>
    </SafeAreaView>
  );
}
