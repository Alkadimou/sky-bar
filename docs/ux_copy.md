# Sky Bar Arezzo — Architettura dell'informazione & Copy finale
**Redesign one-page · Via Margaritone 28/A, centro storico di Arezzo**
*Posizionamento: l'anima dominicana incontra l'eleganza del centro storico toscano. Doppio target: giovani della domenica + pubblico adulto raffinato.*

---

## 0. Principi guida (per prendere decisioni durante lo sviluppo)

1. **Il nome fa già il lavoro**: "Sky" regge il gioco sulla vista dall'alto e sull'altezza del cielo. Non serve esagerare con metafore volanti.
2. **Zero stereotipi da catalogo turistico**: niente "paradiso", "spiagge sconfinate", "spirito libero dell'isola". Il Caraibi qui è concreto: rum, menta, lime, ritmo, ospitalità senza fretta.
3. **Il dato forte è l'orario**: apre alle 6 e il weekend chiude alle 2. Nessun altro locale può raccontare una giornata intera. È l'asse narrativo del sito.
4. **Onestà commerciale**: solo telefono e presenza. Le CTA dicono sempre la verità (chiamare, arrivare, seguirci su Instagram).

---

## 1. STRUTTURA DELLA PAGINA (ordine scelto e perché)

| # | Sezione | Perché in questa posizione |
|---|---------|---------------------------|
| 1 | Hero | Identità + promessa in 3 secondi |
| 2 | Manifesto / Chi siamo | Dà tono e credibilità prima di vendere |
| 3 | La Domenica al Sky | Il momento firma: crea desiderio |
| 4 | Menu | Soddisfa il desiderio appena creato (proof) |
| 5 | Galleria | Conferma visiva, mantiene il ritmo |
| 6 | Info pratiche / Orari / Mappa | Conversione finale quando l'interesse è massimo |
| 7 | Footer | Dati legali, richiami, respiro |

**Logica**: chi cerca il posto per la domenica viene agganciato presto; chi valuta la qualità legge tono e menu; entrambi convertono nelle info pratiche. Menu dopo "La domenica" (e non prima): prima il momento firma differenzia, poi il listino dimostra.

---

### 1.1 HERO
- **Nome sezione**: `hero` — "Sky Bar"
- **Scopo UX**: identificare brand, categoria (cocktail bar / pub) e luogo in un colpo; offrire subito l'azione principale (telefono).
- **Elemento dominante**: titolo H1 su fondo immagine/video notturno del bancone o della sala (il video attuale va sostituito o integrato con contenuti reali: bicchieri, mani, luce bassa). Kicker sopra il titolo: "Cocktail bar & pub · Centro storico di Arezzo".
- **Note comportamentali**: video autoplay muto con poster statico di fallback; rispetto di `prefers-reduced-motion`; testo con contrasto garantito (overlay scuro); doppia CTA (primaria telefono, secondaria ancora al menu); freccia "scorri" discreta in basso. Altezza: 100svh mobile, ~85vh desktop.

### 1.2 MANIFESTO / CHI SIAMO
- **Nome sezione**: "Da Santo Domingo ad Arezzo"
- **Scopo UX**: raccontare l'identità ibrida dominicana-aretina in 15 secondi di lettura; dare legittimità culturale al locale prima del menu.
- **Elemento dominante**: blocco tipografico centrale (max 60 parole) affiancato o seguito da una singola fotografia d'atmosfera forte — meglio una sola immagine eccellente che tre mediocri.
- **Note comportamentali**: reveal-on-scroll sobrio (fade + 12px translate, IntersectionObserver); nessun parallax; larghezza colonna di lettura ~65ch.

### 1.3 LA DOMENICA AL SKY (momento firma)
- **Nome sezione**: "La domenica al Sky"
- **Scopo UX**: possedere il giorno forte. È la sezione che differenzia da ogni altro bar del centro: racconta l'arco completo 6:00 → 02:00.
- **Elemento dominante**: timeline orizzontale (desktop) / verticale snella (mobile) del "domenican-tipo": mattina → pranzo → aperitivo → notte, con un cocktail-icona per momento. Suo colore proprio: la sezione può staccarsi cromaticamente (caldo, profondo) dal resto della pagina.
- **Note comportamentali**: reveal sequenziale dei momenti; su mobile la timeline scorre verticalmente senza carosello (meno attrito); CTA telefono ripetuta in fondo alla sezione.

