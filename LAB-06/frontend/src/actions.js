const createCollection = (name) =>({
    type: 'CREATE_SUBCOLLECTION',
    payload: {
        name: name
    }
});

const deleteCollection = (id) =>({
    type: 'DELETE_SUBCOLLECTION',
    payload: {
        id: id
    }
});

const selectCollection = (id) =>({
    type: 'SELECT_SUBCOLLECTION',
    payload: {
        id: id
    }
});

const addToCollection = (comic) =>({
    type: 'ADD_TO_SUBCOLLECTION',
    payload: {
        comic: comic
    }
});

const delFmCollection = (comic) =>({
    type: 'DEL_FM_SUBCOLLECTION',
    payload: {
        comic: comic
    }
});

export {
    createCollection,
    deleteCollection,
    selectCollection,
    addToCollection,
    delFmCollection
};