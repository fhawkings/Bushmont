/* ============================================================
   Site engine — builds the sidebar, renders lesson markdown,
   and wires up prev/next. You normally never need to edit this.
   It works offline (opened by double-click) and online.
   ============================================================ */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // Remove the common leading indentation so markdown written
  // tidily inside the HTML file doesn't get treated as code.
  function dedent(text) {
    var lines = text.replace(/^\n+/, "").replace(/\s+$/, "").split("\n");
    var min = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var m = l.match(/^[ \t]*/)[0].length;
      if (m < min) min = m;
    });
    if (!isFinite(min)) min = 0;
    return lines.map(function (l) { return l.slice(min); }).join("\n");
  }

  function mdToHtml(id) {
    var el = document.getElementById(id);
    if (!el) return "";
    var raw = dedent(el.textContent || "");
    if (window.marked && typeof window.marked.parse === "function") {
      return window.marked.parse(raw);
    }
    // Fallback if the markdown engine didn't load: show as plain text.
    return "<pre>" + raw.replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    }) + "</pre>";
  }

  ready(function () {
    var C = window.COURSE || { title: "Course", lessons: [] };
    var body = document.body;
    var root = body.dataset.root || ".";
    var page = body.dataset.page || "lesson";
    var current = body.dataset.file || "";

    var homeHref = root + "/index.html";
    var lessonHref = function (f) { return root + "/lessons/" + f; };

    // ---- Build sidebar ----
    var navItems = C.lessons.map(function (ls, i) {
      var cls = ls.file === current ? ' class="current"' : "";
      return '<li><a' + cls + ' href="' + lessonHref(ls.file) + '">' +
             '<span class="num">' + String(i + 1).padStart(2, "0") + '</span>' +
             escapeHtml(ls.title) + "</a></li>";
    }).join("");

    var sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    sidebar.innerHTML =
      '<a class="brand" href="' + homeHref + '">' + escapeHtml(C.title) +
      (C.subtitle ? "<small>" + escapeHtml(C.subtitle) + "</small>" : "") +
      "</a><ul class=\"nav\">" + navItems + "</ul>";

    // ---- Topbar (mobile) ----
    var topbar = document.createElement("div");
    topbar.className = "topbar";
    topbar.innerHTML =
      '<a class="brand" href="' + homeHref + '">' + escapeHtml(C.title) + "</a>" +
      '<button class="menu-btn" aria-label="Menu">☰ Lessons</button>';

    var backdrop = document.createElement("div");
    backdrop.className = "backdrop";

    // ---- Content column ----
    var content = document.createElement("div");
    content.className = "content";
    var wrap = document.createElement("div");
    wrap.className = "wrap";
    content.appendChild(wrap);

    if (page === "home") {
      wrap.innerHTML = buildHome(C, mdToHtml("intro-md"), lessonHref);
    } else {
      wrap.innerHTML = mdToHtml("lesson-md") + buildPager(C, current, lessonHref);
    }

    // ---- Assemble ----
    var layout = document.createElement("div");
    layout.className = "layout";
    layout.appendChild(sidebar);
    layout.appendChild(content);

    body.insertBefore(topbar, body.firstChild);
    body.appendChild(backdrop);
    body.appendChild(layout);

    // ---- Mobile menu behaviour ----
    var btn = topbar.querySelector(".menu-btn");
    function toggle(open) {
      sidebar.classList.toggle("open", open);
      backdrop.classList.toggle("show", open);
    }
    btn.addEventListener("click", function () { toggle(!sidebar.classList.contains("open")); });
    backdrop.addEventListener("click", function () { toggle(false); });

    // Set the page <title> from the current lesson
    if (page !== "home") {
      var ls = C.lessons.filter(function (l) { return l.file === current; })[0];
      if (ls) document.title = ls.title + " — " + C.title;
    } else {
      document.title = C.title;
    }
  });

  function buildHome(C, introHtml, lessonHref) {
    var cards = C.lessons.map(function (ls, i) {
      return '<a class="card" href="' + lessonHref(ls.file) + '">' +
             '<span class="num">Lesson ' + String(i + 1).padStart(2, "0") + '</span>' +
             "<h3>" + escapeHtml(ls.title) + "</h3>" +
             "<p>" + escapeHtml(ls.summary || "") + "</p></a>";
    }).join("");
    return '<p class="eyebrow">Course</p>' +
           "<h1>" + escapeHtml(C.title) + "</h1>" +
           (introHtml ? '<div class="lead">' + introHtml + "</div>" : "") +
           '<div class="cards">' + cards + "</div>";
  }

  function buildPager(C, current, lessonHref) {
    var idx = -1;
    C.lessons.forEach(function (l, i) { if (l.file === current) idx = i; });
    if (idx === -1) return "";
    var prev = C.lessons[idx - 1], next = C.lessons[idx + 1];
    var html = '<nav class="pager">';
    html += prev
      ? '<a href="' + lessonHref(prev.file) + '"><span class="dir">Previous</span><span class="ttl">' + escapeHtml(prev.title) + "</span></a>"
      : '<span class="spacer"></span>';
    html += next
      ? '<a class="next" href="' + lessonHref(next.file) + '"><span class="dir">Next</span><span class="ttl">' + escapeHtml(next.title) + "</span></a>"
      : '<span class="spacer"></span>';
    html += "</nav>";
    return html;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
})();
