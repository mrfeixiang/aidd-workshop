# active-learning-lab · 主动学习实验室

> 先问再算 —— 用最少的 oracle 查询挑最好分子。

**Level**: L3 · 高级 / Craftsman
**Difficulty**: ★★★★★
**预估工时**: 16h
**类型**: 阶段作品

---

## 这个项目在教什么

真实 AIDD 世界里，每一次 docking / wet-lab assay 都烧钱。
Active learning 教你**在预算受限时怎么挑下一个该问的分子**。

## 你会学到什么

- Random / greedy / uncertainty / expected-improvement 采样策略
- Bayesian optimization 的基础（GP / ensemble uncertainty）
- 评估 active learning 的正确姿势：budget vs. performance 曲线
- 随机种子控制 + 可复现性

## 环境准备

- 完成 L3 前两个项目
- `pip install modAL scikit-learn matplotlib`

## 任务清单

- [ ] `src/oracle.py`：做一个"假 oracle"：从 ChEMBL 抽 5000 个 EGFR 分子，当作你不知道答案的"未知空间"；每次查询返回真值
- [ ] `src/strategies.py`：实现 4 种采样器
  - [ ] random
  - [ ] greedy（exploit）
  - [ ] uncertainty（RF variance 或 MC dropout）
  - [ ] EI（expected improvement）
- [ ] `src/loop.py`：标准 active learning loop
  - [ ] 初始 20 个随机样本 → 训 baseline RF
  - [ ] 每轮查 10 个新样本 → 增量训练
  - [ ] 跑到 budget 500
- [ ] 跑 5 个随机种子 × 4 个策略 → `reports/curves.png`
- [ ] `REPORT.md`：
  - [ ] 哪种策略最早找到 top 10% 活性分子
  - [ ] budget vs. regret 曲线
  - [ ] 在什么数据量下 AL 的优势被消掉

## 交付物

`src/*.py` + `reports/curves.png` + `reports/REPORT.md` + 可被别人 `python src/loop.py --strategy uncertainty --budget 500 --seed 0` 复现。

## 参考资料

- **Upstream**: [modAL-python/modAL](https://github.com/modAL-python/modAL)
- **Paper**: Reker *et al.* *Active-learning strategies in computer-assisted drug discovery.* 2015.
- **Paper**: Mervin *et al.* *Uncertainty quantification in drug design.* *J. Chem. Inf. Model.* 2021. [DOI](https://doi.org/10.1021/acs.jcim.1c00166)
- **Tutorial**: [Active learning drug discovery on YouTube](https://www.youtube.com/results?search_query=active+learning+drug+discovery)

## 通关标准

- Uncertainty / EI 明显优于 random（在 budget < 200 时）
- 报告里有置信区间，不是一次跑的结果
- 有一段批判：为什么 AL 在有些靶点上不 work

---

*《从 0 到精通 · Maestro》L3 阶段作品 · MIT License*
