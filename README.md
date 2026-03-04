# React-Based Cyber Profile Website

This project is now a **React-based portfolio website** (running directly in browser using React + ReactDOM + Babel CDN) with:

- Multi-theme identity modes:
  - Cybersecurity
  - Ethical Hacker
  - Software Developer
- Dark blue hacker-inspired aesthetic
- Scroll reveal animations
- Contact links with icon representation (LinkedIn, certificates, email, phone)
- Downloadable resume link
- Touch/mouse-reactive 3D-style interactive avatar model

## Project files
- `index.html` — app entry, loads React runtime and `app.jsx`
- `app.jsx` — React components, theme switching, scroll animation, interactive 3D model logic
- `styles.css` — cyber visual style, layout, animation, responsive behavior
- `assets/resume-template.txt` — downloadable resume template

## Run locally
Because this uses JSX in-browser, run with a local server (do not open as `file://`):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Future changes you can make

1. **Replace personal information** in `app.jsx`
   - Name/brand
   - LinkedIn URL
   - Certificate URL
   - Email and phone

2. **Replace resume**
   - Put your real resume file in `assets/` (e.g., PDF)
   - Update the resume link path in `app.jsx`

3. **Customize theme colors** in `styles.css`
   - `--accent`, `--bg`, `--panel`, `--border`

4. **Tune 3D interaction behavior** in `app.jsx`
   - Update rotation sensitivity in `onMove()`
   - Adjust press scaling behavior

5. **Add sections**
   - Projects/case studies
   - Certificates gallery
   - Experience timeline

## Note on a real personal 3D model
Current version includes a touch-reactive 3D-style avatar shape. If you want an actual personal 3D model, share a `.glb/.gltf` model and we can integrate it.
