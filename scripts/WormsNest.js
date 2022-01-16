const lib = require("lib");
const SUN2 = new JavaAdapter(Planet, {},
    "Betelgeuse", Planets.sun, 8);//参宿四 恒星
SUN2.bloom = true;
SUN2.accessible = false
SUN2.visible = true;
SUN2.localizedName = "[blue]Betelgeuse"
SUN2.orbitRadius = 120;
SUN2.meshLoader = () => new SunMesh(SUN2, 5, 6, 3.4, 2.8, 1.3, 0.8, 1.1,
    Color.valueOf("8FFBFFFF"),
    Color.valueOf("5AAAFF"),
    Color.valueOf("4CA3FF"),
    Color.valueOf("488CD6"),
    Color.valueOf("90C6FF"),
    Color.valueOf("B2D7FF")
);
lib.addToResearch(SUN2, { parent: SectorPresets.planetaryTerminal.name, });
//---------------------------------------------------------------
const GT = require("GradeThree");


const WormsNest = new JavaAdapter(Planet, {  //虫族------------
    load() {
        this.meshLoader = prov(() => new HexMesh(WormsNest, 6));
        this.super$load();
    }
}, "WormsNest", SUN2,  1);
const sS = require("sectorSize");
sS.planetGrid(SUN2, 3);
WormsNest.generator = new SerpuloPlanetGenerator();
//WormsNest.generator = TwinGenerator4;
WormsNest.atmosphereColor = Color.valueOf("006000");
WormsNest.atmosphereRadIn = 0.05;//
WormsNest.atmosphereRadOut = 0.1;//
WormsNest.localizedName = Core.bundle.format("planet.creator.WormsNest");;
WormsNest.visible = true;//可见
//WormsNest.bloom = false;//花
WormsNest.accessible = true;//易接近的；可进入的
WormsNest.rotateTime = 24 * 5;//地球旋转速度
WormsNest.startSector = 5;//
WormsNest.orbitRadius = 30;//轨道半径
WormsNest.alwaysUnlocked = false;
lib.addToResearch(WormsNest, { parent: SUN2.name, });

/* const diyi = new SectorPreset("虫族", WormsNest, 1);
diyi.alwaysUnlocked = true;//默认解锁
diyi.captureWave = 5;
diyi.difficulty = 1;//危险等级
diyi.localizedName = "开始"//Core.bundle.format("planet.creator.KJPS");//遗落
exports.diyi = diyi;

 */
//---------------------------------------------------------------------
const SSY1 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(SSY1, 6));
        this.super$load();
    }
}, "ssatellite1", SUN2,  1);
sS.planetGrid(SSY1, 1);
SSY1.generator = new SerpuloPlanetGenerator();
//SSY1.generator = TwinGenerator4;
SSY1.atmosphereColor = Color.valueOf("414cff");
SSY1.atmosphereRadIn = 0.05;
SSY1.atmosphereRadOut = 0.1;
SSY1.localizedName = Core.bundle.format("planet.creator.SSY1");
SSY1.startSector = 30;
SSY1.orbitRadius = 38;
SSY1.accessible = true;
SSY1.alwaysUnlocked = true;
lib.addToResearch(SSY1, { parent: WormsNest.name, });


const SSY1Maps2 = new SectorPreset("QYMdian", SSY1, 2);
SSY1Maps2.alwaysUnlocked = false;
SSY1Maps2.useAI = false;
SSY1Maps2.captureWave = 60;
SSY1Maps2.difficulty = 13;
SSY1Maps2.localizedName = Core.bundle.format("planet.creator.QYM2");//缺一门之电    QYMdian
exports.SSY1Maps2 = SSY1Maps2;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(SSY1Maps2, {
        parent: SSY1.name,
        objectives: Seq.with(
            new Objectives.Research(GT.GThMaps3)//研究魔核阵
        )
    });
})); 


const SSY1Maps3 = new SectorPreset("QYMshui", SSY1, 3);
SSY1Maps3.alwaysUnlocked = false;
SSY1Maps3.useAI = false;
SSY1Maps3.difficulty = 13;
SSY1Maps3.localizedName = Core.bundle.format("planet.creator.QYM3");//缺一门之水    QYMdian
exports.SSY1Maps3 = SSY1Maps3;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(SSY1Maps3, {
        parent: SSY1Maps2.name,
        objectives: Seq.with(
            new Objectives.Research(SSY1Maps2)//研究
        )
    });
})); 

