const lib = require("lib");
const GC = require("GC");

//onst sectorSize = 2.3;
//这个是有钛
const GNoe = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(GNoe, 6));
        this.super$load();
    }
}, "GradeNoe", Planets.sun, 1);
const sS = require("sectorSize");
sS.planetGrid(GNoe, 2.3);
GNoe.generator = new SerpuloPlanetGenerator();
GNoe.atmosphereColor = Color.valueOf("4fc1ff");
GNoe.atmosphereRadIn = 0.02;//
GNoe.atmosphereRadOut = 0.1;//
GNoe.localizedName = Core.bundle.format("planet.creator.GNoe");
GNoe.visible = true;//可见
GNoe.bloom = false;
GNoe.accessible = true;//可进入
GNoe.startSector = 1;
GNoe.orbitRadius = 15;
GNoe.alwaysUnlocked = true;

lib.addToResearch(GNoe, { parent: SectorPresets.planetaryTerminal.name, });


//难度：1：低 3：中  6：高  8：极高  13：扫荡
const GNoeMaps1 = new SectorPreset("GNoeyiluo1", GNoe, 1);
GNoeMaps1.captureWave = 90;
GNoeMaps1.difficulty = 1;
GNoeMaps1.localizedName = Core.bundle.format("planet.creator.jl");//降临
lib.addToResearch(GNoeMaps1, { parent: GNoe.name, });
exports.GNoeMaps1 = GNoeMaps1;

const GNoeMaps2 = new SectorPreset("jianglin2", GNoe, 2);
GNoeMaps2.captureWave = 90;
GNoeMaps2.difficulty = 1;
GNoeMaps2.localizedName = Core.bundle.format("planet.creator.jl2");//降临2
exports.GNoeMaps2 = GNoeMaps2;
lib.addToResearch(GNoeMaps2, { parent: GNoe.name, });
exports.GNoeMaps2 = GNoeMaps2;

const GNoeMaps23 = new SectorPreset("GNoeYX23", GNoe, 23);
GNoeMaps23.captureWave = 63;
GNoeMaps23.difficulty = 1;
GNoeMaps23.localizedName = Core.bundle.format("planet.creator.yx");//遇袭
exports.GNoeMaps23 = GNoeMaps23;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps23, {
        parent: 'GNoeyiluo1',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps1),
            //new Objectives.Research(DC.DianHu)
        )
    });
}));


const GNoeMaps4 = new SectorPreset("xiwang2", GNoe, 4);
GNoeMaps4.captureWave = 71;
GNoeMaps4.difficulty = 1;
GNoeMaps4.localizedName = Core.bundle.format("planet.creator.xw2");//希望2
exports.GNoeMaps4 = GNoeMaps4;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps4, {
        parent: 'jianglin2',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps2),
            //new Objectives.Research(DC.DianHu)
        )
    });
}));




// const GNoeMaps9527 = new SectorPreset("9527", GNoe, 150);
// GNoeMaps9527.captureWave = 63;
// GNoeMaps9527.alwaysUnlocked = true;//降临
// GNoeMaps9527.difficulty = 1;
// GNoeMaps9527.localizedName = "9527";//9527
// exports.GNoeMaps9527 = GNoeMaps9527;
// Events.on(ContentInitEvent, cons(e => {
//     lib.addToResearch(GNoeMaps9527, {
//         parent: 'GNoeyiluo1',
//         objectives: Seq.with(
//             new Objectives.SectorComplete(GNoeMaps1),
//             //new Objectives.Research(DC.DianHu)
//         )
//     });
// }));

const GNoeMaps15 = new SectorPreset("GNoexiwang15", GNoe, 15);
GNoeMaps15.captureWave = 71;
GNoeMaps15.difficulty = 1;
GNoeMaps15.localizedName = Core.bundle.format("planet.creator.xw");//希望
exports.GNoeMaps15 = GNoeMaps15;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps15, {
        parent: 'GNoeYX23',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps23),//占领遇袭
            new Objectives.Research(GC.guijingtichengxingji)
        )
    });
}));
const { shimoxiji } = require('shimoxi');
const GNoeMaps0 = new SectorPreset("GNoebingyuan0", GNoe, 0);
GNoeMaps0.captureWave = 50;
GNoeMaps0.difficulty = 1;
GNoeMaps0.localizedName = Core.bundle.format("planet.creator.by");//冰原
exports.GNoeMaps0 = GNoeMaps0;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps0, {
        parent: 'GNoexiwang15',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps4),//占领希望2
            new Objectives.Research(shimoxiji)
        )
    });
}));

const GNoeMaps16 = new SectorPreset("GNoeMZ16", GNoe, 16);
GNoeMaps16.captureWave = 55;
GNoeMaps16.difficulty = 3;
GNoeMaps16.localizedName = Core.bundle.format("planet.creator.jliu");//激流
exports.GNoeMaps16 = GNoeMaps16;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps16, {
        parent: 'GNoexiwang15',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps15),//占领希望
            new Objectives.Research(GC.dianxiangan)
        )
    });
}));

