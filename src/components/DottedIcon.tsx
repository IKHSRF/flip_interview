import React from 'react';
import {View, StyleSheet} from 'react-native';

const DotIcon: React.FC<{size?: number; color?: string}> = ({
  size = 10,
  color = 'black',
}) => {
  return (
    <View
      style={[styles.dot, {width: size, height: size, backgroundColor: color}]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: 50,
    marginHorizontal: 5,
  },
});

export default DotIcon;
