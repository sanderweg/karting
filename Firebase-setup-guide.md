# Firebase setup guide voor je driver/pitwall dashboard

Deze guide is zo simpel mogelijk gehouden.
Doel: **pitwall voert data in op laptop/tablet** en **driver ziet live updates op telefoon**.

## 1. Maak een Firebase project aan
1. Ga naar de Firebase console.
2. Klik op **Create project**.
3. Geef het project een naam, bijvoorbeeld `race-dashboard`.
4. Klik door tot het project is aangemaakt.

## 2. Voeg een web app toe
1. Open je project.
2. Klik op het **web icoon** `</>`.
3. Geef de app een naam, bijvoorbeeld `race-dashboard-web`.
4. Klik op **Register app**.
5. Firebase laat nu een stukje code zien met jouw config.

Je krijgt iets dat hierop lijkt:

```js
const firebaseConfig = {
  apiKey: "jouw_api_key",
  authDomain: "jouw-project.firebaseapp.com",
  databaseURL: "https://jouw-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jouw-project",
  storageBucket: "jouw-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## 3. Zet Realtime Database aan
1. In het linker menu klik je op **Build** → **Realtime Database**.
2. Klik op **Create Database**.
3. Kies een regio die voor jou logisch is, bijvoorbeeld Europa.
4. Kies **Start in test mode**.
5. Maak de database aan.

## 4. Vul je Firebase gegevens in je HTML bestanden in
Open elk HTML bestand:
- `quali.html`
- `sprint.html`
- `endurance.html`

Zoek dit blok:

```js
const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};
```

Vervang de lege velden met jouw Firebase gegevens.

## 5. Upload de HTML bestanden naar GitHub
1. Open je GitHub repository.
2. Vervang de oude HTML bestanden door de nieuwe.
3. Commit de wijzigingen.
4. Wacht even tot GitHub Pages is bijgewerkt.

## 6. Gebruik dezelfde room op beide apparaten
Heel belangrijk: gebruik op pitwall en driver **dezelfde room**.

Voorbeeld:
- driver: `quali.html?room=teamA`
- pitwall: `quali.html?pit=1&room=teamA`

In deze nieuwe versie kun je ook gewoon op de knop drukken om naar pitwall te gaan.

## 7. Nieuwe knop voor pitwall / driver
In de dashboards zit nu bovenin een knop:
- **Open pitwall**
- **Open driver view**

Daardoor hoef je niet meer zelf `?pit=1` in de URL te typen.

## 8. Testen
### Test zonder Firebase
- Open pitwall mode en driver mode op hetzelfde apparaat of in dezelfde browser.
- De pagina gebruikt dan lokale opslag als fallback.

### Test met Firebase
- Open pitwall op laptop of tablet.
- Open driver view op telefoon.
- Gebruik dezelfde `room`.
- Vul op pitwall iets in en klik op **Opslaan / live push**.
- De telefoon moet direct updaten.

## 9. Veelgemaakte fouten
Meestal komt het hierdoor:
1. Firebase config niet ingevuld.
2. `databaseURL` ontbreekt.
3. Pitwall en driver gebruiken een andere `room`.
4. GitHub Pages draait nog een oude versie.
5. Realtime Database staat niet aan.

## 10. Snelle checklist
- Firebase project aangemaakt
- Web app aangemaakt
- Realtime Database aangezet
- Firebase config in alle HTML bestanden geplakt
- Bestanden opnieuw naar GitHub gezet
- Zelfde room op beide apparaten gebruikt

## Handig advies
Maak voor elke sessie een vaste room, bijvoorbeeld:
- `teamA`
- `driver12`
- `enduro01`

Dan voorkom je dat verschillende sessies door elkaar gaan lopen.
