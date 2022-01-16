const crafter = require("XuanZeV7");
const items = require('wupin');
const lib = require('lib');
const {
  xi, zuanshikuang, zuanjing, hua1, hua2, hua3, tanban,
  zhiwumo, luzha, weijing1, weijing2, xiao, liziye, juhebaozhawu,
  weijing3, weijing4, weijing5, guijingti, molishi,
  monengjing, monengjing1, monengjing2, monengjing3,
  buding, chuangshilizi, chuangshishenhun, chuangshiweichen,
  chuangshizhixing, jin, jinfen, molizhi, shimoxi, shiying,
  yuanshencanpian, zhayao, zijing1, zzjinbi, invalid,
  molijinghuaye, moliye, qiangxiaolengqueye, zhiwujinghuaye,
  dabaoshui, dabaoleng, dabaoshiyou, dabaomoli, dabaozhiwu, dabaojingmoli, dabaoyedan
} = items;
const testC = crafter.MultiCrafter1(GenericCrafter, GenericCrafter.GenericCrafterBuild, "yeti11", [
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["water/100"],
      power: 1,
    },
    output: {
      items: ["creator-dabaoshui/1"],
    },
    craftTime: 180,
  },
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["oil/100"],
      power: 1,
    },
    output: {
      items: ["creator-dabaoshiyou/1"],
    },
    craftTime: 180,
  },
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["cryofluid/100"],
      power: 1,
    },
    output: {
      items: ["creator-dabaoleng/1"],
    },
    craftTime: 180,
  },
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["creator-moliye/100"],
      power: 1,
    },
    output: {
      items: ["creator-dabaomoli/1"],
    },
    craftTime: 180,
  },
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["creator-zhiwujinghuaye/100"],
      power: 1.5,
    },
    output: {
      items: ["creator-dabaozhiwu/1"],
    },
    craftTime: 180,
  },
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["creator-molijinghuaye/100"],
      power: 3,
    },
    output: {
      items: ["creator-dabaojingmoli/1"],
    },
    craftTime: 300,
  },
  {
    input: {
      items: ["creator-xi/5"],
      liquids: ["creator-qiangxiaolengqueye/100"],
      power: 5,
    },
    output: {
      items: ["creator-dabaoyedan/1"],
    },
    craftTime: 420,
  },
  // {
  //   input: {
  //     items: ["creator-zijing1/10"],
  //     liquids: ["creator-suan/150"],
  //     power: 4,
  //   },
  //   output: {
  //     items: ["creator-dabaosuan/1"],
  //   },
  //   craftTime: 360,
  // },
]);
Object.assign(testC, {
  health: 360,
  size: 2,
  noParallelAffect: false,//false,
  itemCapacity: 10,
  liquidCapacity: 160,
  updateEffectChance: 1.05,
  updateEffect: Fx.steam,
  ambientSound: Sounds.machine,
  ambientSoundVolume: 0.1,
  craftEffect: Fx.steam,
});
testC.requirements = ItemStack.with(
  xi, 240,
  Items.plastanium, 60,
  jin, 80,
  Items.titanium, 120,
  Items.graphite, 250
);
testC.buildVisibility = BuildVisibility.shown;
testC.category = Category.crafting;
lib.addToResearch(testC, { parent: Blocks.disassembler.name });
//--------------------------------------------------------------------------------
const testA = crafter.MultiCrafter1(GenericCrafter, GenericCrafter.GenericCrafterBuild, "yeti22", [
  {
    input: {
      items: ["creator-dabaoshui/1"],
      power: 1,
    },
    output: {
      items: ["creator-xi/1"],
      liquids: ["water/100"],
    },
    craftTime: 60,
  },
  {
    input: {
      items: ["creator-dabaoshiyou/1"],
      power: 1,
    },
    output: {
      items: ["creator-xi/1"],
      liquids: ["oil/100"],
    },
    craftTime: 60,
  },
  {
    input: {
      items: ["creator-dabaoleng/1"],
      power: 1,
    },
    output: {
      items: ["creator-xi/1"],
      liquids: ["cryofluid/100"],
    },
    craftTime: 60,
  },
  {
    input: {
      items: ["creator-dabaomoli/1"],
      power: 1,
    },
    output: {
      items: ["creator-xi/1"],
      liquids: ["creator-moliye/100"],
    },
    craftTime: 60,
  },
  {
    input: {
      items: ["creator-dabaozhiwu/1"],
      power: 1.5,
    },
    output: {
      items: ["creator-xi/1"],
      liquids: ["creator-zhiwujinghuaye/100"],
    },
    craftTime: 60,
  },
  {
    input: {
      items: ["creator-dabaojingmoli/1"],
      power: 3,
    },
    output: {
      items: ["creator-xi/1"],
      liquids: ["creator-molijinghuaye/100"],
    },
    craftTime: 90,
  },
  {
    input: {
      items: ["creator-dabaoyedan/1"],
      power: 5,
    },
    output: {
      items: ["creator-xi/2"],
      liquids: ["creator-qiangxiaolengqueye/100"],
    },
    craftTime: 120,
  },
  // {
  //   input: {
  //     items: ["creator-dabaosuan/1"],
  //     power: 4,
  //   },
  //   output: {
  //     liquids: ["creator-suan/100"],
  //   },
  //   craftTime: 100,
  // },
]);
Object.assign(testA, {
  health: 360,
  size: 2,
  noParallelAffect: false,//false,
  itemCapacity: 10,
  liquidCapacity: 200,
  updateEffectChance: 1.05,
  updateEffect: Fx.steam,
  ambientSound: Sounds.machine,
  ambientSoundVolume: 0.2,
  craftEffect: Fx.steam,
});
testA.requirements = ItemStack.with(
  xi, 240,
  weijing1, 5,
  jin, 300,
  Items.titanium, 120,
  Items.graphite, 250
);
testA.outputsPower = false,
testA.buildVisibility = BuildVisibility.shown;
testA.category = Category.crafting;
lib.addToResearch(testA, { parent: testC.name, });














// const testC = crafter.MultiCrafter1(GenericCrafter, GenericCrafter.GenericCrafterBuild, "yeti11", [
//   {
//     input: {
//       items: ["metaglass/2"],
//       power: 1,
//     },
//     output: {
//       items: ["copper/10"],
//     },
//     craftTime: 60,
//   },
//   {
//     input: {
//       items: ["metaglass/2"],
//       //liquids: ["water/60"],液体
//       power: 1,
//     },
//     output: {
//       items: ["lead/10"],
//     },
//     craftTime: 60,
//   },
// ]);
// Object.assign(testC, {
//     size : 2,
// });