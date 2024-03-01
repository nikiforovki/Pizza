import React from "react";
import styled from 'styled-components';
import PizzaPromo1 from '../../../public/PizzaPromo/PizzaPromo1.jpg'


// Блок с информацией о пиццерии
const AddressRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding:   1em;
    &:nth-child(odd) {
       
    }
`;

const SpanTxt = styled.span`
    text-align: center;
    font-size:  24px;
`;

export function PizzaPromo() {
    return (
        <div>
            <div>dd</div>
                <AddressRow>
                    <SpanTxt>на Курской</SpanTxt>
                    <img src={PizzaPromo1} alt="Курская"/>
                </AddressRow>
        </div>
    );
}