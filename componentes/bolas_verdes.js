import React from "react";
import { View, StyleSheet } from "react-native";

export default function BolasVerdes({ children }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.circuloSuperior} />
      <View style={styles.circuloInferior} />

      <View style={styles.bolinhasDireita}>
        <View style={[styles.bolinha, { width: 25, height: 25 }]} />
        <View style={[styles.bolinha, { width: 15, height: 15 }]} />
        <View style={[styles.bolinha, { width: 10, height: 10 }]} />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circuloSuperior: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    backgroundColor: "#32CD32",
    borderRadius: 200,
  },
  circuloInferior: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 250,
    height: 250,
    backgroundColor: "#32CD32",
    borderRadius: 200,
  },
  bolinhasDireita: {
    position: "absolute",
    bottom: 40,
    right: 30,
    alignItems: "center",
  },
  bolinha: {
    backgroundColor: "#32CD32",
    borderRadius: 50,
    marginTop: 5,
  },
});
