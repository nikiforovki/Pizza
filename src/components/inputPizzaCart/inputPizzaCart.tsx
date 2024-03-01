import styled from "styled-components";

const SelectPizza = styled.select`
    font-size:  17px;
    font-style: normal;
    font-weight:  200;
    color: var(--text-color);
    border:  1px solid #EEE;
    box-shadow:  10px  10px  15px  0px rgba(233,  233,  233,  0.25);
    border-radius:  10px;
    padding:  20px;
    width:  500px;
`;

const InputPizzaCart = ({ isValid = true, className,  }) => {
    return (
        <SelectPizza className={className} >
            <option value="option1">Курская</option>
            <option value="option2">Новослободская</option>
            <option value="option3">Волгоградский проспект</option>
            <option value="option4">Кузьминки</option>
        </SelectPizza>
    );
};

export default InputPizzaCart;





