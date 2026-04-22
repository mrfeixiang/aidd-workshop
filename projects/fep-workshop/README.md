# fep-workshop · FEP 工作坊

> 自由能微扰 —— 让打分真的靠谱；以及它救不了你什么。

**Level**: L4 · 精通 / Maestro
**Difficulty**: ★★★★★
**预估工时**: 28h
**类型**: 核心构建

---

## 这个项目在教什么

用 OpenFE / OpenMM 搭一条 **RBFE（Relative Binding Free Energy）**
流程，对比 docking 打分的可靠性。终极目标：写一篇诚实的 blog 告诉
别人这工具的边界。

## 你会学到什么

- MD 基础：力场、周期性盒子、PME
- 炼狱级的结构准备（质子化、force field 参数化）
- λ-dynamics / HREX 采样
- Bennett Acceptance Ratio（BAR）估计 ΔΔG
- 对比 docking 打分：你会发现 FEP 也不是万能

## 环境准备

- 完成 L4 · `alphafold-pipeline`
- GPU（≥ 24GB 推荐）
- CUDA 环境配好
- `pip install openfe openmm rdkit-pypi`

## 任务清单

- [ ] 选一个文献里公开的 FEP 数据集（e.g. Schrödinger JACS 2015 benchmark）
- [ ] **阶段 1 · 手动跑一对**
  - [ ] 准备 receptor + 配体 pair
  - [ ] 用 OpenFE 配置 RBFE protocol
  - [ ] 跑一个 λ schedule 并监控收敛
- [ ] **阶段 2 · 批量跑一个 series**
  - [ ] 用 OpenFE CLI 或 snakemake 自动跑 10-20 对
  - [ ] 画预测 ΔΔG vs. 实验 ΔΔG 散点
- [ ] **阶段 3 · 对比 docking**
  - [ ] 同一个系列用 L2 的 vina-pipeline 打分
  - [ ] 计算 Kendall τ / RMSE 对比实验值
- [ ] 写 blog `BLOG.md`：
  - [ ] FEP 在哪些场景下比 docking 强
  - [ ] FEP 的失败案例（不收敛 / 参数化翻车）
  - [ ] 对你以后做药物设计的启发
- [ ] GitHub Release `v1.0` 打包脚本 + blog

## 交付物

`workflow/rbfe.smk` + `results/ddg_predictions.csv` + `BLOG.md` + GitHub Release v1.0。

## 参考资料

- **Upstream**: [OpenFreeEnergy/openfe](https://github.com/OpenFreeEnergy/openfe)
- **Upstream**: [openmm/openmm](https://github.com/openmm/openmm)
- **Paper**: Wang *et al.* *Accurate and Reliable Prediction of Relative Ligand Binding Potency in Prospective Drug Discovery by Way of a Modern Free-Energy Calculation Protocol and Force Field.* *JACS* 2015. [DOI](https://doi.org/10.1021/ja512751q)
- **Tutorial**: [Free energy perturbation tutorial](https://www.youtube.com/results?search_query=free+energy+perturbation+tutorial)

## 通关标准

- 至少一个 pair 能跑到收敛（ΔΔG 标准误 < 0.3 kcal/mol）
- 对比 docking 的表格 + 诚实讨论
- blog 能让非专家读者搞清楚 FEP 的定位

---

*《从 0 到精通 · Maestro》L4 项目 · MIT License*
