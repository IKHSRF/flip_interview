import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface StatusProps {
  /**
   * A string value that determines the button's appearance and label.
   * This prop can either be:
   * - 'SUCCESS': The button will have a green background with a white label saying "Berhasil".
   * - 'PENDING': The button will have a transparent background with a red border and a black label saying "Pengecekan".
   *
   * If no type is provided, it defaults to 'PENDING'.
   */
  type: string | 'PENDING';
}

/**
 * The button has the following types:
 * 1. **'SUCCESS'**: This style is used to represent a successful action. The button is displayed with a green background and a white label that reads "Berhasil".
 * 2. **'PENDING'**: This style represents an action that is in progress or pending. The button has a transparent background, a red border, and a black label that says "Pengecekan".
 *
 * - The button's appearance (background color, border, text color) is controlled by the `type` prop.
 * - The label inside the button also changes dynamically based on the `type` prop.
 *
 * @param {StatusProps} props - The properties passed to the component.
 */
const StatusComponent: React.FC<StatusProps> = ({type = 'SUCCESS'}) => {
  return (
    <View
      // Style the button based on the 'type' prop
      style={[
        styles.button,
        type === 'SUCCESS' && styles.primaryButton,
        type === 'PENDING' && styles.oneLineButton,
      ]}>
      <Text
        // Style the label text based on the 'type' prop
        style={[
          styles.label,
          type === 'SUCCESS' && styles.primaryLabel,
          type === 'PENDING' && styles.oneLineLabel,
        ]}>
        {type === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Base style for all buttons
  button: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Style for 'SUCCESS' type button
  primaryButton: {
    backgroundColor: '#54b987',
  },
  // Style for 'PENDING' type button
  oneLineButton: {
    backgroundColor: 'transparent',
    borderColor: '#f46345',
    borderWidth: 1.5,
  },
  // Base style for all text labels
  label: {
    fontWeight: 'bold',
  },
  // Style for the label when the button type is 'SUCCESS'
  primaryLabel: {
    color: 'white',
  },
  // Style for the label when the button type is 'PENDING'
  oneLineLabel: {
    color: 'black',
  },
});

export default StatusComponent;
