import { useKepContext } from "../contexts/KepgaleriaContext";

function NagyKep() {
  const { lista, i, elozoKep, kovetkezoKep } = useKepContext()
  const kepem = lista[i]

  return (
    <div className="nagy-kep-sor">
    <button className="nyil" onClick={elozoKep}>&#10094;</button>
    <div className="nagykep">
      <div className="kep">
        <img src={kepem.kep} alt={kepem.kep} />
      </div>
      <p>{kepem.leiras}</p>
    </div>
    <button className="nyil" onClick={kovetkezoKep}>&#10095;</button>
    </div>
  );
}
export default NagyKep;
