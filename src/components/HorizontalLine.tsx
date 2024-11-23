import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 * `HorizontalLine` is a simple component that renders a thin, horizontal line.
 * This component is useful for separating content or adding visual structure to a UI.
 */
const HorizontalLine: React.FC = () => <View style={styles.line} />;

// Styles for the HorizontalLine component
const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#f0f0f0',
    width: '100%',
    marginVertical: 20,
  },
});

export default HorizontalLine;
