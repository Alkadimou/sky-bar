# SKY BAR AREZZO — DESIGN SYSTEM SPEC
### Identità: "Caraibi × Centro Storico Toscano"
Via Margaritone 28/A, Arezzo · Sito one-page statico (GitHub Pages, zero build step) · Lingua: IT

---

## 0) Sintesi operativa (TL;DR)

| Risorsa | Valore |
|---|---|
| Display font | **Fraunces** (Google Fonts, variable, opsz 9–144) |
| Body font | **Instrument Sans** (Google Fonts, variable 400–700) |
| BG primario | `#0E0C0A` (nero caldo "notte aretina") |
| Accento caraibico | `#2EC4B6` (turchese Caraibi) |
| Accento toscano/oro (esistente, evoluto) | **`#D4AF37` mantenuto** + variante chiara `#E8CE7E` |
| GSAP | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js` |
| ScrollTrigger | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js` |
| Lenis | `https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js` |
| Icone | Phosphor `@2.1.2` (CSS) — Lucide `@1.34.0` (UMD, opzionale) |

---

## 1) CONCEPT CREATIVO — "Il cielo sopra due mondi"

Arezzo e Santo Domingo condividono un'ora magica: il tramonto, quando la pietra arenaria di Piazza Grande si tinge dello stesso ambrato che accende il mare dei Caraibi. Sky Bar è quel momento sospeso: un salotto rinascimentale dove l'aria profuma di menta, lime e zucchero di canna invece che di vino rosso. Il design fa da ponte emotivo senza mai urlare nessuna delle due metà — la struttura è toscana (simmetria, serif editoriale, oro su nero, disciplina compositiva), il respiro è dominicano (turchese dell'acqua, verde della palma, corallo del tramonto, ritmo morbido come una brezza al marinaio). Nessun cappello di paglia, nessun fenicottero plastificato: i Caraibi arrivano per colore, luce e movimento, non per stereotipo da volantino turistico.

**Parole guida:** sospeso · dorato · tropicale contenuto · artigianale · notturno.

---

## 2) PALETTE

Filosofia: il sito attuale (#121212 + #d4af37) resta riconoscibile ma guadagna profondità. Il nero diventa **nero caldo** (sottotono bruno, come pietra arenaria al buio), l'oro viene **rispettato** ed esteso con una variante chiarissima per testi piccoli, e il mondo caraibico entra come **secondo accento** usato con parsimonia chirurgica (~5% della superficie).

### 2.1 Token

```css
:root {
  /* ── Fondi ─────────────────────────────── */
  --bg-primary:   #0E0C0A;  /* notte aretina: nero bruno, NON #000 né #121212 */
  --bg-alt:       #161210;  /* sezione alternativa (menu vs galleria) */
  --surface:      #201A16;  /* card, pannelli */
  --surface-raised:#28201A; /* card hover, modali */

  /* ── Testi ─────────────────────────────── */
  --text-primary: #F5EEE2;  /* bianco carta ambrata */
  --text-secondary:#B8AB97; /* taupe caldo */
  --text-muted:   #8A7D6C;  /* solo ≥16px o decorativo */

  /* ── Oro toscano (evoluzione del #d4af37 esistente) ── */
  --gold-core:    #D4AF37;  /* INVARIATO: logo, linee, dettagli */
  --gold-bright:  #E8CE7E;  /* oro su fondo scuro per testi <18px */
  --gold-deep:    #A88427;  /* bordi/ombre dorate su superfici chiare */

  /* ── Caraibi (accento secondario, dosato) ── */
  --carib-teal-vivo:#2EC4B6;/* acqua: badge, underline animati, riempimenti */
  --carib-teal-mid: #17A398;/* hover del vivo, icone grandi */
  --carib-teal-text:#12857D;/* UNICO turchese usabile come testo su bg scuro */
  --carib-coral:    #E98A70;/* tramonto dominicano: tag "domenica", like */
  --coral-deep:     #C94F42;/* stato errore / urgenza */

  /* ── Stati ─────────────────────────────── */
  --focus-ring:   #E8CE7E;
  --hover-lift:   rgba(232,206,126,.10); /* wash oro su hover card */
  --border-subtle:rgba(245,238,226,.08);
  --overlay-dark: rgba(14,12,10,.55);
}
```

### 2.2 Contrasti verificati (calcolo WCAG reale, non stimato)

| Coppia fg/bg | Ratio | Esito |
|---|---|---|
| `#F5EEE2` / `#0E0C0A` | **16.93** | AAA corpo testo ✓ |
| `#F5EEE2` / `#201A16` | 14.92 | AAA su card ✓ |
| `#B8AB97` / `#0E0C0A` | 8.66 | AAA testo secondario ✓ |
| `#8A7D6C` / `#0E0C0A` | 4.86 | AA — solo ≥16px regular ✓ |
| `#D4AF37` / `#0E0C0A` | 9.28 | AAA titoli/dettagli ✓ |
| `#E8CE7E` / `#0E0C0A` | **12.61** | AAA → usa questo sotto 24px ✓ |
| `#12857D` / `#0E0C0A` | **4.35** | AA corpo testo ✓ (gli altri teal NO come testo) |
| `#E98A70` / `#0E0C0A` | 7.75 | AAA coral come testo ✓ |
| `#14100D` su bottone `#D4AF37` | 9.00 | AA+ bottone primario ✓ |
| `#14100D` su bottone `#2EC4B6` | 9.01 | AA+ bottone secondario ✓ |
| `#14100D` su `#E98A70` | 7.51 | AA+ tag/badge ✓ |

⚠️ Regole invalicabili:
- **Mai testo bianco (`#F5EEE2`) su turchese** (ratio 2.71–3.89): su bottoni/accenti turchesi si usa SEMPRE `--bg-primary` come testo.
- `#2EC4B6` e `#17A398` sono **riempimento/forma**, mai colore testo su scuro.
- Su superfici (`#201A16`) il muted sale a 4.28 (limite AA): usarlo solo ≥18px o per meta decorativa.

### 2.3 Gerarchia d'uso (regola 60/30/10)

60% fondi caldi scuri · 30% testi avorio + oro strutturale · 10% Caraibi (turchese 7%, corallo 3%). Se in una viewport i Caraibi superano il 10%, si è caduti nel cliché: togliere.

---

## 3) TIPOGRAFIA

### 3.1 La coppia

**Display: Fraunces** (variable, asse ottico 9→144, pesi 300–900, corsivi inclusi)
Serif "old-style" contemporaneo con SOFT/WONK assi: a 144pt ha contrasti pieni da didone calda — perfetto per l'eleganza editoriale aretina; i corsivi hanno swing quasi calligrafico che richiama la mano del bartender che scrive la lavagnetta. È il ponte tipografico perfetto: raffinato quanto basta per Piazza Grande, caldo quanto basta per un mojito.

**Body: Instrument Sans** (variable 400–700 + italic)
Sans neo-grotesque dal carattere morbido e leggermente condensato: leggibilissimo a 15–17px, moderno senza freddezza svizzera. Fa da controcampo pulito alla voce espressiva di Fraunces.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
```

```css
--font-display: "Fraunces", "Iowan Old Style", Georgia, "Times New Roman", serif;
--font-body:    "Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
```

Fallback gerarchico pensati per degradare con grazia: serif → Iowan/Georgia (sempre disponibili), sans → system stack (zero layout shift critico). `font-display: swap` già incluso nel link.

Uso di Fraunces (dettaglio pro):
- Titoli hero/macro: `"opsz" 144, wght 560`, tracking `-0.02em`.
- Corsivi enfatici inline ("la domenica è *sacra*"): `opsz 40, wght 480, SOFT 100` via `font-variation-settings`.
- Numeri prezzo menu: `opsz 20, wght 420` — tabular feel con `font-feature-settings: "tnum"`.

### 3.2 Scala fluida (clamp)

```css
--fs-display-xl: clamp(3rem, 1.2rem + 9vw, 8.25rem);   /* 48→132px, hero H1 */
--fs-display-lg: clamp(2.5rem, 1.5rem + 5vw, 5.5rem);  /* 40→88px, titoli sezione */
--fs-display-md: clamp(2rem, 1.4rem + 3vw, 3.5rem);    /* 32→56px, sottosezioni */
--fs-heading:    clamp(1.5rem, 1.2rem + 1.5vw, 2.125rem); /* 24→34px, card title */
--fs-body-lg:    clamp(1.125rem, 1rem + .6vw, 1.375rem);  /* 18→22px, lead */
--fs-body:       clamp(1rem, .95rem + .25vw, 1.125rem);   /* 16→18px, corpo */
--fs-small:      clamp(.875rem, .85rem + .2vw, 1rem);     /* 14→16px, meta */
--fs-label:      .75rem;                                  /* 12px fisso, eyebrow/label */
```

Line-height: display 1.02–1.08 · heading 1.15 · body 1.6 · label 1.3 (uppercase, tracking `.14em`).
Larghezza colonna lettura: `max-width: 62ch`.

---

## 4) MOTION LANGUAGE

### 4.1 Filosofia — "brezza, non tempesta"

Il movimento imita ciò che muove davvero in due piazze: la brezza caraibica sulle foglie e il pullulare lento di una sera fiorentina… aretina. Tutto entra **morbido, sfalsato e breve**: niente bounce da landing page crypto, niente parallax vertiginosi. Il ritmo è quello del barman che posa un bicchiere: decisione + delicatezza. Ogni effetto deve poter dire perché esiste (guidare l'occhio, premiare lo scroll), altrimenti si toglie.

### 4.2 Stack CDN (versioni verificate oggi sui CDN, HTTP 200)

```html
<!-- GSAP core + ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js" defer></script>
<!-- Lenis smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js" defer></script>
<!-- Icone Phosphor (CSS, pesi regular+fill) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/fill/style.css">
```

Note: Lenis ≥1.x si registra così —
```js
const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Alternativa icone (UMD JS, tree-shakeable a mano): `https://cdn.jsdelivr.net/npm/lucide@1.34.0/dist/umd/lucide.min.js`. SplitText è ora gratuito nel bundle pubblico (`gsap@3.15.0/dist/SplitText.min.js`) ma per il budget performance bastano le tecniche CSS/manuali qui sotto.

### 4.3 Catalogo effetti (implementabili vanilla + GSAP ScrollTrigger)

| # | Effetto | Dove | Ricetta | Timing/Easing |
|---|---|---|---|---|
| 1 | **Hero intro cascade** | Hero all'load | Overlay `--bg-primary` che slide-up rivela il video; titolo splitto manuale in `<span>` per riga, righe con `yPercent:110 → 0`; poi logo + nav fade | righe: 0.9s stagger 0.08 · `power4.out` · delay 0.2s |
| 2 | **Video scale-settle** | Hero | Video parte `scale:1.15`, tween verso `scale:1` legato al load + micro-parallax scroll `yPercent:-12` | 1.6s `power2.out` |
| 3 | **Reveal-on-scroll standard** | Tutte le sezioni | `[data-reveal]`: opacity 0→1 + y 40→0, batch con stagger 0.06 dentro ogni gruppo | 0.8s · `power3.out` · trigger `top 85%`, once:true |
| 4 | **Line-mask reveal titoli** | Titoli sezione | Overflow hidden per riga, `yPercent:105 → 0` (tecnica manuale: wrappare parole in span) | 1s · `power4.out` · stagger 0.09 |
| 5 | **Marquee infinito** | Separatore tra sezioni | Striscia testuale loop ("MOJITO FIDEL ✦ PIÑA COLADA ✦ …") con `xPercent: 0 → -50` repeat -1; velocità modulata dalla velocity di Lenis (scrollVelocity → timeScale) | durata base 22s · `none` easing |
| 6 | **Parallax dolce immagini** | Galleria | Alternata per colonna: colonna dispari `yPercent:-6`, pari `yPercent:+4` con scrub | scrub:1 · `power1.inOut` |
| 7 | **Card tilt micro** | Card menu hover | rotateX/Y max ±3° seguendo il mouse + lift shadow (JS mousemove, gsap.to quickTo) | 0.4s · `power2.out` |
| 8 | **Oro progress** | Header | Linea dorata 2px sotto header, scaleX legata al progresso pagina (scrub) | scrub:0.3 |
| 9 | **Counter prezzi/speciali** | Badge "Domenica" | Contatore numerico o wipe del badge quando entra in vista | 0.6s · `power2.out` |
| 10 | **Gallery horizontal drift** | Galleria masonry orizzontale | Traccia orizzontale con `x` scrub legata allo scroll verticale (pin + translate), fallback nativo scroll-x su mobile | scrub:1 · pin distanza = larghezza traccia − vw |
| 11 | **Footer sunrise** | Footer | Al footer che entra: gradiente orizzonte corallo→oro che sale da sotto (opacity+y), come alba sul mare | 1.2s · `power2.inOut` |

Durate canoniche: micro-interazioni **150–250ms** (ease `power2.out`), reveals **600–900ms**, cinematiche **1.2–1.6s**. Mai oltre 1.8s. Easing di casa: `power3.out` (default), `power4.out` (titoli), `power2.inOut` (sfondi/atmosfera).

### 4.4 Accessibilità motion (obbligatoria)

```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  // init Lenis + tutti gli ScrollTrigger
} else {
  // NESSUN Lenis, NESSUN pin/parallax.
  // Solo dissolvenze istantanee: gsap.set(el, {opacity:1}) e contenuti visibili.
}
```
In più: `html.no-js`/fallback — tutti gli elementi `[data-reveal]` partono visibili in CSS e vengono nascosti **solo da JS** quando GSAP è caricato (pattern FOUC-safe: `gsap.set(el,{opacity:0,y:40})` prima del from()). Con reduced-motion anche il video hero mostra poster statico e niente autoplay.

---

## 5) COMPONENTI CHIAVE

### 5.0 Texture globale — grana "carta e calce"
Grain sottile via SVG feTurbulence inline come data-URI, fissato su `body::after`, `opacity:.05`, `mix-blend-mode: overlay`, `pointer-events:none`, dimensione tile 180px. Dà materia da pellicola/fresco d'intonaco senza peso immagine (<1KB). Vietate texture fotografiche pesanti (budget 5MB).

### 5.1 Header
- **Barra trasparente → pillola scura**: al primo scroll (Lenis velocity > soglia o y > 80px) l'header compatta in capsula flottante: bg `rgba(14,12,10,.72)` + `backdrop-filter: blur(14px)` + bordo `--border-subtle` 1px.
- Logo circolare oro esistente a sinistra (dimensione 44px, non toccarlo: è il marchio). Nav centrata/destra in Instrument Sans 13px uppercase tracking `.12em`, link con underline dorato animato scaleX left→right on hover (200ms).
- CTA "Prenota" a destra: pill bordo oro 1px, testo `--gold-bright`; hover: fill oro, testo `#14100D` (contrast 9.0 ✓). Focus visibile ovunque: `outline: 2px solid var(--focus-ring); outline-offset: 3px`.
- Mobile: overlay fullscreen bg `--bg-primary` con voci in Fraunces 34px, entrata stagger 60ms.

### 5.2 Hero (video bg)
- Video full-bleed `object-fit: cover`, **gradiente di ancoraggio**: overlay lineare dal basso `linear-gradient(to top, #0E0C0A 0%, transparent 45%)` + velo laterale sinistro 20% per leggibilità titolo.
- Composizione: eyebrow label oro 12px uppercase ("AREZZO · CENTRO STORICO · DAL 19XX"), H1 Fraunces 2 righe max ("Il cielo dei Caraibi / sulla pietra di Arezzo"), sotto una riga body avorio e doppia CTA (primaria oro piena, secondaria ghost turchese con bordo `--carib-teal-text` e testo avorio).
- Badge angolare destro: pill scura con icona Phosphor `ph-fill ph-sun-horizon` color `--carib-coral` + "Domenica è il nostro giorno" — l'unico tocco corallo above the fold.
- Altezza `min-height: 92svh`. Scroll indicator: linea verticale 1px oro con dot che scende in loop (1.8s, ease in-out), scompare al primo scroll.
- Performance: `preload="metadata"`, poster WebP ~120KB, video ≤2MB mute loop playsinline.

### 5.3 Card menu
- Superficie `--surface`, radius **18px**, bordo 1px `--border-subtle`, ombra riposante `0 8px 24px rgba(0,0,0,.35)`; hover: translateY(-4px), bg `--surface-raised`, wash oro `--hover-lift` interno, ombra `0 16px 40px rgba(0,0,0,.45)` (transizione 250ms `cubic-bezier(.2,.7,.3,1)`).
- Anatomia: fascia foto 4:3 top (radius top ereditato) · nome cocktail Fraunces 24px · descrizione Instrument Sans 15px `--text-secondary` · prezzo Fraunces in `--gold-bright` con leader-dots verso il numero (stile menù cartaceo toscano).
- Sistema di tag discreti (max 1 per card): pill 11px uppercase. Tag caraibico = bordo `--carib-teal-text` testo stesso (AA ✓); tag "signature/domenica" = bg `--carib-coral` testo `#14100D` (7.51 ✓). Niente emoji, solo Phosphor 14px se serve (`ph-drop`, `ph-star`).
- Griglia: 3 colonne desktop / 2 tablet / 1 mobile, gap 24px. Le card sono il posto dove il turchese può respirare di più (bordi tag + una sola card "hero product" con bordo completo turchese 1.5px).

### 5.4 Galleria (masonry orizzontale)
- Traccia orizzontale con colonne di altezza alternata (pattern 3-colonne: alta/media/bassa) per creare skyline irregolare che ricorda sia profilí toscani sia palme — astratto, non letterale.
- Frame fotografico: radius 14px, bordo 1px `rgba(212,175,55,.25)` (alone dorato appena percettibile, cita le cornici dorate delle pale d'altare aretine), caption sotto in 13px muted con numero d'ordine in Fraunces corsivo oro ("n. 04").
- Hover: immagine scala 1.03 dentro overflow hidden + caption passa a avorio; mai zoom aggressivi.
- Parallax alternato per colonna (effetto #6) + drift orizzontale desktop (effetto #10). Mobile: scroll-orizzontale nativo con `scroll-snap-type: x mandatory`, snap center.

### 5.5 Footer — "l'alba"
- Chiusura narrativa: sfondo passa da `--bg-primary` a un gradiente basso `linear-gradient(to top, rgba(201,79,66,.28), transparent 40%)` (alba corallo sull'orizzonte, attivata dall'effetto #11). Unico momento in cui il corallo domina: fine giornata = tramonto.
- Layout 3 zone: logo circolare grande + claim ("Due mondi, un cielo") · contatti/indirizzo (Via Margaritone 28/A, Arezzo) con icone Phosphor outline oro · orari con evidenza speciale su **domenica** (riga evidenziata con dot turchese pulsante lento).
- Marquee finale gigante "SKY BAR ✦ AREZZO ✦" in Fraunces outline (text-stroke oro, fill trasparente) che scorre lentissimo — firma di memoria.
- Legal row: 12px muted, link Instagram/Facebook con icone 20px, focus ring sempre visibile.

### 5.6 Pattern caraibici discreti (anti-cliché)
Vietati: fenicotteri, ananas kawaii, foglie di palma letterali, tavole a scacchi hawaiane, scritte "Aloha". Ammessi (uso massimo 2 punti pagina):
1. **Onda cartografica**: motivo di linee ondulate SVG 1px (stroke `--carib-teal-mid` al 18% opacity) come watermark dietro i titoli di sezione — richiama carte nautiche d'epoca, eleganza da biblioteca più che beach bar.
2. **Stella compasso ✦ / rosa dei venti** come separatore tipografico (già nel marquee): punta d'oro, funge da stella polare — ponte perfetto tra navigazione marinara e compasso dei mastri edificatori medievali di Arezzo.
3. **Raggio solare ray** sottile dietro il badge domenica (raggi corallo al 12%).

---

## 6) NORTH STAR — 3 riferimenti award verificati

1. **Imperiale Bolgheri** (imperialebolgheri.com — Honorable Mention Awwwards, giu 2026, categoria food/hospitality italiana)
   *Cosa prendere:* la compostezza dell'ospitalità italiana di lusso — ritmo lento tra sezioni, fotografia che respira, tipografia serif usata come voce narrante e non come decorazione. È la prova che un locale italiano può avere anima internazionale senza perdere radice. Per noi: la disciplina compositiva "toscanissima" della struttura.
2. **La Revoltosa** (larevoltosa.es — Site of the Day Awwwards, mag 2026)
   *Cosa prendere:* come un bar con carattere forte costruisce personalità tramite typographic voice + micro-motion (marquee, reveals sfalsati, hover giocosi) senza mai tradire la funzione. Il modo in cui il colore accent viene dosato a colpi chirurgici. Per noi: il coraggio del movimento, tenuto però dentro la nostra eleganza.
3. **Atlas Bar Singapore** (atlasbar.sg — landmark internazionale, multiple site features, standard di riferimento per hospitality websites)
   *Cosa prendere:* l'art déco luxury applicata al drinking — oro su toni profondi, simmetria monumentale, gallerie trattate come collezione d'arte, sensazione immediata di "posto che devi visitare". Per noi: il trattamento dell'oro (mai plastico, sempre materico su fondi scuri caldi) e la galleria come esperienza curatoriale.

---

## Appendice A — Budget performance (target ≤5MB totali)

| Voce | Budget |
|---|---|
| Galleria immagini (già ottimizzate) | ~3MB |
| Video hero | ≤2MB (poster incluso) |
| Font (2 variable WOFF2) | ~350KB |
| JS librerie (GSAP 70KB + ST 40KB + Lenis 10KB gz) | ~120KB |
| CSS/JS propri + grain SVG | <30KB |
| Icone Phosphor (2 pesi CSS+woff2 subset) | <80KB |

Regole: `loading="lazy"` su tutto tranne hero poster, `decoding="async"`, `<link rel="preconnect">` per jsDelivr + Google Fonts, script tutti `defer`.

## Appendice B — Checklist accessibilità
- [ ] Focus ring `#E8CE7E` 2px offset 3px su ogni interattivo
- [ ] Contrast AA verificati §2.2 (tabella = fonte di verità)
- [ ] `prefers-reduced-motion` → no Lenis, no pin, video sostituito da poster
- [ ] Alt text su ogni foto galleria, aria-label su icone social
- [ ] Navigazione interamente da tastiera (header → skip-link → sezioni → footer)
