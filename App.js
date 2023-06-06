import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  Login  from './screen/login';
import Validation from './screen/valid';
import Homepage from './screen/homepage';
import Modify from './screen/modify';
import Inscription from './screen/inscription';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Store from './store/configStore';
import Building from './screen/building';

const stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <stack.Navigator
        initialRouteName='building'
      >
        <stack.Screen name="Homepage" component = {Homepage}/>
        <stack.Screen name="inscription" component = {Inscription}/>
        <stack.Screen name="login" component = {Login}/>
        <stack.Screen name="valid" component = {Validation}/>
        <stack.Screen name="modify" component = {Modify}/>
        <stack.Screen name="building" component = {Building}/>
      </stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}




