import { useState, useEffect } from "react"
import { supabase } from "../../supabase/supabase"
export default function Noticias() {
    const [ noticas, setNoticias ] = useState([])

    async function puxarNoticias() {
        const [ data, error ] = await supabase
        .from("news")
        .select("*")
        .order("created_at", {ascending: true})

        if(error){
            return console.error(error)
        }

        setNoticias(data)
    }

    useEffect(() => {
        puxarNoticias()
    }, [])

    return(
        <>
            <div className="feed-noticias">
                {noticas ? noticas.map((item, index) => (
                    <div className="item-noticia" id={index}>
                        <div className="item-cabeca-noticia">
                            <p><span>News</span></p>
                            <p><span id="data-noticia">{item.created_at}</span></p>
                            <h1 className="titulo">{item.titulo}</h1>
                        </div>
                        <div className="item-corpo-noticia">
                            <p id="texto-noticia">{item.descricao}</p>
                        </div>
                    </div>
                )) : <span>sem noticas por hoje!</span>}
            </div>
        </>
    )
}