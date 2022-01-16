// Copyright (C) 2020 abomb4
//
// This file is part of Dimension Shard.
//
// Dimension Shard is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Dimension Shard is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Dimension Shard.  If not, see <http://www.gnu.org/licenses/>.
//          "sprite":"mod名-贴图"//子弹贴图，放在子弹类里
//          "hitTiles":true,//是否打方块(子弹)
// 			"collidesTiles":true,//是否碰撞方块(不论敌友)
// 			"collidesGround":true,
// 			"collidesTeam":false,//是否与同队单位碰撞
// 			"collidesAir":true,//是否空中碰撞
// 			"collides":true,//是否开启碰撞箱
//          极限值常用最大值：2147483647


//---------------------部分代码 @滞人 编写


const lib = require('lib');
const items = require('wupin');
const fangkongSound = lib.loadSound("fangkong");
const zhiliaoSound = lib.loadSound("zhiliao");
const { newIonBoltBulletType } = require('paota/index');//离子液
const {
    xi, zuanshikuang, zuanjing, hua1, hua2, hua3, tanban,
    zhiwumo, luzha, weijing1, weijing2, xiao, liziye,
    weijing3, weijing4, weijing5, guijingti, molishi,dabaosuan,
    monengjing, monengjing1, monengjing2, monengjing3,
    buding, chuangshilizi, chuangshishenhun, chuangshiweichen,
    chuangshizhixing, jin, jinfen, molizhi, shimoxi, shiying,
    yuanshencanpian, zhayao, zijing1, zzjinbi, invalid,suan,
    molijinghuaye, moliye, qiangxiaolengqueye, zhiwujinghuaye
} = items;
//--------------------------------------------------------------------------//
var dafengche = (() => {
    const SPEEF = 4;
    const laser01 = new JavaAdapter(ContinuousLaserBulletType, {
    }, 70);
    laser01.colors = [Color.valueOf("ec555555"), Color.valueOf("ec8888aa"), Color.valueOf("ff6c6a"), Color.white];
    laser01.width = 5;//宽
    laser01.length = 70//长
    laser01.largeHit = true;
    laser01.hitEffect = Fx.hitMeltdown
    laser01.hitColor = Pal.meltdownHit
    laser01.drawSize = 420
    laser01.incendChance = 0.4
    laser01.incendSpread = 5
    laser01.incendAmount = 1
    const laser02 = new JavaAdapter(ContinuousLaserBulletType, {
    }, 40);
    laser02.colors = [Color.valueOf("dc91ff"), Color.valueOf("973af5"), Color.valueOf("e8d1ff"), Color.white];
    laser02.width = 5;//宽
    laser02.length = 70//长
    laser02.largeHit = true;
    laser02.hitEffect = Fx.hitMeltdown
    laser02.hitColor = Pal.meltdownHit
    laser02.drawSize = 420
    laser02.incendChance = 0.4
    laser02.incendSpread = 5
    laser02.incendAmount = 1

    const bt = new JavaAdapter(BasicBulletType, {
        init(b) {
            if (!b) { return; }
            if (!b.data) { b.data = {}; }
            b.data.bullet1 = laser01.create(b, b.x, b.y, 0);
            b.data.bullet2 = laser01.create(b, b.x, b.y, 120);
            b.data.bullet3 = laser01.create(b, b.x, b.y, 240);
            b.data.bullet4 = laser02.create(b, b.x, b.y, 0);
            b.data.bullet5 = laser02.create(b, b.x, b.y, 120);
            b.data.bullet6 = laser02.create(b, b.x, b.y, 240);
            b.data.bulletRot = 0;
            b.data.direction = b.id % 2 == 0;
        },
        update(b) {
            this.super$update(b);
            b.data.bulletRot += SPEEF;
            b.data.bullet1.time = 0;
            b.data.bullet2.time = 0;
            b.data.bullet3.time = 0;
            b.data.bullet4.time = 0;
            b.data.bullet5.time = 0;
            b.data.bullet6.time = 0;
            b.data.bullet1.set(b.x, b.y);
            b.data.bullet2.set(b.x, b.y);
            b.data.bullet3.set(b.x, b.y);
            b.data.bullet4.set(b.x, b.y);
            b.data.bullet5.set(b.x, b.y);
            b.data.bullet6.set(b.x, b.y);
            if (b.data.direction) {
                b.data.bullet1.rotation(b.rotation() + b.data.bulletRot);
                b.data.bullet2.rotation(b.rotation() + b.data.bulletRot + 120);
                b.data.bullet3.rotation(b.rotation() + b.data.bulletRot + 240);
                b.data.bullet4.rotation(b.rotation() + b.data.bulletRot + 60);
                b.data.bullet5.rotation(b.rotation() + b.data.bulletRot + 180);
                b.data.bullet6.rotation(b.rotation() + b.data.bulletRot + 300);
            } else {
                b.data.bullet1.rotation(b.rotation() - b.data.bulletRot);
                b.data.bullet2.rotation(b.rotation() - b.data.bulletRot + 120);
                b.data.bullet3.rotation(b.rotation() - b.data.bulletRot + 240);
                b.data.bullet4.rotation(b.rotation() - b.data.bulletRot + 60);
                b.data.bullet5.rotation(b.rotation() - b.data.bulletRot + 180);
                b.data.bullet6.rotation(b.rotation() - b.data.bulletRot + 300);
            }
        },
    });
    bt.sprite = "duo";
    bt.reloadMultiplier = 2;
    bt.damage = 1200;
    bt.width = 6;
    bt.height = 6;
    bt.shrinkY = 0;
    bt.shrinkX = 0;
    bt.spin = 0;
    bt.lifetime = 450;
    bt.backColor = Color.valueOf("ffffff00");
    bt.frontColor = Pal.meltdownHit;
    bt.despawnEffect = Fx.none;
    bt.speed = 6;
    bt.collides = false;
    bt.reflectable = false;
    bt.absorbable = false;
    bt.homingRange = 480;
    bt.homingPower = 5; //追踪; 
    return bt;
})()
//-------------------------------------------------------------------------------------------    

const DianHu = extend(PowerTurret, 'dianhu', {})//"霹雳闪"
DianHu.shootType = (() => {
    const a = new JavaAdapter(LightningBulletType, {});


    a.collidesGround = false
    a.translation = -50
    a.damage = 10;
    a.lightningLength = 50;
    a.lightningLengthRand = 8;
    a.collidesAir = true;
    a.lightningColor = Color.valueOf("ef4018");
    return a;
})()
DianHu.canOverdrive = false;
DianHu.reloadTime = 35;
DianHu.shootCone = 40;
DianHu.rotateSpeed = 500;
DianHu.powerUse = 20;
//DianHu.localizedName = "霹雳闪"
DianHu.targetAir = true; //空
DianHu.targetGround = false; //地
DianHu.range = 180;
DianHu.shootEffect = Fx.lightningShoot;
DianHu.recoilAmount = 1;
DianHu.size = 3;
DianHu.health = 260;
DianHu.shootSound = Sounds.spark;
DianHu.hasLiquids = false;
DianHu.liquidCapacity = 0;
DianHu.shots = 100;
DianHu.xRand = 5;
DianHu.inaccuracy = 360;
DianHu.coolantUsage = 0;//液体加速
DianHu.requirements = ItemStack.with(
    Items.lead, 400,
    Items.copper, 350,
    guijingti, 120,
    zijing1, 10,
    shimoxi, 150,
);
DianHu.buildVisibility = BuildVisibility.shown;
DianHu.category = Category.turret;
lib.addToResearch(DianHu, { parent: Blocks.arc.name, });
exports.DianHu = DianHu;
//----------------------------------------------------------
const FangKong = new JavaAdapter(PowerTurret, {}, 'fangkong');//防空
FangKong.size = 2;
FangKong.health = 400;
FangKong.buildCostMultiplier = 1;
FangKong.heatColor = Color.valueOf("6ef6ff");
FangKong.shootEffect = Fx.none;
FangKong.smokeEffect = Fx.none;
FangKong.ammoUseEffect = Fx.none;
FangKong.ammoPerShot = 1;
FangKong.range = 144;
FangKong.reload = 4;
FangKong.inaccuracy = 1;
FangKong.shots = 1;
FangKong.spread = 6;
FangKong.recoil = 0.1;
FangKong.restitution = 0.02;
FangKong.cooldown = 0.02;
FangKong.rotatespeed = 8;
FangKong.shootShake = 0.2;
FangKong.collidesGround = false
FangKong.targetAir = true;
FangKong.targetGround = false;
FangKong.coolantMultiplier = 2;
FangKong.coolEffect = Fx.steam;
FangKong.powerUse = 0.5;
FangKong.shootType = (() => {
    const a = new JavaAdapter(BasicBulletType, {});
    a.bulletWidth = 5;
    a.bulletHeight = 50;
    a.bulletShrink = 0.5;
    a.lifetime = 30;
    a.speed = 8;
    a.damage = 10;
    a.collidesGround = false//子弹碰撞地面
    a.hitSize = 8;
    a.drawSize = 40;
    a.backColor= Color.valueOf("cff0f1"); //背景颜色
    a.frontColor= Color.valueOf("49d5f9"); //前面颜色
    a.drag = 0;
    a.pierce = true;
    a.hitEffect = Fx.melting;
    a.despawnEffect = Fx.despawn;
    a.hitSound = Sounds.none;
    a.status = StatusEffects.melting;
    a.statusDuration = 300
    return a;
})()
FangKong.requirements = ItemStack.with(
    Items.lead, 200,
    Items.graphite, 120,
    Items.silicon, 50,
);
FangKong.shootSound = fangkongSound
FangKong.buildVisibility = BuildVisibility.shown;
FangKong.category = Category.turret;
lib.addToResearch(FangKong, { parent: Blocks.lancer.name, });
exports.FangKong = FangKong;
//------------------------------------------------

