# Surge

个人 Surge 配置仓库，**仅供本人使用**。

包含自用模块（`Module/`）、脚本（`Script/`）与脚本备份（`Backup/`）。

## 目录结构

| 目录 | 说明 |
| --- | --- |
| `Module/` | Surge 模块（.sgmodule） |
| `Script/` | 常用脚本（.js） |
| `Backup/` | 脚本备份 / 旧版本 |

## 模块

| 模块 | 说明 |
| --- | --- |
| [Get Cookie.sgmodule](Module/Get%20Cookie.sgmodule) | 贴吧、掌上飞车等站点 Cookie 获取 |
| [GitHub&GitLab No Cache.sgmodule](Module/GitHub%26GitLab%20No%20Cache.sgmodule) | 去除 GitHub / GitLab raw 文件缓存，及时获取最新内容 |
| [IPv6.sgmodule](Module/IPv6.sgmodule) | 配合 IPv6 Detection 脚本，根据网络环境自动开启 / 关闭 IPv6 |
| [VIF Only.sgmodule](Module/VIF%20Only.sgmodule) | VIF Only 模式，强制 80 端口域名走 HTTP 引擎并解密 TCP 流量 |
| [MitM All Hostnames.sgmodule](Module/MitM%20All%20Hostnames.sgmodule) | 对全部 443 端口 hostname 执行 MitM（排除 Apple 等无法解密的站点） |
| [Fuck Telegram Bad IPs.sgmodule](Module/Fuck%20Telegram%20Bad%20IPs.sgmodule) | 将 Telegram 垃圾 IP 映射到可用 IP |

## 脚本

| 脚本 | 说明 |
| --- | --- |
| [Sub_Info.js](Script/Sub_Info.js) | 订阅流量信息（http-request 用法示例） |
| [Sub_Info_Panel.js](Script/Sub_Info_Panel.js) | 订阅流量信息面板版（generic + Panel） |
| [Rename.js](Script/Rename.js) | Sub-Store 节点重命名脚本（基于 Keywos，个人修改） |
| [Exchange.js](Script/Exchange.js) | 汇率监控脚本（基于 Peng-YM） |
| [Node_Detection.js](Script/Node_Detection.js) | 节点信息检测（ip-api.com，配合 Panel 使用） |
| [IPv6_Detection.js](Script/IPv6_Detection.js) | 根据网络环境（Wi-Fi / 流量 / SSID）自动开关 IPv6 |

## 使用方式

- **模块**：Surge → 模块 → 从本地导入，或使用 `raw.githubusercontent.com` 链接在线安装
- **脚本**：参考各文件头部注释中的配置示例

## 声明

本仓库内容仅供个人使用与学习交流，不提供任何担保。
