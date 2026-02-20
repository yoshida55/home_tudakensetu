document.addEventListener('DOMContentLoaded', () => {

  // ===========================================
  // 1. スライダー（施工事例）の自作処理
  //    外部ライブラリ（Splide等）に依存しないシンプルなスライド
  // ===========================================
  const track = document.getElementById('case_track');
  const items = document.querySelectorAll('.case_item');
  const btnPrev = document.getElementById('prev_btn');
  const btnNext = document.getElementById('next_btn');

  if (track && items.length > 0 && btnPrev && btnNext) {
    let currentSlide = 0;
    // 表示したい枚数（今回は4枚とする）
    const visibleItems = 4;
    
    // スライド可能な最大インデックス（全体の枚数 - 表示する枚数）
    const maxIndex = items.length > visibleItems ? items.length - visibleItems : 0;

    // スライドさせる関数
    function updateSlidePosition() {
      // 1つのアイテムの幅 ＋ gap（gapはCSSで30pxと指定）
      const itemWidth = items[0].offsetWidth;
      const gap = 30; 
      const moveAmount = (itemWidth + gap) * currentSlide;

      track.style.transform = `translateX(-${moveAmount}px)`;
    }

    // 「＞」ボタンクリック
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      // 最大値未満なら進める
      if (currentSlide < maxIndex) {
        currentSlide++;
        updateSlidePosition();
      }
    });

    // 「＜」ボタンクリック
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      // 0より大きければ戻せる
      if (currentSlide > 0) {
        currentSlide--;
        updateSlidePosition();
      }
    });

    // 画面リサイズ時にズレを防止するため再計算
    window.addEventListener('resize', () => {
      updateSlidePosition();
    });
  }

  // ===========================================
  // 2. ハンバーガーメニューの開閉（クラスの付け外し）
  // ===========================================
  const hamburgerBtn = document.getElementById('hamburger_btn');
  
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      // openクラスを付け外しする
      hamburgerBtn.classList.toggle('open');
      
      // 注意: このシンプルなバージョンではナビリスト自体は常に表示されています。
      // もしスマホサイズ等で隠してアコーディオンにするなら、
      // ナビの方にも open の toggle 処理を追加します。
    });
  }
  // ===========================================
  // 3. スクロール連動フェードインアニメーション
  //    (Intersection Observer を使用)
  // ===========================================
  const fadeElements = document.querySelectorAll('.fade_in');
  
  // スマホなどにも対応するため、少し画面に入ったら発火するようにオプション設定
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // 画面の下から10%のラインを越えたら発火
    threshold: 0
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // 画面内に入ったら is_visible クラスを付与
      if (entry.isIntersecting) {
        entry.target.classList.add('is_visible');
        // 一度フェードインしたら監視を解除したい場合は以下のコメントを外す（ずっと出たままにする）
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // fade_in クラスを持つすべての要素を監視対象にする
  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

});