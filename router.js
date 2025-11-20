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

const routeTree = rootRoute.addChildren([loginRoute, cadastroRoute]);

export const router = new Router({ routeTree });