import axios from 'axios'

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        try {
            const key = '36d02b55fef276a2139930a7687c495c';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const url = 'https://www.food2fork.com/api/search';
            const result = await axios(`${proxy}${url}?key=${key}&query=${this.query}`);
            this.results = result.data.recipes;
        } catch{
            console.log('Error occured');
        }
    }
}