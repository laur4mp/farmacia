import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'; 
const { width, height } = Dimensions.get("window");
export default function CardProduto({ id, nome, preco, imagem, favorito, onToggle, onAddToCart, estoque }) {
    
    const [quantidade, setQuantidade] = useState(1);
    const isDisponivel = estoque > 0; 
    const incrementarQuantidade = () => {
        const maxQtd = Math.min(estoque, 99); 
        setQuantidade(prev => (prev < maxQtd ? prev + 1 : maxQtd));
   };
    const decrementarQuantidade = () => {
        setQuantidade(prev => (prev > 1 ? prev - 1 : 1)); 
    };
    const handleAdd = () => {
        if (isDisponivel && onAddToCart) {
            onAddToCart(id, quantidade); 
            setQuantidade(1);
        } else if (!isDisponivel) {
             Alert.alert('Indisponível', `O produto "${nome}" está esgotado no momento.`);
        }
    };
    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.favButton} onPress={onToggle}>
                <Ionicons 
                    name={favorito ? "heart" : "heart-outline"} 
                    size={22} 
                    color={favorito ? "#FF6B6B" : "#fff"} 
                />
            </TouchableOpacity>
            <Image source={imagem} style={styles.foto}/>
            <View style={styles.infoContainer}>
                <Text style={styles.nome} numberOfLines={2}>{nome}</Text>
                {isDisponivel ? (
                    <Text style={styles.estoqueText}>
                        Disponível: {estoque} unidades
                    </Text>
                ) : (
                    <Text style={[styles.estoqueText, styles.estoqueEsgotado]}>
                        Indisponível (0)
                    </Text>
                )}
                <View style={styles.middleRow}>
                    <Text style={styles.preco}>{preco}</Text>
                    {isDisponivel && (
                        <View style={styles.quantidadeSelector}>
                            <TouchableOpacity onPress={decrementarQuantidade} style={styles.qtdButton}>
                                <Text style={styles.qtdText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtdValue}>{quantidade}</Text>
                            <TouchableOpacity onPress={incrementarQuantidade} style={styles.qtdButton}>
                                <Text style={styles.qtdText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TouchableOpacity 
                    style={[styles.addButton, !isDisponivel && styles.addButtonDisabled]}
                    onPress={handleAdd}
                    disabled={!isDisponivel}
                >
                    <Ionicons 
                        name="cart" 
                        size={width * 0.04} 
                        color={isDisponivel ? "#fff" : "#ccc"} 
                    />
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            {!isDisponivel && (
                <View style={styles.overlayIndisponivel}>
                    <Text style={styles.textIndisponivel}>ESGOTADO</Text>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#2bc731ff",
        borderRadius: 15, 
        width: width * 0.43, 
        height: height * 0.32, 
        padding: 1,
        marginBottom: 20, 
        marginHorizontal: width * 0.015, 
        position: "relative",
        overflow: 'hidden', 
    },
    favButton: {
        position: "absolute",
        top: 8, 
        right: 8, 
        zIndex: 10,
    },
    foto: {
        width: "100%",
        height: height * 0.14,
        resizeMode: "contain",
        marginTop: 5,
    },
    infoContainer: {
        paddingHorizontal: 8,
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    nome: {
        fontSize: width * 0.035, 
        fontWeight: "bold",
        marginTop: 3, 
        color: "#fff",
        lineHeight: width * 0.04,
    },
    estoqueText: {
        fontSize: width * 0.03, 
        marginTop: 1,
        color: "#fff",
        fontWeight: '500',
        marginBottom: 5, 
    },
    estoqueEsgotado: {
        color: '#FF6B6B', 
        fontWeight: 'bold',
    },
    middleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5, 
    },
    preco: {
        fontSize: width * 0.045,
        fontWeight: "bold",
        color: "#fff",
    },
    quantidadeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    qtdButton: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: '#E6E6E6',
        borderRadius: 5,
    },
    qtdText: {
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: '#333',
    },
    qtdValue: {
        paddingHorizontal: 6,
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00B207', 
        paddingVertical: 6,
        borderRadius: 8,
        marginTop: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    addButtonDisabled: {
        backgroundColor: "#B0B0B0",
    },
    overlayIndisponivel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIndisponivel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.05,
        transform: [{ rotate: '-15deg' }],
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
    }
});