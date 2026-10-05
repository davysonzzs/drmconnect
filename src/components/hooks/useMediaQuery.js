import { useState, useEffect } from "react";

// ponto de corte onde a coluna de noticias some da Home e vira a aba "Noticias" na navbar
// IMPORTANTE: tem que ser o mesmo valor do @media do home.css e do navbar.css (1024px)
export const TELA_SEM_COLUNA_NOTICIAS = "(max-width: 1024px)"

// retorna true quando a tela bate com a media query, e atualiza sozinho quando redimensiona ou gira o celular
export default function useMediaQuery(query){
    // ja começa com o valor certo (evita piscar a coluna de noticias na primeira renderização)
    const [ combina, setCombina ] = useState(() => window.matchMedia(query).matches)

    useEffect(() => {
        const lista = window.matchMedia(query)
        const atualizar = () => setCombina(lista.matches)
        atualizar()
        lista.addEventListener("change", atualizar)
        return () => lista.removeEventListener("change", atualizar)
    }, [query])

    return combina
}
