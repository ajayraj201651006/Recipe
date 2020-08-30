import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ing = res.data.recipe.ingredients;
        }catch(error) {
            console.log(error);
        }
    }

    calcTime() {
        const numIng = this.ing.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parsedIngredients() {
        const unitLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups', 'pounds'];
        const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...unitShort, 'kg', 'g'];
        const newIngredients = this.ing.map(el => {
            //uniform the ingredients
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            //remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //parsed ingredient into count, unit and ingredient
            const argIng = ingredient.split(' ');
            const unitIndex = argIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1) {
                //There is a unit
                const arrCount = argIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1) {
                    count = eval(argIng[0].replace('-', '+'));
                } else {
                    count = eval(argIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: argIng[unitIndex],
                    ingredient: argIng.slice(unitIndex + 1).join(' ')
                };
            }else if(parseInt(argIng[0], 10)) {
               //There is no unit but 1st element is number
               objIng = {
                count: parseInt(argIng[0], 10),
                unit: '',
                ingredient: argIng.slice(1).join(' ')
            }
            } else if(unitIndex === -1) {
               //There is no unit and no number in 1st position
               objIng = {
                   count: 1,
                   unit: '',
                   ingredient
               }
            } 

            return objIng;
        });

        this.ing = newIngredients;
    }
}