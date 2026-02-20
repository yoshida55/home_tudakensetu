/* =======================================
   おもだか屋 - メインスクリプト
======================================= */

// ページ読込完了後に実行
document.addEventListener("DOMContentLoaded", function () {
  /* ----- ハンバーガーメニュー ----- */
  var menuBtn = document.getElementById("js_menu_btn");
  var modalNav = document.getElementById("js_modal_nav");

  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
    modalNav.classList.toggle("active");

    // メニュー展開時はスクロールを止める
    if (modalNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // モーダル内のリンクをクリックしたらメニューを閉じる
  var navLinks = modalNav.querySelectorAll("a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
      menuBtn.classList.remove("active");
      modalNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  /* ----- KVスライダー ----- */
  var kvImages = document.querySelectorAll("#js_kv_slider .kv_img");
  var currentSlide = 0;
  var slideInterval = 5000; // 5秒ごとに切替

  function nextSlide() {
    kvImages[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % kvImages.length;
    kvImages[currentSlide].classList.add("active");
  }

  if (kvImages.length > 1) {
    setInterval(nextSlide, slideInterval);
  }

  /* ----- スクロールフェードイン ----- */
  var fadeElements = document.querySelectorAll(".fade_in");

  // IntersectionObserverが使える場合
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) {
            entries[j].target.classList.add("is_visible");
            observer.unobserve(entries[j].target);
          }
        }
      },
      { threshold: 0.1 }
    );

    for (var k = 0; k < fadeElements.length; k++) {
      observer.observe(fadeElements[k]);
    }
  } else {
    // フォールバック: 全要素を表示
    for (var l = 0; l < fadeElements.length; l++) {
      fadeElements[l].classList.add("is_visible");
    }
  }
});
