const form = document.getElementById("marks-form");
const resultCard = document.getElementById("result-card");
const errorMessage = document.getElementById("error-message");
const resetButton = document.getElementById("reset-button");
const printButton = document.getElementById("print-button");

const PASS_MARK = 35;
const SUBJECT_COUNT = 5;
const MAX_MARKS_PER_SUBJECT = 100;

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 35) return "E";
  return "F";
}

function getSubjectMarks() {
  return Array.from(document.querySelectorAll(".mark-input")).map((input, index) => {
    const rawValue = input.value.trim();
    if (rawValue === "") {
      throw new Error(`Please enter marks for Subject ${index + 1}.`);
    }

    const mark = Number(rawValue);
    if (!Number.isFinite(mark) || mark < 0 || mark > MAX_MARKS_PER_SUBJECT) {
      throw new Error(`Subject ${index + 1} marks must be between 0 and 100.`);
    }
    if (!Number.isInteger(mark)) {
      throw new Error(`Subject ${index + 1} marks must be a whole number.`);
    }
    return mark;
  });
}

function displayResult(marks) {
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const maximum = SUBJECT_COUNT * MAX_MARKS_PER_SUBJECT;
  const percentage = (total / maximum) * 100;
  const passedAll = marks.every(mark => mark >= PASS_MARK);

  const studentName = document.getElementById("student-name").value.trim();
  const rollNumber = document.getElementById("roll-number").value.trim();
  const details = [];
  if (studentName) details.push(studentName);
  if (rollNumber) details.push(`Roll No: ${rollNumber}`);

  document.getElementById("student-summary").textContent =
    details.length ? details.join(" · ") : "Student details not provided";
  document.getElementById("total-marks").textContent = `${total} / ${maximum}`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = passedAll ? getGrade(percentage) : "F";
  document.getElementById("result-badge").textContent = passedAll ? "PASS" : "FAIL";
  document.getElementById("result-badge").classList.toggle("fail", !passedAll);
  document.getElementById("progress-text").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("progress-bar").style.width = `${percentage}%`;

  const tableBody = document.getElementById("subject-results");
  tableBody.replaceChildren();
  marks.forEach((mark, index) => {
    const row = document.createElement("tr");
    const subjectCell = document.createElement("td");
    const marksCell = document.createElement("td");
    const statusCell = document.createElement("td");

    subjectCell.textContent = `Subject ${index + 1}`;
    marksCell.textContent = `${mark} / ${MAX_MARKS_PER_SUBJECT}`;
    const passed = mark >= PASS_MARK;
    statusCell.textContent = passed ? "Pass" : "Fail";
    statusCell.className = passed ? "status-pass" : "status-fail";
    row.append(subjectCell, marksCell, statusCell);
    tableBody.appendChild(row);
  });

  document.getElementById("grade-note").textContent = passedAll
    ? "You passed every subject. Grade scale: A+ (90–100), A (80–89), B (70–79), C (60–69), D (50–59), E (35–49)."
    : `You need at least ${PASS_MARK} marks in every subject to pass under this calculator's default rule.`;
  resultCard.hidden = false;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  errorMessage.textContent = "";
  try {
    displayResult(getSubjectMarks());
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    resultCard.hidden = true;
    errorMessage.textContent = error.message;
  }
});

form.addEventListener("reset", () => {
  errorMessage.textContent = "";
  resultCard.hidden = true;
});

printButton.addEventListener("click", () => window.print());
