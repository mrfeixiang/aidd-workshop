# qsar-from-scratch · QSAR 从零到一

> Morgan FP + RandomForest = 第一条可复现的 QSAR baseline。

**Level**: L1 · 入门 / Apprentice
**Difficulty**: ★★★☆☆
**预估工时**: 8h
**类型**: 核心构建

---

## 这个项目在教什么

用最经典的组合（Morgan 指纹 + 随机森林）跑一个完整的 QSAR 流程，
建立关于**特征工程、训练/验证分割、评估指标**的肌肉记忆。

## 你会学到什么

- RDKit Morgan / MACCS / RDKit 描述符的差异
- scaffold split vs. random split
- R² / RMSE / Pearson / Spearman 的取舍
- Baseline → 消融 → 报告的工程流程

## 环境准备

- 完成 L1 · `chembl-data-explorer`（要用它输出的 parquet）
- `conda install -c conda-forge rdkit scikit-learn matplotlib`

## 任务清单

- [ ] `src/featurize.py`：接收 parquet，输出 Morgan FP (2048-bit, r=2)
- [ ] `src/split.py`：实现 scaffold split（用 `rdkit.Chem.Scaffolds.MurckoScaffold`）
- [ ] `src/train.py`：
  - [ ] baseline: `RandomForestRegressor(n_estimators=500)`
  - [ ] 保存 `models/rf.pkl`
- [ ] `src/evaluate.py`：输出 R² / RMSE / 散点图到 `reports/metrics.md`
- [ ] 消融：
  - [ ] 对比 Morgan r=2 vs r=3
  - [ ] 对比 RandomForest vs GradientBoosting
  - [ ] 对比 scaffold split vs random split（应看到明显差距）
- [ ] 写 `REPORT.md`：结论 + 为什么 scaffold split 更诚实

## 交付物

`models/rf.pkl` + `reports/metrics.md` + `REPORT.md` + 完整训练脚本。

## 参考资料

- **Upstream**: [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn)
- **Paper**: Cherkasov *et al.* *QSAR modeling: where have you been? Where are you going to?* *J. Med. Chem.* 2014. [DOI](https://doi.org/10.1021/jm4004285)
- **Tutorial**: [QSAR machine learning tutorial](https://www.youtube.com/results?search_query=qsar+machine+learning+tutorial)

## 通关标准

- scaffold split 下 R² > 0.4（对于典型 IC50 数据）
- README 解释了为什么 random split 会给出乐观的数字
- `python src/train.py --data data/egfr_clean.parquet` 一行跑通

---

*《从 0 到精通 · Maestro》L1 项目 · MIT License*
