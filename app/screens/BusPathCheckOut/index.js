import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Button } from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function BusPathCheckOut({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });

  
  const onCheckOut = () => {
    const bookingType = route.params?.bookingType;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      switch (bookingType) {
        case 'Event':
          navigation.navigate('EventTicket');
          break;
        case 'Bus':
          navigation.navigate('BusTicket');
          break;
        default:
          navigation.navigate('PaymentMethod');
          break;
      }
    }, 500);


  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Finalizar compra'}
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
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              Cancelar {/*t('reset')*/}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <Text headline semibold style={{marginTop: 20}}>
            Endereço de cobrança {/*t('billing_information')*/}
          </Text>
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => setStreet(text)}
            //placeholder={t('street_address')}
            placeholder={'Endereço completo'}
            success={success.street}
            value={street}
          />
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => setCity(text)}
            //placeholder={t('city')}
            placeholder={'Cidade'}
            success={success.city}
            value={city}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 3.5}}>
              <TextInput
                onChangeText={(text) => setPostCode(text)}
                keyboardType="numeric"
                //placeholder={t('post_code')}
                placeholder={'Cep'}
                success={success.postCode}
                value={postCode}
              />
            </View>
            <View style={styles.inputItem}>
              <TextInput
                onChangeText={(text) => setCountry(text)}
                //placeholder={t('country')}
                placeholder={'Estado UF'}
                success={success.country}
                value={country}
                icon={
                  <Icon
                    name="chevron-down"
                    size={12}
                    solid
                    color={BaseColor.grayColor}
                  />
                }
              />
            </View>
          </View>

          <Text headline semibold style={{marginTop: 20}}>
            Informações pessoais
          </Text>
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => setContactName(text)}
            //placeholder={t('contact_name')}
            placeholder={'Nome completo'}
            success={success.street}
            value={contactName}
          />
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => setEmail(text)}
            //placeholder={t('email')}
            placeholder={'Email'}
            success={success.email}
            value={email}
          />
          {/*<View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 3}}>
              <TextInput
                onChangeText={(text) => setPostCode(text)}
                //placeholder={t('code')}
                placeholder={t('code')}
                keyboardType="numeric"
                success={success.postCode}
                value={postCode}
              />
            </View>
            <View style={{flex: 7, marginLeft: 10}}>
              <TextInput
                onChangeText={(text) => setPhone(text)}
                //placeholder={t('phone_number')}
                placeholder={t('phone_number')}
                keyboardType="numeric"
                success={success.phone}
                value={phone}
              />
            </View>
          </View>*/}
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onCheckOut();
            }}>
              Finalizar compra {/*t('check_out')*/}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
