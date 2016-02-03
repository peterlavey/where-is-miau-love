/**
 * a HUD container and child items
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');
        // persistent across level change
        this.isPersistent = true;
        // make sure we use screen coordinates
        this.floating = true;
        // make sure our object is always draw first
        this.z = Infinity;
        // give a name
        this.name = "HUD";
        // add our child score object at the top left corner me.game.world.width
        this.addChild(new game.HUD.ScoreItem(me.game.world.width * .55, me.game.world.height * .1));
        this.addChild(new game.HUD.Heart(me.game.world.width * .55, me.game.world.height * .1));
    }
});
game.HUD.Heart = me.Renderable.extend({
  init:function(x, y){
    this._super(me.Renderable, 'init', [x, y, 32, 32]);
    var heart = new me.Sprite(
      x*.5,
      y*.5,
      {
        image:me.loader.getImage("heart"),
      }
    )
    heart.floating=true;
    heart.isPersistent=true;
    me.game.world.addChild(heart, 1);
  },
  update:function(){
    if (this.heart !== game.data.heart) {
        this.heart = game.data.heart;
        return true;
    }
    return false;
  }
});
game.HUD.ScoreItem = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, 'init', [x, y, 40, 40]);
        this.font = new me.BitmapFont("font", 32);
        this.font.set("right");
        this.score = -1;
    },
    update : function () {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },
    draw : function (renderer) {
      this.font.draw(renderer, game.data.score, this.pos.x, this.pos.y);
    }
});
