import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function FormCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} placeholderTextColor='#9E9E9E' onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} placeholderTextColor='#9E9E9E' onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={senha} placeholderTextColor='#9E9E9E' onChangeText={setSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Senha" value={confSenha} placeholderTextColor='#9E9E9E' onChangeText={setConfSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} placeholderTextColor='#9E9E9E' onChangeText={setTelefone} keyboardType="phone-pad" />

      <TouchableOpacity style={styles.botao} onPress={() => console.log('Login clicado')}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0,
    justifyContent: 'center'
  },
  titulo: { 
    fontSize: width * 0.18,
    fontWeight: '700', // deixa grosso, lá ele
    color: '#1E3A5F',
    marginBottom: height * 0.04,
  },
  input: {
    width: width * 0.8,
    height: height * 0.06,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 20,
    fontsize: width * 0.05,
    marginBottom: height * 0.02,
    borderRadius: 30
  },
  botao: {
    width: width * 0.8,
    height: height * 0.06,
    backgroundColor: '#2bc731ff',
    borderRadius: 30,
    alightItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01
  },
  botaoTexto: { 
    color: '#ffffff',
    fontWeight: '600',
    fontSize: width * 0.06,
    textAlign: 'center'
  },
  fazerLogin:{ 
    padding: 8,
    color: '#1080FF', 
    textDecorationLine: 'underline',
    marginBottom: 20 
  }
});