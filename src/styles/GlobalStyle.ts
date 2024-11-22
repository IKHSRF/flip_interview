import { StyleSheet } from 'react-native';

//Styles for the Global component.
const GlobalStyles = StyleSheet.create({
    flexRow: {
      flex: 1,
    },
    spacerHeight: {
     height: 20,
    },
    container: {
      padding: 16, // Adds space around the transaction list
    },
    loader: {
      flex: 1, // Fills the available space
      justifyContent: 'center', // Centers the loader vertically
      alignItems: 'center', // Centers the loader horizontally
    },
    error: {
      color: 'red', // Red text color for error messages
      textAlign: 'center', // Centers the error message text
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    body: {
        fontWeight: 'medium',
        paddingVertical: 2,
    },
  });

export default GlobalStyles;
