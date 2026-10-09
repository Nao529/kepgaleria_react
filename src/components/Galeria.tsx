import KisKep from "./KisKep";
import "./Galeria.css";
import { useKepContext } from "../contexts/KepgaleriaContext";

function Galeria() {
  const { lista, setI } = useKepContext()

  return (
    <div className="galeria">
      {lista.map((e,i)=>{
        return <KisKep
        kepem={e}
        index={i}
        kepkivalaszt={setI}
        key={e.id}
        />
            })}
    </div>
  );
}
export default Galeria;
