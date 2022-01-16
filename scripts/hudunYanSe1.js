

//代码为guiYMOUR制作，任何复制本代码不得删除此注释
const fp = extendContent(ForceProjector, "hudun2", {});
fp.buildType = prov(() => {
    return new JavaAdapter(ForceProjector.ForceBuild, {
        drawShield(){
            if(!this.broken){
                var radius = this.realRadius();

                Draw.z(Layer.shields);

                //Draw.color(Color.blue/*这里是你要的颜色*/, Color.white, Mathf.clamp(this.hit));
                Draw.color(Color.valueOf("7dafff")/*这里是你要的颜色*/, Color.red, Mathf.clamp(this.hit));

                if(Core.settings.getBool("animatedshields")){
                    Fill.poly(this.x, this.y, 6, radius);
                }else{
                    Lines.stroke(1.5);
                    Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                    Fill.poly(this.x, this.y, 6, radius);
                    Draw.alpha(1);
                    Lines.poly(this.x, this.y, 6, radius);
                    Draw.reset();
                }
            }

            Draw.reset();
        }
    }, fp);
});

//其实完全可以去json里面定义