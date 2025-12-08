import { RootRoute, Route, Router } from '@tanstack/react-router';
import LoginScreen from './index';        
import CadastroScreen from './cadastro';
import CarrinhoScreen from './carrinho';

const rootRoute = new RootRoute();

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginScreen,
});
const cadastroRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/cadastro',
  component: CadastroScreen,
});
const categoriaRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/categoria',
  component: CategoriaScreen,
});
const carrinhoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/carrinho',
  component: CarrinhoScreen,
});

const routeTree = rootRoute.addChildren([loginRoute, cadastroRoute, categoriaRoute, carrinhoRoute, ]);

export const router = new Router({ routeTree });