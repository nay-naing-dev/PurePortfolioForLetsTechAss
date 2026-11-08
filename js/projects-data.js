'use strict';

const GITHUB_URL = 'https://github.com/nay-naing-dev';

const projects = [
    {
        id: 'nail-art-studio',
        title: 'Nail Art Studio Web App',
        summary:
            'A booking app for a nail art studio. Customers upload a photo of their hand, crop it on a canvas ' +
            'and preview designs with a virtual try-on before booking an appointment.',
        overview: [
            'A booking web app for a nail art studio. Instead of picking from a static gallery, customers ' +
            'upload a photo of their own hand, crop it on a canvas and preview nail designs on it with a ' +
            'virtual try-on before they book an appointment.',
            'The React (Vite) frontend talks to an Express.js API. Uploaded photos go through Multer and are ' +
            'stored on Cloudinary, and app data lives in MongoDB.'
        ],
        features: [
            'Hand photo upload, handled by Multer and stored on Cloudinary',
            'Canvas-based crop tool to frame the hand before previewing',
            'Virtual try-on that previews nail designs on the customer\'s own photo',
            'Appointment booking backed by an Express.js and MongoDB API'
        ],
        category: 'Full-Stack Apps',
        technologies: ['React (Vite)', 'Express.js', 'MongoDB', 'Multer', 'Cloudinary'],
        sourceUrl: `${GITHUB_URL}/NailArtStudioV2`,
        demoUrl: '',
        status: '',
        cover: { hue: 330, label: 'NAIL' },
        images: [
            { src: 'assets/projects/nail-art-studio.jpg', alt: 'Nail Art Studio app: virtual try-on, nail shapes, services and booking screens' }
        ]
    },
    {
        id: '3d-interactive-portfolio',
        title: '3D Interactive Portfolio',
        summary:
            'A portfolio site with Three.js 3D scenes and scroll animations, plus a chatbot that answers ' +
            'questions about me through a serverless Gemini AI backend.',
        overview: [
            'A portfolio site built around Three.js 3D scenes, with GSAP driving the scroll animations ' +
            'between sections.',
            'Visitors can ask a chatbot questions about me. It runs through a serverless function on Vercel ' +
            'that calls the Gemini API, so no API key is ever exposed in the browser.'
        ],
        features: [
            'Interactive Three.js 3D scenes',
            'Scroll-driven animations with GSAP',
            'AI chatbot powered by a serverless Gemini API function',
            'Deployed on Vercel'
        ],
        category: 'Frontend Apps',
        technologies: ['Three.js', 'GSAP', 'JavaScript', 'Gemini API', 'Vercel'],
        sourceUrl: `${GITHUB_URL}/Portfolio`,
        demoUrl: 'https://portfolio-one-blue-12.vercel.app',
        status: '',
        cover: { hue: 265, label: '3D' },
        images: [
            { src: 'assets/projects/portfolio-hero.png', alt: '3D portfolio home screen with sidebar navigation and portrait' },
            { src: 'assets/projects/portfolio-chatbot.png', alt: '3D portfolio with the AI assistant chat panel open' }
        ]
    },
    {
        id: 'movie-search',
        title: 'Movie Search & Discovery',
        summary:
            'Search for movies and browse listings with trailers, cast lists and ratings pulled from an ' +
            'external media API, with Firebase for app data.',
        overview: [
            'A Vue.js app for finding something to watch. Search for a movie or browse listings, then open ' +
            'one to see its trailer, cast and ratings.',
            'Movie details come from an external media API, and Firebase stores the app\'s own data.'
        ],
        features: [
            'Movie search and browsable listings',
            'Trailers, cast lists and ratings from an external media API',
            'Firebase for app data'
        ],
        category: 'Frontend Apps',
        technologies: ['Vue.js', 'JavaScript', 'Movie API', 'Firebase'],
        sourceUrl: `${GITHUB_URL}/Movie-chillm`,
        demoUrl: '',
        status: '',
        cover: { hue: 12, label: 'FILM' },
        images: [
            { src: 'assets/projects/movie-popular.png', alt: 'Popular movies grid with posters, ratings and release dates' },
            { src: 'assets/projects/movie-upcoming.png', alt: 'Upcoming movies shown in a 3D carousel' }
        ]
    },
    {
        id: 'taungoo-1550',
        title: 'Taungoo 1550: 2.5D Action Game',
        summary:
            'A Godot action game set in Myanmar\'s Taungoo era. Explore a top-down city of palaces, markets ' +
            'and rice paddies, face King Tabinshwehti as a boss, then fight in side-view stages.',
        overview: [
            'A Godot action game set in Myanmar\'s Taungoo era. Players explore a top-down city of palaces, ' +
            'markets and rice paddies, face King Tabinshwehti as a boss, then fight through side-view stages.',
            'The game was built with an agentic AI coding workflow: I direct the design and review every ' +
            'change while AI tools help write and refactor the GDScript.'
        ],
        features: [
            'Top-down city exploration: palaces, markets and rice paddies',
            'Boss fight against King Tabinshwehti',
            'Side-view combat stages',
            'Built with an agentic AI coding workflow'
        ],
        category: 'Games',
        technologies: ['Godot 4', 'GDScript', 'Agentic AI coding'],
        sourceUrl: `${GITHUB_URL}/TaunGooEmpire`,
        demoUrl: '',
        status: 'Demo, in progress',
        cover: { hue: 40, label: '1550' },
        images: [
            { src: 'assets/projects/taungoo-1550.jpg', alt: 'The Rise of Taungoo game poster with King Tabinshwehti and a map of the Taungoo Empire' }
        ]
    }
];

function findProject(id) {
    return projects.find((project) => project.id === id);
}

function getProjectUrl(project) {
    return `project.html?id=${encodeURIComponent(project.id)}`;
}
