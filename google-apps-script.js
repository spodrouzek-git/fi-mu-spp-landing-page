const SHEET_NAME = "Odpovedi";
const HEADERS = [
  "submittedAt",
  "company",
  "person",
  "email",
  "phone",
  "events",
  "engagement",
  "note",
  "pageUrl"
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    ensureHeaders(sheet);

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.company || "",
      payload.person || "",
      payload.email || "",
      payload.phone || "",
      Array.isArray(payload.events) ? payload.events.join(", ") : "",
      Array.isArray(payload.engagement) ? payload.engagement.join(", ") : "",
      payload.note || "",
      payload.pageUrl || ""
    ]);

    return createJsonResponse({ ok: true });
  } catch (error) {
    return createJsonResponse({ ok: false, error: error.message });
  }
}

function doGet() {
  return createJsonResponse({ ok: true, message: "FI MU SPP landing page endpoint is running." });
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every((header, index) => firstRow[index] === header);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
