const Shop = require('../src/shop');
const Item = require('../src/item');

describe('Gilded Rose', () => {

  describe('normal item behaviour', () => {
    it('can return item name when new item is passed to Shop', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("+5 Dexterity Vest");
    });

    it('can decrement an item`s sellIn value after a day passes', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9)
    });

    it('can decrement a item`s quality rating after a day passes', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9)
    });

    it('if an item`s sellIn value is <= 0, quality decrements by 2', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8)
    });

    it('an item`s quality can never be less than 0', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0)
    });
  });

  describe('Aged Brie behaviour', () => {
    it('aged brie`s quality increases the closer it gets to sellIn gets to 0', () => {
      const gildedRose = new Shop([new Item("Aged Brie", 20, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(21)
    });

    it('an item`s quality cannot be above 50 (excluding Sulfuras)', () => {
      const gildedRose = new Shop([new Item("Aged Brie", 20, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(19)
      expect(items[0].quality).toEqual(50)
    });
  });

  describe('Sulfuras behaviour', () => {
    it('Sulfuras` quality and sellIn value do not change', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1)
      expect(items[0].quality).toEqual(80)
    });
  });
});

