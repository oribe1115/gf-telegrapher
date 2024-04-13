# Design

[toc]

## 使い方

- gf-telegrapherは実行可能APIとして公開する
- ユーザーは作成したGoogle Formに対し、GASを作成して適用する
    - 用意されたコードをコピペして適切な設定をすればOK
    - 新規回答が提出された時にgf-telegrapherのAPIに対して情報を送りつけるようなAPIコールをする
        - gf-telegrapherのAccess Token
            - Access Tokenの記述を含めた最終的なソースコードは閲覧範囲が限られた環境でのみ公開
        - FormのID
        - 具体的な回答結果はSpread Sheetを読みに行くので不要
- ユーザーはtraQ上でgf-telegrapherのBOTに対する指定の書式のメンションメッセージででアンケート情報の登録を実行
    - 記載する情報
        - FormのID
        - 回答を記録しているSpread SheetのID
    - gf-telegrapherはFromとSpread SheetのIDの組を記録
    - gf-telegrapherは、Spread Sheetへのアクセス権限などが不十分である場合はエラー情報を返す

## 名前の由来

GF(Google Form)の回答概要を即時に伝達するtelegrapher(電信技師; 電報における電文を打電する人)

