import { LRUCache } from "lru-cache";
import { load } from "cheerio";

import { getRoundedTime } from "./utils";

const cache = new LRUCache<Date, Stats>({ max: 86400 / 5 });
const stats_url = "https://adventofcode.com/2023/stats";

type Day = {
  first: number;
  second: number;
  gold: number;
  silver: number;
};

type Stats = Map<number, Day>;

async function getOverallStats(): Promise<Stats> {
  const time = getRoundedTime();
  const cached = cache.get(time);
  if (cached) {
    return cached;
  }

  const html = await fetchHtml();
  const stats = extractStats(html);
  cache.set(time, stats);

  return stats;
}

async function fetchHtml(): Promise<string> {
  const response = await fetch(stats_url, {
    headers: {
      Cookie: `session=${process.env.SESSION}`,
    },
  });
  if (!response.ok) {
    throw new Error("Could not get AOC stats.");
  }
  return response.text();
}

function extractStats(html: string) {
  const statsMap = new Map<number, Day>();
  const $ = load(html);
  $(".stats > span, .stats > a").each((_, element) => {
    const day = parseInt($(element).text().trim().split(/\s+/)[0]);

    const statsBoth = $(element).find(".stats-both");
    const firstOnly = $(element).find(".stats-firstonly");
    console.log(statsBoth.first().text());
    console.log(statsBoth.last().text());

    statsMap.set(day, {
      first: parseInt(statsBoth.first().text()),
      second: parseInt(firstOnly.first().text()),
      gold: (statsBoth.last().text() || "").length,
      silver: (firstOnly.last().text() || "").length,
    });
  });

  return statsMap;
}

export { getOverallStats };
