# vina-pipeline · Vina 批量对接流水线

> 1 个蛋白 · 1000 个配体 · 一声回车 —— 把 AutoDock Vina 变成生产力工具。

**Level**: L2 · 进阶 / Practitioner
**Difficulty**: ★★★★☆
**预估工时**: 12h
**类型**: 核心构建

---

## 这个项目在教什么

写一条**真实可用**的批量对接管线。你不再只是跑一次 Vina 命令 ——
而是能接收 SDF、自动 3D 化、对接、打分、出报告。

## 你会学到什么

- AutoDock Vina / smina / `vina` Python API
- `meeko` 预处理配体、受体
- 多核并行（`joblib` / `multiprocessing`）
- 任务调度（本地 / SLURM）
- Pose 后处理：RMSD 聚类、选择代表构象

## 环境准备

- 完成 L2 · `pocket-finder`（需要口袋坐标）
- `conda install -c conda-forge autodock-vina meeko joblib`

## 任务清单

- [ ] `src/prepare.py`：SDF 批次 → 3D 构象（RDKit `EmbedMolecule`）→ PDBQT（meeko）
- [ ] `src/dock.py`：接收一个 receptor + 一批 ligands → 并行跑 Vina
- [ ] `src/postprocess.py`：
  - [ ] 把每个 ligand 的 best pose 聚合成一份 `results.parquet`
  - [ ] 加上 `score`、`rmsd_to_ref`（如果有 reference pose）
- [ ] `cli.py`：
  ```bash
  vina-pipeline run \
    --receptor receptor.pdbqt \
    --ligands ligands.sdf \
    --pocket pocket.json \
    --out results/
  ```
- [ ] 用一个已知靶点（e.g. `1IEP` + 已知 ATP 竞争抑制剂）做基准验证：top-10 pose 中是否包含金标
- [ ] `REPORT.md`：时间分析（多少分子 / 小时 / 核）+ 坑点记录

## 交付物

`vina-pipeline run` CLI 可用 + `results/results.parquet` + `REPORT.md`。

## 参考资料

- **Upstream**: [ccsb-scripps/AutoDock-Vina](https://github.com/ccsb-scripps/AutoDock-Vina)
- **Paper**: Eberhardt *et al.* *AutoDock Vina 1.2.0: New Docking Methods, Expanded Force Field, and Python Bindings.* *J. Chem. Inf. Model.* 2021. [DOI](https://doi.org/10.1021/acs.jcim.1c00203)
- **Tutorial**: [AutoDock Vina tutorial on YouTube](https://www.youtube.com/results?search_query=autodock+vina+tutorial)

## 通关标准

- 1000 个配体能在 10 分钟内跑完（8 核机器）
- CLI 有 `--help`，有合理的默认
- 对已知活性配体，docking score 有统计学意义（t-test vs. decoys）

---

*《从 0 到精通 · Maestro》L2 项目 · MIT License*
