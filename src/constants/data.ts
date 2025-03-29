type MoodDayFeelingType = {
  emoji: string,
  description: string,
};

export const faqQuestions = [
  {
    id: 1,
    question: "O QuimioApp é gratuito?",
    answer: "Sim! O aplicativo é totalmente gratuito e foi desenvolvido para ajudar pacientes e cuidadores no acompanhamento do tratamento."
  },
  {
    id: 2,
    question: "Posso configurar lembretes personalizados para a medicação?",
    answer: "Sim, você pode definir horários específicos para receber notificações e garantir que sua medicação seja tomada corretamente."
  },
  {
    id: 3,
    question: "O aplicativo funciona offline?",
    answer: "Algumas funções, como registro de sintomas e consultas, funcionam offline. No entanto, lembretes e sincronização de dados precisam de conexão com a internet."
  },
  {
    id: 4,
    question: "Posso compartilhar meu histórico de saúde com meu médico?",
    answer: "Sim! Você pode exportar seus registros de saúde e compartilhá-los com seu médico durante as consultas."
  },
  {
    id: 5,
    question: "O que acontece se eu esquecer de registrar meus sintomas?",
    answer: "O QuimioApp enviará notificações para lembrar você de atualizar seus registros diariamente."
  },
  {
    id: 6,
    question: "Posso adicionar múltiplos perfis no aplicativo?",
    answer: "Sim! O app permite que cuidadores adicionem perfis de familiares para um melhor acompanhamento."
  },
  {
    id: 7,
    question: "Como posso garantir a segurança dos meus dados?",
    answer: "Seus dados são criptografados e protegidos. Além disso, você pode configurar autenticação por senha ou biometria para mais segurança."
  },
  {
    id: 8,
    question: "O app envia alertas sobre efeitos colaterais graves?",
    answer: "Sim! Caso você registre um sintoma grave, o app pode sugerir buscar atendimento médico imediato."
  },
  {
    id: 9,
    question: "O QuimioApp possui suporte técnico?",
    answer: "Sim, você pode entrar em contato com o suporte pelo e-mail ou WhatsApp dentro do próprio app."
  },
  {
    id: 10,
    question: "Como posso alterar meus dados pessoais?",
    answer: "Você pode acessar a aba Configurações e atualizar suas informações a qualquer momento."
  },
  {
    id: 11,
    question: "Posso desativar as notificações do aplicativo?",
    answer: "Sim, na aba Configurações, você pode personalizar ou desativar notificações conforme sua necessidade."
  }
];

export const moodDayFeeling: MoodDayFeelingType[]=  [
  {
    emoji: "😣",
    description: "Muito Mal",
  },
  {
    emoji: "😞",
    description: "Mal",
  },
  {
    emoji: "😑",
    description: "Normal",
  },
  {
    emoji: "🙂",
    description: "Bem",
  },
  {
    emoji: "☺️",
    description: "Muito Bem",
  },                                                                                                                                                                                                                                                                                                                                                                                      
];

export const API_URL = 'http://192.168.240.1:3000/api/v1/quimiocare';