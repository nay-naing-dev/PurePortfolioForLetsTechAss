'use strict';

(function () {
    const DETAIL_PAGE = 'project.html';

    function getDetailId(url) {
        const parsed = new URL(url, location.href);
        if (!parsed.pathname.endsWith(`/${DETAIL_PAGE}`)) return null;
        return parsed.searchParams.get('id') || '';
    }

    function getDirection(fromUrl, toUrl) {
        const fromId = getDetailId(fromUrl);
        const toId = getDetailId(toUrl);

        if (fromId === null && toId === null) return null;
        if (fromId === null) return 'forward';
        if (toId === null) return 'backward';

        const fromIndex = projects.findIndex((project) => project.id === fromId);
        const toIndex = projects.findIndex((project) => project.id === toId);
        return toIndex >= fromIndex ? 'forward' : 'backward';
    }

    function getSharedProjectId(fromUrl, toUrl) {
        const fromId = getDetailId(fromUrl);
        const toId = getDetailId(toUrl);
        if (fromId !== null && toId !== null) return null;
        return fromId ?? toId;
    }

    function clearSharedNames() {
        document.querySelectorAll('[data-transition-part]').forEach((element) => {
            element.style.viewTransitionName = '';
        });
    }

    function setSharedNames(projectId) {
        const container = document.querySelector(`[data-project-id="${CSS.escape(projectId)}"]`);
        if (!container) return;
        container.querySelectorAll('[data-transition-part]').forEach((element) => {
            element.style.viewTransitionName = `${element.dataset.transitionPart}-${projectId}`;
        });
    }

    window.addEventListener('pageswap', (event) => {
        if (!event.viewTransition || !event.activation) return;

        const toUrl = event.activation.entry.url;
        clearSharedNames();

        const sharedId = getSharedProjectId(location.href, toUrl);
        if (sharedId) setSharedNames(sharedId);
    });

    window.addEventListener('pagereveal', (event) => {
        if (!event.viewTransition) return;
        clearSharedNames();

        const fromEntry = window.navigation?.activation?.from;
        if (!fromEntry) return;

        const direction = getDirection(fromEntry.url, location.href);
        if (direction) event.viewTransition.types.add(direction);

        const sharedId = getSharedProjectId(fromEntry.url, location.href);
        if (sharedId) {
            setSharedNames(sharedId);
            document.documentElement.classList.add('is-morphing');
            event.viewTransition.finished.finally(() => {
                clearSharedNames();
                document.documentElement.classList.remove('is-morphing');
            });
        }
    });
})();
