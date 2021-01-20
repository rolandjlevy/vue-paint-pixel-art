- capture event that's called with v-model
- https://v3.vuejs.org/guide/migration/v-model.html#_2-x-syntax
- update container width to grid-wrapper + padding


- use Firebase to store patterns and allow users to save and load them: https://firebase.google.com/docs/database
- implement events that make it mobile friendly: https://stackoverflow.com/questions/20927759/html5-drag-and-drop-for-mobile
- look at this tutorial: https://blog.repl.it/firebase
- enable mobile functionality: https://mobiforge.com/design-development/touch-friendly-drag-and-drop

### attempted mobile touch functionality

```js
  mounted() {
    this.blocksize = this.initialblocksize;
    this.createGrid();    
    this.currentColour = this.colours[0];
    const draggable = document.querySelector('.grid-wrapper');
    console.log(draggable)
    draggable.addEventListener('touchmove', function(event) {
      draggable.style.left = event.pageX-25 + 'px';
      draggable.style.top = event.pageY-25 + 'px';
      this.display = {x:event.pageX, y:event.pageX};
    }, false);
    window.addEventListener('mousemove', this.touchIsMoving);
  }
```
```js
  destroyed() {
    window.removeEventListener('mousemove', this.touchIsMoving);
  }
```
### Download screen capture
http://html2canvas.hertzen.com/