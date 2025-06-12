import { useState, useEffect, useCallback, FC } from 'react';
import './AnimatedBook.css'; // Seu CSS personalizado
import { MousePointerClick } from 'lucide-react';

// Interfaces (mantenha como antes ou importe de um arquivo types.ts)
export interface PageData {
  title: string;
  content: any[];
  image?: string;
  ultimo?: boolean;
}

export interface AnimatedBookProps {
  pages?: PageData[];
  coverTitle?: string;
  coverImage?: string;
  paperTextureImage?: string;
  envelopeImage?: string;
  setNext: (item:boolean)=>void;
  onComplete: ()=> void;
}

const AnimatedBook: FC<AnimatedBookProps> = ({
  pages = [],
  setNext,
  // onComplete,
  coverTitle = "Nossa História",
  coverImage = "https://clubemoms.com.br/wp-content/uploads/2021/09/Post_EscapadaRomantica_09042018_2236-1024x463-1.jpg",
  paperTextureImage = "https://media.istockphoto.com/id/1409340439/pt/foto/white-recycled-paper-texture.jpg?s=612x612&w=0&k=20&c=ykqV6Ersd3how5Jpvuz5X6zTJGp1RQEj3XPTm1tZaoc=",
  envelopeImage = "https://assets.codepen.io/4927073/Group2.png"
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [openPageIndex, setOpenPageIndex] = useState<number>(-1);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const totalPages: number = pages.length;

  useEffect(()=>{
    setNext(false);
  },[])

  const handleMouseEnter = useCallback(() => {
    if (!isClosing) {
      setIsHovered(true);
      if (openPageIndex === -1) { // Se o livro estiver fechado
        setOpenPageIndex(1); // MUDANÇA: Hover abre a capa completamente para o estado 1
      }
    }
  }, [isClosing, openPageIndex]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (openPageIndex > 0 && !isClosing) { // Se a capa ou páginas estiverem abertas
      setIsClosing(true); // Inicia a sequência de fechamento
    }
    // Se openPageIndex === 0 (estado intermediário de fechamento) e o mouse sair,
    // o useEffect, com a ajuda de isHovered, cuidará da transição final para -1.
  }, [openPageIndex, isClosing]);

  const handlePageOrCoverClick = useCallback((itemIndex: number) => {
    if (isClosing) return; // Não permite virar páginas durante a animação de fechamento

    if (itemIndex === -1) {
      // Clique na Capa:
      // Com a nova lógica, o hover já leva openPageIndex para 1 (capa aberta).
      // Clicar na capa quando ela já está aberta (openPageIndex >= 1) não tem ação adicional.
      // A ação de abrir a capa levemente e depois totalmente por clique foi removida.
      return;
    } else { // Clique numa Página (itemIndex é o índice da página no array `pages`)
      if (openPageIndex === itemIndex + 1 && itemIndex < totalPages - 1) {
        setOpenPageIndex(prev => prev + 1); // Vira esta página, revela a próxima
      }else{
        setNext(true)
        // onComplete()
      }
    }
  }, [isClosing, openPageIndex, totalPages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClosing) {
      if (openPageIndex > 0) { // Se ainda há páginas/capa para fechar (até o estado de capa "quase fechada")
        timer = setTimeout(() => {
          setOpenPageIndex(prev => prev - 1); // Fecha uma página/capa por vez
        }, 350); // Duração da animação para uma página fechar
      } else { // Chegou em openPageIndex = 0 (capa na posição "quase fechada" durante o fechamento)
        setIsClosing(false); // Finaliza o estado de fechamento em sequência
        // Se o mouse ainda estiver fora e o livro chegou ao estado de capa "quase fechada", fecha completamente.
        if (!isHovered && openPageIndex === 0) {
            setOpenPageIndex(-1); // Fecha totalmente a capa
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isClosing, openPageIndex, isHovered]); // isHovered é crucial para a etapa final do fechamento


  // Calcula a transformação da capa dinamicamente
  let coverTransform: string = 'rotateY(0deg)'; // Padrão: fechada
  if (openPageIndex >= 1) { // Capa está totalmente virada (estado 1 ou maior)
    coverTransform = 'rotateY(-170deg)';
  } else if (openPageIndex === 0) { // Capa no estado intermediário de fechamento ("quase fechada")
    coverTransform = 'rotateY(-25deg)';
  }
  // Se openPageIndex === -1, coverTransform permanece 'rotateY(0deg)' (totalmente fechada)

  return (
    <div className="book-scene-wrapper flex justify-center items-center p-4 md:p-8 relative w-full  min-h-[450px] sm:min-h-[500px] md:min-h-[600px]">
        {envelopeImage && (
          <img
            src={envelopeImage}
            alt="Decoração de envelope"
            className="envelope-decoration  absolute z-0 w-full h-full object-contain pointer-events-none"
          />
        )}
      <div
        className="book-scene relative w-[320px] h-[490px] md:w-[430px] md:h-[630px] perspective "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="book relative  w-full h-full transform-style-preserve-3d transition-transform duration-500 ease-in-out"
        >
          {/* Capa */}
          <div
            className={`page absolute w-full h-full transform-origin-left transition-transform ease-in-out duration-700 cursor-pointer shadow-lg bg-cover bg-center ${isHovered?'':'bg-black delay-300'}`}
            style={{
              backgroundImage: `url(${coverImage})`,
              zIndex: totalPages + 1,
              transform: coverTransform,
            }}
            onClick={() => handlePageOrCoverClick(-1)} // Clicar na capa aberta não faz nada novo
          >
            
            <div className="page-content flex flex-col items-center justify-center h-full p-4 bg-opacity-40">
              <h1 className="text-xl sm:text-2xl font-bold text-white text-center">{coverTitle}</h1>
            </div>
          
            
          </div>

          {/* Páginas internas */}
          {pages.map((page: PageData, index: number) => {
            let pageTransform: string = 'rotateY(0deg)';

            if (openPageIndex > index + 1) {
              // Esta página (index) já foi virada e faz parte da pilha à esquerda
              pageTransform = `rotateY(-${170 - index - 1}deg)`;
            } else if (openPageIndex === index + 1) {
              // Esta página (index) é a página atual, plana e visível para leitura
              // Ex: Se openPageIndex é 1, pages[0] (index 0) está em 0deg.
              pageTransform = 'rotateY(0deg)';
            } else if (openPageIndex === 0 && index === 0) {
              // Capa está "quase fechada" (openPageIndex=0, capa a -25deg),
              // a primeira página (index=0) está abaixo dela, plana (0deg), prestes a ser coberta.
              pageTransform = 'rotateY(0deg)';
            }
            // Outras páginas (index > 0 quando openPageIndex = 0, ou todas quando openPageIndex = -1)
            // permanecem em rotateY(0deg) e são cobertas pelo z-index mais alto da capa ou páginas acima.

            return (
              <div
                key={index}
                className="page group border border-neutral-800/30 bg-amber-50 absolute w-full h-full transform-origin-left transition-transform duration-700 ease-in-out cursor-pointer shadow-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${paperTextureImage})`,
                  zIndex: totalPages - index,
                  transform: pageTransform,
                }}
                onClick={() => handlePageOrCoverClick(index)}
              >
                <div className="page-content-inner absolute inset-0 p-3 sm:p-4 md:p-5 overflow-y-auto">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 DosisPageTitle">{page.title}</h2>
                  {page.content.map((text: any, idx: number) => (
                    <p key={idx} className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 leading-relaxed">{text}</p>
                  ))}
                  
                  
                  {page.image && (
                    <img
                        src={page.image}
                        alt={page.title || 'Ilustração da página'}
                        
                        className={page.ultimo ?"w-full h-auto max-h-24 sm:max-h-32 md:max-h-55 object-contain my-1 sm:my-2":"w-full h-auto max-h-24 sm:max-h-32 md:max-h-40 object-contain my-1 sm:my-2 "}
                    />
                  )}
                </div>
                <div className='relative '>
                  <div className='absolute -bottom-120 md:-bottom-155 gap-2 right-1 md:right-3 flex items-center justify-center text-black group-hover:text-neutral-500'>
                    <div className='flex justify-center items-center gap-3 mr-15 md:mr-25'>
                      <span className='text-xs'>Click para continuar</span>
                      <MousePointerClick size={20} className="" />
                    </div>                    
                    <span className='text-black'>{index + 1}</span>                   
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBook;