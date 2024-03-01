import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
// import { Error as ErropPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { ProfileUser } from './pages/ProfileUser/ProfileUser.tsx'
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import {persistor, store} from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import {Adress} from "./pages/address/address.tsx";
import {PizzaPromo} from "./pages/PizzaPromo/PizzaPromo.tsx";
import {YMaps} from "@pbe/react-yandex-maps";


const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/profileuser',
				element: <ProfileUser />
			},
			{
				path: '/PizzaPromo',
				element: <PizzaPromo />
			},
			{
				path: '/adress',
				element: <Adress />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
							}, 2000);
						})
					});
				}
			},


		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			}, {
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		// path: '*',
		// element: <ErropPage />
	}
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element');

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router}>
					{/*<YMaps>*/}
					{/*	<Adress />*/}
						{/* Все остальные маршруты и компоненты, которые используют карты */}
					{/*</YMaps>*/}
				</RouterProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);



// pachage-json
//    "lint": "eslint -c .eslintrc --ext .ts,.tsx .",
//    "lint:fix": "npm run lint -- --fix",