### 1.4 MENU
- **Nome sezione**: "Il menu"
- **Scopo UX**: proof concreto: 31 cocktail, 4 capitoli, prezzi leggibili. Deve essere consultabile in 20 secondi.
- **Elemento dominante**: lista a 4 categorie in griglia (desktop) o accordion (mobile), ogni voce con nome, descrizione breve e prezzo allineato a destra.
- **Note comportamentali**: pillole-ancora per categoria sticky sotto la navbar quando la sezione è in viewport; accordion mobile con la prima categoria aperta; niente PDF, niente immagini di listino (inaccessibili); prezzi in euro con virgola italiana.

### 1.5 GALLERIA
- **Nome sezione**: "Il Sky in un lampo"
- **Scopo UX**: conferma emotiva: "è davvero così". 6–9 sole foto selezionate, mai un muro infinito.
- **Elemento dominante**: griglia 3×3 asimmetrica (desktop) / carosello orizzontale a snap (mobile).
- **Note comportamentali**: lightbox al click con didascalia; lazy-loading (`loading="lazy"`); swipe nativo mobile; frecce accessibili da tastiera; alt text secondo il pattern in §5.

### 1.6 INFO PRATICHE / ORARI / MAPPA
- **Nome sezione**: "Vieni a trovarci"
- **Scopo UX**: conversione: indirizzo, orari, telefono, Instagram, mappa. Tutto verificabile in uno sguardo.
- **Elemento dominante**: split 50/50: sinistra dati (indirizzo, orari in tabella a 2 righe, telefono cliccabile, Instagram), destra mappa incorporata.
- **Note comportamentali**: mappa **click-to-load** (pulsante "Carica la mappa") per performance e per evitare cookie di terze parti al primo arrivo; tabella orari con evidenza del giorno corrente possibile solo lato client (JS opzionale, degrada bene); riga onestà: "Niente prenotazioni online: trovarci è facile — di persona o al telefono."

### 1.7 FOOTER
- **Nome sezione**: footer
- **Scopo UX**: chiusura legale + richiami rapidi (nav, telefono, Instagram).
- **Elemento dominante**: logo/wordmark, P.IVA, © anno corrente, mini-nav, crediti.
- **Note comportamentali**: nessuna animazione; link "torna su".

### Valutazione onesta: FAQ ed Eventi
- **FAQ: NO.** Un one-page con 5–6 domande vere non le ha ancora; una FAQ riempitiva ( "avete il parcheggio?" ) costringerebbe a inventare risposte. Le poche informazioni utili vivono già nelle Info pratiche. Da riconsiderare solo se emergeranno domande ricorrenti reali (Instagram DM è il termometro).
- **Eventi: NO (come sezione fissa).** Non esistono dati eventi reali da pubblicare; un calendario finto o vuoto comunica trascuratezza. Soluzione: la vita "live" del locale resta su Instagram (link in nav e footer). Se in futuro arriveranno eventi ricorrenti reali, la sezione giusta è una striscia dentro "La domenica al Sky", non una pagina separata.

---

## 2. COPY FINALE (italiano)

> Regola rispettata: max 60 parole per blocco prosa. Tono: caldo, preciso, mai postcard.

### Tagline
- **Attuale (conservata come H1 hero)**: "L'eleganza di Arezzo vista dall'alto."
- **Alternativa A — *preferita***: **"Rum dominicano, eleganza toscana."**
  *Perché*: compie esattamente la fusione richiesta in cinque parole; due pubblici, una frase; zero folklore.
- **Alternativa B**: **"La domenica ha un indirizzo."**
  *Perché*:possessiva e curiosa, perfetta per social e stampa locale; usa come campagna o claim di sezione, non come H1 permanente (lascerebbe fuori il resto della settimana).