const healere = extend(PowerTurret, "zhiliaopao", {//治疗炮
})
healere.buildType = prov(() => new JavaAdapter(PowerTurret.PowerTurretBuild, {
    collide(other) { return other.owner != this },
    findTarget() {
        // 优先找己方被打的建筑，再寻找敌人
        var target = Units.findDamagedTile(this.team, this.x, this.y)
        if (target != null && target != this && this.dst(target) <= healere.range) {
            // 设置为己方方块
            this.target = target;
        } else {
            // 默认寻找方法
            this.super$findTarget();
        }
    },
    validateTarget() {
        // 修改了 team ，使得己方方块也视为有效目标
        return !Units.invalidateTarget(this.target, Team.derelict, this.x, this.y) || this.isControlled() || this.logicControlled();
    },
}, healere))
healere.health = 650;
healere.size = 2;
healere.targetAir = false;
healere.targetGround = true;
healere.rotateSpeed = 5;//转速
healere.reloadTime = 10;//装填时间
healere.maxAmmo = 10;//最大携弹数
healere.range = 200;
healere.shootSound = zhiliaoSound;
healere.knockback = 3;//击退
healere.inaccuracy = 3;//精准
healere.powerUse = 1.5;//耗电
healere.shootType = (() => {
    const a = new JavaAdapter(LaserBoltBulletType, {});
    a.speed = 6;//子弹速度
    a.lifetime = 40;
    a.healPercent = 1;
    a.damage = 14;//子弹伤
    a.backColor = Color.valueOf("00FF7F");
    a.collidesTeam = true;
    return a;
})()
healere.requirements = ItemStack.with(
    Items.lead, 55,
    Items.copper, 40,
    guijingti, 20,
);
healere.buildVisibility = BuildVisibility.shown;
healere.category = Category.turret;
lib.addToResearch(healere, { parent: FangKong.name, });
exports.healere = healere;
//------------------------------------------
const huasha = extend(LiquidTurret, "huasha", {});//花洒 消防
huasha.buildType = prov(() => {
    return new JavaAdapter(LiquidTurret.LiquidTurretBuild, {
        draw() {
            this.super$draw();
            Draw.blend();
            Draw.color();
            Draw.rect(Core.atlas.find("creator-huasha-1"), this.x, this.y, 90 - Time.time * 2);
            Draw.rect(Core.atlas.find("creator-huasha-1"), this.x, this.y, 30 - Time.time * 2);
            Draw.rect(Core.atlas.find("creator-huasha-1"), this.x, this.y, 60 - Time.time * 2);
            Draw.rect(Core.atlas.find("creator-huasha-4"), this.x, this.y);
        },
    }, huasha);
});
//-----------------------------------
var ml = new JavaAdapter(ShrapnelBulletType, {});
ml.damage = 65;
ml.length = 200;
ml.reloadMultiplier = 0.8;
ml.fromColor = Color.valueOf("DCDCDC");
ml.ammoMultiplier = 4;
var ti = new JavaAdapter(ShrapnelBulletType, {});
ti.damage = 90;
ti.length = 200;
ti.reloadMultiplier = 1.2;
ti.fromColor = Color.valueOf("87CEFA");
ti.ammoMultiplier = 4;
ti.duration = 1;
var pi = new JavaAdapter(ShrapnelBulletType, {});
pi.damage = 138;
pi.length = 200;
pi.fromColor = Color.valueOf("9ACD32");
pi.ammoMultiplier = 2;
var tim = new JavaAdapter(ShrapnelBulletType, {});
tim.damage = 157;
tim.length = 200;
tim.fromColor = Color.valueOf("B766AD");
tim.ammoMultiplier = 5;
tim.incendChance = 0.5;
tim.incendAmount = 3;
var sa = new JavaAdapter(ShrapnelBulletType, {});
sa.damage = 195;
sa.length = 200;
sa.fromColor = Color.valueOf("EEC900");
sa.ammoMultiplier = 2;
sa.lightining = 3;
sa.lightiningLength = 20;
const JueWang = extend(ItemTurret, 'q-juewang', {})//绝望
JueWang.ammoTypes.put(Items.metaglass, ml);
JueWang.ammoTypes.put(Items.titanium, ti);
JueWang.ammoTypes.put(Items.plastanium, pi);
JueWang.ammoTypes.put(Items.thorium, tim);
JueWang.ammoTypes.put(Items.surgeAlloy, sa);
JueWang.requirements = ItemStack.with(
    Items.plastanium, 125,
    Items.titanium, 225,
    Items.thorium, 175,
    Items.surgeAlloy, 75,
    guijingti, 110,
    jin, 150
);
JueWang.shootSound = Sounds.shotgun;
JueWang.health = 2700;
JueWang.reloadTime = 55;
JueWang.size = 4;
JueWang.spread = 20;
JueWang.shootCone = 30;
JueWang.recoilAmount = 4;
JueWang.rotatespeed = 5;
JueWang.ammoPerShot = 2;
JueWang.heatColor = Pal.turretHeat;
JueWang.shots = 7;
JueWang.range = 150;
JueWang.buildVisibility = BuildVisibility.shown;
JueWang.category = Category.turret;
lib.addToResearch(JueWang, { parent: Blocks.fuse.name, });
exports.JueWang = JueWang;
//-------------------------------------------------------------
const shots = 6;//牵引数量
const force = 30;//拉力
const scaledForce = 8;//按比例缩小的力
const BuHuo = extend(TractorBeamTurret, 'r-buhuo', {//捕获
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.shots, shots);
    },
})
BuHuo.buildType = prov(() => {
    var target = new Seq();
    return new JavaAdapter(TractorBeamTurret.TractorBeamBuild, {
        updateTile() {
            this.super$updateTile();
            target.clear();
            Units.nearbyEnemies(this.team, this.x, this.y, this.block.range, cons(unit => {
                if (unit.checkTarget(this.block.targetAir, this.block.targetGround) && Angles.within(this.rotation, this.angleTo(unit), this.block.shootCone) && this.efficiency() > 0.02) {
                    target.add(unit);
                }
            }));
            target.sort(floatf(u => u.dst(this.x, this.y)));
            var max = Math.min(shots, target.size);
            for (var a = 0; a < max; a++) {
                var unit = target.get(a);
                if (unit != null) {
                    if (this.block.damage > 0) {
                        unit.damageContinuous(this.block.damage * this.efficiency());
                    }
                    unit.impulseNet(Tmp.v1.set(this).sub(unit).limit((force + (1 - unit.dst(this) / this.block.range) * scaledForce) * this.edelta() * this.timeScale));
                }
            }
        },
        draw() {
            Draw.rect(this.block.baseRegion, this.x, this.y);
            Drawf.shadow(this.block.region, this.x - (this.block.size / 2), this.y - (this.block.size / 2), this.rotation - 90);
            Draw.rect(this.block.region, this.x, this.y, this.rotation - 90);
            Draw.z(Layer.bullet);
            var max = Math.min(shots, target.size);
            for (var a = 0; a < max; a++) {
                var unit = target.get(a);
                Draw.mixcol();
                Draw.mixcol(this.block.laserColor, Mathf.absin(4, 0.6));
                Tmp.v1.trns(this.rotation, this.block.shootLength).add(this.x, this.y);
                if (unit != null) {
                    Drawf.laser(
                        this.team,
                        Core.atlas.find("parallax-laser"),
                        Core.atlas.find("parallax-laser-end"),
                        Tmp.v1.x,
                        Tmp.v1.y,
                        unit.x,
                        unit.y,
                        this.efficiency() * this.block.laserWidth
                    );
                }
            }
        },
    }, BuHuo);
});
Object.assign(BuHuo, {
    hasPower: true,
    force: 30,
    scaledForce: 0,
    size: 3,
    damage: 0.6,
    range: 280,
    shootCone: 58,
    rotateSpeed: 8,
    laserWidth: 0.8,
    health: 160 * 3 * 3,
});
BuHuo.health = 980;
//BuHuo.size = 3;
//BuHuo.rotateSpeed = 20;//旋转速度
//BuHuo.range = 280;
//BuHuo.scaledForce = 20;//按比例缩小的力
//BuHuo.force = 20;//拉力
//BuHuo.hasPower = true
//BuHuo.damage = 0.7;//伤害比例 1=60伤害
BuHuo.consumes.power(4.8);
BuHuo.requirements = ItemStack.with(
    Items.titanium, 225,
    Items.plastanium, 60,
    zijing1, 45,
    guijingti, 150,
    shimoxi, 125
);
BuHuo.buildVisibility = BuildVisibility.shown;
BuHuo.category = Category.turret;
lib.addToResearch(BuHuo, { parent: Blocks.parallax.name, });
exports.BuHuo = BuHuo;
//-----------------------------------------------------
const LanJie = extend(PointDefenseTurret, 'r-lanjie', {})
LanJie.health = 1220;
LanJie.size = 3;
LanJie.rotateSpeed = 20;
LanJie.range = 250;
LanJie.reloadTime = 5;
LanJie.shootLength = 10;
LanJie.inaccuracy = 5;//精度？
LanJie.bulletDamage = 50;//子弹的抵挡伤害
LanJie.consumes.power(13);
LanJie.requirements = ItemStack.with(
    Items.thorium, 225,
    Items.surgeAlloy, 60,
    Items.phaseFabric, 60,
    jin, 125,
    weijing1, 15,
    shimoxi, 150
);
LanJie.buildVisibility = BuildVisibility.shown;
LanJie.category = Category.turret;
lib.addToResearch(LanJie, { parent: Blocks.segment.name, });
exports.LanJie = LanJie;
//--------------------------------------------------------------------------
const liC = Color.valueOf("bf92f9");
const dec = Color.valueOf("ffffff");
const dec2 = Color.valueOf("ffffff");
const hur = new JavaAdapter(BasicBulletType, {
    update(b) {
        if (b.timer.get(6)) {
            for (var i = 0; i < 10; i++) {
                var len = Mathf.random(1, 7);
                var a = b.rotation() + Mathf.range(this.fragCone / 2) + this.fragAngle;
                Lightning.create(b.team, liC, 5, b.x - Angles.trnsx(a, len), b.y - Angles.trnsy(a, len), a, Mathf.random(2, 10));

            }
        }
    }

});
hur.width = 1;
hur.height = 1;
hur.damage = 25;
hur.lifetime = 60;
hur.speed = 3;
hur.status = StatusEffects.shocked;
hur.despawnEffect = lib.newEffectt(20, (e) => {
    Draw.color(dec, dec2, e.fin());
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 60);
    Lines.stroke(e.fout() * 1.75);
    Lines.circle(e.x, e.y, e.fin() * 45);
    Draw.color(dec);
    Fill.circle(e.x, e.y, e.fout() * 20);
    Draw.color(dec, dec2, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 14);
});
hur.pierceCap = 2
hur.pierceBuilding = true
//hur.homingPower = 1 //追踪

