import Search from './modules/Search';
import * as SearchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as Base from './views/base'
import Recipe from './modules/Recipe';
import List from './modules/List';
import * as ListView from './views/listView';
import Likes from './modules/Like';
import * as LikeView from './views/LikeView';

const state = {};

const searchController = async (first, page) => {

    Base.clearSearchResults();
    if (first) {
        const query = SearchView.getInput();
        if (query) {
            state.search = new Search(query);
            SearchView.clearInput();
            Base.loader(Base.searchPResult);
            await state.search.getRecipes();
            Base.clearLoader();
            SearchView.renderResults(state.search.results, page);
        }
    } else {
        SearchView.clearInput();
        SearchView.renderResults(state.search.results, page);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    searchController(true, 1);
})

const pageNode = Base.pagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchController(false, gotoPage);
    }
});


const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');
    if (id) {
        Base.clearRecipeResults();
        Base.loader(Base.recipe);
        state.recipe = new Recipe(id);
        state.likes = new Likes();
        SearchView.hightLight(id);
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calTime();
            state.recipe.calServings();
            Base.clearLoader();
        } catch{
            alert('Error occured while getting recipe details.....')
        }
        recipeView.renderRecipe(state.recipe);
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

Base.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        state.likes.addLike(state.recipe.id, state.recipe.title, state.recipe.publishere, state.recipe.image);
        LikeView.renderLikesList(state.recipe);
    } else if (e.target.closest('.recipe__btn')) {
        const list = new List();
        state.list = list;
        state.recipe.ingredients.forEach(ingredient => list.addItems(ingredient.unit, ingredient.count, ingredient.ingredient));
        ListView.renderShoppingList(list);
    }
});

Base.shoppingList.addEventListener('click', e => {

    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        ListView.deletShoppingItem(id);
    } else if (e.target.matches('.shopping__count, .shopping__count *')) {
        const count = parseFloat(e.target.value);
        state.list.updateCount(id, count);
    }
});