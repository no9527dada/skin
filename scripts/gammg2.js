
Events.run(Trigger.draw, () => {
    Groups.unit.each(cons(u => {
        //if (u == Vars.player.unit());
        if (u.type == UnitTypes.gamma && u == Vars.player.unit()) {
            var z = Draw.z();
            Draw.z(Layer.flyingUnit - 0.5);
            Draw.color(cogs);
            Draw.alpha(1);
            Draw.rect(Core.atlas.find("skin-gammaSplus-1"), u.x, u.y, Time.time * 0.6);
            Draw.rect(Core.atlas.find("skin-gammaSplus-2"), u.x, u.y, -Time.time * 0.6);
            Draw.z(z);
        }
    }));
});
Events.run(Trigger.draw, () => {
    Groups.unit.each(cons(u => {
        if (u.type == UnitTypes.gamma && u == Vars.player.unit()) {
            var z = Draw.z();
            Draw.z(Layer.flyingUnit - 0.5);
            Draw.color(cogs);
            Draw.alpha(1);
            Draw.rect(Core.atlas.find("skin-gammaSplus-1"), u.x, u.y, Time.time * 0.6);
            Draw.rect(Core.atlas.find("skin-gammaSplus-2"), u.x, u.y, -Time.time * 0.6);
            Draw.z(z);
        }
    }));
});
//去掉if就是全部单位
//加上判断type就是限制伽马

var cogs = Color.valueOf("6dd8fe");
var wwee = (
    (() => {
        const w = new MoveEffectAbility(0, -7, Color.valueOf("89f08e"),
            (() => {
                const c = new Effect(130, e => {
                    Draw.color(Color.valueOf("ab83f6ff"), e.color, e.fin());
                    Lines.stroke(e.fout() * 1 + 0.5);
                    Angles.randLenVectors(e.id, 10, 270 * e.fin(), e.rotation, 5, (x, y) => {
                        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 0.5);
                    });
                });
                return c;
            })(), 4);
        w.minVelocity = 1;
        w.rotateEffect = true;
        // w.effectParam = 9;
        w.rotation = 180
        w.teamColor = true;

        return w;
    })()
);
UnitTypes.gamma.abilities.add(wwee);
UnitTypes.gamma.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 3.9;
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
UnitTypes.gamma.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 4.9;
        w.y = -3;
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
UnitTypes.assemblyDrone.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 4.9;
        w.y = -3;
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
UnitTypes.assemblyDrone.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 4.9;
        w.y = -3;
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
UnitTypes.assemblyDrone.abilities.add(wwee);
const bbb = (() => {
    const v = new JavaAdapter(StatusEffect, {
    }, "");
    v.effect = Fx.lightningCharge;
    return v;
})();

Events.run(Trigger.update, () => {
    Vars.player.unit().apply(bbb, java.lang.Float.MAX_VALUE);
});
