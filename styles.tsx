// styles.ts
import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5
  },
  counterText: {
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  warningText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red'
  }
});
