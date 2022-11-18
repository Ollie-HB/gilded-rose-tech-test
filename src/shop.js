class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateSellIn(i)
      this.updateNormalItemQuality(i)
      this.minimumQuality(i)
    }
    return this.items;
  }
  
  updateSellIn(i) {
    this.items[i].sellIn--;
  }

  updateNormalItemQuality(i) {
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