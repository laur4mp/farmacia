import { View, Text, Image, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function CardProduto({ id, nome, status, preco}) {
  return (
    <View style={styles.card}>
      <Image source={require("../assets/62ace36a12dfb868d61c5e95-removebg-preview.png")}
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
        margin: 10
    },
    foto: {
        width: width * 0.5,
        height: height * 0.25,
        alignSelf: "center"
    },
    nome: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: -20,
        paddingLeft: 13,
        color: "#ffffff"
    },
    status: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: -4,
        paddingLeft: 13,
        color: "#ffffffff"
    },
    preco: {
        fontSize: 20,
        paddingLeft: 13,
        marginTop: -4,
        color: "#ffffff"
    },
});