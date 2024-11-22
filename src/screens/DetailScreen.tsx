import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';
// import {Transaction} from '../types/Transaction';
import {useSelector} from 'react-redux';
import {RootState} from '../state/TransactionStore'; // Import RootState type for type safety
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App'; // Import your RootStackParamList type
import {capitalizeFirstLetter} from '../utils/ToCamelCase';
import {formatRupiah} from '../utils/FormatRupiah';
import {formatDate} from '../utils/FormatDate';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Props {
  route: DetailScreenRouteProp;
}

const DetailScreen: React.FC<Props> = ({route}) => {
  const {itemId} = route.params; // Access the parameter

  // Accessing the transaction state from Redux
  const {transactions} = useSelector((state: RootState) => state.transactions);
  const transaction = transactions.find(t => t.id === itemId);

  return (
    <View style={style.detailCard}>
      <View style={GlobalStyles.row}>
        <Text style={[GlobalStyles.title, style.paddingLeft]}>
          ID TRANSAKSI:{' '}
        </Text>
        <Text style={GlobalStyles.title}>#{transaction!.id}</Text>
        <Image
          source={require('../assets/copy.png')} // Use require for local assets
          style={style.image}
          resizeMode="cover" // Optional: Adjust how the image fits
        />
      </View>
      <View style={style.horizontalLine} />
      <View
        style={[
          GlobalStyles.row,
          {
            justifyContent: 'space-between',
          },
        ]}>
        <Text style={[GlobalStyles.title, style.paddingLeft]}>
          DETAIL TRANSAKSI:{' '}
        </Text>
        <Text style={[style.orangeText, style.paddingRight]}>Tutup</Text>
      </View>
      <View style={style.horizontalLine} />

      <View style={[style.paddingLeft, style.paddingRight]}>
        <View style={GlobalStyles.row}>
          {transaction!.sender_bank.length > 3 ? (
            <Text style={GlobalStyles.title}>
              {capitalizeFirstLetter(transaction!.sender_bank)}
            </Text>
          ) : (
            <Text style={GlobalStyles.title}>
              {transaction!.sender_bank.toUpperCase()}
            </Text>
          )}

          <Image
            source={require('../assets/arrow.png')} // Use require for local assets
            style={style.arrowImage}
            resizeMode="cover" // Optional: Adjust how the image fits
          />

          {transaction!.beneficiary_bank.length > 4 ? (
            <Text style={GlobalStyles.title}>
              {capitalizeFirstLetter(transaction!.beneficiary_bank)}
            </Text>
          ) : (
            <Text style={GlobalStyles.title}>
              {transaction!.beneficiary_bank.toUpperCase()}
            </Text>
          )}
        </View>
        <View style={GlobalStyles.spacerBottom} />
        <View
          style={[
            GlobalStyles.row,
            {
              justifyContent: 'space-between',
              marginEnd: 50,
            },
          ]}>
          <View>
            <Text style={GlobalStyles.title}>
              {transaction!.beneficiary_name}
            </Text>
            <Text style={GlobalStyles.body}>{transaction!.account_number}</Text>
          </View>
          <View>
            <View>
              <Text style={GlobalStyles.title}>NOMINAL</Text>
              <Text style={GlobalStyles.body}>
                {formatRupiah(transaction!.amount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={GlobalStyles.spacerBottom} />

        <View
          style={[
            GlobalStyles.row,
            {
              justifyContent: 'space-between',
              marginEnd: 50,
            },
          ]}>
          <View>
            <Text style={GlobalStyles.title}>BERITA TRANSFER</Text>
            <Text style={GlobalStyles.body}>{transaction!.remark}</Text>
          </View>
          <View>
            <View>
              <Text style={GlobalStyles.title}>KODE UNIK</Text>
              <Text style={GlobalStyles.body}>{transaction!.unique_code}</Text>
            </View>
          </View>
        </View>

        <View style={GlobalStyles.spacerBottom} />

        <Text style={GlobalStyles.title}>WAKTU DIBUAT</Text>
        <Text style={GlobalStyles.body}>
          {formatDate(transaction!.created_at)}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  detailCard: {
    paddingVertical: 16,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  arrow: {
    fontSize: 16.0,
    paddingHorizontal: 5,
  },
  paddingLeft: {
    paddingLeft: 16,
  },
  paddingRight: {
    paddingRight: 16,
  },
  orangeText: {
    color: '#f46345',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  horizontalLine: {
    height: 1, // Thin line
    backgroundColor: '#f0f0f0', // Line color
    width: '100%', // Full-width
    marginVertical: 20, // Optional spacing
  },
  image: {
    marginLeft: 6,
    width: 18, // Image width
    height: 18, // Image height
  },
  arrowImage: {
    marginLeft: 3,
    marginRight: 3,
    width: 20, // Image width
    height: 15, // Image height
  },
});

export default DetailScreen;
