export type DisplayYears = 5 | 10 | 'all';
export type DiaryEntry = { id: string; dateISO: string; body: string; photos: unknown[]; createdAt: string; updatedAt: string };

export function toDateISO(date: Date): string {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

export function parseDateISO(dateISO: string): Date {
  const [year, month, day] = dateISO.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function dateForYear(selectedDateISO: string, year: number): string | null {
  const source = parseDateISO(selectedDateISO);
  const candidate = new Date(year, source.getMonth(), source.getDate());
  return candidate.getFullYear() === year && candidate.getMonth() === source.getMonth() && candidate.getDate() === source.getDate() ? toDateISO(candidate) : null;
}

export function getPreviewText(body: string, maxLength = 96): string {
  const text = body.replace(/\s+/g, ' ').trim();
  if (!text) return '글 없이 사진만 남긴 기록';
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '…' : text;
}

export function getDisplayYearsRange(selectedDateISO: string, displayYears: DisplayYears, entries: DiaryEntry[]): number[] {
  const anchorYear = Number(selectedDateISO.slice(0, 4));
  if (displayYears === 5 || displayYears === 10) return Array.from({ length: displayYears }, (_, index) => anchorYear - index);
  const oldest = entries.length ? Math.min(...entries.map((entry) => Number(entry.dateISO.slice(0, 4)))) : anchorYear - 4;
  return Array.from({ length: anchorYear - Math.min(oldest, anchorYear) + 1 }, (_, index) => anchorYear - index);
}

export function mergeEntriesByLatestUpdatedAt(current: DiaryEntry[], incoming: DiaryEntry[]): DiaryEntry[] {
  const byDate = new Map(current.map((entry) => [entry.dateISO, entry]));
  for (const entry of incoming) {
    const old = byDate.get(entry.dateISO);
    if (!old || entry.updatedAt.localeCompare(old.updatedAt) >= 0) byDate.set(entry.dateISO, entry);
  }
  return Array.from(byDate.values()).sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}
