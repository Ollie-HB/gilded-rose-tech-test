class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateSellIn(i)
      this.itemBehaviours(i)
    }
    return this.items;
  }

  updateSellIn(i) {
    this.items[i].sellIn--;
  }

  itemBehaviours(i) {
    switch (this.items[i].name) {
      case 'Aged Brie':
        this.agedBrieBehaviour(i)
      break;
      default:
        this.normalItemBehaviour(i);
        break;
    }
    this.minimumQuality(i);
  }

  agedBrieBehaviour(i) {
     this.items[i].quality++;
    // if (this.items[i].sellIn <= 0) {
    //   this.items[i].quality--;
  }

  normalItemBehaviour(i) {
    this.items[i].quality--;
   if (this.items[i].sellIn <= 0) {
     this.items[i].quality--;
   }
 }

  minimumQuality(i) {
    if (this.items[i].quality <= 0) {
      this.items[i].quality = 0;
    }
  }
}

module.exports = Shop;