var penhuo2 = new JavaAdapter(FlakBulletType, {});
penhuo2.collidesTiles = false
penhuo2.collides = false;
penhuo2.collidesAir = false;
penhuo2.damage = 30;
penhuo2.splashDamageRadius = 24;
penhuo2.splashDamage = 50;
penhuo2.width = 100;
penhuo2.height = 100;
penhuo2.speed = 0;
penhuo2.lifetime = 70;
penhuo2.hitEffect = Fx.plasticExplosion;
 penhuo2.backColor = Color.valueOf("bf92f9");
 penhuo2.frontColor = Color.valueOf("bf92f9");
penhuo2.reloadMultiplier = 3;
penhuo2.ammoMultiplier = 1;
penhuo2.collidesGround = true;
penhuo2.fragBullets = 5;
penhuo2.fragBullet = hur;
var penhuo1 = new JavaAdapter(BasicBulletType, {});
penhuo1.collidesTiles = false
penhuo1.collides = false;
penhuo1.collidesAir = false;
penhuo1.scaleVelocity = true;//开启指哪打哪
penhuo1.speed = 6;
penhuo1.lifetime = 40;
penhuo1.damage = 80;
penhuo1.height = 40;
penhuo1.width = 40;
penhuo1.hitEffect = Fx.hitLaser;
penhuo1.despawnEffect = Fx.hitLaser;
penhuo1.pierce = true;
penhuo1.frontColor = Color.valueOf("d0c2e9");
penhuo1.backColor = Color.valueOf("d0c2e9");
penhuo1.fragBullets = 1;
penhuo1.fragBullet = penhuo2;

