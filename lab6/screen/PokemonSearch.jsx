// ✅ PokemonSearch.jsx (chuẩn React Native - đã sửa lỗi <h2>, <div>, <input>)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLazyGetPokemonByNameQuery } from './PokemonApi';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [trigger, { data, isFetching, error }] = useLazyGetPokemonByNameQuery();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thông tin Pokemon: {pokemonName}</Text>

      <TextInput
        value={pokemonName}
        onChangeText={setPokemonName}
        placeholder="Nhập tên pokemon"
        style={styles.input}
      />

      <Button title="Tìm kiếm pokemon" onPress={() => trigger(pokemonName)} color="orange" />

      {isFetching && <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />}
      {error && <Text style={styles.error}>Lỗi khi tìm kiếm!</Text>}

      {Array.isArray(data?.abilities) && (
  <View style={styles.resultBox}>
    <Text style={styles.resultTitle}>Abilities:</Text>
    {data.abilities.map((item, index) => (
      <Text key={index} style={styles.abilityItem}>{item.ability.name}</Text>
    ))}
  </View>
)}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },    
  resultBox: {
    marginTop: 20,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 8,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  abilityItem: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PokemonSearch;
