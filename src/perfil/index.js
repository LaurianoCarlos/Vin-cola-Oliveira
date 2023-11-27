import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Perfil = () => {
  const [isUnderDevelopment, setIsUnderDevelopment] = useState(false);

  const showUnderDevelopmentMessage = () => {
    Alert.alert('Em Desenvolvimento', 'Essa funcionalidade está em desenvolvimento.');
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/logoOliveira.png')} 
        style={styles.profileImage}
      />

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="user" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="lock" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="bell" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="ticket" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Cupons</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="heart" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="map-marker" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Endereços</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={showUnderDevelopmentMessage}>
        <Icon name="history" size={20} style={styles.optionIcon} />
        <Text style={styles.optionText}>Histórico</Text>
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  optionIcon: {
    marginRight: 10,
    color: '#59283F',
  },
  optionText: {
    color: '#59283F',
    fontSize: 18,
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf:'center',
  },
});

export default Perfil;
