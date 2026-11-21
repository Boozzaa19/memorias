/* =========================================================
   PEDRO · MEMÓRIAS & REDAÇÕES
   Script principal
   ========================================================= */
(() => {
  'use strict';

  /* -------------------------------------------------------
     UTILIDADES
  ------------------------------------------------------- */
  const normalizar = (texto) =>
    String(texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const html = document.documentElement;

  /* -------------------------------------------------------
     1. TEMA CLARO / ESCURO
  ------------------------------------------------------- */
  const botaoTema = document.getElementById('botao-tema');
  const CHAVE_TEMA = 'pedro-tema';

  const aplicarTema = (tema) => {
    html.setAttribute('data-tema', tema);
    if (botaoTema) {
      botaoTema.setAttribute(
        'aria-label',
        tema === 'escuro' ? 'Ativar tema claro' : 'Ativar tema escuro'
      );
    }
  };

  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  if (temaSalvo === 'escuro' || temaSalvo === 'claro') {
    aplicarTema(temaSalvo);
  } else {
    const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    aplicarTema(prefereEscuro ? 'escuro' : 'claro');
  }

  botaoTema?.addEventListener('click', () => {
    const atual = html.getAttribute('data-tema');
    const novo = atual === 'escuro' ? 'claro' : 'escuro';
    aplicarTema(novo);
    localStorage.setItem(CHAVE_TEMA, novo);
  });

  /* -------------------------------------------------------
     2. CABEÇALHO COM SOMBRA AO ROLAR
  ------------------------------------------------------- */
  const cabecalho = document.getElementById('cabecalho');
  const botaoTopo = document.getElementById('botao-topo');

  const aoRolar = () => {
    const y = window.scrollY;
    cabecalho?.classList.toggle('rolado', y > 10);
    botaoTopo?.classList.toggle('visivel', y > 420);
  };
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  botaoTopo?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------
     3. ANIMAÇÕES DE ENTRADA (REVEAL)
  ------------------------------------------------------- */
  const elementosReveal = document.querySelectorAll('.reveal');
  const prefereReduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefereReduzir || !('IntersectionObserver' in window)) {
    elementosReveal.forEach((el) => el.classList.add('visivel'));
  } else {
    const obsReveal = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            obsReveal.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    elementosReveal.forEach((el) => obsReveal.observe(el));
  }

  /* -------------------------------------------------------
     4. LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
  ------------------------------------------------------- */
  const linksNav = document.querySelectorAll('.nav__link');
  const secoes = ['inicio', 'memorias', 'capsula', 'amizades', 'redacoes']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window && secoes.length) {
    const obsSecoes = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const id = entrada.target.id;
          linksNav.forEach((link) => {
            link.classList.toggle('ativo', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    secoes.forEach((secao) => obsSecoes.observe(secao));
  }

  /* -------------------------------------------------------
     5. REDAÇÕES
  ------------------------------------------------------- */
  const redacoes = [
    {
      numero: '01',
      tema: 'Obsolescência tecnológica e descarte de resíduos eletrônicos',
      conteudo: `<p>O avanço tecnológico transformou a sociedade brasileira, facilitando a comunicação e o acesso à informação. Entretanto, a constante substituição de aparelhos eletrônicos contribui para o aumento do lixo eletrônico. Nesse cenário, a obsolescência tecnológica representa um desafio para a sustentabilidade, uma vez que o descarte inadequado desses equipamentos provoca impactos ambientais e sociais. Assim, torna-se necessário incentivar o consumo consciente e ampliar a destinação correta desses resíduos.</p>
      <p>Em primeiro lugar, o consumo excessivo de equipamentos eletrônicos está diretamente relacionado à obsolescência tecnológica. Muitos consumidores trocam celulares e computadores mesmo quando ainda estão em funcionamento, seja pela influência da publicidade, seja pelo lançamento frequente de novos modelos. Essa prática aumenta a quantidade de resíduos e intensifica a exploração dos recursos naturais. Além disso, os componentes eletrônicos descartados incorretamente podem liberar substâncias prejudiciais ao solo e à água, comprometendo os ecossistemas e a saúde humana.</p>
      <p>Outro aspecto importante é a dificuldade de garantir a coleta e a reciclagem desses materiais em todo o território nacional. Embora existam iniciativas de logística reversa, muitos brasileiros desconhecem os locais apropriados para entregar aparelhos eletrônicos sem utilidade. Nesse sentido, a educação ambiental pode incentivar hábitos sustentáveis, como prolongar a vida útil dos equipamentos, realizar consertos e encaminhar aparelhos antigos para pontos de coleta. Dessa forma, a participação das empresas e do poder público torna-se essencial para melhorar a gestão dos resíduos eletrônicos.</p>
      <p>Portanto, cabe ao Governo Federal, em parceria com estados, municípios e empresas de tecnologia, ampliar os pontos de coleta e fortalecer os programas de logística reversa, por meio de investimentos e campanhas de conscientização. Além disso, as escolas devem promover ações educativas sobre consumo consciente e descarte correto, enquanto as empresas precisam facilitar o reparo e a reciclagem de seus produtos. Assim, será possível reduzir os impactos ambientais, preservar os recursos naturais e construir uma sociedade mais sustentável e responsável.</p>`
    },
    {
      numero: '02',
      tema: 'El Niño e mudanças climáticas: desafios para a preparação da sociedade diante de eventos extremos',
      conteudo: `<p>O fenômeno El Niño, caracterizado pelo aquecimento anormal das águas do Oceano Pacífico Equatorial, provoca alterações significativas no clima de diversas regiões do planeta. No Brasil, seus efeitos podem ser percebidos por meio de secas prolongadas, chuvas intensas e ondas de calor. Além disso, as mudanças climáticas, agravadas pelas atividades humanas, tornam esses acontecimentos ainda mais preocupantes. Diante desse cenário, a falta de planejamento e a desigualdade social dificultam a preparação da sociedade para enfrentar eventos extremos, colocando em risco vidas humanas e o desenvolvimento econômico. Assim, é essencial investir em prevenção e conscientização para reduzir os impactos dessas situações.</p>
      <p>Em primeiro lugar, é importante compreender que o El Niño, associado ao aquecimento global, pode intensificar problemas ambientais já existentes. Enquanto algumas regiões enfrentam estiagens que prejudicam a agricultura e o abastecimento de água, outras sofrem com enchentes e deslizamentos. Um exemplo marcante foram as inundações ocorridas no Rio Grande do Sul, em 2024, que deixaram milhares de pessoas desabrigadas e causaram grandes prejuízos. Esses acontecimentos demonstram que os eventos extremos não são apenas fenômenos naturais, mas também desafios sociais que exigem planejamento, infraestrutura adequada e responsabilidade coletiva. A ausência de sistemas eficientes de alerta e de políticas preventivas contribui para aumentar os danos e dificultar a recuperação das comunidades atingidas.</p>
      <p>Além disso, a desigualdade social torna determinadas parcelas da população mais vulneráveis aos desastres climáticos. Famílias que vivem em áreas de risco, em moradias precárias e sem acesso adequado aos serviços públicos enfrentam maiores dificuldades para se proteger. Muitas vezes, essas pessoas não possuem recursos para reconstruir suas casas ou recuperar seus meios de sustento após uma tragédia. Por isso, a preparação da sociedade deve incluir não apenas investimentos tecnológicos, mas também ações que garantam proteção e assistência às comunidades mais necessitadas. A educação ambiental também é fundamental para ensinar a população a reconhecer riscos e agir de maneira segura.</p>
      <p>Portanto, cabe ao Governo Federal, em parceria com estados e municípios, ampliar o monitoramento climático, fortalecer os sistemas de alerta e investir em obras de prevenção, como drenagem e contenção de encostas. Também devem ser promovidas campanhas educativas nas escolas e comunidades, além de programas de moradia segura para famílias vulneráveis. Dessa forma, será possível reduzir os impactos do El Niño e das mudanças climáticas, proteger vidas e construir uma sociedade mais consciente, solidária e preparada para enfrentar eventos extremos.</p>`
    },
    {
      numero: '03',
      tema: 'Migração e acolhimento: desafios da convivência em contextos globais',
      conteudo: `<p>Ao longo da história, a migração sempre esteve presente na sociedade, seja pela busca por melhores condições de vida, seja pela necessidade de fugir de guerras, conflitos e crises econômicas. Nesse contexto, muitas pessoas deixam seus países de origem na esperança de encontrar segurança e novas oportunidades. Entretanto, ao chegarem a outros lugares, enfrentam dificuldades de adaptação, preconceito e falta de acolhimento. Dessa forma, a convivência entre diferentes culturas tornou-se um desafio importante para a construção de uma sociedade mais justa e respeitosa.</p>
      <p>Em primeiro lugar, é importante destacar que os imigrantes frequentemente enfrentam obstáculos para conseguir emprego, moradia e acesso à educação. Além disso, a dificuldade de falar outro idioma pode tornar a adaptação ainda mais complicada. Muitas vezes, essas pessoas são julgadas por sua nacionalidade, aparência ou costumes, o que dificulta sua integração na comunidade. Essa realidade demonstra que, apesar de vivermos em um mundo globalizado, ainda existem barreiras sociais e culturais que impedem uma convivência harmoniosa entre os povos.</p>
      <p>Outro problema que merece atenção é a falta de políticas públicas eficientes para receber e integrar os migrantes. Os governos precisam oferecer apoio, garantir direitos básicos e criar oportunidades para que essas pessoas reconstruam suas vidas com dignidade. As escolas também possuem um papel fundamental, pois podem incentivar o respeito às diferenças e combater atitudes preconceituosas desde cedo. Além disso, a população deve compreender que os imigrantes não representam uma ameaça, mas podem contribuir para o desenvolvimento econômico, cultural e social do país que os recebe.</p>
      <p>Portanto, a migração e o acolhimento exigem esforços conjuntos entre governos e sociedade. Para isso, é necessário ampliar programas de assistência, facilitar o acesso aos serviços públicos e promover campanhas educativas contra a xenofobia. Essas medidas devem ser realizadas com o objetivo de garantir que todos sejam tratados com respeito, independentemente de sua origem. Afinal, ninguém deveria ser discriminado por buscar uma vida melhor. Assim, com empatia, solidariedade e responsabilidade, será possível construir um mundo mais acolhedor, no qual as diferenças sejam valorizadas e a convivência entre os povos aconteça de maneira pacífica.</p>`
    },
    {
      numero: '04',
      tema: 'Espécies em extinção e equilíbrio ecológico: desafios para a conservação da fauna brasileira',
      conteudo: `<p>A Constituição Federal de 1988 estabelece que todos têm direito a um meio ambiente ecologicamente equilibrado e preservado. Porém, mesmo com essa garantia, muitas espécies de animais brasileiros continuam ameaçadas de extinção. O desmatamento, as queimadas e a caça ilegal estão entre os principais fatores responsáveis por esse problema. Nesse contexto, a falta de fiscalização e a destruição dos habitats naturais representam grandes desafios para a conservação da fauna brasileira.</p>
      <p>Em primeiro lugar, um dos problemas mais preocupantes é a destruição dos habitats naturais. Quando uma floresta é derrubada, muitos animais perdem suas fontes de alimento, seus abrigos e até mesmo os locais necessários para sua reprodução. Além disso, o tráfico de animais silvestres também prejudica o meio ambiente, pois retira espécies de seus habitats naturais e pode reduzir significativamente suas populações.</p>
      <p>Outro aspecto importante é o papel dos animais no equilíbrio ambiental. Cada espécie desempenha uma função na natureza e, quando uma delas desaparece, outras também podem ser prejudicadas, provocando alterações na cadeia alimentar e no equilíbrio dos ecossistemas. Dessa maneira, proteger os animais não é apenas uma questão de preservação da natureza, mas também uma forma de garantir um futuro melhor para a sociedade.</p>
      <p>Portanto, é necessário que o Governo Federal amplie a fiscalização e combata o desmatamento, as queimadas e o tráfico de animais silvestres, por meio de investimentos em órgãos ambientais e ações de proteção. Além disso, as escolas devem promover projetos de educação ambiental, conscientizando os estudantes sobre a importância da preservação da fauna brasileira. Assim, será possível proteger as espécies ameaçadas e manter o equilíbrio ambiental para as próximas gerações.</p>`
    },
    {
      numero: '05',
      tema: 'Exploração espacial no século XXI: desafios para a conciliação entre avanço científico e responsabilidade social',
      conteudo: `<p>A exploração espacial sempre despertou a curiosidade humana e, no século XXI, deixou de ser apenas um sonho distante para se tornar uma realidade cada vez mais presente. O avanço tecnológico possibilitou o desenvolvimento de foguetes, satélites e sondas capazes de estudar outros planetas e ampliar o conhecimento sobre o Universo. Entretanto, o espaço também passou a ser utilizado para fins militares. Durante a Guerra Fria, os Estados Unidos e a União Soviética disputaram influência e desenvolveram tecnologias espaciais que também possuíam importância estratégica. Diante desse cenário, a Organização das Nações Unidas (ONU) participou da criação de acordos internacionais para evitar uma corrida armamentista no espaço.</p>
      <p>Em primeiro lugar, destaca-se a importância do Tratado do Espaço Sideral, que entrou em vigor em 1967. Esse acordo proíbe a colocação de armas nucleares e outras armas de destruição em massa em órbita, além de estabelecer que a Lua e os demais corpos celestes devem ser utilizados exclusivamente para fins pacíficos. Entretanto, apesar desse compromisso internacional, o assunto continua sendo um desafio, pois o tratado não proibiu todas as atividades militares relacionadas ao espaço. Dessa maneira, países como os Estados Unidos mantiveram e desenvolveram sistemas espaciais voltados à comunicação, à observação e à segurança.</p>
      <p>Outro aspecto importante é a preocupação das grandes potências com a própria segurança e a proteção de suas estruturas estratégicas. Ao mesmo tempo, outros países demonstram receio diante da possibilidade de uma nova corrida armamentista espacial. Nesse contexto, a ONU reconhece o Tratado de 1967 como uma das principais bases do direito espacial internacional, mas existem discussões sobre a necessidade de fortalecer as normas existentes para acompanhar os avanços tecnológicos. Assim, torna-se fundamental buscar um equilíbrio entre o desenvolvimento científico, a segurança internacional e a responsabilidade social.</p>
      <p>Portanto, a Organização das Nações Unidas deve fortalecer a cooperação internacional e incentivar a criação de acordos que garantam o uso pacífico do espaço, por meio de reuniões diplomáticas e da atualização das normas internacionais. Além disso, os governos e as empresas devem priorizar o desenvolvimento de tecnologias que tragam benefícios à sociedade, como melhorias nas comunicações, na previsão do tempo e no monitoramento ambiental. Dessa forma, a exploração do Universo continuará representando uma conquista da humanidade, sem transformar o espaço em um novo campo de conflitos, garantindo que seus avanços beneficiem toda a população.</p>`
    },
    {
      numero: '06',
      tema: 'Os desafios para a preservação dos monumentos históricos no Brasil contemporâneo',
      conteudo: `<p>Os monumentos históricos brasileiros representam muito mais do que construções antigas espalhadas pelas cidades. Eles fazem parte da memória do país e ajudam a compreender acontecimentos, culturas e costumes de diferentes épocas. Igrejas, casarões, praças e outros patrimônios contam histórias que muitas vezes não aparecem nos livros. Porém, preservar esses espaços ainda é um grande desafio no Brasil contemporâneo. A falta de investimentos, o abandono e a pouca conscientização da população podem fazer com que importantes patrimônios sejam destruídos ou percam suas características originais. Dessa forma, cuidar desses locais significa também proteger parte da identidade e da história brasileira.</p>
      <p>Um dos principais problemas é a falta de manutenção adequada. Muitos monumentos precisam de reformas constantes, mas nem sempre existem recursos suficientes para realizar esses trabalhos. Além disso, a ação do tempo, as chuvas, a poluição e outros fatores podem acelerar a deterioração das construções. Outro ponto importante é a falta de conhecimento da própria população sobre o valor desses lugares. Quando um monumento é visto apenas como uma construção velha, torna-se mais difícil criar uma relação de cuidado e respeito com ele. Por isso, escolas, comunidades e órgãos públicos precisam trabalhar juntos para mostrar às novas gerações a importância desses patrimônios.</p>
      <p>Portanto, preservar os monumentos históricos exige responsabilidade tanto do poder público quanto da sociedade. É necessário aumentar os investimentos em restauração e manutenção, além de criar projetos educativos que aproximem os jovens da história e da cultura de suas próprias cidades. A tecnologia também pode contribuir, por meio de registros digitais, visitas virtuais e bancos de informações sobre os patrimônios. Mais do que conservar prédios antigos, preservar esses monumentos é garantir que as próximas gerações tenham a oportunidade de conhecer suas origens e entender melhor o caminho percorrido pelo país. Assim, o patrimônio histórico poderá continuar vivo, não apenas como lembrança do passado, mas como parte importante do presente e do futuro do Brasil.</p>`
    },
    {
      numero: '07',
      tema: 'Consumo, mídia e cultura: como referências mediadas por algoritmos influenciam os modos de vida na sociedade contemporânea',
      conteudo: `<p>A tecnologia está cada vez mais presente no cotidiano das pessoas, influenciando a maneira como consumimos, pensamos e nos relacionamos com a cultura. Nas redes sociais, os algoritmos selecionam conteúdos com base em nossos interesses, pesquisas e comportamentos. Dessa forma, muitas vezes somos influenciados por propagandas, vídeos e tendências sem perceber. Nesse contexto, a influência dos algoritmos sobre os hábitos de consumo e o comportamento social torna-se um assunto cada vez mais relevante.</p>
      <p>Em primeiro lugar, os algoritmos contribuem para a rápida disseminação de músicas, roupas, opiniões e diferentes estilos de vida. Um vídeo ou produto que se torna popular pode despertar o interesse de milhares de pessoas, incentivando o consumo e a reprodução de determinados comportamentos. Assim, as redes sociais passam a exercer um papel importante na formação dos hábitos e desejos da sociedade, principalmente entre os jovens.</p>
      <p>Além disso, a exposição constante a conteúdos personalizados pode limitar o contato com diferentes opiniões e influenciar a maneira como as pessoas enxergam o mundo. Por isso, desenvolver o senso crítico diante das informações compartilhadas nas redes sociais é fundamental. Nem tudo o que vemos representa a realidade ou corresponde às nossas verdadeiras necessidades. Saber analisar os conteúdos e refletir antes de tomar decisões permite fazer escolhas mais conscientes e evitar influências excessivas.</p>
      <p>Portanto, é fundamental incentivar a educação digital, principalmente entre os jovens, por meio de campanhas educativas e atividades escolares que ensinem a identificar conteúdos manipulativos e analisar informações. Além disso, as plataformas digitais devem oferecer maior transparência sobre o funcionamento de seus algoritmos. Dessa maneira, será possível utilizar a tecnologia de forma mais consciente, permitindo que cada indivíduo desenvolva sua própria identidade e faça escolhas com maior autonomia.</p>`
    },
    {
      numero: '08',
      tema: 'Povos originários e direitos constitucionais: desafios para a efetivação da cidadania indígena no Brasil',
      conteudo: `<p>Durante séculos, a história do Brasil foi marcada pela resistência dos povos indígenas diante da violência, da perda de seus territórios e do apagamento de suas identidades culturais. Nesse sentido, a Constituição Federal de 1988 representou um importante avanço ao reconhecer os direitos desses povos, assegurando a proteção de suas terras, culturas, línguas e tradições. Entretanto, apesar das garantias previstas na legislação, a cidadania indígena ainda enfrenta obstáculos para se concretizar plenamente no país, principalmente devido à negligência estatal e à persistência do preconceito social.</p>
      <p>Em primeiro lugar, destaca-se a omissão do Estado como um dos principais fatores que dificultam a efetivação dos direitos indígenas. Isso ocorre porque a demora nos processos de demarcação de terras favorece conflitos territoriais, ameaçando a segurança e a autonomia das comunidades. Além disso, a precariedade no acesso à educação e à saúde evidencia a desigualdade enfrentada por esses povos. Dessa maneira, percebe-se que a existência de leis não é suficiente quando faltam medidas concretas para garantir seu cumprimento.</p>
      <p>Ademais, o preconceito e a desvalorização cultural contribuem para a exclusão social dos povos originários. Isso porque muitos indígenas ainda são vítimas de estereótipos e discriminação, o que dificulta o reconhecimento de sua diversidade e de sua importância para a formação histórica e cultural do Brasil. Nesse contexto, a falta de representatividade nos espaços de decisão também limita a participação dessas comunidades na defesa de seus próprios interesses, perpetuando desigualdades e dificultando o exercício pleno da cidadania.</p>
      <p>Portanto, é fundamental que o Governo Federal, por meio da Fundação Nacional dos Povos Indígenas (FUNAI) e do Ministério dos Povos Indígenas, intensifique as políticas públicas destinadas à proteção das comunidades originárias. Para isso, deve acelerar os processos de demarcação territorial, ampliar os investimentos em saúde e educação e garantir a participação dos representantes indígenas nas decisões políticas. Paralelamente, o Ministério da Educação deve promover campanhas educativas nas escolas, por meio de palestras e atividades culturais, a fim de combater o preconceito e valorizar a diversidade indígena. Assim, será possível transformar os direitos garantidos pela Constituição em realidade e construir uma sociedade verdadeiramente democrática e inclusiva.</p>`
    },
    {
      numero: '09',
      tema: 'Cultura fitness: bem-estar ou busca por estética inatingível',
      conteudo: `<p>A Constituição Federal de 1988 assegura a todos os cidadãos o direito à saúde e ao bem-estar. Nesse contexto, a cultura fitness ganhou grande destaque na sociedade contemporânea, sendo associada à prática de exercícios físicos, à alimentação equilibrada e à adoção de hábitos saudáveis. Entretanto, embora contribua para a qualidade de vida, esse movimento também tem sido marcado pela valorização excessiva de padrões estéticos. Dessa forma, a influência das redes sociais e a pressão social pela aparência ideal tornam-se obstáculos para uma relação saudável com o próprio corpo.</p>
      <p>Em primeiro lugar, é importante destacar o papel das redes sociais na disseminação de padrões de beleza muitas vezes inalcançáveis. Plataformas digitais, como Instagram e TikTok, divulgam frequentemente imagens de corpos extremamente musculosos ou com baixos índices de gordura, criando uma percepção distorcida sobre a aparência física. Nesse sentido, o sociólogo Zygmunt Bauman, ao abordar a sociedade de consumo, evidencia como os indivíduos são constantemente influenciados por padrões e expectativas sociais. Assim, muitos jovens passam a comparar sua aparência com imagens idealizadas, desenvolvendo sentimentos de frustração, insegurança e insatisfação pessoal.</p>
      <p>Além disso, a busca excessiva pelo corpo considerado perfeito pode comprometer a saúde física e mental dos indivíduos. Isso ocorre porque a prática de atividades físicas, que deveria ser motivada principalmente pelo bem-estar e pela qualidade de vida, muitas vezes é realizada de forma compulsiva. Nesse sentido, a busca por resultados rápidos leva muitos indivíduos a adotarem dietas restritivas, suplementos sem orientação profissional e rotinas exaustivas de treino. Como consequência, podem surgir lesões, transtornos alimentares e quadros de ansiedade, comprometendo a saúde física e mental. Dessa forma, a preocupação com a aparência se sobrepõe aos cuidados com o próprio organismo, contrariando o direito à saúde garantido pela Constituição.</p>
      <p>Portanto, é necessário promover uma relação mais saudável com o corpo e combater a valorização excessiva de padrões estéticos. Para isso, o Ministério da Saúde, em parceria com o Ministério da Educação, deve ampliar campanhas de conscientização sobre os riscos da busca desenfreada pela estética ideal, por meio de palestras, materiais informativos e ações nas redes sociais. Além disso, as escolas devem promover debates sobre autoestima, diversidade corporal e saúde mental, com o objetivo de desconstruir padrões irreais e incentivar o cuidado com o bem-estar. Assim, será possível garantir que a cultura fitness contribua para a qualidade de vida, e não para a insatisfação e o adoecimento.</p>`
    },
    {
      numero: '10',
      tema: 'O desafio de reduzir as desigualdades entre as regiões do Brasil',
      conteudo: `<p>A Constituição Federal de 1988 estabelece que todos os cidadãos possuem direitos fundamentais, como moradia, segurança e condições dignas de vida. Entretanto, essa garantia ainda não se concretiza para grande parte da população brasileira, principalmente para os habitantes de regiões periféricas e comunidades em situação de vulnerabilidade. Nesse contexto, a desigualdade socioeconômica e a falta de investimentos em infraestrutura e oportunidades profissionais dificultam a construção de uma sociedade mais justa.</p>
      <p>Em primeiro lugar, é importante destacar a desigualdade regional como um dos principais fatores responsáveis pela precariedade das condições de vida no Brasil. Em diversas áreas do Nordeste, por exemplo, a falta de investimentos e de oportunidades de emprego dificulta o desenvolvimento econômico e social da população. Como consequência, muitas famílias enfrentam dificuldades para ter acesso à moradia adequada, ao saneamento básico e a serviços essenciais. Essa realidade demonstra que a ausência de políticas públicas eficientes contribui para a permanência da pobreza e da exclusão social.</p>
      <p>Além disso, a falta de infraestrutura e de segurança em comunidades periféricas representa outro grave problema. Em determinadas favelas do Rio de Janeiro, por exemplo, a atuação de organizações criminosas interfere diretamente na rotina dos moradores, limitando sua liberdade e colocando em risco sua segurança. Somam-se a isso as moradias construídas em condições precárias, as instalações elétricas irregulares e a ausência de serviços básicos, situações que aumentam a vulnerabilidade dessas comunidades. Dessa maneira, percebe-se que a desigualdade social não está relacionada apenas à renda, mas também à falta de acesso a direitos fundamentais.</p>
      <p>Portanto, é necessário que o Governo Federal, em parceria com os governos estaduais e municipais, desenvolva políticas públicas voltadas à redução da desigualdade social. Para isso, devem ser ampliados os investimentos em infraestrutura, saneamento básico, habitação e segurança, além da oferta gratuita de cursos profissionalizantes e programas de capacitação para os moradores de comunidades vulneráveis. Essas medidas devem ocorrer por meio de investimentos públicos e parcerias com instituições de ensino e empresas, com o objetivo de ampliar as oportunidades de emprego e melhorar as condições de vida da população. Assim, será possível reduzir as desigualdades e promover uma sociedade mais digna e igualitária.</p>`
    },
    {
      numero: '11',
      tema: 'Da diversão ao endividamento: efeitos socioeconômicos das bets na vida de jovens brasileiros',
      conteudo: `<p>A Constituição Federal de 1988 estabelece a proteção dos direitos sociais e o dever do Estado de promover o bem-estar da população. Entretanto, no Brasil contemporâneo, o crescimento das plataformas de apostas esportivas, conhecidas como bets, representa um desafio para a garantia desses direitos, principalmente entre os jovens. Nesse cenário, a influência da publicidade digital e a falta de educação financeira contribuem para o uso irresponsável dessas plataformas, ocasionando consequências econômicas e sociais preocupantes.</p>
      <p>Em primeiro lugar, é importante destacar a influência das redes sociais na popularização das apostas esportivas. Isso ocorre porque influenciadores digitais e campanhas publicitárias frequentemente apresentam as bets como uma oportunidade de obter dinheiro rapidamente, sem evidenciar adequadamente os riscos envolvidos. Nesse sentido, o sociólogo Zygmunt Bauman, ao discutir a sociedade de consumo, demonstra como os indivíduos são incentivados a buscar satisfação imediata. Dessa forma, muitos jovens passam a enxergar as apostas como uma possibilidade de lucro fácil, sem considerar as consequências que essa prática pode trazer para sua vida financeira.</p>
      <p>Além disso, a falta de educação financeira contribui para o endividamento dos jovens. Isso ocorre porque muitos apostadores não possuem conhecimento adequado sobre gestão de recursos e acabam comprometendo parte significativa de sua renda em jogos de azar. Como consequência, famílias inteiras podem ser afetadas por dívidas, e os jovens podem desenvolver comportamentos compulsivos que prejudicam seus estudos, suas relações pessoais e sua saúde mental. Nesse sentido, o fácil acesso às plataformas digitais e a promessa de retorno financeiro rápido agravam ainda mais esse cenário.</p>
      <p>Portanto, é fundamental combater os efeitos socioeconômicos negativos das bets na vida dos jovens brasileiros. Para isso, o Governo Federal, em parceria com o Ministério da Educação e o Banco Central, deve promover programas de educação financeira nas escolas e nas comunidades, por meio de palestras, oficinas e materiais informativos. Além disso, as plataformas de apostas devem ser regulamentadas de forma mais rigorosa, com restrições à publicidade direcionada ao público jovem e mecanismos de alerta sobre os riscos do jogo compulsivo. Assim, será possível proteger os jovens do endividamento e garantir que o lazer não se transforme em problema social.</p>`
    },
    {
      numero: '12',
      tema: 'Inclusão digital no Brasil: caminhos e desafios na sociedade contemporânea',
      conteudo: `<p>A Constituição Federal de 1988 garante a todos os cidadãos o direito à educação e à igualdade de oportunidades. Entretanto, na sociedade brasileira contemporânea, a inclusão digital ainda representa um grande desafio, visto que milhões de pessoas enfrentam dificuldades para acessar a internet e utilizar recursos tecnológicos. Nesse contexto, a desigualdade socioeconômica e a falta de infraestrutura tecnológica contribuem para a permanência da exclusão digital no país.</p>
      <p>Em primeiro lugar, é importante destacar que a desigualdade econômica dificulta o acesso de grande parte da população às tecnologias. Isso ocorre porque famílias de baixa renda nem sempre possuem condições financeiras para adquirir computadores, celulares e contratar serviços de internet de qualidade. Nesse sentido, o educador Paulo Freire defendia a educação como instrumento de transformação social. Entretanto, quando estudantes não possuem acesso adequado aos recursos digitais, suas oportunidades de aprendizagem são limitadas, dificultando o desenvolvimento acadêmico e profissional.</p>
      <p>Além disso, a falta de infraestrutura tecnológica em regiões rurais e periféricas intensifica esse problema. Em diversas localidades afastadas dos grandes centros urbanos, a conexão com a internet é limitada ou inexistente, dificultando o acesso a serviços públicos, informações e oportunidades de trabalho. Ademais, mesmo entre aqueles que possuem acesso à internet, a ausência de capacitação tecnológica pode impedir o uso seguro e produtivo dessas ferramentas. Dessa forma, percebe-se que a exclusão digital não está relacionada apenas à falta de equipamentos, mas também à ausência de conhecimentos necessários para utilizar a tecnologia.</p>
      <p>Portanto, é fundamental combater a exclusão digital no Brasil. Para isso, o Governo Federal, em parceria com o Ministério das Comunicações e as instituições de ensino, deve ampliar os investimentos em infraestrutura tecnológica e promover programas gratuitos de capacitação digital, por meio da instalação de redes de internet em regiões vulneráveis, da disponibilização de equipamentos e da realização de cursos nas escolas e comunidades. Essas medidas devem priorizar famílias de baixa renda e localidades afastadas, com o objetivo de democratizar o acesso à tecnologia e ampliar as oportunidades educacionais e profissionais. Assim, será possível construir uma sociedade mais inclusiva, conectada e igualitária.</p>`
    },
    {
      numero: '13',
      tema: 'Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente',
      conteudo: `<p>A Constituição Federal de 1988 estabelece a importância da preservação ambiental e garante a todos o direito a um meio ambiente ecologicamente equilibrado. Nesse contexto, o agronegócio possui grande relevância para a economia brasileira, sendo responsável pela geração de empregos, produção de alimentos e exportações. Entretanto, conciliar o crescimento agrícola com a preservação dos recursos naturais ainda representa um grande desafio. Dessa forma, a exploração inadequada do meio ambiente e a falta de fiscalização eficiente dificultam o desenvolvimento de uma agricultura sustentável.</p>
      <p>Em primeiro lugar, é importante destacar que a expansão das atividades agrícolas pode provocar impactos ambientais significativos quando realizada sem planejamento adequado. O desmatamento, as queimadas e o uso excessivo de agrotóxicos prejudicam a biodiversidade, contaminam os recursos hídricos e comprometem a qualidade do solo. Nesse sentido, o desenvolvimento econômico não deve ocorrer em detrimento da preservação ambiental, uma vez que os recursos naturais são essenciais para a manutenção da vida e da própria produção agrícola.</p>
      <p>Além disso, a falta de fiscalização e de incentivo às práticas sustentáveis contribui para a permanência desse problema. Muitos produtores enfrentam dificuldades para implementar tecnologias e métodos de produção que reduzam os impactos ambientais. Entretanto, técnicas como a rotação de culturas, a agricultura de precisão e o uso consciente da água permitem aumentar a produtividade sem ampliar necessariamente a exploração dos recursos naturais. Assim, a ausência de investimentos e de orientação técnica dificulta a adoção de práticas agrícolas mais responsáveis.</p>
      <p>Portanto, é fundamental promover a sustentabilidade no agronegócio brasileiro. Para isso, o Ministério da Agricultura e Pecuária, em parceria com o Ministério do Meio Ambiente, deve ampliar os incentivos aos produtores que adotam práticas sustentáveis, por meio de linhas de crédito, assistência técnica e programas de capacitação. Além disso, os órgãos ambientais devem intensificar a fiscalização contra o desmatamento e as queimadas ilegais, a fim de garantir o cumprimento das leis ambientais. Dessa maneira, será possível fortalecer a produção agrícola, preservar os recursos naturais e construir um agronegócio mais responsável para as futuras gerações.</p>`
    },
    {
      numero: '14',
      tema: 'O uso da Inteligência Artificial e as deepfakes: o que é real e o que é fictício na vida online?',
      conteudo: `<p>Na sociedade contemporânea, o avanço da Inteligência Artificial (IA) tem transformado significativamente a maneira como as pessoas produzem e consomem informações. Entretanto, o desenvolvimento de tecnologias como as deepfakes, capazes de criar vídeos, áudios e imagens falsos com aparência realista, representa um desafio para a sociedade. Nesse contexto, a disseminação de notícias falsas e a falta de educação digital contribuem para a manipulação de informações e para a perda de confiança no ambiente virtual.</p>
      <p>Em primeiro lugar, é importante destacar que as deepfakes podem ser utilizadas como instrumentos de desinformação. Isso ocorre porque a criação de conteúdos falsos cada vez mais realistas dificulta a identificação daquilo que é verdadeiro, permitindo a manipulação da opinião pública e a divulgação de informações enganosas. Nesse sentido, o filósofo Zygmunt Bauman, ao abordar as características da sociedade contemporânea, destaca a fragilidade das relações e das referências sociais na modernidade. Dessa maneira, em um ambiente digital marcado pela rápida circulação de informações, a dificuldade de verificar a veracidade dos conteúdos pode comprometer a confiança da população nos meios de comunicação.</p>
      <p>Além disso, a falta de conhecimento sobre o funcionamento das ferramentas digitais aumenta a vulnerabilidade dos usuários. Isso acontece porque muitas pessoas compartilham vídeos, imagens e áudios sem verificar sua origem ou autenticidade. Como consequência, conteúdos manipulados podem prejudicar a reputação de indivíduos, provocar conflitos sociais e favorecer golpes virtuais. Assim, percebe-se que a ausência de educação digital representa um obstáculo para o uso seguro e responsável das novas tecnologias.</p>
      <p>Portanto, é fundamental combater os impactos negativos das deepfakes no Brasil. Para isso, o Governo Federal, em parceria com o Ministério da Educação e as empresas de tecnologia, deve promover campanhas de conscientização e programas de educação digital nas escolas e nas redes sociais, por meio de palestras, materiais informativos e ferramentas de verificação de conteúdo. Além disso, as plataformas digitais devem aperfeiçoar os mecanismos de identificação de materiais manipulados e facilitar a denúncia de conteúdos fraudulentos. Essas medidas devem ter como finalidade reduzir a desinformação e proteger os usuários contra possíveis manipulações. Dessa forma, será possível construir um ambiente virtual mais seguro, ético e confiável.</p>`
    },
    {
      numero: '15',
      tema: 'A estética como imperativo: riscos e implicações do uso indiscriminado de canetas emagrecedoras',
      conteudo: `<p>Na sociedade contemporânea, a valorização excessiva dos padrões estéticos tem influenciado diretamente a maneira como os indivíduos enxergam o próprio corpo. Nesse contexto, as chamadas canetas emagrecedoras, medicamentos utilizados no tratamento de determinadas condições de saúde, passaram a ser procuradas também por razões exclusivamente estéticas. Entretanto, o uso indiscriminado dessas substâncias, sem acompanhamento médico, representa um problema preocupante, principalmente devido aos riscos à saúde e à pressão social pela aparência considerada ideal.</p>
      <p>Em primeiro lugar, é importante destacar que a utilização inadequada desses medicamentos pode provocar consequências negativas para a saúde. Embora sejam indicados para determinadas condições clínicas, como a obesidade e o diabetes tipo 2, seu uso exige avaliação e acompanhamento de profissionais de saúde. Quando utilizados sem orientação adequada, podem provocar efeitos adversos e outras complicações. Nesse sentido, percebe-se que a busca por resultados rápidos pode levar indivíduos a desconsiderarem os cuidados necessários com o próprio organismo, colocando a aparência acima do bem-estar físico.</p>
      <p>Além disso, a pressão social por padrões estéticos contribui para a popularização desse comportamento. Nas redes sociais, a divulgação constante de corpos idealizados reforça a ideia de que a aparência física determina o valor de uma pessoa. Nesse contexto, o sociólogo Zygmunt Bauman, ao analisar a sociedade de consumo, evidencia como os indivíduos são incentivados a buscar constantemente novos padrões de satisfação. Dessa forma, muitas pessoas passam a enxergar os medicamentos como uma solução para alcançar uma aparência considerada perfeita, o que pode prejudicar a autoestima e a relação com o próprio corpo.</p>
      <p>Portanto, é necessário combater o uso indiscriminado das canetas emagrecedoras e a valorização excessiva dos padrões estéticos. Para isso, o Ministério da Saúde, em parceria com a Agência Nacional de Vigilância Sanitária (Anvisa), deve ampliar as campanhas de conscientização sobre os riscos da utilização inadequada desses medicamentos, por meio de publicações informativas, palestras e ações nas redes sociais. Além disso, as instituições de ensino devem promover debates sobre autoestima, saúde e diversidade corporal, a fim de incentivar uma relação mais saudável com a aparência física. Assim, será possível priorizar o bem-estar da população e reduzir a influência de padrões estéticos prejudiciais na sociedade.</p>`
    },
    {
      numero: '16',
      tema: 'Quando a seca encontra a enchente: impactos sociais e econômicos das mudanças no ciclo hidrológico',
      conteudo: `<p>A Constituição Federal de 1988 estabelece que todos os cidadãos têm direito a um meio ambiente ecologicamente equilibrado. Entretanto, as alterações no ciclo hidrológico, intensificadas pelas mudanças climáticas e pela ação humana, representam um grande desafio para a sociedade brasileira. Nesse contexto, a ocorrência de secas prolongadas e enchentes cada vez mais prejudiciais evidencia a vulnerabilidade ambiental e a desigualdade social existente no país.</p>
      <p>Em primeiro lugar, é importante destacar que as alterações no regime de chuvas provocam consequências significativas para a população e para a economia. No Nordeste brasileiro, por exemplo, os períodos prolongados de estiagem comprometem a agricultura, reduzem a disponibilidade de água e dificultam a sobrevivência de famílias que dependem das atividades rurais. Em contrapartida, as enchentes registradas no Rio Grande do Sul demonstram os impactos das chuvas intensas, causando destruição de moradias, prejuízos econômicos e deslocamento de milhares de pessoas. Dessa forma, percebe-se que os fenômenos extremos afetam diretamente a qualidade de vida da população e ampliam as desigualdades sociais.</p>
      <p>Além disso, a falta de planejamento urbano e de políticas eficientes de prevenção agrava os efeitos desses acontecimentos. Nesse sentido, o filósofo Hans Jonas, por meio do princípio da responsabilidade, defende que as ações humanas devem considerar suas consequências para as futuras gerações. Entretanto, a ocupação inadequada de áreas de risco, a ausência de infraestrutura de drenagem e a utilização irresponsável dos recursos naturais aumentam a vulnerabilidade das cidades diante de eventos climáticos extremos. Assim, torna-se evidente a necessidade de conciliar o desenvolvimento social com a preservação ambiental.</p>
      <p>Portanto, é fundamental reduzir os impactos das alterações no ciclo hidrológico no Brasil. Para isso, o Governo Federal, em parceria com os governos estaduais e municipais, deve ampliar os investimentos em políticas de prevenção de desastres naturais, por meio da construção de sistemas de drenagem, da recuperação de áreas de preservação e da criação de sistemas de alerta para a população. Além disso, as escolas devem promover campanhas de educação ambiental, com o objetivo de conscientizar os cidadãos sobre o uso responsável da água e a preservação dos recursos naturais. Dessa maneira, será possível diminuir os prejuízos causados pelos fenômenos extremos e garantir maior segurança para as futuras gerações.</p>`
    },
    {
      numero: '17',
      tema: 'O respeito às diferenças como caminho para a superação dos conflitos sociais na sociedade contemporânea',
      conteudo: `<p>A Constituição Federal de 1988 estabelece a igualdade de todos perante a lei, garantindo o respeito à dignidade humana. Entretanto, na sociedade contemporânea, a intolerância e o preconceito ainda representam obstáculos para a construção de uma convivência social harmoniosa. Nesse contexto, as diferenças culturais, físicas e religiosas, somadas à falta de conscientização e de acolhimento nas instituições de ensino, contribuem para a permanência de práticas discriminatórias no Brasil.</p>
      <p>Em primeiro lugar, é importante destacar que o preconceito pode provocar consequências significativas para a saúde emocional das vítimas. Nesse sentido, o filme Extraordinário retrata a história de um menino que enfrenta dificuldades de convivência escolar devido à sua aparência física, evidenciando como a discriminação pode afetar a autoestima e as relações sociais. Fora da ficção, essa realidade também está presente nas escolas brasileiras, nas quais muitos estudantes sofrem humilhações e exclusão por suas características pessoais. Como consequência, as vítimas podem desenvolver sentimentos de insegurança, ansiedade e isolamento social.</p>
      <p>Além disso, a falta de preparo das instituições de ensino para lidar com situações de intolerância contribui para o agravamento desse problema. Isso ocorre porque muitos estudantes sentem vergonha ou medo de relatar situações de preconceito a professores e responsáveis, enquanto algumas instituições não oferecem o acolhimento necessário. Segundo dados da Pesquisa Nacional de Saúde do Escolar (PeNSE), realizada pelo IBGE, uma parcela dos estudantes brasileiros relata sofrer bullying no ambiente escolar. Dessa maneira, percebe-se que a ausência de medidas preventivas e de acompanhamento adequado favorece a continuidade dessas práticas.</p>
      <p>Portanto, é fundamental combater a intolerância e o preconceito na sociedade brasileira. Para isso, o Ministério da Educação, em parceria com as instituições de ensino, deve desenvolver programas de conscientização e combate ao bullying, por meio de palestras, debates, campanhas educativas e capacitação de professores para identificar e acolher vítimas de discriminação. Além disso, as escolas devem disponibilizar canais seguros de denúncia e ampliar o acompanhamento psicológico dos estudantes. Essas medidas devem ter como finalidade promover o respeito às diferenças e garantir um ambiente escolar mais acolhedor. Assim, será possível construir uma sociedade mais justa, inclusiva e respeitosa.</p>`
    }
  ];

  const grid = document.getElementById('redacoes-grid');
  const contador = document.getElementById('redacoes-contador');
  const vazio = document.getElementById('redacoes-vazio');
  const campoBusca = document.getElementById('busca-redacoes');

  const modal = document.getElementById('modal');
  const modalNumero = document.getElementById('modal-numero');
  const modalTema = document.getElementById('modal-tema');
  const modalConteudo = document.getElementById('modal-conteudo');
  const modalFechar = document.getElementById('modal-fechar');
  let ultimoFoco = null;

  /* --- Criação de um card --- */
  const criarCard = (redacao) => {
    const card = document.createElement('article');
    card.className = 'redacao-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Abrir redação ${redacao.numero}: ${redacao.tema}`);

    const previa = redacao.conteudo
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    card.innerHTML = `
      <span class="redacao-card__numero">Redação ${redacao.numero}</span>
      <h3 class="redacao-card__tema">${redacao.tema}</h3>
      <p class="redacao-card__previa">${previa || 'Conteúdo em breve.'}</p>
      <span class="redacao-card__ler">Ler redação</span>
    `;

    const abrir = () => abrirModal(redacao);
    card.addEventListener('click', abrir);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrir();
      }
    });

    return card;
  };

  /* --- Renderização com filtro --- */
  const renderizar = (lista) => {
    if (!grid) return;
    grid.innerHTML = '';
    lista.forEach((redacao) => grid.appendChild(criarCard(redacao)));

    if (contador) {
      contador.textContent =
        lista.length === 1 ? '1 redação' : `${lista.length} redações`;
    }
    if (vazio) vazio.hidden = lista.length !== 0;
  };

  renderizar(redacoes);

  /* --- Busca --- */
  campoBusca?.addEventListener('input', (e) => {
    const termo = normalizar(e.target.value.trim());
    const filtradas = !termo
      ? redacoes
      : redacoes.filter((r) => normalizar(r.tema).includes(termo));
    renderizar(filtradas);
  });

  /* --- Modal --- */
  const abrirModal = (redacao) => {
    if (!modal) return;
    ultimoFoco = document.activeElement;

    modalNumero.textContent = `Redação ${redacao.numero}`;
    modalTema.textContent = redacao.tema;
    modalConteudo.innerHTML = redacao.conteudo;

    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    modalFechar?.focus();
  };

  const fecharModal = () => {
    if (!modal) return;
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') {
      ultimoFoco.focus();
    }
  };

  modalFechar?.addEventListener('click', fecharModal);
  modal?.querySelector('[data-fechar]')?.addEventListener('click', fecharModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('aberto')) {
      fecharModal();
    }
  });
})();