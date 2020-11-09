import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
  TravelCard,
} from '@components';
import { BaseStyle, Images, useTheme } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import { PromotionData, TourData, HotelData } from '@data';
import { useTranslation } from 'react-i18next';

//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//import IconEntypo from 'react-native-vector-icons/Entypo';
//import IconFeather from 'react-native-vector-icons/Feather';
//import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
//import IconEvil from 'react-native-vector-icons/EvilIcons';
//import IconAnt from 'react-native-vector-icons/AntDesign';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [iconspotlight] = useState([
    {
      icon: 'credit-card',
      name: 'Minha carteira',
      route: 'MyWallet',
    },
    {
      icon: 'bus',
      name: 'Nova viagem',
      route: 'BusPath',
    },
    {
      icon: 'calendar-alt',
      name: 'Viagens realizadas',
      //route: 'Hotel',
      route: 'BusPath',
    },
    {
      icon: 'calendar-alt',
      name: 'Próximas viagens',
      route: 'BusPath',
    },
    //{
    //  icon: 'ellipsis-h',
    //  name: 'more',
    //  route: 'More',
    //},
  ]);

  const [icons] = useState([
    {
      icon: 'calendar-alt',
      name: 'hotels',
      route: 'Hotel',
    },
    {
      icon: 'map-marker-alt',
      name: 'tours',
      route: 'Tour',
    },
    {
      icon: 'car-alt',
      name: 'car',
      route: 'OverViewCar',
    },
    {
      icon: 'plane',
      name: 'flight',
      route: 'FlightSearch',
    },
    {
      icon: 'ship',
      name: 'cruise',
      route: 'CruiseSearch',
    },
    {
      icon: 'bus',
      name: 'bus',
      route: 'BusSearch',
    },
    {
      icon: 'star',
      name: 'event',
      route: 'DashboardEvent',
    },
    {
      icon: 'ellipsis-h',
      name: 'more',
      route: 'More',
    },
  ]);

  //Últimas Viagens Model
  const [lastTravels] = useState([
    {
      id: '0',
      image: Images.nextTravel1,
      title: 'Campinas - São Paulo',
      time: 'Ter, Out 31, 9:00h',
      location: 'Campinas, SP',
      month: 'OUT',
      day: '31',
    },
    {
      id: '1',
      image: Images.nextTravel2,
      title: 'São Paulo - Belo Horizonte',
      time: 'Qui, Nov 15, 15:00h',
      location: 'São Paulo, SP',
      month: 'NOV',
      day: '15',
    },
  ]);

  const [relate] = useState([
    {
      id: '0',
      image: Images.event4,
      title: 'Campinas - São Paulo',
      time: 'Ter, Out 31, 9:00am',
      location: 'Campinas, São Paulo',
    },
    {
      id: '1',
      image: Images.event5,
      title: 'Bearded Theory Spring Gathering',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
  ]);

  const [promotion] = useState(PromotionData);
  const [tours] = useState(TourData);
  const [hotels] = useState(HotelData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);

  const renderIconService = () => {
    return (
      <FlatList
        data={iconspotlight}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}>
              <View
                style={[styles.iconContent, { backgroundColor: colors.card }]}>
                <Icon name={item.icon} size={18} color={colors.primary} solid />
              </View>
              <Text footnote grayColor numberOfLines={1}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={Images.backgroundHome}
        //source={require("@assets/images/trip-3.jpg")}
        //source={Images.trip3}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: deltaY },
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>


          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={[
                styles.searchForm,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  shadowColor: colors.border,
                },
              ]}>
              <TouchableOpacity
                onPress={() => { 
                  //navigation.navigate('Search')
                  Alert.alert('Minha carteira', 'Em breve, seu extrato de transações.');
               }}
                activeOpacity={0.9}>
                <View
                  style={[BaseStyle.textInput, { backgroundColor: colors.card }]}>
                  {/*<Text body1 grayColor>
                    {t('what_are_you_looking_for')}{t('what_are_you_looking_for') + 'asdasudhaisud'}
                  </Text>*/}
                  <Text title3 semibold style={{ borderWidth: 0, borderColor: 'red' }}>
                    Seu saldo é R$ 89.23
                  </Text>
                </View>
              </TouchableOpacity>
              {renderIconService()}
            </View>
          </View>

          {/*
          <View>
            <Text title3 semibold style={styles.titleView}>
              Compra rápida
            </Text>
            <FlatList
              contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={promotion}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <Card
                  style={[styles.promotionItem, { marginLeft: 15 }]}
                  image={item.image}
                  onPress={() => navigation.navigate('HotelDetail')}>
                  <Text subhead whiteColor>
                    {item.title1}
                  </Text>
                  <Text title2 whiteColor semibold>
                    {item.title2}
                  </Text>
                  <View style={styles.contentCartPromotion}>
                    <Button
                      style={styles.btnPromotion}
                      onPress={() => {
                        navigation.navigate('PreviewBooking');
                      }}>
                      <Text body2 semibold whiteColor>
                        {t('book_now')}
                      </Text>
                    </Button>
                  </View>
                </Card>
              )}
            />
          </View>
          */}


          {/*<View style={styles.titleView}>
            <Text title3 semibold>
              Compra rápida
            </Text>
            <Text body2 grayColor>
              Compre nossos pacotes fechados e economize mais dinheiro
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={tours}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <Card
                style={[styles.tourItem, { marginLeft: 15 }]}
                image={item.image}
                onPress={() => navigation.navigate('TourDetail')}>
                <Text headline whiteColor semibold>
                  {item.name}
                </Text>
              </Card>
            )}
          />*/}

          <View style={styles.titleView}>
            <Text title3 semibold>
              Próximas viagens
            </Text>
            <Text body2 grayColor>
              Veja os detalhes das suas últimas viagens
            </Text>
          </View>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20,
                paddingLeft: 5,
              }}
              horizontal={true}
              data={lastTravels}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <TravelCard
                  image={item.image}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  month={item.month}
                  day={item.day}
                  onPress={() => navigation.navigate('EventDetail')}
                  style={{ marginLeft: 15 }}
                />
              )}
            />
          </View>

          {/* Promotion */}
          <View style={styles.titleView}>
            <Text title3 semibold>
              Nossas Promoções
            </Text>
            <Text body2 grayColor>
              Pressione a promoção que combina com você
            </Text>
            <Image source={Images.bannerPromotion1} style={styles.promotionBanner} />
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Image source={Images.bannerPromotion2} style={styles.promotionBanner} />
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Image source={Images.bannerPromotion3} style={styles.promotionBanner} />
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>


          {/*
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={[
                styles.searchForm,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  shadowColor: colors.border,
                },
              ]}>
              <TouchableOpacity
                onPress={() => { navigation.navigate('Search') }}
                activeOpacity={0.9}>
                <View
                  style={[BaseStyle.textInput, { backgroundColor: colors.card }]}>
                  <Text body1 grayColor>
                    {t('what_are_you_looking_for')}{t('what_are_you_looking_for') + 'asdasudhaisud'}
                  </Text>
                  <Text title3 semibold primaryColor>
                    Seu saldo é de R$ 89.23
                  </Text>
                </View>
                <View
                  style={[BaseStyle.textInput, { backgroundColor: colors.card }]}>
                  <Text body1 grayColor>
                    Vai viajar?
                  </Text>
                </View>
              </TouchableOpacity>
              {renderIconService()}
            </View>
          </View>
          */}

          {/*
          <View>
            <Text title3 semibold style={styles.titleView}>
              {t('promos_today')}
            </Text>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={promotion}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <Card
                  style={[styles.promotionItem, {marginLeft: 15}]}
                  image={item.image}
                  onPress={() => navigation.navigate('HotelDetail')}>
                  <Text subhead whiteColor>
                    {item.title1}
                  </Text>
                  <Text title2 whiteColor semibold>
                    {item.title2}
                  </Text>
                  <View style={styles.contentCartPromotion}>
                    <Button
                      style={styles.btnPromotion}
                      onPress={() => {
                        navigation.navigate('PreviewBooking');
                      }}>
                      <Text body2 semibold whiteColor>
                        {t('book_now')}
                      </Text>
                    </Button>
                  </View>
                </Card>
              )}
            />
          </View>
          */}


          {/*
          <View style={styles.titleView}>
            <Text title3 semibold>
              {t('tours')}
            </Text>
            <Text body2 grayColor>
              {t('let_find_tour')}
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={tours}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <Card
                style={[styles.tourItem, {marginLeft: 15}]}
                image={item.image}
                onPress={() => navigation.navigate('TourDetail')}>
                <Text headline whiteColor semibold>
                  {item.name}
                </Text>
              </Card>
            )}
          />
          */}


          {/* Event*/}
          {/*}
          <View style={styles.titleView}>
            <Text title3 semibold>
              {t('comming_event')}
            </Text>
            <Text body2 grayColor>
              {t('let_find_event')}
            </Text>
          </View>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20,
                paddingLeft: 5,
              }}
              horizontal={true}
              data={lastTravels}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <EventCard
                  image={item.image}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  onPress={() => navigation.navigate('EventDetail')}
                  style={{marginLeft: 15}}
                />
              )}
            />
          </View>
          */}

          {/*
          <View style={styles.titleView}>
            <Image source={Images.banner1} style={styles.promotionBanner} />
            <View style={[styles.line, {backgroundColor: colors.border}]} />
          </View>
          */}

          {/* Promotion 
          <View style={styles.titleView}>
            <Text title3 semibold>
              {t('promotion')}
            </Text>
            <Text body2 grayColor>
              {t('let_find_promotion')}
            </Text>
            <Image source={Images.banner1} style={styles.promotionBanner} />
            <View style={[styles.line, {backgroundColor: colors.border}]} />
          </View>*/}

          {/*
          <FlatList
            columnWrapperStyle={{paddingLeft: 5, paddingRight: 20}}
            numColumns={2}
            data={hotels}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <HotelItem
                grid
                image={item.image}
                name={item.name}
                location={item.location}
                price={item.price}
                available={item.available}
                rate={item.rate}
                rateStatus={item.rateStatus}
                numReviews={item.numReviews}
                services={item.services}
                style={{marginLeft: 15, marginBottom: 15}}
                onPress={() => navigation.navigate('HotelDetail')}
              />
            )}
          />
            */}


        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
