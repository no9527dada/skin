module.exports = {	
    name: null, 
    techNode(parent2, block, requirements){
        var parent = TechTree.all.find(node => node.content == parent2);
        var node = new TechTree.TechNode(parent, block, requirements);
	}, 

    tex(name) {
	    return Core.atlas.find("creator-" + name);
	}, 

    blends(build, direction) {
	    return PayloadAcceptor.blends(build, direction);
	}, 
	
    node(parent2, block, requirements, objectives){
	    var parent = TechTree.all.find(node => node.content == parent2);
	    var node = new TechTree.TechNode(parent, block, requirements);
	
	    node.objectives.add(objectives);
	}, 

    c(string) {
	    return Color.valueOf(string);
	}, 

    fi(name) {
	    return Vars.content.getByName(ContentType.item, "creator-" + name);
	},

    fs(index) {	
        var spriteName = "creator-" + this.name + index;
	    return spriteName;
	}, 

    fu(name) {
	    return Vars.content.getByName(ContentType.unit, "creator-" + name);
	}, 
	
    fl(name) {
	    return Vars.content.getByName(ContentType.liquid, "creator-" + name);
	}, 

	fb(name) {
	    return Vars.content.getByName(ContentType.block, "creator-" + name);
	}
}

function 矿机AI() { 
    var mineItems = Seq.with(fi("titanium"),exports.fi("jin"), exports.fi("zuankuang"),exports.fi("molishi"), )
    var mining = true
    var targetItem
    var ore
    var timer = new Interval(4)
    var timerTarget = 0, timerTarget2 = 1, timerTarget3 = 2;
    return new JavaAdapter(MinerAI, {
        updateMovement(){
            const core = this.unit.closestCore();
    
            if(!(this.unit.canMine()) || core == null) return;
    
            if(this.unit.mineTile != null && !this.unit.mineTile.within(this.unit, this.unit.type.range)){
                this.unit.mineTile = null
            }
            
            if(mining){
                if(timer.get(timerTarget2, 60 * 4) || targetItem == null){
                    targetItem = mineItems.min(boolf(i => Vars.indexer.hasOre(i) && this.unit.canMine(i)), floatf(i => core.items.get(i)))
                }
    
                if(targetItem != null && core.acceptStack(targetItem, 1, this.unit) == 0){
                    this.unit.clearItem()
                    this.unit.mineTile = null
                    return
                }
                
                if(this.unit.stack.amount >= this.unit.type.itemCapacity || (targetItem != null && !this.unit.acceptsItem(targetItem))){
                    mining = false;
                }else{
                    if(timer.get(timerTarget, 60) && targetItem != null){
                        ore = Vars.indexer.findClosestOre(this.unit, targetItem);
                    }
    
                    if(ore != null){
                        this.moveTo(ore, this.unit.type.range / 2, 20);
    
                        if(this.unit.within(ore, this.unit.type.range)){
                            this.unit.mineTile = ore;
                        }
    
                        if(ore.block() != Blocks.air){
                            mining = false;
                        }
                    }
                }
            }else{
                this.unit.mineTile = null;
    
                if(this.unit.stack.amount == 0){
                    mining = true;
                    return;
                }
    
                if(this.unit.within(core, this.unit.type.range)){
                    if(core.acceptStack(this.unit.stack.item, this.unit.stack.amount, this.unit) > 0){
                        Call.transferItemTo(this.unit, this.unit.stack.item, this.unit.stack.amount, this.unit.x, this.unit.y, core);
                    }
    
                    this.unit.clearItem();
                    mining = true;
                }
                this.circle(core, this.unit.type.range / 1.8)
            }
        },
        updateTargeting(){}
    })}
    exports.kjAI = 矿机AI