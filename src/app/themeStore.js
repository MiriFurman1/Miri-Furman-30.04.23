import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

const themeStore = (set) => ({
    darkMode: false,
    toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }));
    },
    toggleTempUnit: () => {
        set((state) => ({
            tempUnit: state.tempUnit === "Metric" ? "Imperial" : "Metric",
        }));
    },
    tempUnit: "celsius",
});

const useThemeStore = create(
    devtools(
        persist(themeStore, {
            name: "theme",
        })
    )
);

export default useThemeStore;
