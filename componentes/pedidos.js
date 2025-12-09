import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";


const CHAVE_CARRINHO = 'carrinho'; 
const CHAVE_PAGAMENTO = 'forma_pagamento_selecionada'; 


const CHAVE_PEDIDO_DETALHES = 'detalhes_ultimo_pedido';
const CHAVE_ENDERECO = 'endereco_usuario';

const parsePreco = (precoString) => {
    if (typeof precoString === 'number') return precoString;
    if (!precoString) return 0;
    return parseFloat(precoString.replace('R$', '').replace('.', '').replace(',', '.').trim());
};

const TelaPedidoFinal = () => {
    const router = useRouter(); 
    const [enderecoCarregado, setEnderecoCarregado] = useState(null);
    const [formaPagamentoCarregada, setFormaPagamentoCarregada] = useState('N/A');
    const [produtosPedido, setProdutosPedido] = useState([]); // Array de produtos do pedido
    const [valorTotal, setValorTotal] = useState(0); // Valor total calculado
    const [isLoading, setIsLoading] = useState(true);
    const carregarDadosDoPedido = useCallback(async () => {
        try {
            const jsonEndereco = await AsyncStorage.getItem(CHAVE_ENDERECO);
            if (jsonEndereco) {
                setEnderecoCarregado(JSON.parse(jsonEndereco));
            }
            const pagamento = await AsyncStorage.getItem(CHAVE_PAGAMENTO);
            if (pagamento) {
                const formattedPayment = pagamento === 'cartao' 
                    ? 'Cartão de Crédito' 
                    : pagamento === 'boleto' 
                    ? 'Boleto Bancário' 
                    : 'Forma Desconhecida';
                setFormaPagamentoCarregada(formattedPayment);
            }
            const jsonPedidoDetalhes = await AsyncStorage.getItem(CHAVE_PEDIDO_DETALHES);

            if (jsonPedidoDetalhes) {
                const detalhes = JSON.parse(jsonPedidoDetalhes);
                setProdutosPedido(detalhes.produtos || []);
                setValorTotal(detalhes.total || 0);
            } else {
                console.warn("Detalhes do último pedido não encontrados.");
                setProdutosPedido([]);
                setValorTotal(0);
            }
        } catch (e) {
            console.error("Erro ao carregar dados do pedido:", e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        carregarDadosDoPedido();
    }, [carregarDadosDoPedido]);
    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#6FC24B" />
                <Text style={styles.loadingText}>Carregando detalhes do pedido...</Text>
            </View>
        );
    }
    const endereco = enderecoCarregado || {};
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.push('/')} 
                >
                    <Ionicons name="arrow-back" size={20} color="#333" /> 
                </TouchableOpacity>
                <Text style={styles.tituloHeader}>Pedido</Text>
                <View style={styles.spacer} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={[styles.card, styles.cardVerdeEscuro]}>
                    <Text style={styles.tituloCard}>Produtos</Text>
                    
                    {produtosPedido.length > 0 ? (
                        produtosPedido.map((item, index) => (
                            <Text key={index} style={styles.textoProduto}>
                                {item.quantidade || 1} x {item.nome} - R$ {parsePreco(item.subtotal || item.preco).toFixed(2).replace('.', ',')}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.textoProduto}>Nenhum produto encontrado neste pedido.</Text>
                    )}

                    <Text style={styles.textoTotal}>Total: R$ {valorTotal.toFixed(2).replace('.', ',')}</Text>
                    <Text style={styles.textoPagamento}>Forma de pagamento selecionada: **{formaPagamentoCarregada}**</Text>
                </View>

                <View style={[styles.card, styles.cardVerdeEscuro]}>
                    <Text style={styles.tituloCard}>Endereço de entrega</Text>
                    
                    {enderecoCarregado ? (
                        <>
                            <Text style={styles.textoEndereco}>Destinatário: {endereco.nomeCompleto || 'N/A'}</Text>
                            <Text style={styles.textoEndereco}>Rua: {endereco.rua || 'N/A'}, {endereco.numero || 'S/N'}</Text>
                            <Text style={styles.textoEndereco}>Bairro: {endereco.bairro || 'N/A'}</Text>
                            <Text style={styles.textoEndereco}>CEP: {endereco.cep || 'N/A'}</Text>
                            <Text style={styles.textoEndereco}>Ponto de Ref: {endereco.referencia || 'Nenhum'}</Text>
                            <Text style={styles.textoEndereco}>Tel: {endereco.telefone || 'N/A'}</Text>
                        </>
                    ) : (
                        <Text style={styles.textoEndereco}>Endereço não encontrado. Por favor, cadastre um endereço.</Text>
                    )}
                </View>
                <View style={[styles.card, styles.cardVerdeClaro]}>
                    <Text style={styles.textoStatus}>
                        Seu pedido está sendo preparado. Aguarde pela entrega no endereço fornecido.
                    </Text>
                </View>

                <View style={{ height: 100 }} /> 

            </ScrollView>
            <View style={styles.rodapeFundo} /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    
    // --- Estilos do Cabeçalho ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tituloHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#fff', 
        borderColor: '#ddd', 
        borderWidth: 1, 
        marginRight: 10,
    },
    backIcon: { // Este estilo não é mais usado, o Ionicons faz o trabalho.
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    spacer: {
        width: 40,
    },

    // --- Estilos do Conteúdo ---
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    card: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardVerdeEscuro: {
        backgroundColor: '#6FC24B',
    },
    cardVerdeClaro: {
        backgroundColor: '#98D879',
    },
    
    // Estilos para Seção de Produtos
    tituloCard: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        paddingBottom: 5,
    },
    textoProduto: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 3,
    },
    textoTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    textoPagamento: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },

    // Estilos para Seção de Endereço
    textoEndereco: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 3,
    },

    // Estilos para Seção de Status
    textoStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 22,
    },

    // Estilo do rodapé inferior verde (parte inferior da tela)
    rodapeFundo: {
        height: 100,
        backgroundColor: '#6FC24B',
        position: 'absolute',
        bottom: 0, 
        left: 0,
        right: 0,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
});

export default TelaPedidoFinal;