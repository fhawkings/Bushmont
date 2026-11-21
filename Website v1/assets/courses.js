/* ============================================================
   YOUR COURSES  —  this file defines the whole catalogue:
   which courses exist, their sections, and the lessons in each.

   The WORDS of each lesson live in its own file in /lessons.
   This file only lists the titles and points to those files.

   • Add a course:  copy a { title, summary, sections:[...] } block.
   • Add a section: copy a { title, lessons:[...] } block.
   • Add a lesson:  make a copy of a lesson file in /lessons, then
     add a { title, file } line pointing to it.
   ============================================================ */

window.SITE = {
  title:    "Bushmont",
  subtitle: "Courses",
  intro:    "Choose a course below to get started!!!"
};

window.COURSES = [
  {
    title:   "First course - Example Don't Edit",
    summary: "A one-line description of this course, shown on the home page.",
    sections: [
      {
        title: "Getting started",
        lessons: [
          { title: "Welcome", file: "course-1/01-welcome.html" },
          { title: "How this works", file: "course-1/02-how-this-works.html" },
        ]
      },
      {
        title: "Core concepts",
        lessons: [
          { title: "The first idea", file: "course-1/03-first-idea.html" },
          { title: "The second idea", file: "course-1/04-second-idea.html" },
          { title: "Putting it together", file: "course-1/05-putting-it-together.html" },
        ]
      },
      {
        title: "Wrapping up",
        lessons: [
          { title: "Summary", file: "course-1/06-summary.html" },
          { title: "What next", file: "course-1/07-what-next.html" },
        ]
      },
      {
        title: "Design patterns (layout gallery)",
        lessons: [
          { title: "Callouts & notes", file: "course-1/08-callouts.html" },
          { title: "Cards & grids", file: "course-1/09-cards-grids.html" },
          { title: "Buttons, badges & tags", file: "course-1/10-buttons-badges.html" },
          { title: "Media, heroes & quotes", file: "course-1/11-media-heroes.html" },
          { title: "Accordions, steps & columns", file: "course-1/12-interactive-layout.html" },
        ]
      },
    ]
  },
  {
    title:   "CSRD",
    summary: "Another course. Delete this one in assets/courses.js if you only need one.",
    sections: [
      {
        title: "Introduction",
        lessons: [
          { title: "Overview", file: "course-2/01-overview.html" },
        ]
      },
      {
        title: "Going further",
        lessons: [
          { title: "A deeper topic", file: "course-2/02-deeper-topic.html" },
          { title: "Lesson template (copy me)", file: "course-2/03-template.html" },
        ]
      },
    ]
  },
  {
    title:   "IFRS",
    summary: "IFRS",
    sections: [
      {
        title: "Introduction",
        lessons: [
          { title: "Foreword", file: "IFRS/001-foreword.html" },
          { title: "Introduction", file: "IFRS/002-introduction2.html" },
          { title: "Introduction", file: "IFRS/003-introduction3.html" },
          { title: "Introduction", file: "IFRS/004-introduction4.html" },
          { title: "Introduction", file: "IFRS/005-introduction5.html" },
          { title: "Introduction", file: "IFRS/006-introduction6.html" },
        ]
      },
      {
        title: "Section1",
        lessons: [
          { title: "A deeper topic", file: "IFRS/101-section2.html" },
          { title: "A deeper topic", file: "IFRS/102-section2.html" },
        ]
      },
    ]
  },
];
