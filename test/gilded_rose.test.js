const Shop = require('../src/shop');
const Item = require('../src/item');

describe('Gilded Rose', () => {

  describe('normal item behaviour', () => {
    it('can return item name when new item is passed to Shop', () => {
      const gildedRose = new Shop([new Item('+5 Dexterity Vest', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('+5 Dexterity Vest');
    });

    it('can decrement an item`s sellIn value after a day passes', () => {
      const gildedRose = new Shop([new Item('+5 Dexterity Vest', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9)
    });

    it('can decrement a item`s quality rating after a day passes', () => {
      const gildedRose = new Shop([new Item('Elixir of the Mongoose', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9)
    });

    it('if an item`s sellIn value is <= 0, quality decrements by 2', () => {
      const gildedRose = new Shop([new Item('Elixir of the Mongoose', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8)
    });

    it('an item`s quality can never be less than 0', () => {
      const gildedRose = new Shop([new Item('+5 Dexterity Vest', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0)
    });
  });

  describe('Aged Brie behaviour', () => {
    it('aged brie`s quality increases the closer it gets to sellIn gets to 0', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 20, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(21)
    });

    it('an item`s quality cannot be above 50 (excluding Sulfuras)', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 20, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(50)
    });
  });

  describe('Sulfuras behaviour', () => {
    it('Sulfuras` quality and sellIn value do not change', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1)
      expect(items[0].quality).toEqual(80)
    });
  });

  describe('Backstage pass behaviour', () => {
    it('when sellIn value is > 10, quality increases by 1 each day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 20), 
        new Item('Backstage passes to a TAFKAL80ETC concert', 12, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(21)
      expect(items[1].sellIn).toEqual(11)
      expect(items[1].quality).toEqual(21)
    });

    it('Backstage pass value cannot exceed 50', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(50)
    });

    it('when sellIn value is <= 10 but >= 5, quality increases by 2 each day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20), 
        new Item('Backstage passes to a TAFKAL80ETC concert', 7, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9)
      expect(items[0].quality).toEqual(22)
      expect(items[1].sellIn).toEqual(6)
      expect(items[1].quality).toEqual(22)
    });

    it('when sellIn value is <= 5 but > -1, quality increases by 3 each day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 20), 
        new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(5)
      expect(items[0].quality).toEqual(23)
      expect(items[1].sellIn).toEqual(0)
      expect(items[1].quality).toEqual(23)
    });

    it('when sellIn value is < 0, quality is 0', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20), 
        new Item('Backstage passes to a TAFKAL80ETC concert', -10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1)
      expect(items[0].quality).toEqual(0)
      expect(items[1].sellIn).toEqual(-11)
      expect(items[1].quality).toEqual(0)
    });
  });

  describe('Conjured Mana Cake behaviour', () => {
    it('decreases in quality by 2 each day', () => {
      const gildedRose = new Shop([new Item('Conjured Mana Cake', 20, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(18)
    });

    it('decreases in quality by 4 per day once sellIn rate reaches 0', () => {
      const gildedRose = new Shop([new Item('Conjured Mana Cake', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1)
      expect(items[0].quality).toEqual(16)
    });

    it('conjured mana cake`s quality cannot go below 0', () => {
      const gildedRose = new Shop([new Item('Conjured Mana Cake', 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9)
      expect(items[0].quality).toEqual(0)
    });
  });
});
