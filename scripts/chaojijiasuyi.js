const jiasu3 = extend(OverdriveProjector, "jiasu3", {});
const jiasu4 = extend(OverdriveProjector, "jiasu4", {});
const jiasu5 = extend(OverdriveProjector, "jiasu5", {});
const jiasu6 = extend(OverdriveProjector, "jiasu6", {});

const { createBuildLimit } = require('GC2');
const xianzhi = createBuildLimit(5);
const chaojijiasuyi = extend(OverdriveProjector, "chaojijiasuyi", {
    canPlaceOn(tile, team) {
        if (!xianzhi.canBuild(team)) {
            return false;
        }
        return this.super$canPlaceOn(tile, team);
    },
    drawPlace(x, y, rotation, valid) {
        if (!Vars.world.tile(x, y)) { return; }
        if (!xianzhi.canBuild(Vars.player.team())) {
            this.drawPlaceText(
                Core.bundle.format("message.creator.ABCD", 5),
                x, y, valid
            );
        }
    },
});
chaojijiasuyi.buildType = prov(() => {
    return new JavaAdapter(OverdriveProjector.OverdriveBuild, {

        add() {
            this.super$add();
            if (this.team != Team.derelict) {
                xianzhi.addBuild(this.team);
            }
        },
        readBase(read) {
            this.super$readBase(read);
            if (this.team != Team.derelict) {
                xianzhi.addBuild(this.team);
            }
        },
        remove() {
            if (this.added) { xianzhi.removeBuild(this.team); }
            this.super$remove();
        },
    }, chaojijiasuyi);
});
chaojijiasuyi.buildVisibility = BuildVisibility.shown;
chaojijiasuyi.category = Category.crafting;
exports.chaojijiasuyi = chaojijiasuyi;