const lieguang = extend(PowerTurret, 'lieguang', {})//裂光
lieguang.health = 1800;
lieguang.inaccuracy = 0; //精准
lieguang.size = 3;
//lieguang.ammoPerShot=2;//每发消耗的资源
lieguang.targetAir = false; //空
lieguang.targetGround = true; //地
lieguang.coolantMultiplier = 0.7; //液体冷却倍率
//lieguang.itemCapacity = 50; //资源容量
lieguang.reloadTime = 200; //每秒发射数60:1;30:2
lieguang.range = 216;
lieguang.liquidCapacity = 10; //液体容量
lieguang.shootSound = Sounds.shootBig; //统一射击音效
//lieguang.consumes.power(3.2);
lieguang.shots = 1;
lieguang.shootCone = 2;
lieguang.shootType = penhuo1;
lieguang.spread = 4;
lieguang.recoilAmount = 1.5;
lieguang.restitution = 0.04;
lieguang.rotateSpeed = 80;
lieguang.shootSound = Sounds.lasershoot;
lieguang.powerUse = 50;
lieguang.hasPower = true;
lieguang.requirements = ItemStack.with(
    Items.lead, 560,
    Items.copper, 320,
    jin, 75,
    guijingti, 120,
    shimoxi,140
);
lieguang.buildVisibility = BuildVisibility.shown;
lieguang.category = Category.turret;
lib.addToResearch(lieguang, { parent: Blocks.lancer.name, });
exports.lieguang = lieguang;
//--------------------------------------------------------
const fragPlasticFrag0 = extend(BasicBulletType, {});
fragPlasticFrag0.damage = 10; //伤害
fragPlasticFrag0.speed = 2.5;
fragPlasticFrag0.width = 15;
fragPlasticFrag0.height = 20;
fragPlasticFrag0.shrinkY = 1;
fragPlasticFrag0.lifetime = 22;
fragPlasticFrag0.backColor = Pal.plastaniumBack;
fragPlasticFrag0.frontColor = Pal.plastaniumFront;
fragPlasticFrag0.despawnEffect = Fx.none;
fragPlasticFrag0.collidesGround = false
var Qzuanjing = new JavaAdapter(FlakBulletType, {});
Qzuanjing.damage = 30; //伤害
Qzuanjing.splashDamageRadius = 64; //分裂范围
Qzuanjing.splashDamage = 150; //分裂的伤害
Qzuanjing.width = 15; //宽
Qzuanjing.height = 20; //高
Qzuanjing.speed = 6;
Qzuanjing.lifetime = 60; //子弹最远距离
Qzuanjing.hitEffect = Fx.plasticExplosion;
Qzuanjing.backColor = Color.valueOf("FFFFAA"); //背景颜色
Qzuanjing.frontColor = Color.valueOf("00E3E3"); //前面颜色
Qzuanjing.reloadMultiplier = 1; //装弹速度
Qzuanjing.ammoMultiplier = 3; //装弹数量
Qzuanjing.knockback = 8; //击退; 
Qzuanjing.pierce = false; //穿透
Qzuanjing.fragBullets = 12; //分裂数量
Qzuanjing.fragBullet =fragPlasticFrag0;
var QsurgeAlloy = new JavaAdapter(FlakBulletType, {});
QsurgeAlloy.damage = 10; //伤害
QsurgeAlloy.splashDamageRadius = 48; //分裂范围
QsurgeAlloy.splashDamage = 90; //分裂的伤害
QsurgeAlloy.width = 11; //宽
QsurgeAlloy.height = 15; //高
QsurgeAlloy.speed = 6;
QsurgeAlloy.lifetime = 60; //子弹最远距离
QsurgeAlloy.hitEffect = Fx.plasticExplosion;
QsurgeAlloy.backColor = Color.valueOf("F9F900"); //背景颜
QsurgeAlloy.frontColor = Color.valueOf("F9F900"); //前面颜
QsurgeAlloy.reloadMultiplier = 2; //装弹速
QsurgeAlloy.ammoMultiplier = 4; //装弹数
QsurgeAlloy.lightning = 8; //闪电根数
QsurgeAlloy.lightningLength = 7; //闪电长度
QsurgeAlloy.lightningDamage = 10;//闪电伤害
var Qjin = new JavaAdapter(FlakBulletType, {});
Qjin.damage = 8; //伤害
Qjin.splashDamageRadius = 54; //分裂范围
Qjin.splashDamage = 75; //分裂的伤害
Qjin.width = 7; //宽
Qjin.height = 13; //高
Qjin.knockback = 3; //击退; 
Qjin.speed = 6;
Qjin.lifetime = 60; //子弹最远距离
Qjin.hitEffect = Fx.plasticExplosion;
Qjin.backColor = Color.valueOf("F9F900"); //背景颜色
Qjin.frontColor = Color.valueOf("F9F900"); //前面颜色
Qjin.reloadMultiplier = 5.3; //装弹速度
Qjin.ammoMultiplier = 2.5; //装弹数量
var Qthorium = new JavaAdapter(FlakBulletType, {});
Qthorium.damage = 15; //伤害
Qthorium.splashDamageRadius = 40; //分裂范围
Qthorium.splashDamage = 50; //分裂的伤害
Qthorium.width = 10; //宽
Qthorium.height = 15; //高
Qthorium.speed = 6;
Qthorium.lifetime = 60; //子弹最远距离
Qthorium.hitEffect = Fx.plasticExplosion;
Qthorium.backColor = Color.valueOf("DAB1D5"); //背景颜色
Qthorium.frontColor = Color.valueOf("6C3365"); //前面颜色
Qthorium.reloadMultiplier = 3; //装弹速度
Qthorium.ammoMultiplier = 2; //装弹数量
Qthorium.homingPower = 1;

var Qplastanium = new JavaAdapter(FlakBulletType, {});
const fragPlasticFrag1 = extend(BasicBulletType,{});
fragPlasticFrag1.damage = 10; //伤害
fragPlasticFrag1.speed = 2.5;
fragPlasticFrag1.width = 10;
fragPlasticFrag1.height = 12;
fragPlasticFrag1.shrinkY = 1;
fragPlasticFrag1.lifetime = 15;
fragPlasticFrag1.backColor = Pal.plastaniumBack;
fragPlasticFrag1.frontColor = Pal.plastaniumFront;
fragPlasticFrag1.despawnEffect = Fx.none;
fragPlasticFrag1.collidesGround = false
Qplastanium.damage = 6; //伤害
Qplastanium.splashDamageRadius = 40; //分裂范围
Qplastanium.splashDamage = 40; //分裂的伤害
Qplastanium.width = 5; //宽
Qplastanium.height = 10; //高
Qplastanium.speed = 6;
Qplastanium.lifetime = 60; //子弹最远距离         
Qplastanium.frontColor = Color.valueOf("00E3E3"); //前面颜色
Qplastanium.reloadMultiplier = 6; //装弹速度
Qplastanium.ammoMultiplier = 3; //装弹数量
Qplastanium.fragBullets = 10; //分裂数量
Qplastanium.fragBullet =fragPlasticFrag1;
//Qplastanium.fragBullet = Bullets.fragPlasticFrag; //分裂子弹

