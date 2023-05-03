import { create } from 'zustand';

import { devtools, persist } from 'zustand/middleware'


const favoritesStore = (set) => ({
    favorites: [],

    addFavorite: (favorite) => {
        set((state) => ({
            favorites: [favorite, ...state.favorites],
        }))
    },
    removeFavorite: (favoriteKey) => {

        set((state) => ({
            favorites: state.favorites.filter((c) => c.Key !== favoriteKey)
        }))
    },
    selectedCity: null,
    setSelectedCity: (cityKey) => set({ selectedCity: cityKey }),
})

const useFavoritesStore = create(
    devtools(
        persist(favoritesStore, {
            name: "favorites",
        })
    )
)


export default useFavoritesStore;