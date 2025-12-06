import { RootRoute, Route, Router } from '@tanstack/react-router';
import LoginScreen from './index';        
import CadastroScreen from './cadastro';

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


const routeTree = rootRoute.addChildren([loginRoute, cadastroRoute, categoriaRoute]);

export const router = new Router({ routeTree });