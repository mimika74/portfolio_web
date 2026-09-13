# デプロイ手順（概要書 7. のタスク 6〜8）

コード側はすべて対応済み。以下はアカウント作成が必要な作業。
環境変数が未設定でもビルド・表示は通り、該当機能だけ「準備中」表示にフォールバックする。

---

## 6. microCMS（Blog / News）

1. https://microcms.io/ でアカウント作成 → サービスを1つ作成
2. 「API」を新規作成
   - **API 名 / エンドポイント**: `blogs`（コードがこの名前を参照。`server/utils/microcms.ts` の `BLOG_ENDPOINT`）
   - **型**: リスト形式
3. フィールドを追加（フィールドIDは下記のとおりに）

   | フィールドID | 種類 | 必須 | 備考 |
   |---|---|---|---|
   | `title` | テキストフィールド | ○ | 記事タイトル |
   | `slug` | テキストフィールド | ○ | URL 用（半角英数・ハイフン） |
   | `content` | リッチエディタ | ○ | 本文 |
   | `eyecatch` | 画像 | | サムネイル |
   | `tags` | 複数選択（またはテキスト複数） | | 使用技術タグなど |

   ※ 公開日は microCMS 標準の `publishedAt` を使うのでフィールド追加不要。

4. 「API キー」から、`GET` 権限のあるキーを取得
5. `.env` と Vercel の環境変数に設定

   ```
   MICROCMS_SERVICE_DOMAIN=（<xxxx>.microcms.io の xxxx 部分）
   MICROCMS_API_KEY=（取得したキー）
   ```

6. 記事を1件公開して `/blog` と `/blog/<slug>` を確認

---

## 7. お問い合わせフォーム（Formspree）

1. https://formspree.io/ でアカウント作成
2. 新規フォームを作成 → 通知先メールアドレスを設定
3. フォームのエンドポイント URL（`https://formspree.io/f/xxxxxxxx`）を控える
4. `.env` と Vercel の環境変数に設定

   ```
   NUXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```

5. `/contact` から実際に送信してメール受信を確認
   - ハニーポット（`_gotcha`）を実装済み。Formspree 側の reCAPTCHA も任意で有効化可

---

## 8. Firebase デプロイ ＋ 独自ドメイン

Vercel の電話番号認証が通らなかったため **Firebase** に変更。
Nuxt SSR（ゲートのミドルウェアや `/api/blog` などサーバー処理あり）を動かすには
Cloud Functions / Cloud Run が必要 = **Blaze（従量課金）プランが前提**になる
（無料枠の範囲で個人ポートフォリオ程度のアクセスなら実質 $0 で収まることが多い）。
job-manager-app で GCP は使用済みなので、支払い設定自体は既にある可能性が高い。

> **Cookie の注意（対応済み）**: Firebase Hosting は CDN キャッシュ効率化のため、
> リクエストの Cookie を `__session` という名前のもの以外すべて剥がしてしまう
> （App Hosting でも同様）。閲覧制限ゲートの Cookie 名は最初から `__session` に
> 合わせてあるので、Firebase でもそのまま動く。

### リポジトリを GitHub に用意（済み）

`git@github.com:mimika74/portfolio_web.git` に push 済み。

### 方法A: Firebase App Hosting（推奨・Vercelに近い体験）

GitHub 連携で push するたびに自動ビルド・デプロイされる、Vercel に近い方式。

1. https://console.firebase.google.com/ で新規プロジェクト作成（または既存プロジェクトを使用）
2. 左メニュー「Build → App Hosting」→「始める」
3. **Blaze プランへのアップグレード**を求められたら実施（支払い方法の登録が必要）
4. GitHub アカウントを連携し、`portfolio_web` リポジトリを選択
5. ルートディレクトリ・ブランチ（`main`）を設定し、バックエンドIDを決める
6. **環境変数 / シークレット**を登録（Firebase コンソールの App Hosting 設定、または `apphosting.yaml`）

   | 変数 | 値 |
   |---|---|
   | `SITE_ACCESS_KEY` | 公開前の閲覧制限ゲートの合言葉（一般公開時は削除）。[docs/access-gate.md](docs/access-gate.md) |
   | `NUXT_PUBLIC_SITE_URL` | 一旦は発行される `https://<backend>--<project>.web.app` を設定、独自ドメイン確定後に更新 |
   | `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン |
   | `MICROCMS_API_KEY` | microCMS の API キー（シークレットとして登録） |
   | `NUXT_PUBLIC_FORMSPREE_ENDPOINT` | `https://formspree.io/f/xxxxxxxx` |
   | `NUXT_PUBLIC_GITHUB_USER` | 未設定なら `mimika74` |

7. 「完了してデプロイ」→ 以後は `main` に push するたびに自動デプロイ

### 方法B（手動・トラブル時の代替）: Nitro firebase preset + Hosting + Cloud Functions

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # public directory: .output/public / SPA化はしない
```

`firebase.json`（例）:

```json
{
  "functions": { "source": ".output/server" },
  "hosting": [
    {
      "site": "<プロジェクトID>",
      "public": ".output/public",
      "cleanUrls": true,
      "rewrites": [{ "source": "**", "function": "server" }]
    }
  ]
}
```

`nuxt.config.ts` に Cloud Functions Gen2 設定を追加:

```ts
nitro: {
  firebase: { gen: 2, nodeVersion: '20' },
}
```

デプロイ:

```bash
npm run build -- --preset=firebase
firebase deploy
```

環境変数は Firebase の Secret Manager（`firebase functions:secrets:set`）経由で渡すのが安全
（`.env` を直接コピーする方法は非推奨）。

### 独自ドメイン

1. Firebase コンソール → Hosting（または App Hosting のバックエンド設定）→ 「カスタムドメインを追加」
2. 表示される DNS レコードをドメイン管理側に設定
3. 反映後、`NUXT_PUBLIC_SITE_URL` を本番ドメインに更新して再デプロイ
4. `public/robots.txt` の `Sitemap:` 行を絶対URL（`https://your-domain.com/sitemap.xml`）に更新推奨
5. Google Search Console にサイトを登録し、`sitemap.xml` を送信

---

## デプロイ後の確認

- [ ] `/` `/works` `/blog` `/contact` が表示される
- [ ] 閲覧制限ゲート：Cookie なしで `/gate` に飛ぶ、合言葉で通過できる
- [ ] `/works` 下部に GitHub 公開リポジトリ一覧が出る（対象リポジトリを public にしている場合）
- [ ] `/sitemap.xml` が返る
- [ ] `/contact` から送信 → メール受信
- [ ] `/blog` に記事が出る、`/blog/<slug>` が開く
- [ ] OGP（`https://your-domain.com` を各種シェアデバッガで確認）
