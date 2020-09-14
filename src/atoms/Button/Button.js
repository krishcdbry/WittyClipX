import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import { Colors, Fonts } from '../../styles';

const Button = ({
  name,
  onPress,
  style,
  textStyle
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, style]}
      onPress={onPress}
    >
      <Text style={[styles.textStyle, textStyle]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 120,
    backgroundColor: Colors.orange,
    borderColor: Colors.darkGrey,
    elevation: 50,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 70,
    elevation: 50,
  },
  textStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.CapriolaRegular,
    fontWeight: "400",
  }
});

export default Button;
