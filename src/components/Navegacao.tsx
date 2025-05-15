import { motion } from "framer-motion"
import { Action } from "../App";


interface action {
    action: Action,
    setAction: (item: Action) => void
    next: boolean;
    onComplete: ()=> void
}


const Navegacao: React.FC<action>= ({  action, next, onComplete }) => {


    return(
        <div className={`flex space-x-4 z-40 absolute bottom-4 left-0  w-full  px-4 md:px-20 
            ${next && action.isBack && 'justify-between'}
            ${next && !action.isBack && 'justify-end'}
            ${!next && action.isBack && 'justify-start'}
            `}>


                    {action.isBack && (
                        <motion.button
                            className="back-button bg-transparent border-2 border-[#C21807] text-[#C21807] px-6 py-2 rounded-full"
                            onClick={action.onBack}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Voltar
                        </motion.button>
                    )}

                    {next && (
                        <motion.button
                            className="next-button bg-gradient-to-r from-[#C21807] to-[#FF637E] text-white px-6 py-2 rounded-full"
                            onClick={onComplete}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continuar
                        </motion.button>
                    )}

            
      </div>
    )
}

export default Navegacao;