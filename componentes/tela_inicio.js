import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardProduto from "./cardProduto";
import { useRouter } from 'expo-router';
import TopBar from "./topbar";

const { width, height } = Dimensions.get("window");

export default function TelaDeInicio() {
    const router = useRouter();
  
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
      <View style={styles.viewCard}>
        <CardProduto id={1} nome={"Dipirona Monidrata"} status={"Disponível"} preco={"R$ 10,00"}/>
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