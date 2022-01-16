/* const ax1 = new UnitType('1kuangji');
    ax1.defaultController = prov(() => new MinerAI());
    ax1.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));
   "commandLimit": 8, //指挥命令限制数量
*/

/*  
    private Prov<Unit> unitType(JsonValue value){
        if(value == null) return UnitEntity::create;
        return switch(value.asString()){
            case "flying" -> UnitEntity::create;
            case "mech" -> MechUnit::create;
            case "legs" -> LegsUnit::create;
            case "naval" -> UnitWaterMove::create;
            case "payload" -> PayloadUnit::create;

    以上可能在JS中会用得到。
    json看下面
    
    单位Type：
    飞行单位：UnitEntity
    该单位可以飞行使用飞行AI
    陆地单位：MechUnit
    该单位无需介绍
    蜘蛛单位：LegsUnit
    该单位拥有蜘蛛的属性
    海军单位：UnitWaterMove
    海上行驶
    辅助单位：PayloadUnit
    该单位与其他单位不同，其他单位type不可以建造方块
    该单位可以建造方块 
*/
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
} = require('wupin');
// var JSX = new UnitType( 'jisu1');
// JSX.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));

const BGC = extend(UnitFactory, 'bing-gong-chang', {
    isPlaceable() { return lib.techDsAvailable() && this.super$isPlaceable(); },//非沙盒禁止建造
})//兵工厂
//BGC.buildVisibility = buildVisibility.sandboxOnly
BGC.canOverdrive = false;
BGC.size = 3;
BGC.constructTime = 180;
// BGC.plans = Seq.with(
//     new UnitFactory.UnitPlan(UnitTypes.dagger, 60 * 3, ItemStack.with(Items.copper, 1)),
//     new UnitFactory.UnitPlan(UnitTypes.JSX, 60 * 3, ItemStack.with(Items.copper, 1))

// );
//------------------------------------------------------------------------------------------------------------------------------
const ability1 = require('all/ability');
const ability2 = require('all/ability-oct2');
UnitTypes.gamma.abilities.add(new RepairFieldAbility(5, 60 * 3, 1));//原版3级飞机
UnitTypes.oct.abilities.add(new UnitSpawnAbility(UnitTypes.poly, 3600, 19.25, -31.75), new UnitSpawnAbility(UnitTypes.flare, 60, -19.25, -31.75));//t5护盾飞机
//UnitTypes.oct.abilities.add(ForceFieldAbility(280, 4, 7000, 60 * 8), new RepairFieldAbility(280, 60 * 2, 140));//t5护盾飞机
const ability = require("other/abilityy");

