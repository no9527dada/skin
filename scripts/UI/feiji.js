const lib = require('lib')

const InvincibleForceFieldAbility = (radius, regen, max, cooldown) => {

    var realRad;
    var paramUnit;
    var paramField;
    var shieldConsumer = cons(trait => {
        if (trait.team != paramUnit.team
            && trait.type.absorbable
            && Intersector.isInsideHexagon(paramUnit.x, paramUnit.y, realRad * 2, trait.x, trait.y)
            && paramUnit.shield > 0) {

            trait.absorb();
            Fx.absorb.at(trait);

            paramField.alpha = 1;
        }
    });

    const ability = new JavaAdapter(ForceFieldAbility, {
        update(unit) {
            unit.shield = Infinity;
            this.radiusScale = Mathf.lerpDelta(this.radiusScale, 1, 0.06)
            realRad = this.radiusScale * this.radius;
            paramUnit = unit;
            paramField = this;
            Groups.bullet.intersect(unit.x - realRad, unit.y - realRad, realRad * 2, realRad * 2, shieldConsumer);
            this.alpha = Math.max(this.alpha - Time.delta / 10, 0);
        },
        copy() {
            return InvincibleForceFieldAbility(radius, regen, max, cooldown);
        },
        draw(unit) {
            this.super$draw(unit);
        },
    }, radius, regen, max, cooldown);

    return ability;
};

const invincibleBulletType = (() => {

    const bt = extend(BasicBulletType, {
        hitEntity(b, other, initialHealth) {
            if (other && other.kill) {
                other.kill();
                if (!other.dead && !Vars.net.client()) {
                    other.health = 0
                    other.dead = true
                    Call.unitDeath(other.id)
                }
            }
        },
        hitTile(b, tile, health, direct) {
            this.super$hitTile(b, tile, health, direct);
            if (tile) {
                Tile.tileDestroyed(tile);
            }
        },
    });
    //bt.collidesTeam = true//子弹碰撞
    bt.scaleVelocity = true;//开启指哪打哪
    bt.width= 10;
    bt.height= 16;
    bt.damage = Infinity;
    bt.splashDamage = Infinity;
    bt.speed = 10;
   // bt.bulletWidth = 7;
    //bt.bulletHeight = 9;
    bt.lifetime = 40;
    bt.inaccuracy = 5;
    bt.despawnEffect = Fx.hitBulletSmall;
    bt.keepVelocity = false;
    return bt;
})();




const invincibleWeaponn = (() => {

    const w = extend(Weapon, {});

      w.name = lib.modName + '-' + 'feiji666-weapon';
    //w.name = Core.bundle.format("feiji666-weapon");
    w.length = 1.5;
    w.reload = 7;
    // w.ejectEffect = Fx.shellEjectSmall;
    w.bullet = invincibleBulletType;
    w.rotate = false;
    //w.rotateSpeed = 20;
    w.x = 3; 
    w.y = 2;
    return w;
})();


const mechh = (() => {
    const m = new UnitType('feiji666');

    m.abilities.add(new RepairFieldAbility(Infinity, 60, 8 * 8));
    // m.abilities.add(new JavaAdapter(ForceFieldAbility, {}, 60, Infinity, Infinity, 300));
    m.abilities.add(InvincibleForceFieldAbility(60, Infinity, Infinity, 300));
    m.constructor = prov(() => extend(UnitTypes.alpha.constructor.get().class, {
        damage(amount) { },
    }));
    m.defaultController = prov(() => new BuilderAI());
    m.weapons.add(invincibleWeaponn);
    m.flying = true; //  m.turnCursor=true; m.isCounted= false;
    m.speed = 120;
    m.hitSize = 12;
    m.accel = 0.01;
    m.rotateSpeed = 5;
    //m.baseRotateSpeed = 20;
    // m.boostMultiplier = 3;
    // m.canBoost = false;
    m.drag = 0.1;
    m.health = 10;
    m.mineSpeed = 50000;
    m.mineTier = 2147483647;
    m.buildSpeed = Infinity;
    m.itemCapacity = 9999;
    m.canHeal = false;
    m.engineOffset = 18;
    m.engineSize = 5;
    m.rotateShooting = true;
    m.payloadCapacity = (200 * 200) * (8 * 8);
    m.ammoCapacity = 5000;

    m.commandLimit = 30;
    m.alwaysUnlocked = true;
    // m.weaponOffsetY = -2;
    // m.weaponOffsetX = 5;

    return m;
})();

exports.mechh = mechh;

const block99 = extendContent(CoreBlock, "hexin", //叛变核心
    {
        setStats(){
            this.stats.add(Stat.buildTime, 0, StatUnit.seconds);
            this.super$setStats();
        },
 isPlaceable() { return lib.techDsAvailable() && this.super$isPlaceable(); },
 canBreak(tile) { return Vars.state.teams.cores(tile.team()).size > 1; },
 canReplace(other) { return other.alwaysReplace; },
 canPlaceOn(tile, team) { return true; },
 placeBegan(tile, previous) { },
 beforePlaceBegan(tile, previous) { },

 drawPlace(x, y, rotation, valid) { },
    });
// block99.config(java.lang.Integer, lib.cons2((tile, i) => {
//     tile.team = Team.get(i);
// }));

const allTeams = [
    Team.derelict, Team.sharded, Team.crux,
    Team.green, Team.purple, Team.blue,
];
lib.setBuildingSimple(block99, CoreBlock.CoreBuild, {
    damage(damage) { },
    handleDamage(tile, amount) { return 0; },

    buildConfiguration(table) {
        const tmp = new ImageButton();
        const g = new ButtonGroup(tmp);
        g.remove(tmp);
        const cont = new Table();
        cont.defaults().size(40);
        var i = 0;
        allTeams.forEach(team => {
            (team => {
                var button = cont.button(Tex.whiteui, Styles.clearToggleTransi, 24, run(() => {
                })).group(g).get();
                button.changed(run(() => {
                    if (button.isChecked()) {
                        this.configure(lib.int(team.id));
                    }
                }));
                button.getStyle().imageUp = Tex.whiteui.tint(team.color.r, team.color.g, team.color.b, team.color.a);
                button.update(run(() => button.setChecked(this.team == team)));

                if (i++ % 3 == 3) {
                    cont.row();
                }
            })(team);
        });
        if (i % 3 != 0) {
            var remaining = 3 - (i % 3);
            for (var j = 0; j < remaining; j++) {
                cont.image(Styles.black6);
            }
        }
        var pane = new ScrollPane(cont, Styles.smallPane);
        pane.setScrollingDisabled(true, false);
        pane.setOverscroll(false, false);
        table.add(pane).maxHeight(Scl.scl(40 * 2)).left();
        table.row();
    },
    configured(builder, value) {
        this.super$configured(builder, value);
        if (builder != null && builder.isPlayer()) {
            const team = Team.get(value);
            builder.team = team;
            builder.getPlayer().team(team);

            this.onRemoved();
            this.team = team;
            this.onProximityUpdate();
        }
    },
});
//block99.unitType = UnitTypes.gamma;

block99.unitType = mechh;
block99.buildVisibility = BuildVisibility.shown;
block99.category = Category.effect;
//exports.block9 = block9;
block99.alwaysUnlocked = true;
block99.size = 3;
block99.hasItems = true;
block99.unloadable = true;
block99.breakable = true;
block99.rebuildable = false;
block99.configurable = true;
block99.health = 2000000;
block99.itemCapacity = 10000;
block99.requirements = ItemStack.with();

