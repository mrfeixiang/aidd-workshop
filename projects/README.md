# 《从 0 到精通 · Maestro》项目总览

This folder holds one README per project on the AIDD Maestro learning
path. Each sub-folder is the home of a project that visitors to
`mrfeixiang.github.io/AIDD101/` click through from the site's
"clone & start" buttons.

每个子文件夹对应一个真实的学习项目，外加一份可以直接照着做的 README。
先按顺序从 L0 开始，做完一项就去下一项。

## 五个关卡，十六件作品

### L0 · 破零 / Starter
- [`hello-molecule`](./hello-molecule) — 第一颗分子（SMILES → 2D → 描述符）
- [`git-drug-lab`](./git-drug-lab) — 药物实验室 Git 入门
- [`aidd-env-starter`](./aidd-env-starter) — 可复现的 environment.yml 模板

### L1 · 入门 / Apprentice
- [`chembl-data-explorer`](./chembl-data-explorer) — ChEMBL 数据清洗与 EDA
- [`qsar-from-scratch`](./qsar-from-scratch) — Morgan 指纹 + RandomForest 跑出第一条 baseline
- [`similarity-search-cli`](./similarity-search-cli) — 可 pip install 的 Tanimoto 命令行工具

### L2 · 进阶 / Practitioner
- [`pocket-finder`](./pocket-finder) — fpocket / p2rank + py3Dmol 可视化
- [`vina-pipeline`](./vina-pipeline) — 1 个蛋白 · 1000 个配体 · 一声回车
- [`virtual-screening-mini`](./virtual-screening-mini) — ML 漏斗 + docking 精排

### L3 · 高级 / Craftsman
- [`gnn-solubility`](./gnn-solubility) — MPNN 跑 ESOL
- [`transformer-reaction`](./transformer-reaction) — USPTO-50k 产物预测
- [`active-learning-lab`](./active-learning-lab) — 最少 oracle 查询挑最好分子

### L4 · 精通 / Maestro
- [`de-novo-generator`](./de-novo-generator) — REINVENT 风格的条件生成
- [`alphafold-pipeline`](./alphafold-pipeline) — 序列 → 结构 → 口袋 → hit
- [`fep-workshop`](./fep-workshop) — 自由能微扰让打分靠谱
- [`aidd-portfolio`](./aidd-portfolio) — 毕业作品 · 出师一战

## 学习四步

1. **Fork** —— 把这个仓库 fork 到自己账号。
2. **Clone & 跑通** —— 按项目 README 装环境、复现结果。
3. **提 PR** —— 按 issue 清单补代码 / 加实验 / 写 report。
4. **拿徽章** —— PR 合并后在个人 portfolio 里 +1。

做完就去下一关。五关打完 = 精通。

---

*MIT License · 欢迎提 issue / PR 共同完善。*