const zdan = BasicBulletType(8, 12)
// zdan.collidesTiles = true
// zdan.collides = true;
// zdan.collidesAir = true;
zdan.width = 6.5;
zdan.height = 11;
zdan.lifetime = 50;
zdan.scaleVelocity = false;//指哪打哪
zdan.frontColor = Color.valueOf("d6ffd1");
zdan.lightning = 3;//闪电根数
zdan.lightningLength = 5;//闪电长度
zdan.lightningColor = Color.valueOf("4ae636");//闪电颜色
zdan.lightningDamage = 5;//闪电伤害
zdan.shootEffect = Fx.shootSmall;
zdan.smokeEffect = Fx.shootSmallSmoke;
zdan.buildingDamageMultiplier = 0.01;
//zdan.healPercent = 3;//治愈建筑百分比
zdan.homingPower = 0.04;//追踪能力值
exports.zdan = zdan;
//------------------------
const gammaSplus = new UnitType('gammaSplus');
gammaSplus.defaultController = prov(() => new BuilderAI());
gammaSplus.isCounted = false;
gammaSplus.flying = true;
gammaSplus.mineSpeed = 8.5;
gammaSplus.mineTier = 3;
gammaSplus.buildSpeed = 3;
gammaSplus.drag = 0.05;
gammaSplus.speed = 6;
gammaSplus.rotateSpeed = 19;
gammaSplus.accel = 0.11;
gammaSplus.itemCapacity = 90;
gammaSplus.health = 260;
gammaSplus.engineOffset = 6;
gammaSplus.hitSize = 20;
gammaSplus.commandLimit = 8;
gammaSplus.abilities.add(ability1.ColourfulForceFieldAbility2(40, 3, 700, 600));//彩色护盾
gammaSplus.abilities.add(new RepairFieldAbility(5, 60 * 3, 1));//自身回血
gammaSplus.weapons.add(
    (() => {
        const w = new Weapon("feiji666-weapon");
        w.top = false;
        w.reload = 15;
        w.x = 1;
        w.y = 2;
        w.shots = 2;
        w.spacing = 2;
        w.inaccuracy = 3;
        w.shotDelay = 3;
        w.ejectEffect = Fx.casing1;
        w.bullet = zdan
        return w;
    })()
);
gammaSplus.constructor = prov(() => extend(UnitTypes.gamma.constructor.get().class, {}));
exports.gammaSplus = gammaSplus;
// ); 
//     bullet = new BasicBulletType(3.5f, 11){{
//         width = 6.5;
//         height = 11;
//         lifetime = 70;
//         shootEffect = Fx.shootSmall;
//         smokeEffect = Fx.shootSmallSmoke;
//         buildingDamageMultiplier = 0.01;
//         homingPower = 0.04;
//     }};
// }});











const ax1 = new UnitType('1kuangji');
ax1.speed = 1.6;
ax1.drag = 0.01;
ax1.hitSize = 10;

ax1.health = 240;
ax1.itemCapacity = 25;
ax1.range = 50;
ax1.flying = true;
ax1.isCounted = false;
ax1.mineTier = 1;
ax1.mineSpeed = 1.6;
ax1.armor = 10;
ax1.defaultController = prov(() => new MinerAI()); ax1.ammoType = new ItemAmmoType(Items.blastCompound, 1);
ax1.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));
lib.addToResearch(ax1, { parent: Blocks.airFactory.name, });
//-----------------------------------------------------------------------------------------
const ax2 = new UnitType('2kuangji');
ax2.defaultController = prov(() => new MinerAI()); ax2.ammoType = new ItemAmmoType(Items.blastCompound, 1);
ax2.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));

const ax3 = new UnitType('3kuangji');
ax3.abilities.add(new RepairFieldAbility(Infinity, 60, 8 * 8));
ax3.defaultController = prov(() => new MinerAI()); ax3.ammoType = new ItemAmmoType(Items.blastCompound, 2);
ax3.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));

const ax4 = new UnitType('4kuangji');
ax4.abilities.add(new ForceFieldAbility(40, 110, 60 * 1, 160));//(40半径, 60重新生成, 500盾容, 60 * 6冷却)20f, 40f, 60f * 5, 60f//Infinity 无穷大
ax4.defaultController = prov(() => new MinerAI()); ax4.ammoType = new ItemAmmoType(Items.blastCompound, 2);
ax4.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));

const ax5 = new UnitType('5kuangji');
ax5.payloadCapacity = (4.5 * 4.5) * Vars.tilePayload;
ax5.defaultController = prov(() => new MinerAI()); ax5.ammoType = new PowerAmmoType(18000);
ax5.constructor = prov(() => extend(UnitTypes.oct.constructor.get().class, {}));



const ax6 = new UnitType('6kuangji');
ax6.payloadCapacity = (5.8 * 5.8) * Vars.tilePayload;
ax6.ammoType = new PowerAmmoType(9000);
ax6.defaultController = prov(() => new MinerAI());
lib.addToResearch(ax6, {
    parent: 'toxopid',
    requirements: ItemStack.with(
        monengjing1, 4000,
        jin, 120000,
        weijing2, 7000,
        weijing3, 200,
        Items.thorium, 50000,
        guijingti, 180000,
    ),
});
ax6.constructor = prov(() => extend(UnitTypes.oct.constructor.get().class, {}));

