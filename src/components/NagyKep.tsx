import type { KepTipus } from "../adatok";

interface NagyKepProps {
  kepem: KepTipus;
  elozoKep: () => void;
  kovetkezoKep: () => void;
}
function NagyKep({ kepem, elozoKep, kovetkezoKep }: NagyKepProps) {
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
