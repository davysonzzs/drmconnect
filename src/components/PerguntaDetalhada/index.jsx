import AcoesPost from "../AcoesPost"
import { useState } from "react"

export default function PerguntaDetalhada({ user, user_avatar, descricao, img, titulo, curtidas, idp, modalReport, fdp, create }){
    const [ texto, setTexto ] = useState(create)
    const data = texto?.slice(0,10)
    const hora = texto?.slice(11, 16)

    return(
        <div className="post-detalhado">
            {/* HEADER - User Info */}
            <div className="post-header">
                <img src={user_avatar} alt={user} className="avatar" />
                <div className="user-info">
                    <span className="username">{user}</span>
                    <span className="time">{data} as {hora}</span>
                </div>
            </div>

            {/* TÍTULO (se houver) */}
            {titulo && (
                <h1 className="post-titulo">{titulo}</h1>
            )}

            {/* CONTEÚDO */}
            <div className="post-conteudo">
                <p className="post-descricao">{descricao}</p>
                
                {/* IMAGEM (se houver) */}
                {img && (
                    <img src={img} alt="Post" className="post-image" />
                )}
            </div>

            {/* AÇÕES */}
            <AcoesPost idP={idp} quantidadeDeCurtidas={curtidas} modalReport={modalReport} funcaoDeEnviarId={fdp}/>
        </div>
    )
}