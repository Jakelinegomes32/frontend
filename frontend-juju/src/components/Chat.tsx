import { useChat } from '../hooks/useChat'
import Message from './Message'
import Input from './Input'

const Chat = () => {
    const { messages, sendMessage, isTyping } = useChat()

    return (
        <div className="container">
            <div className="phone">
                <div className="screen">
                    <div className="header">Juju 🤖</div>

                    <div className="messages">
                        {messages.map((msg, i) => (
                            <Message
                                key={i}
                                text={msg.text}
                                from={msg.from}
                                image={msg.image}
                                action={msg.action}
                            />
                        ))}

                        {isTyping && (
                            <div className="message bot typing">
                                <div className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Input onSend={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat