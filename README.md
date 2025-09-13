# 3TASK - React Native Expo アプリケーション

## プロジェクト概要

3TASKは、React Native Expoを使用して構築されたクロスプラットフォームアプリケーションです。iOS、Android、Webの3つのプラットフォームで動作します。

## 技術スタック

- **フレームワーク**: React Native 0.79.6
- **開発環境**: Expo SDK 53
- **言語**: TypeScript
- **ルーティング**: Expo Router
- **ナビゲーション**: React Navigation
- **アニメーション**: React Native Reanimated

## 必要な環境

### 前提条件

- **Node.js**: 18.x以上
- **npm**: 9.x以上
- **Git**: 最新版
- **ブラウザ**: Chrome、Firefox、Safari、Edge（Web開発用）

### 推奨ツール

- **Visual Studio Code**（推奨エディタ）
- **Expo Go**（モバイルアプリ、iOS/Android用）

## 環境構築手順

### 1. リポジトリのクローン

```bash
git clone <リポジトリURL>
cd 3TASK
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

#### Web版（ローカルホスト）

```bash
npm run web
```

ブラウザで以下のURLにアクセス：
- **http://localhost:8081** または **http://localhost:19006**

#### モバイル版

```bash
# 全プラットフォーム用の開発サーバー
npm start

# iOS専用
npm run ios

# Android専用
npm run android
```

### 4. アプリケーションの確認

- **Web**: ブラウザでアプリケーションが表示されることを確認
- **モバイル**: Expo GoアプリでQRコードをスキャンしてアプリを開く

## 開発コマンド

```bash
# 開発サーバー起動（全プラットフォーム）
npm start

# Web版のみ起動
npm run web

# iOS版のみ起動
npm run ios

# Android版のみ起動
npm run android

# コードの静的解析
npm run lint

# プロジェクトリセット（新しいappディレクトリを作成）
npm run reset-project
```

## Git ワークフロー

### 基本的なGit操作

#### 1. 変更をステージングエリアに追加

```bash
# 全ての変更を追加
git add .

# 特定のファイルのみ追加
git add <ファイル名>

# 特定のディレクトリのみ追加
git add <ディレクトリ名>/
```

#### 2. コミット

```bash
git commit -m "コミットメッセージ"
```

コミットメッセージの例：
```bash
git commit -m "feat: 新しい機能を追加"
git commit -m "fix: バグを修正"
git commit -m "docs: READMEを更新"
git commit -m "style: コードのフォーマットを修正"
```

#### 3. リモートリポジトリにプッシュ

```bash
# 初回プッシュの場合
git push -u origin main

# 2回目以降
git push origin main
```

### プルリクエスト（PR）のワークフロー

#### 1. ブランチの作成と切り替え

```bash
# 新しいブランチを作成して切り替え
git checkout -b feature/新機能名

# または
git switch -c feature/新機能名
```

#### 2. 開発とコミット

```bash
# コードの変更
# ...

# 変更をコミット
git add .
git commit -m "feat: 新機能を実装"
```

#### 3. プッシュとプルリクエスト作成

```bash
# ブランチをプッシュ
git push origin feature/新機能名
```

その後、GitHubでプルリクエストを作成：
1. GitHubのリポジトリページにアクセス
2. "Compare & pull request" をクリック
3. タイトルと説明を記入
4. "Create pull request" をクリック

#### 4. プルリクエストのマージ後

```bash
# mainブランチに切り替え
git checkout main

# リモートの最新変更を取得
git pull origin main

# 不要になったブランチを削除
git branch -d feature/新機能名
git push origin --delete feature/新機能名
```

### チーム開発時のワークフロー

#### 1. 最新の変更を取得

```bash
# リモートの最新変更を取得
git pull origin main

# または fetch + merge
git fetch origin
git merge origin/main
```

#### 2. コンフリクトの解決

```bash
# コンフリクトが発生した場合
# 1. ファイルを編集してコンフリクトを解決
# 2. 解決したファイルをステージング
git add <解決したファイル名>

# 3. マージコミットを完了
git commit
```

#### 3. 定期的な同期

```bash
# 開発開始前
git pull origin main

# 開発完了後
git add .
git commit -m "作業内容"
git push origin <ブランチ名>
```

## プロジェクト構造

```
3TASK/
├── app/                    # アプリケーションのメインディレクトリ
│   ├── (tabs)/            # タブナビゲーション
│   │   ├── index.tsx      # ホーム画面
│   │   └── explore.tsx    # 探索画面
│   └── _layout.tsx        # レイアウト設定
├── components/            # 再利用可能なコンポーネント
├── constants/             # 定数定義
├── hooks/                 # カスタムフック
├── assets/               # 画像、フォント等の静的ファイル
├── package.json          # 依存関係とスクリプト
├── app.json             # Expo設定
└── tsconfig.json        # TypeScript設定
```

## トラブルシューティング

### よくある問題

#### 1. ポートが使用中

```bash
# 別のポートを使用するか、使用中のプロセスを終了
# Expoが自動的に別のポートを提案します
```

#### 2. 依存関係のエラー

```bash
# node_modulesを削除して再インストール
rm -rf node_modules
npm install
```

#### 3. キャッシュの問題

```bash
# Expoキャッシュをクリア
npx expo start --clear

# npmキャッシュをクリア
npm cache clean --force
```

#### 4. TypeScriptエラー

```bash
# TypeScript設定を確認
npx tsc --noEmit

# 型定義を再生成
npx expo install --fix
```

## 開発のヒント

### 1. ホットリロード

- ファイルを保存すると自動的にアプリケーションが更新されます
- Web版では、ブラウザのリロードが不要です

### 2. デバッグ

- **Web版**: F12キーで開発者ツールを開く
- **モバイル版**: デバイスを振ってデバッグメニューを開く

### 3. パフォーマンス

- React DevToolsを使用してコンポーネントの状態を確認
- プロファイラーでパフォーマンスの問題を特定

## ライセンス

このプロジェクトのライセンス情報は、プロジェクトのルートディレクトリのLICENSEファイルを参照してください。

## 貢献方法

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## サポート

問題が発生した場合や質問がある場合は、GitHubのIssuesページで報告してください。