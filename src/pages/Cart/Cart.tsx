import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispath, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';
import { addOrder } from '../../store/orderHistorySlice.reducer';
// import {StyledHeading} from './styles';
import InputPizzaCart  from '../../components/inputPizzaCart/inputPizzaCart.tsx'
import Input from "../../components/Input/Input.tsx";

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispath>();
	const navigate = useNavigate();

	const total = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);


	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};
	const calculateTotalPrice = (items) => {
		let total = 0;
		items.forEach(item => {
			const product = cartProducts.find(p => p.id === item.id);
			if (product) {
				total += item.count * product.price;
			}
		});
		return total;
	};
// Функция для метки id
	const timestamp = Date.now().toString();
	const Date_3 = timestamp.slice(-3);
	console.log(Date_3);

	// Функция для метки date

	let date = new Date();
	let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	console.log(formattedDate);

	const checkout = () => {
		const order = {
			id: Date_3, // Используйте текущую метку времени в качестве уникального ID заказа
			items: items, // Предполагается, что items содержит заказанные товары
			date: formattedDate,
			total: calculateTotalPrice(items) // Функция для расчета общей суммы заказа
		};

		dispatch(addOrder(order)); // Добавьте новый заказ в стор

		dispatch(cartActions.clean());
		navigate('/success');
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);


	return <>
		<Headling className={styles['headling']}>Корзина</Headling>
		<InputPizzaCart placeholder="Выберети пицирию из списка" />
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
		<div className={styles['line']}>
			<div className={styles['text']}>Итог</div>
			<div className={styles['price']}>{total}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Доставка</div>
			<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Итог <span className={styles['total-count']}>({items.length})</span></div>
			<div className={styles['price']}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>


        <Input placeholder='Промокод'/>


		<div className={styles['checkout']}>
			<Button appearence="big" onClick={checkout}>оформить</Button>
		</div>
	</>;
}

export default Cart