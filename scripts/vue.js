const Grid = {
  template: '#grid-template',
  data: () => ({
    blocks: [],
    blocksClone: [],
    shuffledBlocks: [],
    blocksize: 19,
    tempGridSize: 16,
    gridsize: 16,
    maxGridsize: 30,
    colours: [
      '#ffffff','#cccccc','#999999','#461f1f','#aa00ff','#ff0066','#ff9900','#ffd773','#ffff00','#ccff00','#00ff33','#00ffff','#00ccff','#0066ff','#0000ff'],
    currentColour: '',
    dragging: false,
    display: { x:0, y:0 }
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
        item.col = this.colours[0];
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
    },
    downloadImage () {
      const div = document.querySelector('#download-capture');
      const options = {
        logging: true, 
        letterRendering: 1,
        allowTaint: false, 
        removeContainer: true,
        useCORS: true,
        scrollX: -8,
        scrollY: 0
      };
      html2canvas(div, options).then(canvas => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpeg', 0.9);
        a.download = 'grid.jpeg';
        a.click();
      });
    }
  },
  touchIsMoving(event) {
    this.display = {x:event.pageX, y:event.pageX}
  },
  mounted() {
    this.blocksize = this.initialblocksize;
    this.createGrid();    
    this.currentColour = this.colours[0];
  },
  updated() {
    // const w = this.blocksize * this.gridsize;
    // vm.$refs.container.style.width = `${w}px`;
  }
}

const vm = new Vue({
  el: "#app",
  components: {
    Grid
  }
});