const yunshu = new UnitType('yunshu');
yunshu.defaultController = prov(() => new MinerAI());
yunshu.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));
//---------------------------------------------------------------
const SB = extend(BombBulletType, {});
SB.amage = 0;
SB.speed = 0;
SB.hitEffect = Fx.pulverize;
SB.lifetime = 10;
SB.speed = 10;
SB.splashDamageRadius = 60;
SB.instantDisappear = true;
SB.splashDamage = 130;
SB.killShooter = true;
SB.hittable = false;
SB.collidesAir = true;
SB.status = StatusEffects.burning;


const SC = extend(BasicBulletType, {});
SC.amage = 20;
SC.speed = 3;
SC.width = 7;
SC.height = 9;
SC.lifetime = 45;
SC.shootEffect = Fx.shootSmall;
SC.smokeEffect = Fx.shootSmallSmoke;
SC.ammoMultiplier = 2;
//SC.status = StatusEffects.blasted;
//SC.statusDuration = 60;

const zisha = new UnitType('zisha');//自杀小队
zisha.constructor = prov(() => extend(UnitTypes.eclipse.constructor.get().class, {}));

zisha.speed = 3;
zisha.accel = 0.08;
zisha.drag = 0.01;
zisha.flying = true;
zisha.health = 520;
zisha.engineOffset = 5.5;
zisha.range = 140;
zisha.targetAir = false;
zisha.commandLimit = 4;
zisha.circleTarget = true;
zisha.hitSize = 13;
zisha.armor = 5;

zisha.ammoType = new ItemAmmoType(Items.coal);

zisha.weapons.add(
    (() => {
        const w = new Weapon("");
        w.reload = 60;
        w.shootCone = 180;
        w.ejectEffect = Fx.none;
        w.shootSound = Sounds.explosion;
        w.x = 0;
        w.shootY = 0;
        w.mirror = false;
        w.bullet = SB;
        return w;
    })()
);
// zisha.weapons.add(
//     (() => {
//         const w = new Weapon("");
//         w.reload = 45;
//         w.shootCone = 180;
//         w.ejectEffect = Fx.none;
//         w.shootSound = Sounds.explosion;
//         w.x = 0;
//         w.shootY = 0;
//         w.mirror = false;
//         w.bullet = SB
//         return w;
//     })()
// );


//zisha.defaultController = prov(() => new SuicideAI());

//---------------------------------------------------------------------------------------------
//灭火单位相关代码由<guiY>提供，感谢！！
const AI = require("all/unitAI");
const SD = lib.loadSound("shuidan");
const bubble = extend(LiquidBulletType, {});
bubble.liquid = Liquids.water;
bubble.status = StatusEffects.wet;
bubble.lightColor = Pal.sap;
bubble.lightOpacity = Pal.sap;
bubble.damage = 1;
bubble.knockback = 1.2;
bubble.puddleSize = 9;
bubble.orbSize = 5;
bubble.lifetime = 18;
bubble.speed = 3.5;
bubble.shootEffect = Fx.shootLiquid;

const fireDefense = new BombBulletType(5, 25);
fireDefense.hitSound = SD;
Object.assign(fireDefense, {
    backColor: Pal.sap,
    frontColor: Pal.sap,
    width: 16,
    height: 24,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    fragBullet: bubble,
    fragBullets: 30,
    collidesAir: true,
    status: StatusEffects.wet,
});

