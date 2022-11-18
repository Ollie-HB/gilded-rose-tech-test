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
    this.minMaxQuality(i);
    this.sulfurasBehaviour(i)
  }

  normalItemBehaviour(i) {
    this.items[i].quality--;
   if (this.items[i].sellIn <= 0) {
     this.items[i].quality--;
   }
 }

  agedBrieBehaviour(i) {
  this.items[i].quality++;
}



sulfurasBehaviour(i) {
  if(this.items[i].name === 'Sulfuras, Hand of Ragnaros')
  this.items[i].quality = 80;
}

  minMaxQuality(i) {
    if (this.items[i].quality <= 0) {
      this.items[i].quality = 0;
    }
   if (this.items[i].quality >= 50) {
      this.items[i].quality = 50;
    }
  }
}

module.exports = Shop;