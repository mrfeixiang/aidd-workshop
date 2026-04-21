# de-novo-generator · De Novo 生成器

> REINVENT 风格的条件生成 —— 让模型为你"设计"分子。

**Level**: L4 · 精通 / Maestro
**Difficulty**: ★★★★★
**预估工时**: 24h
**类型**: 核心构建

---

## 这个项目在教什么

训练一个 SMILES 语言模型 + RL 微调，在 QED / SA / docking score
多约束下**原创分子**。这是 generative AIDD 的入场券。

## 你会学到什么

- SMILES-LSTM 预训练
- Policy gradient (REINFORCE) 在离散动作空间的应用
- 多目标 reward 设计（scalarization / Pareto）
- 生成样本的质量评估：validity / uniqueness / novelty / diversity

## 环境准备

- 完成 L3 全部项目
- GPU（至少 16GB VRAM）
- `pip install torch rdkit-pypi ray[tune]`

## 任务清单

- [ ] **阶段 1 · 预训练**
  - [ ] 在 ChEMBL 100 万分子的子集上训一个 SMILES-LSTM / Transformer
  - [ ] 验证 validity > 95%, uniqueness > 90%
- [ ] **阶段 2 · RL 微调**
  - [ ] 定义 reward：`0.3 * QED + 0.3 * (10 - SA) / 10 + 0.4 * docking_surrogate`
  - [ ] REINFORCE 或 PPO
  - [ ] 用 L1 的 QSAR 模型做 docking surrogate（速度快）
- [ ] **阶段 3 · 评估**
  - [ ] 生成 10k 条件样本
  - [ ] 画 property distribution 迁移图
  - [ ] 用 Fréchet ChemNet Distance 或 MOSES metrics
- [ ] **阶段 4 · 和真实分子对比**
  - [ ] 抽 top 100 生成分子扔给 L2 的 vina-pipeline docking
  - [ ] 看是否能击败 ChEMBL 已知活性分子

## 交付物

`checkpoints/pretrain.pt` + `checkpoints/rl_finetune.pt` + `notebooks/evaluate.ipynb` + `reports/REPORT.md` + 一条 `python generate.py --n 100 --target egfr` 的 demo。

## 参考资料

- **Upstream**: [MolecularAI/Reinvent](https://github.com/MolecularAI/Reinvent)
- **Paper**: Blaschke *et al.* *REINVENT 2.0: An AI Tool for De Novo Drug Design.* *J. Chem. Inf. Model.* 2020. [DOI](https://doi.org/10.1021/acs.jcim.0c00915)
- **Paper**: Segler *et al.* *Generating focused molecule libraries for drug discovery with recurrent neural networks.* *ACS Cent. Sci.* 2018.
- **Tutorial**: [REINVENT on YouTube](https://www.youtube.com/results?search_query=reinvent+de+novo+molecule+generation)

## 通关标准

- 生成分子的 QED 中位数 > ChEMBL 基准
- Novelty > 80%（不是抄训练集）
- 生成 top-100 里至少 5 条能通过 L2 docking 筛选进入 top 1%

---

*《从 0 到精通 · Maestro》L4 项目 · MIT License*
