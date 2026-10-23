/**
 * GreenPanda Agro, December orders
 * Saves each landing page order to this Google Sheet and emails a notification.
 *
 * Setup (once):
 * 1. Create a Google Sheet while signed in as greenpandaagro@gmail.com.
 * 2. Extensions > Apps Script. Delete what's there and paste this whole file. Save.
 * 3. Deploy > New deployment > type "Web app".
 *    Execute as: Me. Who has access: Anyone. Click Deploy and approve the permissions.
 * 4. Copy the Web app URL and paste it into ORDER_ENDPOINT in src/config.js, then redeploy the site.
 */

const NOTIFY_EMAIL = 'greenpandaagro@gmail.com';
const SHEET_NAME = 'Orders';

const HEADERS = [
  'Order ID', 'Received', 'Package', 'Package price (USD)', 'Shipping',
  'Name', 'Email', 'WhatsApp', 'Address', 'City', 'Postcode', 'Notes', 'Status',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const o = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    sheet.appendRow([
      o.orderId, new Date(), o.package, o.subtotalUSD, o.shipping,
      o.name, o.email, "'" + o.whatsapp, o.address, o.city, o.postcode, o.notes, 'New',
    ]);

    const body = [
      'New December order from the landing page.',
      '',
      'Order ID: ' + o.orderId,
      'Package: ' + o.package + ' ($' + o.subtotalUSD + ')',
      'Shipping: ' + o.shipping,
      '',
      'Name: ' + o.name,
      'Email: ' + o.email,
      'WhatsApp: ' + o.whatsapp,
      'Deliver to: ' + o.address + ', ' + o.city + ', ' + o.postcode,
      o.notes ? 'Notes: ' + o.notes : '',
      '',
      'The customer has been asked to confirm on WhatsApp. Reply with shipping cost and payment details.',
      'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New order ' + o.orderId + ', ' + o.package + ' ($' + o.subtotalUSD + ')',
      body: body,
      replyTo: o.email,
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
