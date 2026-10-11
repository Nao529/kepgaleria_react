# Képgaléria

## Fogalmak

**Komponens (component):** A felület önálló, újrafelhasználható része, amely Reactben általában egy függvény. Ez JSX-elemeket ad vissza.

**JSX:** HTML-hez hasonló szintaxis, amellyel leírjuk a megjelenítendő felületet.

**Props:** A szülőkomponenstől kapott, közvetlenül nem módosítható adatok.

**State (állapot):** A komponens változó, belső adata. Módosításakor a React újrarendereli a komponenst.

**useState hook:** Állapot létrehozására és módosítására szolgál funkcionális komponensekben.

## Használt ismeretek

- komponensek és propsok
- state és `useState`
- eseménykezelés
- feltételes megjelenítés
- `map()` és listaelemek

Az `App` komponens kezeli a közös állapotot, a gyermekkomponensek pedig propsokon keresztül kapják meg az adatokat és a függvényeket. Ezt **állapot felemelésének** (lifting state up) nevezzük.

## Fájlszerkezet

```text
src/
├── components/
│   ├── Galeria.tsx
│   ├── KisKep.tsx
│   └── NagyKep.tsx
├── adatok.ts
├── App.css
├── App.tsx
└── main.tsx
```

## 1. Adatok – `adatok.ts`

```ts
export type KepTipus = {
  kep: string;
  leiras: string;
};

export const KEPLISTA: KepTipus[] = [
  { kep: '/kepek/hegyek.jpg', leiras: 'Hegyek' },
  { kep: '/kepek/to.jpg', leiras: 'Erdei tó' },
  { kep: '/kepek/varos.jpg', leiras: 'Éjszakai város' },
];
```

A `KepTipus` meghatározza egy kép adatait, a `KEPLISTA` pedig a képeket tartalmazó tömb.

## 2. App – állapot és függvények

Az aktuális kép indexét az `App` tárolja:

```tsx
const [aktIndex, setAktIndex] = useState(0);
```

- `aktIndex`: az aktuális kép indexe.
- `setAktIndex`: az állapot módosítása.

### Kép kiválasztása

```tsx
function kivalaszt(index: number) {
  if (index >= 0 && index < KEPLISTA.length) {
    setAktIndex(index);
  }
}
```

A függvény csak érvényes index esetén módosítja az állapotot.

### Léptetés

```tsx
function leptet(irany: boolean) {
  const hossz = KEPLISTA.length;

  if (hossz === 0) return;

  setAktIndex((elozoIndex) =>
    irany
      ? (elozoIndex + 1) % hossz
      : (elozoIndex - 1 + hossz) % hossz
  );
}
```

- `true`: következő kép.
- `false`: előző kép.

A `%` operátor segítségével a léptetés körbeér a lista végén és elején is.

### Az aktuális kép és a gyermekkomponensek

```tsx
const aktualisKep = KEPLISTA[aktIndex];
const nincsKep = KEPLISTA.length === 0;
```

A `return` részben:

```tsx
{aktualisKep ? (
  <NagyKep kepem={aktualisKep} />
) : (
  <p>Nincs megjeleníthető kép.</p>
)}

<button
  onClick={() => leptet(false)}
  disabled={nincsKep}
>
  Előző
</button>

<button
  onClick={() => leptet(true)}
  disabled={nincsKep}
>
  Következő
</button>

<Galeria
  lista={KEPLISTA}
  aktIndex={aktIndex}
  kivalaszt={kivalaszt}
/>
```

A `Galeria` három propot kap:

- `lista`: képek tömbje;
- `aktIndex`: aktuális index;
- `kivalaszt`: a kiválasztást kezelő függvény.

## 3. NagyKep – a kiválasztott kép

A `NagyKep` megjeleníti a kapott képet, saját állapot nélkül.

```tsx
import type { KepTipus } from '../adatok';

type NagyKepProps = {
  kepem: KepTipus;
};

function NagyKep({ kepem }: NagyKepProps) {
  return (
    <figure className="nagykep">
      <img
        src={kepem.kep}
        alt={kepem.leiras || 'Kép'}
      />
      {kepem.leiras && (
        <figcaption>{kepem.leiras}</figcaption>
      )}
    </figure>
  );
}

export default NagyKep;
```

