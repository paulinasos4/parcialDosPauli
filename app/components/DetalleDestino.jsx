import axiosClient from '../servicio/axios';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetalleDestino = ({ destino, refreshDestinos }) =>  {

  const toggleFavorite = async () => {
    try {
      await axiosClient.patch(`/destino/${destino.id}`, { isFavorite: !destino.isFavorite });
      refreshDestinos();
    } catch (error) {
      console.error('no puede marcar favorito:', error);
    }
  };
  
  const deleteDestino = async () => {
    try {
      await axiosClient.delete(`/destino/${destino.id}`);
      refreshDestinos();
    } catch (error) {
      console.error('no puede eliminar destino:', error);
    }
  };



  return (
    <View style={styles.card}>
      <Text style={styles.name}>{destino.name}</Text>
      <Text>{destino.difficulty}</Text>
      <View style={styles.buttons}>
        <Button title="favorito" onPress={toggleFavorite} />
        <Button title="eliminar" onPress={deleteDestino} />
      </View>
    </View>
  );
}

export default DetalleDestino;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
