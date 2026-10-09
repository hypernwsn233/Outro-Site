export interface StillItem {
  id: string;
  title: string;
  place: string;
  note: string;
  tall?: boolean;
  customUrl?: string;
}

export const INITIAL_STILLS: StillItem[] = [
  {
    id: 'hf_20260922_194349_26ffdbfd-ac5e-49e9-a07d-c06d3f7cb4cb',
    title: 'Antes da Poeira Baixar',
    place: 'Vila Baeta Neves · ETEC Lauro Gomes',
    note: 'Registros dos projetos de pesquisa no campus. A espera pelo instante exato em que a reação e o aprendizado se revelam no laboratório.'
  },
  {
    id: 'hf_20260922_194350_5546ea3d-6336-42c7-a59f-06165c5802be',
    title: 'Caminhos do Conhecimento',
    place: 'Pátio Central · SBC',
    note: 'O fluxo diário de estudantes entre os blocos de automação, química e informática ao entardecer.'
  },
  {
    id: 'hf_20260922_194349_b4533691-cb49-41d4-b56c-51f0fdcbe250',
    title: 'Foco no Detalhe',
    place: 'Oficinas Técnicas · Lauro Gomes',
    note: 'A precisão exigida no ajuste de cada componente mecânico e eletroeletrônico.'
  },
  {
    id: 'hf_20260922_194349_e588abd3-1bfa-4918-894f-05632cc51ccc',
    title: 'Horas de Dedicação',
    place: 'Biblioteca & Pesquisa',
    note: 'A rotina de estudos intensos e elaboração dos projetos de conclusão de curso.'
  },
  {
    id: 'hf_20260922_194350_28d92c80-de66-41cb-911e-b3b44aebe1f5',
    title: 'Confiança Mútua',
    place: 'Projetos Integrados · SBC',
    note: 'O trabalho em grupo como alicerce para soluções técnicas e colaborativas na indústria.'
  },
  {
    id: 'hf_20260922_194349_04e89718-4214-4aff-bac5-490462bbfe2f',
    title: 'Microestruturas',
    place: 'Lab de Análises Químicas',
    note: 'Cristalizações e reações sob ampliação ótica registradas durante a feira de ciências.'
  },
  {
    id: 'hf_20260922_194417_2c031e22-2fad-4c81-a544-83cd6bba1c33',
    title: 'Frente ao Desafio',
    place: 'Competição de Robótica',
    note: 'Protótipos autônomos testados em condições de precisão e programação avançada.'
  },
  {
    id: 'hf_20260922_194349_a39c3226-7848-4b15-b840-98ad8aec467b',
    title: 'Luzes da Criação',
    place: 'Estúdio de Design Gráfico',
    note: 'Exploração de contrastes, tipografias e identidade visual contemporânea.'
  },
  {
    id: 'hf_20260922_194417_555e4d90-f35f-4a1a-8c75-def1e8b71988',
    title: 'Aritmética Perfeita',
    place: 'Desenvolvimento de Sistemas',
    note: 'Linhas de código e lógica computacional convergindo em arquiteturas funcionais.'
  },
  {
    id: 'hf_20260922_194417_e525a243-03c8-454b-83b4-60f541baf70a',
    title: 'Fluidez Tecnológica',
    place: 'Sistemas Hidráulicos e Pneumáticos',
    note: 'Bancadas industriais com medições precisas de vazão e pressão em tempo real.'
  },
  {
    id: 'hf_20260922_194349_ec830e6f-b8e6-4569-8540-ee7f33902c53',
    title: 'Diálogo & Prática',
    place: 'Salas de Metodologia Ativa',
    note: 'Intercâmbio de saberes e formulação de hipóteses entre docentes e discentes.'
  },
  {
    id: 'hf_20260922_194417_35a9af5f-bd07-45a7-bb73-08b47d19d530',
    title: 'Perspectiva Direta',
    place: 'Vila Baeta Neves · Entorno',
    note: 'A integração da escola técnica com a comunidade urbana de São Bernardo do Campo.'
  },
  {
    id: 'hf_20260922_194416_30e307a9-1265-45c3-a1a0-5c6fa5bb9f8d',
    title: 'Energia em Movimento',
    place: 'Galpão de Manutenção Automotiva',
    note: 'Motores, inversores e sistemas de potência revisados pelos estudantes.'
  },
  {
    id: 'hf_20260922_194417_ff5cb9f8-8eed-4bfb-bb08-11256da92eae',
    title: 'Formas Puras',
    place: 'Impressão 3D e Prototipagem',
    note: 'Polímeros fundidos dando forma às peças desenvolvidas nos softwares CAD.'
  },
  {
    id: 'hf_20260922_194418_1d9bff4a-4971-4944-9e49-d72e755ceeb0',
    title: 'Gerações Lauro Gomes',
    place: 'Acervo Histórico · ETEC',
    note: 'Mais de 6 décadas formando técnicos líderes de projetos no estado de São Paulo.'
  },
  {
    id: 'hf_20260922_194349_75e53821-0807-4ebc-992d-34bae0ec2ce6',
    title: 'Microcircuitos',
    place: 'Soldagem e SMD',
    note: 'Placas de circuito impresso montadas com tolerâncias milimétricas.'
  },
  {
    id: 'hf_20260922_194417_5a227847-3796-4438-805d-7e66e9538205',
    title: 'Primeiro Semestre',
    place: 'Iniciação Científica',
    note: 'O despertar da curiosidade científica no primeiro contato com os laboratórios.'
  },
  {
    id: 'hf_20260922_194350_b49aa67e-0401-4029-af4f-f6ac3ee83398',
    title: 'Atenção e Segurança',
    place: 'Normas Técnicas & NR-10',
    note: 'A cultura da segurança no trabalho e prevenção como valor inegociável.'
  },
  {
    id: 'hf_20260922_194349_89b82779-3a46-4c55-b7c5-f4a0fd955874',
    title: 'Trilhas de Luz',
    place: 'Automação Predial',
    note: 'Sistemas inteligentes de iluminação e sustentabilidade energética instalados no prédio.'
  },
  {
    id: 'hf_20260922_194416_47e18c62-253a-42e1-97a9-9e5f6a6b8d59',
    title: 'Estrutura & Tradição',
    place: 'Fachada Pereira Barreto',
    note: 'A arquitetura imponente e acolhedora da instituição reconhecida por todo o Grande ABC.',
    tall: true
  },
  {
    id: 'hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c',
    title: 'Nossa Comunidade',
    place: 'Encontro de Ex-Alunos',
    note: 'Profissionais de destaque que compartilham suas trajetórias e inspiram os novos alunos.'
  }
];
