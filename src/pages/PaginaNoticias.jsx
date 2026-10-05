import { Navigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Noticias from "../layout/Noticias";
import useMediaQuery, { TELA_SEM_COLUNA_NOTICIAS } from "../components/hooks/useMediaQuery";
import "../styles/home.css"

/* ESSA É A PAGINA DE NOTICIAS (somente tablet e mobile, no desktop as noticias ficam na Home) */
export default function PaginaNoticias(){
    const telaPequena = useMediaQuery(TELA_SEM_COLUNA_NOTICIAS)

    // se a tela for grande, as noticias ja aparecem na Home, ent essa pagina n faz sentido
    if(!telaPequena){
        return <Navigate to="/home" replace />
    }

    return(
        <div className="tudo-comunidade">
            <Navbar />
            <div className="pagina-noticias">
                <Noticias />
            </div>
        </div>
    )
}