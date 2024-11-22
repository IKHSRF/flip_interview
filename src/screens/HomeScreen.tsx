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
  Image,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';
import TransactionCard from '../components/TransactionCard';

// Redux hooks for state management
import {useSelector, useDispatch} from 'react-redux';
import {setSortOption, setQuery} from '../state/TransactionSlice'; // Import actions
import {RootState} from '../state/TransactionStore'; // Import RootState type for type safety

// Custom hooks for fetching the data
import useFetch from '../hooks/TransactionHooks';

// Import the Transactions type
import {Transaction} from '../types/Transaction';

/**
 * Filters the transactions based on the search query.
 * It checks if any of the transaction fields (beneficiary name, sender bank, beneficiary bank and amount)
 * contains the query string.
 */
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
      transaction.amount.toString().includes(query)
    );
  });
};

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch(); // Dispatch function to trigger actions
  const [showFilter, setShowFilter] = useState(false); // State to toggle visibility of sorting filter dialog

  // Accessing the transaction state from Redux
  const {transactions, loading, error, sortOption, query} = useSelector(
    (state: RootState) => state.transactions,
  );

  /**
   * Updates the search query in Redux state when the user types into the search field.
   * @param newQuery The new query entered by the user.
   */
  const handleQueryChange = (newQuery: string) => {
    dispatch(setQuery(newQuery)); // Dispatch action to update query in Redux store
  };

  // Fetch the transaction data using the custom useFetch hook
  useFetch('https://recruitment-test.flip.id/frontend-test');

  /**
   * Filter transactions based on the search query.
   * The `searchTransactions` function filters the transactions based on the user's input.
   */
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
        {/* Search Input and Sort Filter */}
        <View style={style.search}>
          <Image
            source={require('../assets/search.png')} // Use require for local assets
            style={style.image}
            resizeMode="cover" // Optional: Adjust how the image fits
          />
          <TextInput
            style={[
              style.searchInput,
              query.length > 0
                ? {
                    textDecorationLine: 'underline',
                    textDecorationColor: 'black',
                  }
                : {},
            ]}
            placeholder="Cari nama, bank, atau nominal"
            value={query} // Bind query value from Redux state
            onChangeText={handleQueryChange} // Update Redux state with query change
          />
          <TouchableOpacity
            onPress={() => setShowFilter(!showFilter)} // Toggle filter dialog visibility
            style={GlobalStyles.row}>
            <Text style={style.filterText}>{getSortLabel()}</Text>
            <Image
              source={require('../assets/down.png')} // Use require for local assets
              style={style.image}
              resizeMode="cover" // Optional: Adjust how the image fits
            />
          </TouchableOpacity>
        </View>
        <View style={GlobalStyles.spacerHeight} />

        {/* Render filtered and sorted transactions */}
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <Text>No transaction data available</Text> // Fallback message if no transactions match the filters
        )}
        <View style={GlobalStyles.spacerHeight} />

        {/* Sorting Dialog */}
        <Modal
          visible={showFilter} // Control visibility of the sort filter modal
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFilter(false)} // Close the modal
        >
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              {/* List of sorting options */}
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
                    dispatch(setSortOption(option.value)); // Dispatch sort option update to Redux
                    setShowFilter(false); // Close the modal after selecting an option
                  }}>
                  <View style={style.optionRow}>
                    <View style={style.radioOuter}>
                      <View
                        style={[sortOption === option.value && style.radio]} // Highlight selected option
                      />
                    </View>
                    <Text style={[style.optionText, GlobalStyles.body]}>
                      {option.label}
                    </Text>
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
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
    marginLeft: 5,
    color: 'gray',
  },
  searchIcon: {
    paddingEnd: 5,
    fontSize: 15,
    color: 'gray',
  },
  image: {
    width: 23, // Image width
    height: 23, // Image height
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
