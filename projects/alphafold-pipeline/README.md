# alphafold-pipeline · AlphaFold × 药物设计

> 序列 → 结构 → 口袋 → hit —— 一条全自动的 structure-based AIDD 流水线。

**Level**: L4 · 精通 / Maestro
**Difficulty**: ★★★★★
**预估工时**: 22h
**类型**: 核心构建

---

## 这个项目在教什么

用 AlphaFold / ESMFold 预测结构当起点，**接上**你之前做过的 pocket
detection 和 docking pipeline，得到一条"从 UniProt ID 到 hit list"
的端到端流程。

## 你会学到什么

- AlphaFold2 / ESMFold / ColabFold 的取舍
- 如何评估 AF 预测结构的可用性（pLDDT / PAE）
- GPU 资源调度（colab / cluster）
- 管线整合：把多个项目黏成一条 pipeline

## 环境准备

- 完成 L4 · `de-novo-generator` 或至少 L2 所有项目
- 需要 GPU（≥ 16GB）或 Colab Pro
- `pip install fair-esm biotite snakemake`

## 任务清单

- [ ] `workflow/01_predict.smk`：输入 UniProt ID → ESMFold 预测 PDB
- [ ] `workflow/02_pocket.smk`：调用 L2 · `pocket-finder` 识别口袋
- [ ] `workflow/03_dock.smk`：调用 L2 · `vina-pipeline` 跑 docking
- [ ] `workflow/04_report.smk`：生成 `reports/hit_list.html`
- [ ] 用一个**没有晶体结构**的靶点做 case study（e.g. 某个新 kinase）
- [ ] `REPORT.md`：
  - [ ] AF 预测结构 vs. 可能的同源晶体结构对比
  - [ ] pLDDT 低的区域如何影响 docking 结果
  - [ ] 整条 pipeline 的时间 / 计算成本

## 交付物

`workflow/Snakefile`（master） + 四个子规则文件 + `reports/hit_list.html` + 一份论文级的 case-study 报告。

## 参考资料

- **Upstream**: [facebookresearch/esm](https://github.com/facebookresearch/esm)
- **Upstream**: [sokrypton/ColabFold](https://github.com/sokrypton/ColabFold)
- **Paper**: Jumper *et al.* *Highly accurate protein structure prediction with AlphaFold.* *Nature* 2021. [DOI](https://doi.org/10.1038/s41586-021-03819-2)
- **Paper**: Lin *et al.* *Evolutionary-scale prediction of atomic level protein structure.* *Science* 2023.
- **Tutorial**: [AlphaFold2 tutorial for drug design](https://www.youtube.com/results?search_query=alphafold2+tutorial+drug+design)

## 通关标准

- Given a UniProt ID，`snakemake` 一条命令出 hit list
- 能解释什么时候 AF 预测不能信
- 至少找到一个 hit 在文献或 ChEMBL 里有活性证据

---

*《从 0 到精通 · Maestro》L4 项目 · MIT License*