const SSY1Maps1 = new SectorPreset("QueYiMen1", SSY1, 1);
SSY1Maps1.alwaysUnlocked = false;
SSY1Maps1.useAI = false;
SSY1Maps1.difficulty = 13;
SSY1Maps1.localizedName = Core.bundle.format("planet.creator.QYM1");//缺一门之传送带    QYMdian
exports.SSY1Maps1 = SSY1Maps1;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(SSY1Maps1, {
        parent: SSY1Maps3.name,
        objectives: Seq.with(
            new Objectives.Research(SSY1Maps3)//研究
        )
    });
})); 
const DC = require("paota/DC");
const SSY1Maps4 = new SectorPreset("mini-1", SSY1, 4);
SSY1Maps4.alwaysUnlocked = false;
SSY1Maps4.useAI = false;
SSY1Maps4.difficulty = 13;
SSY1Maps4.localizedName = Core.bundle.format("planet.creator.MN1");//迷你攻击 
exports.SSY1Maps4 = SSY1Maps4;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(SSY1Maps4, {
        parent: SSY1.name,
        objectives: Seq.with(
            new Objectives.Research(GT.GThMaps3),//研究魔核阵
            new Objectives.Research(DC.tiansha)//研究天煞
        )
    });
})); 

const SSY1Maps5 = new SectorPreset("JXTZ", SSY1, 5);
SSY1Maps5.alwaysUnlocked = false;
SSY1Maps5.useAI = false;
SSY1Maps5.captureWave = 2147483647;
SSY1Maps5.difficulty = 1;
SSY1Maps5.localizedName = Core.bundle.format("planet.creator.JXTZ");//极限挑战
exports.SSY1Maps5 = SSY1Maps5;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(SSY1Maps5, {
        parent: SSY1Maps4.name,
        objectives: Seq.with(
            new Objectives.Research(SSY1Maps1)//研究
        )
    });
})); 

//----------------------------------------------------------------
//----------------------------------------------------------------
const SSY2 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(SSY2, 6));
        this.super$load();
    }
}, "ssatellite2", SUN2,  1);
sS.planetGrid(SSY2, 1);
SSY2.generator = new SerpuloPlanetGenerator();
SSY2.atmosphereColor = Color.valueOf("dd5bff");
SSY2.atmosphereRadIn = 0.05;
SSY2.atmosphereRadOut = 0.1;
SSY2.localizedName = Core.bundle.format("planet.creator.SSY2");
SSY2.startSector = 90;
SSY2.orbitRadius = 38;
SSY2.accessible = true;
SSY2.alwaysUnlocked = true;
lib.addToResearch(SSY2, { parent: WormsNest.name, });

const GN = require("GradeNoe");
const SSY2Maps1 = new SectorPreset("Genesis-Warfare", SSY2, 1);
SSY2Maps1.alwaysUnlocked = false;
SSY2Maps1.captureWave = 999999999;
SSY2Maps1.difficulty = 13;
SSY2Maps1.localizedName = Core.bundle.format("planet.creator.CZHJ");//创战纪
exports.SSY2Maps1 = SSY2Maps1;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(SSY2Maps1, {
        parent: SSY2.name,
        objectives: Seq.with(
            new Objectives.SectorComplete(GN.GNoeMaps31)
        )
    });
})); 



// const SSY3 = new JavaAdapter(Planet, {
//     load() {
//         this.meshLoader = prov(() => new HexMesh(SSY3, 6));
//         this.super$load();
//     }
// }, "ssatellite3", SSY1, 0.3);
// sS.planetGrid(SSY1, 0);
// SSY3.generator = new SerpuloPlanetGenerator();
// SSY3.atmosphereColor = Color.valueOf("ffa1a1");
// SSY3.atmosphereRadIn = 0.02;
// SSY3.atmosphereRadOut = 0.1;
// //SSY3.localizedName = Core.bundle.format("planet.creator.SSY3");
// SSY3.startSector = 1;
// SSY3.orbitRadius = 5;
// SSY3.accessible = true
// //----------------------------------------------------------------------------------------------------------------------------------------------

