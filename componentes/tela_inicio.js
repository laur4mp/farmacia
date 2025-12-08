import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardProduto from "./cardProduto";
import { useRouter } from 'expo-router';
import TopBar from "./topbar";
import { produtos } from "../componentes/produtos";

const { width, height } = Dimensions.get("window");

export default function TelaDeInicio() {
    const router = useRouter();

    const recomendadosIds = [1, 3, 4, 5];
    const produtosRecomendados = produtos.filter(p =>
    recomendadosIds.includes(p.id));

    const todosProdutos = produtos;

    const [favoritos, setFavoritos] = useState([]);

  // Carregar favoritos do AsyncStorage
    useEffect(() => {
      carregarFavoritos();}, []);

    const carregarFavoritos = async () => {
      const favs = await AsyncStorage.getItem("favoritos");
      setFavoritos(favs ? JSON.parse(favs) : []);};

    const toggleFavorito = async (id) => {
      let lista = [...favoritos];
      if (lista.includes(id)) {
        lista = lista.filter(item => item !== id);
      } else {
        lista.push(id);
      }
      setFavoritos(lista);
      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));};


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
        style={{ marginHorizontal: -width * 0.05 }}

        contentContainerStyle={{
          paddingLeft: width * 0.05,
          paddingRight: width * 0.05,
        }}
        renderItem={({ item }) => (
          <CardProduto
            id={item.id}
            nome={item.nome}
            status={item.status}
            preco={item.preco}
            imagem={item.imagem}
            favorito={favoritos.includes(item.id)}
            onToggle={() => toggleFavorito(item.id)}
          />
        )}
      />

      {/* só para dar espaço */}
      <Text style={{ marginTop: 5 }}></Text>

      <Text style={styles.subtitulo}>Opções de produtos para você</Text>
      <FlatList
        data={todosProdutos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <CardProduto
            id={item.id}
            nome={item.nome}
            status={item.status}
            preco={item.preco}
            imagem={item.imagem}
            favorito={favoritos.includes(item.id)}
            onToggle={() => toggleFavorito(item.id)}
          />
        )}
      />

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

  
  viewCard: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});