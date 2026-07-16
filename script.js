// ===== 游戏数据 =====
// 每个游戏：名称、描述、图标（emoji）、类型标签、跳转链接
const games = [
  {
    name: "我的世界",
    desc: "沙盒建造游戏，无限创造力的像素世界",
    icon: "⛏️",
    tags: ["沙盒", "创造"],
    url: "https://www.minecraft.net/",
    links: [
      { label: "MC百科", url: "https://www.mcmod.cn/", desc: "中文Minecraft模组百科，收录海量模组资料与教程" },
      { label: "中文Wiki", url: "https://wiki.biligame.com/mc/Minecraft_Wiki", desc: "B站游戏WIKI，MC中文资料最全的维基站点" },
      { label: "SakuraFrp", url: "https://www.natfrp.com/user/", desc: "免费内网穿透服务，MC联机开服必备" },
      { label: "音效素材", url: "https://o.xbottle.top/mcsounds/", desc: "Minecraft音效在线试听与下载" },
      { label: "魔改合成", url: "https://crafting.thedestruc7i0n.ca/", desc: "自定义合成表生成器，快速制作数据包" }
    ]
  },
  {
    name: "三角洲行动",
    desc: "腾讯天美战术射击，大规模战场 + 危险行动模式",
    icon: "🪖",
    tags: ["FPS", "战术"],
    url: "https://df.qq.com/",
    links: [
      { label: "三角洲行动一图流", url: "https://www.kkrb.net/", desc: "三角洲行动一图流攻略，武器/地图/任务速查" },
      { label: "小黑盒社区", url: "https://www.xiaoheihe.cn/game/120001", desc: "三角洲行动玩家社区，攻略讨论与战绩分享" }
    ]
  },
  {
    name: "英雄联盟（国服）",
    desc: "5v5 MOBA 竞技网游，全球最受欢迎的电竞游戏",
    icon: "🏆",
    tags: ["MOBA", "竞技"],
    url: "https://lol.qq.com/",
    links: [
      { label: "OP.GG 战绩查询", url: "https://www.op.gg/", desc: "全球最流行的LOL战绩查询平台，支持多区服" },
      { label: "B站赛事直播", url: "https://live.bilibili.com/6", desc: "B站英雄联盟赛事官方直播间" }
    ]
  },
  {
    name: "英雄联盟（亚服）",
    desc: "英雄联盟 Riot 国际服，东南亚/亚太地区",
    icon: "🌏",
    tags: ["MOBA", "竞技"],
    url: "https://www.leagueoflegends.com/",
    links: [
      { label: "OP.GG 战绩查询", url: "https://www.op.gg/", desc: "全球最流行的LOL战绩查询平台，支持多区服" },
      { label: "U.GG 数据统计", url: "https://u.gg/", desc: "专业LOL数据统计，英雄胜率、出装推荐一应俱全" }
    ]
  },
  {
    name: "Bilibili",
    desc: "B站直播间收藏，点击卡片进入B站主页",
    icon: "📺",
    tags: ["直播"],
    url: "https://www.bilibili.com/",
    links: [
      { label: "黑化米米宗", url: "https://live.bilibili.com/22472183", desc: "B站直播间：黑化米米宗" },
      { label: "蜡笔小爹Official", url: "https://live.bilibili.com/1986464383", desc: "B站直播间：蜡笔小爹Official" },
      { label: "拾忆-三角洲行动", url: "https://live.bilibili.com/32042349", desc: "B站直播间：拾忆-三角洲行动" }
    ]
  }
];

// ===== DOM 引用 =====
const gameGrid = document.getElementById("gameGrid");

// ===== 浮动简介气泡 =====
const tooltip = document.createElement("div");
tooltip.className = "tooltip-float";
document.body.appendChild(tooltip);

gameGrid.addEventListener("mousemove", e => {
  const link = e.target.closest(".submenu a");
  if (!link) {
    tooltip.classList.remove("visible");
    return;
  }
  const desc = link.dataset.desc;
  if (!desc) {
    tooltip.classList.remove("visible");
    return;
  }
  tooltip.textContent = desc;
  tooltip.style.left = e.clientX + "px";
  tooltip.style.top = e.clientY + "px";
  tooltip.classList.add("visible");
});

gameGrid.addEventListener("mouseleave", () => {
  tooltip.classList.remove("visible");
});

