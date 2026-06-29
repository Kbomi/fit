export const constitutionLabels = {
  taeyang: '태양인',
  soyang: '소양인',
  taeeum: '태음인',
  soeum: '소음인'
};

export const typeThemes = {
  taeyang: '#294133',
  soyang: '#5E7D68',
  taeeum: '#6F8F62',
  soeum: '#7C7193'
};

export const questions = [
  {
    id: 'body-energy',
    title: '하루 에너지 흐름은 어떤 편인가요?',
    options: [
      { id: 'burst', label: '시작은 빠른데 오래가면 방전돼요', scores: { taeyang: 3, soyang: 2 } },
      { id: 'steady-heavy', label: '천천히 움직이지만 버티는 힘은 있어요', scores: { taeeum: 3, soeum: 1 } },
      { id: 'low-warmup', label: '예열 시간이 꼭 필요해요', scores: { soeum: 3, taeeum: 1 } }
    ]
  },
  {
    id: 'food-pace',
    title: '식사 스타일에 가까운 쪽은요?',
    options: [
      { id: 'fast', label: '배고프면 속도가 꽤 빨라져요', scores: { soyang: 2, taeeum: 2 } },
      { id: 'small', label: '조금씩 먹고 소화 상태를 봐요', scores: { soeum: 3 } },
      { id: 'light', label: '담백하고 가벼운 음식이 편해요', scores: { taeyang: 3, soyang: 1 } }
    ]
  },
  {
    id: 'temperature',
    title: '몸의 온도감은 어떤 편인가요?',
    options: [
      { id: 'heat', label: '열이 위로 오르거나 답답함을 느껴요', scores: { soyang: 3, taeeum: 1 } },
      { id: 'cold', label: '손발이나 배가 찬 편이에요', scores: { soeum: 3 } },
      { id: 'neutral', label: '크게 춥거나 덥진 않지만 상체가 강한 느낌이에요', scores: { taeyang: 2, taeeum: 1 } }
    ]
  },
  {
    id: 'stress',
    title: '스트레스 받을 때 나는?',
    options: [
      { id: 'rush', label: '마음이 급해지고 바로 해결하고 싶어요', scores: { taeyang: 3, soyang: 1 } },
      { id: 'sensitive', label: '예민해지고 잠이나 소화가 흔들려요', scores: { soyang: 2, soeum: 2 } },
      { id: 'eat-delay', label: '먹는 쪽으로 풀거나 일을 미루게 돼요', scores: { taeeum: 3 } }
    ]
  },
  {
    id: 'body-shape',
    title: '전체 체형 느낌은 어디에 가까운가요?',
    options: [
      { id: 'upper-neck', label: '머리/목/상체 쪽 존재감이 큰 편', scores: { taeyang: 3 } },
      { id: 'chest', label: '가슴/상체가 발달하고 하체는 가벼운 편', scores: { soyang: 3 } },
      { id: 'waist-belly', label: '허리/배 쪽이 안정감 있게 발달한 편', scores: { taeeum: 3 } },
      { id: 'lower-body', label: '상체보다 골반/하체가 더 안정적인 편', scores: { soeum: 3 } }
    ]
  },
  {
    id: 'digestion',
    title: '소화 컨디션은 보통 어떤가요?',
    options: [
      { id: 'strong-appetite', label: '식욕이 좋고 많이 먹는 편이에요', scores: { taeeum: 3, soyang: 1 } },
      { id: 'sensitive-stomach', label: '자주 체하거나 속이 예민해요', scores: { soeum: 2, soyang: 2 } },
      { id: 'light-digestion', label: '기름진 것보다 담백한 게 편해요', scores: { taeyang: 2, soeum: 1 } }
    ]
  },
  {
    id: 'sleep',
    title: '잠과 회복은 어떤 편인가요?',
    options: [
      { id: 'light-sleep', label: '잠들기 어렵거나 중간에 깨요', scores: { soyang: 2, taeyang: 1 } },
      { id: 'need-rest', label: '충분히 쉬어야 컨디션이 돌아와요', scores: { soeum: 3 } },
      { id: 'heavy-after-eat', label: '먹고 나면 몸이 무거워지는 날이 있어요', scores: { taeeum: 3 } }
    ]
  },
  {
    id: 'movement',
    title: '운동을 한다면 더 끌리는 쪽은요?',
    options: [
      { id: 'lower-strength', label: '하체를 단련하는 운동이 필요하다고 느껴요', scores: { taeyang: 2, soyang: 2 } },
      { id: 'sweat', label: '땀나는 유산소가 잘 맞는 느낌이에요', scores: { taeeum: 3 } },
      { id: 'gentle', label: '짧고 가벼운 운동부터 시작해야 해요', scores: { soeum: 3 } }
    ]
  },
  {
    id: 'social',
    title: '일 처리 스타일은?',
    options: [
      { id: 'direct', label: '바로 판단하고 밀고 나가는 편', scores: { taeyang: 3 } },
      { id: 'quick-react', label: '반응이 빠르고 감정도 빨리 올라와요', scores: { soyang: 3 } },
      { id: 'slow-solid', label: '천천히 봐도 안정적으로 끝내는 편', scores: { taeeum: 3 } },
      { id: 'careful', label: '꼼꼼히 보고 무리하지 않으려 해요', scores: { soeum: 3 } }
    ]
  },
  {
    id: 'food-preference',
    title: '요즘 몸이 편하다고 느끼는 음식은?',
    options: [
      { id: 'seafood-veg', label: '해산물, 채소, 담백한 음식', scores: { taeyang: 3, soyang: 1 } },
      { id: 'cool-fresh', label: '시원하고 산뜻한 음식', scores: { soyang: 3 } },
      { id: 'protein-grain', label: '든든한 단백질과 곡류', scores: { taeeum: 3 } },
      { id: 'warm-cooked', label: '따뜻하게 익힌 음식', scores: { soeum: 3 } }
    ]
  }
];

