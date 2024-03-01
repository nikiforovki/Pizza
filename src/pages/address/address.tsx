import React from "react";
import styled from 'styled-components';
import kurskayaImage from '../../../public/map/kurskayaImage.jpg';
import novoslobodskayaImage from '../../../public/map/novoslobodskayaImage.jpg';
import volgogradskyImage from '../../../public/map/volgogradskyImage.jpg';
import kuzminkiImage from '../../../public/map/kuzminkiImage.jpg';

// Заголовок страницы
const PageHeader = styled.h1`
    color: #101010;
    text-align: center;
    margin-bottom:   1em; // Отступ снизу для создания пространства под блоками
`;

// Контейнер для блоков
const BlockContainer = styled.div`
    display: flex;
    flex-direction: column; // Блоки будут расположены вертикально
    align-items: stretch; // Блоки будут занимать всю ширину родительского элемента
`;

// Блок с информацией о пиццерии
const AddressRow = styled.div`
    display: flex;
    justify-content: space-between; // Элементы внутри блока будут расположены слева и справа
    padding:   1em; // Добавляем отступы вокруг содержимого блока
    &:nth-child(odd) {
        //background-color: #f5f5f5; // Для нечетных блоков задаем светлый фон
    }
`;

const SpanTxt = styled.span`
    text-align: center;
    font-size:  24px;
`;








export function Adress() {
    return (
        <div>
            <PageHeader>Адреса пиццерий</PageHeader>
            <BlockContainer>
                <AddressRow>

                    <SpanTxt>на Курской</SpanTxt>
                    <img src={kurskayaImage} alt="Курская"/>
                </AddressRow>
                <AddressRow>
                    <SpanTxt>на Новослободской</SpanTxt>
                    <img src={novoslobodskayaImage} alt="Новослободская"/>
                </AddressRow>
                <AddressRow>
                    <SpanTxt>на Волгоградском проспекте</SpanTxt>
                    <img src={volgogradskyImage} alt="Волгоградский проспект"/>
                </AddressRow>
                <AddressRow>
                    <SpanTxt>в Кузьминках</SpanTxt>
                    <img src={kuzminkiImage} alt="Кузьминки"/>
                </AddressRow>
            </BlockContainer>
        </div>
    );
}


//******



// export function Adress() {
//     return (
//         <div>
//             <Styledh1>Адрес пользователя</Styledh1>
//             <AdressMap />
//         </div>
//     );
// }
//
// // Объявите AdressMap на уровне модуля
// export function AdressMap() {
//     return (
//         <div>
//             <Map defaultState={{ center: [55.75,   37.57], zoom:   9 }} />
//         </div>
//     );
// }
