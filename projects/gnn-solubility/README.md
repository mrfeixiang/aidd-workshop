# gnn-solubility · GNN 溶解度预测器

> MPNN 跑 MoleculeNet ESOL —— 让分子图神经网络上岗。

**Level**: L3 · 高级 / Craftsman
**Difficulty**: ★★★★☆
**预估工时**: 14h
**类型**: 核心构建

---

## 这个项目在教什么

第一次用 GNN 训练一个分子性质预测模型。对比 L1 的 Morgan+RF baseline，
理解**"把分子当作图"比"把分子当作指纹向量"强在哪、弱在哪**。

## 你会学到什么

- PyTorch Geometric 数据管线
- MPNN / GCN / AttentiveFP 的差异
- scaffold split 的 OOD 特性
- W&B / TensorBoard 做实验追踪
- 权重版本化（git-lfs / HuggingFace Hub）

## 环境准备

- 完成 L2 · `virtual-screening-mini`
- 一块 GPU（至少 8GB VRAM）会很舒服，没有也能用 CPU 跑小模型
- `pip install torch torch-geometric wandb`

## 任务清单

- [ ] `src/dataset.py`：封装 MoleculeNet ESOL 为 PyG `InMemoryDataset`
- [ ] `src/models.py`：
  - [ ] baseline: 2-layer MPNN
  - [ ] upgrade: 加 edge features / gated residual
- [ ] `src/train.py`：
  - [ ] scaffold split
  - [ ] lr scheduler + early stopping
  - [ ] W&B logging（loss、R²、误差分布）
- [ ] `src/baseline.py`：同样数据 / 同样 split 跑 Morgan+RF 对比
- [ ] `reports/REPORT.md`：
  - [ ] GNN vs. RF 的 R² 对比
  - [ ] 误差分析：哪种分子 GNN 预测得最差？
  - [ ] scaffold split vs. random split 的消融
- [ ] 把最佳 checkpoint 上传到 HuggingFace Hub 或 GitHub Release

## 交付物

`checkpoints/best.pt` + `reports/REPORT.md` + W&B run 链接 + 一份可以 `python infer.py --smiles "CCO"` 的推理脚本。

## 参考资料

- **Upstream**: [pyg-team/pytorch_geometric](https://github.com/pyg-team/pytorch_geometric)
- **Paper**: Gilmer *et al.* *Neural Message Passing for Quantum Chemistry.* *ICML* 2017. [arXiv](https://arxiv.org/abs/1704.01212)
- **Paper**: Wu *et al.* *MoleculeNet: a benchmark for molecular machine learning.* *Chem. Sci.* 2018.
- **Tutorial**: [PyTorch Geometric tutorial](https://www.youtube.com/results?search_query=pytorch+geometric+tutorial)

## 通关标准

- 在 ESOL scaffold split 上 R² > 0.85
- GNN vs. RF 的误差分析有能写进论文的洞见
- README 指引别人能重现你的最佳结果（seed + config）

---

*《从 0 到精通 · Maestro》L3 项目 · MIT License*
