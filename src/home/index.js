import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';

const HomeScreen = ({ navigation, route, setCartItems }) => {
  const [selectedWine, setSelectedWine] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Certifique-se de obter o carrinho da propriedade de rota
  const cartItems = route.params?.cartItems || [];

  const defaultProduct = {
    variety: 'Produto Sem Imagem',
    description: 'Descrição não disponível.',
    price: 'R$ 0,00',
    volume: 'N/A',
    image: require('../assets/garrafa2.png'), // Substitua pelo caminho real da sua imagem padrão
  };

  const wines = [
    { id: 1, ...defaultProduct, variety: 'Tinto Premium', description: 'Vinho tinto encorpado com notas de frutas vermelhas.', price: 50.00, volume: '750ml', image: require('../assets/tintoPer.png') },
    { id: 2, ...defaultProduct, variety: 'Branco Suave', description: 'Vinho branco leve e refrescante com aromas cítricos.', price: 40.00, volume: '500ml', image: require('../assets/garrafa2.png') },
    { id: 3, ...defaultProduct, variety: 'Rosé Seco', description: 'Vinho rosé seco com sabores florais e frutados.', price: 45.00, volume: '750ml', image: require('../assets/garrafa3.png') },
    { id: 4, ...defaultProduct, variety: 'Branco Clássico', description: 'Vinho branco clássico com nuances de carvalho.', price: 55.00, volume: '750ml', image: require('../assets/garrafa2.png') },
    { id: 5, ...defaultProduct, variety: 'Tinto Reserva', description: 'Vinho tinto reserva envelhecido em barris de carvalho.', price: 80.00, volume: '750ml', image: require('../assets/tintoPer.png') },
  ];

  const additionalImages = [
    require('../assets/Uruguai.png'),
    require('../assets/Chile.png'),
    require('../assets/Br.png'),
    require('../assets/Argen.png'),
  ];

  const additionalCarouselImages = [
    require('../assets/Oferta.png.png'),
    require('../assets/corouselcinza.png'),
    require('../assets/carouselescuro.png'),
  ];

  const openModal = (wine) => {
    setSelectedWine(wine);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const addToCart = () => {
  if (selectedWine) {
    closeModal();

    const existingItem = cartItems.find(item => item.id === selectedWine.id);
    const updatedCartItems = cartItems.map(item =>
      item.id === selectedWine.id
        ? { ...item, quantity: item.quantity + 1, total: item.total + selectedWine.price }
        : item
    );

    if (!existingItem) {
      updatedCartItems.push({
        ...selectedWine,
        quantity: 1,
        total: selectedWine.price,
      });
    }
    navigation.setParams({ cartItems: updatedCartItems });

    setSelectedWine(null);
  }
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CarrinhoCompras', { cartItems })} style={styles.carrinhoIcon}>
          <Icon name="shopping-cart" size={30} color="white" />
        </TouchableOpacity>
        <Image source={require('../assets/logoVin2.png')} style={styles.logo} />
        <View style={styles.searchBox}>
          <TextInput placeholder="Encontre seus favoritos" placeholderTextColor="black" style={styles.searchInput} />
          <Icon name="search" size={20} color="black" style={styles.searchIcon} />
        </View>
        <Carousel
          data={additionalCarouselImages}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ListaProdutos')}>
              <Image source={item} style={styles.additionalImage} />
            </TouchableOpacity>
          )}
          sliderWidth={390}
          itemWidth={390}
        />
      </View>

      <View style={styles.visualInputsContainer}>
        <View style={styles.visualInput}></View>
        <View style={styles.visualInput}></View>
        <View style={styles.visualInput}></View>
      </View>

      <View style={styles.additionalImagesContainer}>
        {additionalImages.map((item, index) => (
          <Image key={index} source={item} style={styles.additionalImageSmall} />
        ))}
      </View>

      <Text style={styles.title}>OFERTAS DO DIA:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {wines.length > 0 ? (
          wines.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.wineItem}
              onPress={() => openModal(item)}
            >
              <View style={styles.wineImageContainer}>
                <Image source={item.image} style={styles.wineImage} />
              </View>
              <Text style={styles.wineText}>{item.variety}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyWines}>Não há ofertas no momento.</Text>
        )}
      </ScrollView>

      <Text style={styles.title}>RECOMENDADOS:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {wines.length > 0 ? (
          wines.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.wineItem}
              onPress={() => openModal(item)}
            >
              <View style={styles.wineImageContainer}>
                <Image source={item.image} style={styles.wineImage} />
              </View>
              <Text style={styles.wineText}>{item.variety}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyWines}>Não há recomendações no momento.</Text>
        )}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={selectedWine?.image} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedWine?.variety}</Text>
            <Text style={styles.modalDescription}>{selectedWine?.description}</Text>
            <Text style={styles.modalPrice}>Preço: {selectedWine?.price}</Text>
            <Text style={styles.modalVolume}>Volume: {selectedWine?.volume}</Text>
            <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  searchIcon: {
    marginRight: 10,
  },
  additionalImage: {
    width: 390,
    height: 220,
    marginTop: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
    marginBottom: 1,
  },
  wineItem: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#40101D',
    padding: 15,
    marginVertical: 0,
    marginHorizontal: 2,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: '#40101D',
  },
  wineImageContainer: {
    backgroundColor: '#40101D',
    padding: 10,
    borderRadius: 10,
  },
  wineImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  wineText: {
    color: 'yellow',
    marginTop: 5,
  },
  additionalImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 60,
  },
  additionalImageSmall: {
    width: 40,
    height: 40,
  },
  visualInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  visualInput: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#40101e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  addToCartButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalDescription: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalPrice: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  modalVolume: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  carrinhoIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
