import React, {useEffect} from 'react';
import {ActivityIndicator, View, Dimensions} from 'react-native';
import {Images, BaseColor, useTheme} from '@config';
import {Image, Text} from '@components';
import styles from './styles';

import Video from 'react-native-video';

export default function Loading({navigation}) {
  const {colors} = useTheme();

  const onProcess = () => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 5500);
  };
  useEffect(() => {
    onProcess();
  }, []);
  

  const { height, width } = Dimensions.get('window');

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>


        {/*<Text title1 whiteColor semibold>
          Carregando
        </Text>*/}

          <Video
            source={{ uri: 'https://app.logpay.com.br/images/hubbus/videos/video_loading.mp4' }}
            //source={{ uri: VIDEO_LOGIN }}
            //repeat={true}
            playInBackground={false}
            playWhenInactive={false}
            //fullscreen={true}
            //fullscreenOrientation={'landscape'}
            //resizeMode={"stretch"}
            resizeMode={"cover"}
            muted={true}
            ref={(ref) => { this.player = ref }}
            onBuffer={() => { console.log('onBuffer'); }}
            onError={() => { console.log('error'); }}
            style={{
                position: 'absolute',
                width: width,
                height: height,
                opacity: 1,
                backgroundColor: '#FFF'
            }}
        />

      {/*}
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.content}>
        <Text title1 whiteColor semibold>
          ABCBus
        </Text>
        <ActivityIndicator
          size="large"
          color={BaseColor.whiteColor}
          style={{
            marginTop: 20,
          }}
        />
        </View>*/}


    </View>
  );
}
