
const courses = [
    { id: 1, code: "WDD 130", title: "Introduction to Web Development", credits: 3, category: "wdd", completed: true },
    { id: 2, code: "WDD 131", title: "Advanced HTML & CSS", credits: 3, category: "wdd", completed: false },
    { id: 3, code: "WDD 231", title: "Web Programming II", credits: 4, category: "wdd", completed: false },
    { id: 4, code: "CSE 101", title: "Intro to Computer Systems", credits: 3, category: "cse", completed: true },
    { id: 5, code: "CSE 201", title: "Data Structures", credits: 3, category: "cse", completed: false }
  ];
  
  function renderCourses(list) {
    const container = document.getElementById("courseList");
    const creditTotalEl = document.getElementById("creditTotal");
    if (!container) return;
  
    container.innerHTML = "";
  
    if (list.length === 0) {
      container.innerHTML = "<p>No courses to display.</p>";
      creditTotalEl.textContent = "0";
      return;
    }
  
    list.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-item" + (course.completed ? " completed" : "");
      card.setAttribute("tabindex", "0");
      card.innerHTML = `
        <div>
          <div class="course-title">${course.code} — ${escapeHtml(course.title)}</div>
          <div class="course-meta">${course.category.toUpperCase()} • ${course.credits} credits ${course.completed ? "• Completed" : ""}</div>
        </div>
        <div aria-hidden="true">${course.completed ? "✓" : ""}</div>
      `;
      container.appendChild(card);
    });
  
    const totalCredits = list.reduce((sum, c) => sum + (c.credits || 0), 0);
    creditTotalEl.textContent = totalCredits;
  }
  
  function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  
  document.addEventListener("DOMContentLoaded", function () {

    renderCourses(courses);
  
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
  
        const filter = btn.getAttribute("data-filter");
        if (filter === "all") renderCourses(courses);
        else if (filter === "wdd") renderCourses(courses.filter(c => c.category === "wdd"));
        else if (filter === "cse") renderCourses(courses.filter(c => c.category === "cse"));
      });
    });
  });
  