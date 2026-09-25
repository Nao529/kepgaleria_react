import type { KepTipus } from "../adatok";

interface KisKepProps {
  kepem: KepTipus;
    index: number;
    kepkivalaszt: (index: number) => void;
}
function KisKep({kepem, index, kepkivalaszt}:KisKepProps){
    return (
        <>
            <div className="kep" onClick={() => kepkivalaszt(index)}>
                <img src={kepem.kep} alt={kepem.kep} />
            </div>
        </>
    )
}

export default KisKep;