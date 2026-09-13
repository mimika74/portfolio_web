# 公開前の閲覧制限ゲート

GitHub のプロジェクトを充実させている間、デプロイ済みの portfolio を
「合言葉を知っている人だけ」に見せるための簡易ゲート。
job-manager-app の `EnsureAccessKey` ミドルウェアと同じ思想の Nuxt 版。

## 仕組み

```
[ブラウザ] ──/──▶ [Nitro server middleware 00.gate.ts]
                    │  SITE_ACCESS_KEY が空 → 素通り
                    │  Cookie(site_access) が正 → 素通り
                    │  それ以外 → 302 /gate
                    ▼
                 /gate（合言葉フォーム）── POST /api/gate ──▶ 一致で httpOnly Cookie 発行 → 元のページへ
```

- **本物の SSR 出力を返す前に止める**ので、ソース表示・DevTools でも中身は見えない
- `SITE_ACCESS_KEY` が空なら完全に無効（ローカル開発ではゲートは出ない）
- Cookie には生キーではなく `sha256("portfolio-gate:" + key)` を保存。httpOnly / 30日

| ファイル | 役割 |
|---|---|
| `server/middleware/00.gate.ts` | 全リクエストの入口。未認証を `/gate` へ |
| `server/api/gate.post.ts` | フォーム送信先。一致で Cookie 発行 |
| `server/utils/gate.ts` | トークン生成・Cookie 設定 |
| `app/pages/gate.vue` | 合言葉入力画面（`layout: false`、`noindex`） |
| `nuxt.config.ts` | `runtimeConfig.siteAccessKey`（サーバー専用） |

素通りさせるパス: `/_nuxt/` `/_fonts/` `/favicon*` `/robots.txt` `/sitemap.xml` `/gate` `/api/gate`

## 使い方

### 有効にする
`.env`（ローカル）／ デプロイ先（Firebase App Hosting）の環境変数に設定して再デプロイ：

```
SITE_ACCESS_KEY=好きな合言葉
```

### 見せる相手に渡す
- キー入力ページ: `https://your-domain.com/`（→ `/gate` に飛ぶ）
- ワンクリック共有リンク: `https://your-domain.com/?key=好きな合言葉`
  （キーが正しければ Cookie を発行し、クエリを落として元のページへ）

### 解除する（一般公開する）
デプロイ先の環境変数から `SITE_ACCESS_KEY` を削除（または空に）して再デプロイ。
即座にゲートが外れる。コード変更は不要。

### Cookie 名について
Firebase Hosting は CDN キャッシュ効率化のため、リクエストの Cookie を
`__session` という名前のもの以外すべて剥がしてしまう（App Hosting でも同様）。
そのためゲートの Cookie 名は独自名ではなく `__session` にしてある
（`server/utils/gate.ts` の `GATE_COOKIE`）。Vercel など他ホスティングでも
普通の Cookie として問題なく動く。

## ローカルで試す

```
# portfolio/.env に一時的に追記
SITE_ACCESS_KEY=test-123
```

`npm run dev` して `http://localhost:3000/` を開くと `/gate` にリダイレクトされる。
`test-123` を入力すると通過。試し終わったら `.env` の行を消す。

## 注意

これは本格的な認証ではなく簡易的な「合言葉」による閲覧制限。
一時的な限定共有と割り切り、**一般公開の準備ができたら必ず解除する**こと。
