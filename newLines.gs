//This code is according to blank spaces present in question_id 
function myFunction() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Questions"); 
  if (!sheet) {
    Logger.log("Sheet not found. Make sure the sheet name is correct.");
    return;
  }

  const numRowsToAdd = 4; // Number of rows to insert
  const totalIterations = 17;  // total number of questions 
  let currentIteration = 1;
  let currentRow = 2; // Start from the 3rd row
  let consecutiveBlankRows = 0;

  while (currentIteration <= totalIterations) {
    const cellValue = sheet.getRange(`A${currentRow}`).getValue();

    if (cellValue === "") {
      consecutiveBlankRows++;
    } else {
      consecutiveBlankRows = 0;
    }

    if (consecutiveBlankRows === 3) {    // like wise we can modify if consecutive blank=2 in first row i.e. question_id
      sheet.insertRowsAfter(currentRow, numRowsToAdd);
      currentRow += numRowsToAdd + 1; 
      currentIteration++;
      consecutiveBlankRows = 0;
    } else {
      currentRow++;
    }
  }

  Logger.log(`Inserted rows in total: ${numRowsToAdd * totalIterations}`);
}
