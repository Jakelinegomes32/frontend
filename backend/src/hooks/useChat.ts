import { useState } from 'react'
import conjunto from '../assets/products/conjunto.png'
import vestido from '../assets/products/vestido.png'
import vestido_infantil from '../assets/products/vestidoo.png'

type Message = {
    text: string
    from: 'user' | 'bot'
    image?: string
    action?: 'whatsapp'
}

type Product = {
    name: string
    size: string
    colors: string[]
    image: string
}

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [mode, setMode] = useState<'idle' | 'catalog' | 'provador'>('idle')
    const [isTyping, setIsTyping] = useState(false)

    const catalog: Product[] = [
        {
            name: 'Conjunto Infantil Verão',
            size: 'P',
            colors: ['Verde', 'Oliva'],
            image: conjunto
        },
        {
            name: 'Vestido Floral Kids',
            size: 'M',
            colors: ['Azul', 'Creme'],
            image: vestido
        },
        {
            name: 'Vestido Infantil',
            size: 'G',
            colors: ['Off-white', 'Rosa médio'],
            image: vestido_infantil
        }
    ]

    const sendMessage = (text: string) => {
        if (!text.trim()) return

        setMessages((prev) => [...prev, { text, from: 'user' }])
        setIsTyping(true)

        setTimeout(() => {
            generateResponse(text.toLowerCase())
            setIsTyping(false)
        }, 800)
    }

    const addBotMessage = (text: string, image?: string, action?: 'whatsapp') => {
        setMessages((prev) => [...prev, { text, from: 'bot', image, action }])
    }

    const mostrarCatalogo = () => {
        addBotMessage('Claro, aqui estão algumas opções:')
        catalog.forEach((produto) => {
            addBotMessage(
                `${produto.name}\nCores: ${produto.colors.join(', ')}`,
                produto.image
            )
        })
    }

    const provadorVirtual = (peso?: number) => {
        if (!peso) return 'P'
        if (peso > 25) return 'G'
        if (peso > 15) return 'M'
        return 'P'
    }

    const recomendarProduto = (size: string): Product => {
        return catalog.find((p) => p.size === size) || catalog[0]
    }

    const saudacao = () => {
        const hora = new Date().getHours()
        if (hora < 12) return 'Bom dia!☀️ Em que posso te ajudar?'
        if (hora < 18) return 'Boa tarde!🌤️ Em que posso te ajudar?'
        return 'Boa noite!🌙 Em que posso te ajudar?'
    }

    const generateResponse = (text: string) => {

        if (text.includes('oi') || text.includes('olá') || text.includes('boa')) {
            addBotMessage(saudacao())
            return
        }

        if (
            text.includes('roupa') ||
            text.includes('modelo') ||
            text.includes('ver')
        ) {
            setMode('catalog')
            mostrarCatalogo()
            addBotMessage('Posso te ajudar com o tamanho ideal.')
            return
        }

        if (
            text === 'sim' ||
            text === 'pode' ||
            text === 'quero' ||
            text.includes('sim') ||
            text.includes('quero')
        ) {
            if (mode === 'catalog') {
                setMode('provador')
                addBotMessage('Me fale a idade e peso da criança. Ex: 3 e 18')
                return
            }
        }

        if (text.includes('tamanho')) {
            setMode('provador')
            addBotMessage('Me fale a idade e peso. Ex: 3 e 18')
            return
        }

        if (mode === 'provador') {
            const numbers = text.match(/\d+/g)

            if (numbers && numbers.length >= 2) {
                const peso = Number(numbers[1])

                const tamanho = provadorVirtual(peso)
                const produto = recomendarProduto(tamanho)

                addBotMessage(
                    `Tamanho: ${tamanho}

${produto.name}
Cores: ${produto.colors.join(', ')}

Ir para WhatsApp:`,
                    produto.image,
                    'whatsapp'
                )
                return
            }

            addBotMessage('Informe no formato: 3 e 18')
            return
        }

        if (text.includes('comprar') || text.includes('whatsapp')) {
            addBotMessage(
                'Vou te encaminhar para o WhatsApp.',
                undefined,
                'whatsapp'
            )
            return
        }

        addBotMessage('Posso te mostrar roupas ou ajudar com tamanho.')
    }
    return { messages, sendMessage, isTyping }
}