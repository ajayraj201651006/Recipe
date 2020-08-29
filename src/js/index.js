import Search from './models/Search'; //importing the search class

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
    const query = 'pizza';
    
    if(query) {
        // 2. create search object in the state
        state.search = new Search(query);
        
        // 3. prepare the UI for results

        // 4. get results for search
        await state.search.getRecipes();

        // 5. Renders results on the UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});