game.EnemyEntity = me.Entity.extend({
  init:function(x, y, settings){
    settings.image="enemy";

    //Area de movimiento
    var width = settings.width;
    var height = settings.height;

    //Configuración del area de collision
    settings.framewidth = settings.width = 32;
    settings.frameheight = settings.height = 32;

    settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

    //Super constructor
    this._super(me.Entity, 'init', [x, y , settings]);

    //Area de movimiento
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.framewidth
    this.pos.x  = x + width - settings.framewidth;
    this.walkLeft = false;

    //Walk & jump
    this.body.setVelocity(4, 6);
  },
  update:function(dt){
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } else if (!this.walkLeft && this.pos.x >= this.endX) {
        this.walkLeft = true;
      }
      // make it walk
      this.renderable.flipX(this.walkLeft);
      this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;

      } else {
        this.body.vel.x = 0;
      }

      // update the body movement
      this.body.update(dt);

      // handle collisions against other shapes
      me.collision.check(this);

      // return true if we moved or if the renderable was updated
      return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },
    onCollision : function (response, other) {
      return true;
    }
});

game.FlyEntity = me.Entity.extend({
  init:function(x, y, settings){
    settings.image="fly";

    //Area de movimiento
    var width = settings.width;
    var height = settings.height;

    //Configuración del area de collision
    settings.framewidth = settings.width = 24;
    settings.frameheight = settings.height = 24;

    settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

    //Super constructor
    this._super(me.Entity, 'init', [x, y , settings]);

    //Elimina gravedad
    this.body.gravity=0;

    //Area de movimiento
    x = this.pos.x;
    y = this.pos.y;
    this.startX = x;
    this.startY = y;
    this.points   = settings.points;
    this.actualPoint = 0;

    this.xPointComplete=false;
    this.yPointComplete=false;
    //Walk & jump
    this.body.setVelocity(1, 1);
  },
  update:function(dt){
    if (this.alive && !this.actualPoint) {
      if(this.pos.x <= (this.points[this.actualPoint].x + this.startX)){
        this.body.vel.x -=this.body.accel.x * me.timer.tick;
      }else if(this.pos.x >= (this.points[this.actualPoint].x + this.startX)){
        this.body.vel.x +=this.body.accel.x * me.timer.tick;
      }
      if((this.pos.x - (this.points[this.actualPoint].x + this.startX)) < 3 ||
        (this.pos.x - (this.points[this.actualPoint].x + this.startX)) < -3){
        this.xPointComplete=true;
      }

      if(this.pos.y <= (this.points[this.actualPoint].y + this.startY)){
        this.body.vel.y +=this.body.accel.y * me.timer.tick;
      }else if(this.pos.y >= (this.points[this.actualPoint].y + this.startY)){
        this.body.vel.y -=this.body.accel.y * me.timer.tick;
      }

      if((this.pos.y - (this.points[this.actualPoint].y + this.startY)) < 3 ||
        (this.pos.y - (this.points[this.actualPoint].y + this.startY)) < -3){
        this.yPointComplete=true;
      }

      if(this.xPointComplete && this.yPointComplete){
        if((this.actualPoint-1)==this.points.length){
          this.body.vel.x = 0;
        }else {
          this.actualPoint++;
        }
      }
    }
      /*if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } else if (!this.walkLeft && this.pos.x >= this.endX) {
        this.walkLeft = true;
      }
      // make it walk
      this.renderable.flipX(this.walkLeft);
      this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
    } else {
      this.body.vel.x = 0;
    }*/

    // update the body movement
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
  onCollision : function (response, other) {
    return true;
  }
});
