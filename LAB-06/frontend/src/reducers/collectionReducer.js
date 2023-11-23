import {v4 as uuid} from 'uuid';

const initialState = [
    {
      id: uuid(),
      name: 'X-Men',
      comics: [],
      selected: true,
      full: false
    }
];

let copyState = null;
let index = 0;


const collectionReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
        case 'CREATE_SUBCOLLECTION':
            return [...state, {id: uuid(), name: payload.name, comics:[], selected:false, full: false}];

        case 'DELETE_SUBCOLLECTION':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);

            if(copyState[index].selected === false){
                copyState.splice(index, 1);
            }
            return [...copyState];

        case 'SELECT_SUBCOLLECTION':
            return state.map((com) => {
                if (com.id === payload.id) {
                    return {
                        ...com,
                        selected: true
                    };
                } else return {
                    ...com,
                    selected: false
                };;
            });

        case 'ADD_TO_SUBCOLLECTION':
            return state.map((com) => {
                if(com.selected === true && com.comics.length < 20){
                    const exists = com.comics.some((c) => {
                        return c.id === payload.comic.id
                    })

                    if(!exists){
                        return {
                            ...com,
                            comics: [...com.comics, payload.comic],
                            full: com.comics.length+1 === 20
                        }
                    }

                    return {...com}

                } else if(com.selected === true && com.comics.length === 20){
                    return {
                        ...com,
                        full: true
                    }
                } else return {...com}
            })

        case 'DEL_FM_SUBCOLLECTION':

            return state.map((com) => {
                if(com.selected === true){
                    const newComics = com.comics.filter((c) => {
                        return c.id !== payload.comic.id
                    })
                    return {
                        ...com,
                        comics: newComics,
                        full: newComics.length === 20
                    }
                }else return {...com}
            })

        default:
            return state;
    }
}
export default collectionReducers;