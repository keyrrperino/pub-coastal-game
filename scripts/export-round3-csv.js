/*
  Export Round 3 scenario keys to CSV.
  Columns: Sector, Subsector, Round 1 Measure, Round 2 Measure, randomizer, coins, score, cutscene
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

function extractRoundThreeEntries(scenarioTs, activityMap, cutsceneMap) {
  // Allow optional semicolon after the closing brace, or none
  const objRegex = /export const roundThreeScenarioConfiguration:[\s\S]*?=\s*\{([\s\S]*?)\n\}\s*;?/;
  const objMatch = scenarioTs.match(objRegex);
  if (!objMatch) return [];
  const body = objMatch[1];

  const entries = [];
  // Match either a quoted key or a template key, preserving order of appearance
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

    entries.push({ key: keyStr, score, coin, cutscene });
  }

  return entries;
}

function parseEntryToRow(entry) {
  const key = entry.key;
  // Format: `${sector}_${subSector}_${round1Measure}-${round2Measure}-${meanSeaLevel}-${randomizer}`
  const m = key.match(/^(.+?)-([^-]+)-([^-]+)-([^-]+)$/);
  if (!m) {
    return { sector: '', subsector: '', round1: key, round2: '', randomizer: '', coins: entry.coin, score: entry.score, cutscene: entry.cutscene };
  }
  const [, prefix, round2Measure, _msl, randomizer] = m; // eslint-disable-line @typescript-eslint/no-unused-vars
  const [sector, subSector, ...round1Parts] = prefix.split('_');
  const round1Measure = round1Parts.join('_');
  return { sector, subsector: subSector, round1: round1Measure, round2: round2Measure, randomizer, coins: entry.coin, score: entry.score, cutscene: entry.cutscene };
}

function toCsv(rows) {
  const headers = ['Sector', 'Subsector', 'Round 1 Measure', 'Round 2 Measure', 'randomizer', 'coins', 'score', 'cutscene'];
  const lines = [headers.join(',')];
  for (const row of rows) {
    const vals = [
      row.sector,
      row.subsector,
      row.round1,
      row.round2,
      row.randomizer,
      row.coins,
      row.score,
      row.cutscene,
    ].map((v) => {
      const s = String(v ?? '');
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
  const entries = extractRoundThreeEntries(scenarioTs, activityMap, cutsceneMap);
  const rows = entries.map(parseEntryToRow);
  const csv = toCsv(rows);

  const outDir = path.join(repoRoot, 'exports');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'round-three-keys.csv');
  fs.writeFileSync(outPath, csv, 'utf8');
  console.log('Wrote CSV:', outPath, `(${rows.length} rows)`);
}

main();


