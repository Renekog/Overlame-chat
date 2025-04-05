(() => {
  const adjectives = ["Ghost", "Bright", "Witty", "Dark", "Neon"];
  const nouns = ["Echo", "Shell", "Node", "Cursor", "Wave"];
  const colors = ["#00ff99", "#33ccff", "#ff66cc", "#ffcc00", "#99ff33", "#ff4444"];
  function generatePeerName() {
    const a = adjectives[Math.floor(Math.random() * adjectives.length)];
    const n = nouns[Math.floor(Math.random() * nouns.length)];
    const id = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `${a}${n}${id}`;
  }
  function chooseColor(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length];
  }

  const peerName = generatePeerName();
  const peerColor = chooseColor(peerName);
  const pageKey = 'overlame-history-' + btoa(location.hostname + location.pathname).slice(0, 32);
  const channelName = 'overlame-' + btoa(location.hostname + location.pathname).slice(0, 16);
  const channel = new BroadcastChannel(channelName);
  const sessionStart = Date.now();
  let scrollMax = 0;
  let pulseCount = 0;

  // Terminal UI Dock
  const toggle = document.createElement("button");
  toggle.textContent = "💬";
  Object.assign(toggle.style, {
    position: "fixed", bottom: "16px", right: "16px", zIndex: 999999,
    width: "44px", height: "44px", borderRadius: "22px", background: "#0f0", border: "none",
    fontWeight: "bold", fontSize: "18px", color: "#000", cursor: "pointer"
  });

  const panel = document.createElement("div");
  Object.assign(panel.style, {
    display: "none", position: "fixed", bottom: "0", right: "0", height: "250px",
    width: "100%", maxWidth: "600px", background: "#000", color: "#0f0", borderTop: "2px solid #0f0",
    zIndex: 999998, fontFamily: "monospace", boxShadow: "0 -4px 10px rgba(0,255,0,0.2)", padding: "8px"
  });

  const header = document.createElement("div");
  header.textContent = "Overlame · v0.9.0";
  header.style.fontWeight = "bold";
  header.style.marginBottom = "4px";
  panel.appendChild(header);

  const log = document.createElement("div");
  Object.assign(log.style, {
    height: "150px", overflowY: "scroll", border: "1px solid #0f0",
    padding: "4px", marginBottom: "4px", fontSize: "13px"
  });
  panel.appendChild(log);

  const input = document.createElement("input");
  Object.assign(input.style, {
    width: "100%", background: "#000", color: "#0f0", border: "1px solid #0f0", padding: "4px",
    fontFamily: "monospace"
  });
  input.placeholder = ">> message";

  const footer = document.createElement("div");
  footer.innerHTML = '<small style="color:#0f0">Overlame · <a href="https://overlame.chat" target="_blank" style="color:#0f0">overlame.chat</a></small>';
  footer.style.marginTop = "6px";

  panel.appendChild(input);
  panel.appendChild(footer);

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  toggle.onclick = () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  };

  function showMessage(data) {
    const line = document.createElement("div");
    line.innerHTML = `<span style="color:${chooseColor(data.name)}">${data.name}</span>: ${data.text}`;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()) {
      const msg = { name: peerName, text: input.value };
      showMessage(msg);
      channel.postMessage({ type: "msg", data: msg });
      const history = JSON.parse(localStorage.getItem(pageKey) || "[]");
      history.push(msg);
      localStorage.setItem(pageKey, JSON.stringify(history));
      input.value = "";
    }
  });

  channel.onmessage = e => {
    if (e.data.type === "msg" && e.data.data.name !== peerName) {
      showMessage(e.data.data);
    }
  };

  const saved = JSON.parse(localStorage.getItem(pageKey) || "[]");
  saved.forEach(showMessage);

  // Debug HUD
  const hud = document.createElement("div");
  Object.assign(hud.style, {
    position: "fixed", top: "8px", right: "8px", zIndex: 999999,
    background: "#000", color: "#0f0", fontFamily: "monospace",
    border: "1px solid #0f0", padding: "8px", fontSize: "12px",
    maxWidth: "240px", lineHeight: "1.4em"
  });
  document.body.appendChild(hud);

  setInterval(() => {
    const duration = Math.floor((Date.now() - sessionStart) / 1000);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((window.scrollY / docHeight) * 100);
    scrollMax = Math.max(scrollMax, scrollDepth);
    const metrics = {
      peer: peerName,
      time: duration,
      scroll: scrollMax,
      pulses: pulseCount,
      page: location.href,
      earned: (duration * 0.001).toFixed(4) + " ⊚"
    };
    localStorage.setItem("overlame-metrics", JSON.stringify(metrics));
    hud.innerHTML = `
<b>Overlame Debug</b><br/>
🧑 ${peerName}<br/>
🕓 ${metrics.time}s<br/>
📜 Scroll: ${metrics.scroll}%<br/>
⚡ Pulses: ${metrics.pulses}<br/>
💰 ${metrics.earned}
`;
  }, 3000);

  document.addEventListener("keydown", () => pulseCount++);
  document.addEventListener("click", () => pulseCount++);
})();
