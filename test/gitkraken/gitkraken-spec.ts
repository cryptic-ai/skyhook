import { expect } from "chai";
import { Gitkraken } from "../../src/provider/Gitkraken";
import { Tester } from "../Tester";

describe("/POST gitkraken", () => {
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
});
