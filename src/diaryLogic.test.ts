import { describe, expect, it } from 'vitest';
import { dateForYear, getDisplayYearsRange, getPreviewText, mergeEntriesByLatestUpdatedAt, type DiaryEntry } from './diaryLogic';

const entry = (dateISO: string, updatedAt = '2026-06-25T00:00:00.000Z', body = '기록'): DiaryEntry => ({
  id: dateISO + '-' + updatedAt,
  dateISO,
  body,
  photos: [],
  createdAt: updatedAt,
  updatedAt,
});

describe('diary logic', () => {
  it('같은 월/일의 표시 연도를 최신 연도부터 만든다', () => {
    expect(getDisplayYearsRange('2026-06-25', 5, [])).toEqual([2026, 2025, 2024, 2023, 2022]);
    expect(getDisplayYearsRange('2026-06-25', 10, [])).toHaveLength(10);
  });

  it('전체 표시는 저장된 가장 오래된 연도까지 확장한다', () => {
    expect(getDisplayYearsRange('2026-06-25', 'all', [entry('2021-01-01')])).toEqual([2026, 2025, 2024, 2023, 2022, 2021]);
  });

  it('윤년이 아닌 2월 29일은 안전하게 null로 둔다', () => {
    expect(dateForYear('2024-02-29', 2023)).toBeNull();
    expect(dateForYear('2024-02-29', 2020)).toBe('2020-02-29');
  });

  it('미리보기 텍스트를 공백 정리 후 자른다', () => {
    expect(getPreviewText('  안녕\n오늘은   좋은 날이었다.  ', 12)).toBe('안녕 오늘은 좋은 날이…');
  });

  it('가져오기 중복 기록은 최신 updatedAt 기준으로 병합한다', () => {
    const merged = mergeEntriesByLatestUpdatedAt([entry('2026-06-25', '2026-06-25T01:00:00.000Z', '이전')], [entry('2026-06-25', '2026-06-25T02:00:00.000Z', '최신')]);
    expect(merged).toHaveLength(1);
    expect(merged[0].body).toBe('최신');
  });
});
