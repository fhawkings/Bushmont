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
    summary: "The EU's Corporate Sustainability Reporting Directive: what it requires, who it applies to, and how to report under it.",
    sections: [
      {
        title: "Introduction",
        lessons: [
          { title: "Course overview", file: "CSRD/001-course-overview.html" },
          { title: "Video introduction", file: "CSRD/102-video-introduction.html" },
          { title: "Contents and course outline", file: "CSRD/103-course-outline.html" },
          { title: "What is the CSRD? Key terms", file: "CSRD/104-what-is-csrd-key-terms.html" },
          { title: "Aim of the regulation", file: "CSRD/105-aim-of-the-regulation.html" },
          { title: "Scope of the regulation", file: "CSRD/106-scope-of-the-regulation.html" },
          { title: "Conceptual foundations", file: "CSRD/107-conceptual-foundations.html" },
        ]
      },
      {
        title: "Core Content",
        lessons: [
          { title: "Core regulation", file: "CSRD/201-core-regulation.html" },
          { title: "Attributes of the regulation", file: "CSRD/202-attributes-of-the-regulation.html" },
          { title: "Requirements of the regulation", file: "CSRD/203-requirements-of-the-regulation.html" },
          { title: "Cheat sheet and deep dive (optional)", file: "CSRD/204-cheat-sheet-and-deep-dive.html" },
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
          { title: "Video Intorduction", file: "IFRS/102-introduction2.html" },
          { title: "Course Outline and Table of Contents", file: "IFRS/103-introduction3.html" },
          { title: "What are S1 and S2, and Key Terms", file: "IFRS/104-introduction4.html" },
          { title: "Aim of the Regulation", file: "IFRS/105-introduction5.html" },
          { title: "Scope of the Regulation", file: "IFRS/106-introduction6.html" },
          { title: "Conceptual Foundations", file: "IFRS/107-introduction7.html" },
        ]
      },
      {
        title: "Core Content",
        lessons: [
          { title: "Core Regulation", file: "IFRS/201-section2.html" },
          { title: "Core Regulaiton2", file: "IFRS/202-section2.html" },
          { title: "Attributes of the Regulation", file: "IFRS/203-section2.html" },
          { title: "Attributes of the Regulaiton2", file: "IFRS/204-section2.html" },
          { title: "Requirments of the Regulation", file: "IFRS/205-section2.html" },
          { title: "Requriments of the Regulation2", file: "IFRS/206-section2.html" },
        ]
      },
    ]
  },
];
