import { useState } from 'react'

type Props = {
    onSend: (message: string) => void
}

const Input = ({ onSend }: Props) => {
    const [text, setText] = useState('')

    function handleSend() {
        if (text === '') return

        onSend(text)
        setText('')
    }

    return (
        <div className="input">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite uma mensagem..."
            />

            <button onClick={handleSend}>
                Enviar
            </button>
        </div>
    )
}

export default Input