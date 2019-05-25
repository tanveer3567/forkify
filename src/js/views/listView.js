import * as Base from './base';

const renderShoppingItem = item => {

    const unitList = ['oz', 'oz', 'pound',  'kg', 'g'];
    const check = unitList.includes(item.unit);
    console.log(check);
    return `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${ check ? 0.1 : 1}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
}

export const renderShoppingList = list => {

    const html = list.items.map(item => renderShoppingItem(item));
    Base.shoppingList.insertAdjacentHTML('beforeEnd', html);
}

export const deletShoppingItem = id => {

    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
}