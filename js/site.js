'use strict';

const siteNav = document.getElementById('site-nav');
const menuButton = siteNav.querySelector('.menu-toggle');
const mobileQuery = window.matchMedia('(max-width: 767.98px)');

function isMenuOpen() {
    return menuButton.getAttribute('aria-expanded') === 'true';
}

function setMenuOpen(isOpen) {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    siteNav.classList.toggle('is-open', isOpen);
}

menuButton.addEventListener('click', () => {
    setMenuOpen(!isMenuOpen());
});

siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobileQuery.matches) {
        setMenuOpen(false);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
        setMenuOpen(false);
        menuButton.focus();
    }
});

document.addEventListener('click', (event) => {
    if (isMenuOpen() && !siteNav.contains(event.target)) {
        setMenuOpen(false);
    }
});

mobileQuery.addEventListener('change', () => setMenuOpen(false));

const THEME_STORAGE_KEY = 'portfolio-theme';
const themeButton = document.querySelector('.theme-toggle');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
    }
}

themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
});

applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

function createProjectCover(project, extraClass) {
    const cover = createElement('div', `project-cover ${extraClass}`);
    cover.dataset.transitionPart = 'project-cover';
    cover.style.setProperty('--cover-hue', project.cover.hue);

    if (project.images && project.images.length > 0) {
        const image = createElement('img', 'cover-image');
        image.src = project.images[0].src;
        image.alt = project.images[0].alt;
        cover.append(image);
    } else {
        cover.append(createElement('span', 'cover-label', project.cover.label));
        cover.setAttribute('aria-hidden', 'true');
    }
    return cover;
}

function createTechList(technologies) {
    const techList = createElement('ul', 'tech-list');
    techList.setAttribute('aria-label', 'Technologies used');
    technologies.forEach((tech) => {
        techList.append(createElement('li', '', tech));
    });
    return techList;
}

function createArrowIcon(direction) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'square');
    svg.classList.add('arrow-icon');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', direction === 'left' ? 'M19 12H7M12 6l-6 6 6 6' : 'M5 12h12M12 6l6 6-6 6');
    svg.append(path);
    return svg;
}
