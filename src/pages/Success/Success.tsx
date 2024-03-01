import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

type SuccessProps = {
	user: string
}

// export function Success({user}: SuccessProps): JSX.Component {

// export const Success: React.FC<SuccessProps> = ({ user}): JSX.Component => {
export function Success({user}: SuccessProps): JSX.Component {
	const navigate = useNavigate();
	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="Изображение пиццы" />
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button appearence="big" onClick={() => navigate('/')}>Сделать новый</Button>
		</div>
	);
};