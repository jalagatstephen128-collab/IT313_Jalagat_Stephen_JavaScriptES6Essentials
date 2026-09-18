// gradeUtils.js

// Named export: computes the average of the three period grades
export function computeAverage(prelim, midterm, final) {
  return (prelim + midterm + final) / 3;
}

// Default export: decides PASSING vs PROBATION
export default function isPassing(average) {
  return average >= 75;
}
