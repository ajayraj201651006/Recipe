export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        //persist Data in localstorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        //find the index of the delete like
        const findLikeIndex = this.likes.findIndex(el => el.id === id);

        //remove the like
        this.likes.splice(findLikeIndex, 1);

        //persist Data in localstorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        //Restoring the likes from the srorage
        if(storage) this.likes = storage;
    }
}