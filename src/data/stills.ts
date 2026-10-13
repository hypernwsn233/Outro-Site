export interface StillItem {
  id: string;
  title: string;
  place: string;
  note: string;
  tall?: boolean;
  assetUrl?: string;
  customUrl?: string;
}

const approvedImage = (name: string) => new URL(`../../imagens/${name}`, import.meta.url).href;

export const INITIAL_STILLS: StillItem[] = [
  {
    id: 'hf_20260922_194349_26ffdbfd-ac5e-49e9-a07d-c06d3f7cb4cb',
    title: 'Antes da Poeira Baixar',
    place: 'Vila Baeta Neves · ETEC Lauro Gomes',
    note: 'Registros dos projetos de pesquisa no campus. A espera pelo instante exato em que a reação e o aprendizado se revelam no laboratório.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.38 (1).jpeg')
  },
  {
    id: 'hf_20260922_194350_5546ea3d-6336-42c7-a59f-06165c5802be',
    title: 'Caminhos do Conhecimento',
    place: 'Pátio Central · SBC',
    note: 'O fluxo diário de estudantes entre os blocos de automação, química e informática ao entardecer.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.38.jpeg')
  },
  {
    id: 'hf_20260922_194349_b4533691-cb49-41d4-b56c-51f0fdcbe250',
    title: 'Foco no Detalhe',
    place: 'Oficinas Técnicas · Lauro Gomes',
    note: 'A precisão exigida no ajuste de cada componente mecânico e eletroeletrônico.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.39 (1).jpeg')
  },
  {
    id: 'hf_20260922_194349_e588abd3-1bfa-4918-894f-05632cc51ccc',
    title: 'Horas de Dedicação',
    place: 'Biblioteca & Pesquisa',
    note: 'A rotina de estudos intensos e elaboração dos projetos de conclusão de curso.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.39.jpeg')
  },
  {
    id: 'hf_20260922_194350_28d92c80-de66-41cb-911e-b3b44aebe1f5',
    title: 'Confiança Mútua',
    place: 'Projetos Integrados · SBC',
    note: 'O trabalho em grupo como alicerce para soluções técnicas e colaborativas na indústria.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.40 (1).jpeg')
  },
  {
    id: 'hf_20260922_194349_04e89718-4214-4aff-bac5-490462bbfe2f',
    title: 'Microestruturas',
    place: 'Lab de Análises Químicas',
    note: 'Cristalizações e reações sob ampliação ótica registradas durante a feira de ciências.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.40 (2).jpeg')
  },
  {
    id: 'hf_20260922_194417_2c031e22-2fad-4c81-a544-83cd6bba1c33',
    title: 'Frente ao Desafio',
    place: 'Competição de Robótica',
    note: 'Protótipos autônomos testados em condições de precisão e programação avançada.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.40.jpeg')
  },
  {
    id: 'hf_20260922_194349_a39c3226-7848-4b15-b840-98ad8aec467b',
    title: 'Luzes da Criação',
    place: 'Estúdio de Design Gráfico',
    note: 'Exploração de contrastes, tipografias e identidade visual contemporânea.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.41 (1).jpeg')
  },
  {
    id: 'hf_20260922_194417_555e4d90-f35f-4a1a-8c75-def1e8b71988',
    title: 'Aritmética Perfeita',
    place: 'Desenvolvimento de Sistemas',
    note: 'Linhas de código e lógica computacional convergindo em arquiteturas funcionais.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.41 (2).jpeg')
  },
  {
    id: 'hf_20260922_194417_e525a243-03c8-454b-83b4-60f541baf70a',
    title: 'Fluidez Tecnológica',
    place: 'Sistemas Hidráulicos e Pneumáticos',
    note: 'Bancadas industriais com medições precisas de vazão e pressão em tempo real.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.41.jpeg')
  },
  {
    id: 'hf_20260922_194349_ec830e6f-b8e6-4569-8540-ee7f33902c53',
    title: 'Diálogo & Prática',
    place: 'Salas de Metodologia Ativa',
    note: 'Intercâmbio de saberes e formulação de hipóteses entre docentes e discentes.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.42 (1).jpeg')
  },
  {
    id: 'hf_20260922_194417_35a9af5f-bd07-45a7-bb73-08b47d19d530',
    title: 'Perspectiva Direta',
    place: 'Vila Baeta Neves · Entorno',
    note: 'A integração da escola técnica com a comunidade urbana de São Bernardo do Campo.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.42.jpeg')
  },
  {
    id: 'hf_20260922_194416_30e307a9-1265-45c3-a1a0-5c6fa5bb9f8d',
    title: 'Energia em Movimento',
    place: 'Galpão de Manutenção Automotiva',
    note: 'Motores, inversores e sistemas de potência revisados pelos estudantes.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.43 (1).jpeg')
  },
  {
    id: 'hf_20260922_194417_ff5cb9f8-8eed-4bfb-bb08-11256da92eae',
    title: 'Formas Puras',
    place: 'Impressão 3D e Prototipagem',
    note: 'Polímeros fundidos dando forma às peças desenvolvidas nos softwares CAD.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.43 (2).jpeg')
  },
  {
    id: 'hf_20260922_194418_1d9bff4a-4971-4944-9e49-d72e755ceeb0',
    title: 'Gerações Lauro Gomes',
    place: 'Acervo Histórico · ETEC',
    note: 'Mais de 6 décadas formando técnicos líderes de projetos no estado de São Paulo.',
    assetUrl: approvedImage('WhatsApp Image 2026-10-10 at 11.49.43.jpeg')
  }
];
