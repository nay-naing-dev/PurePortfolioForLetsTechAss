# Nay Naing — Portfolio

A personal portfolio website for Nay Naing, a second-year Computer Engineering and IT student learning full-stack web development.

It is built with plain HTML, CSS and JavaScript. There is no framework, build step or package to install.

## Features

- **Sections:** About, Skills, Projects and Contact, with a menu that collapses on mobile
- **Project cards:** each card shows a cover image and title and links to that project's detail page
- **Category filter:** buttons that show only the projects in one category, such as Full-Stack Apps, Frontend Apps or Games
- **Project detail page** ([project.html](project.html)): overview, features, technologies, an image gallery and source/demo links
- **Light and dark mode:** the choice is saved in `localStorage`
- **Page transitions** between the project list and detail pages
- **Contact form** with input checks on the page (demo only: messages are not sent anywhere)
- **Accessibility:** a skip link, keyboard support and screen-reader labels

## Project structure

```
├── index.html            Main page (about, skills, projects, contact)
├── project.html          Project detail page (project.html?id=<project-id>)
├── css/
│   └── style.css         All site styles
├── js/
│   ├── theme-init.js     Applies the saved theme before the page renders
│   ├── projects-data.js  Project content (the single source of project data)
│   ├── transitions.js    Page transitions between list and detail pages
│   ├── site.js           Shared helpers: nav menu, theme toggle, cards
│   ├── main.js           Home page: project grid, filters, contact form
│   └── project-detail.js Renders the detail page from the URL id
└── assets/
    ├── icons/            Technology icons
    └── projects/         Project screenshots
```

## Running locally

Open `index.html` in a browser. If you'd rather use a local server, run this from the project folder:

```bash
npx serve .
# or
python -m http.server 8000
```

Then visit `http://localhost:8000` (with `serve`, use the address it prints).

## Adding a project

Add an object to the `projects` array in [js/projects-data.js](js/projects-data.js):

```js
{
    id: 'my-project',                 // used in the URL: project.html?id=my-project
    title: 'My Project',
    summary: 'One or two sentences.',
    overview: ['Paragraph one.', 'Paragraph two.'],
    features: ['Feature one', 'Feature two'],
    category: 'Frontend Apps',        // new categories get their own filter button
    technologies: ['React', 'Node.js'],
    sourceUrl: `${GITHUB_URL}/my-repo`,
    demoUrl: '',                      // optional live demo link
    status: '',                       // e.g. 'Demo, in progress'
    cover: { hue: 200, label: 'MY' }, // fallback cover when there is no image
    images: [
        { src: 'assets/projects/my-project.png', alt: 'Describe the screenshot' }
    ]
}
```

Put screenshots in `assets/projects/`. The first image is used as the card cover.

## Tech

HTML5 · CSS3 · JavaScript (ES6+) · Google Fonts (Cinzel, IBM Plex Mono)

## Links

- GitHub: [nay-naing-dev](https://github.com/nay-naing-dev)
