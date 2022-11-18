class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateSellIn(i)
    }

    return this.items;
  }
  
  updateSellIn(i) {
    this.items[i].sellIn--;
  }
}

module.exports = Shop;