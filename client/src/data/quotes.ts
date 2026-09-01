// 台词库 —— 精选华语 / 世界电影、诗词、金句
// 每条为短句（一句台词），带来源与情绪标签，供「② 台词检索」检索。
// 说明：仅收录广为流传的短句，用于配图，请勿用于商业再分发。

export interface Quote {
  id: string;
  text: string; // 正文（一句话）
  author: string; // 出处 / 作者
  moods: string[]; // 情绪标签，用于检索与筛选
}

// 情绪标签总表（用于筛选按钮）
export const MOODS = [
  "江湖",
  "洒脱",
  "深情",
  "孤独",
  "热血",
  "清醒",
  "治愈",
  "迷茫",
  "丧",
  "文艺",
] as const;

export type Mood = (typeof MOODS)[number];

export const QUOTES: Quote[] = [
  // —— 王家卫 ——
  {
    id: "cf-1",
    text: "不知道从什么时候开始，每个东西上面都有一个日子。",
    author: "《重庆森林》",
    moods: ["文艺", "孤独"],
  },
  {
    id: "cf-2",
    text: "如果有多一张船票，你会不会跟我一起走。",
    author: "《花样年华》",
    moods: ["深情", "文艺"],
  },
  {
    id: "cf-3",
    text: "世界上有一种鸟是没有脚的，它只能一直飞。",
    author: "《阿飞正传》",
    moods: ["孤独", "洒脱"],
  },
  {
    id: "cf-4",
    text: "看见一座山，就想知道山后面是什么。",
    author: "《东邪西毒》",
    moods: ["迷茫", "文艺"],
  },
  // —— 周星驰 / 港片 ——
  {
    id: "cf-5",
    text: "如果非要在这份爱上加一个期限，我希望是一万年。",
    author: "《大话西游》",
    moods: ["深情"],
  },
  {
    id: "cf-6",
    text: "人如果没有梦想，跟咸鱼有什么分别。",
    author: "《少林足球》",
    moods: ["热血", "洒脱"],
  },
  {
    id: "cf-7",
    text: "以前我没得选，现在我想做个好人。",
    author: "《无间道》",
    moods: ["清醒", "江湖"],
  },
  {
    id: "cf-8",
    text: "出来混，迟早要还的。",
    author: "《无间道 II》",
    moods: ["江湖", "清醒"],
  },
  {
    id: "cf-9",
    text: "说的是一辈子，差一年、一个月、一天、一个时辰，都不算一辈子。",
    author: "《霸王别姬》",
    moods: ["深情", "文艺"],
  },
  {
    id: "cf-10",
    text: "站着，还把钱挣了。",
    author: "《让子弹飞》",
    moods: ["热血", "洒脱"],
  },
  // —— 韩寒 / 内地 ——
  {
    id: "cf-11",
    text: "喜欢就会放肆，但爱就是克制。",
    author: "《后会无期》",
    moods: ["深情", "清醒"],
  },
  {
    id: "cf-12",
    text: "听过很多道理，依然过不好这一生。",
    author: "《后会无期》",
    moods: ["迷茫", "丧"],
  },
  {
    id: "cf-13",
    text: "我不是想赢，我只是不想输。",
    author: "《飞驰人生》",
    moods: ["热血"],
  },
  // —— 世界电影 ——
  {
    id: "cf-14",
    text: "希望是件好东西，也许是最好的，好东西是不会消亡的。",
    author: "《肖申克的救赎》",
    moods: ["治愈", "热血"],
  },
  {
    id: "cf-15",
    text: "忙着活，或者忙着死。",
    author: "《肖申克的救赎》",
    moods: ["清醒", "热血"],
  },
  {
    id: "cf-16",
    text: "陆地上的人喜欢寻根问底，虚度了大好光阴。",
    author: "《海上钢琴师》",
    moods: ["文艺", "洒脱"],
  },
  {
    id: "cf-17",
    text: "斯人若彩虹，遇上方知有。",
    author: "《怦然心动》",
    moods: ["深情", "治愈"],
  },
  {
    id: "cf-18",
    text: "生活是否永远艰辛，还是仅仅童年如此。",
    author: "《这个杀手不太冷》",
    moods: ["迷茫", "孤独"],
  },
  {
    id: "cf-19",
    text: "重要的东西，用眼睛是看不见的。",
    author: "《小王子》",
    moods: ["治愈", "文艺"],
  },
  {
    id: "cf-20",
    text: "所有的大人都曾经是小孩，虽然只有少数人记得。",
    author: "《小王子》",
    moods: ["治愈", "文艺"],
  },
  {
    id: "cf-21",
    text: "人生就是一列开往坟墓的列车，路途上会有很多站。",
    author: "《千与千寻》",
    moods: ["文艺", "迷茫"],
  },
  {
    id: "cf-22",
    text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。",
    author: "《阿甘正传》",
    moods: ["治愈", "洒脱"],
  },
  // —— 音乐 · Beyond ——
  {
    id: "cf-23",
    text: "原谅我这一生不羁放纵爱自由。",
    author: "Beyond《海阔天空》",
    moods: ["热血", "洒脱"],
  },
  {
    id: "cf-24",
    text: "今天只有残留的躯壳，迎接光辉岁月。",
    author: "Beyond《光辉岁月》",
    moods: ["热血", "洒脱"],
  },
  {
    id: "cf-25",
    text: "多少次迎着冷眼与嘲笑，从没有放弃过心中的理想。",
    author: "Beyond《海阔天空》",
    moods: ["热血"],
  },
  // —— 诗词 · 古典 ——
  {
    id: "cf-26",
    text: "人生得意须尽欢，莫使金樽空对月。",
    author: "李白《将进酒》",
    moods: ["洒脱", "热血"],
  },
  {
    id: "cf-27",
    text: "天生我材必有用，千金散尽还复来。",
    author: "李白《将进酒》",
    moods: ["洒脱", "热血"],
  },
  {
    id: "cf-28",
    text: "回首向来萧瑟处，归去，也无风雨也无晴。",
    author: "苏轼《定风波》",
    moods: ["洒脱", "清醒"],
  },
  {
    id: "cf-29",
    text: "此心安处，便是吾乡。",
    author: "苏轼《定风波》",
    moods: ["治愈", "洒脱"],
  },
  {
    id: "cf-30",
    text: "面朝大海，春暖花开。",
    author: "海子",
    moods: ["治愈", "文艺"],
  },
  {
    id: "cf-31",
    text: "从明天起，做一个幸福的人。",
    author: "海子",
    moods: ["治愈", "文艺"],
  },
  // —— 文学 · 金句 ——
  {
    id: "cf-32",
    text: "在隆冬，我终于知道，我身上有一个不可战胜的夏天。",
    author: "加缪",
    moods: ["热血", "清醒"],
  },
  {
    id: "cf-33",
    text: "世上只有一种英雄主义，就是认清生活真相后依然热爱生活。",
    author: "罗曼·罗兰",
    moods: ["清醒", "治愈"],
  },
  {
    id: "cf-34",
    text: "一辈子很长，要和有趣的人在一起。",
    author: "王小波",
    moods: ["洒脱", "治愈"],
  },
  {
    id: "cf-35",
    text: "我们所有的青春都消耗在等待里了。",
    author: "王小波",
    moods: ["孤独", "迷茫"],
  },
  {
    id: "cf-36",
    text: "生命是一袭华美的袍，爬满了蚤子。",
    author: "张爱玲",
    moods: ["清醒", "丧"],
  },
  {
    id: "cf-37",
    text: "于千万人之中遇见你所要遇见的人。",
    author: "张爱玲",
    moods: ["深情", "文艺"],
  },
  // —— 情绪 · 丧 / 清醒 ——
  {
    id: "cf-38",
    text: "成年人的世界，没有容易二字。",
    author: "佚名",
    moods: ["丧", "清醒"],
  },
  {
    id: "cf-39",
    text: "我们终将上岸，阳光万里。",
    author: "佚名",
    moods: ["治愈", "热血"],
  },
  {
    id: "cf-40",
    text: "熬过所有的苦，就会遇见微甜。",
    author: "佚名",
    moods: ["治愈"],
  },
  {
    id: "cf-41",
    text: "热爱可抵岁月漫长。",
    author: "佚名",
    moods: ["治愈", "热血"],
  },
  {
    id: "cf-42",
    text: "山高路远，看世界，也找自己。",
    author: "佚名",
    moods: ["洒脱", "文艺"],
  },
  {
    id: "cf-43",
    text: "愿你走出半生，归来仍是少年。",
    author: "佚名",
    moods: ["治愈", "洒脱"],
  },
  {
    id: "cf-44",
    text: "别怕，你只是还没长成自己想要的模样。",
    author: "佚名",
    moods: ["治愈", "迷茫"],
  },
  {
    id: "cf-45",
    text: "孤独是所有不甘平庸者的宿命。",
    author: "佚名",
    moods: ["孤独", "清醒"],
  },
];

/** 按关键词 + 情绪标签检索台词。keyword 匹配正文或出处。 */
export function searchQuotes(keyword: string, mood: string | null): Quote[] {
  const kw = keyword.trim().toLowerCase();
  return QUOTES.filter((q) => {
    const matchMood = !mood || q.moods.includes(mood);
    const matchKw =
      !kw ||
      q.text.toLowerCase().includes(kw) ||
      q.author.toLowerCase().includes(kw);
    return matchMood && matchKw;
  });
}
