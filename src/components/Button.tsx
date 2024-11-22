import React from 'react';
import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  type?: string;
}

const CustomButton: React.FC<ButtonProps> = ({onPress, type = 'SUCCESS'}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'SUCCESS' && styles.primaryButton,
        type === 'PENDING' && styles.oneLineButton,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.label,
          type === 'SUCCESS' && styles.primaryLabel,
          type === 'PENDING' && styles.oneLineLabel,
        ]}>
        {type === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#54b987',
  },
  oneLineButton: {
    backgroundColor: 'transparent',
    borderColor: '#f46345',
    borderWidth: 1.5,
  },
  label: {
    fontWeight: 'bold',
  },
  primaryLabel: {
    color: 'white',
  },
  oneLineLabel: {
    color: 'black',
  },
});

export default CustomButton;
