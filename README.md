# 따뜻한 기록

Warm Paper Diary 스타일의 개인 다이어리 PWA입니다. 같은 월/일의 여러 해 기록을 세로 카드로 모아 보고, 날짜별 글과 사진을 기기 로컬에 저장합니다. 서버, 로그인, 외부 데이터베이스를 사용하지 않습니다.

## 앱 소개

- 날짜 페이지: 오늘 또는 선택한 월/일 기준으로 최근 5년, 10년, 전체 기록을 연도별로 표시
- 작성/편집: 날짜별 1개 기록만 저장하며, 같은 날짜를 다시 저장하면 기존 기록을 업데이트
- 사진 첨부: 브라우저에서 선택한 사진을 데이터 URI로 변환해 IndexedDB에 저장
- 사진 확대 보기: 전체 화면 뷰어, 좌우 이동, 닫기 지원
- 기록 달력: 월별 기록 위치를 썸네일 또는 clay dot으로 표시
- 설정: 표시 연수, JSON 내보내기/가져오기, 로컬 저장 안내
- PWA: GitHub Pages 정적 배포 후 Android/iOS 홈 화면 추가 가능

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다.

## GitHub Pages 배포 방법

이 레포는 GitHub Actions로 Pages에 배포되도록 `.github/workflows/deploy.yml`을 포함합니다.

1. GitHub Repository Settings → Pages로 이동
2. Source를 **GitHub Actions**로 설정
3. `main` 브랜치에 push
4. Actions의 `Deploy to GitHub Pages` 워크플로가 완료되면 Pages URL에서 확인

일반 레포지토리 Pages 경로는 `https://supervisor-515.github.io/diary/`입니다. 그래서 `vite.config.ts`의 `base`는 `/diary/`로 설정되어 있습니다. username.github.io 루트 Pages로 옮길 경우 `base: '/'`, `manifest.webmanifest`의 `start_url`/`scope`, `public/sw.js`의 `BASE`를 `/`로 바꾸세요.

## PWA 설치 방법

### Android Chrome

1. GitHub Pages URL 열기
2. Chrome 메뉴 `⋮` 선택
3. **앱 설치** 또는 **홈 화면에 추가** 선택

### iPhone Safari

1. GitHub Pages URL 열기
2. 공유 버튼 선택
3. **홈 화면에 추가** 선택

## 데이터 저장 위치와 백업 주의사항

- 다이어리 기록과 사진 데이터 URI는 브라우저 IndexedDB에 저장됩니다.
- 표시 연수 같은 간단한 설정은 localStorage에 저장됩니다.
- 브라우저 데이터 삭제, 기기 변경, 시크릿 모드, 저장 공간 정리 시 기록이 사라질 수 있습니다.
- 설정 화면에서 JSON 내보내기를 주기적으로 사용해 백업하세요.
- 사진은 현재 데이터 URI 형태로 JSON에 포함될 수 있어 사진이 많으면 파일이 커집니다. 별도 사진 파일까지 ZIP으로 묶는 백업은 추후 확장 항목입니다.

## JSON 내보내기/가져오기

설정 → 백업 → 내보내기에서 `schemaVersion`, `exportedAt`, `entries`, `settings`가 포함된 JSON을 다운로드합니다.

가져오기는 같은 화면의 `가져오기`에서 JSON 파일을 선택합니다. 같은 `dateISO` 기록이 있으면 `updatedAt`이 더 최신인 기록을 남깁니다. 잘못된 JSON 파일은 저장하지 않고 한국어 오류를 표시합니다.

## 현재 제한사항

- 서버 동기화가 없으므로 여러 기기 간 자동 동기화는 지원하지 않습니다.
- 사진은 브라우저 로컬 저장소 한도에 영향을 받습니다.
- GitHub Pages 경로가 `/diary/`가 아닌 경우 `vite.config.ts`, `public/manifest.webmanifest`, `public/sw.js`의 base path를 함께 조정해야 합니다.
- date picker는 브라우저 기본 `<input type="date">`를 사용합니다.

## 검증

```bash
npm run test
npm run build
```
