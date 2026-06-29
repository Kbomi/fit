export const CONSTITUTION_ORDER = ['taeyang', 'soyang', 'taeeum', 'soeum'];

export function createEmptyScores() {
  return {
    taeyang: 0,
    soyang: 0,
    taeeum: 0,
    soeum: 0
  };
}

export function calculateResult(questions, answers) {
  const scores = createEmptyScores();

  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    if (!selectedOption) continue;

    for (const type of CONSTITUTION_ORDER) {
      scores[type] += selectedOption.scores[type] ?? 0;
    }
  }

  const total = CONSTITUTION_ORDER.reduce((sum, type) => sum + scores[type], 0);
  const percentages = createEmptyScores();

  if (total > 0) {
    let used = 0;
    CONSTITUTION_ORDER.forEach((type, index) => {
      if (index === CONSTITUTION_ORDER.length - 1) {
        percentages[type] = Math.max(0, 100 - used);
        return;
      }
      percentages[type] = Math.round((scores[type] / total) * 100);
      used += percentages[type];
    });
  }

  const dominantType = CONSTITUTION_ORDER.reduce((bestType, type) => {
    if (scores[type] > scores[bestType]) return type;
    return bestType;
  }, CONSTITUTION_ORDER[0]);

  return {
    scores,
    percentages,
    dominantType
  };
}
