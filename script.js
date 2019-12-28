const Grid = {
  template: '#grid-template',
  data: () => ({
    blocks: [],
    blocksClone: [],
    shuffledBlocks: [],
    blocksize: 15,
    colours: [
      '#ffffff','#cccccc','#aaaaaa','#666666','#000000','#ff00aa','#ff0000','#ff9900','#ffcc00','#ffff00','#aaff00','#00ff00','#00ffff','#00aaff','#0066ff','#0000ff'],
    currentColour: '',
    dragging: false,
    display: { x:0, y:0}
  }),
  props: {
    gridsize: Number,
    initialblocksize: Number
  },
  methods: {
    createGrid(e) {
      this.gridsize = e && e.target.value || this.gridsize;
      this.blocks = [];
      let i = 0;
      while (i < this.gridsize * this.gridsize) {
        this.blocks.push( {id:i, selected:false, col:'' });
        i++;
      }
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
      return this.currentColour === col ? '1' : '0.5';
    },
    getBorderColour(col) {
      return this.currentColour === col ? '#333' : '#bbb';
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