'use strict';

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const messageCount = document.getElementById('message-count');

const formFields = {
    name: contactForm.elements.name,
    email: contactForm.elements.email,
    message: contactForm.elements.message
};
const validationRules = {
    name(value) {
        if (value.length === 0) return 'Please enter your name.';
        if (value.length < 2) return 'Your name must be at least 2 characters.';
        return '';
    },
    email(value) {
        if (value.length === 0) return 'Please enter your email address.';
        if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email, like name@example.com.';
        return '';
    },
    message(value) {
        if (value.length === 0) return 'Please write a message.';
        if (value.length < MESSAGE_MIN) {
            return `Your message needs at least ${MESSAGE_MIN} characters (it has ${value.length}).`;
        }
        if (value.length > MESSAGE_MAX) {
            return `Your message is ${value.length - MESSAGE_MAX} characters over the ${MESSAGE_MAX} limit.`;
        }
        return '';
    }
};
function validateField(fieldName) {
    const input = formFields[fieldName];
    const errorMessage = validationRules[fieldName](input.value.trim());
    const hasError = errorMessage !== '';

    document.getElementById(`${fieldName}-error`).textContent = errorMessage;
    input.setAttribute('aria-invalid', String(hasError));
    input.closest('.form-field').classList.toggle('has-error', hasError);

    return !hasError;
}

function updateMessageCount() {
    const length = formFields.message.value.trim().length;
    messageCount.textContent = `${length} / ${MESSAGE_MAX}`;
    messageCount.classList.toggle('is-over', length > MESSAGE_MAX);
}

function setFormStatus(text) {
    formStatus.textContent = '';
    if (text) {
        window.setTimeout(() => {
            formStatus.textContent = text;
        }, 50);
    }
}
console.log(Object.keys(formFields));
Object.keys(formFields).forEach((fieldName) => {
    const input = formFields[fieldName];
    input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
            validateField(fieldName);
        }
        if (fieldName === 'message') {
            updateMessageCount();
        }
        setFormStatus('');
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            validateField(fieldName);
        }
    });
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalidFields = Object.keys(formFields).filter((fieldName) => !validateField(fieldName));

    if (invalidFields.length > 0) {
        setFormStatus('');
        formFields[invalidFields[0]].focus();
        return;
    }

    setFormStatus('Demo only. Your message has not been sent.');
});

updateMessageCount();

const projectGrid = document.getElementById('project-grid');
const filterBar = document.getElementById('project-filters');
const projectCount = document.getElementById('project-count');
const ALL_CATEGORIES = 'All';

let activeCategory = ALL_CATEGORIES;

function createProjectCard(project) {
    const card = createElement('article', 'project-card');
    card.dataset.projectId = project.id;

    const meta = createElement('div', 'card-meta');
    meta.append(createElement('span', 'badge badge-category', project.category));
    if (project.status) {
        meta.append(createElement('span', 'badge badge-status', project.status));
    }

    const detailsLink = createElement('a', 'button button-primary card-details', 'View details');
    detailsLink.href = getProjectUrl(project);
    detailsLink.append(createElement('span', 'visually-hidden', ` for ${project.title}`), createArrowIcon('right'));

    const sourceLink = createElement('a', 'card-link', 'Source');
    sourceLink.href = project.sourceUrl;
    sourceLink.append(createElement('span', 'visually-hidden', ` code for ${project.title}`));

    const actions = createElement('div', 'card-actions');
    actions.append(detailsLink, sourceLink);

    const body = createElement('div', 'card-body');
    body.append(
        meta,
        createElement('h3', 'card-title', project.title),
        createElement('p', 'card-description', project.summary),
        createTechList(project.technologies),
        actions
    );

    card.append(createProjectCover(project, 'card-cover'), body);
    return card;
}

function getVisibleProjects() {
    if (activeCategory === ALL_CATEGORIES) return projects;
    return projects.filter((project) => project.category === activeCategory);
}

function renderProjects() {
    const visibleProjects = getVisibleProjects();

    projectGrid.replaceChildren(...visibleProjects.map(createProjectCard));

    const noun = visibleProjects.length === 1 ? 'project' : 'projects';
    const scope = activeCategory === ALL_CATEGORIES ? '' : ` in ${activeCategory}`;
    projectCount.textContent = `Showing ${visibleProjects.length} of ${projects.length} ${noun}${scope}`;
}

function renderFilters() {
    const categories = [ALL_CATEGORIES, ...new Set(projects.map((project) => project.category))];

    const buttons = categories.map((category) => {
        const total = category === ALL_CATEGORIES
            ? projects.length
            : projects.filter((project) => project.category === category).length;

        const button = createElement('button', 'filter-button', category);
        button.type = 'button';
        button.dataset.category = category;
        button.setAttribute('aria-pressed', String(category === activeCategory));
        button.append(createElement('span', 'filter-total', `(${total})`));
        return button;
    });

    filterBar.replaceChildren(...buttons);
}

filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-button');
    if (!button) return;

    activeCategory = button.dataset.category;
    filterBar.querySelectorAll('.filter-button').forEach((filterButton) => {
        filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });
    renderProjects();
});

renderFilters();
renderProjects();
