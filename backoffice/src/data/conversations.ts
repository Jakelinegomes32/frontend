import type { Conversation, Message } from '../types'


function msg(
  id: string,
  sender: 'user' | 'bot',
  text: string,
  time: string,
  extra?: Partial<Message>
): Message {
  return {
    id,
    sender,
    text,
    time,
    ...extra,
  }
}

function conv(data: Conversation): Conversation {
  return data
}


export const CONVERSATIONS: Conversation[] = [
  conv({
    id: '1',
    name: 'Mariana Souza',
    initials: 'MS',
    avatarColor: '#7c6cf7',
    preview: 'Gostaria de saber mais sobre...',
    time: '10:22',
    unread: 2,
    status: 'open',
    channel: 'WhatsApp',
    agent: 'IA Juju',
    email: 'mariana.souza@email.com',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP, Brasil',
    tags: ['Interessado', 'Planos'],
    startedAt: 'Hoje às 10:22',
    messages: [
      msg('m1', 'user', 'Olá! Gostaria de saber mais sobre os planos disponíveis.', '10:22', { read: true }),

      msg('m2', 'bot', 'Olá, Mariana! 👋\nClaro, posso te ajudar com isso.\nTemos 3 planos disponíveis:', '10:22', {
        plans: [
          { icon: '⚡', name: 'Básico — R$49/mês', desc: 'Ideal para quem está começando' },
          { icon: '🚀', name: 'Profissional — R$99/mês', desc: 'Mais recursos e integrações' },
          { icon: '🏢', name: 'Empresarial — R$199/mês', desc: 'Para grandes equipes e customizações' },
        ],
      }),

      msg('m3', 'user', 'Qual a diferença entre o básico e o profissional?', '10:23', { read: true }),

      msg('m4', 'bot', 'O plano Profissional inclui todos os recursos do Básico, além de:', '10:23', {
        bullets: [
          'Relatórios avançados',
          'Integrações ilimitadas',
          'Suporte prioritário',
          'Usuários ilimitados',
        ],
      }),

      msg('m5', 'user', 'Entendi! E posso fazer upgrade depois?', '10:24', { read: true }),

      msg('m6', 'bot', 'Sim! Você pode fazer upgrade a qualquer momento...', '10:25', {
        products: [
          { emoji: '👜', name: 'Bolsa Casual Clássica', price: 'R$ 149,90' },
          { emoji: '👟', name: 'Tênis Urban Style', price: 'R$ 199,90' },
          { emoji: '⌚', name: 'Relógio Minimalista', price: 'R$ 249,90' },
        ],
      }),
    ],
  }),

  conv({
    id: '2',
    name: 'João Silva',
    initials: 'JS',
    avatarColor: '#3b82f6',
    preview: 'Pode me ajudar com um problema...',
    time: '10:15',
    unread: 1,
    status: 'open',
    channel: 'Chat',
    agent: 'IA Juju',
    email: 'joao.silva@email.com',
    phone: '(21) 91234-5678',
    location: 'Rio de Janeiro, RJ, Brasil',
    tags: ['Suporte'],
    startedAt: 'Hoje às 10:15',
    messages: [
      msg('m1', 'user', 'Pode me ajudar com um problema no meu pedido?', '10:15', { read: false }),
      msg('m2', 'bot', 'Claro, João! Me fale o número do pedido.', '10:16'),
    ],
  }),

  conv({
    id: '3',
    name: 'Fernanda Lima',
    initials: 'FL',
    avatarColor: '#ec4899',
    preview: 'Qual o prazo para entrega?',
    time: '09:58',
    unread: 3,
    status: 'open',
    channel: 'WhatsApp',
    agent: 'IA Juju',
    email: 'fernanda.lima@email.com',
    phone: '(31) 99876-5432',
    location: 'Belo Horizonte, MG, Brasil',
    tags: ['Entrega'],
    startedAt: 'Hoje às 09:58',
    messages: [
      msg('m1', 'user', 'Qual o prazo para entrega do meu pedido?', '09:58', { read: false }),
    ],
  }),

  conv({
    id: '4',
    name: 'Carlos Eduardo',
    initials: 'CE',
    avatarColor: '#10b981',
    preview: 'Obrigado pelo atendimento!',
    time: 'Ontem',
    unread: 1,
    status: 'closed',
    channel: 'WhatsApp',
    agent: 'IA Juju',
    email: 'carlos.eduardo@email.com',
    phone: '(41) 98765-4321',
    location: 'Curitiba, PR, Brasil',
    tags: ['Resolvido'],
    startedAt: 'Ontem às 15:30',
    messages: [
      msg('m1', 'user', 'Obrigado pelo atendimento!', 'Ontem', { read: true }),
      msg('m2', 'bot', 'Fico feliz em ajudar!', 'Ontem'),
    ],
  }),

  conv({
    id: '5',
    name: 'Ana Beatriz',
    initials: 'AB',
    avatarColor: '#f59e0b',
    preview: 'Quero cancelar meu pedido',
    time: 'Ontem',
    unread: 2,
    status: 'open',
    channel: 'Instagram',
    agent: 'IA Juju',
    email: 'ana.beatriz@email.com',
    phone: '(51) 97654-3210',
    location: 'Porto Alegre, RS, Brasil',
    tags: ['Cancelamento'],
    startedAt: 'Ontem às 14:00',
    messages: [
      msg('m1', 'user', 'Quero cancelar meu pedido #9876', 'Ontem', { read: false }),
    ],
  }),

  conv({
    id: '6',
    name: 'Lucas Martins',
    initials: 'LM',
    avatarColor: '#8b5cf6',
    preview: 'Ainda não recebi o boleto',
    time: 'Ontem',
    unread: 0,
    status: 'open',
    channel: 'Chat',
    agent: 'IA Juju',
    email: 'lucas.martins@email.com',
    phone: '(62) 98888-7777',
    location: 'Goiânia, GO, Brasil',
    tags: ['Financeiro'],
    startedAt: 'Ontem às 11:10',
    messages: [
      msg('m1', 'user', 'Ainda não recebi o boleto do mês.', 'Ontem', { read: true }),
    ],
  }),

  conv({
    id: '7',
    name: 'Patrícia Azevedo',
    initials: 'PA',
    avatarColor: '#06b6d4',
    preview: 'Tudo certo, obrigada!',
    time: '2 dias',
    unread: 0,
    status: 'closed',
    channel: 'WhatsApp',
    agent: 'IA Juju',
    email: 'patricia.azevedo@email.com',
    phone: '(85) 97777-6666',
    location: 'Fortaleza, CE, Brasil',
    tags: ['Resolvido'],
    startedAt: 'Há 2 dias às 09:00',
    messages: [
      msg('m1', 'user', 'Tudo certo, obrigada!', '2 dias', { read: true }),
    ],
  }),

  conv({
    id: '8',
    name: 'Ricardo Almeida',
    initials: 'RA',
    avatarColor: '#ef4444',
    preview: 'Como funciona o suporte?',
    time: '2 dias',
    unread: 0,
    status: 'open',
    channel: 'Chat',
    agent: 'IA Juju',
    email: 'ricardo.almeida@email.com',
    phone: '(71) 96666-5555',
    location: 'Salvador, BA, Brasil',
    tags: ['Suporte'],
    startedAt: 'Há 2 dias às 08:45',
    messages: [
      msg('m1', 'user', 'Como funciona o suporte da plataforma?', '2 dias', { read: true }),
    ],
  }),
]