const moth = new UnitType("miehuo");
moth.constructor = prov(() => extend(UnitTypes.zenith.constructor.get().class, {}));
moth.defaultController = prov(() => AI.Firefighter9527(160, 310, Time.toSeconds * 3));
moth.weapons.add(
    (() => {
        const w = new Weapon("");
        w.x = 0;
        w.y = -1;
        w.shootY = 0;
        w.reload = 60;//装填
        w.rotate = true;
        w.bullet = fireDefense;
        w.shootSound = Sounds.sap;
        return w;
    })()
);
moth.armor = 2;
moth.flying = true;
moth.hitSize = 13;
moth.speed = 2;
moth.accel = 0.04;
moth.drag = 0.016;
moth.health = 1100;
moth.mineSpeed = 3;
moth.mineTier = 2;
moth.buildSpeed = 0.5;
moth.itemCapacity = 60;
moth.engineOffset = 7.3;
moth.engineSize = 3.4;
moth.rotateShooting = false;
moth.ammoType = new PowerAmmoType(500);
moth.commandLimit = 6;
exports.moth = moth;
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
/* const spark = extend(ShrapnelBulletType, {
    draw(b){
        var realLength = b.fdata;
        Draw.color(this.fromColor, b.team.color, b.fin());
        for(var i = 0; i < Math.floor(this.serrations * realLength / this.length); i++){
            Tmp.v1.trns(b.rotation(), i * this.serrationSpacing);
            var sl = Mathf.clamp(b.fout() - this.serrationFadeOffset) * (this.serrationSpaceOffset - i * this.serrationLenScl);
            Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, this.serrationWidth, sl, b.rotation() + 90);
            Drawf.tri(b.x + Tmp.v1.x, b.y + Tmp.v1.y, this.serrationWidth, sl, b.rotation() - 90);
        }
        Drawf.tri(b.x, b.y, this.width * b.fout(), (realLength + 50), b.rotation());
        Drawf.tri(b.x, b.y, this.width * b.fout(), 10, b.rotation() + 180);
        Draw.reset();
    }
});
spark.length = 140;
spark.damage = 150;
spark.width = 20;
spark.serrationLenScl = 7;
spark.serrationSpaceOffset = 60;
spark.serrationFadeOffset = 0;
spark.serrations = 10;
spark.serrationWidth = 6;
spark.shootEffect = Fx.sparkShoot;
spark.smokeEffect = Fx.sparkShoot; */

const oct2 = new UnitType('oct2');
oct2.defaultController = prov(() => new DefenderAI());
oct2.constructor = prov(() => extend(UnitTypes.oct.constructor.get().class, {}));

lib.addToResearch(oct2, {
    parent: UnitTypes.oct.name,
    requirements: ItemStack.with(
        monengjing1, 32000,
        jin, 250000,
        weijing2, 35000,
        weijing3, 900,
        Items.surgeAlloy, 350000,
        shimoxi, 250000,
    ),
    // objectives: Seq.with(
    //     new Objectives.SectorComplete(SectorPresets.nuclearComplex),
    //     new Objectives.SectorComplete(SectorPresets.overgrowth),
    // )
});
oct2.abilities.add(ability.TerritoryFieldAbility(150, 60 * 4, 200));
oct2.abilities.add(/* ability2.ColourfulForceFieldAbilityy */new ForceFieldAbility(280, 4, 15000, 60 * 5), new RepairFieldAbility(280, 60 * 2, 140));
oct2.abilities.add(new UnitSpawnAbility(UnitTypes.poly, 3600, 19.25, -31.75), new UnitSpawnAbility(UnitTypes.flare, 60, -19.25, -31.75));
oct2.rotateSpeed = 1;
oct2.armor = 16;
oct2.health = 58000;
oct2.speed = 0.6;
oct2.drag = 0.018;
oct2.engineOffset = 46;
oct2.engineSize = 9.8;
oct2.flying = true;
oct2.rotateShooting = false;
oct2.hitSize = 60;
oct2.payloadCapacity = (6 * 6) * Vars.tilePayload;
oct2.buildSpeed = 4;
oct2.drawShields = false;
oct2.commandLimit = 12;
oct2.lowAltitude = true;
oct2.buildBeamOffset = 43;
oct2.ammoCapacity = 1300;
//oct2.accel = 0.04;逐渐加速
oct2.itemCapacity = 300;
exports.oct2 = oct2;

