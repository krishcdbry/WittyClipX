import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';

const Clickable = ({
  children,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Clickable;