var Qbuding = new JavaAdapter(BasicBulletType, {});
Qbuding.damage = 8; //伤害
//Qbuding.splashDamageRadius= 40; //分裂范围
//Qbuding.splashDamage= 40; //分裂的伤害
Qbuding.width = 5; //宽
Qbuding.height = 10; //高
Qbuding.speed = 6;
Qbuding.lifetime = 60; //子弹最远距离         
//Qbuding.frontColor=Color.valueOf("00E3E3"); //前面颜色
Qbuding.reloadMultiplier = 2; //装弹速度
Qbuding.ammoMultiplier = 4; //装弹数量
Qbuding.homingPower = 1;
Qbuding.status = StatusEffects.freezing; //效果;冰冻
const ZhengFu = extend(ItemTurret, 's-zhengfu', {})//征服 对空
ZhengFu.ammoTypes.put(zuanjing, Qzuanjing);
ZhengFu.ammoTypes.put(buding, Qbuding);
ZhengFu.ammoTypes.put(jin, Qjin);
ZhengFu.ammoTypes.put(Items.thorium, Qthorium);
ZhengFu.ammoTypes.put(Items.plastanium, Qplastanium);
ZhengFu.ammoTypes.put(Items.surgeAlloy, QsurgeAlloy);
ZhengFu.health = 2100;
ZhengFu.inaccuracy = 8; //精准
ZhengFu.size = 3;
//ZhengFu.ammoPerShot=2;//每发消耗的资源
ZhengFu.targetAir = true; //空
ZhengFu.targetGround = false; //地
// ZhengFu.coolantMultiplier=0.8; //液体冷却倍率
ZhengFu.itemCapacity = 50; //资源容量
ZhengFu.reloadTime = 30; //每秒发射数60:1;30:2
ZhengFu.range = 360;
ZhengFu.liquidCapacity = 20; //液体容量
ZhengFu.shootSound = Sounds.shootBig; //统一射击音效
//ZhengFu.consumes.power(2.5);
ZhengFu.requirements = ItemStack.with(
    Items.lead, 1420,
    Items.copper, 1760,
    jin, 70,
    zijing1, 40,
    guijingti, 220
);
ZhengFu.buildVisibility = BuildVisibility.shown;
ZhengFu.category = Category.turret;
lib.addToResearch(ZhengFu, { parent: Blocks.ripple.name, });
exports.ZhengFu = ZhengFu;
//-----------------------------------------------------------------------------------------------------------
var Wzuanjing = new JavaAdapter(BasicBulletType, {});
const fragPlasticFrag2 = extend(BasicBulletType, {});
fragPlasticFrag2.damage = 10; //伤害
fragPlasticFrag2.speed = 2.5;
fragPlasticFrag2.width = 15;
fragPlasticFrag2.height = 20;
fragPlasticFrag2.shrinkY = 1;
fragPlasticFrag2.lifetime = 22;
fragPlasticFrag2.backColor = Pal.plastaniumBack;
fragPlasticFrag2.frontColor = Pal.plastaniumFront;
fragPlasticFrag2.despawnEffect = Fx.none;
fragPlasticFrag2.collidesTiles = true
fragPlasticFrag2.collides = true;
fragPlasticFrag2.collidesAir = false;
Wzuanjing.damage = 80; //伤害
Wzuanjing.splashDamageRadius = 64; //分裂范围
Wzuanjing.splashDamage = 180; //分裂的伤害
Wzuanjing.width = 15; //宽
Wzuanjing.height = 20; //高
Wzuanjing.speed = 2;
Wzuanjing.lifetime = 200; //子弹最远距离
Wzuanjing.hitEffect = Fx.plasticExplosion;
Wzuanjing.backColor = Color.valueOf("FFFFAA"); //背景颜色
Wzuanjing.frontColor = Color.valueOf("00E3E3"); //前面颜色
Wzuanjing.reloadMultiplier = 1.5; //装弹速度
//Wzuanjing.ammoMultiplier = 3; //装弹数量
Wzuanjing.collidesTiles = true
Wzuanjing.collides = true;
Wzuanjing.collidesAir = false;
Wzuanjing.scaleVelocity = true;//开启指哪打哪
Wzuanjing.knockback = 35; //击退; 
Wzuanjing.pierce = false; //穿透
Wzuanjing.fragBullets = 12; //分裂数量
Wzuanjing.fragBullet = fragPlasticFrag2;
var WsurgeAlloy = new JavaAdapter(BasicBulletType, {});
WsurgeAlloy.collidesTiles = true
WsurgeAlloy.collides = true;
WsurgeAlloy.collidesAir = false;
WsurgeAlloy.damage = 15; //伤害
WsurgeAlloy.splashDamageRadius = 48; //分裂范围
WsurgeAlloy.splashDamage = 50; //分裂的伤害
WsurgeAlloy.width = 11; //宽
WsurgeAlloy.height = 15; //高
WsurgeAlloy.speed = 6;
WsurgeAlloy.lifetime = 60; //子弹最远距离
WsurgeAlloy.hitEffect = Fx.plasticExplosion;
WsurgeAlloy.backColor = Color.valueOf("F9F900"); //背景颜
WsurgeAlloy.frontColor = Color.valueOf("F9F900"); //前面颜
WsurgeAlloy.reloadMultiplier = 2; //装弹速
WsurgeAlloy.ammoMultiplier = 4; //装弹数
WsurgeAlloy.lightning = 8; //闪电根数
WsurgeAlloy.lightningLength = 7; //闪电长度
WsurgeAlloy.lightningDamage = 10;//闪电伤害
var Wjin = new JavaAdapter(BasicBulletType, {});
Wjin.damage = 8; //伤害
Wjin.splashDamageRadius = 54; //分裂范围
Wjin.splashDamage = 50; //分裂的伤害
Wjin.width = 7; //宽
Wjin.collidesTiles = true
Wjin.collides = true;
Wjin.collidesAir = false;
Wjin.height = 13; //高
Wjin.knockback = 5; //击退; 
Wjin.speed = 6;
Wjin.lifetime = 60; //子弹最远距离
Wjin.hitEffect = Fx.plasticExplosion;
Wjin.backColor = Color.valueOf("F9F900"); //背景颜色
Wjin.frontColor = Color.valueOf("F9F900"); //前面颜色
Wjin.reloadMultiplier = 5.3; //装弹速度
Wjin.ammoMultiplier = 4; //装弹数量
var Wthorium = new JavaAdapter(BasicBulletType, {});
Wthorium.collidesTiles = true
Wthorium.collides = true;
Wthorium.collidesAir = false;
Wthorium.damage = 15; //伤害
Wthorium.splashDamageRadius = 40; //分裂范围
Wthorium.splashDamage = 40; //分裂的伤害
Wthorium.width = 10; //宽
Wthorium.height = 15; //高
Wthorium.speed = 6;
Wthorium.lifetime = 60; //子弹最远距离
Wthorium.hitEffect = Fx.plasticExplosion;
Wthorium.backColor = Color.valueOf("DAB1D5"); //背景颜色
Wthorium.frontColor = Color.valueOf("6C3365"); //前面颜色
Wthorium.reloadMultiplier = 3; //装弹速度
//Wthorium.ammoMultiplier = 2; //装弹数量
Wthorium.homingPower = 1;

const fragPlasticFrag3 = extend(BasicBulletType, {});
fragPlasticFrag3.damage = 10; //伤害
fragPlasticFrag3.speed = 2.5;
fragPlasticFrag3.width = 10;
fragPlasticFrag3.height = 12;
fragPlasticFrag3.shrinkY = 1;
fragPlasticFrag3.lifetime = 15;
fragPlasticFrag3.backColor = Pal.plastaniumBack;
fragPlasticFrag3.frontColor = Pal.plastaniumFront;
fragPlasticFrag3.despawnEffect = Fx.none;
fragPlasticFrag3.collidesTiles = true
fragPlasticFrag3.collides = true;
fragPlasticFrag3.collidesAir = false;
var Wplastanium = new JavaAdapter(BasicBulletType, {});
Wplastanium.collidesTiles = true
Wplastanium.collides = true;
Wplastanium.collidesAir = false;
Wplastanium.damage = 6; //伤害
Wplastanium.splashDamageRadius = 40; //分裂范围
Wplastanium.splashDamage = 40; //分裂的伤害
Wplastanium.width = 5; //宽
Wplastanium.height = 10; //高
Wplastanium.speed = 6;
Wplastanium.lifetime = 60; //子弹最远距离         
Wplastanium.frontColor = Color.valueOf("00E3E3"); //前面颜色
Wplastanium.reloadMultiplier = 6; //装弹速度
Wplastanium.ammoMultiplier = 3; //装弹数量
Wplastanium.fragBullets = 10; //分裂数量
Wplastanium.fragBullet = fragPlasticFrag3; //分裂子弹
//Wplastanium.fragBullet = Bullets.fragPlasticFrag; //分裂子弹
var Wbuding = new JavaAdapter(BasicBulletType, {});
Wbuding.collidesTiles = true
Wbuding.collides = true;
Wbuding.collidesAir = false;
Wbuding.damage = 8; //伤害
//Wbuding.splashDamageRadius= 40; //分裂范围
//Wbuding.splashDamage= 40; //分裂的伤害
Wbuding.width = 5; //宽
Wbuding.height = 10; //高
Wbuding.speed = 6;
Wbuding.lifetime = 60; //子弹最远距离         
//Wbuding.frontColor=Color.valueOf("00E3E3"); //前面颜色
Wbuding.reloadMultiplier = 2; //装弹速度
Wbuding.ammoMultiplier = 4; //装弹数量
Wbuding.homingPower = 1;
Wbuding.status = StatusEffects.freezing; //效果;冰冻
Wbuding.collidesGround = true;//地面碰撞

const ZhengYi = extend(ItemTurret, 's-zhengyi', {})
ZhengYi.ammoTypes.put(zuanjing, Wzuanjing);
ZhengYi.ammoTypes.put(buding, Wbuding);
ZhengYi.ammoTypes.put(jin, Wjin);
ZhengYi.ammoTypes.put(Items.thorium, Wthorium);
ZhengYi.ammoTypes.put(Items.surgeAlloy, WsurgeAlloy);
ZhengYi.ammoTypes.put(Items.plastanium, Wplastanium);
ZhengYi.health = 2100;
ZhengYi.inaccuracy = 8; //精准
ZhengYi.size = 3;
//ZhengYi.ammoPerShot=2;//每发消耗的资源
ZhengYi.targetAir = false; //空false
ZhengYi.targetGround = true; //地
// ZhengYi.coolantMultiplier=0.8; //液体冷却倍率
ZhengYi.itemCapacity = 50; //资源容量
ZhengYi.reloadTime = 30; //每秒发射数60:1;30:2
ZhengYi.range = 360;
ZhengYi.liquidCapacity = 20; //液体容量
ZhengYi.shootSound = Sounds.shootBig; //统一射击音效
//ZhengYi.consumes.power(3.2);
ZhengYi.requirements = ItemStack.with(
    Items.lead, 1420,
    Items.copper, 1760,
    jin, 150,
    weijing1, 75,
    guijingti, 220
);
ZhengYi.buildVisibility = BuildVisibility.shown;
ZhengYi.category = Category.turret;
lib.addToResearch(ZhengYi, { parent: Blocks.ripple.name, });
exports.ZhengYi = ZhengYi;


