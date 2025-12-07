import { View, Text, Image, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function CardProduto({ id, nome, status, preco, imagem}) {
  return (
    <View style={styles.card}>
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
        margin: 10
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