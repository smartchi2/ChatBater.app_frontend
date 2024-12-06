import {create} from "zustand";

export const useThemeStore = create((set) => ({
    theme:  localStorage.getItem("chatBater-theme") || "cupcake",
    setTheme: (theme) => {
        localStorage.setItem("chatBater-theme", theme)
        set({theme})
    }
}))
export default useThemeStore;