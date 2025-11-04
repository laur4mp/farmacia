import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function FormCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Senha" value={confSenha} onChangeText={setConfSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

      <Text style={styles.fazerLogin}>Esqueci a senha</Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', paddingHorizontal: 20 },
  titulo: { fontSize: 50, fontWeight: 'bold', marginBottom: 20, color: '#043F75' },
  input: {
    width: '85%', height: 50, borderWidth: 1, borderColor: '#ccc',
    backgroundColor:'#D3D5D1', borderRadius: 75, marginBottom: 15, paddingHorizontal: 20, color: '#6C6C6C',
  },
  botao: {
    backgroundColor: '#4CAF50', width: '75%', padding: 15, borderRadius: 75, alignItems: 'center'
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  fazerLogin:{ color: '#1080FF', textDecorationLine: 'underline', marginBottom: 20 }
});
