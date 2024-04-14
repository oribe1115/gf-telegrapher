# Usage

## Google Apps Scriptへのデプロイ

### 1. claspのインストール

```sh
npm install -g @google/clasp
```

[google/clasp: 🔗 Command Line Apps Script Projects](https://github.com/google/clasp)
ローカルでビルドした`*.gs`をGASのプロジェクトに反映する際に必要

### 2. claspでのログイン

```sh
clasp login
```

GASのプロジェクトを作成するGoogleアカウントで認証する

### 3. GASプロジェクトの作成

このリポジトリではデプロイ先の環境(`dev`、`prod`)を出し分けられるため、それぞれ用のGASプロジェクトを作成することを推奨

作成したプロジェクトは https://script.google.com/home で確認できる

#### 3.1 dev用GASプロジェクトの作成

```sh
clasp create --type standalone --title gf-telegrapher
mv .clasp.json .clasp-dev.json
sed -i -E 's/"rootDir":"(.+)"/"rootDir":"\1\/dist"/g' .clasp-dev.json
```

#### 3.2 prod用GASプロジェクトの作成

```sh
clasp create --type standalone --title gf-telegrapher
mv .clasp.json .clasp-prod.json
sed -i -E 's/"rootDir":"(.+)"/"rootDir":"\1\/dist"/g' .clasp-prod.json
```

### 4. 環境変数の設定

作成したGASプロジェクト上で環境変数を設定する

対象のプロジェクトのエディタから「プロジェクトの設定 > スクリプトプロパティ」

TODO: 設定項目

### 5. GASプロジェクトへの実装のデプロイ

node_modulesの取得
```sh
npm ci
```

#### 5.1 dev用GASプロジェクトにデプロイする場合
```sh
npm run deploy
```

#### 5.2 prod用GASプロジェクトにデプロイする場合
```sh
npm run deploy:prod
```

### 6. GASプロジェクト自体のデプロイ

「デプロイ > 新しいデプロイ」

- 種類の選択: `ウェブアプリ`
- アクセスできるユーザー: `全員`