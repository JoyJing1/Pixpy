const album = (state, action) => {
    switch (action.type) {
        case 'ADD_ALBUM':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };

        default:
            return state;
    }
};

const albums = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ALBUM':
            return [
                ...state,
                album(undefined, action)
            ]
        default:
            return state;
    }
};

export default albums;
