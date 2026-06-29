import { calculateResult, CONSTITUTION_ORDER } from './scoring.js';
import { bodyGuides, constitutionLabels, questions, resultContent, typeThemes } from './content.js';

const state = {
  step: 0,
  answers: {}
};

const app = document.querySelector('#app');

function render() {
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#" data-action="home">
        <span class="brand-mark"></span>
        <span>체질노트</span>
      </a>
      <nav class="nav">
        <a href="#test">테스트</a>
        <a href="#body-guide">체형 가이드</a>
      </nav>
    </header>
    <main>
      ${renderHero()}
      ${renderTest()}
      ${renderBodyGuide()}
    </main>
  `;

  bindEvents();
}

function renderHero() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">사상체질 경향 테스트</p>
        <h1>내 몸의 흐름을 가볍게 알아보는 체질 가이드</h1>
        <p class="hero-text">MBTI처럼 부담 없이 답하고, 결과는 따뜻한 건강 코치처럼 받아보세요. 이 서비스는 생활 참고용이며 확정 진단을 제공하지 않습니다.</p>
        <div class="hero-actions">
          <a class="button primary" href="#test">테스트 시작</a>
          <a class="button ghost" href="#body-guide">체형 먼저 보기</a>
        </div>
      </div>
      <div class="hero-panel" aria-label="결과 미리보기">
        <div class="preview-card">
          <span>예상 결과</span>
          <strong>태음인 48%</strong>
          <p>차분히 쌓는 힘이 있고, 순환과 소모 루틴이 중요한 타입</p>
        </div>
        <div class="preview-bars">
          ${CONSTITUTION_ORDER.map((type, index) => `
            <div>
              <span>${constitutionLabels[type]}</span>
              <i style="--value:${[18, 22, 48, 12][index]}%; --tone:${typeThemes[type]}"></i>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderTest() {
  const resultReady = Object.keys(state.answers).length === questions.length;

  if (resultReady) {
    return renderResult();
  }

  const question = questions[state.step];
  const progress = Math.round(((state.step + 1) / questions.length) * 100);

  return `
    <section class="test-section" id="test">
      <div class="section-head">
        <p class="eyebrow">질문 ${state.step + 1} / ${questions.length}</p>
        <h2>${question.title}</h2>
      </div>
      <div class="progress"><i style="width:${progress}%"></i></div>
      <div class="option-list">
        ${question.options.map((option) => `
          <button class="option" data-answer="${option.id}">
            ${option.label}
          </button>
        `).join('')}
      </div>
      <div class="test-controls">
        <button class="button ghost" data-action="prev" ${state.step === 0 ? 'disabled' : ''}>이전</button>
        <button class="button ghost" data-action="reset">처음부터</button>
      </div>
    </section>
  `;
}

function renderResult() {
  const result = calculateResult(questions, state.answers);
  const content = resultContent[result.dominantType];

  localStorage.setItem('constitution-note-result', JSON.stringify(result));

  return `
    <section class="result-section" id="test">
      <div class="result-hero">
        <p class="eyebrow">나의 체질 경향</p>
        <h2>${constitutionLabels[result.dominantType]} 경향이 가장 높아요</h2>
        <p>${content.tagline}</p>
      </div>
      <div class="result-grid">
        <article class="result-card percentages">
          <h3>사상체질 비율</h3>
          ${CONSTITUTION_ORDER.map((type) => `
            <div class="percent-row">
              <span>${constitutionLabels[type]}</span>
              <strong>${result.percentages[type]}%</strong>
              <i style="--value:${result.percentages[type]}%; --tone:${typeThemes[type]}"></i>
            </div>
          `).join('')}
        </article>
        <article class="result-card">
          <h3>성격과 컨디션 힌트</h3>
          <p>${content.personality}</p>
        </article>
        <article class="result-card">
          <h3>잘 맞을 수 있는 음식</h3>
          <ul>${content.goodFoods.map((food) => `<li>${food}</li>`).join('')}</ul>
        </article>
        <article class="result-card">
          <h3>주의해볼 음식</h3>
          <ul>${content.cautionFoods.map((food) => `<li>${food}</li>`).join('')}</ul>
        </article>
      </div>
      <div class="coach-note">
        <strong>건강 코치 메모</strong>
        <p>${content.coach}</p>
      </div>
      <div class="hero-actions center">
        <button class="button primary" data-action="share">결과 공유</button>
        <button class="button ghost" data-action="reset">다시 테스트</button>
      </div>
    </section>
  `;
}

function renderBodyGuide() {
  return `
    <section class="body-guide" id="body-guide">
      <div class="section-head">
        <p class="eyebrow">체형 가이드</p>
        <h2>남성/여성 예시를 함께 보여주는 체형 경향</h2>
        <p>체형은 체질을 이해하는 참고 요소이며 개인차가 큽니다. 결과 판단은 테스트 응답과 함께 생활 참고용으로만 봐주세요.</p>
      </div>
      <div class="body-grid">
        ${CONSTITUTION_ORDER.map((type) => `
          <article class="body-card">
            <h3>${constitutionLabels[type]}</h3>
            <div class="body-images">
              <figure>
                <img src="assets/body-types/${type}-male.svg" alt="${constitutionLabels[type]} 남성 체형 예시">
                <figcaption>남성 예시</figcaption>
              </figure>
              <figure>
                <img src="assets/body-types/${type}-female.svg" alt="${constitutionLabels[type]} 여성 체형 예시">
                <figcaption>여성 예시</figcaption>
              </figure>
            </div>
            <strong>${bodyGuides[type].title}</strong>
            <p>${bodyGuides[type].text}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll('[data-answer]').forEach((button) => {
    button.addEventListener('click', () => {
      state.answers[questions[state.step].id] = button.dataset.answer;
      if (state.step < questions.length - 1) {
        state.step += 1;
      }
      render();
      document.querySelector('#test')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('[data-action="prev"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.step = Math.max(0, state.step - 1);
      render();
    });
  });

  document.querySelectorAll('[data-action="reset"], [data-action="home"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      state.step = 0;
      state.answers = {};
      localStorage.removeItem('constitution-note-result');
      render();
    });
  });

  document.querySelectorAll('[data-action="share"]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = '체질노트에서 내 사상체질 경향을 확인해봤어요. 생활 참고용으로 가볍게 해보세요.';
      if (navigator.share) {
        await navigator.share({ title: '체질노트 결과', text, url: location.href });
      } else {
        await navigator.clipboard.writeText(location.href);
        button.textContent = '링크 복사 완료';
      }
    });
  });
}

render();
