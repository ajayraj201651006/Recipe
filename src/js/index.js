import Search from './models/Search'; //importing the search class
import * as searchView from './views/searchView';
import { elements } from './views/base';

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
    console.log(query);
    
    if(query) {
        // 2. create search object in the state
        state.search = new Search(query);
        
        // 3. prepare the UI for results
        searchView.clearInput();
        searchView.clearResult();

        // 4. get results for search
        await state.search.getRecipes();

        // 5. Renders results on the UI
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});