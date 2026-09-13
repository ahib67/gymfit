# PulseFit Gym — Static Website

A 5-page static website (Home, About, Services, Gallery, Contact) built with plain HTML5, CSS3 (Flexbox + Grid), and vanilla JavaScript. Built for Web Technologies Assignment 01.

## Folder Structure
```
gymfit/
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/   (empty — some images loaded from Unsplash URLs, others from google images)
```

## JavaScript Features 
1. **Hamburger / responsive nav menu** — toggles `.open` class on small screens.
2. **Image slider/carousel** — auto-plays, has prev/next arrows and dot navigation (Home page).
3. **Accordion (FAQ)** — expands/collapses one panel at a time using `scrollHeight` (Services page).
4. **Gallery filter + lightbox modal** — filters by category, opens a full image in a modal overlay (Gallery page).
5. **Contact form validation** — checks name length, email format (regex), phone format, and message length before "submitting" (Contact page).
6. **Active nav highlight + scroll-reveal animation** — small polish features using `IntersectionObserver`.


## Running Locally
No build step needed — just open `index.html` in a browser, or run a local server:
```bash
python -m http.server 8000
```
