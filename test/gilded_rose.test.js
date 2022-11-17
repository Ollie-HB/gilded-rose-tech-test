const Shop = require("../src/shop");
const Item = require("../src/item");
const { describe } = require("yargs");

describe("Gilded Rose", () => {

  describe('updateQuality', () => {
 
    it("can return item name when new item is passed to Shop", () => {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("+5 Dexterity Vest");
    });
  });

});
