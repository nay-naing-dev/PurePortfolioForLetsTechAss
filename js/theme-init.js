(function () {
    var root = document.documentElement;

    root.classList.remove('no-js');

    try {
        if (localStorage.getItem('portfolio-theme') === 'dark') {
            root.setAttribute('data-theme', 'dark');
        }
    } catch (error) {
    }
})();
