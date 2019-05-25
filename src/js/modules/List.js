import uniqid from 'uniqid';

export default class List {

    constructor() {
        this.items = [];
    };

    addItems(unit, count, ingredient) {
        const item = {
            id: uniqid(),
            unit,
            count,
            ingredient
        }
        this.items.push(item);
    };

    deleteItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        const item = this.items.find(item => item.id === id);
        item.count = newCount;
        console.log(item.count);
    }
}