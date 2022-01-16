/* const poison = extend(StatusEffect, "poison", {
    init(){
        this.affinity(StatusEffects.melting, ((unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            Fx.burning.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(poison, time);
        }));
    },
    setStats(){
        this.stats.add(Stat.abilities, Core.bundle.format("status.btm-poison.ability",""));
        this.super$setStats();
    },
});
poison.transitionDamage = 30;
poison.color = Color.valueOf("#CBD97F");
poison.speedMultiplier = 0.4;
poison.damage = 1.8;
poison.healthMultiplier = 0.7;
poison.effect = Fx.oily;
poison.reactive = true;
exports.poison = poison; */

//---------//@guiY 编写

const  steam = new Effect(35, cons(e => {
    Draw.color(Color.valueOf("3769f6"));

    Angles.randLenVectors(e.id, 2, 2 + e.fin() * 7, (x, y) => {
        Fill.circle(e.x + x, e.y + y, 0.2 + e.fslope() * 1.5);
    });
}));

const speedUp = extend(StatusEffect, "speedUp", {
    /*init(){
        this.opposite(speedDown);
    },*/
});
speedUp.buildDamageMultiplier = 2;
speedUp.damageMultiplier = 2.5;
speedUp.reloadMultiplier = 1.5;
speedUp.effect = steam;
speedUp.statusDuration = 8;//状态持续时间
exports.speedUp = speedUp;

const speedDown = extend(StatusEffect, "speedDown", {
    /*init(){
        this.opposite(speedUp);
    },*/
});
speedDown.damageMultiplier = 0.5;
speedDown.reloadMultiplier = 0.5;
speedDown.effect = Fx.steam;
exports.speedDown = speedDown;