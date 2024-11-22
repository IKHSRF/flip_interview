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
        fontWeight: '800',
        fontSize: 16,
        marginVertical: 5,
    },
    body: {
        fontWeight: '600',
        paddingVertical: 3,
    },
    spacerBottom: {
      marginBottom: 10,
    },
  });

export default GlobalStyles;
