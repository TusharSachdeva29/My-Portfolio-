// Bumped from "theme": an old bug saved "light" for every first-time visitor,
// which would otherwise keep overriding their system preference.
export const THEME_STORAGE_KEY = "theme-preference";

// Runs inline in <head> before first paint so there is no light/dark flash.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;
