import { calculateResult, CONSTITUTION_ORDER } from "./scoring.js";
import { createResultShareUrl, decodeResultFromUrl } from "./share.js";
import {
  bodyGuides,
  constitutionLabels,
  questions,
  resultContent,
  typeThemes,
} from "./content.js";

const state = {
  step: 0,
  answers: {},
  sharedResult: decodeResultFromUrl(location.href),
};

const app = document.querySelector("#app");

const bodyVisuals = {
  taeyang: { icon: "taeyang.png", className: "body-theme-taeyang" },
  soyang: { icon: "soyang.png", className: "body-theme-soyang" },
  taeeum: { icon: "taeeum.png", className: "body-theme-taeeum" },
  soeum: { icon: "soeum.png", className: "body-theme-soeum" },
};

function render() {
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#" data-action="home">
        <img class="brand-logo" src="assets/brand/logo.png" alt="체질핏" width="32" height="32">
      </a>
      <nav class="nav">
        <a href="#test">테스트</a>
        <a href="#body-guide">체질별 체형 예시</a>
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
  const previewType = "taeeum";
  const preview = resultContent[previewType];

  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">체질핏 사상체질 테스트</p>
        <h1>체질핏</h1>
        <p class="hero-subtitle">내 체질에 딱 맞는 선택</p>
        <p class="hero-text">내 몸의 흐름을 간단히 확인하고, 체질 경향과 음식, 생활 루틴, 체형 참고 리포트를 한 번에 정리해드려요.</p>
        <div class="hero-actions">
          <a class="button primary" href="#test">테스트 시작</a>
          <a class="button ghost" href="#body-guide">체질별 체형 보기</a>
        </div>
      </div>
      <div class="hero-panel dashboard-panel" aria-label="결과 미리보기">
        <div class="panel-topline">
          <span>테스트 결과 예시</span>
          <strong>샘플</strong>
        </div>
        <div class="preview-card">
          <span>예상 결과</span>
          <strong>${constitutionLabels[previewType]} 48%</strong>
          <p>${preview.tagline}</p>
        </div>
        <div class="preview-bars">
          ${CONSTITUTION_ORDER.map(
            (type, index) => `
            <div>
              <span>${constitutionLabels[type]}</span>
              <i style="--value:${[18, 22, 48, 12][index]}%; --tone:${typeThemes[type]}"></i>
            </div>
          `,
          ).join("")}
        </div>
        <div class="mini-insight">
          <span>오늘의 포커스</span>
          <strong>${preview.focus}</strong>
        </div>
        <div class="routine-chips">
          ${preview.routine
            .map(
              (item) => `
            <span>${item.time} · ${item.title}</span>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTest() {
  if (state.sharedResult) {
    return renderResult(state.sharedResult, { isShared: true });
  }

  const resultReady = Object.keys(state.answers).length === questions.length;

  if (resultReady) {
    return renderResult();
  }

  const question = questions[state.step];
  const progress = Math.round(((state.step + 1) / questions.length) * 100);

  return `
    <section class="test-section" id="test">
      <div class="test-panel dashboard-panel">
        <div class="panel-topline">
          <span>체질 체크</span>
          <strong>${progress}%</strong>
        </div>
        <div class="section-head">
          <p class="eyebrow">질문 ${state.step + 1} / ${questions.length}</p>
          <h2>${question.title}</h2>
        </div>
        <div class="progress"><i style="width:${progress}%"></i></div>
        <div class="option-list">
          ${question.options
            .map(
              (option) => `
            <button class="option" data-answer="${option.id}">
              ${option.label}
            </button>
          `,
            )
            .join("")}
        </div>
        <div class="test-controls">
          <button class="button ghost" data-action="prev" ${state.step === 0 ? "disabled" : ""}>이전</button>
          <button class="button ghost" data-action="reset">처음부터</button>
        </div>
      </div>
    </section>
  `;
}

function renderResult(
  result = calculateResult(questions, state.answers),
  options = {},
) {
  const content = resultContent[result.dominantType];

  if (!options.isShared) {
    localStorage.setItem("chejilfit-result", JSON.stringify(result));
  }

  return `
    <section class="result-section" id="test">
      <div class="result-hero">
        <p class="eyebrow">나의 체질 경향</p>
        <h2>${constitutionLabels[result.dominantType]} 경향이 가장 높아요</h2>
        <p>${content.tagline}</p>
      </div>
      <div class="result-dashboard">
        <article class="result-card percentages metric-card score-card">
          <h3>사상체질 비율</h3>
          ${CONSTITUTION_ORDER.map(
            (type) => `
            <div class="percent-row">
              <span>${constitutionLabels[type]}</span>
              <strong>${result.percentages[type]}%</strong>
              <i style="--value:${result.percentages[type]}%; --tone:${typeThemes[type]}"></i>
            </div>
          `,
          ).join("")}
        </article>
        <article class="result-card focus-card">
          <span class="card-kicker">오늘의 컨디션 포커스</span>
          <h3>${content.focus}</h3>
          <p>${content.personality}</p>
        </article>
        <article class="result-card routine-card">
          <span class="card-kicker">생활 루틴</span>
          <h3>하루 리듬 추천</h3>
          <div class="routine-list">
            ${content.routine
              .map(
                (item) => `
              <div class="routine-item">
                <span>${item.time}</span>
                <strong>${item.title}</strong>
                <p>${item.text}</p>
              </div>
            `,
              )
              .join("")}
          </div>
        </article>
        <article class="result-card metric-card">
          <span class="card-kicker">움직임 추천</span>
          <h3>오늘의 운동 방향</h3>
          <p>${content.movement}</p>
        </article>
        <article class="result-card metric-card">
          <span class="card-kicker">체크 신호</span>
          <h3>흔들릴 때 볼 것</h3>
          <p>${content.watch}</p>
        </article>
        <article class="result-card food-card">
          <div>
            <h3>잘 맞을 수 있는 음식</h3>
            <ul>${content.goodFoods.map((food) => `<li>${food}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>주의해볼 음식</h3>
            <ul>${content.cautionFoods.map((food) => `<li>${food}</li>`).join("")}</ul>
          </div>
        </article>
      </div>
      <article class="result-share-card" aria-label="공유용 결과 카드">
        <div>
          <span class="card-kicker">${options.isShared ? "공유받은 결과" : "공유용 결과 카드"}</span>
          <h3>나는 ${constitutionLabels[result.dominantType]} ${result.percentages[result.dominantType]}%</h3>
          <p>${content.tagline}</p>
        </div>
        <div class="share-card-bars">
          ${CONSTITUTION_ORDER.map(
            (type) => `
            <span>
              <b>${constitutionLabels[type]}</b>
              <i style="--value:${result.percentages[type]}%; --tone:${typeThemes[type]}"></i>
              <strong>${result.percentages[type]}%</strong>
            </span>
          `,
          ).join("")}
        </div>
      </article>
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
        <p class="eyebrow">체형 예시</p>
        <h2>사상체질별 체형 예시</h2>
        <p>체질마다 자주 언급되는 체형 경향을 이미지로 풀어낸 예시입니다.<br/>실제 체형은 개인차가 크니 테스트 결과와 함께 생활 참고용으로만 봐주세요.</p>
      </div>
      <div class="body-grid">
        ${CONSTITUTION_ORDER.map((type) => {
          const visual = bodyVisuals[type];

          return `
          <article class="body-card ${visual.className}">
            <div class="body-card-head">
              <h3>
                <img src="assets/body-types/${visual.icon}" alt="" aria-hidden="true">
                <span>${constitutionLabels[type]}</span>
              </h3>
              <span class="body-type-badge">대표 예시</span>
            </div>
            <div class="body-images">
              <figure>
                <img src="assets/body-types/${type}-male.png" alt="${constitutionLabels[type]} 남성 체형 예시">
                <figcaption>남성 예시</figcaption>
              </figure>
              <figure>
                <img src="assets/body-types/${type}-female.png" alt="${constitutionLabels[type]} 여성 체형 예시">
                <figcaption>여성 예시</figcaption>
              </figure>
            </div>
            <strong>${bodyGuides[type].title}</strong>
            <p>${bodyGuides[type].text}</p>
          </article>
        `;
        }).join("")}
      </div>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[questions[state.step].id] = button.dataset.answer;
      if (state.step < questions.length - 1) {
        state.step += 1;
      }
      render();
      document
        .querySelector("#test")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll('[data-action="prev"]').forEach((button) => {
    button.addEventListener("click", () => {
      state.step = Math.max(0, state.step - 1);
      render();
    });
  });

  document
    .querySelectorAll('[data-action="reset"], [data-action="home"]')
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        state.step = 0;
        state.answers = {};
        state.sharedResult = null;
        localStorage.removeItem("chejilfit-result");
        history.replaceState(null, "", location.pathname + location.hash);
        render();
      });
    });

  document.querySelectorAll('[data-action="share"]').forEach((button) => {
    button.addEventListener("click", async () => {
      const result =
        state.sharedResult ?? calculateResult(questions, state.answers);
      const url = new URL(location.href);
      url.hash = "test";
      const shareUrl = createResultShareUrl(url.toString(), result);
      const text = `체질핏에서 나는 ${constitutionLabels[result.dominantType]} ${result.percentages[result.dominantType]}% 경향으로 나왔어요.`;
      if (navigator.share) {
        await navigator.share({
          title: "체질핏 결과",
          text,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        button.textContent = "링크 복사 완료";
      }
    });
  });
}

render();
