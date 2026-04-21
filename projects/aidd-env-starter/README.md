# aidd-env-starter · AIDD 环境模板

> 一份可复现的 `environment.yml` —— 再也不用为装环境折磨新人。

**Level**: L0 · 破零 / Starter
**Difficulty**: ★★☆☆☆
**预估工时**: 3h
**类型**: 核心构建

---

## 这个项目在教什么

把你以后要用的 AIDD 库固化成一份能被别人一键复现的环境模板。
可复现性是所有下游工作的地基。

## 你会学到什么

- conda / mamba 环境管理的最佳实践
- 锁定版本（`environment.yml` vs `environment-lock.yml`）
- 多平台依赖（Linux / macOS / Windows）
- （可选）Docker 封装

## 环境准备

- 安装 [miniforge](https://github.com/conda-forge/miniforge) 或 mamba
- 完成 L0 前两个项目

## 任务清单

- [ ] 写 `environment.yml`，包含：
  - Python 3.11
  - rdkit, openbabel, py3Dmol, biopython
  - pandas, numpy, scipy, scikit-learn
  - jupyterlab, matplotlib, seaborn
  - pytest
- [ ] 加一条 `Makefile` 目标 `make setup` 一键创建 env
- [ ] 跑 `mamba env export --from-history > environment-lock.yml` 生成锁定版本
- [ ] 写 README 说明 macOS / Linux 各自的注意事项
- [ ] （加分）写一个 `Dockerfile` 基于 `mambaorg/micromamba` 复现同一个环境
- [ ] 在两台不同机器（或 GitHub Codespaces）上各跑一次 `make setup` 验证

## 交付物

`environment.yml` + `environment-lock.yml` + `Makefile` + README（含 Docker 可选方案）。

## 参考资料

- **Upstream**: [conda-forge/miniforge](https://github.com/conda-forge/miniforge)
- **Docs**: [Managing environments · conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
- **Tutorial**: [Conda reproducibility on YouTube](https://www.youtube.com/results?search_query=conda+environment+reproducibility)

## 通关标准

- 新人在别的机器上 `make setup` 能跑通，没有手动 pip install
- `jupyter lab` 能打开，`import rdkit` 不报错

---

*《从 0 到精通 · Maestro》L0 项目 · MIT License*
