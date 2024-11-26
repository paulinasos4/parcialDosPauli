import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import DetalleDestino from '../components/DetalleDestino';
import axiosClient from '../servicio/axios';

export default function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const fetchDestinos = async () => {
    try {
      const response = await axiosClient.get('');
      console.log(response);
      const sortedDestinos = response.data.sort((a: { isFavorite: any; name: string; }, b: { isFavorite: any; name: any; }) => {
        if (a.isFavorite === b.isFavorite) return a.name.localeCompare(b.name);
        return a.isFavorite ? -1 : 1;
      });
      setDestinos(sortedDestinos);
    } catch (error) {
      console.error('Error al cargar los destinos:', error);
    }
  };
  useEffect(() => {
    fetchDestinos();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={destinos}
        renderItem={(item) => (
          <DetalleDestino destino={item} refreshDestinos={fetchDestinos} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxWidth: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
  },
});
