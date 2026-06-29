import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateResult } from '../src/scoring.js';

test('calculates constitution percentages from weighted answers', () => {
  const questions = [
    {
      id: 'energy',
      options: [
        { id: 'steady', scores: { taeeum: 3, soeum: 1 } },
        { id: 'quick', scores: { soyang: 3, taeyang: 1 } }
      ]
    },
    {
      id: 'food',
      options: [
        { id: 'warm', scores: { soeum: 3, taeeum: 1 } },
        { id: 'cool', scores: { soyang: 2, taeyang: 2 } }
      ]
    }
  ];

  const result = calculateResult(questions, { energy: 'steady', food: 'warm' });

  assert.equal(result.dominantType, 'taeeum');
  assert.deepEqual(result.scores, {
    taeyang: 0,
    soyang: 0,
    taeeum: 4,
    soeum: 4
  });
  assert.deepEqual(result.percentages, {
    taeyang: 0,
    soyang: 0,
    taeeum: 50,
    soeum: 50
  });
});

test('uses fixed constitution order when scores are tied', () => {
  const questions = [
    {
      id: 'pace',
      options: [
        { id: 'balanced', scores: { taeyang: 2, soyang: 2, taeeum: 2, soeum: 2 } }
      ]
    }
  ];

  const result = calculateResult(questions, { pace: 'balanced' });

  assert.equal(result.dominantType, 'taeyang');
});

test('ignores unanswered questions and returns zero percentages safely', () => {
  const questions = [
    {
      id: 'sleep',
      options: [
        { id: 'light', scores: { soyang: 2 } }
      ]
    }
  ];

  const result = calculateResult(questions, {});

  assert.deepEqual(result.scores, {
    taeyang: 0,
    soyang: 0,
    taeeum: 0,
    soeum: 0
  });
  assert.deepEqual(result.percentages, {
    taeyang: 0,
    soyang: 0,
    taeeum: 0,
    soeum: 0
  });
  assert.equal(result.dominantType, 'taeyang');
});
