# Firebase setup in 5 simpele stappen

## 1. Maak een Firebase project
- Ga naar Firebase.
- Klik op **Create project**.
- Geef het project een naam, bijvoorbeeld `race-dashboard-live`.
- Google Analytics kun je uit laten.

## 2. Zet Realtime Database aan
- Open je project.
- Ga naar **Build > Realtime Database**.
- Klik op **Create Database**.
- Kies een regio.
- Kies tijdens het testen **Start in test mode**.

## 3. Maak een web app aan
- Klik in Firebase op het web-icoon `</>`.
- Geef de app een naam, bijvoorbeeld `race-dashboard-web`.
- Klik op registreren.
- Je krijgt dan een config met onder andere:
  - `apiKey`
  - `authDomain`
  - `databaseURL`
  - `projectId`
  - `appId`

## 4. Vul alleen `firebase-config.js` in
Open het bestand **firebase-config.js** en plak daar jouw gegevens in:

```js
window.DASHBOARD_FIREBASE_CONFIG = {
  apiKey: "JOUW_API_KEY",
  authDomain: "JOUW_PROJECT.firebaseapp.com",
  databaseURL: "https://JOUW_PROJECT-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "JOUW_PROJECT",
  storageBucket: "JOUW_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

Je hoeft dit maar **één keer** te doen. Alle HTML-pagina's gebruiken daarna automatisch dezelfde Firebase-instellingen.

## 5. Upload alles naar GitHub Pages
Zet deze bestanden samen in dezelfde map:
- `index.html`
- `quali.html`
- `sprint.html`
- `endurance.html`
- `firebase-config.js`

Daarna:
- open op de telefoon de driver view
- open op laptop of tablet de pitwall view
- gebruik op beide apparaten dezelfde roomnaam

## Gebruik
### Driver
```text
quali.html?room=team-a
```

### Pitwall
```text
quali.html?room=team-a&pit=1
```

Je kunt ook gewoon via `index.html` starten en op de knoppen drukken.

## Belangrijk
Zonder ingevulde Firebase-config werkt het dashboard nog steeds, maar dan alleen lokaal in dezelfde browser als demo.
