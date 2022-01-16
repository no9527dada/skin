const items = require('wupin');
const lib = require('lib');
const {
    xi,
    zuanshikuang,
    zuanjing,
    hua1,
    hua2,
    hua3,
    tanban,
    zhiwumo,
    luzha,
    weijing1,
    weijing2,
    xiao,
    liziye,
    juhebaozhawu,
    weijing3,
    weijing4,
    weijing5,
    guijingti,
    molishi,
    monengjing,
    monengjing1,
    monengjing2,
    monengjing3,
    buding,
    chuangshilizi,
    chuangshishenhun,
    chuangshiweichen,
    chuangshizhixing,
    jin,
    jinfen,
    molizhi,
    shimoxi,
    shiying,
    yuanshencanpian,
    zhayao,
    zijing1,
    zzjinbi,
    invalid,
    molijinghuaye,
    moliye,
    qiangxiaolengqueye,
    zhiwujinghuaye,
    dabaoshui,
    dabaoleng,
    dabaoshiyou,
    dabaomoli,
    dabaozhiwu,
    dabaojingmoli,
    dabaoyedan
} = items;
const rainbowRegions = [];
const weijing4GC = extend(GenericCrafter, "c-4jiweijinggongchang", {
    load() {
        this.super$load();
        for (var i = 0; i < 10; i++) {
            rainbowRegions[i] = Core.atlas.find("creator-gc4-" + (i + 1));
        }
    },

});
weijing4GC.buildType = prov(() => {
    const tif = 20; //贴图间的延迟变色速度，越大越不同
    const tid = 2; //贴图变色速度，越大越快
    const tr2 = new Vec2();
    return new JavaAdapter(GenericCrafter.GenericCrafterBuild, {
        draw() {
            this.super$draw();
            // tr2.trns(this.rotation, -this.recoil);
            Draw.blend(Blending.additive);
            for (var h = 0; h < 10; h++) {
                Draw.color(Color.valueOf("ff0000").shiftHue((Time.time * tid) + (h * (360 / tif))));
                Draw.rect(rainbowRegions[h], this.x, this.y, this.rotation - 90);
            }
            Draw.blend();
            Draw.color();
            //Draw.rect(Core.atlas.find("creator-pu-b"), this.x, this.y);
            Draw.rect(Core.atlas.find("creator-gcx"), this.x, this.y, 90 + this.totalProgress * 3.5)
            //Draw.rect(Core.atlas.find("creator-gcx2"), this.x, this.y, 90 - this.totalProgress * 3);
            // Draw.rect(Core.atlas.find("creator-pu-top"),this.x, this.y);
        },

    }, weijing4GC);
});
weijing4GC.health = 3000; //微晶工厂4
weijing4GC.size = 8;
weijing4GC.itemCapacity = 800;
weijing4GC.liquidCapacity = 150;
weijing4GC.buildCostMultiplier = 0.2;
weijing4GC.hasPower = true;
weijing4GC.hasItems = true;
weijing4GC.hasLiquid = true;
weijing4GC.craftTime = 18000;
weijing4GC.craftEffect = Fx.nuclearcloud;
weijing4GC.updateEffect = Fx.impactShockwave;
weijing4GC.coolEffect = Fx.nuclearcloud;
weijing4GC.updateEffectChance = 0.1
weijing4GC.consumes.power(2000);
weijing4GC.consumes.liquid(molijinghuaye, 1);
weijing4GC.consumes.items(new ItemStack.with(
    Items.surgeAlloy, 560,
    zuanjing, 520,
    monengjing1, 60,
    weijing3, 50,
    jin, 650,
    xi, 700,
    molizhi, 220,
    zijing1, 640));
weijing4GC.outputItem = new ItemStack(
    weijing4, 1,
);
weijing4GC.requirements = ItemStack.with(
    Items.copper, 1000,
    Items.lead, 1200,
    Items.silicon, 2000,
    Items.titanium, 800,
    molishi, 700,
    weijing2, 500,
    weijing3, 120,
    zuanjing, 200,
);
weijing4GC.buildVisibility = BuildVisibility.shown;
weijing4GC.category = Category.crafting;
exports.weijing4GC = weijing4GC;






Blocks.payloadLoader.buildType = prov(() => {
    return new JavaAdapter(PayloadLoader.PayloadLoaderBuild, {
        draw() {
            this.super$draw();
            Draw.blend();
            Draw.color();
            Draw.rect(Core.atlas.find("creator-PayloadUnloader-1"), this.x, this.y, 90 - Time.time * 3);
        },
    }, Blocks.payloadLoader);
});
Blocks.siliconSmelter.buildType = () => {
    var transparency = 0.3
    var colors = [Color.valueOf("ffffff"), Color.valueOf("cdcddb"), Color.valueOf("7d7d7d"), Color.valueOf("242425")];
    var colorTimer = 30;
    var region = Core.atlas.find("creator-b");
    return extend(GenericCrafter.GenericCrafterBuild, Blocks.siliconSmelter, {
        draw() {
            this.super$draw();

            Draw.color(colors[Math.floor(this.totalProgress % (colors.length * colorTimer) / colorTimer)], transparency);
            Draw.rect(region, this.x, this.y);
        },
    })
}

//  Blocks.siliconSmelter.buildType = () => {
//     var transparency = 0.3
// 	var colors = [Color.valueOf("ffffff"), Color.valueOf("cdcddb"), Color.valueOf("7d7d7d"),Color.valueOf("242425")];
// 	var regionTimer = 0;
// 	var region = Core.atlas.find("creator-b");
//     return extend(GenericCrafter.GenericCrafterBuild, Blocks.siliconSmelter, {
//         draw(){
//         	this.super$draw();
//         	regionTimer += Time.delta / 20;
//         	regionTimer %= colors.length;
//         	Draw.color(colors[Math.floor(regionTimer)], transparency);
//         	Draw.rect(region, this.x, this.y);
//         },
//     })
// }


Blocks.payloadUnloader.buildType = prov(() => {
    return new JavaAdapter(PayloadUnloader.PayloadUnloaderBuild, {
        draw() {
            this.super$draw();
            Draw.blend();
            Draw.color();
            Draw.rect(Core.atlas.find("creator-PayloadLoader-1"), this.x, this.y, 90 - Time.time * 3);
        },
    }, Blocks.payloadUnloader);
});