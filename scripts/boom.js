const lib = require('lib');
(() => {
    // 爆炸热量（60 = 1秒）
    const BOMB_OVERHEAT = 120;
    // 开始冒烟
    const SMOKE_THRESHOLD = 30;
    // 冒烟特效
    const SMOKE_EFFECT = Fx.reactorsmoke;
    // 爆炸音效
    const EXPLODE_SOUND = Sounds.explosionbig;
    // 爆炸特效
    const EXPLODE_EFFECT = Fx.nuclearShockwave;
    // 持续爆炸特效
    const EXPLODE_EFFECT_SMALL = Fx.explosion;
    // 爆炸烟雾
    const EXPLODE_SMOKE_EFFECT = Fx.nuclearcloud;
    // 爆炸范围（格子数）
    const EXPLOSION_RADIUS = 500;
    // 随机产生的小型爆炸范围（格子数）
    const EXPLOSION_SMALL_RADIUS = 15;
    // 爆炸伤害Infinity
    const EXPLOSION_DAMAGE = 5000000;
    // 随机产生的小型爆炸伤害
    const EXPLOSION_SMALL_DAMAGE = 800;
    // 小型爆炸数量
    const EXPLOSION_SMALL_COUNT = 20;
    // 小型爆炸分散距离（格子）
    const EXPLOSION_SMALL_SPLASH_RANGE = 15;

    const tr = new Packages.arc.math.geom.Vec2();
    const bomb1EntityProv = prov(() => {

        var heat = 0.0;

        const entity = extend(TileEntity, {
            getHeat() { return heat; },
            setHeat(v) { heat = v; },
            write(stream) {
                this.super$write(stream);
                stream.writeFloat(heat);
            },
            read(stream, revision) {
                this.super$read(stream, revision);
                heat = stream.readFloat();
            },
        });

        return entity;
    });

    const bomb1Block = extendContent(Block, "boom", {
        isPlaceable() { return lib.techDsAvailable() && this.super$isPlaceable(); },
        load() {
            this.super$load();
            this.update = true;
            this.entityType = bomb1EntityProv;
        },
        drawPlace(x, y, rotation, valid) {
            const range = EXPLOSION_RADIUS;
            const tilesize = Vars.tilesize;
            Lines.stroke(1);
            Draw.color(Pal.accent);
            Drawf.circles(x * tilesize, y * tilesize, range * tilesize);
            Draw.reset();
        },
        drawSelect(tile) {
            this.super$drawSelect(tile);
            const range = EXPLOSION_RADIUS;
            const tilesize = Vars.tilesize;
            Lines.stroke(1);
            Draw.color(Pal.accent);
            Drawf.circles(tile.drawx(), tile.drawy(), range * tilesize);
            Draw.reset();
        },
        setBars() {
            this.super$setBars();
            this.bars.add("heat", func(entity => new Bar("bar.heat", Pal.lightOrange, new Packages.arc.func.Floatp({
                get: () => entity.heat / BOMB_OVERHEAT
            }))));
        },
        update(tile) {
            const entity = tile.ent();
            if (entity.cons.valid()) {
                entity.heat += entity.efficiency();
            }
            entity.heat = Mathf.clamp(entity.heat, 0, BOMB_OVERHEAT);
            if (entity.heat >= SMOKE_THRESHOLD) {

                var smoke = 1.0 + (entity.heat - SMOKE_THRESHOLD) / (BOMB_OVERHEAT - SMOKE_THRESHOLD);
                if (Mathf.chance(smoke / 20.0 * Time.delta())) {
                    Effects.effect(SMOKE_EFFECT, tile.worldx() + Mathf.range(this.size * Vars.tilesize / 2),
                        tile.worldy() + Mathf.random(this.size * Vars.tilesize / 2));
                }
            }
            if (entity.heat >= BOMB_OVERHEAT) {
                entity.kill();
            }
        },
        onDestroyed(tile) {
            this.super$onDestroyed(tile);

            EXPLODE_SOUND.at(tile);

            Effects.shake(6, 16, tile.worldx(), tile.worldy());
            Effects.effect(EXPLODE_EFFECT, tile.worldx(), tile.worldy());
            for (var i = 0; i < 6; i++) {
                Time.run(Mathf.random(40), run(() => Effects.effect(EXPLODE_SMOKE_EFFECT, tile.worldx(), tile.worldy())));
            }

            Damage.damage(tile.worldx(), tile.worldy(), EXPLOSION_RADIUS * Vars.tilesize, EXPLOSION_DAMAGE);

            for (var i = 0; i < EXPLOSION_SMALL_COUNT; i++) {
                Time.run(Mathf.random(60), run(() => {
                    tr.rnd(Mathf.random(EXPLOSION_SMALL_SPLASH_RANGE * Vars.tilesize));
                    var addx = tr.x + this.size / 2;
                    var addy = tr.y + this.size / 2;
                    Effects.effect(EXPLODE_EFFECT_SMALL, addx + tile.worldx(), addy + tile.worldy());
                    Damage.damage(addx + tile.worldx(), addy + tile.worldy(), EXPLOSION_SMALL_RADIUS * Vars.tilesize, EXPLOSION_SMALL_DAMAGE);
                }));
            }

            for (var i = 0; i < 70; i++) {
                Time.run(Mathf.random(80), run(() => {
                    tr.rnd(Mathf.random(120));
                    Effects.effect(EXPLODE_SMOKE_EFFECT, tr.x + tile.worldx(), tr.y + tile.worldy());
                }));
            }
        }
    });
    bomb1Block.size = 4;
    bomb1Block.buildCostMultiplier = 0.1;
    bomb1Block.requirements = ItemStack.with(
        Items.copper, 1);
    bomb1Block.buildVisibility = BuildVisibility.shown;
    bomb1Block.category = Category.turret;
    bomb1Block.health = 200;

})();
