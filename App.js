import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/Login';
import Inicial from './src/screens/inicial';
import Cadastro from './src/screens/Cadastro';
import Home from './src/screens/Home';
import ResetPass from './src/screens/ResetPass';
import Carrinho from './src/screens/Carrinho';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#CFCFCF',
        bottom: 14,
        left: 14,
        right: 14,
        height: 60,
        borderRadius: 15,
        elevation: 0,
      }
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="home" size={24} color={focused ? '#FF7A1B' : 'black'} />
            </View>
          )
        }
      }} />
      <Tab.Screen name="Carrinho" component={Carrinho} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign name="shoppingcart" size={24} color={focused ? '#FF7A1B' : 'black'} />
            </View>
          )
        }
      }} />
    </Tab.Navigator>
  );

}


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicial" component={Inicial} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="MyTab" component={MyTab} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Stack.Screen name="RedefinirSenha" component={ResetPass} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#f04c24" barStyle="light-content" />
      <MyStack />
    </NavigationContainer>
  );
}
