import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { produtos as produtosGlobais } from '../componentes/produtos'; 
import { useRouter } from "expo-router";

const CHAVE_CARRINHO = 'carrinho'; 
const CHAVE_PAGAMENTO = 'forma_pagamento_selecionada'; 
const CHAVE_PRODUTOS_GLOBAL = 'produtos_global'; 
// NOVO: Chave para salvar os detalhes do pedido final antes de limpar o carrinho.
const CHAVE_PEDIDO_DETALHES = 'detalhes_ultimo_pedido'; 

const parsePreco = (precoString) => {
    if (!precoString) return 0;
    return parseFloat(precoString.replace('R$', '').replace('.', '').replace(',', '.').trim());
};

const TelaFinalizarCompra = () => { 
    const router = useRouter();
    const [formaPagamento, setFormaPagamento] = useState('boleto');
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);
    const [valorTotalProdutos, setValorTotalProdutos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false); 
    const [error, setError] = useState(null);
    
    const alterarFormaPagamento = async (novaForma) => {
        setFormaPagamento(novaForma);
        try {
            await AsyncStorage.setItem(CHAVE_PAGAMENTO, novaForma);
        } catch (e) {
            console.log('Erro ao salvar forma de pagamento:', e);
        }
    };

    const carregarEstoqueAtual = async () => {
        const estoqueJson = await AsyncStorage.getItem(CHAVE_PRODUTOS_GLOBAL);
        if (estoqueJson) {
            return JSON.parse(estoqueJson);
        }
        return produtosGlobais;
    };


    const carregarEProcessarCarrinho = useCallback(async () => {
        // ... (código existente para carregar carrinho e estoque)
        setIsLoading(true);
        setError(null);
        let totalGeral = 0;

        try {
            const carrinhoJson = await AsyncStorage.getItem(CHAVE_CARRINHO);
            const carrinhoSalvo = carrinhoJson ? JSON.parse(carrinhoJson) : [];

            const pagamentoSalvo = await AsyncStorage.getItem(CHAVE_PAGAMENTO);
            if (pagamentoSalvo) {
                setFormaPagamento(pagamentoSalvo);
            }
            
            const estoqueAtual = await carregarEstoqueAtual();
            
            if (carrinhoSalvo.length === 0) {
                setProdutosCarrinho([]);
                setValorTotalProdutos(0);
                setIsLoading(false);
                return;
            }

            const itensDetalhado = carrinhoSalvo.map(itemSalvo => {
                const produtoDetalhe = estoqueAtual.find(p => p.id === itemSalvo.id);
                
                if (!produtoDetalhe) {
                    return null;
                } 
                
                const precoUnitarioNumerico = parsePreco(produtoDetalhe.preco);
                const subtotalNumerico = precoUnitarioNumerico * itemSalvo.quantidade;
                totalGeral += subtotalNumerico;

                return {
                    id: itemSalvo.id,
                    nome: produtoDetalhe.nome,
                    descricao: produtoDetalhe.detalhes || 'Comprimidos',
                    preco: precoUnitarioNumerico, 
                    quantidade: itemSalvo.quantidade, 
                    subtotal: subtotalNumerico, 
                    estoque: produtoDetalhe.estoque, 
                };
            }).filter(item => item !== null);

            setProdutosCarrinho(itensDetalhado);
            setValorTotalProdutos(totalGeral);

        } catch (err) {
            console.error("Erro ao carregar carrinho:", err);
            setError("Não foi possível carregar os produtos do seu carrinho.");
        } finally {
            setIsLoading(false);
        }
        // ... (fim do código existente)
    }, []);
    
    const frete = 0;
    const valorTotalGeral = valorTotalProdutos + frete;

    // FUNÇÃO ATUALIZADA: Agora salva os produtos comprados antes de limpar o carrinho.
    const handleConfirmarCompra = async () => {
        setIsProcessing(true);
        
        try {
            const estoqueAtual = await carregarEstoqueAtual();
            let estoqueSuficiente = true;
            
            // 1. Validação final de estoque
            for (const item of produtosCarrinho) {
                const produtoEmEstoque = estoqueAtual.find(p => p.id === item.id);
                
                if (!produtoEmEstoque || produtoEmEstoque.estoque < item.quantidade) {
                    estoqueSuficiente = false;
                    Alert.alert(
                        "Estoque Insuficiente",
                        `O produto "${item.nome}" não tem mais ${item.quantidade} unidades em estoque. Estoque atual: ${produtoEmEstoque ? produtoEmEstoque.estoque : 0}. Por favor, ajuste seu carrinho.`,
                        [{ text: "OK" }]
                    );
                    carregarEProcessarCarrinho();
                    return; 
                }
            }
            if (estoqueSuficiente) {
                
                // 2. ATUALIZAÇÃO DO ESTOQUE
                const novoEstoque = estoqueAtual.map(produto => {
                    const itemComprado = produtosCarrinho.find(c => c.id === produto.id);
                    if (itemComprado) {
                        return { 
                            ...produto, 
                            estoque: produto.estoque - itemComprado.quantidade 
                        };
                    }
                    return produto;
                });
                const detalhesPedido = {
                    produtos: produtosCarrinho.map(({ id, nome, quantidade, subtotal }) => ({
                        id, 
                        nome, 
                        quantidade, 
                        subtotal 
                    })),
                    total: valorTotalGeral,
                    data: new Date().toISOString(),
                    formaPagamento: formaPagamento,
                };
                await AsyncStorage.setItem(CHAVE_PEDIDO_DETALHES, JSON.stringify(detalhesPedido));
                await AsyncStorage.setItem(CHAVE_PRODUTOS_GLOBAL, JSON.stringify(novoEstoque));
                await AsyncStorage.removeItem(CHAVE_CARRINHO);
                router.push('/pagamento') // Rota para a tela de pagamento          
                setProdutosCarrinho([]);
                setValorTotalProdutos(0);
            }

        } catch (e) {
            console.error("Erro ao finalizar compra:", e);
            Alert.alert("Erro", "Não foi possível processar a sua compra. Tente novamente.");
        } finally {
            setIsProcessing(false);
        }
    };
    useEffect(() => {
        carregarEProcessarCarrinho();
    }, [carregarEProcessarCarrinho]);

    if (isLoading) {
       return (
            <View style={[estilos.container, estilos.loadingContainer]}>
                <ActivityIndicator size="large" color={'#4CAF50'} />
                <Text style={estilos.loadingText}>Preparando seu pedido...</Text>
            </View>
        );
    }
    if (error) {

        return (
            <View style={[estilos.container, estilos.loadingContainer]}>
                <Text style={estilos.tituloPrincipalBar}>Finalizar compra</Text>
                <Text style={estilos.errorText}>{error}</Text>
                <TouchableOpacity onPress={carregarEProcessarCarrinho} style={estilos.botaoRetry}>
                    <Text style={estilos.textoBotao}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }
    if (produtosCarrinho.length === 0) {
        return (
            <View style={[estilos.container, estilos.loadingContainer]}>
                <Text style={estilos.tituloPrincipalBar}>Finalizar compra</Text>
                <Text style={estilos.textoVazio}>Seu carrinho está vazio. Volte para a loja!</Text>
                <TouchableOpacity onPress={() => router.push('/home')} style={[estilos.botaoRetry, { marginTop: 20 }]}>
                    <Text style={estilos.textoBotao}>Ir para a Loja</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <View style={estilos.container}>
            <View style={estilos.topBar}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={estilos.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={estilos.tituloPrincipalBar}>Finalizar compra</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={estilos.scrollArea}>
                
                <View style={estilos.listaProdutos}>
                    {produtosCarrinho.map((produto, index) => (
                        <View key={produto.id}>
                            <View style={estilos.produto}>
                                <View>
                                    <Text style={estilos.nomeProduto}>{produto.nome}</Text>
                                    <Text style={estilos.descricaoProduto}>{produto.descricao}</Text>
                                </View>
                                
                                <View style={estilos.produtoInfoDireita}>
                                    <Text style={estilos.quantidadeProduto}>
                                        {produto.quantidade} x R$ {produto.preco.toFixed(2).replace('.', ',')}
                                    </Text>
                                    <Text style={estilos.precoProduto}>
                                        R$ {produto.subtotal.toFixed(2).replace('.', ',')}
                                    </Text>
                                </View>
                            </View>
                            {produto.estoque !== undefined && produto.quantidade > produto.estoque && (
                                <Text style={estilos.alertaEstoque}>
                                    Atenção: Apenas {produto.estoque} em estoque! Por favor, ajuste a quantidade.
                                </Text>
                            )}
                            {index < produtosCarrinho.length - 1 && (
                                <View style={estilos.linhaDivisoria} />
                            )}
                        </View>
                    ))}
                </View>

                <View style={estilos.secaoPagamento}>
                    <Text style={estilos.tituloSecao}>FORMA DE PAGAMENTO</Text>
                    <View style={estilos.opcaoPagamentoContainer}>
                        
                        <TouchableOpacity
                            style={[
                                estilos.opcaoPagamento,
                                formaPagamento === 'boleto' && estilos.opcaoSelecionada
                            ]}
                            onPress={() => alterarFormaPagamento('boleto')}
                        >
                            <View style={estilos.radioContainer}>
                                <View style={[
                                    estilos.radioExterno,
                                    formaPagamento === 'boleto' && estilos.radioExternoSelecionado
                                ]}>
                                    {formaPagamento === 'boleto' && (
                                        <View style={estilos.radioInterno} />
                                    )}
                                </View>
                            </View>
                            <View style={estilos.infoPagamento}>
                                <Text style={estilos.nomePagamento}>BOLETO</Text>
                                <Text style={estilos.descricaoPagamento}>
                                    Pague com boleto bancário
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                estilos.opcaoPagamento,
                                formaPagamento === 'cartao' && estilos.opcaoSelecionada
                            ]}
                            onPress={() => alterarFormaPagamento('cartao')}
                        >
                            <View style={estilos.radioContainer}>
                                <View style={[
                                    estilos.radioExterno,
                                    formaPagamento === 'cartao' && estilos.radioExternoSelecionado
                                ]}>
                                    {formaPagamento === 'cartao' && (
                                        <View style={estilos.radioInterno} />
                                    )}
                                </View>
                            </View>
                            <View style={estilos.infoPagamento}>
                                <Text style={estilos.nomePagamento}>CARTÃO DE CRÉDITO</Text>
                                <Text style={estilos.descricaoPagamento}>
                                    Pague com seu cartão
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={estilos.resumoPedido}>
                    <Text style={estilos.tituloResumo}>RESUMO DO PEDIDO</Text>

                    <View style={estilos.linhaResumo}>
                        <Text style={estilos.textoResumo}>Valor dos produtos:</Text>
                        <Text style={estilos.valorResumo}>R$ {valorTotalProdutos.toFixed(2).replace('.', ',')}</Text>
                    </View>

                    <View style={estilos.linhaResumo}>
                        <Text style={estilos.textoResumo}>Frete:</Text>
                        <Text style={estilos.valorResumo}>R$ {frete.toFixed(2).replace('.', ',')}</Text>
                    </View>

                    <View style={[estilos.linhaDivisoria, estilos.divisoriaResumo]} />

                    <View style={estilos.linhaResumo}>
                        <Text style={estilos.textoTotal}>TOTAL</Text>
                        <Text style={estilos.valorTotal}>R$ {valorTotalGeral.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>
                
                <View style={{ height: 100 }} /> 
            </ScrollView>

            <TouchableOpacity 
                style={[estilos.botaoConfirmar, isProcessing && estilos.botaoDesabilitado]}
                onPress={handleConfirmarCompra}
                disabled={isProcessing}
            >
                {isProcessing ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={estilos.textoBotao}>Confirmar compra</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20, 
    },
    scrollArea: {
        paddingTop: 80, 
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
        padding: 5,
        zIndex: 11,
    },
    tituloPrincipalBar: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },

    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 20,
    },
    textoVazio: {
        marginTop: 20,
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
    botaoRetry: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },

    listaProdutos: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    produto: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    produtoInfoDireita: {
        alignItems: 'flex-end',
    },
    nomeProduto: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    descricaoProduto: {
        fontSize: 13,
        color: '#666',
    },
    precoProduto: { 
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 5,
    },
    quantidadeProduto: { 
        fontSize: 13,
        color: '#888',
        marginBottom: 2,
    },
    alertaEstoque: {
        fontSize: 13,
        color: '#D32F2F', 
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginVertical: 5,
        textAlign: 'center',
    },
    linhaDivisoria: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: -15, 
    },

    secaoPagamento: {
        marginBottom: 20,
    },
    tituloSecao: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 15,
    },
    opcaoPagamentoContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    opcaoPagamento: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 8,
    },
    opcaoSelecionada: {
        backgroundColor: '#e8f5e9',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    radioContainer: {
        marginRight: 12,
    },
    radioExterno: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioExternoSelecionado: {
        borderColor: '#4CAF50',
    },
    radioInterno: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
    },
    infoPagamento: {
        flex: 1,
    },
    nomePagamento: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    descricaoPagamento: {
        fontSize: 14,
        color: '#666',
    },

    resumoPedido: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    tituloResumo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 15,
    },
    linhaResumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    textoResumo: {
        fontSize: 15,
        color: '#666',
    },
    valorResumo: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    divisoriaResumo: {
        marginVertical: 15,
        marginHorizontal: 0,
    },
    textoTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    valorTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },

    botaoConfirmar: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        position: 'absolute', 
        bottom: 0, 
        left: 20, 
        right: 20, 
        marginBottom: 20,
        zIndex: 10,
    },
    botaoDesabilitado: { 
        backgroundColor: '#A5D6A7', 
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default TelaFinalizarCompra;