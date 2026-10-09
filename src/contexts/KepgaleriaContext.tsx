import { createContext, useContext, useState, type ReactNode } from "react";
import { KEPLISTA, type KepTipus } from "../adatok";

export const KepContext = createContext<kepekContextValue | undefined>(undefined)

interface KepProviderProps {
    children: ReactNode
}

interface kepekContextValue {
    lista: KepTipus[],
    i: number,
    setI:(index:number)=>void,
    elozoKep:()=>void,
    kovetkezoKep:()=>void
}

export function KepProvider({children}:KepProviderProps){
    const [lista]=useState<KepTipus[]>(KEPLISTA)
    const [i, setI] = useState(0);

    const elozoKep=()=> {
        setI((i) => {
        if (i === 0) {
            return KEPLISTA.length - 1;
        }
        return i - 1;
        });
    }
    const kovetkezoKep=()=> {
        setI((i) => {
        if (i === KEPLISTA.length - 1) {
            return 0;
        }
        return i + 1;
        });
    }

    return(
        <KepContext.Provider value={{lista, i, setI, elozoKep, kovetkezoKep}}>
            {children}
        </KepContext.Provider>
    )
}

export function useKepContext(){
    const context=useContext(KepContext)
    if(context === undefined){
        throw new Error("Az app csak provideren belül használható")
    }
    return context
}
