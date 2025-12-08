import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

export default function CardProduto({ id, nome, status, preco, imagem, favorito, onToggle }) {

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.favButton} onPress={onToggle}>
        <Ionicons 
          name={favorito ? "heart" : "heart-outline"} 
          size={28} 
          color={favorito ? "red" : "#fff"}  
        />
      </TouchableOpacity>

      <Image source={imagem}
      style={styles.foto}/>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.preco}>{preco}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#2bc731ff",
        borderRadius: 35,
        width: width * 0.4,
        height: height * 0.32, 
        padding: 1,
        margin: 10,
        position: "relative"
    },
    favButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
    },
    foto: {
        width: "100%",
        height: height * 0.18,
        resizeMode: "contain",
        marginTop: 10
      },
    nome: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 10,
        paddingHorizontal: 13,
        color: "#fff"
      },
      status: {
        fontSize: 16,
        marginTop: 1,
        paddingHorizontal: 13,
        color: "#fff"
      },
      preco: {
        fontSize: 18,
        marginTop: 1,
        paddingHorizontal: 13,
        fontWeight: "bold",
        color: "#fff"
      }
});