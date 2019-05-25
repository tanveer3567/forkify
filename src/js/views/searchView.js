import * as Base from './base';

export const getInput = () => Base.input.value;

export const clearInput = () => {
    Base.input.value = '';
    Base.pagination.innerHTML = '';
}

export const hightLight = id => {
    
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach( result => {
        result.classList.remove('results__link--active');
        console.log(id);
    })
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}

let limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}....`;
    }
    return title;
}

let renderRecipe = (recipe) => {
    const item = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    Base.searchResults.insertAdjacentHTML('beforeend', item);
}
export const renderResults = (recipes, page = 1, pageLimit = 10) => {

    let start = (page - 1) * 10;
    let end = page * 10;
    recipes.slice(start, end).forEach(recipe => {
        renderRecipe(recipe);
    });
    preCalPagination(page, Math.ceil(recipes.length / pageLimit));
}

const preCalPagination = (page, length) => {
    let btn;
    if (page == 1) {
        btn = renderPagination(page+1, 'next', 'right');
    } else if (page > 1 && page < length) {
        btn = `${renderPagination(page-1, 'prev', 'left')}${renderPagination(page+1, 'next', 'right')}`;
    } else {
        btn = renderPagination(page-1, 'prev', 'left');
    }
    Base.pagination.insertAdjacentHTML('afterbegin', btn);
}

const renderPagination = (page, btn, arrow) => {

    const html = `
        <button class="btn-inline results__btn--${btn}" data-goto=${page}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${arrow}"></use>
            </svg>
            <span>Page ${page}</span>
            </button>
        </button>`;
    return html;
}