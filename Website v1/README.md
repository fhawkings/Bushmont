# Course site — a blank template

A tiny, self-contained course website you can use for any subject. No accounts,
no monthly fees, no internet required to read or edit it. It's just files you
own.

This guide is written so anyone can use it — no coding needed. It works fine
for one author or for a team sharing the work.

---

## 1. See it right now

Open the folder and **double-click `index.html`**. It opens in your web
browser and the whole course works — offline, no setup. That's the site.

(On a phone you'd host it online first — see section 4.)

---

## 2. Make it yours

Three quick edits turn this into your course:

1. **Name it.** Open `assets/lessons.js` and change `title` and `subtitle`.
2. **Write the intro.** Open `index.html` and edit the welcome text.
3. **Write your lessons** (next section).

---

## 3. Edit a lesson

1. Install a free editor: **[VS Code](https://code.visualstudio.com/)** is the
   usual choice (Windows, Mac, Linux). Any plain-text editor works too.
2. Open a lesson file from the `lessons` folder, e.g. `lessons/01-welcome.html`.
3. Find the block that starts with `<script type="text/markdown" id="lesson-md">`.
4. Edit the text between there and `</script>`. It's **markdown** — a simple way
   to write formatted text:

   | You type              | You get            |
   |-----------------------|--------------------|
   | `## Big heading`      | a heading          |
   | `### Smaller heading` | a sub-heading      |
   | `**bold**`            | **bold**           |
   | `*italic*`            | *italic*           |
   | `- item`              | a bullet point     |
   | `> note`              | a highlighted box  |
   | `[text](https://...)` | a link             |

5. Save the file, then refresh your browser. Done.

`lessons/02-example-lesson.html` and `lessons/03-template.html` show every one
of these written out as examples.

---

## 4. Add, remove or reorder lessons

Everything about the course structure lives in **one file**:
`assets/lessons.js`.

- **Add a lesson:** copy `lessons/03-template.html`, rename it (e.g.
  `lessons/04-my-topic.html`), change the `data-file` line inside it to match
  the new name, then add a matching entry to the list in `assets/lessons.js`.
- **Reorder:** move the lines up or down in `assets/lessons.js`.
- **Remove:** delete the lesson's line from `assets/lessons.js`.

The sidebar, home page and Next/Previous buttons all update themselves.

---

## 5. Put it online (free)

Two easy, free options — pick one:

**Netlify Drop** — the no-account-needed way.
Go to <https://app.netlify.com/drop> and drag this whole folder onto the page.
You get a public link in seconds. To update it, drag the folder again.

**GitHub Pages** — the more permanent way, and it doubles as your backup and
your sync tool (see below). Create a free repository, upload this folder, and
turn on Pages in the repo settings. Your site gets a `github.io` address.

Both are free. Neither charges per visitor.

---

## 6. Working with other people

Pick whichever fits how technical you feel:

### Option A — a shared cloud folder (simplest)
Put this whole folder inside **Dropbox**, **Google Drive** or **OneDrive**.
Everyone installs the desktop app, and the folder syncs automatically. Each
person edits in VS Code and saves; the others see the changes. Free tiers are
plenty for this.
*Watch-out:* avoid two people editing the **same file at the same moment**, or
the sync may keep one copy and make a "conflicted" duplicate of the other.

### Option B — GitHub (sturdier, keeps full history)
Put the folder in a free **GitHub** repository. Everyone "pulls" the latest and
"pushes" their changes. It keeps a complete history, lets you undo anything, and
never loses an edit even if two people work at once. It's a bit more to learn,
but it's the professional-grade answer and it publishes your site for free at
the same time (section 5).

This folder is already set up as a git repository with a first commit, so you
can connect it to GitHub whenever you're ready.

---

## 7. What's what (folder map)

```
course-site/
├─ index.html                 the home page (edit the welcome text here)
├─ README.md                  this guide
├─ lessons/
│  ├─ 01-welcome.html         ─┐
│  ├─ 02-example-lesson.html   │  one file per lesson — edit the markdown inside
│  └─ 03-template.html        ─┘  copy this to make a new lesson
└─ assets/
   ├─ lessons.js              the course outline + title (edit lessons here)
   ├─ style.css               colours and fonts (change the look here)
   ├─ site.js                 the engine (you won't usually touch this)
   └─ marked.js               turns your markdown into formatted text
```

---

## 8. A couple of good habits

- **Change the look** in `assets/style.css` — the accent colour, fonts and
  reading width are all set in one place at the very top.
- **Write lessons in your own words.** If you quote or reuse someone else's
  material, check you're allowed to and credit the source.
- **Keep a backup.** The GitHub or cloud-folder option above doubles as one.
