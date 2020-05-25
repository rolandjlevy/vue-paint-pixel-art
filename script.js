const Grid = {
  template: '#grid-template',
  data: () => ({
    blocks: [],
    blocksClone: [],
    shuffledBlocks: [],
    blocksize: 15,
    tempGridSize: 15,
    gridsize: 15,
    maxGridsize: 30,
    colours: [
      '#f6f6f6','#cccccc','#aaaaaa','#666666','#000000','#ff00cc','#ff0033','#ff6600','#ffcc00','#ffff00','#ccff00','#00ff33','#00ffff','#00ccff','#0066ff','#0000ff'],
    currentColour: '',
    dragging: false,
    display: { x:0, y:0}
  }),
  props: {
    initialblocksize: Number
  },
  methods: {
    updateGridsize(e) {
      this.tempGridSize = e.target.value;
    },
    createGrid() {
      this.gridsize = this.tempGridSize;
      this.blocks = [];
      let i = 0;
      let col = 0;
      while (i < this.gridsize * this.gridsize) {
        col = i % this.colours.length;
        this.blocks.push( {id:i, selected:false, col:this.colours[col] });
        i++;
      }
    },
    outputGrid() {
      console.log(JSON.stringify(this.blocks, null, 2));
    },
    getTop(n) {
      return Math.floor(n / this.gridsize) * this.blocksize;
    },
    getLeft(n) {
      return (n % this.gridsize) * this.blocksize;
    },
    randomNum(n) {
      return Math.round(Math.random(n) * n);
    },
    chooseColour(col) {
      this.currentColour = col;
    },
    getOpacity(col) {
      return this.currentColour === col ? '1' : '0.8';
    },
    getBorderColour(col) {
      return this.currentColour === col ? '#333' : '#fff';
    },
    doMouseDown(block) {
      this.dragging = true;
      block.selected = !block.selected;
      block.col = this.currentColour;
    },
    doMouseUp() {
      this.dragging = false;
    },
    doMouseOver(block) {
      if (this.dragging) {
        block.selected = !block.selected;
        block.col = this.currentColour;
      }
    },
    doMouseLeave(block) {
      if (!this.dragging && !block.selected) block.selected = false;
    },
    fillGrid() {
      this.blocks = this.blocks.map(item => { 
        item.selected = false;
        item.col = this.currentColour;
        return item;
      });
    },
    resetGrid() {
      this.blocks = this.blocks.map(item => { 
        item.selected = false;
        item.col = '';
        return item;
      });
      this.blocksize = this.initialblocksize;
    },
    shuffleGrid() {
      this.blocksClone = [...this.blocks];
      this.shuffledBlocks = [];
      while (this.blocksClone.length > 0) {
        const len = this.blocksClone.length-1;
        const selected = this.blocksClone.splice(this.randomNum(len), 1);
        this.shuffledBlocks.push(selected[0]);
      }
      this.blocks = [...this.shuffledBlocks];
    }
  },
  touchIsMoving(event) {
    this.display = {x:event.pageX, y:event.pageX}
  },
  mounted() {
    this.blocksize = this.initialblocksize;
    this.createGrid();    
    this.currentColour = this.colours[0];
    // const draggable = document.querySelector('.grid-wrapper');
    // console.log(draggable)
    // draggable.addEventListener('touchmove', function(event) {
    //   draggable.style.left = event.pageX-25 + 'px';
    //   draggable.style.top = event.pageY-25 + 'px';
    //   this.display = {x:event.pageX, y:event.pageX};
    // }, false);
    // window.addEventListener('mousemove', this.touchIsMoving);
  },
  destroyed() {
    // window.removeEventListener('mousemove', this.touchIsMoving);
  }
}

new Vue({
  el: "#app",
  components: {
    Grid
  }
});