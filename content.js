const style = document.createElement("style");
style.textContent = `
.hidden-text {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
`;
document.head.appendChild(style);

//状态表
const isVisibleMap = new WeakMap();

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

//让Observer同时负责恢复和折叠，之前左右脑互博同时加两个判断在那抽风
const restoreObserver = new IntersectionObserver((entries) => {
  const msgs = getMessages();
  const keepCount = 3; 
  const collapseLimit = Math.max(0, msgs.length - keepCount);

  entries.forEach(entry => {
    const el = entry.target;
    //实时记录该元素是否在视口中
    isVisibleMap.set(el, entry.isIntersecting);

    const index = msgs.indexOf(el);
    const mustKeep = index >= collapseLimit; //是否属于最近三条

    if (entry.isIntersecting || mustKeep) {
      restoreMessage(el);
    } else {
      collapseMessage(el);
    }
  });
}, {
  root: null,
  threshold: 0.01,
  rootMargin: "100px 0px 100px 0px" //预留100px缓冲
});

function observeMessages() {
  getMessages().forEach(el => {
    restoreObserver.observe(el);
  });
}

observeMessages();

//动态滑动
const timer = setInterval(() => {
  observeMessages();
  
  const msgs = getMessages();
  const keepCount = 3;
  const collapseLimit = Math.max(0, msgs.length - keepCount);

  msgs.forEach((el, index) => {
    const isLastThree = index >= collapseLimit;
    const inViewport = isVisibleMap.get(el);

    if (isLastThree || inViewport) {
      //视口内或是最后三条，开
      restoreMessage(el);
    } else {
      //别的关
      collapseMessage(el);
    }
  });
}, 1500);
