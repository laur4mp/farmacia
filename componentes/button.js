import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function validarLogin() {
        const usuarioSalvo = await AsyncStorage.getItem('usuario');
        const senhaSalva = await AsyncStorage.getItem('senha');

        if (email === usuarioSalvo && senha === senhaSalva) {
            Alert.alert('Login bem-sucedido!');
            router.push('/telaInicial');

        } else {
            Alert.alert('E-mail ou senha incorretos.');
        }}

    async function Cadastro() {
        const linkCadastro = '../'
    }

    return (
    <View style={styles.container}>
        <View>
            {/*parte que vai ficar a logo e as bolinhas de enfeite, n pensei ainda como fazer*/}
        </View>

        <Text style={styles.titulos}>Login</Text>
        
        <View>
            {/*Parte q vai ficar os inputs*/}
            <TextInput
            placeholder='E-mail'
            placeholderTextColor='#9E9E9E'
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            />
            <TextInput
            placeholder='Senha'
            placeholderTextColor='#9E9E9E' 
            style={styles.input} 
            value={senha}
            onChangeText={text => setSenha(text)}
            secureTextEntry={true} //senha é no sigilo
            />
            {/* botão do login grandão moss */}
            <TouchableOpacity style={styles.button} onPress={validarLogin}>
            <Text style={styles.textoLogin}>Login</Text>
            </TouchableOpacity>

        </View>
        <Text style={styles.caixaLink}>
        Esqueceu sua senha?{' '}
        <Text style={styles.link} onPress={() => console.log('Clicou em Esqueci a senha')}>
          Clique aqui.
        </Text>
        </Text>

        <TouchableOpacity onPress={() => router.push('/cadastro')}>
            <Text style={styles.link}>
            Cadastre-se
            </Text>
        </TouchableOpacity>

    </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.08,
        justifyContent: 'center'
    },
    titulos: {
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
    button: {
        width: width * 0.8,
        height: height * 0.06,
        backgroundColor: '#2bc731ff',
        borderRadius: 30,
        alightItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.01
    },
    textoLogin: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: width * 0.06,
        textAlign: 'center'
    },
    caixaLink: {
        marginTop: height * 0.03,
        color: '#555',  
        fontSize: width * 0.04
    },
    link: {
        color: '#007BFF'
    }
})