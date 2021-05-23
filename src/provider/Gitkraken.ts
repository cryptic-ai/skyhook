import { EmbedAuthor } from "../model/EmbedAuthor";
import { Embed } from "../model/Embed";
import { BaseProvider } from "./BaseProvider";
import { EmbedField } from '../model/EmbedField';

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
    return "Gitkraken";
  }

  public getType(): string {
    return this.headers["x-gk-event"];
  }

  public async boards(): Promise<void> {
    switch(this.body.action) {
      case "archived":
        this.archived();
      case "unarchived":
        this.unarchived();
      case "updated":
        this.updated();
      case "deleted":
        this.deleted();
      case "labels_updated": 
        this.labelsUpdated();
      case "members_updated":
        this.membersUpdated();
      default:
        return null;
    }
  }

  public async columns(): Promise<void> {
    switch(this.body.action) {
      default:
        return null;
    }
  }

  private async archived(): Promise<void> {
    this.embed.author = this.extractAuthor();
    this.embed.title = `[${this.body.board.name}] has been archived.`
    this.addEmbed(this.embed);
  }

  private async unarchived(): Promise<void> {
    this.embed.author = this.extractAuthor();
    this.embed.title = `[${this.body.board.name}] has been unarchived.`
    this.addEmbed(this.embed);
  }

  private async updated(): Promise<void> {
    this.embed.author = this.extractAuthor();
    this.embed.title = `[${this.body.board.name}] has been updated.`
    
    const previousFeild = new EmbedField();
    previousFeild.name = "Old";
    previousFeild.value = this.body.board.previous.name;
    previousFeild.inline = true;

    const newField = new EmbedField();
    newField.name = "New";
    newField.value = this.body.board.name;
    newField.inline = true;

    this.embed.fields = [previousFeild, newField];
    this.addEmbed(this.embed);
  }

  private async deleted(): Promise<void> {
    this.embed.author = this.extractAuthor();
    this.embed.title = `[${this.body.board.name}] has been deleted.`

    this.embed.description = `${this.body.board.name} has been deleted. It had ${this.body.board.members.length} member(s), 
      with ${this.body.board.invited_members.length} invited member(s).`;

    this.addEmbed(this.embed);
  }

  private async labelsUpdated(): Promise<void> {
    this.embed.author = this.extractAuthor();
    this.embed.title = `[${this.body.board.name}] labels have been updated.`
    
    this.addEmbed(this.embed);
  }

  private async membersUpdated(): Promise<void> {
    this.embed.author = this.extractAuthor();
    this.embed.title = `[${this.body.board.name}] members have been updated.`

    this.addEmbed(this.embed);
  }

  private extractAuthor(): EmbedAuthor {
    const author = new EmbedAuthor();
    author.name = this.body.sender.name;
    author.icon_url = "https://www.gitkraken.com/downloads/brand-assets/gitkraken-logo-dark-sq.png"
    return author;
  }
}

export { Gitkraken };
