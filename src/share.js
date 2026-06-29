import { CONSTITUTION_ORDER } from "./scoring.js";

const SHARE_PARAM = "result";
const TRACKING_PARAM_PREFIXES = ["utm_"];
const TRACKING_PARAMS = ["fbclid", "gclid"];

function isTrackingParam(key) {
  return TRACKING_PARAMS.includes(key) || TRACKING_PARAM_PREFIXES.some((prefix) => key.startsWith(prefix));
}

function normalizePercentage(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > 100) return null;
  return number;
}

export function createResultShareUrl(baseUrl, result) {
  const url = new URL(baseUrl);

  for (const key of [...url.searchParams.keys()]) {
    if (key === SHARE_PARAM || isTrackingParam(key)) {
      url.searchParams.delete(key);
    }
  }

  const percentages = CONSTITUTION_ORDER.map((type) => result.percentages[type]);
  url.searchParams.append(SHARE_PARAM, [result.dominantType, ...percentages].join("."));

  return url.toString();
}

export function decodeResultFromUrl(urlValue) {
  const url = new URL(urlValue);
  const payload = url.searchParams.get(SHARE_PARAM);
  if (!payload) return null;

  const [dominantType, ...rawPercentages] = payload.split(".");
  if (!CONSTITUTION_ORDER.includes(dominantType) || rawPercentages.length !== CONSTITUTION_ORDER.length) {
    return null;
  }

  const percentages = {};
  for (const [index, type] of CONSTITUTION_ORDER.entries()) {
    const percentage = normalizePercentage(rawPercentages[index]);
    if (percentage === null) return null;
    percentages[type] = percentage;
  }

  const total = CONSTITUTION_ORDER.reduce((sum, type) => sum + percentages[type], 0);
  if (total !== 100) return null;

  return {
    dominantType,
    percentages,
  };
}
