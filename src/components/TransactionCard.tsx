import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Transaction} from '../types/Transaction';
import GlobalStyles from '../styles/GlobalStyle';
import DotIcon from './DottedIcon';
import StatusComponent from './StatusComponent';
import {formatBankName, formatRupiah, formatDate, IMAGES} from '../utils/index';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

// Define the props type for the TransactionCard component
interface TransactionCardProps {
  transaction: Transaction;
}

// Type for the navigation prop for the 'Detail' screen
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

// TransactionCard component that takes a transaction object as a prop
const TransactionCard: React.FC<TransactionCardProps> = ({transaction}) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        // When the card is tapped, navigate to the 'Detail' screen and pass the transaction ID
        navigation.navigate('Detail', {itemId: transaction.id});
      }}>
      <View
        style={[
          style.transactionCardOuter,
          {
            // Dynamically set background color based on the transaction status
            backgroundColor:
              transaction.status === 'PENDING' ? '#f46345' : '#54b987', // Red for pending, green for completed
          },
        ]}>
        <View style={style.transactionCard}>
          <View style={{flex: 3}}>
            <View style={GlobalStyles.row}>
              <Text style={GlobalStyles.title}>
                {
                  formatBankName(transaction.sender_bank) //Format and display sender's bank name
                }
              </Text>

              <Image
                source={IMAGES.arrow} // Use the imported arrow image for transaction direction
                style={style.image} // Style for the arrow image
                resizeMode="cover" // Set the image resize mode
              />

              <Text style={GlobalStyles.title}>
                {
                  formatBankName(transaction.beneficiary_bank) //Format and display beneficiary's bank name
                }
              </Text>
            </View>

            <Text style={GlobalStyles.body}>
              {
                transaction.beneficiary_name.toUpperCase() //Format and display the transaction amount
              }
            </Text>

            <View style={GlobalStyles.row}>
              <Text style={GlobalStyles.body}>
                {
                  formatRupiah(transaction.amount) //Format and display the transaction amount
                }
              </Text>
              <DotIcon />
              <Text style={GlobalStyles.body}>
                {
                  formatDate(transaction.created_at) //Format and display the transaction date
                }
              </Text>
            </View>
          </View>

          <StatusComponent type={transaction.status} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Define styles for the TransactionCard component
const style = StyleSheet.create({
  transactionCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14.0,
    paddingVertical: 18,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionCardOuter: {
    marginVertical: 4,
    borderRadius: 8,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginLeft: 5,
    marginRight: 3,
    width: 20,
    height: 15,
  },
});

export default TransactionCard;
