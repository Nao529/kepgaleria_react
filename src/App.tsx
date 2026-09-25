import { KEPLISTA } from "./adatok";
import "./App.css";
import Galeria from "./components/Galeria";
import NagyKep from "./components/NagyKep";

function App() {

  function kepKivalaszt(index: number) {
    console.log(index);
  }

  return (
    <>
      <header>
        <h1>Képgaléria</h1>
      </header>
      <article>
        <div className="nagy-kep-sor">
          <button className="nyil">&#10094;</button>
          <NagyKep kepem={KEPLISTA[0]}/>
          <button className="nyil">&#10095;</button>
        </div>
        <Galeria lista={KEPLISTA} kepkivalaszt={kepKivalaszt}/>
      </article>
      <footer><p>Nao</p></footer>
    </>
  );
}

export default App;
