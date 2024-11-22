// src/components/TransactionCard.tsx
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Transaction} from '../types/Transaction'; // Import the Transactions type
import GlobalStyles from '../styles/GlobalStyle'; // Assuming you have global styles
import DotIcon from './DottedIcon'; // Assuming you have a DotIcon component
import CustomButton from './Button'; // Assuming you have a CustomButton component
import {capitalizeFirstLetter} from '../utils/ToCamelCase';
import {formatRupiah} from '../utils/FormatRupiah';
import {formatDate} from '../utils/FormatDate';

interface TransactionCardProps {
  transaction: Transaction; // Define the transaction prop type
}

const TransactionCard: React.FC<TransactionCardProps> = ({transaction}) => {
  return (
    <View style={style.transactionCard}>
      <View>
        <View style={GlobalStyles.row}>
          {transaction.sender_bank.length > 3 ? (
            <Text style={GlobalStyles.title}>
              {capitalizeFirstLetter(transaction.sender_bank)}
            </Text>
          ) : (
            <Text style={GlobalStyles.title}>
              {transaction.sender_bank.toUpperCase()}
            </Text>
          )}

          <Icon name="arrow-right" style={style.arrow} />

          {transaction.beneficiary_bank.length > 4 ? (
            <Text style={GlobalStyles.title}>
              {capitalizeFirstLetter(transaction.beneficiary_bank)}
            </Text>
          ) : (
            <Text style={GlobalStyles.title}>
              {transaction.beneficiary_bank.toUpperCase()}
            </Text>
          )}
        </View>
        <Text style={GlobalStyles.body}>
          {transaction.beneficiary_name.toUpperCase()}
        </Text>
        <View style={GlobalStyles.row}>
          <Text style={GlobalStyles.body}>
            {formatRupiah(transaction.amount)}
          </Text>
          <DotIcon size={6} color="black" />
          <Text style={GlobalStyles.body}>
            {formatDate(transaction.created_at)}
          </Text>
        </View>
      </View>
      <View style={GlobalStyles.flexRow} />
      <View>
        <CustomButton type={transaction.status} onPress={() => {}} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  arrow: {
    fontSize: 16.0,
    paddingHorizontal: 5,
  },
  transactionCard: {
    backgroundColor: 'white',
    marginVertical: 4,
    padding: 14.0,
    paddingVertical: 18,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TransactionCard;
