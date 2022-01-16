/*
* @author guiY
* @Extra mod <https://github.com/guiYMOUR/mindustry-Extra-Utilities-mod>
*//* 
const speed = 2;

const yeti = extendContent(LiquidSource, "yeti", {
    drawRequestConfig(req, list){
        this.drawRequestConfigCenter(req, req.config, Core.atlas.find("yeti-yeti-centre"), true);
    },
});
yeti.localizedName = "Liquid Unloader";
yeti.buildType = prov(() => {
    var dumpingTo = null;
    var offset = 0;
    var liquidBegin = null;
    return new JavaAdapter(LiquidSource.LiquidSourceBuild, {
        updateTile(){
            if(liquidBegin != this.source){
                this.liquids.clear();
                liquidBegin = this.source;
            }
            for(var i = 0; i < this.proximity.size; i++){
                var pos = (offset + i) % this.proximity.size;
                var other = this.proximity.get(pos);

                if(other.interactable(this.team) && other.block.hasLiquids && this.source != null && other.liquids.get(this.source) > 0){
                    dumpingTo = other;
                    if(this.liquids.total() < this.block.liquidCapacity){
                        var amount = Math.min(speed, other.liquids.get(this.source));
                        this.liquids.add(this.source, amount);
                        other.liquids.remove(this.source, amount);
                    }
                }
            }
            if(this.proximity.size > 0){
                offset ++;
                offset %= this.proximity.size;
            }
            this.dumpLiquid(this.liquids.current());
        },
        canDumpLiquid(to, liquid){
            return to != dumpingTo;
        },
        draw(){
            Draw.rect(Core.atlas.find("yeti-yeti"), this.x, this.y);
            if(this.source == null){
                Draw.rect("cross", this.x, this.y);
            }else{
                Draw.color(this.source.color);
                Draw.rect(Core.atlas.find("yeti-yeti-centre"), this.x, this.y);
                Draw.color();
            }
        },
    }, yeti);
});
yeti.health = 70;
yeti.liquidCapacity = 10;
yeti.requirements = ItemStack.with(
    Items.metaglass, 10,
    Items.silicon, 20,
    Items.titanium, 15
);
yeti.buildVisibility = BuildVisibility.shown;
yeti.category = Category.liquid; */

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
const speed = 2;
const yeti = extendContent(LiquidSource, "yeti", {
    drawRequestConfig(req, list) {
        this.drawRequestConfigCenter(req, req.config, Core.atlas.find("creator-yeti-centre"), true);
    },
});
yeti.buildType = prov(() => {
    var dumpingTo = null;
    var offset = 0;
    var liquidBegin = null;
    return new JavaAdapter(LiquidSource.LiquidSourceBuild, {
        updateTile() {
            if (liquidBegin != this.source) {
                this.liquids.clear();
                liquidBegin = this.source;
            }
            for (var i = 0; i < this.proximity.size; i++) {
                var pos = (offset + i) % this.proximity.size;
                var other = this.proximity.get(pos);

                if (other.interactable(this.team) && other.block.hasLiquids && this.source != null && other.liquids.get(this.source) > 0) {
                    dumpingTo = other;
                    if (this.liquids.total() < this.block.liquidCapacity) {
                        var amount = Math.min(speed, other.liquids.get(this.source));
                        this.liquids.add(this.source, amount);
                        other.liquids.remove(this.source, amount);
                    }
                }
            }
            if (this.proximity.size > 0) {
                offset++;
                offset %= this.proximity.size;
            }
            this.dumpLiquid(this.liquids.current());
        },
        canDumpLiquid(to, liquid) {
            return to != dumpingTo;
        },
        draw() {
            Draw.rect(Core.atlas.find("creator-yeti"), this.x, this.y);
            if (this.source == null) {
                Draw.rect("cross", this.x, this.y);
            } else {
                Draw.color(this.source.color);
                Draw.rect(Core.atlas.find("creator-yeti-centre"), this.x, this.y);
                Draw.color();
            }
        },
    }, yeti);
});
yeti.health = 70;
yeti.liquidCapacity = 10;
yeti.requirements = ItemStack.with(
    Items.metaglass, 10,
    guijingti, 20,
    Items.titanium, 15,
    Items.surgeAlloy, 10
);
yeti.buildVisibility = BuildVisibility.shown;
yeti.category = Category.effect;
lib.addToResearch(yeti, { parent: Blocks.unloader.name, });
