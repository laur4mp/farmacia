import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { produtos } from '../componentes/produtos'; 
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

const CHAVE_CARRINHO = 'carrinho'; 

//para converter o preço string formatado em um número float
const parsePreco = (precoString) => {
    if (!precoString) return 0;
    // Assume que o preço está no formato "R$ X,XX"
    return parseFloat(precoString.replace('R$', '').replace('.', '').replace(',', '.').trim());
};

export default function CarrinhoCompras() {
    const router = useRouter();

    const [itensCarrinhoDetalhado, setItensCarrinhoDetalhado] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const calcularCarrinho = useCallback((carrinhoSalvo) => {
        let totalGeral = 0;
        const itensDetalhado = carrinhoSalvo.map(itemSalvo => {
            const produtoDetalhe = produtos.find(p => p.id === itemSalvo.id);
            if (!produtoDetalhe) return null; 
            const precoUnitarioNumerico = parsePreco(produtoDetalhe.preco);
            const subtotalNumerico = precoUnitarioNumerico * itemSalvo.quantidade;
            totalGeral += subtotalNumerico;
            return {
                ...itemSalvo,
                nome: produtoDetalhe.nome,
                precoUnitario: produtoDetalhe.preco.replace('R$', '').trim(),
                detalhes: produtoDetalhe.detalhes || 'Comprimidos', 
                subtotal: subtotalNumerico.toFixed(2), 
            };
        }).filter(item => item !== null);

        setItensCarrinhoDetalhado(itensDetalhado);
        setValorTotal(totalGeral);
    }, []);
    const carregarCarrinho = useCallback(async () => {
        setIsLoading(true);
        try {
            const carrinhoJson = await AsyncStorage.getItem(CHAVE_CARRINHO);
            const carrinhoSalvo = carrinhoJson ? JSON.parse(carrinhoJson) : [];
            calcularCarrinho(carrinhoSalvo);
        } catch (error) {
            console.error("Erro ao carregar ou calcular carrinho:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados do carrinho.");
        } finally {
            setIsLoading(false);
        }
    }, [calcularCarrinho]);

    const atualizarQuantidade = async (id, novaQuantidade) => {
        if (novaQuantidade < 1) {
            removerItem(id);
            return;
        }

        try {
            const carrinhoJson = await AsyncStorage.getItem(CHAVE_CARRINHO);
            let carrinho = carrinhoJson ? JSON.parse(carrinhoJson) : [];
            
            const itemIndex = carrinho.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                //  Não permite adicionar mais do que o estoque disponível
                const produtoEstoque = produtos.find(p => p.id === id).estoque || Infinity;
                
                if (novaQuantidade > produtoEstoque) {
                     Alert.alert('Limite de Estoque', 'Não é possível adicionar mais unidades deste produto.');
                     return;
                }

                carrinho[itemIndex].quantidade = novaQuantidade;
                await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
                
                calcularCarrinho(carrinho); 
            }
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível atualizar a quantidade.');
        }
    };
    
    const removerItem = async (id) => {
        try {
            const carrinhoJson = await AsyncStorage.getItem(CHAVE_CARRINHO);
            let carrinho = carrinhoJson ? JSON.parse(carrinhoJson) : [];
            
            const carrinhoAtualizado = carrinho.filter(item => item.id !== id);
            
            await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinhoAtualizado));
            
            calcularCarrinho(carrinhoAtualizado);
            
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível remover o item.');
        }
    };

    useEffect(() => {
        carregarCarrinho(); 
    }, [carregarCarrinho]);

    const renderItem = (item) => (
        <View key={item.id} style={styles.item}>
            <View style={styles.itemDetails}>
                <Text style={styles.nomeItem} numberOfLines={1}>{item.nome}</Text>
                <Text style={styles.detalhesItem}>{item.detalhes}</Text>
                <Text style={styles.subtotalItem}>R$ {item.precoUnitario}</Text>
            </View>

            <View style={styles.itemControls}>
                <Text style={styles.itemSubtotalText}>Total: R$ {item.subtotal.replace('.', ',')}</Text>
                
                <View style={styles.controlButtons}>
                    <TouchableOpacity 
                        style={styles.controlButton} 
                        onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                    >
                        <Ionicons name="add-circle" size={28} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.itemQuantityValue}>{item.quantidade}</Text>

                    <TouchableOpacity 
                        style={styles.controlButton} 
                        onPress={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                    >
                        <Ionicons name="remove-circle" size={28} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.controlButton, styles.removeButton]} 
                        onPress={() => removerItem(item.id)}
                    >
                        <Ionicons name="close-circle" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={'#2bc731ff'} />
            </View>
        );
    }
    const carrinhoVazio = itensCarrinhoDetalhado.length === 0;

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.titulo}>Carrinho</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.listaItens}>
                {carrinhoVazio ? (
                    <View style={styles.carrinhoVazio}>
                        <Text style={styles.textoVazio}>Seu carrinho está vazio.</Text>
                    </View>
                ) : (
                    itensCarrinhoDetalhado.map(renderItem)
                )}
                <View style={{ height: 160 }} />
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.totalArea}>
                    <Text style={styles.textoTotal}>TOTAL R$ {valorTotal.toFixed(2).replace('.', ',')}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.botaoFinalizar, carrinhoVazio && styles.botaoDesativado]}
                    disabled={carrinhoVazio}
                    onPress={() => router.push("/finalizarCompras")}>
                    <Text style={styles.textoBotao}>Finalizar compra</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#fff',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 40,
        padding: 5,
        zIndex: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    listaItens: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 10,
    },
    item: {
        backgroundColor: '#2bc731ff', 
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 100, 
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    nomeItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 2,
    },
    detalhesItem: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    subtotalItem: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    itemControls: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    itemSubtotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    controlButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00B207', 
        borderRadius: 15,
        padding: 3,
    },
    controlButton: {
        paddingHorizontal: 2,
    },
    itemQuantityValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    removeButton: {
        marginLeft: 8,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff', 
    },
    totalArea: {
        backgroundColor: '#2bc731ff', 
        paddingVertical: 20,
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
        alignItems: 'center',
        marginBottom: -5, 
    },
    textoTotal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    botaoFinalizar: {
        backgroundColor: '#fff', 
        borderRadius: 50,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 30, 
        marginBottom: 30, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 6,
    },
    textoBotao: {
        color: '#00B207', 
        fontSize: 18,
        fontWeight: 'bold',
    },
    botaoDesativado: {
        backgroundColor: '#f0f0f0',
        borderColor: '#ccc',
        borderWidth: 1,
    },
   
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carrinhoVazio: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    textoVazio: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    }
});