import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TelaFinalizarCompra = () => {
  const [formaPagamento, setFormaPagamento] = useState('boleto');

  const produtos = [
    {
      id: 1,
      nome: 'Paracetamol',
      descricao: '10 comprimidos',
      preco: 8.99,
      quantidade: '1 unidade',
    },
    {
      id: 2,
      nome: 'Dipirona monoidratada',
      descricao: '10 comprimidos',
      preco: 8.99,
      quantidade: '1 unidade',
    },
  ];

  const valorTotalProdutos = 12.98;

  return (
    <View style={estilos.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={estilos.tituloPrincipal}>Finalizar compra</Text>

        {/* Lista de Produtos */}
        <View style={estilos.listaProdutos}>
          {produtos.map((produto, index) => (
            <View key={produto.id}>
              <View style={estilos.produto}>
                <Text style={estilos.nomeProduto}>{produto.nome}</Text>
                <Text style={estilos.descricaoProduto}>{produto.descricao}</Text>
                <Text style={estilos.precoProduto}>R${produto.preco.toFixed(2)}</Text>
                <Text style={estilos.quantidadeProduto}>{produto.quantidade}</Text>
              </View>

              {/* Linha divisória, exceto após o último produto */}
              {index < produtos.length - 1 && (
                <View style={estilos.linhaDivisoria} />
              )}
            </View>
          ))}
        </View>

        {/* Seção de Pagamento */}
        <View style={estilos.secaoPagamento}>
          <Text style={estilos.tituloSecao}>FORMA DE PAGAMENTO</Text>

          <View style={estilos.opcaoPagamentoContainer}>
            <TouchableOpacity
              style={[
                estilos.opcaoPagamento,
                formaPagamento === 'boleto' && estilos.opcaoSelecionada
              ]}
              onPress={() => setFormaPagamento('boleto')}
            >
              <View style={estilos.radioContainer}>
                <View style={[
                  estilos.radioExterno,
                  formaPagamento === 'boleto' && estilos.radioExternoSelecionado
                ]}>
                  {formaPagamento === 'boleto' && (
                    <View style={estilos.radioInterno} />
                  )}
                </View>
              </View>
              <View style={estilos.infoPagamento}>
                <Text style={estilos.nomePagamento}>BOLETO</Text>
                <Text style={estilos.descricaoPagamento}>
                  Pague com boleto bancário
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                estilos.opcaoPagamento,
                formaPagamento === 'cartao' && estilos.opcaoSelecionada
              ]}
              onPress={() => setFormaPagamento('cartao')}
            >
              <View style={estilos.radioContainer}>
                <View style={[
                  estilos.radioExterno,
                  formaPagamento === 'cartao' && estilos.radioExternoSelecionado
                ]}>
                  {formaPagamento === 'cartao' && (
                    <View style={estilos.radioInterno} />
                  )}
                </View>
              </View>
              <View style={estilos.infoPagamento}>
                <Text style={estilos.nomePagamento}>CARTÃO DE CRÉDITO</Text>
                <Text style={estilos.descricaoPagamento}>
                  Pague com seu cartão
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumo do Pedido */}
        <View style={estilos.resumoPedido}>
          <Text style={estilos.tituloResumo}>RESUMO DO PEDIDO</Text>

          <View style={estilos.linhaResumo}>
            <Text style={estilos.textoResumo}>Valor dos produtos:</Text>
            <Text style={estilos.valorResumo}>R$ {valorTotalProdutos.toFixed(2)}</Text>
          </View>

          <View style={estilos.linhaResumo}>
            <Text style={estilos.textoResumo}>Frete:</Text>
            <Text style={estilos.valorResumo}>R$ 0,00</Text>
          </View>

          <View style={[estilos.linhaDivisoria, estilos.divisoriaResumo]} />

          <View style={estilos.linhaResumo}>
            <Text style={estilos.textoTotal}>TOTAL</Text>
            <Text style={estilos.valorTotal}>R$ {valorTotalProdutos.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão de Confirmar Compra */}
      <TouchableOpacity style={estilos.botaoConfirmar}>
        <Text style={estilos.textoBotao}>Confirmar compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  listaProdutos: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  produto: {
    paddingVertical: 10,
  },

  nomeProduto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  descricaoProduto: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },

  precoProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 3,
  },

  quantidadeProduto: {
    fontSize: 14,
    color: '#888',
  },

  linhaDivisoria: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },

  secaoPagamento: {
    marginBottom: 20,
  },

  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
  },

  opcaoPagamentoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  opcaoPagamento: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },

  opcaoSelecionada: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },

  radioContainer: {
    marginRight: 12,
  },

  radioExterno: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioExternoSelecionado: {
    borderColor: '#4CAF50',
  },

  radioInterno: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },

  infoPagamento: {
    flex: 1,
  },

  nomePagamento: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },

  descricaoPagamento: {
    fontSize: 14,
    color: '#666',
  },

  resumoPedido: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  tituloResumo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
  },

  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  textoResumo: {
    fontSize: 15,
    color: '#666',
  },

  valorResumo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  divisoriaResumo: {
    marginVertical: 15,
  },

  textoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  valorTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },

  botaoConfirmar: {
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

export default TelaFinalizarCompra;