// ===== 渲染游戏卡片 =====
function renderGames() {
  gameGrid.innerHTML = games.map(g => `
    <div class="card-wrapper">
      <a class="card" href="${g.url}" target="_blank" rel="noopener">
        <div class="card-icon">${g.icon}</div>
        <div class="card-body">
          <div class="card-name">${g.name}</div>
          <div class="card-desc">${g.desc}</div>
        </div>
        <div class="card-footer">
          <span class="card-type">${g.tags[0]}</span>
          <span class="card-arrow">前往 →</span>
        </div>
      </a>
      <div class="submenu">
        ${(g.links || []).map(l => `<a href="${l.url}" target="_blank" rel="noopener" data-desc="${l.desc || ''}"><span class="sub-link-label">${l.label}</span><span class="sub-link-url">${l.url}</span></a>`).join("")}
      </div>
    </div>
  `).join("");
}

// ===== 初始渲染 =====
renderGames();


// ===== 音乐播放器 =====
const audio = document.getElementById("audioPlayer");
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnAdd = document.getElementById("btnAdd");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const timeDisplay = document.getElementById("timeDisplay");
const nowPlaying = document.getElementById("nowPlaying");
const volumeSlider = document.getElementById("volumeSlider");
const playlistUl = document.getElementById("playlistUl");

let playlist = [];
let currentIndex = -1;
let isPlaying = false;

// ===== 渲染歌曲目录 =====
function renderPlaylist() {
  if (playlist.length === 0) {
    playlistUl.innerHTML = '<li class="player-playlist-empty">播放列表为空，点击 + 添加音乐</li>';
    return;
  }
  playlistUl.innerHTML = playlist.map((track, i) => {
    const activeClass = i === currentIndex ? ' active' : '';
    return `<li class="player-playlist-item${activeClass}" data-index="${i}">
      <span class="playlist-index">${(i + 1).toString().padStart(2, '0')}</span>
      <span class="playlist-name" title="${track.name}">${track.name}</span>
    </li>`;
  }).join("");
}

// 点击歌曲目录切歌
playlistUl.addEventListener("click", (e) => {
  const item = e.target.closest(".player-playlist-item");
  if (!item) return;
  const index = parseInt(item.dataset.index);
  if (isNaN(index) || index === currentIndex) return;
  loadTrack(index);
  audio.play();
});

// 更新当前高亮
function highlightPlaylistItem() {
  const items = playlistUl.querySelectorAll(".player-playlist-item");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === currentIndex);
  });
}

// ===== 自动加载 music/playlist.txt =====
(async function autoLoad() {
  try {
    const resp = await fetch("music/playlist.txt");
    if (!resp.ok) return;
    const text = await resp.text();
    const names = text.split("\n")
      .map(l => l.trim())
      .filter(l => l && !l.startsWith("#"));
    if (names.length === 0) return;
    names.forEach(name => {
      const src = "music/" + name;
      playlist.push({ name, blob: src });
    });
    currentIndex = 0;
    renderPlaylist();
    loadTrack(0);
    audio.play().catch(() => {
      showAutoplayPrompt();
    });
  } catch (e) {
    // file:// 协议下 fetch 可能不可用，静默回退
  }
})();

function showAutoplayPrompt() {
  if (document.getElementById("autoplayPrompt")) return;
  const prompt = document.createElement("div");
  prompt.id = "autoplayPrompt";
  prompt.className = "autoplay-prompt";
  prompt.textContent = "点击任意位置来个小曲儿~";
  const player = document.querySelector(".player");
  player.appendChild(prompt);
  const dismiss = () => {
    audio.play().catch(() => {});
    prompt.classList.add("fade-out");
    setTimeout(() => prompt.remove(), 400);
    document.removeEventListener("click", dismiss);
  };
  document.addEventListener("click", dismiss);
}

btnAdd.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  const files = Array.from(fileInput.files);
  const audioFiles = files.filter(f => !f.name.endsWith(".lrc"));

  audioFiles.forEach(file => {
    playlist.push({ name: file.name, blob: URL.createObjectURL(file) });
  });

  fileInput.value = "";
  renderPlaylist();
  if (currentIndex === -1 && playlist.length > 0) {
    currentIndex = 0;
    loadTrack(0);
  }
});

function loadTrack(index) {
  currentIndex = index;
  const track = playlist[index];
  audio.src = track.blob;
  audio.load();
  nowPlaying.textContent = track.name;
  highlightPlaylistItem();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
}

