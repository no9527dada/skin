//这个啥都有
const lib = require("lib");
const pao2 = require("zongjipao2");
const pao = require("zongjipao");
const DC = require("paota/DC");
const GThree = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(GThree, 6));
        this.super$load();
    }
}, "GradeThree", Planets.sun, 1);
const sS = require("sectorSize");
sS.planetGrid(GThree, 4);
GThree.generator = new SerpuloPlanetGenerator();
//GThree.generator = TwinGenerator3;
GThree.atmosphereColor = Color.valueOf("9F35FF");
GThree.atmosphereRadIn = 0.05;
GThree.atmosphereRadOut = 0.2;
GThree.localizedName = Core.bundle.format("planet.creator.GThree");
GThree.startSector = 1;
GThree.orbitRadius = 40;
GThree.alwaysUnlocked = true;
lib.addToResearch(GThree, { parent: SectorPresets.planetaryTerminal.name, });

const SY1 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(SY1, 6));
        this.super$load();
    }
}, "satellite", GThree,  0.5);
sS.planetGrid(SY1, 0);
SY1.generator = new SerpuloPlanetGenerator();
SY1.atmosphereColor = Color.valueOf("ffa1a1");
SY1.atmosphereRadIn = 0.02;
SY1.atmosphereRadOut = 0.1;
//SY1.localizedName = Core.bundle.format("planet.creator.SY1");
SY1.startSector = 1;
SY1.orbitRadius = 5.5;
SY1.accessible = false
SY1.bloom = true;//花

const SY2 = new JavaAdapter(Planet, {
    load() {
        this.meshLoader = prov(() => new HexMesh(SY2, 6));
        this.super$load();
    }
}, "satellite2", GThree,  0.2);
sS.planetGrid(SY2, 0);
SY2.generator = new SerpuloPlanetGenerator();
SY2.atmosphereColor = Color.valueOf("645bff");
SY2.atmosphereRadIn = 0.01;
SY2.atmosphereRadOut = 0.1;
//SY2.localizedName = Core.bundle.format("planet.creator.SY2");
SY2.startSector = 1;
SY2.orbitRadius = 3;
SY2.accessible = false

const GTw = require("GradeTwo");
const GN = require("GradeNoe");

const GThMaps1 = new SectorPreset("congyu", GThree, 1);
GThMaps1.captureWave = 200;
GThMaps1.difficulty = 8;
GThMaps1.localizedName = Core.bundle.format("planet.creator.congyu");//葱域
exports.GThMaps1 = GThMaps1;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps1, {
        parent: GThree.name,
        objectives: Seq.with(
            new Objectives.SectorComplete(GTw.GTwoMaps15),//海岸线
            new Objectives.SectorComplete(GN.GNoeMaps1),//降临
            new Objectives.Research(DC.ZhengYi)
        )
    });
})); 

const GThMaps2 = new SectorPreset("chiseyaosai", GThree, 2);
GThMaps2.captureWave = 150;
GThMaps2.difficulty = 8;
GThMaps2.localizedName = Core.bundle.format("planet.creator.chiseyaosai");//绿色要塞
exports.GThMaps2 = GThMaps2;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps2, {
        parent: 'congyu',//葱域
        objectives: Seq.with(
            new Objectives.SectorComplete(GThMaps1),//葱域
            new Objectives.Research(DC.ronghui3)
        )
    });
})); 

const GThMaps3 = new SectorPreset("mohezhen", GThree, 3);
GThMaps3.captureWave = 501;
GThMaps3.difficulty = 13;
GThMaps3.useAI = false
GThMaps3.localizedName = Core.bundle.format("planet.creator.mohezhen");//魔核阵
exports.GThMaps3 = GThMaps3;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps3, {
        parent: 'congyu',//葱域
        objectives: Seq.with(
            new Objectives.SectorComplete(GThMaps1)//葱域
            ,new Objectives.Research(DC.ZhengFu)
        )
    });
})); 

const GThMaps4 = new SectorPreset("ruqin", GThree, 4);
GThMaps4.difficulty = 13;
GThMaps4.localizedName = Core.bundle.format("planet.creator.ruqin");//入侵
exports.GThMaps4 = GThMaps4;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps4, {
        parent: 'chiseyaosai',//绿色要塞
        objectives: Seq.with(
            new Objectives.SectorComplete(GThMaps2)//绿色要塞
            ,new Objectives.Research(pao.xipao1)
        )
    });
})); 

const GThMaps5 = new SectorPreset("Genesis", GThree, 5);
GThMaps5.captureWave = 720;
GThMaps5.difficulty = 13;
GThMaps5.localizedName = Core.bundle.format("planet.creator.Genesis");//创世纪
exports.GThMaps5 = GThMaps5;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps5, {
        parent: 'ruqin',//入侵
        objectives: Seq.with(
            new Objectives.SectorComplete(GThMaps4),//入侵
            new Objectives.Research(pao2.xipao2)
        )
    });
})); 
const GThMaps7 = new SectorPreset("chuangshiji", GThree, 7);
GThMaps7.captureWave = 720;
GThMaps7.difficulty = 13;
GThMaps7.localizedName = Core.bundle.format("planet.creator.chuangshiji");//创世纪2
exports.GThMaps7 = GThMaps7;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps7, {
        parent: 'ruqin',//入侵
        objectives: Seq.with(
            new Objectives.SectorComplete(GThMaps4),//入侵
            new Objectives.Research(pao2.xipao2)
        )
    });
})); 

const GThMaps6 = new SectorPreset("huangwu", GThree, 6);
GThMaps6.captureWave = 70;
GThMaps6.difficulty = 13;
GThMaps6.localizedName = Core.bundle.format("planet.creator.huangwu");//荒芜裂谷
exports.GThMaps6 = GThMaps6;
Events.on(ContentInitEvent, cons(e => {
    lib.addToResearch(GThMaps6, {
        parent: 'chuangshiji',//创世纪
        objectives: Seq.with(
            new Objectives.Research(GThMaps5)//研究创世纪//只需研究就可解锁 不用占领
        )
    });
})); 
