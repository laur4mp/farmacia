import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect  } from 'expo-router';

import CardProduto from "./cardProduto"; 
import TopBar from "./topbar";
import { produtos } from "../componentes/produtos";

const { width, height } = Dimensions.get("window");

const CHAVE_FAVORITOS = 'favoritos';
const CHAVE_CARRINHO = 'carrinho'; 

export default function TelaDeInicio() {
    const router = useRouter();
    const [favoritos, setFavoritos] = useState([]);
    
    const recomendadosIds = [1, 3, 4, 5];
    const produtosRecomendados = produtos.filter(p => recomendadosIds.includes(p.id));
    const todosProdutos = produtos;

    const carregarFavoritos = async () => {
        try {
            const favs = await AsyncStorage.getItem(CHAVE_FAVORITOS);
            setFavoritos(favs ? JSON.parse(favs) : []);
        } catch (e) {
            console.error("Erro ao carregar favoritos:", e);
            setFavoritos([]);
        }
    };
    
    useFocusEffect(
    React.useCallback(() => {
        carregarFavoritos();
    }, []));
    
    const toggleFavorito = async (id) => {
        let lista = [...favoritos];
        if (lista.includes(id)) {
            lista = lista.filter(item => item !== id);
        } else {
            lista.push(id);
        }
        setFavoritos(lista);
        try {
            await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível salvar a alteração de favoritos.');
        }
    };

    const handleAddToCart = async (idProduto, quantidade) => {
        if (quantidade <= 0) return;

        try {
            const produtoAdicionado = produtos.find(p => p.id === idProduto);
            if (!produtoAdicionado) {
                Alert.alert('Erro', 'Produto não encontrado.');
                return;
            }

            const estoqueAtual = produtoAdicionado.estoque || 0; 
            const nomeProduto = produtoAdicionado.nome;

            const carrinhoJson = await AsyncStorage.getItem(CHAVE_CARRINHO);
            let carrinho = carrinhoJson ? JSON.parse(carrinhoJson) : [];
            const itemIndex = carrinho.findIndex(item => item.id === idProduto);
            
            let quantidadeJaNoCarrinho = 0;
            if (itemIndex > -1) {
                quantidadeJaNoCarrinho = carrinho[itemIndex].quantidade;
            }

            const totalAposAdicao = quantidadeJaNoCarrinho + quantidade;

            if (totalAposAdicao > estoqueAtual) {
                Alert.alert(
                    'Estoque Insuficiente', 
                    `Não foi possível adicionar ${quantidade} unidades de ${nomeProduto}. O estoque disponível é de ${estoqueAtual} unidades, e você já tem ${quantidadeJaNoCarrinho} no carrinho.`
                );
                return;
            }

            if (itemIndex > -1) {
                carrinho[itemIndex].quantidade = totalAposAdicao;
                Alert.alert('Adicionado!', `${nomeProduto} (+${quantidade}) no carrinho. Total: ${carrinho[itemIndex].quantidade}`);
            } else {
                carrinho.push({ id: idProduto, quantidade: quantidade });
                Alert.alert('Adicionado!', `${nomeProduto} (${quantidade} unidades) adicionado ao carrinho.`);
            }

            await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        } catch (e) {
            console.error("Erro ao adicionar ao carrinho:", e);
            Alert.alert('Erro', 'Não foi possível adicionar o produto ao carrinho devido a um erro interno.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TopBar titulo={"IFarmácia"}/>
            
            <Text style={styles.subtitulo}>Buscar por categorias</Text>
            <View style={styles.categoriasRow}>
                <TouchableOpacity 
                    style={styles.categoria}
                    onPress={() => router.push({
                    pathname: "/categoria",
                    params: { categoria: "Medicamentos" }
                    })}>
                    <Text style={styles.catIcon}>o</Text>
                    <Text style={styles.catText}>Medicamentos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.categoria}
                    onPress={() => router.push({
                    pathname: "/categoria",
                    params: { categoria: "Beleza" }
                    })}>
                    <Text style={styles.catIcon}>o</Text>
                    <Text style={styles.catText}>Beleza</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.categoria}
                    onPress={() => router.push({
                    pathname: "/categoria",
                    params: { categoria: "Suplementos" }
                    })}>
                    <Text style={styles.catIcon}>o</Text>
                    <Text style={styles.catText}>Suplementos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.categoria}
                    onPress={() => router.push({
                    pathname: "/categoria",
                    params: { categoria: "Higiene" }
                    })}>
                    <Text style={styles.catIcon}>o</Text>
                    <Text style={styles.catText}>Higiene</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitulo}>Produtos recomendados</Text>
            
            <FlatList
                data={produtosRecomendados}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalList}
                contentContainerStyle={styles.horizontalContent}
                renderItem={({ item }) => (
                    <CardProduto
                        id={item.id}
                        nome={item.nome}
                        status={item.status}
                        preco={item.preco}
                        imagem={item.imagem}
                        favorito={favoritos.includes(item.id)}
                        onToggle={() => toggleFavorito(item.id)}
                        onAddToCart={handleAddToCart} 
                        estoque={item.estoque}
                    />
                )}
            />
            
            <Text style={{ marginTop: 5 }}></Text>
            <Text style={styles.subtitulo}>Opções de produtos para você</Text>
    
            <FlatList
                data={todosProdutos}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.gridContent}
                renderItem={({ item }) => (
                    <CardProduto
                        id={item.id}
                        nome={item.nome}
                        status={item.status}
                        preco={item.preco}
                        imagem={item.imagem}
                        favorito={favoritos.includes(item.id)}
                        onToggle={() => toggleFavorito(item.id)}
                        onAddToCart={handleAddToCart} 
                        estoque={item.estoque}
                    />
                )}
            />

            <Text style={{ marginTop: 50 }}></Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height * 0.04,
        paddingHorizontal: width * 0.05
    },
    subtitulo: {
        fontSize: width * 0.05,
        fontWeight: "700",
        marginBottom: height * 0.02,
        color: "#333"
    },
    categoriasRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: height * 0.03
    },
    categoria: {
        width: width * 0.20,
        alignItems: "center"
    },
    catIcon: {
        fontSize: width * 0.08,
        backgroundColor: "#2bc731ff",
        padding: width * 0.04,
        color: "#fff",
        borderRadius: 50
    },
    catText: {
        marginTop: height * 0.008,
        fontSize: width * 0.03,
        textAlign: "center",
        fontWeight: 'bold'
    },
    horizontalList: {
        marginHorizontal: -width * 0.05 
    },
    horizontalContent: {
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    columnWrapper: { 
        justifyContent: "space-between",
    },
    gridContent: { 
        paddingBottom: 30,
        marginHorizontal: -width * 0.05, 
        paddingHorizontal: width * 0.05, 
    },
    input: {
        flex: 1,
        height: height * 0.06,
        backgroundColor: "#E6E6E6",
        borderRadius: 30,
        paddingHorizontal: 20,
        fontSize: width * 0.045,
    },
    cartIcon: {
        fontSize: width * 0.065,
        color: "#fff"
    },
    viewCard: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});