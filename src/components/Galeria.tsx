import type { KepTipus } from "../adatok";
import KisKep from "./KisKep";
import "./Galeria.css";

interface GaleriaProps {
  lista: KepTipus[];
  kepkivalaszt: (index: number) => void;
}
function Galeria({ lista, kepkivalaszt }: GaleriaProps) {
  return (
    <div className="galeria">
      {
        lista.map((e,i)=>{
                return <KisKep kepem={e} index={i} kepkivalaszt={kepkivalaszt} key={e.id}/>
            })
      }
    </div>
  );
}

export default Galeria;
