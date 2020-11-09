import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//import IconEntypo from 'react-native-vector-icons/Entypo';
//import IconFeather from 'react-native-vector-icons/Feather';
//import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
//import IconEvil from 'react-native-vector-icons/EvilIcons';
//import IconAnt from 'react-native-vector-icons/AntDesign';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default function Index(props) {
  const {style, enableRTL, ...rest} = props;
  const layoutStyle = enableRTL ? styles.styleRTL : {};
  return <Icon style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  enableRTL: PropTypes.bool,
};

Index.defaultProps = {
  style: {},
  enableRTL: false,
};
