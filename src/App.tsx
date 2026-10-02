import { useState } from "react";
import { KEPLISTA } from "./adatok";
import "./App.css";
import Galeria from "./components/Galeria";
import NagyKep from "./components/NagyKep";

function App() {
  const [i, setI] = useState(0);
  function kepKivalaszt(index: number) {
    console.log(index); /* tudjuk hányadik képre kattintottunk,
    tudjuk, hogy melyik képet kellene a nagyképbe betölteni
    módosítjuk az index értékét
    */
    /* ez tilos i++ */
    /* ez is tilos setI(12) */
    /* ezt lehet setI(i++) azért nem lehet i=i+1*/
    /* ezt lehet setI(i+1)*/
    /* jobbra, balra lépegető beépítése */
    setI(index);
  }

  function elozoKep() {
    setI((aktualis) => {
      if (aktualis === 0) {
        return KEPLISTA.length - 1;
      }
      return aktualis - 1;
    });
  }
  function kovetkezoKep() {
    setI((aktualis) => {
      if (aktualis === KEPLISTA.length - 1) {
        return 0;
      }
      return aktualis + 1;
    });
  }

  

  return (
    <>
      <header>
        <h1>Képgaléria</h1>
      </header>
      <article>
        <NagyKep kepem={KEPLISTA[i]} elozoKep={elozoKep} kovetkezoKep={kovetkezoKep} />
        <Galeria lista={KEPLISTA} kepkivalaszt={kepKivalaszt} />
      </article>
      <footer>
        <p>Nao</p>
      </footer>
    </>
  );
}

export default App;
