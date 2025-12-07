import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CardProduto from "../componentes/cardProduto";
import TopBar from "../componentes/topbar";
import { produtos } from "../componentes/produtos";

const { width, height } = Dimensions.get("window");

export default function Categoria() {
  const { categoria } = useLocalSearchParams();

  const filtrados = produtos.filter(p => p.categoria === categoria);

  return (
    <ScrollView style={styles.container}>
      <TopBar titulo={"IFarmácia"}/>

      <Text style={styles.subtitulo}>
        Categoria: {categoria}
      </Text>

      <View style={styles.viewCard}>
      {filtrados.map(prod => (
        <CardProduto
          key={prod.id}
          id={prod.id}
          nome={prod.nome}
          status={prod.status}
          preco={prod.preco}
          imagem={prod.imagem}
        />
      ))}
      </View>
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
  viewCard: {
    flexDirection: "row",
    flexWrap: "wrap"
  }

});