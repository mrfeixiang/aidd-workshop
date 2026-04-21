export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type Resource = {
  /** canonical upstream repo backing this project */
  github?: string;
  /** DOI or paper URL */
  paper?: string;
  /** YouTube tutorial URL (single video or search URL) */
  youtube?: string;
};

export type Project = {
  slug: string;
  title: string;
  titleEn: string;
  tagline: string;
  description: string;
  github: string;
  skills: string[];
  tools: string[];
  hours: string;
  difficulty: Difficulty;
  deliverable: string;
  kind: "kickoff" | "build" | "capstone";
  resources?: Resource;
};

export type Level = {
  id: string;
  num: number;
  name: string;
  nameEn: string;
  kanji: string;
  tagline: string;
  summary: string;
  outcomes: string[];
  prerequisites: string[];
  weeks: string;
  accent: string;
  projects: Project[];
};

/**
 * Canonical GitHub home for the whole Maestro curriculum. Individual
 * per-project repos will be spun off later; for now every project card
 * points at the same course repo with a per-project hash anchor
 * (e.g. #hello-molecule) — those become README sections as each
 * project launches.
 */
export const GITHUB_USER = "mrfeixiang";
export const COURSE_REPO = "AIDD101";
export const COURSE_REPO_URL = `https://github.com/${GITHUB_USER}/${COURSE_REPO}`;

const repo = (slug: string) => `${COURSE_REPO_URL}#${slug}`;

