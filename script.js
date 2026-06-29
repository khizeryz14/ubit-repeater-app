const COURSES = [
  // 300 Level
  { code: "BSCS-301", name: "Introduction to Computer Science - I" },
  { code: "BSCS-302", name: "Introduction to Computer Science - II" },
  { code: "BSCS-303", name: "Mathematics - I (Calculus)" },
  { code: "BSCS-304", name: "Mathematics - II (Differential Equations)" },
  { code: "BSCS-305", name: "Statistics and Data Analysis" },
  { code: "BSCS-306", name: "Probability and Statistical Methods" },
  { code: "BSCS-307", name: "Physics - I (General Physics)" },
  { code: "BSCS-308", name: "Physics - II (Electricity and Magnetism)" },
  { code: "BSCS-309", name: "English - I" },
  { code: "BSCS-310", name: "English - II" },
  { code: "BSCS-311", name: "Islamic Learning & Pakistan Studies" },
  { code: "BSCS-312", name: "Urdu" },
  // 400 Level
  { code: "BSCS-401", name: "Digital Computer Design Fundamentals" },
  { code: "BSCS-402", name: "Data Structure" },
  { code: "BSCS-403", name: "Assembly Language Programming" },
  { code: "BSCS-404", name: "System Design with Microprocessor" },
  { code: "BSCS-405", name: "Mathematics - III (Linear Algebra and Analytical Geometry)" },
  { code: "BSCS-406", name: "Mathematics (Numerical Analysis and Computing)" },
  { code: "BSCS-407", name: "Communication Skills and Report Writing" },
  { code: "BSCS-408", name: "Object Oriented Programming" },
  { code: "BSCS-409", name: "Materials, Semiconductors and Devices" },
  { code: "BSCS-410", name: "Electronics" },
  { code: "BSCS-411", name: "Discrete Mathematics" },
  { code: "BSCS-412", name: "Software Engineering and Project Management" },
  // 500 Level
  { code: "BSCS-501", name: "Theory of Computer Science" },
  { code: "BSCS-502", name: "Concepts of Operating Systems" },
  { code: "BSCS-503", name: "Data Communication and Networking - I" },
  { code: "BSCS-504", name: "Compiler Construction - I" },
  { code: "BSCS-505", name: "Stochastic Process and Inference" },
  { code: "BSCS-506", name: "Modeling and Simulation" },
  { code: "BSCS-507", name: "Operations Research - I" },
  { code: "BSCS-508", name: "Operations Research - II" },
  { code: "BSCS-509", name: "Database Systems" },
  { code: "BSCS-510", name: "Microcomputer Design and Interfacing - I" },
  { code: "BSCS-511", name: "Computer Organization and Architecture" },
  { code: "BSCS-512", name: "Data Communication and Networking - II" },
  { code: "BSCS-513", name: "Advanced Numerical Computing" },
  { code: "BSCS-514", name: "Computer Graphics" },
  { code: "BSCS-515", name: "Artificial Intelligence" },
  { code: "BSCS-517", name: "System Analysis & Design" },
  { code: "BSCS-519", name: "Business Programming Languages" },
  { code: "BSCS-520", name: "Advanced Software Engineering" },
  { code: "BSCS-522", name: "Expert Systems" },
  // 600 Level
  { code: "BSCS-601", name: "Theory of Operating Systems" },
  { code: "BSCS-602", name: "Operating Systems Case Study" },
  { code: "BSCS-603", name: "Compiler Construction - II" },
  { code: "BSCS-604", name: "Natural Language Processing" },
  { code: "BSCS-605", name: "Advanced Computer Graphics" },
  { code: "BSCS-606", name: "Distributed Database Systems" },
  { code: "BSCS-607", name: "Financial Accounting" },
  { code: "BSCS-609", name: "Microcomputers Design and Interfacing - II" },
  { code: "BSCS-610", name: "Design and Analysis of Algorithms" },
  { code: "BSCS-611", name: "Parallel Computing" },
  { code: "BSCS-612", name: "Financial Management" },
  { code: "BSCS-613", name: "Management Information Systems" },
  { code: "BSCS-616", name: "Multimedia Systems" },
  { code: "BSCS-618", name: "Computational Linear Algebra" },
  { code: "BSCS-619", name: "Thesis - I" },
  { code: "BSCS-620", name: "Thesis - II" },
  { code: "BSCS-621", name: "Topics of Current/Special Interest" },
  { code: "BSCS-624", name: "Project (FYP)" },
  { code: "BSCS-625", name: "VLSI Design Techniques" },
];

// ─── State ────────────────────────────────────────────────────────────────────
let selectedCourses = new Set();

