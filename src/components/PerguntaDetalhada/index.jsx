import "./style.css"

export default function PerguntaDetalhada({ user, user_avatar, descricao, img}){
    return(
        <div className="post-card-detalhado">
            <div className="usuario-info">
                <img src={user_avatar} />
                <p><span>{user}</span></p>
                </div>
            <div className="post-info">
                <p><span>{descricao}</span></p>
                { img ? (
                    <img src={img} alt="" />
                ) : ( <span></span> ) }
            </div>
        </div>
    )
}