export const LEVELS: Level[] = [
  {
    id: "level-0",
    num: 0,
    name: "破零",
    nameEn: "Starter",
    kanji: "零",
    tagline: "From zero — wire up the lab, clone your first repo.",
    summary:
      "装好工具、跑通第一行 RDKit、把 notebook push 到 GitHub。先让环境听话，再谈科研。",
    outcomes: [
      "Conda + Python + RDKit + Jupyter 跑通",
      "Git / GitHub / PR / Issues 的日常工作流",
      "第一次把自己的 notebook 提交到 public repo",
    ],
    prerequisites: ["一台能装 conda 的电脑", "愿意敲命令行的勇气"],
    weeks: "Week 1–2",
    accent: "#7FA99B",
    projects: [
      {
        slug: "hello-molecule",
        title: "第一颗分子",
        titleEn: "hello-molecule",
        tagline: "SMILES → 2D 结构 → 描述符",
        description:
          "跟着 README 在 Jupyter 里把阿司匹林画出来，算出分子量和 logP，把 notebook push 上去。",
        github: repo("hello-molecule"),
        skills: ["Python", "RDKit", "Jupyter"],
        tools: ["conda", "jupyter", "rdkit"],
        hours: "3h",
        difficulty: 1,
        deliverable: "notebooks/01_hello.ipynb + Pull Request",
        kind: "kickoff",
        resources: {
          github: "https://github.com/rdkit/rdkit",
          youtube:
            "https://www.youtube.com/results?search_query=rdkit+tutorial+for+beginners",
        },
      },
      {
        slug: "git-drug-lab",
        title: "药物实验室 Git 入门",
        titleEn: "git-drug-lab",
        tagline: "fork · branch · commit · PR",
        description:
          "用一个迷你化合物库仓库练习真实的协作流程：开 issue、切分支、提 PR、过 review。",
        github: repo("git-drug-lab"),
        skills: ["Git", "GitHub", "协作流程"],
        tools: ["git", "gh", "GitHub Actions"],
        hours: "4h",
        difficulty: 1,
        deliverable: "合并一条 PR 到 main，含 CI 绿灯",
        kind: "build",
        resources: {
          github: "https://github.com/git-guides",
          youtube:
            "https://www.youtube.com/results?search_query=git+github+for+scientists",
        },
      },
      {
        slug: "aidd-env-starter",
        title: "AIDD 环境模板",
        titleEn: "aidd-env-starter",
        tagline: "一份可复现的 environment.yml",
        description:
          "把你之后要用的库（rdkit, openbabel, py3Dmol, pandas, scikit-learn）固化成环境模板，写上 README。",
        github: repo("aidd-env-starter"),
        skills: ["Reproducibility", "DevOps 入门"],
        tools: ["mamba", "Docker (可选)"],
        hours: "3h",
        difficulty: 2,
        deliverable: "environment.yml + make setup 一键跑通",
        kind: "build",
        resources: {
          github: "https://github.com/conda-forge/miniforge",
          youtube:
            "https://www.youtube.com/results?search_query=conda+environment+reproducibility",
        },
      },
    ],
  },
  {
    id: "level-1",
    num: 1,
    name: "入门",
    nameEn: "Apprentice",
    kanji: "初",
    tagline: "Cheminformatics fundamentals — descriptors, fingerprints, QSAR.",
    summary:
      "把化合物变成向量，把活性变成标签。跑通第一个 QSAR 回归，理解 train/test 的礼貌。",
    outcomes: [
      "熟练使用 RDKit 算描述符 / 指纹",
      "写出可复现的 QSAR pipeline",
      "从 ChEMBL 拉数据并清洗",
    ],
    prerequisites: ["Level 0 完成", "会用 pandas / numpy"],
    weeks: "Week 3–5",
    accent: "#E8B959",
    projects: [
      {
        slug: "chembl-data-explorer",
        title: "ChEMBL 数据矿工",
        titleEn: "chembl-data-explorer",
        tagline: "拉取 · 清洗 · 去盐 · 可视化",
        description:
          "选一个靶点（比如 EGFR），从 ChEMBL 拉 bioactivity，做标准化、去盐、单位统一，出一份 EDA 报告。",
        github: repo("chembl-data-explorer"),
        skills: ["数据清洗", "ChEMBL API", "EDA"],
        tools: ["chembl_webresource_client", "pandas", "seaborn"],
        hours: "6h",
        difficulty: 2,
        deliverable: "reports/egfr_eda.html + 清洗后的 parquet",
        kind: "build",
        resources: {
          github: "https://github.com/chembl/chembl_webresource_client",
          paper: "https://doi.org/10.1093/nar/gky1075",
          youtube:
            "https://www.youtube.com/results?search_query=chembl+bioactivity+tutorial",
        },
      },
      {
        slug: "qsar-from-scratch",
        title: "QSAR 从零到一",
        titleEn: "qsar-from-scratch",
        tagline: "Morgan FP + RandomForest = 第一条 baseline",
        description:
          "用 Morgan 指纹 + sklearn 跑出第一个回归模型，做 scaffold split 验证，把 R² 和 RMSE 写成 markdown 报告。",
        github: repo("qsar-from-scratch"),
        skills: ["QSAR", "特征工程", "模型评估"],
        tools: ["rdkit", "scikit-learn", "matplotlib"],
        hours: "8h",
        difficulty: 3,
        deliverable: "training.py + model.pkl + REPORT.md",
        kind: "build",
        resources: {
          github: "https://github.com/scikit-learn/scikit-learn",
          paper: "https://doi.org/10.1021/jm4004285",
          youtube:
            "https://www.youtube.com/results?search_query=qsar+machine+learning+tutorial",
        },
      },
      {
        slug: "similarity-search-cli",
        title: "相似性搜索命令行",
        titleEn: "similarity-search-cli",
        tagline: "输入一个 SMILES，吐出最像的 N 个化合物",
        description:
          "用 Tanimoto 写一个可以被 pip install 的 CLI 工具，支持 parquet/csv 输入，配 README 和 pytest。",
        github: repo("similarity-search-cli"),
        skills: ["CLI 设计", "打包发布", "单元测试"],
        tools: ["click", "pytest", "pyproject.toml"],
        hours: "6h",
        difficulty: 3,
        deliverable: "PyPI 上线 + GitHub Release",
        kind: "capstone",
        resources: {
          github: "https://github.com/rdkit/rdkit",
          paper: "https://doi.org/10.1021/ci9803381",
          youtube:
            "https://www.youtube.com/results?search_query=tanimoto+similarity+cheminformatics",
        },
      },
    ],
  },
  {
    id: "level-2",
    num: 2,
    name: "进阶",
    nameEn: "Practitioner",
    kanji: "中",
    tagline: "Structure-based — proteins, pockets, docking.",
    summary:
      "从 PDB 到 pocket 到 docking score。学会把真实结构数据喂进自动化管线。",
    outcomes: [
      "蛋白准备 / 质子化 / 口袋识别",
      "用 AutoDock Vina / smina 批量对接",
      "把 docking 结果做后处理和打分",
    ],
    prerequisites: ["Level 1 完成", "一点点结构生物学"],
    weeks: "Week 6–9",
    accent: "#D97757",
    projects: [
      {
        slug: "pocket-finder",
        title: "口袋猎人",
        titleEn: "pocket-finder",
        tagline: "fpocket / p2rank 串起来",
        description:
          "给一个 PDB，自动下载、清洗、跑口袋检测，用 py3Dmol 渲染出来嵌进 Jupyter report。",
        github: repo("pocket-finder"),
        skills: ["结构预处理", "口袋识别", "3D 可视化"],
        tools: ["biopython", "fpocket", "py3Dmol"],
        hours: "8h",
        difficulty: 3,
        deliverable: "analyze.py + report.ipynb + .pdb 附件",
        kind: "build",
        resources: {
          github: "https://github.com/Discngine/fpocket",
          paper: "https://doi.org/10.1186/1471-2105-10-168",
          youtube:
            "https://www.youtube.com/results?search_query=fpocket+binding+site+prediction",
        },
      },
      {
        slug: "vina-pipeline",
        title: "Vina 批量对接流水线",
        titleEn: "vina-pipeline",
        tagline: "1 个蛋白 · 1000 个配体 · 一声回车",
        description:
          "接收 SDF 批次，自动做 3D 生成、对接、能量排序，输出带 pose 的 parquet + 报告。支持 SLURM / 本地 multiprocessing。",
        github: repo("vina-pipeline"),
        skills: ["批处理", "并行计算", "docking 评估"],
        tools: ["AutoDock Vina", "meeko", "joblib"],
        hours: "12h",
        difficulty: 4,
        deliverable: "CLI: vina-pipeline run --receptor ... --ligands ...",
        kind: "build",
        resources: {
          github: "https://github.com/ccsb-scripps/AutoDock-Vina",
          paper: "https://doi.org/10.1021/acs.jcim.1c00203",
          youtube:
            "https://www.youtube.com/results?search_query=autodock+vina+tutorial",
        },
      },
      {
        slug: "virtual-screening-mini",
        title: "虚拟筛选小战役",
        titleEn: "virtual-screening-mini",
        tagline: "10 万分子 → top 100 的自动漏斗",
        description:
          "把 Level 1 的 QSAR 和 Level 2 的 docking 串起来：先 ML 筛除，再 docking 精排，输出 hit list。",
        github: repo("virtual-screening-mini"),
        skills: ["端到端管线", "分层筛选", "实验记录"],
        tools: ["snakemake", "prefect (可选)", "dvc"],
        hours: "14h",
        difficulty: 4,
        deliverable: "Snakefile + results/hits.csv + 可复现报告",
        kind: "capstone",
        resources: {
          github: "https://github.com/snakemake/snakemake",
          paper: "https://doi.org/10.12688/f1000research.29032.2",
          youtube:
            "https://www.youtube.com/results?search_query=snakemake+bioinformatics+pipeline",
        },
      },
    ],
  },
  {
    id: "level-3",
    num: 3,
    name: "高级",
    nameEn: "Craftsman",
    kanji: "高",
    tagline: "Deep learning for molecules — GNN, Transformer, diffusion.",
    summary:
      "把分子变成图，把性质变成 loss。理解为什么 GNN 比指纹更懂化学 —— 以及为什么它经常骗你。",
    outcomes: [
      "用 PyTorch Geometric / DGL 训练分子 GNN",
      "理解 scaffold / time split、OOD 测试",
      "做好实验追踪与权重版本化",
    ],
    prerequisites: ["Level 2 完成", "PyTorch 基础"],
    weeks: "Week 10–14",
    accent: "#6C8CBF",
    projects: [
      {
        slug: "gnn-solubility",
        title: "GNN 溶解度预测器",
        titleEn: "gnn-solubility",
        tagline: "MPNN · MoleculeNet ESOL",
        description:
          "在 ESOL 上训练 MPNN，对比 Morgan+RF baseline，产出 loss 曲线、误差分布、scaffold split 的消融。",
        github: repo("gnn-solubility"),
        skills: ["GNN", "消融实验", "可视化"],
        tools: ["PyTorch", "PyG", "Weights & Biases"],
        hours: "14h",
        difficulty: 4,
        deliverable: "wandb run + REPORT.md + 推理脚本",
        kind: "build",
        resources: {
          github: "https://github.com/pyg-team/pytorch_geometric",
          paper: "https://arxiv.org/abs/1704.01212",
          youtube:
            "https://www.youtube.com/results?search_query=pytorch+geometric+tutorial",
        },
      },
      {
        slug: "transformer-reaction",
        title: "反应预测 Transformer",
        titleEn: "transformer-reaction",
        tagline: "reactant SMILES → product SMILES",
        description:
          "用 USPTO-50k 训练一个小号 Transformer 做产物预测，评估 top-k 准确率，做 error analysis。",
        github: repo("transformer-reaction"),
        skills: ["Transformer", "序列建模", "错误分析"],
        tools: ["PyTorch Lightning", "HuggingFace tokenizers"],
        hours: "18h",
        difficulty: 5,
        deliverable: "训练脚本 + checkpoint + inference demo",
        kind: "build",
        resources: {
          github: "https://github.com/rxn4chemistry/OpenNMT-py",
          paper: "https://doi.org/10.1021/acscentsci.9b00576",
          youtube:
            "https://www.youtube.com/results?search_query=molecular+transformer+reaction+prediction",
        },
      },
      {
        slug: "active-learning-lab",
        title: "主动学习实验室",
        titleEn: "active-learning-lab",
        tagline: "先问再算 —— 用预算最少的 oracle 查询",
        description:
          "模拟一个 oracle（比如 docking），用不确定度采样策略迭代挑分子，画出 budget vs. performance 曲线。",
        github: repo("active-learning-lab"),
        skills: ["贝叶斯思维", "主动学习", "实验设计"],
        tools: ["scikit-learn", "modAL", "matplotlib"],
        hours: "16h",
        difficulty: 5,
        deliverable: "多种策略对比报告 + 可复现随机种子",
        kind: "capstone",
        resources: {
          github: "https://github.com/modAL-python/modAL",
          paper: "https://doi.org/10.1021/acs.jcim.1c00166",
          youtube:
            "https://www.youtube.com/results?search_query=active+learning+drug+discovery",
        },
      },
    ],
  },
  {
    id: "level-4",
    num: 4,
    name: "精通",
    nameEn: "Maestro",
    kanji: "精",
    tagline: "Generative · structure-aware · end-to-end pipelines.",
    summary:
      "从 de novo 设计到 AlphaFold，从 FEP 到发表。你已经不是在学工具 —— 你在定义工具。",
    outcomes: [
      "跑通并改造 de novo 分子生成模型",
      "集成 AlphaFold / ESMFold 到 AIDD 管线",
      "产出可被同行引用的开源仓库",
    ],
    prerequisites: ["Level 3 完成", "一颗愿意持续开源的心"],
    weeks: "Week 15–24",
    accent: "#1A3636",
    projects: [
      {
        slug: "de-novo-generator",
        title: "De Novo 生成器",
        titleEn: "de-novo-generator",
        tagline: "REINVENT 风格的条件生成",
        description:
          "训练一个 SMILES LSTM + RL 微调，能按 QED / SA / docking 约束生成新分子，自带评测。",
        github: repo("de-novo-generator"),
        skills: ["生成模型", "强化学习", "多目标优化"],
        tools: ["PyTorch", "RDKit", "RAY / Optuna"],
        hours: "24h",
        difficulty: 5,
        deliverable: "预训练权重 + 条件生成 demo + 评测脚本",
        kind: "build",
        resources: {
          github: "https://github.com/MolecularAI/Reinvent",
          paper: "https://doi.org/10.1021/acs.jcim.0c00915",
          youtube:
            "https://www.youtube.com/results?search_query=reinvent+de+novo+molecule+generation",
        },
      },
      {
        slug: "alphafold-pipeline",
        title: "AlphaFold × 药物设计",
        titleEn: "alphafold-pipeline",
        tagline: "序列 → 结构 → 口袋 → hit",
        description:
          "从 UniProt ID 出发：ESMFold 预测结构、pocket 识别、和 Level 2 的 vina-pipeline 自动对接，产出 hit 清单。",
        github: repo("alphafold-pipeline"),
        skills: ["结构预测", "管线整合", "GPU 调度"],
        tools: ["ESMFold", "ColabFold", "snakemake"],
        hours: "22h",
        difficulty: 5,
        deliverable: "端到端 Snakefile + 论文级报告模板",
        kind: "build",
        resources: {
          github: "https://github.com/facebookresearch/esm",
          paper: "https://doi.org/10.1038/s41586-021-03819-2",
          youtube:
            "https://www.youtube.com/results?search_query=alphafold2+tutorial+drug+design",
        },
      },
      {
        slug: "fep-workshop",
        title: "FEP 工作坊",
        titleEn: "fep-workshop",
        tagline: "自由能微扰 —— 让打分真的靠谱",
        description:
          "用 OpenFE / OpenMM 搭一条 RBFE 流程，和 docking 打分做对比，写一篇 blog 讲清楚它救不了你什么。",
        github: repo("fep-workshop"),
        skills: ["MD 基础", "自由能计算", "批评性写作"],
        tools: ["OpenMM", "OpenFE", "CUDA"],
        hours: "28h",
        difficulty: 5,
        deliverable: "RBFE 结果 + blog + GitHub Release v1.0",
        kind: "build",
        resources: {
          github: "https://github.com/OpenFreeEnergy/openfe",
          paper: "https://doi.org/10.1021/ja512751q",
          youtube:
            "https://www.youtube.com/results?search_query=free+energy+perturbation+tutorial",
        },
      },
      {
        slug: "aidd-portfolio",
        title: "个人 AIDD Portfolio",
        titleEn: "aidd-portfolio",
        tagline: "毕业作品 · 出师一战",
        description:
          "把整条学习路径的代码、报告、博客、演讲稿整合成个人主页 + pinned repos，公开展示给社区。",
        github: repo("aidd-portfolio"),
        skills: ["技术写作", "开源社区", "个人品牌"],
        tools: ["GitHub Pages", "MkDocs", "Quarto"],
        hours: "16h",
        difficulty: 4,
        deliverable: "username.github.io 上线 + 6 个 pinned repos",
        kind: "capstone",
        resources: {
          github: "https://github.com/squidfunk/mkdocs-material",
          youtube:
            "https://www.youtube.com/results?search_query=technical+portfolio+github+tutorial",
        },
      },
    ],
  },
];

export const SKILL_PILLARS = [
  {
    key: "cheminformatics",
    label: "化学信息",
    desc: "RDKit / 指纹 / 描述符 / 数据清洗",
  },
  {
    key: "structure",
    label: "结构生物",
    desc: "PDB / 口袋 / Docking / MD",
  },
  {
    key: "ml",
    label: "机器学习",
    desc: "sklearn / PyTorch / GNN / Transformer",
  },
  {
    key: "generative",
    label: "生成模型",
    desc: "VAE / RL / Diffusion / de novo",
  },
  {
    key: "engineering",
    label: "工程能力",
    desc: "Git / CI / 包管理 / 可复现性",
  },
  {
    key: "communication",
    label: "科研表达",
    desc: "写作 / 图表 / 演讲 / 开源",
  },
];

export const TOTAL_PROJECTS = LEVELS.reduce((n, l) => n + l.projects.length, 0);
export const TOTAL_HOURS = LEVELS.reduce(
  (n, l) =>
    n +
    l.projects.reduce((m, p) => m + parseInt(p.hours.replace(/\D/g, ""), 10), 0),
  0,
);
