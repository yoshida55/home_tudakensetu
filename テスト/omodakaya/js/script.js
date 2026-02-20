document.addEventListener('DOMContentLoaded', () => {

  // ===========================================
  // 1. ハンバーガーメニューとモーダルナビゲーション
  // ===========================================
  const menuBtn = document.getElementById('js_menu_btn');
  const modalNav = document.getElementById('js_modal_nav');

  if (menuBtn && modalNav) {
    menuBtn.addEventListener('click', () => {
      // open/close状態をトグル
      menuBtn.classList.toggle('active');
      modalNav.classList.toggle('active');
      
      // モーダルが開いている間は背面のスクロールを禁止
      if (modalNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // モーダル内のリンクをクリックした時も閉じる
    const modalLinks = modalNav.querySelectorAll('a');
    modalLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        modalNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===========================================
  // 2. キービジュアルのフェードスライダー
  // ===========================================
  const kvImages = document.querySelectorAll('.kv_img');
  
  if (kvImages.length > 1) {
    let currentSlide = 0;
    
    // 4000ms（4秒）ごとに切り替え
    setInterval(() => {
      // 現在の画像の active クラスを外す
      kvImages[currentSlide].classList.remove('active');
      
      // 次の画像のインデックスへ（最後まで行ったら0に戻る）
      currentSlide = (currentSlide + 1) % kvImages.length;
      
      // 次の画像に active クラスを付ける
      kvImages[currentSlide].classList.add('active');
    }, 4000);
  }

  // ===========================================
  // 3. スクロール連動のフェードインアニメーション
  //    (Intersection Observer)
  // ===========================================
  const fadeElements = document.querySelectorAll('.fade_in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // 画面の下10%のラインを超えたら発火
    threshold: 0
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is_visible');
        observer.unobserve(entry.target); // 一度発火したら監視解除
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

});
