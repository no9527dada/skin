exports.none = (() => { //无
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("ffffffee");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 0; //外圈大小
    D.flameRadiusIn = 0; //内圈大小
    D.flameRadiusScl = 5; //总体收缩速度
    D.flameRadiusMag = 0; //外圈扩张大小
    D.flameRadiusInMag = 0; //内圈扩张大小
    return D;
})();
exports.shiyingronglu = (() => { //石英
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("DADADA");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 1; //外圈大小
    D.flameRadiusIn = 0.5; //内圈大小
    D.flameRadiusScl = 3; //总体收缩速度
    D.flameRadiusMag = 2; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.jiweijinggongchang1 = (() => { //微晶工厂
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("E6EC94");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 1; //外圈大小
    D.flameRadiusIn = 0.5; //内圈大小
    D.flameRadiusScl = 3; //总体收缩速度
    D.flameRadiusMag = 1.5; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.jiweijinggongchang2 = (() => { //微晶工厂2
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("96E47F");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 3; //外圈大小
    D.flameRadiusIn = 2.2; //内圈大小
    D.flameRadiusScl = 3.5; //总体收缩速度
    D.flameRadiusMag = 1.5; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.jiweijinggongchang5 = (() => { //微晶工厂5
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("FF8F8D");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 3; //外圈大小
    D.flameRadiusIn = 2.3; //内圈大小
    D.flameRadiusScl = 2.5; //总体收缩速度
    D.flameRadiusMag = 1; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.jiweijinggongchang21 = (() => { //超级微晶工厂2
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("e47f7f");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 6; //外圈大小
    D.flameRadiusIn = 4.3; //内圈大小
    D.flameRadiusScl = 2; //总体收缩速度
    D.flameRadiusMag = 2; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.budingjiagongchang2 = (() => { //布丁2
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("FFD59E");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 4.9; //外圈大小
    D.flameRadiusIn = 3; //内圈大小
    D.flameRadiusScl = 2; //总体收缩速度
    D.flameRadiusMag = 2; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.weijingfenjieji = (() => { //微晶分解机
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("E6EC94");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 3; //外圈大小
    D.flameRadiusIn = 2.2; //内圈大小
    D.flameRadiusScl = 3.5; //总体收缩速度
    D.flameRadiusMag = 1.5; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.zijinggongchang = (() => { //紫晶
    const D = extend(DrawSmelter, {});
    D.flameColor = Color.valueOf("c19cef");
    D.lightRadius = 60;
    D.lightAlpha = 0.65;
    D.lightSinScl = 10;
    D.lightSinMag = 5;
    D.flameRadius = 4; //外圈大小
    D.flameRadiusIn = 2.5; //内圈大小
    D.flameRadiusScl = 4; //总体收缩速度
    D.flameRadiusMag = 1.5; //外圈扩张大小
    D.flameRadiusInMag = 1; //内圈扩张大小
    return D;
})();
exports.guijingtihechengjiSteam = (() => {
    var D = new Effect(35, e => {
        Draw.color(Color.valueOf("A2B4DD"));
        Angles.randLenVectors(e.id, 2, 0.2 + e.fin() * 3, (x, y) => {
            Fill.circle(e.x + x, e.y + y, 0.2 + e.fslope() * 1.5);
        });
    });
    return D;
})();
exports.jinfentilianjiSmoke = (() => {
    var D = new Effect(50, e => {
        Draw.color(Color.valueOf("D79A56"), Pal.darkishGray, e.fin());
        Fill.circle(e.x, e.y, (7 - e.fin() * 7) / 2);
    });
    return D;
})();
exports.Magmasmoke = (() => {
    var D = new Effect(110, e => {
            Draw.color(Color.gray);
            Fill.circle(e.x, e.y, e.fslope() * 2);

        });
return D;
})();
exports.tuSmeltsmoke = (() => {
    var D= new Effect(15, e => {
        Angles.randLenVectors(e.id, 6, 4 + e.fin() * 5, (x, y)=> {
        Draw.color(Color.valueOf("F8A3C7"), e.color, e.fin());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 2, 45);
    });
});
return D;
})();
exports.taiSmeltsmoke = (() => {
    var D= new Effect(15, e => {
        Angles.randLenVectors(e.id, 6, 4 + e.fin() * 5, (x, y)=> {
        Draw.color(Color.valueOf("A4B8FA"), e.color, e.fin());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 2, 45);
    });
});
return D;
})();
exports.chuangshiyujieBubble = (() => {
    var D= new Effect(20, e => {
        Draw.color(Color.valueOf("f9f9ca"));Lines.stroke(e.fout() + 0.2);
        Angles.randLenVectors(e.id, 2, 1 + 20 * e.fout(), e.rotation, 120, (x, y) => {
            Lines.circle(e.x + x, e.y + y, 1 + e.fin() * 3);
            Drawf.tri(e.x + x, e.y + y, e.fslope() * 3 + 1, e.fslope() * 3 + 1, Mathf.angle(x, y));
        });
    });
    return D;
    })();