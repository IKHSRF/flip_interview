import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';

interface DetailRowProps {
  /**
   * The title or label text to display in the row.
   * This is the header or category for the value.
   */
  title: string;

  /**
   * The value associated with the title to be displayed in the row.
   * This is the content or detail corresponding to the title.
   */
  value: string;

  /**
   * The flex value that determines the row's distribution relative to other rows.
   * It helps in adjusting the layout of this component dynamically.
   */
  flex: number;
}

/**
 * `DetailRow` is a functional component that displays a title-value pair in a flexible column layout.
 * It is typically used for showing data in detail pages or forms, where each row contains
 * a label and its corresponding value.
 *
 * @param {DetailRowProps} props - The props that define the title, value, and flex style.
 */
const DetailRow: React.FC<DetailRowProps> = ({title, value, flex}) => (
  <View
    style={[
      styles.column,
      {
        flex: flex, // Dynamic flex value to control the width distribution
      },
    ]}>
    <Text style={GlobalStyles.subTitle}>{title}</Text>
    <Text style={GlobalStyles.body}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  // Column layout to display title and value vertically
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default DetailRow;
