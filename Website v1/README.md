# Bushmont courses

A self-contained, multi-course learning site. No accounts, no monthly fees, no
internet required to read or edit it. It's just files you own.

Structure: **Home → Course → Section → Lesson.**

This guide is written for a team sharing the work — no coding needed.

---

## 1. See it right now

Open the folder and **double-click `index.html`**. It opens in your browser and
the whole site works — offline, no setup. The home page lists your courses;
click one to see its sections and lessons.

(On a phone you'd host it online first — see section 5.)

---

## 2. The two things you edit

- **The structure** (what courses, sections and lessons exist, and their
  titles) lives in one file: **`assets/courses.js`**.
- **The words of each lesson** live in that lesson's own file inside the
  **`lessons`** folder.

That split is deliberate: because each lesson is its own file, two people can
edit different lessons at the same time without clashing.

---

## 3. Edit a lesson's words

1. Install a free editor — **[VS Code](https://code.visualstudio.com/)** is the
   usual choice. Any plain-text editor works.
2. Open the lesson file, e.g. `lessons/course-1/01-welcome.html`.
3. Find the block starting with `<script type="text/markdown" id="lesson-md">`.
4. Edit the text between there and `</script>`. It's **markdown**:

   | You type              | You get            |
   |-----------------------|--------------------|
   | `## Big heading`      | a heading          |
   | `### Smaller heading` | a sub-heading      |
   | `**bold**`            | **bold**           |
   | `*italic*`            | *italic*           |
   | `- item`              | a bullet point     |
   | `1. item`             | a numbered list    |
   | `> note`              | a highlighted box  |
   | `[text](https://...)` | a link             |

5. Save, then refresh your browser.

`lessons/course-2/03-template.html` is a blank lesson you can copy.

---

## 4. Add, remove or reorder things

Everything structural is in **`assets/courses.js`**. Open it — it's laid out
to read like an outline:

```
window.COURSES = [
  {
    title:   "First course",
    summary: "Shown on the home page.",
    sections: [
      {
        title: "Getting started",
        lessons: [
          { title: "Welcome", file: "course-1/01-welcome.html" },
          ...
        ]
      },
      ...
    ]
  },
  ...
];
```

- **Add a lesson:** copy an existing lesson file in `lessons/…`, rename it,
  change the `data-file` line inside it to match the new path, then add a
  `{ title, file }` line in `courses.js`.
- **Add a section:** add a `{ title, lessons: [...] }` block.
- **Add a course:** copy a whole course `{ ... }` block. Make a new folder
  under `lessons/` for its lesson files (e.g. `lessons/course-3/`).
- **Reorder / remove:** move or delete the lines. The home page, sidebars and
  Next/Previous buttons all update themselves.

**Rename the site** (the "Bushmont" header text under the logo, and the home
title) at the top of `courses.js`, in the `window.SITE` block.

---

## 5. Put it online (free)

- **Netlify Drop** — no account needed. Go to <https://app.netlify.com/drop>
  and drag this whole folder on. You get a public link in seconds; drag again
  to update.
- **GitHub Pages** — more permanent, and doubles as your backup and sync tool
  (section 6).

---

## 6. Working as a team

- **Simplest — a shared cloud folder.** Put this folder in **Dropbox**,
  **Google Drive** or **OneDrive**. Everyone edits locally and it syncs.
  Because each lesson is a separate file, you'll rarely collide.
- **Sturdier — GitHub.** Keeps full history, never loses an edit, and publishes
  the site for free at the same time.

---

## 7. The logo

Your logo is in `assets/` as two files: `logo-light.png` (for light mode) and
`logo-dark.png` (a green-and-white version so it stays visible in dark mode).
To change it, replace both files, keeping the same names.

---

## 8. Folder map

```
bushmont-courses/
├─ index.html              home page — lists courses
├─ course.html             a course page — shows one course's sections/lessons
├─ README.md               this guide
├─ assets/
│  ├─ courses.js           THE OUTLINE — courses, sections, lesson list, site title
│  ├─ style.css            colours and fonts (brand colours at the very top)
│  ├─ site.js              the engine (you won't usually touch this)
│  ├─ marked.js            turns your markdown into formatted text
│  ├─ logo-light.png       logo for light mode
│  └─ logo-dark.png        logo for dark mode
└─ lessons/
   ├─ course-1/            one file per lesson — edit the markdown inside each
   │  ├─ 01-welcome.html
   │  └─ ...
   └─ course-2/
      └─ ...
```

---

## 9. Good to know

- **Change the look** in `assets/style.css` — brand colours (the green, the
  black, fonts) are all at the very top.
- **Need layout ideas?** Course 1 → **Design patterns (layout gallery)** shows
  callouts, cards, grids, buttons, badges, hero banners, figures, accordions,
  numbered steps and more — each with the exact snippet to copy. All the styling
  for them lives at the bottom of `assets/style.css`.
- This is the open course content. When you're ready to sell access, this is
  the material that moves into a paid platform (e.g. WordPress + an LMS).