btnPlay.addEventListener("click", () => {
  if (playlist.length === 0) {
    fileInput.click();
    return;
  }
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener("play", () => {
  isPlaying = true;
  btnPlay.innerHTML = "&#x23F8;";
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  btnPlay.innerHTML = "&#x25B6;";
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + "%";
    timeDisplay.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
  }
});

audio.addEventListener("ended", () => {
  if (currentIndex < playlist.length - 1) {
    loadTrack(currentIndex + 1);
    audio.play();
  } else {
    isPlaying = false;
    btnPlay.innerHTML = "&#x25B6;";
    progressFill.style.width = "0%";
    timeDisplay.textContent = "00:00 / 00:00";
  }
});

progressBar.addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

btnPrev.addEventListener("click", () => {
  if (playlist.length === 0) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    const prev = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    loadTrack(prev);
    audio.play();
  }
});

btnNext.addEventListener("click", () => {
  if (playlist.length === 0) return;
  const next = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
  loadTrack(next);
  audio.play();
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

audio.volume = volumeSlider.value;

// ===== 实时时钟 =====
function updateClock() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const h = now.getHours().toString().padStart(2, "0");
  const min = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("clock").textContent = `${y}年${m}月${d}日${h}时${min}分${s}秒`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== 改枪码数据 (优先 fetch gun-codes.txt，降级内嵌回退) =====
(async function renderGunCodes() {
  let codes = [];

  try {
    const resp = await fetch("gun-codes.txt");
    if (resp.ok) {
      const text = await resp.text();
      codes = text.split("\n")
        .map(l => l.trim())
        .filter(l => l && l.includes("-"));
    }
  } catch (e) {}

  if (codes.length === 0) {
    codes = [
      "M14射手步枪-6K12PLS09FLPD0MNQVS8Q",
      "M14射手步枪-6K12Q7009FLPD0MNQVS8Q",
      "SR-25射手步枪-6K12QIS09FLPD0MNQVS8Q",
      "M700狙击步枪-6JT66B809FLPD0MNQVS8Q",
      "AUG突击步枪-6K12R5809FLPD0MNQVS8Q",
      "AS Val突击步枪-6K12RDO09FLPD0MNQVS8Q",
      "ASh-12战斗步枪-6K12RK809FLPD0MNQVS8Q",
      "ASh-12战斗步枪-6K12RSO09FLPD0MNQVS8Q",
      "M7战斗步枪-6JV6J2S09FLPD0MNQVS8Q",
      "M7战斗步枪-6JUGBAK0AO21USGQ8AC2S",
      "AWM狙击步枪-6K12S5S09FLPD0MNQVS8Q",
      "K416突击步枪-6K12U0009FLPD0MNQVS8Q",
      "KC17突击步枪-6K14TC409FLPD0MNQVS8Q",
      "K437突击步枪-6K14U0K09FLPD0MNQVS8Q",
      "M4A1突击步枪-6K1EVCS09FLPD0MNQVS8Q",
      "杠杆式步枪-6K1F48809FLPD0MNQVS8Q",
      "SVD狙击步枪-6K1F05K09FLPD0MNQVS8Q",
      "AR57突击步枪-6K1F0OG09FLPD0MNQVS8Q",
      "SCAR-H战斗步枪-6K1F1I409FLPD0MNQVS8Q"
    ];
  }

  const list = document.getElementById("gunCodeList");
  list.innerHTML = codes.map(item => {
    const lastDash = item.lastIndexOf("-");
    const name = item.slice(0, lastDash);
    const code = item.slice(lastDash + 1);
    return `<div class="gun-code-item"><span class="gc-name" title="${name}">${name}</span><span class="gc-code" data-code="${code}">${code}</span></div>`;
  }).join("");

  list.addEventListener("click", e => {
    const codeEl = e.target.closest(".gc-code");
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.dataset.code).then(() => {
      showCopyToast(e.clientX, e.clientY);
    }).catch(() => {});
  });
})();

// ===== 复制成功提示 =====
let toastTimer;
function showCopyToast(x, y) {
  let toast = document.getElementById("copyToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "copyToast";
    toast.className = "copy-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = "复制成功";
  toast.style.left = x + "px";
  toast.style.top = (y - 36) + "px";
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1200);
}

// ===== 改枪码面板折叠切换 =====
const gunCodeToggle = document.getElementById("gunCodeToggle");
const gunCodePanel = document.getElementById("gunCodePanel");
gunCodeToggle.addEventListener("click", () => {
  gunCodePanel.classList.toggle("collapsed");
  gunCodeToggle.innerHTML = gunCodePanel.classList.contains("collapsed") ? "&#x25C0;" : "&#x25B6;";
});
