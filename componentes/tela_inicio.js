import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function TelaDeInicio() {
  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.perfilIcone}>
          <Ionicons name="person" size={width * 0.07} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>IFarmácia</Text>

      <View style={styles.searchRow}>
        <TextInput style={styles.input} placeholder="Buscar..." placeholderTextColor="#9E9E9E" />

        <TouchableOpacity style={styles.carrinhoButton}>
          <Ionicons name="cart" size={width * 0.07} color="white" />
        </TouchableOpacity>
      </View>

       <Text style={styles.subtitulo}>Buscar por categoria</Text>

      <View style={styles.categoriasRow}>
        <View style={styles.categoria}>
          <Text style={styles.catIcon}>o</Text>
          <Text style={styles.catText}>Medicamentos</Text>
        </View>

        <View style={styles.categoria}>
          <Text style={styles.catIcon}>o</Text>
          <Text style={styles.catText}>Beleza</Text>
        </View>

        <View style={styles.categoria}>
          <Text style={styles.catIcon}>o</Text>
          <Text style={styles.catText}>Suplementos</Text>
        </View>

        <View style={styles.categoria}>
          <Text style={styles.catIcon}>o</Text>
          <Text style={styles.catText}>Higiene</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Produtos populares</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.04,
    paddingHorizontal: width * 0.05
  },


  topBar: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: height * 0.015,
  },


  perfilIcone: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: "#2bc731ff",
    borderRadius: width * 0.12,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: width * 0.12,
    fontWeight: "700",
    color: "#1E3A5F",
    marginBottom: height * 0.03,
  },
  searchRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.03,
  },


  input: {
    flex: 1,
    height: height * 0.06,
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: width * 0.045,
  },
  carrinhoButton: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: "#2bc731ff",
    borderRadius: width * 0.12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
});