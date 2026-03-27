import { createContext, useContext, useReducer } from "react";

const initialState = {
    user: null,
    wishlist: [],
};

function appReducer(state, action) {
    switch (action.type) {

        case "SET_USER":
            return { ...state, user: action.payload };

        case "LOGOUT":
            return { ...state, user: null };

        case "ADD_TO_WISHLIST":
            {
                const alreadyAdded = state.wishlist.some(m => m.id === action.payload.id);
                if (alreadyAdded) return state;
                return { ...state, wishlist: [...state.wishlist, action.payload] };
            }

        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(m => m.id !== action.payload),
            };

        default:
            return state;
    }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const toggleWishlist = (movie) => {
        const isAdded = state.wishlist.some(m => m.id === movie.id);
        if (isAdded) {
            dispatch({ type: "REMOVE_FROM_WISHLIST", payload: movie.id });
        } else {
            dispatch({ type: "ADD_TO_WISHLIST", payload: movie });
        }
    };

    return (
        <AppContext.Provider value={{ ...state, dispatch, toggleWishlist }}>
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
    return useContext(AppContext);
}