var Wweijing2 = new JavaAdapter(BasicBulletType, {});
Wweijing2.damage = 150; //伤害
Wweijing2.width = 25; //宽
Wweijing2.height = 30; //高
Wweijing2.speed = 6;
Wweijing2.lifetime = 80; //子弹最远距离
Wweijing2.splashDamageRadius = 16; //分裂范围
Wweijing2.splashDamage = 330; //分裂的伤害
Wweijing2.hitEffect = Fx.plasticExplosion;
Wweijing2.backColor = Color.valueOf("ffffff"); //背景颜色
Wweijing2.frontColor = Color.valueOf("bbffbb"); //前面颜色
Wweijing2.reloadMultiplier = 3.3; //装弹速度
Wweijing2.ammoMultiplier = 4; //装弹数量
Wweijing2.status = StatusEffects.slow

var Wweijing1 = new JavaAdapter(BasicBulletType, {});
Wweijing1.damage = 155; //伤害
Wweijing1.width = 20; //宽
Wweijing1.height = 30; //高
Wweijing1.homingPower = 3; //追踪; 
Wweijing1.lightning = 5;//闪电根数
Wweijing1.lightningLength = 12;//闪电长度
Wweijing1.lightningColor = Color.valueOf("ff6200");//闪电颜色
Wweijing1.lightningDamage = 20;//闪电伤害
Wweijing1.speed = 6;
Wweijing1.lifetime = 80; //子弹最远距离
Wweijing1.hitEffect = Fx.plasticExplosion;
Wweijing1.backColor = Color.valueOf("ffffff"); //背景颜色
Wweijing1.frontColor = Color.valueOf("f8ff85"); //前面颜色
Wweijing1.reloadMultiplier = 3.3; //装弹速度
Wweijing1.ammoMultiplier = 3.5; //装弹数量
Wweijing1.status = StatusEffects.sapped

var WmonengjingA = new JavaAdapter(MissileBulletType, {});
WmonengjingA.splashDamageRadius = 25;
WmonengjingA.splashDamage = 240;
WmonengjingA.width = 7;
WmonengjingA.damage = 19;
WmonengjingA.height = 13;
WmonengjingA.trailEffect = Fx.none;
WmonengjingA.homingRange = 40000;
WmonengjingA.homingPower = 2;
WmonengjingA.lifetime = 1000;
WmonengjingA.speed = 1.7;
WmonengjingA.hitEffect = Fx.flakExplosion
WmonengjingA.status = StatusEffects.freezing
//WmonengjingA.collidesTiles = false;
//WmonengjingA.collidesTeam = false;

var Wmonengjing = new JavaAdapter(MissileBulletType, {});
Wmonengjing.damage = 80; //伤害
Wmonengjing.width = 20; //宽
Wmonengjing.height = 34; //高
Wmonengjing.homingRange = 320;
Wmonengjing.homingPower = 3; //追踪; 
Wmonengjing.speed = 3;
Wmonengjing.lifetime = 100; //子弹最远距离
Wmonengjing.hitEffect = Fx.plasticExplosion;
Wmonengjing.backColor = Color.valueOf("ff6c6c"); //背景颜色
Wmonengjing.frontColor = Color.valueOf("ffffff"); //前面颜色
Wmonengjing.reloadMultiplier = 1.3; //装弹速度
Wmonengjing.ammoMultiplier = 3; //装弹数量
//Wmonengjing.trailColor= B7B7B7;
Wmonengjing.trailEffect = Fx.smoke;
Wmonengjing.shootEffect = Fx.shootSmall;
Wmonengjing.fragBullets = 25;
Wmonengjing.fragBullet = WmonengjingA;


var Wmonengjing2 = new JavaAdapter(MissileBulletType, {});
Wmonengjing2.damage = 500; //伤害
Wmonengjing2.width = 20; //宽
Wmonengjing2.height = 35; //高
Wmonengjing2.homingRange = 320;
Wmonengjing2.homingPower = 5; //追踪; 
Wmonengjing2.speed = 5;
Wmonengjing2.lifetime = 60; //子弹最远距离
Wmonengjing2.hitEffect = Fx.plasticExplosion;
Wmonengjing2.backColor = Color.valueOf("b56cff"); //背景颜色
Wmonengjing2.frontColor = Color.valueOf("ffffff"); //前面颜色
Wmonengjing2.reloadMultiplier = 0.15; //装弹速度
Wmonengjing2.ammoMultiplier = 5; //装弹数量
//Wmonengjing2.trailColor= B7B7B7;
Wmonengjing2.trailEffect = Fx.smoke;
Wmonengjing2.shootEffect = Fx.shootSmall;
Wmonengjing2.fragBullets = 3;
Wmonengjing2.fragBullet = dafengche;

//const shangdilizizidan = require('shangdilizizidan');
/* var FxL = new Effect(40, e => {
    Draw.color(Color.valueOf("a775f6"));
    Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 1.2);
    });
});
 */
var effectL = new StatusEffect("ZT3");
effectL.color = Color.valueOf("ffffff");
effectL.damage = 1.6666667
effectL.reloadMultiplier = 0;//射击速度
//effectL.effect = FxL;
effectL.effect = Fx.bubble;

var shangdilizi2 = new JavaAdapter(MissileBulletType, {});
//shangdilizi2.splashDamageRadius = 25;
//shangdilizi2.splashDamage = 15;
shangdilizi2.width = 12;
shangdilizi2.damage = 40;//15
shangdilizi2.height = 20;
shangdilizi2.trailEffect = Fx.none;
shangdilizi2.lifetime = 200;
shangdilizi2.speed = 6;
shangdilizi2.backColor = Color.valueOf("f6fe76"); //背景颜色
shangdilizi2.frontColor = Color.valueOf("7936f4"); //前面颜色
shangdilizi2.status = effectL; //效果
shangdilizi2.statusDuration = 480//效果时间8秒
shangdilizi2.hitEffect = Fx.flakExplosion
shangdilizi2.pierce = true;
shangdilizi2.pierceCap = 6;

var shangdilizi1 = new JavaAdapter(BasicBulletType, {});
shangdilizi1.damage = 900; //伤害300
shangdilizi1.width = 20; //宽
shangdilizi1.height = 30; //高
shangdilizi1.speed = 6;
shangdilizi1.homingRange = 2000;
shangdilizi1.homingPower = 5;
shangdilizi1.lifetime = 80; //子弹最远距离
shangdilizi1.hitEffect = Fx.plasticExplosion;
shangdilizi1.backColor = Color.valueOf("f6fe76"); //背景颜色
shangdilizi1.frontColor = Color.valueOf("7936f4"); //前面颜色
shangdilizi1.reloadMultiplier = 0.02; //装弹速度0.15
shangdilizi1.ammoMultiplier = 30; //装弹数量
shangdilizi1.status = effectL; //效果:定身
shangdilizi1.statusDuration = 30
shangdilizi1.fragBullets = 50;
shangdilizi1.fragBullet = shangdilizi2;

const PenHuo2 = require('paota/PenHuo');//喷火器
//const PenHuo = PenHuo2//喷火器

const bawang = extend(ItemTurret, 'bawang', {})//霸王
bawang.ammoTypes.put(weijing1, Wweijing1);
bawang.ammoTypes.put(weijing2, Wweijing2);
bawang.ammoTypes.put(monengjing1, Wmonengjing);
bawang.ammoTypes.put(monengjing2, Wmonengjing2);
bawang.ammoTypes.put(chuangshilizi, shangdilizi1);
//bawang.itemCapacity = 50;
bawang.health = 2100;
bawang.inaccuracy = 8; //精准
bawang.size = 4;
//bawang.ammoPerShot=2;//每发消耗的资源
bawang.targetAir = true; //空
bawang.targetGround = true; //地
bawang.coolantMultiplier = 0.3; //液体冷却倍率
bawang.itemCapacity = 50; //资源容量
bawang.reloadTime = 30; //每秒发射数60:1;30:2
bawang.range = 480;
bawang.liquidCapacity = 20; //液体容量
bawang.shootSound = Sounds.shootBig; //统一射击音效
//bawang.consumes.power(3.2);
bawang.requirements = ItemStack.with(
    Items.lead, 1120,
    Items.copper, 1260,
    jin, 330,
    weijing1, 130,
    weijing2, 60,
    guijingti, 450
);
bawang.buildVisibility = BuildVisibility.shown;
bawang.category = Category.turret;
lib.addToResearch(bawang, { parent: Blocks.ripple.name, });
exports.bawang = bawang;

