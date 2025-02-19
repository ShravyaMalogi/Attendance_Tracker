function generateAttendanceSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var timetableSheet = ss.getSheetByName("Timetable");
  var attendanceSheet = ss.getSheetByName("Attendance");

  if (!timetableSheet) {
    Logger.log("Timetable sheet not found!");
    return;
  }

  // Create or clear Attendance sheet
  if (!attendanceSheet) {
    attendanceSheet = ss.insertSheet("Attendance");
  } else {
    attendanceSheet.clear(); // Clear previous data
  }

  // Set headers in the Attendance sheet
  var headers = ["Date", "Time", "Subject", "Attendance"];
  attendanceSheet.appendRow(headers);

  var timetableData = timetableSheet.getDataRange().getValues();
  var days = timetableData.slice(1).map(row => row[0]).filter(day => day); // Column A (Days)
  var times = timetableData[0].slice(1).filter(time => time); // Row 1 (Times)

  var today = new Date(); // Get today's date

  for (var i = 0; i < days.length; i++) {
    var currentDay = days[i];
    var rowIndex = i + 1; // Row index in timetable

    for (var j = 0; j < times.length; j++) {
      var colIndex = j + 1; // Column index in timetable

      // Skip lunch break (assuming after column E)
      if (colIndex === 6) continue;

      var subject = timetableData[rowIndex][colIndex];

      if (subject) { // Only add if a subject exists
        var date = new Date(today);
        date.setDate(today.getDate() + i); // Offset for each day

        attendanceSheet.appendRow([
          date.toLocaleDateString(), // Date
          times[j], // Time
          subject, // Subject
          false // Default unchecked checkbox
        ]);
      }
    }
  }

  // Convert the "Attendance" column to checkboxes
  var lastRow = attendanceSheet.getLastRow();
  if (lastRow > 1) {
    var range = attendanceSheet.getRange(2, 4, lastRow - 1, 1);
    range.insertCheckboxes();
  }

  Logger.log("Attendance sheet created with checkboxes!");
}

function updateAttendanceReport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var attendanceSheet = ss.getSheetByName("Attendance");
  var resultSheet = ss.getSheetByName("Results");

  if (!attendanceSheet) {
    Logger.log("Attendance sheet not found!");
    return;
  }

  if (!resultSheet) {
    resultSheet = ss.insertSheet("Results");
  } else {
    resultSheet.clear();
  }

  // Set headers in result sheet
  var headers = ["Date", "Total Classes", "Present", "Absent", "Attendance %"];
  resultSheet.appendRow(headers);

  var data = attendanceSheet.getDataRange().getValues();
  var attendanceSummary = {};

  for (var i = 1; i < data.length; i++) {
    var date = data[i][0]; // Date column
    var status = data[i][3]; // Checkbox column (TRUE/FALSE)

    if (!attendanceSummary[date]) {
      attendanceSummary[date] = { total: 0, present: 0, absent: 0 };
    }

    attendanceSummary[date].total++;

    if (status === true) {
      attendanceSummary[date].present++;
    } else {
      attendanceSummary[date].absent++;
    }
  }

  // Write data to result sheet
  for (var date in attendanceSummary) {
    var total = attendanceSummary[date].total;
    var present = attendanceSummary[date].present;
    var absent = attendanceSummary[date].absent;
    var attendancePercent = total ? ((present / total) * 100).toFixed(2) + "%" : "N/A";
    
    resultSheet.appendRow([date, total, present, absent, attendancePercent]);
  }

  Logger.log("Attendance report updated successfully!");
}


function calculateAttendance() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var attendanceSheet = ss.getSheetByName("Attendance");
  var resultSheet = ss.getSheetByName("Results");

  if (!attendanceSheet) {
    Logger.log("Attendance sheet not found!");
    return;
  }

  // Create Results sheet if it doesn't exist
  if (!resultSheet) {
    resultSheet = ss.insertSheet("Results");
  } else {
    resultSheet.clear(); // Clear previous data
  }

  // Set headers in Results sheet
  var headers = ["Date", "Total Classes", "Present", "Absent", "Attendance %"];
  resultSheet.appendRow(headers);

  var data = attendanceSheet.getDataRange().getValues();
  var attendanceSummary = {};

  for (var i = 1; i < data.length; i++) {
    var date = data[i][0]; // Date column
    var status = data[i][3]; // Checkbox column (TRUE/FALSE)

    if (!attendanceSummary[date]) {
      attendanceSummary[date] = { total: 0, present: 0, absent: 0 };
    }

    attendanceSummary[date].total++;

    if (status === true) {
      attendanceSummary[date].present++;
    } else {
      attendanceSummary[date].absent++;
    }
  }

  // Write attendance data
  for (var date in attendanceSummary) {
    var total = attendanceSummary[date].total;
    var present = attendanceSummary[date].present;
    var absent = attendanceSummary[date].absent;
    var attendancePercent = total ? ((present / total) * 100).toFixed(2) : 0;

    resultSheet.appendRow([date, total, present, absent, attendancePercent + "%"]);
  }

  Logger.log("Attendance calculation completed!");
}


function generateAttendanceChart() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var resultSheet = ss.getSheetByName("Results");

  if (!resultSheet) {
    Logger.log("Results sheet not found!");
    return;
  }

  var lastRow = resultSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("No data available for chart.");
    return;
  }

  // Clear previous charts
  var charts = resultSheet.getCharts();
  for (var i = 0; i < charts.length; i++) {
    resultSheet.removeChart(charts[i]);
  }

  var chartRange = resultSheet.getRange(2, 1, lastRow - 1, 5); // Data range
  var chart = resultSheet.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(chartRange)
    .setPosition(2, 7, 0, 0) // Place chart next to data
    .setOption("title", "Daily Attendance %")
    .setOption("vAxis", { title: "Attendance %" })
    .setOption("hAxis", { title: "Date" })
    .setOption("legend", { position: "none" })
    .build();

  resultSheet.insertChart(chart);

  Logger.log("Attendance chart generated successfully!");
}
