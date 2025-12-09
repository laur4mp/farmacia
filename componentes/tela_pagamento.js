import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const TelaEnderecoPagamento = () => {
  const [formaPagamento, setFormaPagamento] = useState('');
  const [endereco, setEndereco] = useState({
    nomeCompleto: '',
    rua: '',
    bairro: '',
    numero: '',
    cep: '',
    referencia: '',
    complemento: '',
    telefone: ''
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const jsonEndereco = await AsyncStorage.getItem('endereco_usuario');
        if (jsonEndereco != null) {
          setEndereco(JSON.parse(jsonEndereco));
        }

       
        const pagamentoSalvo = await AsyncStorage.getItem('forma_pagamento_selecionada');
        if (pagamentoSalvo) {
            setFormaPagamento(pagamentoSalvo);
        } else {
           
            setFormaPagamento('boleto'); 
        }

      } catch (e) {
        console.log('Erro ao carregar dados locais', e);
      }
    };
    carregarDados();
  }, []);

  // Função para atualizar o estado do endereço conforme digita
  const handleChange = (campo, valor) => {
    setEndereco(prevState => ({
      ...prevState,
      [campo]: valor
    }));
  };

  // Função para salvar no "back" (AsyncStorage neste caso)
  const handleContinuar = async () => {
    if (!endereco.rua || !endereco.numero || !endereco.cep) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios do endereço.");
      return;
    }

    try {
      await AsyncStorage.setItem('endereco_usuario', JSON.stringify(endereco));
      Alert.alert("Sucesso", `Dados salvos! Processando pagamento via: ${formaPagamento === 'cartao' ? 'Cartão' : 'Boleto'}`);
      
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Endereço</Text>

          <View style={styles.listaCampos}>
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome completo"
                value={endereco.nomeCompleto}
                onChangeText={(t) => handleChange('nomeCompleto', t)}
              />
            </View>

            <View style={styles.linhaDupla}>
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Rua/Avenida</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome da rua"
                  value={endereco.rua}
                  onChangeText={(t) => handleChange('rua', t)}
                />
              </View>

              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Bairro</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do bairro"
                  value={endereco.bairro}
                  onChangeText={(t) => handleChange('bairro', t)}
                />
              </View>
            </View>

            <View style={styles.linhaDupla}>
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Número</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nº"
                  keyboardType="numeric"
                  value={endereco.numero}
                  onChangeText={(t) => handleChange('numero', t)}
                />
              </View>

              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>CEP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="00000-000"
                  keyboardType="numeric"
                  value={endereco.cep}
                  onChangeText={(t) => handleChange('cep', t)}
                />
              </View>
            </View>

            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Ponto de Referência</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Próximo ao mercado"
                value={endereco.referencia}
                onChangeText={(t) => handleChange('referencia', t)}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Complemento</Text>
              <TextInput
                style={styles.input}
                placeholder="Apto, bloco, etc."
                value={endereco.complemento}
                onChangeText={(t) => handleChange('complemento', t)}
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Número de telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
                value={endereco.telefone}
                onChangeText={(t) => handleChange('telefone', t)}
              />
            </View>
          </View>
        </View>

    
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Pagamento</Text>
      
          <View style={styles.infoMetodoContainer}>
            <Text style={styles.rotuloCampo}>Método selecionado:</Text>
            <Text style={styles.textoMetodo}>
                {formaPagamento === 'cartao' ? 'Cartão de Crédito' : 'Boleto Bancário'}
            </Text>
          </View>

          {formaPagamento === 'cartao' && (
            <View style={styles.listaCampos}>
                <View style={styles.campo}>
                <Text style={styles.rotuloCampo}>Número do cartão</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    keyboardType="numeric"
                    maxLength={16}
                />
                </View>

                <View style={styles.campo}>
                <Text style={styles.rotuloCampo}>Nome no cartão</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Como está o nome no cartão"
                    autoCapitalize="words"
                />
                </View>

                <View style={styles.linhaDupla}>
                <View style={[styles.campo, styles.campoPequeno]}>
                    <Text style={styles.rotuloCampo}>Validade</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="MM/AA"
                    maxLength={5}
                    />
                </View>

                <View style={[styles.campo, styles.campoPequeno]}>
                    <Text style={styles.rotuloCampo}>Código de segurança</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                    />
                </View>
                </View>
            </View>
          )}
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.botaoContinuar} onPress={handleContinuar} onPressIn={() => router.push('/pedidos')}>
        <Text style={styles.textoBotao}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  secao: {
    marginBottom: 25,
  },

  tituloSecao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingBottom: 5,
  },

  listaCampos: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  campo: {
    marginBottom: 15,
  },

  linhaDupla: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  campoPequeno: {
    width: '48%',
  },

  rotuloCampo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },

  botaoContinuar: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Estilos simples para mostrar o método carregado
  infoMetodoContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  textoMetodo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }

});

export default TelaEnderecoPagamento;