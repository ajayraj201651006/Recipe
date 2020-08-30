import { elements } from './base';
// import { Fraction } from 'fractional';


const gcd = (a, b) => {
    if (b < 0.0000001) return a;           
  
    return gcd(b, Math.floor(a % b)); 
};

const decimalToFraction = (dec) => {
    const len = dec.toString().length - 2;
    let denominator = Math.pow(10, len);
    let numerator = dec * denominator;
    let divisor = gcd(numerator, denominator);
    if(divisor !== 1) {
        numerator /= divisor;                         
        denominator /= divisor;
    } else {
        denominator = numerator;
        numerator = 1;
    }

    return `${Math.floor(numerator)}/${Math.floor(denominator)}`;
}

const formatCount = count => {
    if(count) {
        const [int, dec] = count.toString().split('.').map(el => parseInt(el));
    
        if(!dec) return count;
    
        if(int === 0) {
            return decimalToFraction((count).toFixed(1));
        } else {
            return `${int} ${decimalToFraction((count-int).toFixed(1))}`;
        }
    }
    return '?';
};

const createIngredient = ingredient => {
    return `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(ingredient.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredient}
            </div>
        </li>  
    `; 
};

export const clearRecipe = () => {
    elements.searchRecipe.innerHTML = '';
};

export const highletedSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

export const renderRecipe = recipe => {
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ing.map(el => createIngredient(el)).join('')}
                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;

    elements.searchRecipe.insertAdjacentHTML("afterbegin", markup);
}