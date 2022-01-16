const GC = require('GC');
const items = require('wupin');
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
const rangee = 56;//明亮范围
const brightness = 0.9;//亮度
const itemG = Items.copper;//物品
// const itemG = [
//     Items.surgeAlloy, 
//     Items.copper,
//     // xi, 
//     // jin, 
//     // weijing2,
// ]; 
GC.conveyor3.buildType = prov(() => {
    var ts = 1;
    var td = 0;
    return new JavaAdapter(Conveyor.ConveyorBuild, {
        delta(){
            return Time.delta * ts;
        },
        applyBoost(intensity, duration){
            if(intensity >= ts){
                td = Math.max(td, duration);
            }
            ts = Math.max(ts, intensity);
        },
        updateTile(){
            if(td > 0){
                td -= Time.delta;
                if(td <= 0){
                    ts = 1;
                }
            }
            this.timeScale = Math.max(ts * this.power.status, 0.001);
            this.timeScaleDuration = td / Math.max(this.power.status, 0.001);
            if(this.power.status >= 0.001){
                this.super$updateTile();
            }
        },
        drawLight(){
            if(this.items.get(itemG)){
                Drawf.light(this.team, this.x, this.y, rangee, Tmp.c1.set(itemG.color), brightness);
            }
        },
    }, GC.conveyor3);
});



























/*
*@author <guiY>
*/

// const range = 56;//明亮范围
// const brightness = 0.9;//亮度
// const item = Items.copper;//物品

// const CC = extendContent(Conveyor, "3-conveyor", {});
// CC.buildType = prov(() => {
//     var ts = 1;
//     var td = 0;
//     return new JavaAdapter(Conveyor.ConveyorBuild, {
//         delta(){
//             return Time.delta * ts;
//         },
//         applyBoost(intensity, duration){
//             if(intensity >= ts){
//                 td = Math.max(td, duration);
//             }
//             ts = Math.max(ts, intensity);
//         },
//         updateTile(){
//             if(td > 0){
//                 td -= Time.delta;
//                 if(td <= 0){
//                     ts = 1;
//                 }
//             }
//             this.timeScale = Math.max(ts * this.power.status, 0.001);
//             this.timeScaleDuration = td / Math.max(this.power.status, 0.001);
//             if(this.power.status >= 0.001){
//                 this.super$updateTile();
//             }
//         },
//         drawLight(){
//             if(this.items.get(item)){
//                 Drawf.light(this.team, this.x, this.y, range, Tmp.c1.set(item.color), brightness);
//             }
//         },
//     }, CC);
// });
// CC.hasPower = true;
// CC.displayedSpeed = 22;
// CC.consumes.power(0.1);
// CC.health = 120;
// CC.speed = 0.16;
// CC.displayedSpeed = 22;
// CC.consumesPower = true;
// CC.outputsPower = true;