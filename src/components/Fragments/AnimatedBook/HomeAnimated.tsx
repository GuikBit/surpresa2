import React, { FC } from 'react';
// Ajuste o caminho se AnimatedBook e suas types estiverem em locais diferentes ou se você usar um types.ts separado
import AnimatedBook, { PageData } from './AnimatedBook'; // Se PageData for exportada de AnimatedBook.tsx
// import AnimatedBook from './AnimatedBook';
// import type { PageData } from './types'; // Se PageData estiver em types.ts
import './AnimatedBook.css'; // Seu CSS global, se houver

const HomeAnimated: FC<{ setNext:(item: boolean)=>void, onComplete: ()=> void}> = ({ setNext, onComplete }) => {
  // Tipando o array de páginas
  const bookPages: PageData[] = [
    {
      title: "Nossa História Começa",
      content: "Era uma vez, em uma terra de códigos e sonhos, uma jornada que se iniciava. Cada linha de código era um passo, cada função, uma nova aventura.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlicmFyeXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Momentos de Descoberta",
      content: "Exploramos novas tecnologias, desvendamos mistérios complexos e celebramos cada pequena vitória. A curiosidade era nossa bússola.",
      image: "https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29taWMlMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Desafios e Superações",
      content: "Nem tudo foram flores. Enfrentamos bugs teimosos e noites em claro, mas a perseverança nos tornou mais fortes e resilientes.",
      // Sem imagem para esta página
    },
    {
      title: "O Futuro nos Aguarda",
      content: "Com as lições aprendidas e a paixão renovada, olhamos para o horizonte, prontos para os próximos capítulos desta incrível saga.",
      image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9wZW4lMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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