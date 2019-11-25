"use strict";
const THEME_VALUES = ["system", "light", "dark"];
const stringIsTheme = (s) => THEME_VALUES.includes(s);
const themeFromInput = (event) => event.target instanceof HTMLInputElement && stringIsTheme(event.target.value)
    ? event.target.value
    : "system";
const updateRootClass = (root, newTheme) => {
    THEME_VALUES.forEach(className => root.classList.remove(className));
    if (newTheme !== "system")
        root.classList.add(newTheme);
};
const LOCAL_STORAGE_KEY = `chriskrycho.com:theme`;
const savePreference = (theme) => theme === "system"
    ? localStorage.removeItem(LOCAL_STORAGE_KEY)
    : localStorage.setItem(LOCAL_STORAGE_KEY, theme);
const loadPreference = () => {
    const fromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    return fromStorage && stringIsTheme(fromStorage) ? fromStorage : "system";
};
const setThemeOn = (root) => (event, ..._) => {
    const theme = themeFromInput(event);
    updateRootClass(root, theme);
    savePreference(theme);
};
window.onload = () => {
    var _a;
    const root = document.querySelector('html');
    const form = document.querySelector('#theme-chooser');
    if (!root || !form) {
        return;
    }
    const theme = loadPreference();
    updateRootClass(root, theme);
    (_a = document.querySelector(`input[value=${theme}]`)) === null || _a === void 0 ? void 0 : _a.setAttribute('checked', 'checked');
    document
        .querySelectorAll('#theme-chooser input')
        .forEach(input => input.addEventListener('input', setThemeOn(root)));
    form.classList.remove('no-js-hidden');
};
