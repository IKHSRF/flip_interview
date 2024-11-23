import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 * `DotIcon` is a simple component that renders a circular dot with customizable size and color.
 * It can be used as a small indicator, separator, or visual element in a user interface.
 *
 * @param {number} size - The diameter of the dot. Default is 6.
 * @param {string} color - The color of the dot. Default is black.
 */
const DotIcon: React.FC<{size?: number; color?: string}> = ({
  size = 6,
  color = 'black',
}) => {
  return (
    <View
      style={[styles.dot, {width: size, height: size, backgroundColor: color}]}
    />
  );
};

// Styles for the DotIcon component
const styles = StyleSheet.create({
  dot: {
    borderRadius: 50,
    marginHorizontal: 3,
  },
});

export default DotIcon;
