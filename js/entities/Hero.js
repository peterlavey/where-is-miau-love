game.PlayerEntity = me.Entity.extend({
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        //X & Y accelerator
        this.body.setVelocity(7, 17);
        //Follow position
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //Actualiza el personaje incluso fuera de la vista
        this.alwaysUpdate=true;
        //Animacion
        this.renderable.addAnimation("walk", [0,1]);
        this.renderable.addAnimation("stand", [0]);
        this.renderable.setCurrentAnimation("stand");
    },
    moveLeft:function(){
      //Invierte la imagen
      this.renderable.flipX(true);
      //Acceletación
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      //Animación
      if(!this.renderable.isCurrentAnimation("walk")){
        this.renderable.setCurrentAnimation("walk");

        console.log("walk");
      }
    },
    moveRight:function(){
      //Invierte la imagen
      this.renderable.flipX(false);
      //Acceletación
      this.body.vel.x += this.body.accel.x * me.timer.tick;

      //Animación
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    },
    update : function (dt) {
        //Run
        /*if(me.input.isKeyPressed('run')){
          this.isRunning=true;
        }else{
          this.isRunning=false;
        }*/
        //Walk
        if(me.input.isKeyPressed('left')){
          this.moveLeft();
        } else if (me.input.isKeyPressed('right')) {
          this.moveRight();
        } else {
          this.body.vel.x = 0;
          this.renderable.setCurrentAnimation("stand");
        }
        //Jump
        if(me.input.isKeyPressed("jump")){
          //Verifica que está tocando el suelo
          if(!this.body.jumping && !this.body.falling){
            //Aceleración, internamente calculada con la gravedad
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            //Setea la veriable de salto
            this.body.jumping=true;
            me.audio.play("jump");
          }
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);
        // handle collisions against other shapes
        me.collision.check(this);
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        switch (response.b.body.collisionType) {
          case me.collision.types.WORLD_SHAPE:
            if(other.type === "platform"){
              if(this.body.falling && !me.input.isKeyPressed("down") && (response.overlapV.y > 0) && ~~this.body.vel.y >= ~~response.overlapV.y){
                response.overlapV.x = 0;
                return true;
              }
              return false;
            }else if (other.type === "hole") {
              me.levelDirector.loadLevel("area05");
              return true;
            }
          break;
          case me.collision.types.ENEMY_OBJECT:
            //me.game.world.removeChild(response.b);
            me.levelDirector.loadLevel("area05");
            return false;
          break;
          default:
            return false;
        }
        // Make all other objects solid
        return true;
    }
});
