const lib = require('lib');
const {
    xi, zuanshikuang, zuanjing, hua1, hua2, hua3, tanban,
    zhiwumo, luzha, weijing1, weijing2, xiao, liziye, juhebaozhawu,
    weijing3, weijing4, weijing5, guijingti, molishi,
    monengjing, monengjing1, monengjing2, monengjing3,
    buding, chuangshilizi, chuangshishenhun, chuangshiweichen,
    chuangshizhixing, jin, jinfen, molizhi, shimoxi, shiying,
    yuanshencanpian, zhayao, zijing1, zzjinbi, invalid, dabaosuan,
    molijinghuaye, moliye, qiangxiaolengqueye, zhiwujinghuaye, suan, yuanwan0,
    dabaoshui, dabaoleng, dabaoshiyou, dabaomoli, dabaozhiwu, dabaojingmoli, dabaoyedan
} = require('wupin');
var transparency = 0.9//透明度
var framesCount = 2;//贴图数
var frames = new Array();
var colors = [Color.valueOf("3E5582"), Color.valueOf("89BAEE")];
const shimoxiji = extend(GenericCrafter, "shimoxiji", {
	load(){
		this.super$load();
		for(let i = 0; i < framesCount; i++){
			frames[i] = Core.atlas.find(this.name + "-frame" + i);
		}
	},
});
shimoxiji.buildType = () => {
 	 var colorTimer = 59;
     return extend(GenericCrafter.GenericCrafterBuild, shimoxiji, {
         draw(){
         	this.super$draw();
         	var index = Math.floor(this.totalProgress % (colors.length * colorTimer) / colorTimer);
         	if(frames.length > 0) frames.forEach((frame, i) => {
         		Draw.color(colors[(index + i) % colors.length], transparency);
         		Draw.rect(frame, this.x, this.y);
         	});
         },
     })
 }
 shimoxiji.buildVisibility = BuildVisibility.shown;


shimoxiji.drawer = new DrawSmelter(Color.valueOf("426996"));
shimoxiji.craftEffect = Fx.smeltsmoke;
shimoxiji.health = 180;//石墨烯制造器
shimoxiji.size = 2;
shimoxiji.hasPower = true;
shimoxiji.hasItems = true;
shimoxiji.buildCostMultiplier = 0.35;
shimoxiji.craftTime = 95;
shimoxiji.consumes.power(0.6);
shimoxiji.consumes.items(new ItemStack.with(
    Items.graphite, 5, Items.lead, 2,
));
shimoxiji.outputItem = new ItemStack(
    shimoxi, 1,
);
shimoxiji.requirements = ItemStack.with(
    Items.lead, 50,
    Items.titanium, 15,
    Items.graphite, 25,
    guijingti, 30,
);
shimoxiji.buildVisibility = BuildVisibility.shown;
shimoxiji.category = Category.crafting;
exports.shimoxiji = shimoxiji;