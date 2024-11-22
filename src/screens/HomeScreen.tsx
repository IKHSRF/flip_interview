/**
 * Home Screen
 *
 * This screen responsible for fetching and displaying transaction data from API
 * It uses custom hooks (`useFetch`) to handle the data fetching, including loading and error states.
 *
 * The components :
 * - Shows loading indicator while fetching the data
 * - Displays an error message if the fetch fails
 * - Convert the fetched data into an array of `Transactions` for rendering
 * - Renders the transactions data in scrollable view
 */

// Import React and necessary React Native Components
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GlobalStyles from '../styles/GlobalStyle';

// Custom hooks for fetching the data
import useFetch from '../hooks/TransactionHooks';
import TransactionCard from '../components/TransactionCard';

import {Transaction} from '../types/Transaction'; // Import the Transactions type

const searchTransactions = (
  transactions: Transaction[],
  query: string,
): Transaction[] => {
  const lowerCaseQuery = query.toLowerCase();
  return transactions.filter(transaction => {
    return (
      transaction.beneficiary_name.toLowerCase().includes(lowerCaseQuery) ||
      transaction.sender_bank.toLowerCase().includes(lowerCaseQuery) ||
      transaction.beneficiary_bank.toLowerCase().includes(lowerCaseQuery) ||
      transaction.amount.toString().includes(query) // Match exact numbers in amount
    );
  });
};

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState(''); // State for the search query
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter dropdown
  /**
   * Fetches transaction data from the API using the `useFetch` hook.
   * The hook provides:
   * - `data`: The fetched data, or null if not available.
   * - `loading`: Indicates whether the fetch operation is in progress.
   * - `error`: Contains an error message if the fetch fails.
   */
  const {data, loading, error} = useFetch(
    'https://recruitment-test.flip.id/frontend-test', // API URL for transaction data
  );

  /**
   * Displays a loading indicator while the data is being fetched.
   */
  if (loading) {
    return <ActivityIndicator style={GlobalStyles.loader} />;
  }

  /**
   * Displays an error message if the fetch operation fails.
   */
  if (error) {
    return <Text style={GlobalStyles.error}>{error}</Text>;
  }

  /**
   * Converts the fetched data, which is in dictionary format, into an array.
   * If no data is available, it defaults to an empty array.
   */
  const transactions = data ? Object.values(data) : [];
  // Filtered transactions based on the search query
  const filteredTransactions = searchTransactions(transactions, query);
  // Sorting logic
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOption === 'nameAZ') {
      return a.beneficiary_name.localeCompare(b.beneficiary_name);
    } else if (sortOption === 'nameZA') {
      return b.beneficiary_name.localeCompare(a.beneficiary_name);
    } else if (sortOption === 'dateNewest') {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortOption === 'dateOldest') {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    return 0;
  });

  const getSortLabel = () => {
    switch (sortOption) {
      case 'nameAZ':
        return 'Nama A-Z';
      case 'nameZA':
        return 'Nama Z-A';
      case 'dateNewest':
        return 'Tanggal Terbaru';
      case 'dateOldest':
        return 'Tanggal Terlama';
      default:
        return 'URUTKAN';
    }
  };
  /**
   * Renders the list of transactions inside a scrollable container.
   * Each transaction is displayed with details like Sender Bank, Beneficiary Bank, Beneficiary Name, Amount, Status and Created At.
   * If no transactions are available, it displays a fallback message.
   *
   * Also there's additional functionalities such as:
   * - Filter: Filter transaction based on specific criteria (e.g., Name, Sender Bank, Beneficiary Bank, and Amount)
   * - Sort : Sort transaction based on specific field (e.g., Name A-Z, Name Z-A, Date Newest, Date Oldest)
   */
  return (
    <ScrollView>
      <View style={GlobalStyles.container}>
        <View style={style.search}>
          <Icon name="search" style={style.searchIcon} />
          <TextInput
            style={style.searchInput}
            placeholder="Cari nama, bank, atau nominal"
            value={query}
            onChangeText={setQuery} // Update search query on input change
          />
          <TouchableOpacity
            onPress={() => setShowFilter(!showFilter)}
            style={GlobalStyles.row}>
            <Text style={style.filterText}>{getSortLabel()}</Text>
            <Icon name="chevron-down" style={style.filterIcon} />
          </TouchableOpacity>
        </View>
        <View style={GlobalStyles.spacerHeight} />
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <Text>No transaction data available</Text>
        )}
        <View style={GlobalStyles.spacerHeight} />

        {/* Sorting Dialog */}
        <Modal
          visible={showFilter}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFilter(false)}>
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              {[
                {label: 'URUTKAN', value: null},
                {label: 'Nama A-Z', value: 'nameAZ'},
                {label: 'Nama Z-A', value: 'nameZA'},
                {label: 'Tanggal Terbaru', value: 'dateNewest'},
                {label: 'Tanggal Terlama', value: 'dateOldest'},
              ].map(option => (
                <TouchableOpacity
                  key={option.value || 'default'}
                  style={style.option}
                  onPress={() => {
                    setSortOption(option.value);
                    setShowFilter(false);
                  }}>
                  <View style={style.optionRow}>
                    <View style={style.radioOuter}>
                      <View
                        style={[sortOption === option.value && style.radio]}
                      />
                    </View>
                    <Text style={style.optionText}>{option.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  search: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    paddingEnd: 5,
    color: '#f46345',
    fontWeight: 'bold',
  },
  filterIcon: {
    fontSize: 20,
    color: '#f46345',
  },

  searchInput: {
    flex: 1,
    padding: 0,
    marginStart: 5,
    color: 'gray',
  },
  searchIcon: {
    paddingEnd: 5,
    fontSize: 15,
    color: 'gray',
  },
  filterOption: {
    paddingVertical: 5,
    fontSize: 16,
    color: 'black',
  },
  filterDropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  option: {
    paddingVertical: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    marginVertical: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 10, // Slightly smaller for better centering inside the outer circle
    height: 10,
    borderRadius: 10, // Rounded for a perfect circle
    backgroundColor: '#f46345',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f46345',
    marginRight: 10,
    justifyContent: 'center', // Center child vertically
    alignItems: 'center', // Center child horizontally
  },
});

export default HomeScreen;
