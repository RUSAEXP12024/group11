function getSheet(name) {
  const SPREADSHEET_ID = '16Ir9q6DsV30KKE16bsFFHMKRcvtVWL8l-g08NrkcE-k'
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }

  return sheet;
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}
