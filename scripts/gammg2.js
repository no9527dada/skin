var cogs = Color.valueOf("6dd8fe");
const effect2 = new Effect(80, e => {
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
Events.run(Trigger.draw, () => {
    Groups.unit.each(cons(u => {
        if (u.type == UnitTypes.beta && u == Vars.player.unit()) {
            var z = Draw.z();
            Draw.z(Layer.flyingUnit - 0.5);
            Draw.color(cogs);
            Draw.alpha(1);
            Draw.rect(Core.atlas.find("skin-gammaSplus-1"), u.x, u.y, Time.time * 0.6);
            Draw.reset();
            Draw.z(z);
        }
    }));
});
Events.run(Trigger.draw, () => {
    Groups.unit.each(cons(u => {
        if (u.type == UnitTypes.incite && u == Vars.player.unit()) {
            var z = Draw.z();
            Draw.z(Layer.flyingUnit - 0.5);
            Draw.color(cogs);
            Draw.alpha(1);
            Draw.rect(Core.atlas.find("skin-gammaSplus-1"), u.x, u.y, Time.time * 0.6);
            Draw.reset();
            Draw.z(z);
        }
    }));
});
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
UnitTypes.beta.abilities.add(w)
UnitTypes.beta.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 3.9;
        w.y = 3;
        w.color = cogs;
        w.mirror = true;
        w.radius = 5;
        w.phase = 40;
        w.stroke = 1;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);
UnitTypes.beta.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 4.9;
        w.y = -3;
        w.color = cogs;
        w.mirror = true;
        w.radius = 5;
        w.phase = 40;
        w.stroke = 1;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);

UnitTypes.incite.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 0;
        w.y = 5.5;
        w.color = cogs;
        w.radius = 8;
        w.phase = 90;
        w.stroke = 3;
        w.layerOffset = -0.001;
        w.color = Color.valueOf("bf92f9");
        return w;
    })()
);
UnitTypes.incite.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 3.5;
        w.y = 0;
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
UnitTypes.incite.parts.add(
    (() => {
        const w = new HoverPart()
        w.x = 4.8;
        w.y = -4.2;
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
UnitTypes.incite.abilities.add(w);
