import type { KepTipus } from "../adatok";

interface NagyKepProps {
  kepem: KepTipus;
}
function NagyKep({ kepem }: NagyKepProps) {
  return (
    <div className="nagykep">
      <div className="kep">
        <img src={kepem.kep} alt={kepem.kep} />
      </div>
      <p>{kepem.leiras}</p>
    </div>
  );
}

export default NagyKep;