// ─── Dropdown ─────────────────────────────────────────────────────────────────
const trigger      = document.getElementById("dropdownTrigger");
const panel        = document.getElementById("dropdownPanel");
const searchInput  = document.getElementById("courseSearch");
const listEl       = document.getElementById("courseList");
const tagsEl       = document.getElementById("selectedTags");
const triggerLabel = document.getElementById("triggerLabel");

function renderList(filter = "") {
  const q = filter.toLowerCase();
  listEl.innerHTML = "";
  const filtered = COURSES.filter(c =>
    c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
  );
  if (!filtered.length) {
    listEl.innerHTML = `<div style="padding:12px;color:#888;font-size:0.85rem;">No courses found.</div>`;
    return;
  }
  filtered.forEach(c => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.innerHTML = `
      <input type="checkbox" id="cb-${c.code}" ${selectedCourses.has(c.code) ? "checked" : ""} />
      <span class="course-code">${c.code}</span>
      <span class="course-name">${c.name}</span>`;
    item.addEventListener("mousedown", e => {
      e.preventDefault();
      if (selectedCourses.has(c.code)) selectedCourses.delete(c.code);
      else selectedCourses.add(c.code);
      item.querySelector("input").checked = selectedCourses.has(c.code);
      updateTriggerLabel();
      renderTags();
    });
    listEl.appendChild(item);
  });
}

function updateTriggerLabel() {
  if (selectedCourses.size === 0) {
    triggerLabel.textContent = "Select course(s)…";
    triggerLabel.className = "placeholder";
  } else {
    triggerLabel.textContent = `${selectedCourses.size} course${selectedCourses.size > 1 ? "s" : ""} selected`;
    triggerLabel.className = "";
  }
}

function renderTags() {
  tagsEl.innerHTML = "";
  selectedCourses.forEach(code => {
    const course = COURSES.find(c => c.code === code);
    if (!course) return;
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerHTML = `<span>${course.code} – ${course.name}</span><button type="button">×</button>`;
    tag.querySelector("button").addEventListener("click", () => {
      selectedCourses.delete(code);
      updateTriggerLabel();
      renderTags();
      renderList(searchInput.value);
    });
    tagsEl.appendChild(tag);
  });
}

trigger.addEventListener("click", () => {
  if (panel.classList.contains("hidden")) openPanel(); else closePanel();
});
trigger.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger.click(); }
  if (e.key === "Escape") closePanel();
});
function openPanel() {
  panel.classList.remove("hidden");
  trigger.setAttribute("aria-expanded", "true");
  searchInput.value = "";
  renderList();
  searchInput.focus();
}
function closePanel() {
  panel.classList.add("hidden");
  trigger.setAttribute("aria-expanded", "false");
}
searchInput.addEventListener("input", () => renderList(searchInput.value));
document.addEventListener("click", e => {
  if (!document.getElementById("dropdownWrapper").contains(e.target)) closePanel();
});

// ─── Validation ───────────────────────────────────────────────────────────────
function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg; el.classList.remove("hidden");
}
function clearError(id) {
  const el = document.getElementById(id);
  el.textContent = ""; el.classList.add("hidden");
}
function validate() {
  let ok = true;
  if (!document.getElementById("seatNo").value.trim()) {
    showError("err-seat", "Required."); ok = false;
  } else clearError("err-seat");
  if (!document.getElementById("studentName").value.trim()) {
    showError("err-name", "Required."); ok = false;
  } else clearError("err-name");
  if (selectedCourses.size === 0) {
    showError("err-courses", "Select at least one course."); ok = false;
  } else clearError("err-courses");
  if (!document.querySelector('input[name="requestType"]:checked')) {
    showError("err-request", "Select a request type."); ok = false;
  } else clearError("err-request");
  return ok;
}

