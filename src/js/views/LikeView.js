import * as Base from './base';

export const renderLikesList = recipe => {

    const html = `
    <li>
        <a class="likes__link" href="${recipe.id}">
            <figure class="likes__fig">
                <img src="${recipe.image}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${recipe.title}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    const iconString = 'icon-heart';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    Base.likesList.insertAdjacentHTML('beforeEnd', html);
}