import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produtos } from "../componentes/produtos";

const CHAVE_FAVORITOS = "favoritos";

const TelaFavoritos = () => {

  const [favoritos, setFavoritos] = useState([]);
  const carregarFavoritos = async () => {
    try {
      const storage = await AsyncStorage.getItem(CHAVE_FAVORITOS);
      const ids = storage ? JSON.parse(storage) : [];
      const filtrados = produtos.filter(p => ids.includes(p.id));
      setFavoritos(filtrados);
    } catch (error) {
      console.log("Erro ao carregar favoritos", error);
    }
  };

  // Carrega favoritos quando a tela abre
  useEffect(() => {
    carregarFavoritos();
  }, []);

  // Função para remover um item dos favoritos
  const removerFavorito = async (id, nome) => {
  Alert.alert(
    'Remover dos favoritos',
    `Deseja remover "${nome}" dos seus favoritos?`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            // Remove da lista atual
            const novosFavoritos = favoritos.filter(item => item.id !== id);
            setFavoritos(novosFavoritos);

            // Atualiza o AsyncStorage
            const ids = novosFavoritos.map(item => item.id);
            await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(ids));

            Alert.alert('Sucesso', `${nome} foi removido dos favoritos!`);
          } catch (error) {
            console.log("Erro ao remover favorito", error);
          }
        },
      },
    ]
  );
};

  // Função para limpar todos os favoritos
  const limparTodosFavoritos = () => {
    if (favoritos.length === 0) {
      Alert.alert('Aviso', 'Não há itens para remover.');
      return;
    }
    
    Alert.alert(
      'Limpar todos os favoritos',
      `Deseja remover todos os ${favoritos.length} itens dos favoritos?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar tudo',
          style: 'destructive',
          onPress: async () => {
            try {
              setFavoritos([]);
              await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([]));
              Alert.alert('Sucesso', 'Todos os itens foram removidos dos favoritos!');
            } catch (error) {
              console.log("Erro ao limpar favoritos", error);
              Alert.alert('Erro', 'Não foi possível limpar os favoritos.');
            }
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>Favoritos</Text>
        <Text style={styles.subtituloCabecalho}>
          {favoritos.length} {favoritos.length === 1 ? 'item' : 'itens'} salvos
        </Text>
        
        {favoritos.length > 0 && (
          <TouchableOpacity 
            style={styles.botaoLimparTudo} 
            onPress={limparTodosFavoritos}
          >
            <Text style={styles.textoBotaoLimpar}>Limpar todos</Text>
          </TouchableOpacity>
        )}
      </View>

      {favoritos.length === 0 ? (
        <View style={styles.containerVazio}>
          <Ionicons name="heart-outline" size={80} color="#DDD" />
          <Text style={styles.textoListaVazia}>Sua lista de favoritos está vazia</Text>
          <Text style={styles.textoInstrucao}>
            Toque no ícone de coração em qualquer produto para adicioná-lo aqui
          </Text>
        </View>
      ) : (
        favoritos.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.infoProduto}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.descricaoProduto}>{item.estoque} comprimidos</Text>
            </View>
            <View style={styles.containerAcoes}>
              <Text style={styles.preco}>{item.preco}</Text>
              <TouchableOpacity 
                style={styles.botaoRemover}
                onPress={() => removerFavorito(item.id, item.nome)}
              >
                <Ionicons name="heart" size={24} color="#FF6B6B" />
                <Text style={styles.textoRemover}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  cabecalho: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  tituloCabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  subtituloCabecalho: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  botaoLimparTudo: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFF5F5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },

  textoBotaoLimpar: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 14,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  infoProduto: {
    flex: 1,
  },

  nomeProduto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  descricaoProduto: {
    fontSize: 14,
    color: '#666',
  },

  containerAcoes: {
    alignItems: 'flex-end',
  },

  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },

  botaoRemover: {
    alignItems: 'center',
    padding: 4,
  },

  textoRemover: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 2,
  },

  containerVazio: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },

  textoListaVazia: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },

  textoInstrucao: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },

});

export default TelaFavoritos;