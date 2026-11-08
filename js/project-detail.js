'use strict';

const detailRoot = document.getElementById('project-detail');
const projectId = new URLSearchParams(location.search).get('id');
const project = findProject(projectId);

function reveal(element, order) {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-order', order);
    return element;
}

function createBackLink() {
    const link = createElement('a', 'back-link', 'All projects');
    link.href = 'index.html#projects';
    link.prepend(createArrowIcon('left'));
    return link;
}

function createActionLink(label, url, className) {
    const link = createElement('a', `button ${className}`, label);
    link.href = url;
    link.append(createArrowIcon('right'));
    return link;
}

function createGallery(images, mainImage) {
    const gallery = createElement('div', 'detail-gallery');
    gallery.setAttribute('role', 'group');
    gallery.setAttribute('aria-label', 'Screenshots');

    const buttons = images.map((image, index) => {
        const button = createElement('button', 'gallery-thumb');
        button.type = 'button';
        button.setAttribute('aria-pressed', String(index === 0));
        button.setAttribute('aria-label', `Show screenshot ${index + 1}: ${image.alt}`);

        const thumb = createElement('img');
        thumb.src = image.src;
        thumb.alt = '';
        button.append(thumb);

        button.addEventListener('click', () => {
            mainImage.src = image.src;
            mainImage.alt = image.alt;
            buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
        });
        return button;
    });

    gallery.append(...buttons);
    return gallery;
}

function renderProject() {
    document.title = `${project.title} | Nay Naing`;
    document.querySelector('meta[name="description"]').setAttribute('content', project.summary);
    detailRoot.dataset.projectId = project.id;

    const meta = createElement('div', 'card-meta');
    meta.append(createElement('span', 'badge badge-category', project.category));
    if (project.status) {
        meta.append(createElement('span', 'badge badge-status', project.status));
    }

    const title = createElement('h1', 'detail-title', project.title);
    title.id = 'project-title';

    const overview = createElement('div', 'detail-overview');
    overview.append(...project.overview.map((paragraph) => createElement('p', '', paragraph)));

    const features = createElement('ul', 'check-list detail-features');
    features.setAttribute('aria-label', 'Features');
    project.features.forEach((feature) => features.append(createElement('li', '', feature)));

    const actions = createElement('div', 'detail-actions');
    if (project.demoUrl) {
        actions.append(createActionLink('Live demo', project.demoUrl, 'button-primary'));
    }
    actions.append(createActionLink('Source code', project.sourceUrl,
        project.demoUrl ? 'button-secondary' : 'button-primary'));

    const text = createElement('div', 'detail-text');
    text.append(
        reveal(createBackLink(), 0),
        reveal(meta, 1),
        reveal(title, 2),
        reveal(overview, 3),
        reveal(features, 4),
        reveal(createTechList(project.technologies), 5),
        reveal(actions, 6)
    );

    const media = reveal(createElement('div', 'detail-media'), 1);
    const cover = createProjectCover(project, 'detail-cover');
    media.append(cover);
    if (project.images && project.images.length > 1) {
        media.append(createGallery(project.images, cover.querySelector('.cover-image')));
    }

    detailRoot.setAttribute('aria-labelledby', 'project-title');
    detailRoot.replaceChildren(text, media);
}

function renderNotFound() {
    document.title = 'Project not found | Nay Naing';

    const title = createElement('h1', 'detail-title', 'Project not found');
    title.id = 'project-title';

    const message = createElement('p', 'detail-lead',
        'That project link doesn\'t match anything in my portfolio. It may have been renamed.');

    const text = createElement('div', 'detail-text');
    text.append(reveal(createBackLink(), 0), reveal(title, 1), reveal(message, 2));

    detailRoot.setAttribute('aria-labelledby', 'project-title');
    detailRoot.replaceChildren(text);
}

if (project) {
    renderProject();
} else {
    renderNotFound();
}
