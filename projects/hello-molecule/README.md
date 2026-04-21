# hello-molecule · 第一颗分子

> SMILES → 2D 结构 → 描述符 —— 让 AIDD 工具链第一次在你电脑上跑起来。

**Level**: L0 · 破零 / Starter
**Difficulty**: ★☆☆☆☆
**预估工时**: 3h
**类型**: 入门练手

---

## 这个项目在教什么

第一次用 Python + RDKit 把一颗分子"画"出来、"算"清楚，把 notebook
push 到 GitHub。先把环境装稳、把命令行敲顺，再谈科研。

## 你会学到什么

- 用 conda / mamba 建一个干净的 Python 环境
- 在 Jupyter 里写第一行 `from rdkit import Chem`
- 从 SMILES 出发画 2D 结构 / 算分子量、logP、TPSA
- 把 notebook 和环境文件一起提交到 GitHub

## 环境准备

- 一台能装 conda 的电脑（Mac / Linux / Windows 都行）
- 有 GitHub 账号
- `conda install -c conda-forge rdkit jupyterlab pandas`

## 任务清单

- [ ] Fork 本仓库到自己账号
- [ ] 在 `projects/hello-molecule/` 下创建 `environment.yml` 并验证 `conda env create -f environment.yml` 可用
- [ ] 新建 `notebooks/01_hello.ipynb`：
  - [ ] 从 SMILES `CC(=O)Oc1ccccc1C(=O)O`（阿司匹林）构造分子对象
  - [ ] 用 `Draw.MolToImage` 渲染 2D 结构
  - [ ] 计算 MW / logP / TPSA / H-bond donors/acceptors
  - [ ] 和文献值对比并写一段 markdown 总结
- [ ] 提 PR：title 用 `feat(hello-molecule): first notebook by @你的用户名`

## 交付物

`notebooks/01_hello.ipynb` + `environment.yml` + 一条被 merge 的 PR。

## 参考资料

- **Upstream**: [rdkit/rdkit](https://github.com/rdkit/rdkit)
- **Tutorial**: [RDKit tutorials on YouTube](https://www.youtube.com/results?search_query=rdkit+tutorial+for+beginners)
- **Docs**: <https://www.rdkit.org/docs/>

## 通关标准

- notebook 能从头到尾 Run All 无错
- MW / logP 计算结果和文献误差 < 5%
- PR 通过 review 合并到 `main`

---

*《从 0 到精通 · Maestro》L0 项目 · MIT License*
