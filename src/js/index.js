import Search from './models/Search'; //importing the search class
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';

/****
* Global State of the App
* -Search Object
* -Current Recipe Object
* -Shopping List Object
* -Liked Recipes
*/
const state = {};

//control search function-->
const controlSearch = async () => {
    // 1. get query from the view
    const query = searchView.getInput();
    // console.log(query);
    
    if(query) {
        // 2. create search object in the state
        state.search = new Search(query);
        
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