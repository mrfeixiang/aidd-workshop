# chembl-data-explorer · ChEMBL 数据矿工

> 拉取 · 清洗 · 去盐 · 可视化 —— AIDD 从数据开始。

**Level**: L1 · 入门 / Apprentice
**Difficulty**: ★★☆☆☆
**预估工时**: 6h
**类型**: 核心构建

---

## 这个项目在教什么

从 ChEMBL 这座数据金矿里挖出一个靶点的 bioactivity，完成**清洗、标准化、
EDA** 的全流程。所有后续 QSAR / 模型训练的原料都来源于此。

## 你会学到什么

- 用 `chembl_webresource_client` 按 target / assay 查询 bioactivity
- 单位统一（nM / μM / pIC50）
- 去盐、去立体、规范化 tautomer
- 用 pandas 做 EDA，用 seaborn 做分布可视化
- 输出高质量的 parquet 数据集

## 环境准备

- 完成 L0 全部项目
- `pip install chembl_webresource_client pandas seaborn pyarrow`

## 任务清单

- [ ] 选一个靶点：推荐 EGFR（CHEMBL203）、CDK2、JAK2 之一
- [ ] 用 API 拉所有 `IC50` bioactivity 数据
- [ ] 写 `src/clean.py`：
  - [ ] 统一到 nM
  - [ ] 去盐（`SaltRemover`）、去立体异构
  - [ ] 用 `rdkit.Chem.MolStandardize` 规范 tautomer
  - [ ] 去重（按 canonical SMILES）
  - [ ] 算 pIC50
- [ ] 写 `notebooks/eda.ipynb`：
  - [ ] pIC50 分布直方图
  - [ ] 分子量 / logP / 描述符散点
  - [ ] Top 20 活性分子的 2D 图
- [ ] 把清洗后的数据存成 `data/<target>_clean.parquet`
- [ ] 输出 `reports/eda.html`（`jupyter nbconvert --to html`）

## 交付物

`data/<target>_clean.parquet` + `reports/eda.html` + `src/clean.py`（可命令行调用）。

## 参考资料

- **Upstream**: [chembl/chembl_webresource_client](https://github.com/chembl/chembl_webresource_client)
- **Paper**: Mendez *et al.* *ChEMBL: towards direct deposition of bioassay data*. *Nucleic Acids Res.* 2019. [DOI](https://doi.org/10.1093/nar/gky1075)
- **Tutorial**: [ChEMBL bioactivity tutorial on YouTube](https://www.youtube.com/results?search_query=chembl+bioactivity+tutorial)

## 通关标准

- 清洗前后的分子数量差可解释（写在 report 里）
- EDA 能回答"这个靶点目前最活跃的 scaffold 长什么样"
- 数据能被下一项目（`qsar-from-scratch`）直接使用

---

*《从 0 到精通 · Maestro》L1 项目 · MIT License*
