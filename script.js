// script.js

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.querySelector('.language-switcher');
    const langLinks = languageSwitcher.querySelectorAll('.lang-link');
    const htmlElement = document.documentElement; // Get the <html> element
    const bodyElement = document.body;

    // Function to set the language
    function setLanguage(lang) {
        // Update body class to show/hide elements via CSS
        bodyElement.classList.remove('active-lang-en', 'active-lang-de');
        bodyElement.classList.add(`active-lang-${lang}`);
        
        // Update the lang attribute on the <html> tag
        htmlElement.setAttribute('lang', lang);

        // Update active class on switcher links
        langLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Store the selected language in localStorage
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (e) {
            console.warn('Could not save language preference to localStorage:', e);
        }
    }

    // Event listeners for language links
    langLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent page jump if using href="#"
            const selectedLang = link.getAttribute('data-lang');
            if (selectedLang) { // Ensure selectedLang is not null
                setLanguage(selectedLang);
            }
        });
    });

    // Check for stored language preference on page load
    let preferredLanguage = 'en'; // Default to English
    try {
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang && (storedLang === 'en' || storedLang === 'de')) {
            preferredLanguage = storedLang;
        }
    } catch (e) {
        console.warn('Could not retrieve language preference from localStorage:', e);
    }
    
    // Initial language set
    // Check if languageSwitcher and langLinks are found before proceeding
    if (languageSwitcher && langLinks.length > 0) {
        setLanguage(preferredLanguage);
    } else {
        console.error('Language switcher elements not found. Check HTML class names.');
    }
});
