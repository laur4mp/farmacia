import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardProduto from "../componentes/cardProduto";
import TopBar from "../componentes/topbar";
import { produtos } from "../componentes/produtos";

const { width, height } = Dimensions.get("window");

export default function Categoria() {
  const { categoria } = useLocalSearchParams();

  const filtrados = produtos.filter(p => p.categoria === categoria);

  const [favoritos, setFavoritos] = useState([]);
   // Carregar favoritos do AsyncStorage ao montar a tela
  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    const favs = await AsyncStorage.getItem("favoritos");
    setFavoritos(favs ? JSON.parse(favs) : []);
  };

  // Alternar favorito e salvar no AsyncStorage
  const toggleFavorito = async (id) => {
    let lista = [...favoritos];
    if (lista.includes(id)) {
      lista = lista.filter(item => item !== id);
    } else {
      lista.push(id);
    }
    setFavoritos(lista);
    await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
  };

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
          estoque={prod.estoque}
          favorito={favoritos.includes(prod.id)}
          onToggle={() => toggleFavorito(prod.id)}
        />
      ))}
      </View>
      
      {/* só para dar espaço */}
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
  viewCard: {
    flexDirection: "row",
    flexWrap: "wrap"
  }

});