//原版海啸
Blocks.tsunami.ammoTypes.put(liziye, (() => {
    const v = newIonBoltBulletType(liziye);
    v.speed = 4;
    v.damage = 6.32;
    return v;
})());

Blocks.tsunami.ammoTypes.put(qiangxiaolengqueye, (() => {
    const v = new LiquidBulletType(qiangxiaolengqueye);
    v.speed = 6;
    v.damage = 0.2;
    v.lifetime = 30
    //v.status = StatusEffects.unmoving; //效果:定身
    //v.statusDuration = 30
    return v;
})());




const ronghui3 = new JavaAdapter(LaserTurret, {//审判
}, 'ronghui3');
exports.ronghui3 = ronghui3;

var aassaas = (() => {
    const SPEED = 4;

    const laser1 = new JavaAdapter(ContinuousLaserBulletType, {
    }, 70);
    laser1.colors = [Color.valueOf("ec555555"), Color.valueOf("ec8888aa"), Color.valueOf("ff6c6a"), Color.white];
    laser1.width = 10;
    laser1.largeHit = true;
    laser1.length = 110
    laser1.hitEffect = Fx.hitMeltdown
    laser1.hitColor = Pal.meltdownHit
    laser1.drawSize = 420
    laser1.incendChance = 0.4
    laser1.incendSpread = 5
    laser1.incendAmount = 1

    const laser2 = new JavaAdapter(ContinuousLaserBulletType, {
    }, 40);
    laser2.colors = [Color.valueOf("ec745855"), Color.valueOf("ec7458aa"), Color.valueOf("ff9c5a"), Color.white];
    laser2.width = 10;
    laser2.largeHit = true;
    laser2.length = 110
    laser2.hitEffect = Fx.hitMeltdown
    laser2.hitColor = Pal.meltdownHit
    laser2.drawSize = 420
    laser2.incendChance = 0.4
    laser2.incendSpread = 5
    laser2.incendAmount = 1

    const bt = new JavaAdapter(BasicBulletType, {
        init(b) {
            if (!b) { return; }
            if (!b.data) { b.data = {}; }
            b.data.bullet1 = laser1.create(b, b.x, b.y, 0);
            b.data.bullet2 = laser1.create(b, b.x, b.y, 120);
            b.data.bullet3 = laser1.create(b, b.x, b.y, 240);
            b.data.bullet4 = laser2.create(b, b.x, b.y, 0);
            b.data.bullet5 = laser2.create(b, b.x, b.y, 120);
            b.data.bullet6 = laser2.create(b, b.x, b.y, 240);
            b.data.bulletRot = 0;
            b.data.direction = b.id % 2 == 0;
        },
        update(b) {
            this.super$update(b);
            b.data.bulletRot += SPEED;
            b.data.bullet1.time = 0;
            b.data.bullet2.time = 0;
            b.data.bullet3.time = 0;
            b.data.bullet4.time = 0;
            b.data.bullet5.time = 0;
            b.data.bullet6.time = 0;
            b.data.bullet1.set(b.x, b.y);
            b.data.bullet2.set(b.x, b.y);
            b.data.bullet3.set(b.x, b.y);
            b.data.bullet4.set(b.x, b.y);
            b.data.bullet5.set(b.x, b.y);
            b.data.bullet6.set(b.x, b.y);
            if (b.data.direction) {
                b.data.bullet1.rotation(b.rotation() + b.data.bulletRot);
                b.data.bullet2.rotation(b.rotation() + b.data.bulletRot + 120);
                b.data.bullet3.rotation(b.rotation() + b.data.bulletRot + 240);
                b.data.bullet4.rotation(b.rotation() + b.data.bulletRot + 60);
                b.data.bullet5.rotation(b.rotation() + b.data.bulletRot + 180);
                b.data.bullet6.rotation(b.rotation() + b.data.bulletRot + 300);
            } else {
                b.data.bullet1.rotation(b.rotation() - b.data.bulletRot);
                b.data.bullet2.rotation(b.rotation() - b.data.bulletRot + 120);
                b.data.bullet3.rotation(b.rotation() - b.data.bulletRot + 240);
                b.data.bullet4.rotation(b.rotation() - b.data.bulletRot + 60);
                b.data.bullet5.rotation(b.rotation() - b.data.bulletRot + 180);
                b.data.bullet6.rotation(b.rotation() - b.data.bulletRot + 300);
            }
        },
    });
    bt.sprite = "duo";
    bt.reloadMultiplier = 1
    bt.ammoMultiplier = 1;
    bt.damage = 1400;
    bt.width = 6;
    bt.height = 6;
    bt.shrinkY = 0;
    bt.shrinkX = 0;
    bt.spin = 0;
    bt.lifetime = 500;
    bt.backColor = Color.valueOf("ffffff00");
    bt.frontColor = Pal.meltdownHit;
    bt.despawnEffect = Fx.none;
    bt.speed = 2;
    bt.collides = false;
    bt.reflectable = false;
    bt.absorbable = true;
    return bt;
})()
var ffffffaa = new JavaAdapter(LaserBulletType, {}, 70);
ffffffaa.hitEffect = Fx.hitLancer;
ffffffaa.despawnEffect = Fx.none;
ffffffaa.hitSize = 4;
ffffffaa.lifetime = 16;
ffffffaa.drawSize = 400;
ffffffaa.collidesAir = false;
ffffffaa.length = 173;
ffffffaa.fragBullet = aassaas;
ffffffaa.length = 1;
ffffffaa.width = 1;

const turrett = new JavaAdapter(PowerTurret, {
}, 'ronghui2');

turrett.cooldown = 0.04;
turrett.recoilAmount = 1.5;
turrett.liquidCapacity = 10;
turrett.buildVisibility = BuildVisibility.shown;
turrett.category = Category.turret;
turrett.health = 1800;
turrett.size = 3;
turrett.range = 320;
turrett.rotateSpeed = 15;
turrett.inaccuracy = 2;
turrett.shots = 1;
turrett.burstSpacing = 0;
turrett.xRand = 0;
turrett.requirements = ItemStack.with(
    Items.copper, 200,
    Items.silicon, 130,
    Items.thorium, 110,
);
turrett.shootType = aassaas
exports.tiansha = turrett;

const rainbowRegions = [];
const youling2 = new JavaAdapter(PowerTurret, {
    load() {
        this.super$load();
        for (var i = 0; i < 9; i++) {
            rainbowRegions[i] = Core.atlas.find("creator-youling22-" + (i + 1));
        }
    },
}, 'youling2');
youling2.buildType = prov(() => {
    const tif = 9;//贴图间的延迟变色速度，越大越不同
    const tid = 4;//贴图变色速度，越大越快
    const tr2 = new Vec2();
    return new JavaAdapter(PowerTurret.PowerTurretBuild, {
        draw() {
            this.super$draw();
            // tr2.trns(this.rotation, -this.recoil);
            Draw.blend(Blending.additive);
            for (var h = 0; h < tif; h++) {
                Draw.color(Color.valueOf("ff0000").shiftHue((Time.time * tid) + (h * (360 / tif))));
                Draw.rect(rainbowRegions[h], this.x, this.y, this.rotation - 90);
            }
            Draw.blend();
            Draw.color();
        },

    }, youling2);
});
const ronghui4 = new JavaAdapter(LaserTurret, {
}, 'ronghui4');