// ─── PDF Generation ───────────────────────────────────────────────────────────
function loadJsPDF() {
  return new Promise((resolve, reject) => {
    if (window.jspdf) { resolve(window.jspdf.jsPDF); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s.onload = () => resolve(window.jspdf.jsPDF);
    s.onerror = () => reject(new Error("Failed to load jsPDF"));
    document.head.appendChild(s);
  });
}

function todayFormatted() {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

async function generatePDF() {
  const seat   = document.getElementById("seatNo").value.trim();
  const name   = document.getElementById("studentName").value.trim();
  const reqVal = document.querySelector('input[name="requestType"]:checked').value;
  const courses = [...selectedCourses].map(code => COURSES.find(c => c.code === code)).filter(Boolean);

  const JsPDF = await loadJsPDF();
  const doc   = new JsPDF({ unit: "mm", format: "a4" });

  const ML = 25, MR = 25, W = 210, TW = W - ML - MR;
  let y = 20;

  const ln = (n = 1) => { y += 6 * n; };

  // ── Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Department of Computer Science (UBIT)", W / 2, y, { align: "center" });
  ln();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("University of Karachi", W / 2, y, { align: "center" });
  ln(1.5);

  doc.setDrawColor(0);
  doc.setLineWidth(0.4);
  doc.line(ML, y, W - MR, y);
  ln(1.2);

  // ── Date ──
  doc.setFont("helvetica", "bold");
  const dateLabelWidth = doc.getTextWidth("Date: ");
  doc.setFontSize(10);
  doc.text("Date: ", ML, y);
  doc.setFont("helvetica", "normal");
  doc.text(todayFormatted(), ML + dateLabelWidth, y);
  ln(1.8);

  // ── Addressee ──
  doc.text("To,", ML, y);              ln();
  doc.text("The Controller of Examinations,", ML, y); ln();
  doc.text("University of Karachi.", ML, y);           ln(1.8);

  // ── Subject ──
  const subjectText = reqVal === "repeat"
    ? "Application for Repetition of Course(s) / Examination"
    : "Application for Grade Improvement in Course(s)";

  doc.setFont("helvetica", "bold");
  const subjectLabelWidth = doc.getTextWidth("Subject: ");
  doc.text("Subject: ", ML, y);
  doc.setFont("helvetica", "normal");
  doc.text(subjectText, ML + subjectLabelWidth, y);
  ln(1.8);

  // ── Salutation & body ──
  doc.text("Respected Sir/Madam,", ML, y);
  ln(1.4);

  const bodyText = reqVal === "repeat"
    ? "I, the undersigned, request permission to repeat the following course(s) / examination."
    : "I, the undersigned, request permission to appear in the improvement examination for the following course(s).";
  doc.text(bodyText, ML, y);
  ln(1.8);

  // ── Info table ──
  const colLabel = 45;
  const rowH = 8;
  const tableW = TW;

  const drawRow = (label, value) => {
    doc.setDrawColor(180);
    doc.setFillColor(248, 249, 252);
    doc.setLineWidth(0.2);
    doc.rect(ML, y - 5.5, tableW, rowH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(label, ML + 3, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, ML + colLabel, y);
    y += rowH;
  };

  drawRow("Seat Number:", seat);
  drawRow("Name:", name);
  ln(0.5);

  // ── Course table ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Course(s):", ML, y);
  ln(1.4);

  const codeW = 38;
  const nameW = TW - codeW;
  const hdrH  = 7.5;

  // Header row
  doc.setFillColor(30, 60, 100);
  doc.setTextColor(255, 255, 255);
  doc.rect(ML, y - 5.5, codeW, hdrH, "F");
  doc.rect(ML + codeW, y - 5.5, nameW, hdrH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Course No.", ML + 2, y);
  doc.text("Course Name", ML + codeW + 3, y);
  y += hdrH;

  doc.setTextColor(0, 0, 0);

  courses.forEach((c, i) => {
    // FIX: setFillColor takes exactly 3 args (r, g, b)
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(244, 248, 255);
    }
    doc.setDrawColor(200);
    doc.setLineWidth(0.2);
    doc.rect(ML, y - 5.5, codeW, hdrH, "FD");
    doc.rect(ML + codeW, y - 5.5, nameW, hdrH, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(c.code, ML + 2, y);
    // FIX: guard against empty splitTextToSize result
    const nameLines = doc.splitTextToSize(c.name, nameW - 5);
    if (nameLines && nameLines.length > 0) {
      doc.text(nameLines[0], ML + codeW + 3, y);
    }
    y += hdrH;
  });

  ln(1.2);

  // ── Closing ──
  doc.setFontSize(10);
  doc.text("I shall be grateful for your kind consideration.", ML, y);
  ln(1.4);
  doc.text("Yours sincerely,", ML, y);
  ln(1.8);
  doc.setLineWidth(0.3);
  doc.line(ML, y, ML + 55, y);
  ln(0.6);
  doc.setFont("helvetica", "bold");
  doc.text(name, ML, y);
  ln();
  doc.setFont("helvetica", "normal");
  doc.text("Seat No.: " + seat, ML, y);
  ln();
  doc.text("BS (Computer Science), UBIT", ML, y);

  const fileName = "Application_" + name.replace(/\s+/g, "_") + "_" + seat + ".pdf";
  doc.save(fileName);
}

// ─── Button ───────────────────────────────────────────────────────────────────
document.getElementById("btnGenerate").addEventListener("click", async () => {
  if (!validate()) return;
  const btn = document.getElementById("btnGenerate");
  btn.disabled = true;
  btn.textContent = "Generating…";
  try {
    await generatePDF();
  } catch (err) {
    alert("PDF generation failed: " + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Generate & Download Application PDF";
  }
});

renderList();