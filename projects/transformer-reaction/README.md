# transformer-reaction · 反应预测 Transformer

> reactant SMILES → product SMILES —— 在 USPTO-50k 上复现 Molecular Transformer。

**Level**: L3 · 高级 / Craftsman
**Difficulty**: ★★★★★
**预估工时**: 18h
**类型**: 核心构建

---

## 这个项目在教什么

把化学反应当作**序列翻译任务**，从零训练一个小号 Transformer。学会看
top-k accuracy 和 error 分析，知道模型在哪类反应上翻车。

## 你会学到什么

- SMILES tokenization（原子级 vs. BPE）
- Encoder-Decoder Transformer 架构
- Teacher forcing / beam search inference
- top-1 / top-5 / top-10 accuracy
- Error taxonomy（stereochem / ring / regio）

## 环境准备

- 完成 L3 · `gnn-solubility`
- 需要 GPU（推荐 ≥ 16GB VRAM）
- `pip install torch pytorch-lightning tokenizers`

## 任务清单

- [ ] 下载 USPTO-50k（官方或 HuggingFace datasets 镜像）
- [ ] `src/tokenizer.py`：原子级 SMILES tokenizer（有现成 regex 可用）
- [ ] `src/model.py`：6-layer encoder + 6-layer decoder Transformer（d_model=256）
- [ ] `src/train.py`：PyTorch Lightning + AdamW + warmup
- [ ] `src/infer.py`：beam search 输出 top-k 候选
- [ ] `src/evaluate.py`：
  - [ ] top-1 / top-5 / top-10 accuracy
  - [ ] 按反应类型（10 个 USPTO class）分别打 accuracy
  - [ ] 误差案例：随机抽 20 个预测错的，定性归类
- [ ] `REPORT.md`：跟原论文 baseline 对比，讨论你的 mini 模型 trade-off

## 交付物

训练脚本 + `checkpoints/best.ckpt` + `reports/accuracy.md` + `infer.py` 能对一个 SMILES 做预测 demo。

## 参考资料

- **Upstream**: [rxn4chemistry/OpenNMT-py](https://github.com/rxn4chemistry/OpenNMT-py)
- **Paper**: Schwaller *et al.* *Molecular Transformer: A Model for Uncertainty-Calibrated Chemical Reaction Prediction.* *ACS Cent. Sci.* 2019. [DOI](https://doi.org/10.1021/acscentsci.9b00576)
- **Tutorial**: [Molecular Transformer tutorial on YouTube](https://www.youtube.com/results?search_query=molecular+transformer+reaction+prediction)

## 通关标准

- top-1 accuracy 到 40%+（mini 模型的合理范围）
- 误差分析能指出具体的反应类别短板
- 一条 `python infer.py --rxn "CCO.CC(=O)O>>"` 能吐出 top-5 产物

---

*《从 0 到精通 · Maestro》L3 项目 · MIT License*
