const lib = require('lib');
var JSX = new UnitType(UnitType, 'jisu1', {});
JSX.constructor = prov(() => extend(UnitTypes.mono.constructor.get().class, {}));

const BGC = extend(UnitFactory, 'bing-gong-chang', {
  isPlaceable() { return lib.techDsAvailable() && this.super$isPlaceable(); },//非沙盒禁止建造
})//兵工厂
BGC.buildVisibility = buildVisibility.sandboxOnly
BGC.plans = Seq.with(
    new UnitFactory.UnitPlan(UnitTypes.dagger, 60 * 3, ItemStack.with(Items.copper, 1)),
    new UnitFactory.UnitPlan(UnitTypes.JSX, 60 * 3, ItemStack.with(Items.copper, 1))

);




























/* BGC.requirements = ItemStack.with(
  Items.copper, 4200,
  Items.metaglass, 1600,
  Items.silicon, 1200,
  Core.bundle.format(planet.creator.XQ1)
 */