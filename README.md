# ChatGPT Web Performance Optimizer

A Chrome extension designed to reduce lag in long ChatGPT conversations.  
Normally, the ChatGPT web app can become very slow after a conversation gets long, sometimes to the point where even typing feels delayed character by character.

The core idea is simple: hide historical messages that are outside the screen, and restore them when needed, so the page has less rendering pressure.

---

## Features

* Noticeably smoother in long conversations
* Messages inside the viewport remain fully rendered
* Old messages outside the viewport are automatically hidden, while the latest three are kept
* Does not affect browser search (F3)
* Does not affect conversation context

---

## Notes

When ChatGPT becomes laggy in long conversations, the main reason is usually the large number of DOM nodes accumulated on the page, rather than the model itself becoming slower.  
So this extension can effectively reduce UI lag caused by long-conversation rendering.

If the lag is caused by network issues or model-side performance, that will still remain (but typing itself should no longer feel laggy). Also, when opening a very long conversation, there may be a short pause at first because hiding old messages takes a bit of processing time. And if the conversation takes a long time to load in the first place, that is basically an OpenAI server-side issue and cannot really be fixed here.

One current limitation without a better solution yet: for messages beyond the latest three, after they are hidden and restored, the copy buttons inside code blocks may stop working, so manual text selection and copy may be needed. The bottom-level buttons such as copy, regenerate, and branch conversation still work normally, so in practice the impact is minimal.

---

## Installation

Install in developer mode:

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable Developer Mode in the top right corner
4. Click Load unpacked
5. Select the project folder (after extracting it somewhere; the zip is just the source code downloaded from the release)

After installation, refresh the ChatGPT page and it should take effect.

Firefox is similar. Just search for how to load an extension in developer mode.

If you like it, buy me a spicy snack.

<img width="289" height="292" alt="image" src="https://github.com/user-attachments/assets/a4e3f0dd-ebc0-414a-9d90-770f4c07a495" />

---

# ChatGPT 网页性能优化插件

一个用来缓解 ChatGPT 长对话卡顿的 Chrome 扩展。正常情况下，ChatGPT网页版在长对话以后会非常卡，表现为输个字都会一个个慢慢蹦出来。
核心思路是把屏幕外的历史消息隐藏掉，在需要的时候再恢复，从而减少页面渲染压力。

---

## 功能

* 长对话场景下明显更流畅
* 屏幕内的消息自动开启渲染
* 滚出视野的旧消息自动隐藏，最近三条保留
* 不影响浏览器搜索（F3）
* 不影响对话上下文

---

## 注意

ChatGPT 在对话变长之后变卡，主要原因是页面中累积了大量 DOM 节点，而不是模型本身变慢，因此本插件可以有效解决长对话渲染的卡顿。如果是网络或者模型性能问题导致的卡顿，那么依然存在（但是你打字肯定不会卡），然后刚进超长对话会稍微顿一下，因为对话隐藏需要时间处理下。但是加载对话时间长纯粹是OpenAI土豆服务器的问题，无解。

最后有个目前无更好解决的缺陷是，最近三条之后的对话因为被隐藏和恢复，因此里面代码框的复制按钮会失效，只能麻烦手动选中复制了。对话底部那个复制，重新生成和对话分支啥的可以正常工作，所以基本无影响。

---

## 安装

开发模式安装：

1. 打开 Chrome
2. 进入 `chrome://extensions/`
3. 打开右上角开发者模式
4. 点击加载已解压的扩展程序
5. 选择项目目录（解压好的文件夹，你找个地方存下，压缩包就是release的sourse code下载就行）

安装完成后刷新 ChatGPT 页面即可生效。

Firefox方法类似，请自行谷歌，反正就是开发者模式加载扩展。


喜欢的话给我买包辣条

<img width="289" height="292" alt="image" src="https://github.com/user-attachments/assets/a4e3f0dd-ebc0-414a-9d90-770f4c07a495" />
