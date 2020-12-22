import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BaseStyle, BaseColor, useTheme, } from '@config';
import { Header, SafeAreaView, TextInput, Icon, Text, Button } from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

export default function SelectBus({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  //const {_bus} = useTheme(); //teste


  const [keyword, setKeyword] = useState('');
  const [bus, setBus] = useState([
    {
      id: 0,
      cidade: 'Selecionar',
      sigla: '-',
      uf: '-'
    },
    {
      id: 5010,
      cidade: 'ACAILANDIA - MA',
      sigla: 'ACD',
      uf: 'MA'
    }
  ]);
  const [loading, setLoading] = useState(false);

  /**
   * @description Called when setting bus is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  const onChange = select => {
    setBus(
      bus.map(item => {
        if (item.value == select.value) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
            checked: false,
          };
        }
      }),
    );
  };


  const [origens, setOrigens] = useState([]);

  useEffect(() => {
    setTimeout(() => {

      Alert.alert('teste', 'teste');

      const result = axios.get('https://app.logpay.com.br/api-hubbus/v1/localidade/buscaOrigem');

      console.log('====================================================== result.data.data');
      console.log(result.data);


      setOrigens([{ cidade: 'teste1'}, {cidade: 'teste2'}]);

    }, 1000);
  }, []);



  const getOrigem = async () => {

    const result = await axios.get('https://app.logpay.com.br/api-hubbus/v1/localidade/buscaOrigem');

    console.log(' +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ result.data');
    console.log(result.data);
    console.log(' ================================================================================================================================================= result.data.data');
    console.log(result.data.data);

    setBus(result.data.data);
  };



  /**
   * call when on save
   */
  const onSave = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={t('search_bus')}
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
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => onSave()}
      />
      <View style={styles.contain}>
        <TextInput
          style={BaseStyle.textInput}
          onChangeText={text => setKeyword(text)}
          autoCorrect={false}
          //placeholder={t('search_bus')}
          placeholder={'Selecionar'}
          placeholderTextColor={BaseColor.grayColor}
          value={keyword}
          selectionColor={colors.primary}
        />
        <FlatList
          contentContainerStyle={{ paddingTop: 5 }}
          data={bus}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, { borderBottomColor: colors.border }]}
              onPress={() => onChange(item)}>
              <Text body1>{item.cidade}</Text>
              {item.checked && (
                <Icon name="check" size={14} color={colors.primary} />
              )}
            </TouchableOpacity>
          )}
        />

        {/*
        <Text body1>
          Teste Teste Teste Teste
        </Text>
        */}

        {/*data.hits.map(item => (
          <View key={item.objectID}>
            <Text body1>
              {item.url} - {item.title}
            </Text>
          </View>
        ))*/}

        <Button
          loading={loading}
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              //navigation.navigate('BusPathList');

              getOrigem()

              //Alert.alert('Teste top', 'Teste');

              setLoading(false);
            }, 500);
          }}>
          Teste Axios {origens.length}
        </Button>

      </View>
    </SafeAreaView>
  );
}
