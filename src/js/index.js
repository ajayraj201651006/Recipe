import Search from './models/Search'; //importing the search class
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';

/****
* Global State of the App
* -Search Object
* -Current Recipe Object
* -Shopping List Object
* -Liked Recipes
*/
const state = {};

//SEARCH CONTROLLER

//control search function-->
const controlSearch = async () => {
    // 1. get query from the view
    const query = searchView.getInput();
    // console.log(query);
    
    if(query) {
        // 2. create search object in the state
        state.search = new Search(query);

        try {
            // 3. prepare the UI for results
            searchView.clearInput();
            searchView.clearResult();
            renderLoader(elements.searchRes);
    
            // 4. get results for search
            await state.search.getRecipes();
    
            // 5. Renders results on the UI
            // console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            console.log('Something went wrong with the search recipes..!')
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${elementStrings.btnInline}`);
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});


//RECIPE CONTROLLER
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        //preapare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.searchRecipe);

        //highlighted the selected search item
        if(state.search) recipeView.highletedSelected(id);

        //create recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe from recipe model
            await state.recipe.getRecipe();
            state.recipe.parsedIngredients();
    
            //calculate servings and times
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            //render recipe on the UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error) {
            console.log(error);
            console.log('Something went wrong to get recipes!');
        }

    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//update servings
elements.searchRecipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease servings
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
       //increase servings
       state.recipe.updateServings('inc');
       recipeView.updateServingIngredients(state.recipe);
    }
});
