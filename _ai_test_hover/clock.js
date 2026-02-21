// =============================================================
// 🕐 アナログ時計 — canvas 描画デモ
// clock.html と同じフォルダに置いて開いてください
// =============================================================

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ─── 設定オブジェクト ───────────────────────────────────
const CONFIG = {
    radius: 180,          // 時計の半径（px）
    faceColor: '#1a1a2e', // 文字盤の色
    rimColor: '#e0c97f',  // 外枠の色
    tickColor: '#c9d1d9', // 目盛りの色
    handColors: {
        hour:   '#e0c97f', // 時針の色
        minute: '#c9d1d9', // 分針の色
        second: '#e05555', // 秒針の色
    },
    numberColor: '#e6edf3', // 数字の色
    shadowColor: 'rgba(0, 0, 0, 0.5)',
};

// =============================================================
// ── 初期化 ────────────────────────────────────────────────
// =============================================================

/**
 * canvas のサイズをウィンドウにフィットさせ、アニメーションを開始する
 */
function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

/**
 * canvas サイズをウィンドウに合わせてリサイズする
 */
function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

// =============================================================
// ── 描画ユーティリティ ────────────────────────────────────
// =============================================================

/**
 * 現在の時刻から時針・分針・秒針の角度（ラジアン）を返す
 * @returns {{ h: number, m: number, s: number }}
 */
function getHandAngles() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    return {
        // -π/2 ずらして12時を上にする
        h: ((h + m / 60) / 12) * Math.PI * 2 - Math.PI / 2,
        m: ((m + s / 60) / 60) * Math.PI * 2 - Math.PI / 2,
        s: (s / 60) * Math.PI * 2 - Math.PI / 2,
    };
}

/**
 * 針を1本描画する
 * @param {number} angle  - 角度（ラジアン）
 * @param {number} length - 針の長さ（px）
 * @param {number} width  - 針の太さ（px）
 * @param {string} color  - 針の色
 */
function drawHand(angle, length, width, color) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
        Math.cos(angle) * length,
        Math.sin(angle) * length
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

/**
 * 時計の文字盤（円形の背景）を描画する
 */
function drawFace() {
    const r = CONFIG.radius;

    // 外枠のグロー効果
    ctx.beginPath();
    ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
    ctx.strokeStyle = CONFIG.rimColor;
    ctx.lineWidth = 4;
    ctx.shadowColor = CONFIG.rimColor;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 文字盤の塗りつぶし
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.faceColor;
    ctx.fill();
}

/**
 * 12個の目盛り（時間マーク）と数字を描画する
 */
function drawTicksAndNumbers() {
    const r = CONFIG.radius;

    for (let i = 1; i <= 12; i++) {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;

        // 目盛り線
        const isHour = i % 3 === 0; // 3・6・9・12は長い目盛り
        const tickLen = isHour ? 18 : 10;
        const inner = r - tickLen;

        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
        ctx.lineTo(Math.cos(angle) * (r - 4), Math.sin(angle) * (r - 4));
        ctx.strokeStyle = CONFIG.tickColor;
        ctx.lineWidth = isHour ? 2.5 : 1;
        ctx.stroke();

        // 数字（3・6・9・12のみ）
        if (isHour) {
            const textR = r - 36;
            ctx.font = 'bold 22px "Segoe UI", sans-serif';
            ctx.fillStyle = CONFIG.numberColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(i), Math.cos(angle) * textR, Math.sin(angle) * textR);
        }
    }
}

/**
 * 時針・分針・秒針と中心ドットを描画する
 */
function drawHands() {
    const r = CONFIG.radius;
    const { h, m, s } = getHandAngles();

    drawHand(h, r * 0.55, 6,  CONFIG.handColors.hour);
    drawHand(m, r * 0.78, 4,  CONFIG.handColors.minute);
    drawHand(s, r * 0.88, 1.5, CONFIG.handColors.second);

    // 中心ドット
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.handColors.second;
    ctx.fill();
}

// =============================================================
// ── メインループ ───────────────────────────────────────────
// =============================================================

/**
 * 毎フレーム呼ばれるアニメーションループ。
 * canvas をクリアしてから時計全体を再描画する。
 */
function animate() {
    requestAnimationFrame(animate);

    // 背景をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 時計の中心に座標系を移動して描画
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    drawFace();
    drawTicksAndNumbers();
    drawHands();

    ctx.restore();
}

// =============================================================
// ── 起動 ───────────────────────────────────────────────────
// =============================================================
init();
