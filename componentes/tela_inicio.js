import { Text, TextInput, View } from "react-native";


export default function TelaDeInicio() {
  return (
    <View>
        {/*Opção de sair da conta*/}
        <Text>Barra de configuração</Text>

        <Text>IFarmácia</Text>

        <TextInput>Barra de pesquisa</TextInput>
        <Text>Carrinho</Text>

        {/*Abaixo desta linha ficará as categorias de cada produto*/}
        <Text> Buscar por Categoria</Text>

        {/*Abaixo desta linha ficará os produtos mais vendidos e pesquisados do nosso site*/}
        <Text>Produtos Populares</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    
})