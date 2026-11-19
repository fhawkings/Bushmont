/* ============================================================
   COURSE OUTLINE  —  this is the one file that controls
   what lessons exist and the order they appear in.

   To ADD a lesson:
     1. Copy lessons/03-template.html to a new file, e.g. lessons/04-my-topic.html
     2. Add a line to the list below (mind the commas).
   To REORDER lessons: move the lines up or down.
   To REMOVE a lesson: delete its line (and, if you like, its file).

   Each lesson needs:
     file    - the html file name inside the /lessons folder
     title   - shown in the sidebar and page heading
     summary - one line shown on the home page
   ============================================================ */

window.COURSE = {
  title: "Your Course Title",
  subtitle: "A short description",   // shown under the title in the sidebar

  lessons: [
    {
      file: "01-welcome.html",
      title: "Welcome",
      summary: "Introduce your course and tell learners how to get started."
    },
    {
      file: "02-example-lesson.html",
      title: "Example lesson",
      summary: "A sample lesson showing what the formatting looks like."
    },
    {
      file: "03-template.html",
      title: "Lesson template (copy me)",
      summary: "A blank lesson showing how to write your own."
    }
  ]
};
