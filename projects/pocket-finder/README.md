# pocket-finder · 口袋猎人

> fpocket / p2rank + py3Dmol —— 给一个 PDB，自动识别并可视化结合口袋。

**Level**: L2 · 进阶 / Practitioner
**Difficulty**: ★★★☆☆
**预估工时**: 8h
**类型**: 核心构建

---

## 这个项目在教什么

从 PDB 结构一路走到"这个口袋值得投入 docking"。结构预处理、口袋识别、
3D 可视化的基本功。

## 你会学到什么

- 用 Biopython 下载 / 过滤 / 清洗 PDB
- 加质子、去水、选 chain
- 跑 fpocket（binary）并解析输出
- 用 `py3Dmol` 在 Jupyter 里渲染蛋白 + 口袋

## 环境准备

- 完成 L1
- `conda install -c conda-forge biopython fpocket py3dmol`

## 任务清单

- [ ] `src/fetch.py`：输入 PDB ID（如 `1IEP`），下载、只保留 protein chain、加氢
- [ ] `src/find_pockets.py`：跑 fpocket → 解析 `*_info.txt` 得到前 N 个 pocket 的 druggability
- [ ] `notebooks/analyze.ipynb`：
  - [ ] 用 `py3Dmol` 画出蛋白 + 预测口袋（高亮前 3 个）
  - [ ] 生成一张"口袋 vs. druggability score"的柱状图
- [ ] 写 `REPORT.md`：选一个靶点做案例研究（e.g. `1IEP` 的 ATP 口袋），对比 fpocket 预测和文献记录的真实口袋
- [ ] （加分）加一个 `p2rank` 的 baseline 做 cross check

## 交付物

`src/*.py` + `notebooks/analyze.ipynb` + `REPORT.md` + 一个你最喜欢的 PDB 的渲染图。

## 参考资料

- **Upstream**: [Discngine/fpocket](https://github.com/Discngine/fpocket)
- **Paper**: Le Guilloux *et al.* *Fpocket: an open source platform for ligand pocket detection.* *BMC Bioinformatics* 2009. [DOI](https://doi.org/10.1186/1471-2105-10-168)
- **Tutorial**: [fpocket binding site prediction on YouTube](https://www.youtube.com/results?search_query=fpocket+binding+site+prediction)

## 通关标准

- 能给任意 PDB ID 一键输出口袋清单
- notebook 能嵌入交互式 3D 视图
- report 中对 fpocket 的假阳性 / 假阴性有批判性讨论

---

*《从 0 到精通 · Maestro》L2 项目 · MIT License*
