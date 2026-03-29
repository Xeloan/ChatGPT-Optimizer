const style = document.createElement("style");
style.textContent = `
.hidden-text {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
`;
document.head.appendChild(style);

function collapseMessage(el) {
  if (!el) return;

  const content = el.querySelector('.markdown');
  if (!content || content.dataset.collapsed) return;

  const originalHTML = content.innerHTML;
  const text = content.innerText;
  const height = content.offsetHeight;

  content.innerHTML = `
    <div style="height:${height}px; position:relative;">
      <div class="hidden-text">${text}</div>
    </div>
  `;

  content.dataset.collapsed = "true";
  content.dataset.originalHTML = originalHTML;
  content.dataset.originalHeight = height;
}

function restoreMessage(el) {
  if (!el) return;

  const content = el.querySelector('.markdown');
  if (!content || !content.dataset.collapsed) return;

  content.innerHTML = content.dataset.originalHTML;
  delete content.dataset.collapsed;
}

function getMessages() {
  return [...new Set(
    [...document.querySelectorAll('.markdown')]
      .map(el => el.closest('[class*="group"]'))
      .filter(Boolean)
  )];
}

function shouldKeepExpanded(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  return rect.bottom > -50 && rect.top < viewportHeight + 50;//上下50px开始加载
}

function processMessages() {
  const msgs = getMessages();
  const keepCount = 3;//最近三条保留不动
  const collapseLimit = Math.max(0, msgs.length - keepCount);

  msgs.forEach((el, index) => {
    const mustKeep = index >= collapseLimit;
    const nearViewport = shouldKeepExpanded(el);

    if (mustKeep || nearViewport) {
      restoreMessage(el);
    } else {
      collapseMessage(el);
    }
  });
}

const restoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      restoreMessage(entry.target);
    }
  });
}, {
  root: null,
  threshold: 0.01,
  rootMargin: "200px 0px 200px 0px"
});

function observeMessages() {
  getMessages().forEach(el => restoreObserver.observe(el));
}

observeMessages();
processMessages();

window.addEventListener("scroll", processMessages, { passive: true });
window.addEventListener("resize", processMessages);

const timer = setInterval(() => {
  observeMessages();
  processMessages();
}, 1500);