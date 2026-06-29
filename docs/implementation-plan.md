# Constitution Care Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a backend-free responsive Sasang constitution test web MVP with MBTI-like test copy and warm health-coach result content.

**Architecture:** Static HTML/CSS/JavaScript. Core scoring is isolated in `src/scoring.js` and tested with Node's built-in test runner. UI data is isolated in `src/content.js`, while `src/main.js` handles rendering and browser state.

**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Node built-in test runner.

---

### Task 1: Scoring Model

**Files:**
- Create: `src/scoring.js`
- Test: `tests/scoring.test.mjs`

- [ ] Step 1: Write tests for score totals, percentages, dominant type, and tie handling.
- [ ] Step 2: Run `node --test tests/scoring.test.mjs` and verify the test fails because the module does not exist.
- [ ] Step 3: Implement `calculateResult`.
- [ ] Step 4: Run the test again and verify it passes.

### Task 2: Static UI

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `src/content.js`
- Create: `src/main.js`
- Create: `assets/body-types/*.svg`

- [ ] Step 1: Add semantic HTML shell and mount points.
- [ ] Step 2: Add content data for questions, result copy, food copy, and body-shape copy.
- [ ] Step 3: Render home, test, result, and body guide sections.
- [ ] Step 4: Style mobile-first responsive layout, avoiding bright pink/yellow palettes.

### Task 3: Verification

**Files:**
- Modify: `package.json`

- [ ] Step 1: Add scripts for `test` and `serve`.
- [ ] Step 2: Run tests.
- [ ] Step 3: Start a static server and inspect the home page.
- [ ] Step 4: Copy the verified project into `/Users/kbomi/Desktop/website/constitution-care-plan`.
