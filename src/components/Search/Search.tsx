import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import { useState} from "react";
//Поиск товаров

//Поиск товаров
const forbiddenSymbols = /[<>&\/\'\"1234567890.?*+=:;-]/;

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ isValid = true, className, ...props }, ref) {
	const [value, setValue] = useState('');

	const handleChange = (event) => {
		const newValue = event.target.value;
		if (!forbiddenSymbols.test(newValue)) {
			setValue(newValue);
			props.onChange && props.onChange(event);
		}
	};

	return (
		<div className={styles['input-wrapper']}>
			<input ref={ref} className={cn(styles['input'], className, {
				[styles['invalid']]: isValid
			})} {...props} value={value} onChange={handleChange} />
			<img className={styles['icon']} src='/search-icon.svg' alt='Иконка лупы' />
		</div>
	);
});

export default Search;


