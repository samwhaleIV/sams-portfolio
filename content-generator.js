const htmlCreator = require("html-creator");
const fs = require("fs");
const manifest = JSON.parse(fs.readFileSync("manifest.json"));

const createProjectPage = page => {
    return {
        type: "div",
        attributes: { class: "project-page" },
        content: [
            {
                type: "p",
                attributes: { class: "title" },
                content: page.title
            },
            {
                type: "div",
                attributes: { class: "page-image" },
                content: [
                    {
                        type: "img",
                        attributes: { class: "image" },
                        attributes: { src: page.image }
                    },
                    {
                        type: "p",
                        attributes: { class: "description" },
                        content: page.description
                    }
                ]
            }
        ]
    };
};

const createProject = project => {
    return {
        type: "div",
        attributes: {
            class: "project",
            style: `background-color: ${project.color};`
        },
        content: [
            {
                type: "div",
                attributes: { class: "page-title-area" },
                content: [
                    {
                        type: "h1",
                        attributes: { class: "title" },
                        content: project.title
                    },
                    {
                        type: "p",
                        attributes: { class: "description" },
                        content: project.description
                    }
                ]
            },
            {
                type: "div",
                attributes: { class: "pages" },
                content: project.pages.map(createProjectPage)
            }
        ]
    };
};


const html = new htmlCreator([
    {
        type: "head",
        content: [
            { type: "title", content: manifest.title },
            { type: "meta", attributes: { charset: "UTF-8" } },
            { type: "meta", attributes: { httpEquiv: "X-UA-Compatible", content: "IE=edge" } },
            { type: "meta", attributes: { name: "viewport", content: "width=device-width, initial-scale=1.0" } },
            { type: "link", attributes: { rel: "stylesheet", type: "text/css", href: "style.css" } }
        ]
    },
    {
        type: "body",
        content: [
            {
                type: "div",
                attributes: { class: "body-content" },
                content: [
                    { type: "div", attributes: { class: "title-area" }, content: [
                        { type: "h1", content: manifest.title },
                        { type: "h2", content: manifest.subtitle },
                        { type: "p", content: [{ type: "a", content: manifest.url.description, attributes: { href: manifest.url.href } }] }
                    ]},
                    {
                        type: "div",
                        attributes: { class: "projects" },
                        content: manifest.projects.map(createProject)
                    },
                    { type: "script", attributes: { src: "script.js" }}
                ]
            }
        ]
    }
]);

fs.writeFileSync("index.html",html.renderHTML());
console.log("Saved index.html!");
