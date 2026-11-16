// Runs before paint: lets CSS know JavaScript is on (only touches <html>, which suppresses hydration warnings).
export const initScript = `document.documentElement.classList.add('js');`;