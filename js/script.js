const track = document.querySelector(".case_track");
// カードの枚数
const items = document.querySelectorAll(".case_item");
const btnPrev = document.querySelectorAll(".case_nav_button")[0]; // ＜
const btnNext = document.querySelectorAll(".case_nav_button")[1]; // ＞

// ↑へボタンが押された場合、トップ画面に戻る
const footer_arrow = document.querySelector(".footer_arrow");
footer_arrow.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

console.log(btnNext.textContent);
console.log("JavaScript開始");

// いんでっくすは０から始まるので、currentが0のときは最初のカードが表示されている状態です。
let current = 0;
const visibleCount = 4; // 一度に見える枚数
// items.lengthは現在５枚なので、5 - 4 = 1枚分動ける
const maxIndex = items.length - visibleCount; // 動ける最大数

btnNext.addEventListener("click", (e) => {
  // e.preventDefault();

  console.log("次へボタンがおされました");
  // 現在の表示位置(current/現在の移動している数)が動ける最大数(maxIndex)より小さい場合、次へ移動
  if (current < maxIndex) {
    console.log("current", current);
    console.log("maxIndex", maxIndex);
    // currentを1増やして次の位置へ移動
    current++;
    move();
  }
});

btnPrev.addEventListener("click", (e) => {
  e.preventDefault();
  // 現在の表示位置(current/現在の移動している数)が0より大きい場合、戻れる
  if (current > 0) {
    current--;
    move();
  }
});

function move() {
  const cardWidth = items[0].offsetWidth + 20;
  //　次の位置にすすんだ数だけ、カードの幅に余白20pxを加えた値をかけて、translateXで移動させる
  track.style.transform = `translateX(-${current * cardWidth}px)`;
}

// クリックしたら、テキストデコレーションがつくようにする

document.querySelectorAll(".case_description").forEach((case_description) => {
  case_description.addEventListener("mouseover", (e) => {
    // e.preventDefault();
    console.log("mouseover", e.target);
    document.querySelectorAll(".case_description").forEach((el) => {
      el.style.textDecoration = "none";
    });

    // 現在の表示位置(current/現在の移動している数)が0より大きい場合、戻れる
    e.target.style.textDecoration = "underline";
  });
});

// Diagonal Reveal: スクロールで左上から右下へ表示
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".diagonal-reveal, .scale-in-br").forEach((el) => observer.observe(el));
