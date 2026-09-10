import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import PerguntaDetalhada from "../components/PerguntaDetalhada";
import RespostasPergunta from "../components/RespostasPergunta";
import "../styles/perguntaClicada.css"
/* ESSA A PAGINA PARA QUANDO O USUARIO CLICAR EM UMA PEGUNTA DO AJUDA DRM
ELE VER MAIS DETALHES! */
export default function PerguntaClicada(){
    // na url, vai ser passado o id da pergunta, aq ele vai pegar esse id, para puxar a pergunta correta
    const { id } = useParams()
    const [pergunta, setPergunta] = useState([])
    // acima ele guarda as infos da pergunta
    const [respostas, setRespostas] = useState([])
    // suas respostas
    const [carregando, setCarregando] = useState(false)
    // e para ter controle do carregamento

    // aq ele vai puxar todos do dados, para serem exibidos
    async function carregarDados() {
        setCarregando(true)
        // aq ele puxa somente a pergunta
        const resPergunta = await supabase
        .from("posts")
        .select('*')
        .eq('id', id)
        .single()

        //aq ele puxa todas as respostas dessa pergunta
        const resRespostas = await supabase
        .from("post_respostas")
        .select('*')
        .eq("id_post", id)

        if(resPergunta.error) return console.error(resPergunta.error.message);
        if(resRespostas.error) return console.error(resRespostas.error.message);
        // se nao der error, ele atualiza os estados, com os novos dados
        setPergunta(resPergunta.data)
        setRespostas(resRespostas.data)
        setCarregando(false)
    }

    useEffect(() =>{
        carregarDados()
    }, []) // quando novas respostas sugirem, ele atualiza

    // aq ele joga os dados em seus devido componentes
    return(
        <div className="pergunta-tudo">
            <div className="pergunta">
                <PerguntaDetalhada user={pergunta.user} user_avatar={pergunta.avatar} descricao={pergunta.description} img={pergunta.imagens}/>
            </div>
            <div className="respostas">
                <RespostasPergunta respostas={respostas} funcaoDeAtualizar={carregarDados} id={id}/>
            </div>
        </div>
    )
}