//------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------
const death1 = lib.loadSound("death1");

const zhaoya = new UnitType('zhaoya');//爪牙
zhaoya.alwaysUnlocked = true;
zhaoya.speed = 0.56;
zhaoya.hitSize = 8;//
//zhaoya.breakSound = 方块破坏声音
zhaoya.deathSound = death1
zhaoya.health = 220;
zhaoya.itemCapacity = 0;
zhaoya.isCounted = false;
zhaoya.flying = false;
zhaoya.abilities.add(
    new UnitSpawnAbility(zhaoya, 1200, 1, -1),
);
zhaoya.constructor = prov(() => extend(UnitTypes.dagger.constructor.get().class, {}));
//--------------------------------------------------------------------
const Clem = new UnitType('Clem');//饥饿
Clem.alwaysUnlocked = true;
Clem.speed = 0.5;
Clem.hitSize = 8;//

Clem.health = 800;
Clem.itemCapacity = 0;
Clem.flying = false;
Clem.abilities.add(
    new UnitSpawnAbility(Clem, 1800, 1, -1),
    new UnitSpawnAbility(UnitTypes.flare, 480, 1, -1),
);
Clem.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {}));
//--------------------------------------------------------------------
const Rot = new UnitType('Rot');//腐败
Rot.alwaysUnlocked = true;
Rot.speed = 0.35;
Rot.hitSize = 32;//

Rot.health = 6000;
Rot.itemCapacity = 0;
Rot.flying = false;
Rot.abilities.add(
    new UnitSpawnAbility(Clem, 900, 1, -1),
    new UnitSpawnAbility(zhaoya, 600, 1, -1),
    new UnitSpawnAbility(UnitTypes.zenith, 720, 1, -1),
);
Rot.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {}));
//--------------------------------------------------------------------
/*
 const muchao1 = new UnitType("muchao1");//低级母巢
muchao1.immunities = ObjectSet.with(StatusEffects.burning, StatusEffects.melting);
muchao1.alwaysUnlocked = true;
muchao1.speed = 0.15;
muchao1.hitSize = 40;//5格

muchao1.health = 25000;
muchao1.itemCapacity = 0;
muchao1.flying = false;
muchao1.isCounted = false;
//muchao1.targetFlags =new ObjectSet.with(BlockFlag.launchPad, BlockFlag.storage, BlockFlag.battery);
//muchao1.targetFlags = BlockFlag.battery ;
muchao1.commandLimit = 30;
muchao1.abilities.add(
    new UnitSpawnAbility(UnitTypes.flare, 180, 19.25, -31.75),
    new UnitSpawnAbility(UnitTypes.flare, 180, -19.25, -31.75),
    new UnitSpawnAbility(UnitTypes.fortress, 30, -45, -30),
);
//muchao1.defaultController = prov(() => new MinerAI());
muchao1.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {}));
//--------------------------------------------------------------------

const muchao2 = new UnitType('muchao2');//中级母巢
muchao2.immunities = ObjectSet.with(StatusEffects.burning, StatusEffects.melting);
muchao2.alwaysUnlocked = true;
muchao2.commandLimit = 80;
muchao2.speed = 0.15;
muchao2.hitSize = 80;//10格

muchao2.health = 50000;
muchao2.itemCapacity = 0;
muchao2.flying = false;
muchao2.isCounted = false;
muchao2.abilities.add(
    new UnitSpawnAbility(UnitTypes.flare, 60, 19.25, -31.75),
    new UnitSpawnAbility(UnitTypes.flare, 60, -19.25, -31.75),
    new UnitSpawnAbility(UnitTypes.zenith, 360, 15, -15),
    new UnitSpawnAbility(UnitTypes.zenith, 600, -20, 20),
);
//muchao2.defaultController = prov(() => new MinerAI());
muchao2.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {}));
//--------------------------------------------------------------------

const muchao3 = new UnitType('muchao3');//高级母巢
muchao3.alwaysUnlocked = true;
muchao3.immunities = ObjectSet.with(StatusEffects.burning, StatusEffects.melting);
muchao3.speed = 0.15;
muchao3.commandLimit = 200;
muchao3.hitSize = 120;//15格

muchao3.health = 90000;
muchao3.itemCapacity = 0;
muchao3.flying = false;
muchao3.isCounted = false;
muchao3.abilities.add(
    new UnitSpawnAbility(UnitTypes.zenith, 120, 19.25, -31.75),
    new UnitSpawnAbility(UnitTypes.zenith, 120, -19.25, -31.75),
    new UnitSpawnAbility(UnitTypes.vela, 300, 15, -15),
    new UnitSpawnAbility(UnitTypes.eclipse, 1800, -20, 20),

);
//muchao3.defaultController = prov(() => new MinerAI());
muchao3.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {})); 
*/
//--------------------------------------------------------------------
const ZHUZAI0 = new UnitType('zhuzai-0');
//ZHUZAI0.abilities.add(ability.MendFieldAbility(180, 210, 10));方块修复场

