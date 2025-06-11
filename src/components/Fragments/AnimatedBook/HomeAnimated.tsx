import { FC } from 'react';
import AnimatedBook, { PageData } from './AnimatedBook';
import './AnimatedBook.css';

// import foto from '../../../assets/foto03.jpg'
import foto1 from '../../../assets/foto04.jpg'

const HomeAnimated: FC<{ setNext:(item: boolean)=>void, onComplete: ()=> void}> = ({ setNext, onComplete }) => {
  // Tipando o array de páginas
  const bookPages: PageData[] = [
    {
      title: "Onde Tudo Começou",
      content: ["Muito antes do nosso primeiro 'oi', ou até mesmo do nosso primeiro olhar, o destino já entrelaçava as nossas vidas de um jeito silencioso e mágico.", "Naquele Natal, em meio ao brilho das luzes e à agitação do shopping, éramos apenas duas crianças em mundos separados, unidas por um desejo em comum: um retrato com o Papai Noel. Mal sabíamos nós que, naquele instante congelado no tempo, a vida nos apresentava pela primeira vez. Hoje, olhando para essa foto, eu tenho a certeza de que o universo não trabalha com acasos. ", "Aquele encontro inocente não foi sorte; foi a primeira promessa do nosso amor, a primeira página da história que um dia seria a nossa."],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlicmFyeXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "A Descoberta um do Outro",
      content: ["E então, como se atendesse àquela promessa silenciosa feita no Natal da nossa infância, o destino nos colocou frente a frente outra vez. Na mesma sala de aula, ainda sem fazer ideia do nosso primeiro encontro, começamos a construir algo nosso",
        "Aquela amizade foi o meu porto seguro. Nossas conversas pareciam capazes de consertar o mundo: dos trabalhos de escola às decepções da vida, dos sonhos mais altos aos medos mais secretos. A cada dia, eu descobria um universo inteiro em você.",
        "Quando o ensino médio acabou, muitas histórias chegaram ao fim, mas a nossa apenas provou sua força. Mesmo com a distância da vida adulta, fizemos questão de ser a presença constante um do outro, a nossa maneira sempre presentes, principalmente nos momentos em que o mundo pesava mais sobre você. Eu estive ali. E estar ao seu lado naquele momento nunca foi um esforço, foi escolha, e uma das mais sinceras da minha vida.",
       
        "A vida só pode ser compreendida olhando-se para trás, mas deve ser vivida olhando-se para frente. A angústia é o descompasso entre o que sentimos e o que Deus já sabe. —  inspirado em Kierkegaard"
      ],
      //image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29taWMlMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "O Ponto de Virada",
      content: ["A vida nos testou com seus próprios planos e outros relacionamentos, mas o nosso laço, aquele construído em anos de amizade, se recusava a ser apenas isso. Foi em uma virada de ano que a semente da dúvida foi plantada na minha cabeça com uma pergunta perigosa e insistente: 'E se...?'",
        "Essa pergunta ecoou em silêncio por um tempo, até o dia em que o destino me deu o empurrão que faltava. Bastou uma foto, um instante em que eu deveria estar pensando em outra pessoa, para o seu rosto invadir a minha mente. Naquele momento, a verdade veio com a força de uma revelação: eu estava tentando esconder de mim mesmo o sentimento mais óbvio e bonito que já havia sentido. Todo o carinho da nossa amizade estava se transformando em algo mais.",
        "E o sentimento, quando é real, não pede licença. Ele cresce, transborda e exige uma atitude. Eu soube, então, que não podia mais esperar. Naquela quarta-feira, o meu coração batia com uma urgência que eu nunca tinha sentido. Enviar aquela mensagem não era uma opção, era uma necessidade. Era o momento de arriscar tudo, ou perder a chance de construir a história que, no fundo, a gente já tinha começado a escrever."
      ],
      // Sem imagem para esta página
    },
    {
      title: "O primeiro beijo",
      content: ["Depois daquela mensagem de quarta-feira, o tempo se arrastou. Aqueles três dias de espera foram uma eternidade, carregados com a ansiedade e a esperança de quem arriscou tudo em uma única pergunta. Quando finalmente te vi, por um segundo, o medo quase me paralisou. O receio de quebrar a amizade sagrada que tínhamos era imenso.",
        "Mas então, as palavras saíram, o coração se abriu, e nossos lábios se encontraram. Foi um beijo tímido, cuidadoso. Não tinha a urgência da paixão, mas o peso de uma história inteira. Era um beijo que pedia licença, que honrava cada um dos sete anos de conversas, de segredos e de lealdade. Naquele instante, o respeito da nossa amizade se transformou na base do nosso amor.",
        "E com ele, veio a primeira noite juntos. Sim, era estranho beijar a minha melhor amiga, a minha confidente. Mas, ao mesmo tempo, era a sensação mais certa e natural do mundo. Ali, no silêncio, sabíamos que não era apenas um novo passo. Era a nossa alma reconhecendo o seu lar. Era o amor, depois de tanto tempo, finalmente se concretizando."
      ],
      //image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9wZW4lMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Os primeiros",
      content: ["Todo amor tem seus marcos — pequenos instantes que a gente nunca esquece. Com a gente, foi assim. Cada “primeira vez” foi como abrir uma nova janela do coração, com o vento trazendo o cheiro de algo eterno.",
        "Teve o nosso primeiro beijo — Tímido, respeitoso, mas cheio de verdades guardadas por anos.",
        "Teve a nossa primeira noite juntos — Dormir ao teu lado foi mais do que um gesto, foi uma certeza",
        "A primeira vez em que nos entregamos por completo - Não foi apenas um corpo tocando o outro, foi alma, foi conexão, foi o amor, enfim, encontrando seu caminho com calma e cuidado, depois de anos caminhando ao nosso redor.",
        "Teve o primeiro “Bom dia”. - Um otimo dia de ter acordado ao seu lado pela primeira vez, e poder dizer 'Bom dia!'",
        "Teve o primeiro “Eu te amo” - talvez nem existam palavras suficientes para descrever, mas que eu posso resumir assim: foi o primeiro “eu te amo” que tinha gosto de verdade. Um amor inteiro. Um amor que nasceu para ser vivido com você.",
        
      ],
      //image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9wZW4lMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Para o Meu Amor: Hoje e Sempre",
      content: [
        "Estamos apenas no começo da nossa infinita história. Relembrar cada passo, daquela foto de infância predestinada, aos anos de uma amizade que se tornou nosso alicerce, até o beijo que selou nosso destino, me enche de orgulho.",
        "Estes quase três anos de namoro nos mostraram que o amor se fortalece não só nos dias de sol, mas nas tempestades que enfrentamos de mãos dadas. E hoje, 12 de junho de 2025, eu olho para você com o coração transbordando de gratidão e quero renovar a minha promessa. A promessa de te amar, cuidar e honrar todos os dias.",
        "Porque amar você é...",
        "...olhar para trás e ver que cada acaso era, na verdade, o destino nos guiando um para o outro.",
        "...saber que o meu porto seguro e a minha maior aventura moram na mesma pessoa: a minha melhor amiga.",
        "...lembrar da coragem que tivemos e ter a certeza de que valeu a pena cada segundo de incerteza.",
        "...sentir, em cada beijo de hoje, o mesmo respeito e a mesma magia daquele primeiro.",
        
        
      ],
      //image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9wZW4lMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "",
      content: [
        "...cuidar do seu coração como a parte mais preciosa do meu.",
        "Este livro conta como tudo começou. Mas o nosso futuro é uma infinidade de páginas em branco que eu mal posso esperar para preencher ao seu lado.",
        "Eu te amo mais do que as palavras deste ou de qualquer outro livro poderiam descrever. Hoje e para sempre. Amar você é uma das certezas mais bonitas que eu já tive na vida.",
        "E se eu pudesse voltar no tempo, faria tudo de novo — exatamente como foi, porque foi assim que a nossa história nasceu, cresceu e floresceu.",
        "Te amo. Hoje. E todos os dias que ainda virão. Eu te amo mil milhoes, meu amor!"
        
        
      ],
      image: foto1,
      ultimo: true,

    }
  ];

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center py-10">
      {/* <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700">Meu Livro Animado Interativo</h1>
      </header> */}
      <AnimatedBook
        pages={bookPages}
        setNext={setNext}
        onComplete={onComplete}
        coverTitle="A Saga do Código"
        // Você pode personalizar as imagens da capa e da textura do papel aqui também:
         //coverImage="URL_DA_SUA_IMAGEM_DE_CAPA"
         //paperTextureImage="URL_DA_SUA_TEXTURA_DE_PAPEL"
         envelopeImage="https://assets.codepen.io/4927073/Envelope3.png"
      />
      {/* <footer className="mt-10 text-center text-gray-500">
        <p>Passe o mouse sobre o livro e clique nas páginas para interagir.</p>
      </footer> */}
    </div>
  );
}

export default HomeAnimated;