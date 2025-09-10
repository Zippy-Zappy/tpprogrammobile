import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 48,
    borderColor: '#2196f3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    color: '#333',
    textTransform: 'capitalize',
  },
  errorBox: {
    backgroundColor: '#ffdddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  noResults: {
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});

export default styles;
