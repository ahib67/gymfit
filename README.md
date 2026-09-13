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
└── images/   (empty — all images loaded from Unsplash URLs)
```

## JavaScript Features (for viva)
1. **Hamburger / responsive nav menu** — toggles `.open` class on small screens.
2. **Image slider/carousel** — auto-plays, has prev/next arrows and dot navigation (Home page).
3. **Accordion (FAQ)** — expands/collapses one panel at a time using `scrollHeight` (Services page).
4. **Gallery filter + lightbox modal** — filters by category, opens a full image in a modal overlay (Gallery page).
5. **Contact form validation** — checks name length, email format (regex), phone format, and message length before "submitting" (Contact page).
6. **Active nav highlight + scroll-reveal animation** — small polish features using `IntersectionObserver`.

## Git / GitHub Setup (do this yourself before the deadline)

```bash
cd gymfit
git init
git add .
git commit -m "Initial commit: base HTML structure for all pages"

# Create and merge feature branches one at a time
git checkout -b feature-navbar
# (make small tweak/commit here)
git commit -am "Add responsive navbar with hamburger menu"
git checkout main
git merge feature-navbar

git checkout -b feature-gallery
git commit -am "Add gallery filter and lightbox modal"
git checkout main
git merge feature-gallery

git checkout -b feature-contact-form
git commit -am "Add contact form with JS validation"
git checkout main
git merge feature-contact-form

# Push to GitHub
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

> Tip for the viva: make a few *real* small commits on each branch (not one giant commit) — the instructor checks commit history and branching, not just the final code.

## Running Locally
No build step needed — just open `index.html` in a browser, or run a local server:
```bash
python -m http.server 8000
```
