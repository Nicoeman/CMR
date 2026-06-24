/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Exercise {
  id: string;
  name: string;
  category: 'Peito' | 'Costas' | 'Ombro' | 'Bíceps' | 'Tríceps' | 'Pernas' | 'Glúteos' | 'Abdômen' | 'Calistenia';
  description: string;
  tips: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  defaultSets: number;
  defaultReps: string;
}

export const EXERCISE_DATABASE: Exercise[] = [
  // --- PEITO (12) ---
  {
    id: "peito-1",
    name: "Supino Reto com Barra",
    category: "Peito",
    description: "Deitado no banco reto, segure a barra com pegada pronada e desça até tocar levemente o peito, empurrando para cima em seguida.",
    tips: ["Mantenha as escápulas retraídas durante todo o movimento.", "Evite esticar totalmente os cotovelos no topo para manter a tensão.", "Mantenha os pés firmes no chão."],
    primaryMuscles: ["Peitoral Maior (Foco Medial)"],
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    defaultSets: 4,
    defaultReps: "8-12"
  },
  {
    id: "peito-2",
    name: "Supino Inclinado com Halteres",
    category: "Peito",
    description: "Sentado em banco inclinado a 30-45 graus, empurre os halteres para cima alinhando-os com o peitoral superior.",
    tips: ["Não incline muito o banco para não sobrecarregar demais os ombros.", "Faça uma descida controlada sentindo o alongamento muscular."],
    primaryMuscles: ["Peitoral Maior (Foco Clavicular/Superior)"],
    secondaryMuscles: ["Deltoide Anterior", "Tríceps Braquial"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "peito-3",
    name: "Crucifixo com Halteres no Banco Reto",
    category: "Peito",
    description: "Deitado no banco, abra os braços lateralmente de forma semicircular segurando os halteres, depois feche-os acima do peito.",
    tips: ["Mantenha uma leve flexão nos cotovelos para proteger as articulações.", "Foque em aproximar os bíceps no topo do movimento."],
    primaryMuscles: ["Peitoral Maior (Alongamento Lateral)"],
    secondaryMuscles: ["Deltoide Anterior"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "peito-4",
    name: "Crossover na Polia Alta",
    category: "Peito",
    description: "Posicione as polias acima da cabeça. Puxe as manoplas para baixo e para a frente, cruzando as mãos na linha do quadril.",
    tips: ["Incline levemente o tronco para a frente.", "Foque na contração máxima no ponto final do movimento."],
    primaryMuscles: ["Peitoral Maior (Foco Inferior)"],
    secondaryMuscles: ["Deltoide Anterior", "Serrátil Anterior"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "peito-5",
    name: "Voador (Peck Deck)",
    category: "Peito",
    description: "Sentado no aparelho, apoie os antebraços ou segure os apoios e junte os braços à frente, contraindo o peitoral.",
    tips: ["Mantenha os ombros abaixados e o peito estufado.", "Não permita que os pesos batam no retorno."],
    primaryMuscles: ["Peitoral Maior (Isolamento)"],
    secondaryMuscles: ["Deltoide Anterior"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "peito-6",
    name: "Supino Declinado com Barra",
    category: "Peito",
    description: "Deitado em banco declinado, segure a barra e desça até a parte inferior do peito antes de empurrar para cima.",
    tips: ["Mantenha os pés bem presos nos rolos protetores.", "O curso do movimento é mais curto, ideal para trabalhar força na porção inferior."],
    primaryMuscles: ["Peitoral Maior (Foco Inferior)"],
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    defaultSets: 4,
    defaultReps: "8-10"
  },
  {
    id: "peito-7",
    name: "Supino Reto com Halteres",
    category: "Peito",
    description: "Deitado no banco reto, empurre os halteres verticalmente a partir da linha do peito, permitindo maior amplitude.",
    tips: ["Aproveite a liberdade de movimento dos halteres para aproximá-los em cima sem batê-los.", "Excelente para corrigir assimetria de força."],
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "peito-8",
    name: "Crossover Polia Baixa",
    category: "Peito",
    description: "Ajuste as polias na parte mais baixa. Segure as manoplas e puxe-as para cima e para o centro até a altura do queixo.",
    tips: ["Mantenha as palmas das mãos voltadas para cima.", "Foque na linha clavicular do peito."],
    primaryMuscles: ["Peitoral Maior (Superior)"],
    secondaryMuscles: ["Deltoide Anterior", "Bíceps Braquial"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "peito-9",
    name: "Flexão de Braço (Push-up)",
    category: "Peito",
    description: "Apoie as mãos no chão um pouco além da largura dos ombros e o corpo reto. Desça o peito até o chão e empurre.",
    tips: ["Mantenha o abdômen e os glúteos contraídos para não curvar a lombar.", "Cotovelos apontando a 45 graus em relação ao tronco."],
    primaryMuscles: ["Peitoral Maior"],
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    defaultSets: 3,
    defaultReps: "Submáximo"
  },
  {
    id: "peito-10",
    name: "Flexão Inclinada (Mãos Elevadas)",
    category: "Peito",
    description: "Faça flexões de braço apoiando as mãos em um banco ou superfície elevada.",
    tips: ["Foco na porção inferior do peitoral.", "Ótimo para iniciantes que ainda não realizam flexões tradicionais."],
    primaryMuscles: ["Peitoral Maior (Inferior)"],
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "peito-11",
    name: "Flexão Declinada (Pés Elevados)",
    category: "Peito",
    description: "Faça flexões apoiando os pés em uma plataforma elevada e as mãos no chão.",
    tips: ["Foco intenso na porção superior do peito.", "Exige maior força nos tríceps e deltoides."],
    primaryMuscles: ["Peitoral Maior (Superior)"],
    secondaryMuscles: ["Deltoide Anterior", "Tríceps Braquial"],
    defaultSets: 3,
    defaultReps: "10-12"
  },
  {
    id: "peito-12",
    name: "Pullover com Halter",
    category: "Peito",
    description: "Deitado perpendicular ao banco apoiando apenas as costas altas, desça o halter atrás da cabeça alongando a caixa torácica e puxe de volta.",
    tips: ["Mantenha uma leve flexão nos cotovelos.", "Excelente para expansão torácica."],
    primaryMuscles: ["Peitoral Maior", "Latíssimo do Dorso"],
    secondaryMuscles: ["Tríceps (Cabeça Longa)", "Serrátil Anterior"],
    defaultSets: 3,
    defaultReps: "12"
  },

  // --- COSTAS (12) ---
  {
    id: "costas-1",
    name: "Puxada Alta na Polia (Pulldown)",
    category: "Costas",
    description: "Sentado na máquina, segure a barra com pegada bem aberta e puxe-a em direção à parte superior do peito.",
    tips: ["Incline ligeiramente o tronco para trás.", "Foque em puxar com os cotovelos, e não com os braços.", "Mantenha os ombros abaixados."],
    primaryMuscles: ["Latíssimo do Dorso (Grande Dorsal)"],
    secondaryMuscles: ["Bíceps Braquial", "Redondo Maior", "Trapézio"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "costas-2",
    name: "Remada Curvada com Barra",
    category: "Costas",
    description: "Incline o tronco para a frente a 45 graus com os joelhos semiflexionados. Segure a barra e puxe-a em direção ao abdômen.",
    tips: ["Mantenha a coluna neutra e reta durante todo o exercício.", "Aproxime bem as escápulas no topo."],
    primaryMuscles: ["Dorsal Meio", "Trapézio", "Romboide"],
    secondaryMuscles: ["Bíceps Braquial", "Deltoide Posterior"],
    defaultSets: 4,
    defaultReps: "8-12"
  },
  {
    id: "costas-3",
    name: "Remada Unilateral com Halter (Serrote)",
    category: "Costas",
    description: "Apoiando um joelho e mão no banco reto, puxe o halter com a outra mão em direção ao quadril.",
    tips: ["Não gire excessivamente o tronco.", "Faça força puxando o cotovelo para trás e para cima."],
    primaryMuscles: ["Latíssimo do Dorso", "Romboide"],
    secondaryMuscles: ["Bíceps Braquial", "Deltoide Posterior"],
    defaultSets: 3,
    defaultReps: "10-12"
  },
  {
    id: "costas-4",
    name: "Levantamento Terra",
    category: "Costas",
    description: "Com a barra no chão, abaixe-se mantendo a coluna reta, segure a barra e fique de pé empurrando o chão com as pernas.",
    tips: ["Mantenha a barra colada ao corpo durante todo o trajeto.", "Contraia firmemente o core.", "Não curve a coluna lombar."],
    primaryMuscles: ["Eretores da Espinha", "Glúteo Máximo", "Isquiotibiais"],
    secondaryMuscles: ["Trapézio", "Quadríceps", "Core"],
    defaultSets: 4,
    defaultReps: "6-8"
  },
  {
    id: "costas-5",
    name: "Remada Baixa Sentado (Triângulo)",
    category: "Costas",
    description: "Sentado na polia com os pés apoiados, puxe o pegador triângulo em direção ao umbigo mantendo a coluna ereta.",
    tips: ["Retraia as escápulas antes de puxar com os braços.", "Evite balançar o tronco excessivamente."],
    primaryMuscles: ["Grande Dorsal", "Romboide", "Trapézio Médio"],
    secondaryMuscles: ["Bíceps Braquial", "Deltoide Posterior"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "costas-6",
    name: "Pulldown na Polia Alta com Braços Estendidos",
    category: "Costas",
    description: "De pé frente à polia, segure a barra reta com braços quase retos e empurre-a para baixo até encostar nas coxas.",
    tips: ["Mantenha os cotovelos fixos em uma angulação quase reta.", "Foque puramente no acionamento do latíssimo."],
    primaryMuscles: ["Latíssimo do Dorso (Isolamento)"],
    secondaryMuscles: ["Redondo Maior", "Tríceps (Cabeça Longa)"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "costas-7",
    name: "Puxada Alta com Pegada Supinada (Fechada)",
    category: "Costas",
    description: "Sentado na máquina de puxada alta, segure a barra com pegada supinada (palmas para você) na largura dos ombros e puxe.",
    tips: ["Aumenta o recrutamento da parte inferior das costas e dos bíceps.", "Desça bem os ombros na contração."],
    primaryMuscles: ["Latíssimo do Dorso", "Bíceps Braquial"],
    secondaryMuscles: ["Redondo Maior", "Trapézio Inferior"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "costas-8",
    name: "Remada Cavalinho (Barra em T)",
    category: "Costas",
    description: "Monte no aparelho de remada cavalinho ou coloque uma barra em canto de parede. Use o puxador e puxe trazendo o peso ao peito.",
    tips: ["Foque em esmagar a musculatura do meio das costas.", "Mantenha o abdômen rígido."],
    primaryMuscles: ["Romboide", "Trapézio", "Latíssimo do Dorso"],
    secondaryMuscles: ["Bíceps Braquial", "Deltoide Posterior"],
    defaultSets: 4,
    defaultReps: "8-12"
  },
  {
    id: "costas-9",
    name: "Barra Fixa Neutra (Pegada Romada)",
    category: "Costas",
    description: "Segure nas alças paralelas da barra fixa e puxe o próprio peso para cima até o queixo ultrapassar a barra.",
    tips: ["Excelente pegada anatômica para proteger ombros e punhos.", "Controle a velocidade de descida."],
    primaryMuscles: ["Latíssimo do Dorso", "Braquiorradial"],
    secondaryMuscles: ["Bíceps Braquial", "Trapézio"],
    defaultSets: 3,
    defaultReps: "Submáximo"
  },
  {
    id: "costas-10",
    name: "Hiperextensão Lombar",
    category: "Costas",
    description: "No banco de 45 graus, posicione o quadril nos apoios e dobre o corpo para baixo. Suba até alinhar o corpo de forma reta.",
    tips: ["Não hiperestenda excessivamente a coluna para trás no topo.", "Mantenha o movimento lento e sob controle."],
    primaryMuscles: ["Eretores da Espinha (Lombar)"],
    secondaryMuscles: ["Glúteos", "Isquiotibiais"],
    defaultSets: 3,
    defaultReps: "15"
  },
  {
    id: "costas-11",
    name: "Puxada Triângulo na Polia Alta",
    category: "Costas",
    description: "Usando o triângulo na polia alta, puxe em direção ao peitoral, inclinando levemente as costas para trás.",
    tips: ["Trabalha a espessura das costas de forma fantástica.", "Mantenha o peito sempre aberto."],
    primaryMuscles: ["Latíssimo do Dorso", "Romboide"],
    secondaryMuscles: ["Bíceps", "Braquial"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "costas-12",
    name: "Remada no Banco Inclinado com Halteres",
    category: "Costas",
    description: "Deitado de bruços em banco inclinado a 30 graus, puxe os halteres trazendo os cotovelos para o alto.",
    tips: ["Isola completamente as costas e poupa a região lombar.", "Mantenha o pescoço neutro."],
    primaryMuscles: ["Trapézio Médio/Inferior", "Romboide"],
    secondaryMuscles: ["Latíssimo do Dorso", "Bíceps"],
    defaultSets: 3,
    defaultReps: "12"
  },

  // --- OMBRO (12) ---
  {
    id: "ombro-1",
    name: "Desenvolvimento de Ombros com Halteres",
    category: "Ombro",
    description: "Sentado em banco com encosto reto, posicione os halteres na altura dos ombros e empurre-os verticalmente para cima.",
    tips: ["Não bata os halteres no topo.", "Não desça além da linha do queixo para proteger os ombros.", "Mantenha as costas apoiadas."],
    primaryMuscles: ["Deltoide Anterior", "Deltoide Lateral"],
    secondaryMuscles: ["Tríceps Braquial", "Trapézio Superior"],
    defaultSets: 4,
    defaultReps: "8-12"
  },
  {
    id: "ombro-2",
    name: "Elevação Lateral com Halteres",
    category: "Ombro",
    description: "De pé, com halteres ao lado das coxas, eleve os braços lateralmente até a altura dos ombros.",
    tips: ["Não use impulso corporal excessivo.", "Lidere o movimento com os cotovelos, mantendo os punhos levemente abaixo deles."],
    primaryMuscles: ["Deltoide Lateral (Ombro Cabeça Média)"],
    secondaryMuscles: ["Deltoide Anterior", "Trapézio Superior"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "ombro-3",
    name: "Elevação Frontal com Halteres",
    category: "Ombro",
    description: "De pé, eleve os halteres para a frente alternadamente ou juntos, até a altura dos olhos.",
    tips: ["Mantenha o abdômen bem contraído para evitar oscilações no tronco."],
    primaryMuscles: ["Deltoide Anterior"],
    secondaryMuscles: ["Peitoral Superior", "Deltoide Lateral"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "ombro-4",
    name: "Desenvolvimento Militar com Barra (Em Pé)",
    category: "Ombro",
    description: "De pé, segure a barra na altura do peito superior e empurre-a para cima da cabeça, bloqueando o core.",
    tips: ["Exige muita estabilidade corporal central.", "Não curve as costas para trás ao subir o peso."],
    primaryMuscles: ["Deltoide Anterior", "Core"],
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Lateral"],
    defaultSets: 4,
    defaultReps: "6-8"
  },
  {
    id: "ombro-5",
    name: "Crucifixo Invertido com Halteres (Ombros Posteriores)",
    category: "Ombro",
    description: "Incline o tronco para a frente quase paralelo ao chão. Eleve os halteres lateralmente focando na parte traseira dos ombros.",
    tips: ["Não use impulso das pernas.", "Foque em aproximar os cotovelos para trás e para o alto."],
    primaryMuscles: ["Deltoide Posterior"],
    secondaryMuscles: ["Romboide", "Trapézio Médio"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "ombro-6",
    name: "Face Pull (Polia com Corda)",
    category: "Ombro",
    description: "Ajuste a polia na altura do peito, segure a corda e puxe-a em direção ao rosto, abrindo as mãos perto das orelhas.",
    tips: ["Foque em girar os ombros para fora na parte final da puxada.", "Excelente para postura e saúde articular."],
    primaryMuscles: ["Deltoide Posterior", "Manguito Rotador"],
    secondaryMuscles: ["Trapézio Médio/Superior", "Romboide"],
    defaultSets: 3,
    defaultReps: "15"
  },
  {
    id: "ombro-7",
    name: "Elevação Lateral na Polia",
    category: "Ombro",
    description: "De lado para a polia baixa, segure a manopla oposta e eleve o braço lateralmente.",
    tips: ["Garante tensão contínua do início ao fim do movimento.", "Faça com controle absoluto."],
    primaryMuscles: ["Deltoide Lateral"],
    secondaryMuscles: ["Deltoide Anterior", "Trapézio"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "ombro-8",
    name: "Desenvolvimento Arnold com Halteres",
    category: "Ombro",
    description: "Comece com os halteres na frente do rosto com pegada supinada. Ao empurrar para cima, gire as mãos de forma pronada.",
    tips: ["Realize a rotação de forma suave e contínua.", "Atinge todas as três cabeças do deltoide."],
    primaryMuscles: ["Deltoide Anterior", "Deltoide Lateral"],
    secondaryMuscles: ["Tríceps Braquial"],
    defaultSets: 3,
    defaultReps: "10"
  },
  {
    id: "ombro-9",
    name: "Encolhimento de Ombros com Halteres (Trapézio)",
    category: "Ombro",
    description: "De pé, segure halteres pesados ao lado do corpo e eleve os ombros verticalmente o máximo possível.",
    tips: ["Não gire os ombros (movimento circular), apenas suba e desça verticalmente.", "Segure 1 segundo no topo."],
    primaryMuscles: ["Trapézio Superior"],
    secondaryMuscles: ["Antebraços (Pegada)"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "ombro-10",
    name: "Encolhimento de Ombros por Trás na Barra",
    category: "Ombro",
    description: "Fique de costas para a barra, segure-a e realize o movimento de elevação dos ombros.",
    tips: ["Ótimo para trabalhar a porção média e superior do trapézio.", "Mantenha a postura bem ereta."],
    primaryMuscles: ["Trapézio Superior/Médio"],
    secondaryMuscles: ["Antebraços"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "ombro-11",
    name: "Elevação Frontal com Anilhas (Pegada Volante)",
    category: "Ombro",
    description: "Segure uma anilha pesada pelas laterais e eleve-a até a linha dos ombros.",
    tips: ["Aperte a anilha para ativar mais o peitoral junto.", "Controle a descida para evitar balanço."],
    primaryMuscles: ["Deltoide Anterior"],
    secondaryMuscles: ["Peitoral Superior", "Serrátil"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "ombro-12",
    name: "Crucifixo Invertido Sentado no Aparelho (Peck Deck Inverso)",
    category: "Ombro",
    description: "Sentado de frente para o aparelho, puxe os braços bem para trás estendidos paralelamente ao chão.",
    tips: ["Excelente isolamento constante do deltoide traseiro.", "Evite usar o trapézio nas puxadas puxando os ombros para baixo."],
    primaryMuscles: ["Deltoide Posterior"],
    secondaryMuscles: ["Romboide", "Trapézio Médio"],
    defaultSets: 4,
    defaultReps: "12-15"
  },

  // --- BÍCEPS (11) ---
  {
    id: "biceps-1",
    name: "Rosca Direta com Barra W",
    category: "Bíceps",
    description: "De pé, segure a barra W com as palmas voltadas para a frente e flexione os cotovelos trazendo a barra ao peito.",
    tips: ["Mantenha os cotovelos fixados ao lado do corpo.", "A barra W é mais anatômica e poupa os punhos."],
    primaryMuscles: ["Bíceps Braquial (Cabeça Curta/Longa)"],
    secondaryMuscles: ["Braquial", "Antebraço"],
    defaultSets: 4,
    defaultReps: "8-12"
  },
  {
    id: "biceps-2",
    name: "Rosca Alternada com Halteres",
    category: "Bíceps",
    description: "De pé, comece com os halteres neutros ao lado do corpo e gire os punhos para cima ao flexionar os cotovelos.",
    tips: ["Foque no giro do punho (supinação) no final do movimento para contração extrema."],
    primaryMuscles: ["Bíceps Braquial"],
    secondaryMuscles: ["Braquial", "Antebraços"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "biceps-3",
    name: "Rosca Martelo com Halteres",
    category: "Bíceps",
    description: "Segure os halteres com as palmas voltadas uma para a outra e flexione o braço sem girar os punhos.",
    tips: ["Excelente para aumentar a largura do braço e fortalecer antebraço."],
    primaryMuscles: ["Braquiorradial", "Braquial"],
    secondaryMuscles: ["Bíceps Braquial"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "biceps-4",
    name: "Rosca Scott com Barra W",
    category: "Bíceps",
    description: "Sentado no banco scott apoiando os braços, flexione o braço trazendo a barra em direção ao rosto.",
    tips: ["Evite estender os braços de forma abrupta embaixo para evitar lesões no tendão.", "Isolamento absoluto."],
    primaryMuscles: ["Bíceps Braquial (Foco Cabeça Curta)"],
    secondaryMuscles: ["Braquial"],
    defaultSets: 3,
    defaultReps: "10-12"
  },
  {
    id: "biceps-5",
    name: "Rosca Concentrada com Halter",
    category: "Bíceps",
    description: "Sentado, apoie o cotovelo na parte interna da coxa e realize a rosca com o halter.",
    tips: ["Foque totalmente na conexão mente-músculo.", "Não mexa as costas."],
    primaryMuscles: ["Bíceps Braquial (Pico do Bíceps)"],
    secondaryMuscles: ["Braquial"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "biceps-6",
    name: "Rosca Inversa com Barra",
    category: "Bíceps",
    description: "De pé, segure a barra com pegada pronada (palmas para baixo) e eleve a barra flexionando os cotovelos.",
    tips: ["Foco total no antebraço e braquiorradial.", "Excelente estabilizador de pegada."],
    primaryMuscles: ["Braquiorradial", "Extensores do Punho"],
    secondaryMuscles: ["Braquial", "Bíceps"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "biceps-7",
    name: "Rosca Martelo com Corda na Polia",
    category: "Bíceps",
    description: "Utilizando a corda conectada à polia baixa, segure nas extremidades e puxe em direção aos ombros.",
    tips: ["Mantém tensão constante de alta qualidade no braço.", "Mantenha postura impecável."],
    primaryMuscles: ["Braquiorradial", "Braquial"],
    secondaryMuscles: ["Bíceps"],
    defaultSets: 4,
    defaultReps: "12"
  },
  {
    id: "biceps-8",
    name: "Rosca Inclinada 45 Graus com Halteres",
    category: "Bíceps",
    description: "Deitado em banco inclinado a 45 graus, deixe os braços caídos para trás e flexione o braço.",
    tips: ["Coloca o bíceps em posição extrema de alongamento.", "Não jogue o cotovelo para a frente."],
    primaryMuscles: ["Bíceps Braquial (Foco Cabeça Longa)"],
    secondaryMuscles: ["Braquial"],
    defaultSets: 3,
    defaultReps: "10-12"
  },
  {
    id: "biceps-9",
    name: "Rosca Spider (Banco Inclinado)",
    category: "Bíceps",
    description: "Apoie o peito em um banco inclinado e deixe os braços soltos para baixo. Segure a barra e realize a rosca.",
    tips: ["Elimina totalmente qualquer possibilidade de roubo com o corpo.", "Esmague os bíceps no topo."],
    primaryMuscles: ["Bíceps Braquial (Cabeça Curta)"],
    secondaryMuscles: ["Braquial"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "biceps-10",
    name: "Rosca na Polia Alta (Duplo Bíceps)",
    category: "Bíceps",
    description: "No meio das polias de crossover altas, segure as manoplas laterais e dobre os braços em direção às orelhas.",
    tips: ["Posição similar à pose de fisiculturismo.", "Mantenha os cotovelos altos e imóveis."],
    primaryMuscles: ["Bíceps Braquial (Pico do Bíceps)"],
    secondaryMuscles: ["Braquial"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "biceps-11",
    name: "Flexão de Punho (Antebraço)",
    category: "Bíceps",
    description: "Apoiando os antebraços em um banco segurando a barra com palmas para cima, flexione apenas os punhos para cima.",
    tips: ["Ótimo para hipertrofiar a parte interna do antebraço e melhorar pegada."],
    primaryMuscles: ["Flexores do Punho"],
    secondaryMuscles: ["Antebraços Gerais"],
    defaultSets: 3,
    defaultReps: "15"
  },

  // --- TRÍCEPS (11) ---
  {
    id: "triceps-1",
    name: "Tríceps Pulley com Barra (Polia Alta)",
    category: "Tríceps",
    description: "De pé frente à polia alta, empurre a barra reta para baixo estendendo completamente os braços.",
    tips: ["Mantenha os cotovelos imóveis e grudados ao corpo.", "Mantenha o peito aberto."],
    primaryMuscles: ["Tríceps Braquial (Foco Cabeça Lateral)"],
    secondaryMuscles: ["Antebraços"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "triceps-2",
    name: "Tríceps Pulley com Corda",
    category: "Tríceps",
    description: "Utilize a corda na polia alta. Empurre para baixo abrindo as pontas da corda na parte inferior.",
    tips: ["Abra as mãos no final para ativar a porção lateral extrema do tríceps.", "Não incline demais o corpo para a frente."],
    primaryMuscles: ["Tríceps Braquial (Cabeça Lateral e Medial)"],
    secondaryMuscles: ["Antebraços"],
    defaultSets: 4,
    defaultReps: "12"
  },
  {
    id: "triceps-3",
    name: "Tríceps Testa com Barra W",
    category: "Tríceps",
    description: "Deitado no banco reto, segure a barra acima dos ombros, dobre apenas os cotovelos trazendo a barra até a testa e empurre de volta.",
    tips: ["Mantenha os cotovelos paralelos, não os deixe abrir lateralmente.", "Foco na porção longa do tríceps."],
    primaryMuscles: ["Tríceps Braquial (Cabeça Longa)"],
    secondaryMuscles: ["Ancôneo"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "triceps-4",
    name: "Tríceps Francês Unilateral com Halter",
    category: "Tríceps",
    description: "Sentado, segure um halter acima da cabeça com o braço esticado. Desça o peso por trás do pescoço flexionando o cotovelo e empurre.",
    tips: ["Mantenha o cotovelo apontado para o teto.", "Excelente para alongar e hipertrofiar a cabeça longa."],
    primaryMuscles: ["Tríceps Braquial (Cabeça Longa)"],
    secondaryMuscles: ["Deltoide Posterior"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "triceps-5",
    name: "Mergulho em Bancos",
    category: "Tríceps",
    description: "Apoie as mãos na borda de um banco e os pés em outro banco à frente. Desça o quadril dobrando os braços a 90 graus e suba.",
    tips: ["Adicione peso nas coxas se estiver fácil.", "Mantenha as costas próximas ao banco traseiro."],
    primaryMuscles: ["Tríceps Braquial"],
    secondaryMuscles: ["Deltoide Anterior", "Peitoral Inferior"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "triceps-6",
    name: "Supino Fechado (Pegada Estreita)",
    category: "Tríceps",
    description: "Deitado no banco reto, segure a barra com pegada na largura dos ombros e realize o supino.",
    tips: ["Mantenha os cotovelos raspando as costelas ao descer.", "Excelente construtor de força."],
    primaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    secondaryMuscles: ["Peitoral Maior"],
    defaultSets: 4,
    defaultReps: "8-10"
  },
  {
    id: "triceps-7",
    name: "Tríceps Coice com Halter (Kickback)",
    category: "Tríceps",
    description: "Incline o tronco para a frente apoiando uma mão. Mantenha o braço paralelo ao chão e estenda o antebraço para trás.",
    tips: ["Mantenha o cotovelo alto e estático o tempo todo.", "Garante uma contração de pico excelente."],
    primaryMuscles: ["Tríceps Braquial (Cabeça Lateral)"],
    secondaryMuscles: ["Deltoide Posterior"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "triceps-8",
    name: "Tríceps Francês com Corda na Polia Baixa",
    category: "Tríceps",
    description: "De costas para a polia baixa, segure a corda acima da cabeça e estenda os braços verticalmente.",
    tips: ["Tensão constante fantástica na cabeça longa.", "Mantenha o abdômen travado."],
    primaryMuscles: ["Tríceps Braquial (Cabeça Longa)"],
    secondaryMuscles: ["Ancôneo"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "triceps-9",
    name: "Tríceps Unilateral com Pegada Reversa (Supinada)",
    category: "Tríceps",
    description: "Na polia alta, segure a manopla com a palma voltada para cima e estenda o braço.",
    tips: ["Isolamento excepcional focado na porção medial do tríceps.", "Excelente acabamento muscular."],
    primaryMuscles: ["Tríceps Braquial (Cabeça Medial)"],
    secondaryMuscles: ["Antebraços"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "triceps-10",
    name: "Flexão Diamante",
    category: "Tríceps",
    description: "No chão, junte os indicadores e polegares das mãos abaixo do peito formando um triângulo e realize a flexão.",
    tips: ["Altíssima ativação do tríceps no peso corporal.", "Se tiver difícil, use apoio de joelhos."],
    primaryMuscles: ["Tríceps Braquial", "Peitoral Medial"],
    secondaryMuscles: ["Deltoide Anterior"],
    defaultSets: 3,
    defaultReps: "Submáximo"
  },
  {
    id: "triceps-11",
    name: "Tríceps Testa com Halteres Unilateral",
    category: "Tríceps",
    description: "Deitado, segure um halter e realize o movimento de testa de forma isolada em apenas um braço por vez.",
    tips: ["Garante trabalho simétrico em ambos os braços.", "Use a outra mão livre para apoiar e guiar o braço se necessário."],
    primaryMuscles: ["Tríceps Braquial"],
    secondaryMuscles: ["Ancôneo"],
    defaultSets: 3,
    defaultReps: "12"
  },

  // --- PERNAS (12) ---
  {
    id: "pernas-1",
    name: "Agachamento Livre com Barra",
    category: "Pernas",
    description: "Apoie a barra nos trapézios, afaste os pés na largura dos ombros e agache mandando o quadril para trás até as coxas ficarem paralelas ao chão.",
    tips: ["Mantenha o peito erguido.", "Não deixe os joelhos desabarem para dentro (valgo).", "Calcanhares firmes no chão."],
    primaryMuscles: ["Quadríceps", "Glúteo Máximo"],
    secondaryMuscles: ["Isquiotibiais", "Lombar", "Eretores da Espinha"],
    defaultSets: 4,
    defaultReps: "8-12"
  },
  {
    id: "pernas-2",
    name: "Leg Press 45 Graus",
    category: "Pernas",
    description: "Sentado no aparelho, posicione os pés na plataforma e destrave. Flexione as pernas até 90 graus e empurre sem esticar totalmente as articulações.",
    tips: ["Nunca tire o quadril do banco ao descer o peso.", "Pés inteiros apoiados na plataforma."],
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Isquiotibiais", "Panturrilhas"],
    defaultSets: 4,
    defaultReps: "10-15"
  },
  {
    id: "pernas-3",
    name: "Cadeira Extensora (Isolado)",
    category: "Pernas",
    description: "Sentado na máquina com os joelhos alinhados ao eixo, estenda os joelhos completamente levantando o rolo de peso.",
    tips: ["Esmague as coxas por 1 segundo no topo.", "Mantenha as costas totalmente apoiadas no encosto."],
    primaryMuscles: ["Quadríceps (Foco Reto Femoral)"],
    secondaryMuscles: ["Nenhum (Isolado)"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "pernas-4",
    name: "Mesa Flexora (Isquiotibiais)",
    category: "Pernas",
    description: "Deitado de bruços na mesa, posicione o rolo logo atrás dos tornozelos e flexione as pernas puxando o peso para o quadril.",
    tips: ["Mantenha o quadril fixado ao banco, não o levante.", "Movimento lento e cadenciado na descida."],
    primaryMuscles: ["Isquiotibiais (Posteriores de Coxa)"],
    secondaryMuscles: ["Gastrocnêmio (Panturrilha)"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "pernas-5",
    name: "Agachamento Búlgaro com Halteres",
    category: "Pernas",
    description: "De pé, apoie o peito de um pé em um banco atrás de você. Segure halteres e flexione a perna da frente agachando profundamente.",
    tips: ["Extremamente eficaz para desenvolvimento de pernas e glúteos de forma unilateral.", "Mantenha o joelho da frente alinhado ao pé."],
    primaryMuscles: ["Quadríceps", "Glúteo Máximo"],
    secondaryMuscles: ["Isquiotibiais", "Adutores"],
    defaultSets: 3,
    defaultReps: "10"
  },
  {
    id: "pernas-6",
    name: "Stiff com Halteres ou Barra",
    category: "Pernas",
    description: "De pé com as costas eretas, desça o tronco para a frente mantendo os joelhos quase retos e mandando o quadril para trás até sentir os posteriores alongarem.",
    tips: ["Mantenha a barra ou halteres colados às coxas.", "Coluna absolutamente reta o tempo todo."],
    primaryMuscles: ["Isquiotibiais", "Glúteo Máximo"],
    secondaryMuscles: ["Lombar", "Eretores da Espinha"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "pernas-7",
    name: "Cadeira Flexora (Sentado)",
    category: "Pernas",
    description: "Sentado, ajuste o aparelho e flexione as pernas trazendo os pés para baixo e para trás do banco.",
    tips: ["Menor ativação da lombar em comparação com a mesa flexora.", "Trabalho excelente de contração de pico."],
    primaryMuscles: ["Isquiotibiais"],
    secondaryMuscles: ["Gastrocnêmio"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "pernas-8",
    name: "Agachamento Hack",
    category: "Pernas",
    description: "No aparelho de hack squat, encoste as costas no suporte, destrave e agache com segurança total para a coluna.",
    tips: ["Perfeito para treinar pernas até a falha sem risco de queda de barra.", "Não tire calcanhares da plataforma."],
    primaryMuscles: ["Quadríceps", "Glúteos"],
    secondaryMuscles: ["Isquiotibiais"],
    defaultSets: 4,
    defaultReps: "10"
  },
  {
    id: "pernas-9",
    name: "Passada / Avanço Caminhando",
    category: "Pernas",
    description: "Caminhe dando passos longos para a frente, agachando a cada passo até que o joelho de trás quase toque o solo.",
    tips: ["Excelente exercício dinâmico.", "Mantenha o tronco levemente inclinado à frente se quiser focar em glúteos."],
    primaryMuscles: ["Quadríceps", "Glúteo Máximo"],
    secondaryMuscles: ["Isquiotibiais", "Estabilizadores do Core"],
    defaultSets: 3,
    defaultReps: "20 passos (total)"
  },
  {
    id: "pernas-10",
    name: "Cadeira Adutora",
    category: "Pernas",
    description: "Sentado no aparelho, feche as coxas contra a resistência unindo os joelhos.",
    tips: ["Fortalece a parte interna da coxa.", "Faça movimentos lentos de retorno."],
    primaryMuscles: ["Músculos Adutores da Coxa"],
    secondaryMuscles: ["Nenhum (Isolado)"],
    defaultSets: 3,
    defaultReps: "15"
  },
  {
    id: "pernas-11",
    name: "Gêmeos em Pé (Panturrilhas)",
    category: "Pernas",
    description: "De pé sobre um degrau ou máquina, empurre o corpo para cima estendendo ao máximo o calcanhar e desça o máximo alongando.",
    tips: ["Execute com amplitude total lenta.", "Não fique quicando o peso embaixo."],
    primaryMuscles: ["Gastrocnêmio", "Sóleoda Panturrilha"],
    secondaryMuscles: ["Nenhum"],
    defaultSets: 4,
    defaultReps: "15-20"
  },
  {
    id: "pernas-12",
    name: "Gêmeos Sentado (Sóleoda Panturrilha)",
    category: "Pernas",
    description: "No aparelho sóleo de panturrilha sentado, realize a extensão de tornozelos empurrando o suporte.",
    tips: ["Excelente isolador focado no músculo sóleo.", "Segure 1 segundo na contração máxima."],
    primaryMuscles: ["Sóleo da Panturrilha"],
    secondaryMuscles: ["Nenhum"],
    defaultSets: 4,
    defaultReps: "15-20"
  },

  // --- GLÚTEOS (9) ---
  {
    id: "gluteos-1",
    name: "Elevação Pélvica com Barra",
    category: "Glúteos",
    description: "Apoie as costas altas em um banco, coloque a barra protegida na linha do quadril e empurre a pelve em direção ao teto contraindo os glúteos.",
    tips: ["Esmague os glúteos por 2 segundos no topo.", "Mantenha a canela vertical na contração máxima."],
    primaryMuscles: ["Glúteo Máximo (Foco Principal)"],
    secondaryMuscles: ["Isquiotibiais", "Eretores da Espinha"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "gluteos-2",
    name: "Coice na Polia Baixa (Extensão de Quadril)",
    category: "Glúteos",
    description: "Com caneleira na polia baixa de crossover, empurre a perna estendida para trás e para cima.",
    tips: ["Incline ligeiramente o tronco para a frente.", "Evite rotacionar excessivamente o quadril."],
    primaryMuscles: ["Glúteo Máximo"],
    secondaryMuscles: ["Isquiotibiais"],
    defaultSets: 4,
    defaultReps: "12"
  },
  {
    id: "gluteos-3",
    name: "Abdução de Quadril na Polia",
    category: "Glúteos",
    description: "Com a caneleira na polia baixa, eleve a perna lateralmente para fora.",
    tips: ["Foco intenso no glúteo médio, essencial para estabilização da bacia."],
    primaryMuscles: ["Glúteo Médio", "Tensor da Fáscia Lata"],
    secondaryMuscles: ["Glúteo Mínimo"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "gluteos-4",
    name: "Glúteo 4 Apoios com Caneleira",
    category: "Glúteos",
    description: "Em posição de quatro apoios no colchonete, empurre o calcanhar de uma perna em direção ao teto mantendo o joelho dobrado em 90 graus.",
    tips: ["Não curve a lombar ao chutar para cima, o movimento é isolado no glúteo."],
    primaryMuscles: ["Glúteo Máximo"],
    secondaryMuscles: ["Isquiotibiais"],
    defaultSets: 3,
    defaultReps: "12-15"
  },
  {
    id: "gluteos-5",
    name: "Agachamento Sumô com Halter",
    category: "Glúteos",
    description: "De pé, afaste bem as pernas com as pontas dos pés viradas para fora. Segure um halter e agache profundamente.",
    tips: ["Foco na parte interna das coxas e no glúteo máximo por conta da amplitude."],
    primaryMuscles: ["Glúteo Máximo", "Adutores"],
    secondaryMuscles: ["Quadríceps", "Isquiotibiais"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "gluteos-6",
    name: "Subida no Banco (Step-up)",
    category: "Glúteos",
    description: "Segurando halteres, apoie um pé em uma caixa alta ou banco firme e suba forçando a perna apoiada.",
    tips: ["A descida deve ser super lenta para maximizar o ganho de massa muscular."],
    primaryMuscles: ["Glúteo Máximo", "Quadríceps"],
    secondaryMuscles: ["Isquiotibiais", "Estabilizadores do Core"],
    defaultSets: 3,
    defaultReps: "10 de cada lado"
  },
  {
    id: "gluteos-7",
    name: "Cadeira Abdutora (Inclinada à Frente)",
    category: "Glúteos",
    description: "Sente na máquina de abdução, incline o tronco para a frente e empurre as abas para fora.",
    tips: ["Inclinar para a frente muda o ângulo de ativação focando muito mais no bumbum.", "Segure 2 segundos ao abrir."],
    primaryMuscles: ["Glúteo Médio", "Glúteo Máximo Lateral"],
    secondaryMuscles: ["Piriforme"],
    defaultSets: 4,
    defaultReps: "15"
  },
  {
    id: "gluteos-8",
    name: "Meio Levantamento Terra Sumô",
    category: "Glúteos",
    description: "De pé, com pernas abertas estilo sumô, segure a barra e suba apenas até o meio da coxa, espremendo glúteos intensamente.",
    tips: ["Conexão direta com os glúteos superiores.", "Mantenha a barra perto."],
    primaryMuscles: ["Glúteo Máximo", "Adutores"],
    secondaryMuscles: ["Isquiotibiais", "Lombar"],
    defaultSets: 4,
    defaultReps: "10"
  },
  {
    id: "gluteos-9",
    name: "Elevação Pélvica Unilateral (Peso Corporal)",
    category: "Glúteos",
    description: "Deitado com um pé no chão e a outra perna elevada no ar, empurre o quadril para cima apenas com o apoio da perna ativa.",
    tips: ["Ótimo para corrigir desequilíbrios musculares laterais.", "Perfeito para treinos caseiros."],
    primaryMuscles: ["Glúteo Máximo"],
    secondaryMuscles: ["Isquiotibiais", "Core"],
    defaultSets: 3,
    defaultReps: "15"
  },

  // --- ABDÔMEN (10) ---
  {
    id: "abdomen-1",
    name: "Abdominal Crunch Supra (Colchonete)",
    category: "Abdômen",
    description: "Deitado de costas, pernas flexionadas, flexione o tronco levantando as escápulas do colchonete.",
    tips: ["Não puxe o pescoço com as mãos.", "Solte o ar completamente no topo do movimento na contração máxima."],
    primaryMuscles: ["Reto Abdominal (Parte Superior)"],
    secondaryMuscles: ["Oblíquos"],
    defaultSets: 4,
    defaultReps: "15-20"
  },
  {
    id: "abdomen-2",
    name: "Abdominal Infra (Elevação de Pernas)",
    category: "Abdômen",
    description: "Deitado de costas, eleve as pernas estendidas até 90 graus e desça controladamente sem tocar os pés no chão.",
    tips: ["Mantenha a coluna lombar colada ao colchonete.", "Dobre levemente os joelhos se sentir desconforto lombar."],
    primaryMuscles: ["Reto Abdominal (Parte Inferior)"],
    secondaryMuscles: ["Flexores do Quadril", "Oblíquos"],
    defaultSets: 4,
    defaultReps: "12-15"
  },
  {
    id: "abdomen-3",
    name: "Prancha Abdominal Isométrica",
    category: "Abdômen",
    description: "Apoie os antebraços e as pontas dos pés no chão. Mantenha o corpo perfeitamente reto e estático.",
    tips: ["Não deixe o quadril cair ou subir demais.", "Contraia glúteos e abdômen intensamente."],
    primaryMuscles: ["Transverso do Abdômen", "Estabilizadores Gerais"],
    secondaryMuscles: ["Deltoides", "Glúteos", "Pernas"],
    defaultSets: 3,
    defaultReps: "45 seg"
  },
  {
    id: "abdomen-4",
    name: "Abdominal Bicicleta (Obliquos)",
    category: "Abdômen",
    description: "Deitado, faça movimentos alternados aproximando o cotovelo de um lado do joelho oposto, imitando pedalada.",
    tips: ["Rode bem o tronco para ativar ao máximo os oblíquos.", "Faça sem pressa."],
    primaryMuscles: ["Músculos Oblíquos do Abdômen", "Reto Abdominal"],
    secondaryMuscles: ["Flexores do Quadril"],
    defaultSets: 3,
    defaultReps: "20 repetições"
  },
  {
    id: "abdomen-5",
    name: "Abdominal Canivete (V-up)",
    category: "Abdômen",
    description: "Deitado estendido, dobre o corpo ao meio levantando pernas e braços simultaneamente para se encontrarem no topo.",
    tips: ["Exige excelente nível de flexibilidade e força central.", "Mantenha o controle."],
    primaryMuscles: ["Reto Abdominal Completo"],
    secondaryMuscles: ["Flexores do Quadril", "Estabilizadores"],
    defaultSets: 3,
    defaultReps: "12"
  },
  {
    id: "abdomen-6",
    name: "Abdominal na Roda (Wheel Rollout)",
    category: "Abdômen",
    description: "Apoiado nos joelhos, empurre a roda abdominal para a frente esticando o corpo e retorne forçando o abdômen.",
    tips: ["Não curve a lombar para baixo na descida.", "Extremamente exigente e construtor de abdômen de pedra."],
    primaryMuscles: ["Reto Abdominal", "Transverso do Abdômen"],
    secondaryMuscles: ["Latíssimo do Dorso", "Braços", "Core"],
    defaultSets: 3,
    defaultReps: "8-10"
  },
  {
    id: "abdomen-7",
    name: "Prancha Lateral Isométrica",
    category: "Abdômen",
    description: "Deitado de lado, apoie o antebraço e eleve o quadril mantendo o corpo alinhado.",
    tips: ["Foco na estabilização dos oblíquos e quadril lateral.", "Fique estático."],
    primaryMuscles: ["Oblíquo Interno/Externo"],
    secondaryMuscles: ["Transverso do Abdômen", "Deltoide"],
    defaultSets: 3,
    defaultReps: "30 seg cada lado"
  },
  {
    id: "abdomen-8",
    name: "Abdominal Infra Suspenso na Barra",
    category: "Abdômen",
    description: "Pendurado em barra fixa, eleve as pernas estendidas ou joelhos dobrados até a altura do quadril.",
    tips: ["Tente não balançar o corpo na descida.", "Excelente para a região infra abdominal."],
    primaryMuscles: ["Reto Abdominal (Parte Inferior)"],
    secondaryMuscles: ["Flexores do Quadril", "Pegada das Mãos"],
    defaultSets: 3,
    defaultReps: "10-12"
  },
  {
    id: "abdomen-9",
    name: "Abdominal Oblíquo Alternado deitado",
    category: "Abdômen",
    description: "Deitado de costas, pernas dobradas, toque alternadamente as mãos nos calcanhares girando o tronco.",
    tips: ["Mantenha as escápulas levemente suspensas para manter a contração constante."],
    primaryMuscles: ["Oblíquo Externo", "Reto Abdominal"],
    secondaryMuscles: ["Nenhum"],
    defaultSets: 3,
    defaultReps: "20 (lado)"
  },
  {
    id: "abdomen-10",
    name: "Vacuum Abdominal (LTC)",
    category: "Abdômen",
    description: "De pé ou de quatro apoios, expire todo o ar dos pulmões e puxe o abdômen para dentro sob as costelas o máximo possível por vários segundos.",
    tips: ["Ajuda a reduzir a circunferência abdominal.", "Faça pela manhã em jejum para melhores resultados."],
    primaryMuscles: ["Transverso do Abdômen (Parede Abdominal Interna)"],
    secondaryMuscles: ["Diafragma"],
    defaultSets: 3,
    defaultReps: "20 seg"
  },

  // --- CALISTENIA (16) ---
  {
    id: "calistenia-1",
    name: "Barra Fixa (Pull-up)",
    category: "Calistenia",
    description: "Segure a barra fixa com pegada aberta pronada e puxe o seu peso até passar o queixo da barra.",
    tips: ["Não use impulsos de perna (Kipping) se quiser força pura.", "Alongue completamente embaixo."],
    primaryMuscles: ["Latíssimo do Dorso", "Bíceps", "Braquial"],
    secondaryMuscles: ["Antebraços", "Core", "Romboide"],
    defaultSets: 4,
    defaultReps: "Submáximo"
  },
  {
    id: "calistenia-2",
    name: "Paralelas (Dips)",
    category: "Calistenia",
    description: "Apoie-se em duas barras paralelas, desça o corpo flexionando os cotovelos até 90 graus e empurre para cima.",
    tips: ["Incline-se ligeiramente à frente para recrutar mais peito.", "Mantenha os ombros firmes."],
    primaryMuscles: ["Tríceps Braquial", "Peitoral Inferior"],
    secondaryMuscles: ["Deltoide Anterior"],
    defaultSets: 4,
    defaultReps: "Submáximo"
  },
  {
    id: "calistenia-3",
    name: "Muscle Up",
    category: "Calistenia",
    description: "Puxe explosivamente o corpo acima da barra de barra fixa e mude a transição empurrando com o tríceps em mergulho completo.",
    tips: ["Exercício de calistenia avançado.", "Exige coordenação corporal, força explosiva e pegada falsa."],
    primaryMuscles: ["Latíssimo do Dorso", "Tríceps", "Peito"],
    secondaryMuscles: ["Bíceps", "Ombros", "Core"],
    defaultSets: 3,
    defaultReps: "3-5"
  },
  {
    id: "calistenia-4",
    name: "Front Lever Hold",
    category: "Calistenia",
    description: "Pendurado na barra, puxe-se de forma que o corpo inteiro fique paralelo ao chão de costas, suspenso.",
    tips: ["Movimento isométrico extremamente avançado.", "Contraia latíssimo e abdômen como nunca."],
    primaryMuscles: ["Latíssimo do Dorso", "Core", "Eretores"],
    secondaryMuscles: ["Bíceps", "Ombros", "Dorsais"],
    defaultSets: 4,
    defaultReps: "5-10 seg"
  },
  {
    id: "calistenia-5",
    name: "Back Lever Hold",
    category: "Calistenia",
    description: "Pendurado, gire o corpo de cabeça para baixo e mantenha-se alinhado paralelo ao chão de frente para o solo.",
    tips: ["Grande exigência do bíceps e deltoides anteriores.", "Aqueça bem."],
    primaryMuscles: ["Deltóide Anterior", "Peitoral", "Core"],
    secondaryMuscles: ["Bíceps", "Tríceps", "Lombar"],
    defaultSets: 3,
    defaultReps: "10 seg"
  },
  {
    id: "calistenia-6",
    name: "Handstand Hold (Parada de Mão)",
    category: "Calistenia",
    description: "Fique de ponta-cabeça apoiado apenas nas mãos. Se for iniciante, use apoio da parede.",
    tips: ["Olhe para as mãos para equilibrar melhor.", "Excelente construtor de ombros e punhos de aço."],
    primaryMuscles: ["Deltoides", "Tríceps", "Trapézio"],
    secondaryMuscles: ["Estabilizadores do Core", "Dedos da Mão"],
    defaultSets: 3,
    defaultReps: "20-45 seg"
  },
  {
    id: "calistenia-7",
    name: "Handstand Push-ups (Flexão de Ponta-Cabeça)",
    category: "Calistenia",
    description: "Na posição de parada de mão (geralmente apoiado na parede), desça a cabeça quase tocando o chão e empurre.",
    tips: ["Extremamente difícil, equivale a carregar seu próprio peso em desenvolvimento de ombro.", "Mantenha o corpo reto."],
    primaryMuscles: ["Deltoide Anterior", "Tríceps"],
    secondaryMuscles: ["Peitoral Superior", "Trapézio"],
    defaultSets: 3,
    defaultReps: "5-8"
  },
  {
    id: "calistenia-8",
    name: "L-Sit Hold",
    category: "Calistenia",
    description: "Sentado nas paralelas ou no chão, empurre e eleve o corpo mantendo as pernas esticadas para a frente formando um L.",
    tips: ["Exige muita flexibilidade dos posteriores e força de abdômen infra."],
    primaryMuscles: ["Core", "Flexores do Quadril", "Tríceps"],
    secondaryMuscles: ["Quadríceps", "Ombros"],
    defaultSets: 3,
    defaultReps: "15 seg"
  },
  {
    id: "calistenia-9",
    name: "Flexão Pike (Inclinada com Quadril Alto)",
    category: "Calistenia",
    description: "Com as mãos no chão e o quadril elevado apontando o glúteo para o teto, realize a flexão empurrando a cabeça diagonalmente.",
    tips: ["Versão simplificada para treinar ombros antes de conseguir fazer Handstand Push-ups."],
    primaryMuscles: ["Deltoide Anterior", "Tríceps"],
    secondaryMuscles: ["Peitoral Superior", "Core"],
    defaultSets: 3,
    defaultReps: "10-12"
  },
  {
    id: "calistenia-10",
    name: "Pistol Squat (Agachamento Unilateral)",
    category: "Calistenia",
    description: "Fique de pé em apenas uma perna, estenda a outra para a frente e agache completamente com equilíbrio extremo antes de levantar.",
    tips: ["Excelente força e mobilidade de tornozelo e joelho."],
    primaryMuscles: ["Quadríceps", "Glúteo Máximo"],
    secondaryMuscles: ["Panturrilhas", "Estabilizadores do Quadril"],
    defaultSets: 3,
    defaultReps: "6-8 (lado)"
  },
  {
    id: "calistenia-11",
    name: "Remada Australiana (Row)",
    category: "Calistenia",
    description: "Com uma barra na altura da cintura, deite-se por baixo, segure a barra e puxe o peito em direção a ela com o corpo reto.",
    tips: ["Excelente para iniciantes que ainda não conseguem fazer barra fixa.", "Recruta bem as escápulas."],
    primaryMuscles: ["Costas Gerais", "Bíceps"],
    secondaryMuscles: ["Core", "Antebraços"],
    defaultSets: 4,
    defaultReps: "10-12"
  },
  {
    id: "calistenia-12",
    name: "Tuck Planche Hold",
    category: "Calistenia",
    description: "Apoiando apenas as mãos no chão, incline-se para a frente e tire os joelhos do chão encolhendo-os junto ao peito.",
    tips: ["Primeira variação para construir a planche completa.", "Mantenha os braços absolutamente retos (cotovelos travados)."],
    primaryMuscles: ["Deltoides", "Peitorais", "Core"],
    secondaryMuscles: ["Tríceps", "Punhos"],
    defaultSets: 4,
    defaultReps: "8-12 seg"
  },
  {
    id: "calistenia-13",
    name: "Flexão Explosiva com Palmas (Plyo)",
    category: "Calistenia",
    description: "Realize uma flexão de braço empurrando o chão com tanta força que seu tronco decola, bata palmas no ar e pouse suavemente.",
    tips: ["Aumenta drasticamente a potência do peitoral.", "Pouse amortecendo a queda."],
    primaryMuscles: ["Peitoral Maior", "Tríceps (Potência)"],
    secondaryMuscles: ["Deltoide Anterior"],
    defaultSets: 3,
    defaultReps: "8"
  },
  {
    id: "calistenia-14",
    name: "Dragon Flag (Abdominal Bruce Lee)",
    category: "Calistenia",
    description: "Deitado segurando em um apoio firme atrás da cabeça, eleve o corpo reto inteiro para o ar (pescoço e ombros apoiados apenas) e desça plano.",
    tips: ["Desenvolve força nuclear estúpida no core.", "Mantenha o corpo em tábua rígida."],
    primaryMuscles: ["Core Completo", "Dorsais"],
    secondaryMuscles: ["Glúteos", "Tríceps (Estabilização)"],
    defaultSets: 3,
    defaultReps: "6-8"
  },
  {
    id: "calistenia-15",
    name: "Barra Fixa Supinada (Chin-up)",
    category: "Calistenia",
    description: "Puxe o peso corporal na barra com as palmas voltadas para você.",
    tips: ["Recruta pesadamente os bíceps braquiais além das costas.", "Garante alta força funcional."],
    primaryMuscles: ["Latíssimo do Dorso", "Bíceps Braquial"],
    secondaryMuscles: ["Antebraços", "Trapézio Inferior"],
    defaultSets: 4,
    defaultReps: "Submáximo"
  },
  {
    id: "calistenia-16",
    name: "Planche Completa (Avançado)",
    category: "Calistenia",
    description: "Incline o corpo tanto para frente no chão que suas pernas sobem totalmente estendidas e flutuam no ar paralelas ao chão.",
    tips: ["O auge da calistenia de empurrar.", "Anos de treino consistente necessários."],
    primaryMuscles: ["Deltoide Anterior", "Bíceps", "Core"],
    secondaryMuscles: ["Trapézio", "Glúteos", "Peitoral"],
    defaultSets: 3,
    defaultReps: "3-5 seg"
  }
];
