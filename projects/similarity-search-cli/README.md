# similarity-search-cli · 相似性搜索命令行

> 输入一个 SMILES，吐出最像的 N 个化合物 —— 写成能被 `pip install` 的工具。

**Level**: L1 · 入门 / Apprentice
**Difficulty**: ★★★☆☆
**预估工时**: 6h
**类型**: 阶段作品

---

## 这个项目在教什么

把一个化学工具真正打包发布，学习**现代 Python 打包（`pyproject.toml`）**、
CLI 设计、单元测试和发布流程。毕业要求：让同事能 `pip install your-tool` 直接用。

## 你会学到什么

- `pyproject.toml` 声明式打包
- `click` / `typer` 构建命令行
- `pytest` 的 fixture、参数化、mock
- GitHub Release + 发布到 TestPyPI

## 环境准备

- 完成 L1 前两个项目
- `pip install rdkit click pytest build twine`

## 任务清单

- [ ] 初始化包结构：
  ```
  similarity_search_cli/
    __init__.py
    cli.py          # click 入口
    search.py       # Tanimoto 核心
    io.py           # parquet / csv 读写
  tests/
  pyproject.toml
  ```
- [ ] `search.py`：实现 `top_k(query_smiles, library, k=10, threshold=0.3)` 返回 `DataFrame`
- [ ] `cli.py`：
  ```bash
  simsearch --query "CCO" --library mols.parquet --k 20 --out hits.csv
  ```
- [ ] `tests/test_search.py`：
  - [ ] fixture：10 个已知分子
  - [ ] 参数化测试不同 k 值
  - [ ] mock 一个空库的 edge case
- [ ] 配置 GitHub Actions 自动跑 pytest
- [ ] 发布到 TestPyPI（`twine upload --repository testpypi dist/*`）
- [ ] 建一个 GitHub Release `v0.1.0` 附上 wheel

## 交付物

一个能 `pip install simsearch==0.1.0` 的包 + GitHub Release + CI 绿灯。

## 参考资料

- **Upstream**: [rdkit/rdkit](https://github.com/rdkit/rdkit)（Fingerprints + DataStructs）
- **Paper**: Bajusz *et al.* *Why is Tanimoto index an appropriate choice for fingerprint-based similarity calculations?* *J. Cheminform.* 2015.
- **Related**: [Willett · Similarity searching using 2D fingerprints](https://doi.org/10.1021/ci9803381)
- **Tutorial**: [Tanimoto similarity on YouTube](https://www.youtube.com/results?search_query=tanimoto+similarity+cheminformatics)

## 通关标准

- `pip install -e .` → `simsearch --help` 能正常显示
- `pytest` 全绿
- TestPyPI 上能被别人装上

---

*《从 0 到精通 · Maestro》L1 阶段作品 · MIT License*
