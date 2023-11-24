import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#486523',
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: '30%', 
  },
  title: {
    color: '#000',
    fontSize: 45,
    marginBottom: 20,
  },
  subTitle: {
    color: '#000',
    // backgroundColor: '#000',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: '20%',
    maxWidth: '80%'
  },
  input: {
    minWidth: '80%',
    maxWidth: '80%',
    height: 45,
    margin: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#626262', 
    borderRadius: 8,   
  },
  button: {
    // backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 10,
    // marginTop: 5,
  },
  buttonText: {
    // color: '#0000ff',
    color:'#486523',
    fontSize: 17,
  },
});
