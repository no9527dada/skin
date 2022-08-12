    require('gammg');
    require('gammg2');
    require('gammg3');
    const bbb = (() => {
      const v = new JavaAdapter(StatusEffect, {
      }, "skin-1");
      v.effect = Fx.lightningCharge;
      return v;
  })();
  
  Events.run(Trigger.update, () => {
      Vars.player.unit().apply(bbb, java.lang.Float.MAX_VALUE);
  });
  