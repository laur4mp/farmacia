import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CarrinhoCompras = () => {
  const itensCarrinho = [
    {
      id: 1,
      nome: 'Dipirona Monoidratada',
      detalhes: '10 comprimidos',
    },
    {
      id: 2,
      nome: 'Paracetamol',
      detalhes: '10 comprimidos',
    },
  ];

  const valorTotal = 12.98;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>
      
      <ScrollView style={styles.listaItens}>
        {itensCarrinho.map(item => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.nomeItem}>{item.nome}</Text>
            <Text style={styles.detalhesItem}>{item.detalhes}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.containerTotal}>
        <Text style={styles.textoTotal}>TOTAL R$ {valorTotal.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.botaoFinalizar}>
        <Text style={styles.textoBotao}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },

  listaItens: {
    flex: 1,
  },

  item: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  nomeItem: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  detalhesItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  containerTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 15,
    marginVertical: 15,
  },

  textoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  botaoFinalizar: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default CarrinhoCompras;