//本JS是关于地面地板和一些状态
const wupin = require('wupin');

//---------------------@部分神魂编写

//离子液
exports.ionBurningEffect1 = (() => {
    const fxIonBurning = new Effect(35, cons(e => {
        Draw.color(Color.valueOf("ff0000"));

        Lines.stroke(0.3 + e.fout() * 0.5);

        Angles.randLenVectors(e.id, 5, e.fin() * 22, new Floatc2({
            get: (x, y) => {
                var ang = Mathf.angle(x, y);
                Lines.lineAngle(e.x + x, e.y + y, ang, e.fin() * 0.5 + 1);
            }
        }));
    }));

    const v = new JavaAdapter(StatusEffect, {
    }, "ion-burning");

    v.color = Color.valueOf("ff0000");
    v.damage = 0.6;
    v.healthMultiplier = 0.5;//血量倍率
    v.damageMultiplier = 0.8;//攻击倍率
    v.effect = fxIonBurning;

    v.init(run(() => {
        v.opposite(StatusEffects.wet, StatusEffects.freezing/* exports.timeFreezingEffect */);
    }));

    return v;
})();

const wusha = extend(Floor, "wusha", {});//污沙
wusha.itemDrop = Items.sand;
wusha.playerUnmineable = true;
wusha.variants = 3;
wusha.attributes.set(Attribute.spores, 0.1,);
wusha.attributes.set(Attribute.oil, 1.8);