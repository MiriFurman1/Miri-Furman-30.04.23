import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

const themeStore = (set) => ({
    darkMode: false,
    toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }));
    },
});

const useThemeStore = create(
    devtools(
        persist(themeStore, {
            name: "theme",
        })
    )
)


export default useThemeStore;