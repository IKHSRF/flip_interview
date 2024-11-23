import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';
import {useSelector} from 'react-redux';
import {RootState} from '../state/TransactionStore';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {formatBankName, formatRupiah, formatDate, IMAGES} from '../utils/index';
import DetailRow from '../components/DetailRow';
import HorizontalLine from '../components/HorizontalLine';

// Define the type for the route prop that comes with the navigation to this screen
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Props {
  route: DetailScreenRouteProp; // Define route prop for accessing navigation params
}

// DetailScreen component receives the route prop from React Navigation
const DetailScreen: React.FC<Props> = ({route}) => {
  const {itemId} = route.params; // Access the 'itemId' parameter passed to this screen

  // Access the Redux store using useSelector to get the list of transactions
  const {transactions} = useSelector((state: RootState) => state.transactions);

  // Find the transaction from the list using the itemId from route params
  const transaction = transactions.find(t => t.id === itemId);

  // If the transaction is not found, return a message indicating so
  if (!transaction) {
    return (
      <View>
        <Text style={GlobalStyles.body}>Transaction not found.</Text>
      </View>
    );
  }

  return (
    // Main container for the transaction details
    <View style={style.detailCard}>
      <View style={[GlobalStyles.row, GlobalStyles.paddingHorizontal]}>
        <Text style={GlobalStyles.subTitle}>ID TRANSAKSI: </Text>
        <Text style={GlobalStyles.title}>#{transaction.id}</Text>
        <Image
          source={IMAGES.copy} // Use local image asset for copy icon
          style={style.image}
          resizeMode="cover" // Ensure the image fits within the defined space
        />
      </View>

      <HorizontalLine />

      <View style={[GlobalStyles.row, GlobalStyles.spaceBetween]}>
        <Text style={[GlobalStyles.subTitle, GlobalStyles.paddingHorizontal]}>
          DETAIL TRANSAKSI
        </Text>
        <Text style={[GlobalStyles.orangeText, GlobalStyles.paddingHorizontal]}>
          Tutup
        </Text>
      </View>

      <HorizontalLine />

      <View style={GlobalStyles.paddingHorizontal}>
        <View style={GlobalStyles.row}>
          <Text style={GlobalStyles.title}>
            {
              formatBankName(transaction.sender_bank) // Format sender bank name
            }
          </Text>

          <Image
            source={IMAGES.arrow}
            style={style.arrowImage}
            resizeMode="cover"
          />

          <Text style={GlobalStyles.title}>
            {
              formatBankName(transaction.beneficiary_bank) // Format beneficiary bank name
            }
          </Text>
        </View>

        <View style={GlobalStyles.spacerBottom} />

        <View style={GlobalStyles.row}>
          <DetailRow
            flex={2}
            title={transaction.beneficiary_name}
            value={transaction.account_number.toString()} // Display account number
          />
          <DetailRow
            flex={1}
            title="Amount"
            value={formatRupiah(transaction.amount)} // Format amount as Rupiah
          />
        </View>

        <View style={GlobalStyles.spacerBottom} />

        <View style={GlobalStyles.row}>
          <DetailRow
            flex={2}
            title="BERITA TRANSFER" // Transaction remark label
            value={transaction.remark} // Display transaction remark
          />
          <DetailRow
            flex={1}
            title="KODE UNIK" // Unique code label
            value={transaction.unique_code.toString()} // Display unique code
          />
        </View>

        <View style={GlobalStyles.spacerBottom} />

        <DetailRow
          flex={0}
          title="Waktu Dibuat"
          value={formatDate(transaction.created_at)} // Format transaction creation date
        />
      </View>
    </View>
  );
};

// Styles for the component
const style = StyleSheet.create({
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailCard: {
    paddingVertical: 16,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  image: {
    marginLeft: 6,
    width: 18,
    height: 18,
  },
  arrowImage: {
    marginLeft: 3,
    marginRight: 3,
    width: 20,
    height: 15,
  },
});

export default DetailScreen;
