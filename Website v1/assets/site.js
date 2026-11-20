/* ============================================================
   Site engine — builds the catalog, course pages, lesson
   sidebars and Next/Previous from the manifest in courses.js.
   You normally never need to edit this file.
   Works offline (opened by double-click) and online.
   ============================================================ */
(function () {
  "use strict";

  function ready(fn){ document.readyState!=="loading" ? fn() : document.addEventListener("DOMContentLoaded",fn); }
  function esc(s){ return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
  function pad(n){ return String(n).padStart(2,"0"); }

  function dedent(t){
    var lines=t.replace(/^\n+/,"").replace(/\s+$/,"").split("\n"), min=Infinity;
    lines.forEach(function(l){ if(!l.trim())return; var m=l.match(/^[ \t]*/)[0].length; if(m<min)min=m; });
    if(!isFinite(min))min=0;
    return lines.map(function(l){return l.slice(min);}).join("\n");
  }
  function mdFrom(id){
    var el=document.getElementById(id); if(!el) return "";
    var raw=dedent(el.textContent||"");
    if(window.marked&&typeof window.marked.parse==="function") return window.marked.parse(raw);
    return "<pre>"+esc(raw)+"</pre>";
  }

  function flatten(course){
    var out=[];
    (course.sections||[]).forEach(function(sec){
      (sec.lessons||[]).forEach(function(les){
        out.push({section:sec.title,title:les.title,file:les.file});
      });
    });
    return out;
  }
  function stats(course){
    var n=0; (course.sections||[]).forEach(function(s){n+=(s.lessons||[]).length;});
    return {sections:(course.sections||[]).length,lessons:n};
  }

  ready(function () {
    var SITE=window.SITE||{title:"Courses"}, COURSES=window.COURSES||[];
    var body=document.body, root=body.dataset.root||".", page=body.dataset.page||"home";

    var homeHref   = root+"/index.html";
    var courseHref = function(i){ return root+"/course.html#"+i; };
    var lessonHref = function(file){ return root+"/lessons/"+file; };

    function brand(){
      return '<a class="brand" href="'+homeHref+'">'+
        '<img class="logo logo-l" src="'+root+'/assets/logo-light.png" alt="'+esc(SITE.title)+'">'+
        '<img class="logo logo-d" src="'+root+'/assets/logo-dark.png" alt="'+esc(SITE.title)+'">'+
        (SITE.subtitle?'<small>'+esc(SITE.subtitle)+'</small>':"")+'</a>';
    }

    // ---- sidebar variants ----
    function sidebarCatalog(){
      var items=COURSES.map(function(c,i){
        return '<li><a href="'+courseHref(i)+'"><span class="num">'+pad(i+1)+'</span>'+esc(c.title)+'</a></li>';
      }).join("");
      return brand()+'<ul class="nav" style="margin-top:1.1rem">'+items+'</ul>';
    }
    function sidebarCourse(ci, currentFile){
      var course=COURSES[ci], gi=-1, blocks="";
      (course.sections||[]).forEach(function(sec){
        var rows=(sec.lessons||[]).map(function(les){
          gi++;
          var cur = (les.file===currentFile) ? ' class="current"' : "";
          return '<li><a'+cur+' href="'+lessonHref(les.file)+'"><span class="num">'+pad(gi+1)+'</span>'+esc(les.title)+'</a></li>';
        }).join("");
        blocks+='<div class="sec-label">'+esc(sec.title)+'</div><ul class="nav">'+rows+'</ul>';
      });
      return brand()+'<a class="back" href="'+homeHref+'">← All courses</a>'+
        '<div class="course-name">'+esc(course.title)+'</div>'+blocks;
    }

    // ---- main views ----
    function viewCatalog(){
      var cards=COURSES.map(function(c,i){
        var s=stats(c);
        return '<a class="card" href="'+courseHref(i)+'"><span class="num">Course '+pad(i+1)+'</span>'+
          '<h3>'+esc(c.title)+'</h3><p>'+esc(c.summary||"")+'</p>'+
          '<span class="meta">'+s.lessons+' lesson'+(s.lessons!==1?'s':'')+' · '+s.sections+' section'+(s.sections!==1?'s':'')+'</span></a>';
      }).join("");
      return '<p class="eyebrow">Courses</p><h1>'+esc(SITE.title)+'</h1>'+
        (SITE.intro?'<p class="lead">'+esc(SITE.intro)+'</p>':"")+
        '<div class="cards">'+cards+'</div>';
    }
    function viewCourse(ci){
      var course=COURSES[ci], gi=-1, body="";
      (course.sections||[]).forEach(function(sec){
        var rows=(sec.lessons||[]).map(function(les){
          gi++;
          return '<a class="row" href="'+lessonHref(les.file)+'"><span class="num">'+pad(gi+1)+'</span>'+esc(les.title)+'</a>';
        }).join("");
        body+='<h2>'+esc(sec.title)+'</h2><div class="lesson-list">'+rows+'</div>';
      });
      return '<p class="crumb"><a href="'+homeHref+'">Courses</a> › '+esc(course.title)+'</p>'+
        '<h1>'+esc(course.title)+'</h1>'+
        (course.summary?'<p class="lead">'+esc(course.summary)+'</p>':"")+body;
    }
    function viewLesson(ci, currentFile){
      var course=COURSES[ci], flat=flatten(course), idx=-1;
      flat.forEach(function(l,i){ if(l.file===currentFile) idx=i; });
      var here=flat[idx]||{section:"",title:""};
      var prev=idx>0?flat[idx-1]:null, next=idx<flat.length-1?flat[idx+1]:null;
      var pager='<nav class="pager">'+
        (prev?'<a href="'+lessonHref(prev.file)+'"><span class="dir">Previous</span><span class="ttl">'+esc(prev.title)+'</span></a>':'<span class="gap"></span>')+
        (next?'<a class="next" href="'+lessonHref(next.file)+'"><span class="dir">Next</span><span class="ttl">'+esc(next.title)+'</span></a>':'<span class="gap"></span>')+
        '</nav>';
      var crumb='<p class="crumb"><a href="'+homeHref+'">Courses</a> › <a href="'+courseHref(ci)+'">'+esc(course.title)+'</a> › '+esc(here.section)+'</p>';
      return crumb+mdFrom("lesson-md")+pager;
    }

    // ---- locate course index for a lesson by its data-file ----
    function findCourseByFile(file){
      for(var i=0;i<COURSES.length;i++){
        var f=flatten(COURSES[i]);
        for(var j=0;j<f.length;j++) if(f[j].file===file) return i;
      }
      return -1;
    }

    // ---- assemble page chrome ----
    var topbar=document.createElement("div");
    topbar.className="topbar";
    topbar.innerHTML='<a class="brand" href="'+homeHref+'" style="margin:0">'+
      '<img class="logo logo-l" src="'+root+'/assets/logo-light.png" alt="'+esc(SITE.title)+'">'+
      '<img class="logo logo-d" src="'+root+'/assets/logo-dark.png" alt="'+esc(SITE.title)+'"></a>'+
      '<button class="menu-btn" aria-label="Menu">☰ Menu</button>';
    var backdrop=document.createElement("div"); backdrop.className="backdrop";
    var sidebar=document.createElement("aside"); sidebar.className="sidebar";
    var content=document.createElement("div"); content.className="content";
    var wrap=document.createElement("div"); wrap.className="wrap"; content.appendChild(wrap);
    var layout=document.createElement("div"); layout.className="layout";
    layout.appendChild(sidebar); layout.appendChild(content);
    body.insertBefore(topbar, body.firstChild);
    body.appendChild(backdrop); body.appendChild(layout);

    var btn=topbar.querySelector(".menu-btn");
    function toggle(o){ sidebar.classList.toggle("open",o); backdrop.classList.toggle("show",o); }
    btn.addEventListener("click",function(){ toggle(!sidebar.classList.contains("open")); });
    backdrop.addEventListener("click",function(){ toggle(false); });

    // ---- render by page type ----
    if(page==="home"){
      sidebar.innerHTML=sidebarCatalog();
      wrap.innerHTML=viewCatalog();
      document.title=SITE.title;
    } else if(page==="course"){
      function renderCourse(){
        var ci=parseInt(location.hash.replace("#",""),10);
        if(isNaN(ci)||!COURSES[ci]){
          sidebar.innerHTML=sidebarCatalog();
          wrap.innerHTML='<p class="eyebrow">Courses</p><h1>'+esc(SITE.title)+'</h1>'+
            '<p class="lead">Pick a course.</p><div class="cards">'+
            COURSES.map(function(c,i){return '<a class="card" href="'+courseHref(i)+'"><span class="num">Course '+pad(i+1)+'</span><h3>'+esc(c.title)+'</h3></a>';}).join("")+'</div>';
          document.title=SITE.title; return;
        }
        sidebar.innerHTML=sidebarCourse(ci,null);
        wrap.innerHTML=viewCourse(ci);
        document.title=COURSES[ci].title+" — "+SITE.title;
        window.scrollTo(0,0);
      }
      renderCourse();
      window.addEventListener("hashchange", function(){ toggle(false); renderCourse(); });
    } else { // lesson
      var file=body.dataset.file||"";
      var ci=findCourseByFile(file);
      if(ci===-1){ sidebar.innerHTML=brand(); wrap.innerHTML=mdFrom("lesson-md"); return; }
      sidebar.innerHTML=sidebarCourse(ci,file);
      wrap.innerHTML=viewLesson(ci,file);
      var flat=flatten(COURSES[ci]); var me=null;
      flat.forEach(function(l){ if(l.file===file) me=l; });
      document.title=(me?me.title:"Lesson")+" — "+COURSES[ci].title;
    }
  });
})();
