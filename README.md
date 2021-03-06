# timenote2Markdown

将 记时光 备份文件转换为 Markdown 格式

## 使用

访问 [t2m.gxb.pub](https://t2m.gxb.pub/), 选择 JSON 格式的备份文件, 然后点击 "转换" 按钮, 即可将备份文件转换为 Markdown 格式.

转换结果将打包为一个 zip 文件, 单篇日记将以 `日期+标题` 的形式命名.

分类、地点、心情、天气等数据将以 `Front-Matter` 的形式存储在 Markdown 文件中.

## 注意

1. 请不要使用插件劫持浏览器下载功能, 否则可能导致转换失败.

## 项目依赖

1. [picocss](https://picocss.com/) - 前端 CSS.
2. [JSZip](https://stuk.github.io/jszip/) - 压缩文件.
3. [FileSaver.js](https://github.com/eligrey/FileSaver.js) - 保存文件.

由于某些众所周知的原因, 本项目中未使用 jsDelivr 的 CDN, 而是使用了个人托管的静态资源.
