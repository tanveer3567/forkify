export const search = document.querySelector('.search');

export const input = document.querySelector('.search__field');

export const searchResults = document.querySelector('.results__list');

export const searchPResult = document.querySelector('.results');

export const pagination = document.querySelector('.results__pages');

export const recipe = document.querySelector('.recipe');

export const shoppingList = document.querySelector('.shopping__list');

export const likesList = document.querySelector('.likes__list');

export const clearSearchResults = () => {
    searchResults.innerHTML = '';
}

export const clearRecipeResults = () => {
    recipe.innerHTML = '';
}

export const loader = parent => {
    const loaderHtml = `
        <div class='loader'>
            <svg>
                <use href='img/icons.svg#icon-cw'></use>
            </svg>
        </div>`;
        parent.insertAdjacentHTML('afterbegin', loaderHtml);
}

export const clearLoader = () => {
    const baseLoader = document.querySelector('.loader');;
    if(baseLoader){
        baseLoader.parentElement.removeChild(baseLoader);
    }
};