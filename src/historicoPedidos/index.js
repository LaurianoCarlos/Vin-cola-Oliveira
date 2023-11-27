import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HistoricoPedidos = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const historicoPedidos = [
    {
      id: '1',
      data: '2023-11-22',
      total: 'R$ 150,00',
      produtos: [
        { nome: 'Vinho Tinto', quantidade: 2, preco: 'R$ 50,00', imagem: require('../assets/garrafa2.png') },
        { nome: 'Vinho Branco', quantidade: 1, preco: 'R$ 50,00', imagem: require('../assets/garrafa2.png') },
      ],
    },
    {
      id: '2',
      data: '2023-11-20',
      total: 'R$ 130,00',
      produtos: [
        { nome: 'Vinho Rosé', quantidade: 1, preco: 'R$ 40,00', imagem: require('../assets/garrafa3.png') },
        { nome: 'Vinho Tinto Reserva', quantidade: 1, preco: 'R$ 40,00', imagem: require('../assets/garrafa2.png') },
        { nome: 'Vinho Branco', quantidade: 1, preco: 'R$ 50,00', imagem: require('../assets/garrafa3.png') },
      ],
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.pedidoContainer}>
      <View style={styles.textMotoContainer}>
        <Icon name="motorcycle" size={20} color="green" style={styles.iconeMoto} />
        <Text style={styles.tituloDireita}> Pedido Entregue</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Image source={item.produtos[0].imagem} style={styles.garrafaImage} />
          <Text style={styles.quantidadeCarrinho}>Itens: {item.produtos.length}</Text>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.dataPedido}>{item.data}</Text>
          <Text style={styles.totalPedido}>Total: {item.total}</Text>
          <Text style={styles.produtosPedido}>Produtos:</Text>
          {item.produtos.map((produto, index) => (
            <Text key={index} style={styles.produtoItem}>
              {produto.nome} - {produto.quantidade} x {produto.preco}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.comprarNovamenteButton}
            onPress={() => handleComprarNovamente(item.id)}
          >
            <Text style={styles.comprarNovamenteButtonText}>Comprar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleComprarNovamente = (pedidoId) => {
   
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoOliveira.png')} style={styles.profileImage} />
      <Text style={styles.title}>Meus Pedidos</Text>
      <FlatList
        data={historicoPedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {showSuccessMessage && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>Pedido efetuado com sucesso!</Text>
        </View>
      )}
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
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  pedidoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  garrafaImage: {
    width: 100,
    height: 200,
    resizeMode: 'contain',
  },
  quantidadeCarrinho: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  mainContent: {
    flex: 1,
    marginLeft: 10,
  },
  dataPedido: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalPedido: {
    fontSize: 16,
    marginBottom: 10,
  },
  produtosPedido: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  produtoItem: {
    fontSize: 14,
    marginLeft: 15,
  },
  comprarNovamenteButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  comprarNovamenteButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  textMotoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  tituloDireita: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  iconeMoto: {
    marginLeft: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  successMessageContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HistoricoPedidos;