const GNoeMaps6 = new SectorPreset("GNoecenxiao6", GNoe, 6);
GNoeMaps6.captureWave = 110;
GNoeMaps6.difficulty = 3;
GNoeMaps6.localizedName = Core.bundle.format("planet.creator.cx");//尘潇
exports.GNoeMaps6 = GNoeMaps6;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps6, {
        parent: 'GNoexiwang15',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps0),//占领冰原
            new Objectives.Research(GC.tanbanyasuoji)
        )
    });
}));

const GNoeMaps24 = new SectorPreset("GNoeGB124", GNoe, 24);
GNoeMaps24.captureWave = 71;
GNoeMaps24.difficulty = 1;
GNoeMaps24.localizedName = Core.bundle.format("planet.creator.pj1");//贫瘠I
exports.GNoeMaps24 = GNoeMaps24;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps24, {
        parent: 'GNoeYX23',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps23),//占领遇袭
            new Objectives.SectorComplete(GNoeMaps15),//占领希望
            new Objectives.Research(GC.feiliaoji)
        )
    });
}));

const GNoeMaps10 = new SectorPreset("GNoeGB210", GNoe, 10);
GNoeMaps10.captureWave = 71;
GNoeMaps10.difficulty = 1;
GNoeMaps10.localizedName = Core.bundle.format("planet.creator.pj2");//贫瘠II
exports.GNoeMaps10 = GNoeMaps10;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps10, {
        parent: 'GNoeYX23',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps24),//占领贫瘠I
            new Objectives.SectorComplete(GNoeMaps15),//占领希望
            new Objectives.SectorComplete(GNoeMaps23)//占领遇袭
        )
    });
}));
const GNoeMaps20 = new SectorPreset("GNoeGB320", GNoe, 20);
GNoeMaps20.captureWave = 81;
GNoeMaps20.difficulty = 3;
GNoeMaps20.localizedName = Core.bundle.format("planet.creator.pj3");//贫瘠III
exports.GNoeMaps20 = GNoeMaps20;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps20, {
        parent: 'GNoeYX23',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps10)//占领贫瘠II
        )
    });
}));
const GNoeMaps3 = new SectorPreset("GNoeGB43", GNoe, 3);
GNoeMaps3.captureWave = 85;
GNoeMaps3.difficulty = 3;
GNoeMaps3.localizedName = Core.bundle.format("planet.creator.pj4");//贫瘠IV
exports.GNoeMaps3 = GNoeMaps3;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps3, {
        parent: 'GNoeYX23',
        objectives: Seq.with(
            new Objectives.Research(GNoeMaps20)//占领贫瘠III
        )
    });
}));
const GNoeMaps19 = new SectorPreset("GNoeAR19", GNoe, 19);
GNoeMaps19.captureWave = 71;
GNoeMaps19.difficulty = 8;
GNoeMaps19.localizedName = Core.bundle.format("planet.creator.mg");//迷宫
exports.GNoeMaps19 = GNoeMaps19;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps19, {
        parent: 'GNoeGB43',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps3)//占领贫瘠IV
        )
    });
}));
const GNoeMaps17 = new SectorPreset("GNoeGJ0117", GNoe, 17);
GNoeMaps17.useAI = false
GNoeMaps17.difficulty = 3;
GNoeMaps17.localizedName = Core.bundle.format("planet.creator.xlxf");//狭路相逢
exports.GNoeMaps17 = GNoeMaps17;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps17, {
        parent: 'GNoeYX23',
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps23)//占领遇袭
        )
    });
}));
const GNoeMaps5 = new SectorPreset("GNoeBF5", GNoe, 5);
GNoeMaps5.useAI = true
GNoeMaps5.difficulty = 8;
GNoeMaps5.localizedName = Core.bundle.format("planet.creator.bf");//迸发
exports.GNoeMaps5 = GNoeMaps5;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps5, {
        parent: 'GNoeGJ0117',//狭路相逢
        objectives: Seq.with(
            new Objectives.SectorComplete(GNoeMaps0)//冰原
        )
    });
}));

//锁定区域：
const GT = require("GradeTwo");
const GNoeMaps31 = new SectorPreset("GNoeMB31", GNoe, 100);
GNoeMaps31.useAI = false
GNoeMaps31.difficulty = 8;
GNoeMaps31.localizedName = Core.bundle.format("planet.creator.mb");//蒙蔽
exports.GNoeMaps31 = GNoeMaps31;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GNoeMaps31, {
        parent: 'GNoeyiluo1',
        objectives: Seq.with(
            new Objectives.SectorComplete(GT.GTwoMaps56),
            new Objectives.SectorComplete(GT.GTwoMaps11),
            new Objectives.SectorComplete(GT.GTwoMaps224),
        )
    });
}));
