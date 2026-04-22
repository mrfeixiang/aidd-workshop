# git-drug-lab · 药物实验室 Git 入门

> fork · branch · commit · PR —— 用一个迷你化合物库练真实协作流程。

**Level**: L0 · 破零 / Starter
**Difficulty**: ★☆☆☆☆
**预估工时**: 4h
**类型**: 核心构建

---

## 这个项目在教什么

把 GitHub 工作流和 AIDD 场景结合：开 issue、切分支、提 PR、过 review、
跑 CI。目标是**不再害怕 Git**。

## 你会学到什么

- `git clone / checkout -b / add / commit / push`
- 用 `gh` CLI 开 issue、看 PR、跑 workflow
- GitHub Actions 的基础概念
- Conventional commits + 语义化 PR 标题

## 环境准备

- 完成 L0 · `hello-molecule`
- 本地装好 `git`、`gh`（GitHub CLI）、conda

## 任务清单

- [ ] 在 `projects/git-drug-lab/data/` 新增一个 10 分子的 CSV（SMILES + name）
- [ ] 用 `gh issue create` 开一条 issue 描述你要加的分子
- [ ] 切分支：`git checkout -b feat/add-drug-<name>`
- [ ] 写 `src/validate.py`：用 RDKit 校验每个 SMILES 是否合法
- [ ] 加一个最简 GitHub Actions workflow：push 时跑 `python src/validate.py`
- [ ] 提 PR → 等 CI 绿灯 → squash merge
- [ ] 截一张 Actions 绿灯的图放进 `REPORT.md`

## 交付物

一条合并到 `main` 的 PR，`.github/workflows/validate.yml` 绿灯，`REPORT.md` 描述了你学到的 Git 概念。

## 参考资料

- **Upstream**: [git-guides](https://github.com/git-guides)
- **Docs**: [GitHub Docs · Pull requests](https://docs.github.com/en/pull-requests)
- **Tutorial**: [Git for scientists on YouTube](https://www.youtube.com/results?search_query=git+github+for+scientists)

## 通关标准

- PR 被合并，CI workflow 通过
- 能复述 fork / branch / PR / review 的区别
- 用 `gh pr status` 能看到自己所有 PR

---

*《从 0 到精通 · Maestro》L0 项目 · MIT License*
