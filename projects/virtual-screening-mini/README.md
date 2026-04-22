# virtual-screening-mini · 虚拟筛选小战役

> 10 万分子 → top 100 的自动漏斗：ML 粗筛 + docking 精排。

**Level**: L2 · 进阶 / Practitioner
**Difficulty**: ★★★★☆
**预估工时**: 14h
**类型**: 阶段作品

---

## 这个项目在教什么

把 L1 的 QSAR 模型和 L2 的 docking 管线**串成一条端到端流水线**，
模拟真实虚拟筛选项目：先 ML 速筛掉 99%，再 docking 精排。

## 你会学到什么

- Snakemake / Prefect 等工作流引擎的选型
- 多阶段筛选的阈值设计（recall vs. compute budget）
- DVC / git-lfs 管理中等规模数据
- 可复现的随机种子管理

## 环境准备

- 完成 L2 · `vina-pipeline` 和 L1 · `qsar-from-scratch`
- `pip install snakemake dvc pydantic`

## 任务清单

- [ ] 准备一个 ~100k 分子的虚拟库（比如 Enamine REAL diversity set 的子集，或 ZINC20）
- [ ] `workflow/Snakefile`：
  - [ ] 规则 1 · featurize：SMILES → Morgan FP
  - [ ] 规则 2 · ml_filter：调用 L1 训好的模型，top 10% 过关
  - [ ] 规则 3 · dock：调用 L2 pipeline 跑 Vina
  - [ ] 规则 4 · rank：合并 ML score + docking score 得 final rank
- [ ] `config.yaml`：可配置受体、口袋、阈值、随机种子
- [ ] `reports/hits.md`：top 100 hit 的分子结构 + score + 所在 scaffold
- [ ] 跑两次（不同种子）确认结果稳定

## 交付物

`workflow/Snakefile` + `config.yaml` + `results/hits.csv` + `reports/hits.md`。
能被别人 `snakemake -j 8` 一键复现。

## 参考资料

- **Upstream**: [snakemake/snakemake](https://github.com/snakemake/snakemake)
- **Paper**: Mölder *et al.* *Sustainable data analysis with Snakemake.* *F1000Research* 2021. [DOI](https://doi.org/10.12688/f1000research.29032.2)
- **Tutorial**: [Snakemake bioinformatics pipeline on YouTube](https://www.youtube.com/results?search_query=snakemake+bioinformatics+pipeline)

## 通关标准

- 10 万分子能在过夜时间内跑完（单机 8 核）
- 两次不同种子运行，top 100 重合 > 70%
- `snakemake --dag` 能出工作流图嵌进 README

---

*《从 0 到精通 · Maestro》L2 阶段作品 · MIT License*
