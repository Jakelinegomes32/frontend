type Props = {
    text: string
    from: 'user' | 'bot'
    image?: string
    action?: 'whatsapp'
}

const Message = ({ text, from, image, action }: Props) => {
    const openWhatsApp = () => {
        window.open(
            "https://wa.me/5599999999999?text=Olá%20quero%20atendimento",
            "_blank"
        )
    }

    return (
        <div className={`message ${from}`}>
            {image && <img src={image} alt="produto" className="product-img" />}

            <div>{text}</div>

            {action === 'whatsapp' && (
                <button onClick={openWhatsApp}>
                    Ir para WhatsApp
                </button>
            )}
        </div>
    )
}

export default Message