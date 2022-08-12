var cogs = Color.valueOf("6dd8fe");
const effect2 = new Effect(45, e => {
    Draw.color(Color.valueOf("ab83f6ff"), e.color, e.fin());
    Lines.stroke(e.fout() * 1 + 0.5);
    Angles.randLenVectors(e.id, 10, 100 * e.fin(), e.rotation, 5, (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 0.5);
        
    });
    Draw.color(cogs, e.color, e.fin());
    Angles.randLenVectors(e.id, 5, 3.5 + e.fin() * 12, (x, y) => {
        Fill.circle(e.x + x, e.y + y, 0.1 + e.fout() * 1.4);
    });
})
const moveEffect = (x, y, c, e, i) => {
    var ability = new JavaAdapter(MoveEffectAbility, {
        localized() {
            return "2";
        },
        update(unit) {
            if (unit != Vars.player.unit()) return;
            this.super$update(unit)
        },
        copy() {
            return moveEffect(x, y, c, e, i);
        },
    });
    ability.x = x
    ability.y = y
    ability.color = c
    ability.effect = e
    ability.interval = i

    ability.minVelocity = 0.4;
    ability.rotateEffect = true;
    ability.effectParam = 2;
    ability.rotation = 180
    ability.teamColor = true;

    return ability;
};

const w = moveEffect(0, -3, cogs, effect2, 3);
UnitTypes.alpha.abilities.add(w)
UnitTypes.alpha.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 3.9;
        w.y = 3;
        w.color = cogs;
        w.mirror = true;
        w.radius = 4;
        w.phase = 50;
        w.stroke = 1;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);
UnitTypes.alpha.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 4.9;
        w.y = -3;
        w.color = cogs;
        w.mirror = true;
        w.radius = 5;
        w.phase = 70;
        w.stroke = 1;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);

UnitTypes.evoke.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 0;
        w.y = 3;
        w.color = cogs;
        w.mirror = true;
        w.radius = 8;
        w.phase = 90;
        w.stroke = 3;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);
UnitTypes.evoke.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 5.2;
        w.y = -3.4;
        w.color = cogs;
        w.mirror = true;
        w.radius = 7;
        w.phase = 60;
        w.stroke = 2;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);
UnitTypes.evoke.abilities.add(w);