// 必死炮
const destoryBeamBulletType = (() => {
    const THE_COLOR = Color.purple;

    const fragBulletType = (() => {

        const hitEffect = lib.newEffect(8, (e) => {
            Draw.color(Color.black, THE_COLOR, e.fin());
            Lines.stroke(0.5 + e.fout());
            Lines.circle(e.x, e.y, e.fin() * 10);
        });

        const despawnEffect = lib.newEffect(8, (e) => {
            Draw.color(Color.black, THE_COLOR, e.fin());
            Lines.stroke(0.5 + e.fout());
            Lines.circle(e.x, e.y, e.fin() * 5);
        });

        const bt = extend(BasicBulletType, {
            hitEntity(b, other, initialHealth) {
                if (other && other.kill) {
                    other.kill();
                }
            },
            hitTile(b, tile, health, direct) {
                this.super$hitTile(b, tile, health, direct);
                if (tile && tile.team != b.team) {
                    Tile.tileDestroyed(tile);
                }
            },
            draw(b) {
                Draw.color(THE_COLOR);
                // Lines.stroke(1);
                // Lines.lineAngleCenter(b.x, b.y, b.rotation(), 6);
                // Draw.color(Color.white);
                // Lines.lineAngleCenter(b.x, b.y, b.rotation(), 1);

                Drawf.tri(b.x, b.y, 4, 8, b.rotation());
                Drawf.tri(b.x, b.y, 4, 12, b.rotation() - 180);
                Draw.reset();
            },
            update(b) {
                // Rewrite homing power (adds a delay) trail logic
                if (this.homingPower > 0.0001 && b.time > 12) {
                    var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange,
                        boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)),
                        boolf(t => this.collidesGround)
                    );
                    if (target != null) {
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower));
                    }
                }
            },
        });
        bt.pierce = true;
        bt.pierceCap = 6;
        bt.pierceBuilding = false;
        bt.healPercent = 500;
        bt.speed = 3.5;
        bt.damage = Infinity;
        bt.homingPower = 0.3;
        bt.homingRange = 50;
        bt.splashDamage = 3;
        bt.splashDamageRadius = 10;
        bt.hitEffect = hitEffect;
        bt.despawnEffect = despawnEffect;
        bt.lifetime = 22;
        bt.shootEffect = Fx.none;
        return bt;
    })();

    const tailEffectTime = 12;
    const tailEffect = lib.newEffect(tailEffectTime, e => {
        Draw.color(Color.black, THE_COLOR, Math.max(0, e.fout() * 2 - 1));
        Drawf.tri(e.x, e.y, 8 * e.fout(), 16, e.rotation);
        Drawf.tri(e.x, e.y, 8 * e.fout(), 30 * Math.min(1, e.data.time / 8 * 0.8 + 0.2), e.rotation - 180);
    });

    const hitEffect = lib.newEffect(8, (e) => {
        Draw.color(Color.black, THE_COLOR, e.fin());
        Lines.stroke(0.5 + e.fout());
        Lines.circle(e.x, e.y, e.fin() * 30);
    });

    const despawnEffect = lib.newEffect(8, (e) => {
        Draw.color(Color.black, THE_COLOR, e.fin());
        Lines.stroke(0.5 + e.fout());
        Lines.circle(e.x, e.y, e.fin() * 5);
    });

    const bt = extend(BasicBulletType, {
        hitTile(b, tile, health, direct) {
            this.super$hitTile(b, tile, health, direct);
            if (tile && tile.team != b.team) {
                Tile.tileDestroyed(tile);
            }
        },
        draw(b) {
            Draw.color(THE_COLOR);
            // Lines.stroke(2);
            // Lines.lineAngleCenter(b.x, b.y, b.rotation(), 15);
            // Draw.color(Color.white);
            // Lines.lineAngleCenter(b.x, b.y, b.rotation(), 1);

            Drawf.tri(b.x, b.y, 8, 16, b.rotation());
            Drawf.tri(b.x, b.y, 8, 30 * Math.min(1, b.time / this.speed * 0.8 + 0.2), b.rotation() - 180);
            Draw.reset();
        },
        update(b) {
            // Rewrite homing power (adds a delay) trail logic
            if (this.homingPower > 0.0001 && b.time > 25) {
                var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange,
                    boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)),
                    boolf(t => this.collidesGround)
                );
                if (target != null) {
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower));
                }
            }

            if (b.timer.get(1, 1)) {
                tailEffect.at(b.x, b.y, b.rotation(), THE_COLOR, { time: ((v) => v)(b.time) });
            }
        },
    });
    bt.pierce = true;
    bt.pierceCap = 6;
    bt.pierceBuilding = false;
    bt.hitSize = 8;
    bt.healPercent = 1000;
    bt.speed = 6;
    bt.damage = Infinity;
    bt.homingPower = 0.3;
    bt.homingRange = 240;
    bt.splashDamage = Infinity;
    bt.splashDamageRadius = 30;
    bt.shootEffect = Fx.none;
    bt.hitEffect = hitEffect;
    bt.despawnEffect = despawnEffect;
    bt.fragBullet = fragBulletType;
    bt.fragBullets = 6;
    bt.lifetime = 70;
    return bt;
})();

const turret = extendContent(Turret, 'bisipao', {
    canPickup(){
        //cores can never be picked up
        return false;
    },
    load() {
        this.super$load();
        this.baseRegion = lib.loadRegion2("bisipao-base");
    },
    // generateIcons(){
    //     const list = this.super$generateIcons();
    //     list[0] = Core.atlas.find(lib.modName + "-bisipao-base");
    //     list[1] = Core.atlas.find(this.name);
    //     return list;
    // },
});//

lib.setBuildingSimple(turret, Turret.TurretBuild, {
    hasAmmo() { return true; },
    canPickup() { return false },
    peekAmmo() { return destoryBeamBulletType; },
    useAmmo() { return destoryBeamBulletType; },
});
turret.coolantUsage = 0;//液体加速
turret.buildVisibility = BuildVisibility.sandboxOnly,
    turret.targetInterval = 0;
turret.category = Category.turret;
turret.health = 6000;
turret.size = 1;
turret.reloadTime = 10;
turret.range = 400;
turret.inaccuracy = 15;
turret.rotateSpeed = 20;
turret.targetInterval = 0;
turret.shootCone = 80;
turret.shootSound = Sounds.shootBig;
exports.turret = turret;

// const FangKong2 = new JavaAdapter(PowerTurret, {}, 'fangkong2');//防空
// FangKong2.size = 16;
// FangKong2.health = 400;
// FangKong2.buildCostMultiplier = 1;
// FangKong2.heatColor = Color.valueOf("6ef6ff");
// FangKong2.shootEffect = Fx.none;
// FangKong2.smokeEffect = Fx.none;
// FangKong2.ammoUseEffect = Fx.none;
// FangKong2.ammoPerShot = 1;
// FangKong2.range = 200;
// FangKong2.reload = 4;
// FangKong2.inaccuracy = 1;
// FangKong2.shots = 1;
// FangKong2.spread = 6;
// FangKong2.recoil = 0.1;
// FangKong2.restitution = 0.02;
// FangKong2.cooldown = 0.02;
// FangKong2.rotatespeed = 8;
// FangKong2.shootShake = 0.2;
// FangKong2.collidesGround = false
// FangKong2.targetAir = true;
// FangKong2.targetGround = false;
// FangKong2.coolantMultiplier = 2;
// FangKong2.coolEffect = Fx.steam;
// FangKong2.powerUse = 0.5;
// FangKong2.shootType = (() => {
//     const a = new JavaAdapter(BasicBulletType, {});
//     a.bulletWidth = 50;
//     a.bulletHeight = 50;
//     a.bulletShrink = 0.5;
//     a.lifetime = 130;
//     a.speed = 8;
//     a.damage = Infinity;
//     a.collidesGround = false//子弹碰撞地面
//     a.hitSize = 8;
//     a.drawSize = 40;
//     a.backColor= Color.valueOf("cff0f1"); //背景颜色
//     a.frontColor= Color.valueOf("49d5f9"); //前面颜色
//     a.drag = 0;
//     a.pierce = true;
//     a.hitEffect = Fx.melting;
//     a.despawnEffect = Fx.despawn;
//     a.hitSound = Sounds.none;
//     a.status = StatusEffects.melting;
//     a.statusDuration = 300
//     return a;
// })()
// FangKong2.requirements = ItemStack.with();
// FangKong2.shootSound = fangkongSound
// FangKong2.buildVisibility = BuildVisibility.sandboxOnly;
// FangKong2.category = Category.turret;