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
        - 現時点でのFormの全ての回答結果
- ユーザーはtraQ上でgf-telegrapherのBOTに対する指定の書式のメンションメッセージででアンケート情報の登録を実行
    - 記載する情報
        - FormのID
        - (回答を記録しているSpread SheetのID)
    - gf-telegrapherはFromとSpread Sheet、概要情報を反映するtraQメッセージのIDの組を記録
    - gf-telegrapherは、Spread Sheetへのアクセス権限などが不十分である場合はエラー情報を返す

traQメッセージに反映する質問の条件
- 所定のprefixが付与された質問
- 回答形式が選択式(ラジオボタン、チェックボックス)
- 「traP ID」についての質問を含んでいる必要がある
    - 任意回答の場合、「unknownによる回答」として扱う

## 実行の流れ

### 新規フォーム登録時

```mermaid
sequenceDiagram
    actor User as 作成者
    participant GF as Google Form
    participant GS as Google Spreadsheet<br>(回答記録用)
    participant traQ
    participant telegrapher as gf-telegrapher
    participant tele-GS as Google Spreadsheet<br>(情報記録用)


    User->>GF: 新規フォームを作成
    GF-->>User: フォームのID
    opt 自由記述などの回答を公開したい場合
    User->>GS: フォームにリンクして作成
    GS-->>User: スプレッドシートのID
    User->>GS: 共有範囲を「リンクを知っている全員」に設定
    GS-->>User: OK
    end

    User->>traQ: フォームID(、スプレッドシートID)を含む登録メッセージを投稿
    traQ->>telegrapher: メッセージ情報
    
    activate telegrapher
    telegrapher->>GF: 現時点での質問＆回答結果をリクエスト
    GF-->>telegrapher: 質問＆回答結果

    opt スプレッドシートIDも登録された場合
    telegrapher->>GS: 閲覧できるか確認
    GS-->>telegrapher: OK
    end

    telegrapher->>traQ: 回答概要を反映するメッセージを作成
    traQ-->>telegrapher: OK
    telegrapher->>tele-GS: traQメッセージID、フォームID(、スプレッドシートID)を記録
    tele-GS-->>telegrapher: OK

    alt 処理に失敗が発生した場合
    telegrapher->>traQ: エラー情報を含むメッセージを投稿
    end
    deactivate telegrapher
```


### フォームへの回答提出時

```mermaid
sequenceDiagram
    actor User as 回答者
    participant GF as Google Form
    participant telegrapher as gf-telegrapher
    participant tele-GS as Google Spreadsheet<br>(情報記録用)
    participant traQ

    User->>GF: 回答を提出
    GF->>telegrapher: 現時点で全ての回答結果

    activate telegrapher
    telegrapher->>tele-GS: フォームIDに対応する情報を取得
    tele-GS-->>telegrapher: メッセージID(、スプレッドシートID)
    telegrapher->>telegrapher: メッセージの組み立て
    telegrapher->>traQ: メッセージの更新
    traQ-->>telegrapher: OK

    deactivate telegrapher
```


## 名前の由来

GF(Google Form)の回答概要を即時に伝達するtelegrapher(電信技師; 電報における電文を打電する人)

