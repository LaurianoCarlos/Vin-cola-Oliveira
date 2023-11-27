
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput,TouchableOpacity } from 'react-native';

const defaultProduct = {
  variety: '',
  description: '',
  price: 'R$ 0,00',
  volume: '0ml',
  image: require('../assets/garrafa2.png'),
};

const ShoppingCartScreen = ({ route }) => {
  const { cartItems: routeCartItems } = route.params; 
  const [cartItems, setCartItems] = useState(routeCartItems || []); 
  const [total, setTotal] = useState(0);

   useEffect(() => {
   
    calculateTotal();
  },);

  const calculateTotal = () => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + (item.total || item.price * item.quantity || 0);
    }, 0);
    setTotal(newTotal);
  };

  const ParentComponent = () => {
  const [cartItems, setCartItems] = useState(0.0);

  return (
    <ShoppingCartScreen cartItems={cartItems} setCartItems={setCartItems} />
  );
};

   const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 0) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity, total: item.price * newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    calculateTotal();
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + 1;
        return { ...item, quantity: newQuantity, total: item.price * newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    calculateTotal();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>O carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={item.image || defaultProduct.image} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemVariety}>{item?.variety || defaultProduct.variety}</Text>

                <View style={styles.quantityContainer}>
                  <Text style={styles.cartItemTotal}>R$ {item?.price * item?.quantity || defaultProduct.price}</Text>
                  <View style={styles.quantityContainer}>
                
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item?.quantity || 0}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
     
      <Text style={styles.discountMensageLabel}>Frete Gratis</Text>
      <View style={styles.discountContainer}>
        <Text style={styles.discountLabel}>Cupom de Desconto:</Text>
        <TextInput
          style={styles.couponInput}
          placeholder="Insira o cupom"
        />
      </View>
       <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>R$ {total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59283F',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemVariety: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
   quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#000',
  },
  cartItemTotal: {
    fontSize: 24,
    color: 'red',
    marginRight:10,
  },
  emptyCart: {
    color: '#fff',
    textAlign:'center',
    margin:10,
    fontSize: 25,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  discountLabel: {
    fontSize: 20,
    marginRight: 10,
    color: '#fff',
  },
  discountMensageLabel: {
    fontSize: 30,
    marginRight: 10,
    color: '#fff506',
  },
  couponInput: {
    height: 30,
    flex: 1,
    borderColor: '#ddd',
    backgroundColor:"#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: 'green',
  },
});

export default ShoppingCartScreen;
