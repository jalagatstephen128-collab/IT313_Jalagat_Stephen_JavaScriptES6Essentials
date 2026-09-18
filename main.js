// main.js
import isPassing, { computeAverage } from './gradeUtils.js';

const enrollees = [
  { name: "Ana Cruz",   prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos",  prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan",    prelim: 78, midterm: 80, final: 76 },
];

// --- Requirement 2: simulated registrar API call -------------------------
function getEnrollees() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const connectionFailed = false;         // flip to true to test the catch
      if (connectionFailed) {
        reject(new Error("Registrar API unreachable"));
      } else {
        resolve(enrollees);
      }
    }, 800);
  });
}

// --- Requirement 3: async/await wrapped in try/catch ----------------------
async function generateReport() {
  try {
    const records = await getEnrollees();

    // Requirement 4 + 5: destructuring inside .map()
    const results = records.map(({ name, prelim, midterm, final }) => {
      const average = computeAverage(prelim, midterm, final);
      return {
        name,
        average,
        status: isPassing(average) ? "PASSING" : "PROBATION",
      };
    });

    // Requirement 6: split the two groups with .filter()
    const passing   = results.filter((r) => r.status === "PASSING");
    const probation = results.filter((r) => r.status === "PROBATION");

    // Requirement 7: class average with .reduce() and an initial value
    const classAverage =
      results.reduce((sum, r) => sum + r.average, 0) / results.length;

    // Requirement 8: template-literal report
    console.log("=== IT313 Enrollment Eligibility Report ===");
    for (const { name, average, status } of results) {
      console.log(`${name} - Average: ${average.toFixed(2)} - ${status}`);
    }
    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${passing.length} / ${results.length}`);
    console.log(`On Probation: ${probation.length}`);
  } catch (error) {
    // Graceful failure instead of an unhandled rejection crash
    console.error("Could not generate the report:", error.message);
  }
}

generateReport();