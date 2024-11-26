import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AgregarEditarDestinos({ route, navigation }) {
  
  const { destino } = route?.params || {};
  const [name, setName] = useState(destino?.name || '');
  const [description, setDescription] = useState(destino?.description || '');
  const [difficulty, setDifficulty] = useState(destino?.difficulty || '');

  const saveDestino = async () => {
    try {
      if (destino?.id) {
        await axios.put(`/destinos/${destino.id}`, { name, description, difficulty });
      } else {
        await axios.post('/destinos', { name, description, difficulty, isFavorite: false });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el destino:', error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="descripcion"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="dificultad (facil, moderada, dificil)"
        value={difficulty}
        onChangeText={setDifficulty}
        style={styles.input}
      />
      <Button title="guardar" onPress={saveDestino} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
});
