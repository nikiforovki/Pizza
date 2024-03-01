import React, { useEffect, useState } from "react";
import { useSelector, RootState } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { OrderHistoryState } from '../../store/orderHistorySlice.reducer.ts';
import { orderHistoryReducer } from "../../store/orderHistorySlice.reducer.ts";


interface RootState {
	orderHistory: {
		orders: any[];
	};
}

interface OrderHistoryState {}


const Styledh1 = styled.h1`
	color: #101010;
	text-align: center;
`;

const Styledh2 = styled.h2`
	color: #101010;
	text-align: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const StyledInput1 = styled.input`
	color: var(--text-color);
	border: 1px solid #EEE;
	border-radius: 10px;
	padding: 15px;
	width: 400px;
`;

const StyledInput2 = styled.input`
	color: var(--text-color);
	border: 1px solid #EEE;
	border-radius: 10px;
	padding: 15px;
	height: 60px;
	width: 400px;
`;

const StyledInput3 = styled.input`
	color: var(--text-color);
	border: 1px solid #EEE;
	border-radius: 10px;
	padding: 15px;
	width: 400px;
`;


const StyledInput4 = styled.input`
	color: var(--text-color);
	border: 1px solid #EEE;
	border-radius: 10px;
	padding: 15px;
	width: 400px;
`;

const StyledTable = styled.table`
	display: block; /* Оборачиваем таблицу блоком */
	margin-left: 20%;
	margin-right: auto;
	width: 95%; /* Ширина таблицы */
	border-collapse: separate;
	border-spacing: 200px 15px; /* Задаем отступы между строками */
`;

const StyledTBody = styled.tbody`
	tr {
		&:nth-child(even) {
			background-color: #fdfdfd;
		}
	}
`;


//
//
// export function ProfileUser() {
// 	const [name, setName] = useState(localStorage.getItem('name') || '');
// 	const [email, setEmail] = useState(localStorage.getItem('email') || '');
// 	const [address, setAddress] = useState(localStorage.getItem('address') || '');
// 	const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
//
// 	useEffect(() => {
// 		localStorage.setItem('name', name);
// 		localStorage.setItem('email', email);
// 		localStorage.setItem('address', address);
// 		localStorage.setItem('phoneNumber', phoneNumber);
// 	}, [name, email, address, phoneNumber]);
//
// 	return <div>
// 		<Styledh1>Информация о пользователи</Styledh1>
// 		<Container>
// 			<StyledInput1 type="text" placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)}/>
// 			<StyledInput4 type="text" placeholder='Почта' value={email} onChange={(e) => setEmail(e.target.value)}/>
// 			<StyledInput2 type="text" placeholder='Адрес' value={address} onChange={(e) => setAddress(e.target.value)}/>
// 			<StyledInput3 type="text" placeholder='Номер телефона' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
// 		</Container>
// 		<Styledh2>История заказов</Styledh2>
//
//
// 	</div>
// }


interface Product {
	id: number;
	name: string;
	price: number;
}

export function ProfileUser() {
	const [name, setName] = useState(localStorage.getItem('name') || '');
	const [email, setEmail] = useState(localStorage.getItem('email') || '');
	const [address, setAddress] = useState(localStorage.getItem('address') || '');
	const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
	const orderHistory = useSelector((state: RootState) => state.orderHistory.orders); // Select orders from orderHistory
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('/api/products');
				const productsData = await response.json();
				setProducts(productsData);
			} catch (error) {
				console.error('Failed to fetch products:', error);
			}
		};

		fetchProducts();
	}, []);


	useEffect(() => {
		console.log("Order History:", orderHistory);
	}, [orderHistory]);




	return (
		<div>
			<Styledh1>Информация о пользователи</Styledh1>

			<Container>
						<StyledInput1 type="text" placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)}/>
			 			<StyledInput4 type="text" placeholder='Почта' value={email} onChange={(e) => setEmail(e.target.value)}/>
						<StyledInput2 type="text" placeholder='Адрес' value={address} onChange={(e) => setAddress(e.target.value)}/>
						<StyledInput3 type="text" placeholder='Номер телефона' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
			</Container>



			<Styledh1>История заказов</Styledh1>

			<StyledTable>
				<thead>
				<tr>
					<th>ID</th>
					<th>Дата</th>
					<th>Сумма</th>
				</tr>
				</thead>
				<StyledTBody>
					{orderHistory.map((order: OrderHistoryState) => (
						<tr key={order.id}>
							<td>{order.id}</td>
							<td>{order.date}</td>
							<td>{order.total}₽</td>
						</tr>
					))}
				</StyledTBody>
			</StyledTable>


		</div>
	);
}