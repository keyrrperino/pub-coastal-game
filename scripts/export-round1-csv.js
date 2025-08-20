/*
  Export Round 1 scenario keys to CSV.
  Columns: key, sector, subsector, measure, meanSeaLevel, randomizeEffect
*/

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const enumsPath = path.join(repoRoot, 'src', 'lib', 'enums.ts');
const scenarioPath = path.join(repoRoot, 'src', 'lib', 'scenario.config.ts');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function buildActivityEnumMap(enumsTs) {
  const startIdx = enumsTs.indexOf('export enum ActivityTypeEnum');
  if (startIdx === -1) return {};
  const endMarker = 'export enum ActivityDemolishTypeSector1AEnum';
  const endIdx = enumsTs.indexOf(endMarker, startIdx);
  const section = enumsTs.slice(startIdx, endIdx !== -1 ? endIdx : undefined);

  const map = {};
  const lineRegex = /\n\s*([A-Z0-9_]+)\s*=\s*"([^"]+)"/g;
  let match;
  while ((match = lineRegex.exec(section)) !== null) {
    const [, name, value] = match;
    map[`ActivityTypeEnum.${name}`] = value;
  }
  return map;
}

function buildCutsceneEnumMap(enumsTs) {
  const startIdx = enumsTs.indexOf('export enum CutScenesEnum');
  if (startIdx === -1) return {};
  const endMarker = 'export enum SubSectorEnum';
  const endIdx = enumsTs.indexOf(endMarker, startIdx);
  const section = enumsTs.slice(startIdx, endIdx !== -1 ? endIdx : undefined);

  const map = {};
  const lineRegex = /\n\s*([A-Z0-9_]+)\s*=\s*"([^"]+)"/g;
  let match;
  while ((match = lineRegex.exec(section)) !== null) {
    const [, name, value] = match;
    map[`CutScenesEnum.${name}`] = value;
  }
  return map;
}

function extractRoundOneEntries(scenarioTs, activityMap, cutsceneMap) {
  const objRegex = /export const roundOneScenarioConfiguration:[\s\S]*?=\s*\{([\s\S]*?)\n\};/;
  const objMatch = scenarioTs.match(objRegex);
  if (!objMatch) return [];
  const body = objMatch[1];

  const entries = [];
  // Single pass: match either a quoted key or a template key, preserving order of appearance
  const combinedRegex = /\n\s*(?:"([^"]+)"|\[\s*`([^`]+)`\s*\])\s*:\s*\{/g;
  let m;
  while ((m = combinedRegex.exec(body)) !== null) {
    const quoted = m[1];
    const templated = m[2];
    let keyStr = quoted || '';
    if (!keyStr && templated) {
      keyStr = templated.replace(/\$\{\s*ActivityTypeEnum\.([A-Z0-9_]+)\s*\}/g, (match, enumKey) => {
        const full = `ActivityTypeEnum.${enumKey}`;
        return activityMap[full] || full;
      });
    }

    // Start from the exact opening brace consumed by the regex (avoid `${...}` braces)
    const braceStart = combinedRegex.lastIndex - 1; // position of '{'
    let i = braceStart;
    let depth = 0;
    let end = -1;
    for (; i < body.length; i++) {
      const ch = body[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    const objLiteral = end !== -1 ? body.slice(braceStart + 1, end) : '';

    const scoreMatch = objLiteral.match(/\bscore\s*:\s*([0-9]+)/);
    const coinMatch = objLiteral.match(/\bcoin\s*:\s*([0-9]+)/);
    const cutsceneMatch = objLiteral.match(/\bcutscene\s*:\s*([^,\n\r}]+)/);
    const score = scoreMatch ? Number(scoreMatch[1]) : '';
    const coin = coinMatch ? Number(coinMatch[1]) : '';
    let cutscene = cutsceneMatch ? cutsceneMatch[1].trim() : '';
    if (cutscene.startsWith('CutScenesEnum.')) {
      cutscene = cutsceneMap[cutscene] || cutscene;
    }

    if (score === '' || coin === '' || cutscene === '') {
      const snippet = objLiteral.trim().slice(0, 120).replace(/\n/g, ' ');
      console.warn('[warn] Missing fields for key:', keyStr, 'obj:', snippet);
    }

    entries.push({ key: keyStr, score, coin, cutscene });
  }

  return entries;
}

function parseEntryToRow(entry) {
  const key = entry.key;
  // Format: `${sector}_${subSector}_${measure}-${msl}-${effect}`
  const [prefix, msl, effect] = key.split('-');
  const [sector, subSector, ...measureParts] = prefix.split('_');
  const measure = measureParts.join('_');
  return { key, sector, subSector, measure, meanSeaLevel: msl, randomizeEffect: effect, score: entry.score, coin: entry.coin, cutscene: entry.cutscene };
}

function toCsv(rows) {
  const headers = ['key', 'sector', 'subsector', 'measure', 'meanSeaLevel', 'randomizeEffect', 'score', 'coin', 'cutscene'];
  const lines = [headers.join(',')];
  for (const row of rows) {
    const vals = [
      row.key,
      row.sector,
      row.subSector,
      row.measure,
      row.meanSeaLevel,
      row.randomizeEffect,
      row.score,
      row.coin,
      row.cutscene,
    ].map((v) => {
      const s = String(v ?? '');
      // Quote if contains comma or quote
      if (/[",\n]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    });
    lines.push(vals.join(','));
  }
  return lines.join('\n');
}

function main() {
  const enumsTs = readFile(enumsPath);
  const scenarioTs = readFile(scenarioPath);
  const activityMap = buildActivityEnumMap(enumsTs);
  const cutsceneMap = buildCutsceneEnumMap(enumsTs);
  const entries = extractRoundOneEntries(scenarioTs, activityMap, cutsceneMap);
  const rows = entries.map(parseEntryToRow);
  const csv = toCsv(rows);

  const outDir = path.join(repoRoot, 'exports');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'round-one-keys.csv');
  fs.writeFileSync(outPath, csv, 'utf8');
  console.log('Wrote CSV:', outPath, `(${rows.length} rows)`);
}

main();


