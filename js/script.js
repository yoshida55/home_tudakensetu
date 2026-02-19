const track = document.querySelector(".case_track");
const items = document.querySelectorAll(".case_item");
const btnPrev = document.querySelectorAll(".case_nav_button")[0]; // ＜
const btnNext = document.querySelectorAll(".case_nav_button")[1]; // ＞

let current = 0;
const visibleCount = 4; // 一度に見える枚数
const maxIndex = items.length - visibleCount; // 動ける最大数

btnNext.addEventListener("click", () => {
  if (current < maxIndex) {
    current++;
    move();
  }
});

btnPrev.addEventListener("click", () => {
  if (current > 0) {
    current--;
    move();
  }
});

function move() {
  const cardWidth = items[0].offsetWidth + 20;
  /* ✨
## コードの説明

このコードは、`items`配列の最初の要素（`items[0]`）の幅を取得���、それに20ピクセルを加算した値を`cardWidth`という定数に代入しています。

## 各部分の詳細

`offsetWidth`はHTML要素の表示幅を取得するプロパティで、要素のコンテンツ幅、パディング、ボーダーを含めた合計の幅をピクセル単位で返します。

`+ 20`の部分は、要素間のマージンやギャップとして20ピクセルを追加していると考えられます。

## 想定される利用目的

カルーセルやスライダー、グリッドレイアウトなどで、カード要素を横にスクロールさせる際の移動距離を計算するために使われることが多いです。各カードの実際の幅に余白を加えた値を把握することで、正確なスクロール量やレイアウト計算が可能になります。
*/

  console.log("cardWidth:", cardWidth); // ← 追加
  console.log("current:", current); // ← 追加
  track.style.transform = `translateX(-${current * cardWidth}px)`;
}
