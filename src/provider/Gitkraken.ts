import { Embed } from "../model/Embed";
import { BaseProvider } from "./BaseProvider";

class Gitkraken extends BaseProvider {
  private embed: Embed;

  private static _formatLargeString(str: string, limit = 256): string {
    return str.length > limit ? str.substring(0, limit - 1) + "\u2026" : str;
  }

  private static _titleCase(str: string, ifNull = "None"): string {
    if (str == null) {
      return ifNull;
    }

    if (str.length < 1) {
      return str;
    }

    const strArray = str.toLowerCase().split(" ");

    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
    }

    return strArray.join(" ");
  }

  constructor() {
    super();
    this.setEmbedColor(0x205081);
    this.embed = new Embed();
  }

  public getName(): string {
    return "Gitkraken Boards";
  }

  public getType(): string {
    return this.headers["x-gk-event"];
  }

  public async boards(): Promise<void> {
    // Parse the action, which for Gitkraken, is the defining factor.

    console.log(this.body);
  }

  private async archived(): Promise<void> {}
}

export { Gitkraken };