## 4. Galeria – a kis képek listája

A `map()` segítségével minden képhez létrehozunk egy `KisKep` komponenst.

```tsx
import type { KepTipus } from '../adatok';
import KisKep from './KisKep';

type GaleriaProps = {
  lista: KepTipus[];
  aktIndex: number;
  kivalaszt: (index: number) => void;
};

function Galeria({
  lista,
  aktIndex,
  kivalaszt,
}: GaleriaProps) {
  return (
    <section className="galeria">
      {lista.map((kep, index) => (
        <KisKep
          key={kep.kep}
          kepem={kep}
          index={index}
          isAktiv={index === aktIndex}
          kivalaszt={kivalaszt}
        />
      ))}
    </section>
  );
}

export default Galeria;
```

A `key` segíti a Reactet a listaelemek azonosításában. Az `isAktiv` jelzi, hogy az adott kép van-e kiválasztva.

## 5. KisKep – kép kiválasztása

```tsx
import type { KepTipus } from '../adatok';

type KisKepProps = {
  kepem: KepTipus;
  index: number;
  isAktiv: boolean;
  kivalaszt: (index: number) => void;
};

function KisKep({
  kepem,
  index,
  isAktiv,
  kivalaszt,
}: KisKepProps) {
  return (
    <button
      type="button"
      className={`kepdiv ${isAktiv ? 'aktiv' : ''}`}
      onClick={() => kivalaszt(index)}
      aria-pressed={isAktiv}
    >
      <span className="kep">
        <img
          src={kepem.kep}
          alt={kepem.leiras || 'Kép'}
        />
      </span>
    </button>
  );
}

export default KisKep;
```

Kattintáskor a `KisKep` meghívja a kapott függvényt, amely frissíti az `App` állapotát. A React ezután megjeleníti az új képet, és frissíti az aktív bélyegképet.

## 6. main.tsx

Az `App` megjelenítése:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Mivel nem használunk Contextet, Providerre sincs szükség.

## Adatáramlás

```text
App
├── aktIndex állapot
├── kivalaszt() és leptet()
├── NagyKep ← aktuális kép prop
└── Galeria ← lista prop, aktIndex prop, kivalaszt prop
    └── KisKep ← kép prop, index prop, isAktiv prop, kivalaszt prop
```

Az adatok lefelé haladnak a komponensfában, a gyermekek pedig a kapott függvényeken keresztül kezdeményezhetik az állapot módosítását.

## Gyakori hibák

### Több helyen létrehozott állapot

Az `aktIndex` csak az `App` komponensben legyen létrehozva. Így minden gyermek ugyanazt az állapotot használja.

### A függvény azonnali meghívása

```tsx
// Hibás
<KisKep kivalaszt={kivalaszt(index)} />

// Helyes
<KisKep kivalaszt={kivalaszt} />

// Meghívás kattintáskor
onClick={() => kivalaszt(index)}
```

### Hiányzó függvénytípus

```tsx
kivalaszt: (index: number) => void;
```

Ez azt jelenti, hogy a függvény egy számot kap, és nem ad vissza értéket.

## Props drilling

A `Galeria` továbbadja a `kivalaszt` függvényt a `KisKep` komponensnek, noha ő maga nem használja. Ezt **props drillingnek** nevezzük.

Kisebb alkalmazásban ez megfelelő megoldás. Context akkor lehet hasznos, ha sok köztes komponensen keresztül kellene ugyanazokat az adatokat továbbadni.

## Összefoglalás

- Az `App` kezeli a közös állapotot és a függvényeket.
- A `NagyKep` megjeleníti az aktuális képet.
- A `Galeria` létrehozza a kis képek listáját.
- A `KisKep` kezeli a kép kiválasztását.
- A propsok biztosítják az adatátadást, a `useState` pedig az állapot kezelését.

```text
App állapota
    ↓
Props továbbadása
    ↓
Gyermekkomponensek
    ↓
Esemény → állapotfrissítés
    ↓
Újrarenderelés
```

Egyszerűbb komponensfánál érdemes a propsalapú megoldást használni. Contextet akkor vezessünk be, ha a props drilling már nehezen követhető.
