import { expect } from "chai";
import { Gitkraken } from "../../src/provider/Gitkraken";
import { Tester } from "../Tester";

describe("/POST gitkraken boards", () => {
  it("archived", async () => {
    const headers = {
      "x-gk-event": "boards"
    };

    const res = await Tester.test(
      new Gitkraken(),
      "gitkraken-archived.json",
      headers
    );
    expect(res.embeds).to.be.an("array").that.has.length(1);
  });

  it('unarchived', async() => {
    const headers = {
      "x-gk-event": "boards"
    };

    const res = await Tester.test(
      new Gitkraken(),
      "gitkraken-unarchived.json",
      headers
    );

    expect(res.embeds).to.be.an("array").that.has.length(1);
    expect(res.embeds[0].author.name).equals('Keif');
    expect(res.embeds[0].title).equals('[Welcome Board] has been unarchived.');
  })
});
