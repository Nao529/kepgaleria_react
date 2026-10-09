import "./App.css";
import Galeria from "./components/Galeria";
import NagyKep from "./components/NagyKep";

function App() {
  return (
    <>
      <header>
        <h1>Képgaléria</h1>
      </header>
      <article>
        <NagyKep  />
        <Galeria  />
      </article>
      <footer>
        <p>Nao</p>
      </footer>
    </>
  );
}
export default App;
