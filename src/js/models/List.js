import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        //find the index of the delete item
        const findItemIndex = this.items.findIndex(el => el.id === id);

        //remove the item
        this.items.splice(findItemIndex, 1);
    }

    updateCount(id, newCount) {
        //find the item
        const findItem = this.items.find(el => el.id === id);

        //update count
        findItem.count = newCount;
    }
}