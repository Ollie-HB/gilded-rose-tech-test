const Shop = require('../src/shop');
const Item = require('../src/item');

describe('Gilded Rose', () => {

  describe('normal item behaviour', () => {
    it('can return item name when new item is passed to Shop', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("+5 Dexterity Vest");
    });

    it('can decrement a item`s sellIn rating after a day passes', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9)
    });

    it('can decrement a item`s quality rating after a day passes', () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9)
    });

    it('if an item`s sellIn value is < 0, quality decrements by 2', () => {
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

});