export const resultContent = {
  taeyang: {
    tagline: '빠르게 뻗어나가지만, 아래로 안정시키면 더 편안해지는 타입',
    personality: '판단이 빠르고 추진력이 있는 편입니다. 다만 마음이 급해지면 몸도 함께 긴장하기 쉬워서, 속도를 살짝 낮추는 루틴이 도움이 될 수 있어요.',
    goodFoods: ['메밀', '포도', '키위', '오이', '해산물', '담백한 채소류'],
    cautionFoods: ['기름진 음식', '맵고 자극적인 음식', '무거운 육류 위주의 식사'],
    focus: '상체로 몰리는 긴장감을 아래로 내려 안정감을 만드는 하루',
    routine: [
      { time: '아침', title: '하체 깨우기', text: '가벼운 스쿼트나 종아리 스트레칭으로 몸의 중심을 아래로 내려보세요.' },
      { time: '점심', title: '담백한 접시', text: '기름진 메뉴보다 채소와 해산물 중심의 가벼운 구성을 골라보세요.' },
      { time: '저녁', title: '속도 줄이기', text: '잠들기 전 목과 어깨를 풀고, 급한 생각을 메모로 내려놓으면 좋습니다.' }
    ],
    movement: '짧은 하체 근력 운동과 걷기를 섞어 상체 긴장을 분산해보세요.',
    watch: '답답함, 목덜미 긴장, 갑작스러운 피로감이 올라오면 휴식 신호로 봐주세요.',
    coach: '하체와 허리 쪽을 부드럽게 단련하고, 식사는 담백하게 가져가보세요. 결과는 참고용 경향이며 정확한 체질 판단은 전문가 상담이 필요합니다.'
  },
  soyang: {
    tagline: '반응이 빠르고 열감이 올라오기 쉬운 산뜻한 추진형',
    personality: '감각이 빠르고 표현이 시원한 편입니다. 컨디션이 흔들릴 때는 수면, 열감, 소화 리듬이 함께 예민해질 수 있어요.',
    goodFoods: ['보리', '팥', '녹두', '오이', '수박', '돼지고기 살코기', '해산물'],
    cautionFoods: ['맵고 짠 음식', '열감이 강한 음식', '자극적인 향신료', '과도한 음주'],
    focus: '빠른 반응과 열감을 부드럽게 식히며 리듬을 고르는 하루',
    routine: [
      { time: '아침', title: '천천히 시작', text: '시원한 물 한 컵과 가벼운 호흡으로 급한 마음을 먼저 낮춰보세요.' },
      { time: '점심', title: '자극 줄이기', text: '맵고 짠 메뉴보다 산뜻한 채소, 보리, 해산물 위주로 선택해보세요.' },
      { time: '저녁', title: '열감 체크', text: '늦은 카페인과 과한 화면 사용을 줄이면 수면 리듬 관리에 도움이 됩니다.' }
    ],
    movement: '강한 운동보다 땀이 살짝 나는 걷기, 가벼운 유산소, 어깨 이완이 잘 맞을 수 있어요.',
    watch: '입마름, 상열감, 얕은 잠, 예민한 소화가 반복되면 자극을 줄여보세요.',
    coach: '식사는 천천히, 몸은 시원하게, 마음은 한 박자 여유 있게 가져가면 좋습니다. 이 결과는 생활 참고용으로 봐주세요.'
  },
  taeeum: {
    tagline: '차분히 쌓는 힘이 있고, 순환과 소모 루틴이 중요한 타입',
    personality: '안정감과 버티는 힘이 있는 편입니다. 식욕이나 체중 변화가 컨디션 신호로 나타날 수 있어, 규칙적인 식사량과 운동 리듬이 중요해요.',
    goodFoods: ['현미', '율무', '고구마', '소고기 살코기', '두부', '콩류', '무', '호박'],
    cautionFoods: ['과식', '폭식', '야식', '기름진 음식', '단 음식', '잦은 음주'],
    focus: '쌓인 에너지를 잘 순환시키고 가볍게 소모하는 하루',
    routine: [
      { time: '아침', title: '수분과 보폭', text: '물 한 컵 뒤 10분 걷기로 몸을 무겁지 않게 열어보세요.' },
      { time: '점심', title: '든든하되 천천히', text: '단백질과 곡류를 챙기되 속도를 늦추면 포만감 신호를 보기 쉽습니다.' },
      { time: '저녁', title: '야식 방지선', text: '저녁 후 가벼운 산책을 넣어 식욕과 몸의 무거움을 함께 관리해보세요.' }
    ],
    movement: '꾸준히 땀이 나는 걷기, 자전거, 전신 근력 루틴이 안정적으로 맞을 수 있습니다.',
    watch: '식후 무거움, 부종감, 야식 욕구, 활동량 저하가 쌓이면 순환 루틴을 먼저 챙겨보세요.',
    coach: '무리한 제한보다 꾸준히 땀내는 움직임과 천천히 먹는 습관이 잘 맞을 수 있습니다. 확정 진단이 아닌 경향 안내입니다.'
  },
  soeum: {
    tagline: '섬세하게 살피고, 따뜻한 회복 루틴에서 힘을 얻는 타입',
    personality: '신중하고 꼼꼼한 편입니다. 과로하거나 식사가 불규칙하면 소화와 피로감이 먼저 신호를 보낼 수 있어요.',
    goodFoods: ['쌀', '찹쌀', '감자', '닭고기', '흰살생선', '부추', '양파', '따뜻하게 익힌 음식'],
    cautionFoods: ['찬 음식', '날 음식', '기름진 음식', '밀가루 위주의 식사', '무리한 운동'],
    focus: '따뜻하게 데우고 무리하지 않으며 회복력을 지키는 하루',
    routine: [
      { time: '아침', title: '따뜻한 시작', text: '찬 음료보다 따뜻한 물이나 익힌 음식으로 속을 편하게 열어보세요.' },
      { time: '점심', title: '소량 규칙', text: '양을 무리하게 늘리기보다 편안한 양을 규칙적으로 챙기는 쪽이 좋습니다.' },
      { time: '저녁', title: '회복 우선', text: '늦은 운동보다 복부를 따뜻하게 하고 일찍 쉬는 루틴을 추천합니다.' }
    ],
    movement: '짧은 산책, 가벼운 코어 운동, 스트레칭처럼 부담이 낮은 움직임부터 시작해보세요.',
    watch: '손발 냉감, 더부룩함, 피로 누적, 긴장성 소화 불편이 있으면 휴식을 앞당겨보세요.',
    coach: '몸을 따뜻하게 하고, 적은 양이라도 규칙적으로 먹는 루틴이 좋습니다. 결과는 참고용이며 불편한 증상이 지속되면 전문가 상담을 권장합니다.'
  }
};

export const bodyGuides = {
  taeyang: {
    title: '상체와 목덜미에 힘이 실리는 경향',
    text: '머리와 목덜미, 상체의 존재감이 비교적 크고 허리와 하체는 가볍게 느껴질 수 있습니다.'
  },
  soyang: {
    title: '가슴과 상체가 발달하고 하체가 가벼운 경향',
    text: '가슴과 어깨 쪽이 비교적 시원하게 발달하고 골반, 둔부, 하체는 상대적으로 가볍게 보일 수 있습니다.'
  },
  taeeum: {
    title: '허리와 복부 중심이 안정적인 경향',
    text: '허리와 복부 중심이 탄탄하게 보이고 전체 체격에서 안정감과 묵직함이 느껴질 수 있습니다.'
  },
  soeum: {
    title: '골반과 하체 쪽 안정감이 큰 경향',
    text: '상체는 비교적 아담하게 보이고 골반과 하체 라인이 상대적으로 안정적으로 느껴질 수 있습니다.'
  }
};
