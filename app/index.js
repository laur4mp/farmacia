import { StyleSheet, View } from "react-native";
import Login from "../componentes/button";
import TelaDeInicio from "../componentes/tela_inicio";

import BolasVerdes from "../componentes/bolas_verdes";

export default function LoginScreen() {
  return (
  <BolasVerdes>
    <Login />
  </BolasVerdes>
  );
}
