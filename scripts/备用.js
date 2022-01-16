const 流血 = extend(StatusEffect, "流血", {
    init(){
        this.affinity(StatusEffects.melting, ((unit, time, newTime, result) => {
            unit.damagePierce(this.transitionDamage);
            Fx.melting.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(poison, time);
        }));
    },
});
exports.流血 = 流血; 