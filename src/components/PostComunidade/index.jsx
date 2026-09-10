import Descricao from "./elements/Descricao";
import Titulo from "./elements/Titulo";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function PostComunidade({ user, titulo, conteudo, imgs, avatar }){
    return(
        <div className="content-post">
            <div className="cabeca-post">
                {avatar == null ? <span>{user}</span> : <span><img src={avatar} style={{width: "30px", borderRadius:"360px"}}/> {user}</span>} <br />
            </div>
            <div className="corpo-post">
                <Descricao conteudo={conteudo} />
                {imgs == null ? <span></span> : <Zoom ><img src={imgs} /></Zoom>} 
            </div>
        </div>
    )
}