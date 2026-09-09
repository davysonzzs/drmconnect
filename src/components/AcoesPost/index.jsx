import { useState, useEffect } from "react"
import { supabase } from "../../supabase/supabase";
import { Heart, Flag } from 'lucide-react';
import "./style.css"

export default function AcoesPost({ idP, quantidadeDeCurtidas, modalReport, funcaoDeEnviarId}) {
    const [qntCurti, setQntCurti] = useState(quantidadeDeCurtidas)
    const [curtida, setCurtida] = useState(false)

    async function curtidas() {
        const operacao = curtida ? 'decrementar' : 'incrementar'
        
        const novaQtd = curtida ? qntCurti - 1 : qntCurti + 1
        setQntCurti(novaQtd)
        setCurtida(!curtida)

        const { error } = await supabase.rpc('gerenciar_curtida', {
            operacao,
            p_id: idP
        })

        if (error) {
            setQntCurti(qntCurti)
            setCurtida(curtida)
            console.error(error.message)
            return
        }


        if (!curtida) {
            localStorage.setItem(`curtida_${idP}`, 'true')
        } else {
            localStorage.removeItem(`curtida_${idP}`)
        }
    }
    
    useEffect(() => {
        setCurtida(!!localStorage.getItem(`curtida_${idP}`))
        setQntCurti(quantidadeDeCurtidas)
    }, [idP, quantidadeDeCurtidas])

    return(
        <div className="acoes">
            <button onClick={() => curtidas()} className="btn-curtida">
                    <Heart color={curtida ? "red" : "gray"} fill={curtida ? "red" : "none"} /> 
                    <span>{qntCurti}</span>
            </button>
            <button className="btn-report" onClick={() => (modalReport(true), funcaoDeEnviarId(idP))}>
                <Flag />
            </button>
        </div>
    )
}