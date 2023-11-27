import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState} from 'react';
import Home from './src/home/index';
import HistoricoPedidos from './src/historicoPedidos/index';
import Perfil from './src/perfil/index';
import ListaProdutos from './src/listaProdutos/index';
import CarrinhoCompras from './src/carrinhoCompras/index';

const Tab = createBottomTabNavigator();


const getIconSource = (routeName) => {
  switch (routeName) {
    case 'Home':
      return require('./src/assets/Home.png');
    case 'HistoricoPedidos':
      return require('./src/assets/Pedidos.png');
      case 'Perfil':
       return require('./src/assets/User.png');
  
    default:
      return require('./src/assets/Home.png'); 
  }
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        //ignora a renderização do botão
        if (route.name === 'ListaProdutos') {
          return null;
        }
   
        if (route.name === 'CarrinhoCompras') {
          return null;
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.bottomBarButton}
          >
            <Image
              source={getIconSource(route.name)}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Home">
          {(props) => <Home {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
        <Tab.Screen name="HistoricoPedidos" component={HistoricoPedidos} />
         <Tab.Screen name="Perfil" component={Perfil} />
         <Tab.Screen
          name="ListaProdutos"
          component={(props) => <ListaProdutos {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        />
         <Tab.Screen name="CarrinhoCompras" component={CarrinhoCompras} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#59283F',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  bottomBarButton: {
    flex: 1,
    alignItems: 'center',
  },
  buttonImage: {
    width: 18,
    height: 20,
  },
});

export default App;
