# FI MU SPP Landing Page

Staticka landing page pro prihlaseni zajmu partneru SPP FI MU o podzimni aktivity 2026.

## Napojeni na Google Sheets

1. Vytvorte novou Google tabulku.
2. V tabulce zvolte `Extensions` -> `Apps Script`.
3. Do souboru `Code.gs` vlozte obsah souboru `google-apps-script.js` z tohoto repozitare.
4. Kliknete na `Deploy` -> `New deployment`.
5. Typ deploymentu nastavte na `Web app`.
6. `Execute as` nastavte na sebe.
7. `Who has access` nastavte na `Anyone`.
8. Po nasazeni zkopirujte `Web app URL`.
9. V souboru `index.html` vlozte URL do konstanty:

```js
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
```

Po teto uprave zacne formular zapisovat odpovedi do listu `Odpovedi`.
