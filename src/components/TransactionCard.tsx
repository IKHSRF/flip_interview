// src/components/TransactionCard.tsx
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import {Transaction} from '../types/Transaction'; // Import the Transactions type
import GlobalStyles from '../styles/GlobalStyle'; // Assuming you have global styles
import DotIcon from './DottedIcon'; // Assuming you have a DotIcon component
import CustomButton from './Button'; // Assuming you have a CustomButton component
import {capitalizeFirstLetter} from '../utils/ToCamelCase';
import {formatRupiah} from '../utils/FormatRupiah';
import {formatDate} from '../utils/FormatDate';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

interface TransactionCardProps {
  transaction: Transaction; // Define the transaction prop type
}

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

const TransactionCard: React.FC<TransactionCardProps> = ({transaction}) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {itemId: transaction.id});
      }}>
      <View
        style={[
          style.transactionCardOuter,
          transaction.status === 'PENDING'
            ? {
                backgroundColor: '#f46345',
              }
            : {
                backgroundColor: '#54b987',
              },
        ]}>
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

              <Image
                source={require('../assets/arrow.png')} // Use require for local assets
                style={style.image}
                resizeMode="cover" // Optional: Adjust how the image fits
              />

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
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  arrow: {
    fontSize: 16.0,
    paddingHorizontal: 5,
  },
  transactionCard: {
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
    width: 20, // Image width
    height: 15, // Image height
  },
});

export default TransactionCard;
