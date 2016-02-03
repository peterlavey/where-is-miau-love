game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        var bg=new me.Sprite(
          me.game.viewport.width / 2,
          me.game.viewport.height / 2,
          {
            image: me.loader.getImage("title_screen"),
          }
        );
        bg.scale(me.game.viewport.width / bg.width, 1);
        me.game.world.addChild(bg, 1);

        me.game.world.addChild(new (me.Renderable.extend ({
          // constructor
          init : function() {
          },

          // some callback for the tween objects
          scrollover : function() {
          },

          update : function (dt) {
              return true;
          },

          draw : function (renderer) {

          },
          onDestroyEvent : function() {
              //just in case
              this.scrollertween.stop();
          }
        })), 2);

      // change to play state on press Enter or click/tap
      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
      me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
      this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
          if (action === "enter") {
              // play something on tap / enter
              // this will unlock audio on mobile devices
              me.audio.play("cling");
              me.state.change(me.state.PLAY);
          }
      });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
      me.input.unbindKey(me.input.KEY.ENTER);
      me.input.unbindPointer(me.input.pointer.LEFT);
      me.event.unsubscribe(this.handler);
    }
});