ZHUZAI0.abilities.add(ability.pointDefenseAbility1(25, -8, 10, 160, 200, "creator-zhuzai-0-2"), ability.pointDefenseAbility1(-25, -8, 10, 160, 200, "creator-zhuzai-0-2"));
// pointDefenseAbility1(px, py, reloadTime, range, bulletDamage, "sprite");
ZHUZAI0.alwaysUnlocked = true;
ZHUZAI0.commandLimit = 150;
ZHUZAI0.abilities.add(
    new UnitSpawnAbility(UnitTypes.arkyid, 900, 19.25, -31.75), // T4 爬爬
    new UnitSpawnAbility(UnitTypes.zenith, 60, -19.25, 31.75),//T3 飞
    new UnitSpawnAbility(UnitTypes.antumbra, 600, -31.75, 19.25), //t4 飞
    new UnitSpawnAbility(UnitTypes.eclipse, 1200, 31.75, -19.25),//t5 飞
);



//ZHUZAI.defaultController = prov(() => new MinerAI());
ZHUZAI0.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {}));
lib.addToResearch(ZHUZAI0, { parent: UnitTypes.eclipse.name, });
//--------------------------------------------------------------------
/* const ZHUZAI1 = new UnitType('zhuzai');
ZHUZAI1.commandLimit = 300;
ZHUZAI1.abilities.add(
    new UnitSpawnAbility(UnitTypes.arkyid, 580, 19.25, -31.75), // T4 爬爬
    new UnitSpawnAbility(UnitTypes.zenith, 60, -19.25, 31.75),//T3 飞
    new UnitSpawnAbility(UnitTypes.antumbra, 340, -31.75, 19.25), //t4 飞
    new UnitSpawnAbility(UnitTypes.eclipse, 720, 31.75, -19.25),//t5 飞
);



//ZHUZAI.defaultController = prov(() => new MinerAI());
ZHUZAI1.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {})); */








































/* const BD = new UnitType( 'shiyan', {});
BD.abilities.add(new UnitSpawnAbility(ZHUZAI1, 60, 19.25, -31.75), new UnitSpawnAbility(ZHUZAI1, 60, -19.25, -31.75));
BD.constructor = prov(() => extend(UnitTypes.flare.constructor.get().class, {}));
 */




//-----------------------------------------------------------------------------------------------------------------------------------------
const rule = new UnitType('rule');//毁灭规则
rule.alwaysUnlocked = true;
rule.speed = 3;
rule.hitSize = 1;//5格

rule.health = 1109;
rule.itemCapacity = 0;
rule.flying = true;
rule.isCounted = false;
//rule.targetFlags = BlockFlag.battery;
//rule.defaultController = prov(() => new MinerAI());
rule.constructor = prov(() => extend(UnitTypes.zenith.constructor.get().class, {}));