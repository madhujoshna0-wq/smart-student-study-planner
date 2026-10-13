# Student Marks Calculator

A beginner-friendly web project that calculates a student's total marks, percentage, grade, and pass/fail result.

## Features

- Optional student name and roll number
- Marks entry for five subjects
- Input validation (whole-number marks from 0 to 100)
- Calculates total marks out of 500 and percentage
- Shows a grade and pass/fail result
- Displays subject-wise pass/fail status
- Responsive layout for mobile and desktop
- Print-friendly result summary

## Technologies Used

- HTML
- CSS
- JavaScript

## How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html` to open it in a web browser.
4. Enter marks for all five subjects and click **Calculate Result**.

No installation or server is required.

## Default Grade Rules

The project uses a default pass mark of 35/100 for each subject.

| Percentage | Grade |
|---|---|
| 90–100% | A+ |
| 80–89.99% | A |
| 70–79.99% | B |
| 60–69.99% | C |
| 50–59.99% | D |
| 35–49.99% | E |
| Below 35% overall, or any subject below 35 | F / Fail |

These are example rules for this project. Change them in `script.js` if your college follows a different grading system.

## Project Structure

```text
Student-Marks-Calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Formula

- **Total Marks** = Sum of marks in all subjects
- **Percentage** = (Total Marks ÷ Maximum Marks) × 100

## Future Improvements

- Add or remove subjects dynamically
- Save student results
- Add a student result history
- Connect to a database

## License

This project is available for educational and learning purposes.
