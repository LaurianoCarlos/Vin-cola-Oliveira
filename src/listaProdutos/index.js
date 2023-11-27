import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const wines = [
  { id: 1, variety: 'Tinto Premium', description: 'Vinho tinto encorpado com notas de frutas vermelhas.', price: 50.00, volume: '750ml', image: require('../assets/tintoPer.png') },
  { id: 2, variety: 'Branco Suave', description: 'Vinho branco leve e refrescante com aromas cítricos.', price: 40.00, volume: '500ml', image: require('../assets/garrafa2.png') },
  { id: 3, variety: 'Rosé Seco', description: 'Vinho rosé seco com sabores florais e frutados.', price: 45.00, volume: '750ml', image: require('../assets/garrafa3.png') },
  { id: 4, variety: 'Branco Clássico', description: 'Vinho branco clássico com nuances de carvalho.', price: 55.00, volume: '750ml', image: require('../assets/garrafa2.png') },
  { id: 5, variety: 'Tinto Reserva', description: 'Vinho tinto reserva envelhecido em barris de carvalho.', price: 80.00, volume: '750ml', image: require('../assets/tintoPer.png') },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [selectedWine, setSelectedWine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addToCart = (wine) => {
    const existingItem = cart.find((item) => item.id === wine.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === wine.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...wine, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const removeFromCart = (wine) => {
    const updatedCart = cart.filter((item) => item.id !== wine.id);
    setCart(updatedCart);
  };

  const openModal = (wine) => {
    setSelectedWine(wine);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedWine(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CarrinhoCompras', { cartItems: cart })}
          style={styles.carrinhoIcon}>
          <Icon name="shopping-cart" size={30} color="white" />
        </TouchableOpacity>
        <Image source={require('../assets/logoVin2.png')} style={styles.logo} />
        <Text style={styles.freteGratis}>Frete Grátis</Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Encontre seus favoritos"
            placeholderTextColor="black"
            style={styles.searchInput}
          />
          <Icon name="search" size={20} color="black" style={styles.searchIcon} />
        </View>
      </View>
      <ScrollView>
        {wines.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.wineItem}
            onPress={() => addToCart(item)}>
            <View style={styles.wineItemContent}>
              <Image source={item.image} style={styles.wineImage} />
              <View style={styles.wineTextContainer}>
                <Text style={styles.wineName}>{item.name}</Text>
                <Text style={styles.wineDescription}>{item.description}</Text>
                <View style={styles.addCart}>
                  <Text style={styles.winePrice}>R${item.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart(item)}>
                    <Text style={styles.cartButtonText}>
                      Adicionar ({item.quantity || 0})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedWine?.name}</Text>
            <Image source={selectedWine?.image} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{selectedWine?.description}</Text>
            <Text style={styles.modalPrice}>{selectedWine?.price}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  carrinhoIcon: {
    position: 'absolute',
    top: 10, 
    right: 10, 
  },
   container: {
    flex: 1,
    backgroundColor: '#59283F',
    padding: 2,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  freteGratis: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'JasnaBold',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 1,
    height: 50,
  },
  searchInput: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    marginBottom:10,
  },
  searchIcon: {
    marginRight: 10,
  },
  wineItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#40101D',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 2,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: '#40101D',
  },
  wineItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wineImage: {
    width: 70,
    height: 100,
  },
  wineTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10,
  },
  wineName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  wineDescription: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
  },
  winePrice: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    marginRight:20,
  },
  cartButton: {
    backgroundColor: '#B6BFB0',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#1E8E00',
  },
  addCart:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#59283F',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#B6BFB0',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButtonText: {
    color: '#1E8E00',
  },
});

export default HomeScreen;
