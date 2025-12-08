import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

export default function TopBar({titulo}) {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.favoritosIcone} onPress={() => router.push('/favoritos')}>
          <Ionicons name="heart" size={width * 0.07} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.searchRow}>
        <TextInput style={styles.input} placeholder="Buscar..." placeholderTextColor="#9E9E9E" />

        <TouchableOpacity style={styles.carrinhoButton}
          onPress={() => router.push('/carrinho')}>
          <Ionicons name="cart" size={width * 0.07} color="white" />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: height * 0.015,
  },


  favoritosIcone: {
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
  }
});