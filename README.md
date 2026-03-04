# Animated Multi-Theme Profile Website

This repository now contains a complete personal profile website with:

- Multiple persona themes:
  - Cybersecurity
  - Ethical Hacker
  - Software Developer
- Dark blue hacker-style visual design.
- Live animated background (matrix-like rain effect).
- Scroll-based reveal + parallax-style motion effects.
- Contact and profile links with icon-style representation.
- Resume download support.

## Files Added

- `index.html` – Main structure and content sections.
- `styles.css` – Styling, dark theme colors, responsive layout, animation classes.
- `script.js` – Theme switching, scroll animation, and live canvas animation.
- `assets/resume-template.txt` – Downloadable placeholder resume file.

## How to Run

Open `index.html` directly in browser, or run a static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customizations You Can Make Later

### 1) Personal Details
Update in `index.html`:
- Name / brand text in header.
- Email and phone number.
- LinkedIn URL.
- Certificate URL.

### 2) Resume
- Replace `assets/resume-template.txt` with your real resume (PDF recommended).
- Update resume button `href` in `index.html` if filename changes.

### 3) Theme Content
Update role and description text in `script.js` (`profileThemes` object).

### 4) Colors and Vibe
Update CSS variables in `styles.css`:
- `--bg`
- `--accent`
- `--card`
- `--border`

### 5) Sections and Projects
Add or edit sections in `index.html`:
- Portfolio projects
- Certifications
- Timeline
- Testimonials

### 6) Animation Tuning
In `script.js`:
- Adjust reveal threshold in `IntersectionObserver`.
- Adjust parallax intensity in scroll listener.
- Adjust matrix animation density and speed in `drawRain()`.

## Suggested Next Improvements

- Add your real project cards with GitHub links.
- Add a dedicated certificates page.
- Add a contact form with backend (Formspree/Netlify/email API).
- Add SEO metadata and social preview tags.
- Optimize for Lighthouse score.
