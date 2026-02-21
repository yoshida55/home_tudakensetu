// =============================================================
// 🎆 AIホバー機能テスト用 ── パーティクル花火
// このファイルは _ai_test_hover フォルダごと削除すれば元に戻ります
// =============================================================

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];

// 動作パラメータをまとめた設定オブジェクト
const CONFIG = {
    particleCount: 80,   // 1回の爆発で生成する粒子の数
    gravity: 0.15,       // 粒子にかかる下方向の加速度
    friction: 0.98,      // 速度を毎フレーム減衰させる係数（1に近いほど長く飛ぶ）
    minSpeed: 2,         // 粒子が飛び出す最小の速さ
    maxSpeed: 10,        // 粒子が飛び出す最大の速さ
    lifespan: 1.0,       // 粒子の初期ライフ量（1.0 = 100%）
    decayRate: 0.015,    // 1フレームあたりのライフ減衰量
};

// ------------------- ユーティリティ -------------------

/**
 * min〜max の範囲でランダムな実数を返す
 */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * ランダムな HSL カラー文字列を返す（鮮やかな色のみ）
 */
function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 60%)`;
}

// ------------------- パーティクル管理 -------------------

/**
 * 指定座標にパーティクル1つのデータを生成して返す
 * @param {number} x - 生成X座標
 * @param {number} y - 生成Y座標
 */
function createParticle(x, y) {
    const angle = randomBetween(0, Math.PI * 2);
    const speed = randomBetween(CONFIG.minSpeed, CONFIG.maxSpeed);
    return {
        x,
        y,
        vx: Math.cos(angle) * speed,  // X方向の速度成分
        vy: Math.sin(angle) * speed,  // Y方向の速度成分
        radius: randomBetween(2, 5),
        color: randomColor(),
        life: CONFIG.lifespan,
    };
}

/**
 * 指定座標でパーティクルを一斉爆発させる
 * @param {number} x - 爆発中心X
 * @param {number} y - 爆発中心Y
 */
function explode(x, y) {
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(createParticle(x, y));
    }
}

/**
 * パーティクルの物理状態を1フレーム分更新する（移動・重力・摩擦）
 * @param {object} p - パーティクルオブジェクト
 */
function updateParticle(p) {
    p.vy += CONFIG.gravity;    // 重力で下に加速
    p.vx *= CONFIG.friction;   // 摩擦で速度を減衰
    p.vy *= CONFIG.friction;
    p.x += p.vx;              // 位置を更新
    p.y += p.vy;
    p.life -= CONFIG.decayRate; // ライフを消費
}

/**
 * パーティクルをキャンバスに1つ描画する
 * @param {object} p - パーティクルオブジェクト
 */
function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life); // ライフが減るほど透明に
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
}

/**
 * パーティクルがまだ生きているかを返す
 * @param {object} p - パーティクルオブジェクト
 * @returns {boolean}
 */
function isAlive(p) {
    return p.life > 0;
}

// ------------------- 描画・アニメーション -------------------

/**
 * キャンバスを半透明の黒で塗りつぶす（残像トレイル効果）
 */
function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * メインのアニメーションループ（requestAnimationFrame で毎フレーム呼ばれる）
 */
function animate() {
    requestAnimationFrame(animate);
    clearCanvas();

    // 後ろから走査して死んだパーティクルを splice で削除
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        updateParticle(p);
        drawParticle(p);
        if (!isAlive(p)) {
            particles.splice(i, 1);
        }
    }
}

/**
 * キャンバスサイズをウィンドウに合わせてリサイズする
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// ------------------- イベント登録 -------------------

canvas.addEventListener('click', (e) => {
    explode(e.clientX, e.clientY);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    explode(touch.clientX, touch.clientY);
}, { passive: false });

window.addEventListener('resize', resizeCanvas);

// ------------------- 起動 -------------------
resizeCanvas();
animate();