### HERO
- **Kicker**: Cocktail bar & pub · Centro storico di Arezzo
- **H1**: L'eleganza di Arezzo vista dall'alto.
- **Sub**: Un pub dall'anima dominicana nel cuore di Arezzo: mojito fatti a regola d'arte, rum vero e i grandi classici della mixology. Dal caffè delle sei alla chiusura delle due, ogni giorno.
- **CTA primaria**: `Chiama ora · 340 194 2471`
- **CTA secondaria**: `Scopri il menu`
- **Link tertiaire ghost**: `Come arrivare ↓`
- **Microcopy sotto le CTA**: Tutti i giorni dalle 6:00 · venerdì e weekend fino alle 2:00

⚠️ Verifica orari prima di pubblicare: i dati forniti dicono "Sab–Dom fino alle 2". Se il venerdì chiude a mezzanotte (Lun–Ven 06–24), il microcopy corretto è: **"Ogni giorno dalle 6:00 · sabato e domenica fino alle 2:00"**. *(Usata quest'ultima versione nel resto del documento.)*

### MANIFESTO — "Da Santo Domingo ad Arezzo"
- **H2**: Da Santo Domingo ad Arezzo.
- **Body**: Il Sky porta in centro storico l'anima della Repubblica Dominicana: il rum vero, la menta fresca, i ritmi giusti e un'ospitàlità che non conosce fretta. E la incrocia con la misura di questa città. Qui il Caraibi non è scenografia: è un modo di fare le cose, dal primo caffè all'ultimo cocktail.
- *(41 parole)*

### LA DOMENICA AL SKY
- **H2**: La domenica, qui, dura tutto il giorno.
- **Sub**: Dalle sei alla chiusura, un solo locale per tutte le tue domeniche.
- **Body**: Alle sei apre con il caffè. Verso pranzo si rallenta, al tramonto arriva l'aperitivo e la notte si allunga fino alle due. Che tu venga per colazione, per un mojito con gli amici o per chiudere il weekend in bellezza, la tua domenica trova la sua forma al bancone.
- *(53 parole)*
- **Timeline (microcopy momenti)**:
  - 06:00 — *Si apre: il caffè è già pronto.*
  - Metà giornata — *Si rallenta: giornali, chiacchiere, ricarica.*
  - Tramonto — *L'aperitivo: il banco si accende.*
  - Fino alle 02:00 — *La notte: rum, musica e compagnia.*
- **CTA**: `Chiama · 340 194 2471` — microcopy: *"Gruppi numerosi? Una chiamata basta."*

### MENU — "Il menu"
- **H2**: Il menu.
- **Kicker**: 31 cocktail, quattro capitoli.
- **Intro**: Quattro famiglie, trentun modi per fare brindisi. Dai grandi classici ai nostri tropicali, ogni drink esce dal banco freddo, pesato e senza fretta. Non sai cosa scegliere? Raccontaci cosa ti piace: troviamo il bicchiere giusto.
- *(37 parole)*

**GRANDI CLASSICI** — *descrizione categoria*: I pilastri della mixology, su una selezione di gin premium.
| Cocktail | Prezzo |
|---|---|
| Gin Tonic · selezione gin premium | €10 |
| Gin Lemon · selezione gin premium | €10 |
| Americano | €7 |
| Negroni | €7 |
| Spritz | €6 |
| Quattro Bianchi · anche versione fragola | €7 |

**MOJITO & MARGARITA** — *descrizione categoria*: Il nostro terreno di casa: menta, lime, rum.
| Cocktail | Prezzo |
|---|---|
| Mojito Selection · classico, fragola o passion fruit | €7 |
| Mojito Fidel · rum, lime, zucchero, menta e birra Corona | €10 |
| Classic Margarita | €7 |
| Fruity Margarita · mango o fragola | €7 |

**TROPICAL & FRESH** — *descrizione categoria*: Frutta, ghiaccio e ritmo.
| Cocktail | Prezzo |
|---|---|
| Piña Colada | €7 |
| Caipirinha | €7 |
| Caipiroska | €7 |
| Daiquiri Selection · classico o fragola | €7 |
| Laguna Blu · vodka, blue curaçao, sprite e ananas | €7 |

**PROPOSTE DELLO CHEF** — *descrizione categoria*: I consigli che facciamo agli amici.
| Cocktail | Prezzo |
|---|---|
| Mai Tai | €8 |
| Sex on the Beach | €7 |
| Tequila Sunrise | €7 |

- **Nota a fondo menu (microcopy)**: Prezzi in euro. Chiedici pure di allergie e preferenze: al banco si trova la risposta.

### GALLERIA — "Il Sky in un lampo"
- **H2**: Il Sky in un lampo.
- **Body**: Bicchieri condensati, luci basse, mani che si incontrano sul bancone. E fuori dalla porta, il centro storico. Un rapido sguardo a come si sta al Sky.
- *(26 parole)*
- **Microcopy lightbox**: Chiudi ✕ · frecce ‹ ›
- **Didascalie**: brevi e concrete, es. "Mojito Selection al banco", "L'aperitivo del sabato". Nessuna didascalia inventata su eventi o persone.

### INFO PRATICHE — "Vieni a trovarci"
- **H2**: Vieni a trovarci.
- **Sub**: In pieno centro storico: ci trovi facilmente, e trovarci piace ancora di più.
- **Indirizzo**: Via Margaritone 28/A · Arezzo (centro storico)
- **Orari**:
  - Lunedì – Venerdì · **06:00 – 24:00**
  - Sabato – Domenica · **06:00 – 02:00**
- **Telefono**: 340 194 2471 *(link `tel:`)*
- **Instagram**: [@skybar_02](https://www.instagram.com/skybar_02)
- **Riga di onestà (prenotazioni)**: Niente prenotazioni online: ci trovi di persona o al telefono. Per gruppi, una chiamata basta.
- **CTA**: `Chiama ora` · `Indicazioni stradali`
- **Pulsante mappa (pre-caricamento)**: `Carica la mappa`

### FOOTER
- **One-liner**: Sky Bar — cocktail bar & pub nel centro storico di Arezzo.
- **Colonne**: Mini-nav (Chi siamo · La domenica · Menu · Galleria · Dove siamo) · Contatti (tel, Instagram) · Legale.
- **Legale**: P.IVA 02475150518 · © 2026 Sky Bar · Tutti i diritti riservati.
- **Extra**: `Torna su ↑`

---

## 3. NAVIGAZIONE

**Barra sticky (desktop)**, sfondo semi-trasparente con blur, logo a sinistra:

| Voce | Ancora |
|---|---|
| Chi siamo | `#manifesto` |
| La domenica | `#domenica` |
| Menu | `#menu` |
| Galleria | `#galleria` |
| Dove siamo | `#info` |

- **CTA principale (bottone, destra)**: `Chiama ora · 340 194 2471` → `tel:+393401942471`
- **Perché il telefono e non "indicazioni"**: è l'unica azione che converte in visita reale (prenotazione/gruppo/domanda) e distingue il locale da qualsiasi concorrente "solo mappa". Le indicazioni restano come azione secondaria nelle Info pratiche e nella barra mobile.
- **Mobile**: hamburger → overlay a schermo intero con le 5 voci + bottone `Chiama ora` fisso in basso (thumb zone). Scroll-spy per evidenziare la sezione corrente.

---

## 4. SEO LOCALE

**Title** (~58 caratteri):
```
Sky Bar Arezzo | Cocktail Bar e Pub nel Centro Storico
```

**Meta description** (~158 caratteri):
```
Cocktail bar e pub nel centro storico di Arezzo: mojito, rum dominicano e grandi classici in Via Margaritone 28/A. Ogni giorno dalle 6, weekend fino alle 2.
```

**8 keyword locali**:
1. cocktail bar arezzo centro storico
2. pub arezzo
3. pub domenica arezzo
4. mojito arezzo
5. aperitivo arezzo centro
6. bar via margaritone arezzo
7. locali arezzo centro storico sera
8. rum dominicano arezzo

**Schema.org — JSON-LD suggerito** (blocco `<script type="application/ld+json">`):

```json
{
  "@context": "https://schema.org",
  "@type": ["BarOrPub", "CafeOrCoffeeShop"],
  "name": "Sky Bar",
  "description": "Cocktail bar e pub con anima dominicana nel centro storico di Arezzo.",
  "url": "[URL definitivo del sito]",
  "telephone": "+393401942471",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Margaritone 28/A",
    "addressLocality": "Arezzo",
    "addressRegion": "AR",
    "postalCode": "[CAP da confermare]",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat da Google Maps]",
    "longitude": "[lng da Google Maps]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:00",
      "closes": "24:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "06:00",
      "closes": "02:00"
    }
  ],
  "sameAs": ["https://www.instagram.com/skybar_02"],
  "vatID": "02475150518",
  "priceRange": "€€",
  "image": "[URL foto hero]"
}
```

Campi da compilare prima del deploy: URL definitivo, CAP, coordinate geo, URL immagini. **Non aggiungere** `aggregateRating` finché non esistono recensioni reali e verificabili.

---

## 5. MICROTESTI DI SISTEMA

**Pattern alt text galleria** — formula: `Sky Bar Arezzo — [soggetto concreto], [contesto]`. Massimo ~110 caratteri, mai keyword stuffing.
- Esempi: `Sky Bar Arezzo — Mojito Selection sul bancone` · `Sky Bar Arezzo — Negroni e Spritz per l'aperitivo` · `Sky Bar Arezzo — la sala a lume basso la domenica sera`.
- Immagini decorative/pure atmosfera senza soggetto: `alt=""` (vuoto, decorativo).

**aria-label**:
- Toggle menu mobile: `Apri il menu di navigazione` / `Chiudi il menu di navigazione`
- CTA telefono: `Chiama lo Sky Bar: 340 194 2471`
- Link Instagram: `Profilo Instagram dello Sky Bar, @skybar_02 (apre in nuova finestra)`
- Regione mappa: `Mappa: Sky Bar, Via Margaritone 28/A, Arezzo`
- Frecce carosello: `Foto precedente` / `Foto successiva`
- Lightbox chiudi: `Chiudi l'immagine ingrandita`

**Cookie**: il sito è statico, senza tracciamento né cookie non essenziali → **nessun banner necessario** (e meglio così). Se in futuro si aggiungesse analytics o la mappa Google caricata subito, banner minimale: *"Usiamo solo cookie tecnici e, se accetti la mappa, servizi di Google. Nessun tracciamento pubblicitario."* + `Accetta` / `Solo essenziali`.

**404**: non applicabile a un one-page statico. Eventuale fallback a livello host: reindirizzamento alla home. Nessuna pagina da progettare.

---

## 6. NOTE UX MOBILE

**Priorità dei contenuti su schermo piccolo** (ordine verticale):
1. Hero con nome, promessa e **CTA Chiama** visibile senza scroll.
2. Striscia compatta orari + indirizzo subito sotto l'hero (le due informazioni più cercate da mobile; su desktop restano in fondo, su mobile si anticipano).
3. La domenica al Sky.
4. Menu (accordion).
5. Galleria (carosello).
6. Info pratiche complete + mappa.
7. Footer.

**Thumb zone**:
- Barra azioni fissa in basso (safe-area aware, altezza ~56px): `[Chiama]` (primario, pieno) + `[Indicazioni]` (secondario). Il corpo della pagina riceve `padding-bottom` equivalente. La barra resta su tutte le sezioni tranne il menu aperto in fullscreen.
- Nel menu overlay: bottone chiamata ancorato in basso, raggiungibile col pollice.
- Target touch ≥ 44×44px; font base ≥ 16px (evita zoom iOS sui focus input); link `tel:` ovunque compaia il numero.
- Menu a accordion con prima voce aperta; galleria a scroll-snap orizzontale; mappa click-to-load (risparmio dati); immagini lazy; hero video disabilitato con `prefers-reduced-motion` e sostituito dal poster.

---

*Documento pronto per lo sviluppo. Tutto il contenuto deriva esclusivamente dai dati reali forniti: nessuna email, parcheggio o evento è stato ipotizzato.*
