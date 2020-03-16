# vue-calendar
Vueの基本を学ぶ課題。
3日間で終わるぐらいを目標にしてほしい。

## 要件
- カレンダーを表示する
- 今日の日付は文字色を変更する
- 今日まで戻れるボタンを作成する
- カレンダーは月単位で加減算できるようにする
- APIから祝日を取得してカレンダーに反映する

## API
サードパーティAPIは以下を利用する。
去年・今年・来年のみ取得可能で、詳しくは以下に記載されている。
https://holidays-jp.github.io/

### 祝日取得
URL: https://holidays-jp.github.io/api/v1/
Method: get

## 綺麗に書くコツ
- `vue template`には式を極力書かない
- コンポーネントはファイル名で依存関係がわかるようにする
- `vuex`を利用するコンポーネントは限定する
