import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Login() {
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
            />
            <TextInput
            placeholder='Senha'
            placeholderTextColor='#9E9E9E' 
            style={styles.input} 
            />
            {/* botão do login grandão moss */}
            <TouchableOpacity style={styles.button} onPress={() => console.log('Login clicado')}>
            <Text style={styles.textoLogin}>Login</Text>
            </TouchableOpacity>
        </View>

        
    </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: height * 0.08,
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
    }
})