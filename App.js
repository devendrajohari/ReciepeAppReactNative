import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';
import { Provider } from 'react-redux';
// import FavoritesContextProvider from './store/context/favorites-context';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (<Drawer.Navigator 
    screenOptions={
      {
        headerStyle: {backgroundColor: '#997b66'},
        headerTintColor: 'white',
        sceneContainerStyle: {backgroundColor: '#f1dca7'},
        drawerContentStyle: {backgroundColor: '#997b66'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#f1dca7',
        drawerActiveBackgroundColor: '#e4baa1'
      }
    }>
    <Drawer.Screen options={
      {
        title: 'All Categories',
        drawerIcon: ({color, size}) => (
          <Ionicons name='list' color={color} size={size} />
        )
      }
    } 
    name='Categories' 
    component={CategoriesScreen}  />
    <Drawer.Screen name='Favorites' component={FavoritesScreen} options={{
      drawerIcon: ({color, size}) => (
        <Ionicons name='star' color={color} size={size} />
      )
    }} />
  </Drawer.Navigator>);
}

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <Provider store={store}>
    {/* <FavoritesContextProvider> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerTintColor: 'white',
        }}>
          <Stack.Screen 
          name='DrawerScreen' 
          component={DrawerNavigator} 
          options={{
            headerShown: false
          }} />
          <Stack.Screen name='MealsOverview' component={MealsOverviewScreen} 
          // options={({route, navigation}) => {
          //   const catId = route.params.categoryId;
          //   const catColor = route.params.categoryColor;
          //   return {
          //     title: catId,
          //     headerStyle: {backgroundColor: catColor}
          //   };
          // }} 
          />
          <Stack.Screen name='MealDetail' component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </FavoritesContextProvider> */}
      </Provider>
    </>
    
  );
}

const styles = StyleSheet.create({
});
