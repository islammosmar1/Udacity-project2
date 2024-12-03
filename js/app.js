/**
 * Global Variables
 */
const ACTIVE_SECTION_THRESHOLD = 150;

/**
 * Helper Functions
 */

// Function to debounce scroll event
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Main Functions
 */

// Dynamically create navigation menu
function buildNavigationMenu() {
    const sections = document.querySelectorAll("section");
    const navContainer = document.getElementById("islam_navbar__list");

    sections.forEach((section) => {
        const navItem = document.createElement("li");
        navItem.textContent = section.dataset.nav;
        navItem.classList.add("menu__link");
        navItem.setAttribute("data-section-id", section.id);
        navContainer.appendChild(navItem);
    });
}

// Highlight the active section and its corresponding navigation item
function updateActiveSection() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
        const sectionPosition = section.getBoundingClientRect();

        if (
            sectionPosition.top <= ACTIVE_SECTION_THRESHOLD &&
            sectionPosition.bottom >= ACTIVE_SECTION_THRESHOLD
        ) {
            section.classList.add("active-section");

            const correspondingNav = document.querySelector(
                `.menu__link[data-section-id="${section.id}"]`
            );
            correspondingNav.classList.add("active-nav");
        } else {
            section.classList.remove("active-section");

            const correspondingNav = document.querySelector(
                `.menu__link[data-section-id="${section.id}"]`
            );
            if (correspondingNav) correspondingNav.classList.remove("active-nav");
        }
    });
}

// Smoothly scroll to the selected section
function scrollToSectionById(id) {
    const targetSection = document.getElementById(id);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Event Listeners
 */

// Build navigation menu on page load
buildNavigationMenu();

// Handle navigation link clicks
document.getElementById("islam_navbar__list").addEventListener("click", (event) => {
    event.preventDefault();
    const clickedItem = event.target;

    if (clickedItem.tagName === "LI" && clickedItem.classList.contains("menu__link")) {
        const sectionId = clickedItem.getAttribute("data-section-id");
        scrollToSectionById(sectionId);
    }
});

// Update active section on scroll (using debounce)
document.addEventListener("scroll", debounce(updateActiveSection));
