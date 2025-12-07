import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const TelaEnderecoPagamento = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Seção de Endereço */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Endereço</Text>
          
          <View style={styles.listaCampos}>
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Nome Completo</Text>
              <TextInput 
            style={styles.input}
                placeholder="Digite o endereço completo"
              />
            </View>
            
            <View style={styles.linhaDupla}>
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Rua/Avenida</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Nome da rua"
                />
              </View>
              
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Bairro</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Nome do bairro"
                />
              </View>
            </View>
            
            <View style={styles.linhaDupla}>
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Número</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Nº"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>CEP</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="00000-000"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Ponto de Referência</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: Próximo ao mercado"
              />
            </View>
            
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Complemento</Text>
              <TextInput 
                style={styles.input}
                placeholder="Apto, bloco, etc."
              />
            </View>
            
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Número de telefone</Text>
              <TextInput 
                style={styles.input}
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Seção de Pagamento */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Pagamento</Text>
          
          <View style={styles.listaCampos}>
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Número do cartão</Text>
              <TextInput 
                style={styles.input}
                placeholder="0000 0000 0000 0000"
                keyboardType="numeric"
                maxLength={16}
              />
            </View>
            
            <View style={styles.campo}>
              <Text style={styles.rotuloCampo}>Nome no cartão</Text>
              <TextInput 
                style={styles.input}
                placeholder="Como está o nome no cartão"
                autoCapitalize="words"
              />
            </View>
            
            <View style={styles.linhaDupla}>
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Validade</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </View>
              
              <View style={[styles.campo, styles.campoPequeno]}>
                <Text style={styles.rotuloCampo}>Código de segurança</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="CVV"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Botão de Continuar */}
      <TouchableOpacity style={styles.botaoContinuar}>
        <Text style={styles.textoBotao}>Continuar compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  secao: {
    marginBottom: 25,
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingBottom: 5,
  },
  listaCampos: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  campo: {
    marginBottom: 15,
  },
  linhaDupla: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campoPequeno: {
    width: '48%',
  },
  rotuloCampo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  botaoContinuar: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaEnderecoPagamento;