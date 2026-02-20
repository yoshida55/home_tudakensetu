const track = document.querySelector(".case_track");
// カードの枚数
const items = document.querySelectorAll(".case_item");
const btnPrev = document.querySelectorAll(".case_nav_button")[0]; // ＜
const btnNext = document.querySelectorAll(".case_nav_button")[1]; // ＞

// いんでっくすは０から始まるので、currentが0のときは最初のカードが表示されている状態です。
let current = 0;
const visibleCount = 4; // 一度に見える枚数
// items.lengthは現在５枚なので、5 - 4 = 1枚分動ける
const maxIndex = items.length - visibleCount; // 動ける最大数

btnNext.addEventListener("click", (e) => {
  e.preventDefault();
  // 現在の表示位置(current)が動ける最大数(maxIndex)より小さい場合、次へ移動
  if (current < maxIndex) {
    // currentを1増やして次の位置へ移動
    current++;
    move();
  }
});

btnPrev.addEventListener("click", (e) => {
  e.preventDefault();
  // (current)（（つまり次にすすんでいる数））が0より大きい場合、戻れる
  if (current > 0) {
    current--;
    move();
  }
});

function move() {
  const cardWidth = items[0].offsetWidth + 20;
  console.log("cardWidth:", cardWidth); // ← 追加
  console.log("current:", current); // ← 追加
  //　次の位置にすすんだ数だけ、カードの幅に余白20pxを加えた値をかけて、translateXで移動させる
  track.style.transform = `translateX(-${current * cardWidth}px)`;
}

/* ✨
## コードの概要

このコードはカルーセル（スライダー）UIを実装しています。複数のカードを横にスライドさせて表示切り替えを行う機能です。

## 主な動作

HTML内の `.case_track` というコンテナの中に複数の `.case_item` カードが並んでおり、前へ・次へボタンでスライド表示を制御します。

## 変数の役割

- `track`: カードを格納する親要素
- `items`: 全てのカード要素
- `btnPrev` と `btnNext`: 前へ・次へボタン
- `current`: 現在の表示位置（インデックス）
- `visibleCount`: 画面に一度に表示されるカード枚数（4枚）
- `maxIndex`: スライドできる最大位置（全カード数 - 表示枚数）

## ボタンの動作

次へボタンをクリックすると、`current` が1増加し、まだスライド可能であれば `move()` 関数が実行されます。前へボタンは逆に `current` を1減少させます。

## スライドの仕組み

`move()` 関数内で、1枚目のカードの幅に余白20pxを加えた値を `cardWidth` として計算し、`current * cardWidth` の距離だけ `translateX` でトラッ��全体を左に移動させます。

## 追加されたコンソールログ

カードの幅と現在位置を確認するためのデバッグ用出力が2行追加されています。
*/

// クリックしたら、テキストデコレーションがつくようにする

document.querySelectorAll(".case_description").forEach((case_description) => {
  case_description.addEventListener("mouseover", (e) => {
    e.preventDefault();

    document.querySelectorAll(".case_description").forEach((el) => {
      el.style.textDecoration = "none";
    });

    // (current)（（つまり次にすすんでいる数））が0より大きい場合、戻れる
    e.target.style.textDecoration = "underline";
  });
});
