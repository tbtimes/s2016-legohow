
class SettingsConfig {
  constructor() {
    this.name = "legohow";
    this.dependsOn = ["core"];
    this.styles = [];
    this.scripts = [];
    this.assets = [];
    this.blocks = ["ARTICLE"];
    this.assets = [
      "tbt-analytics/tracker.js"
    ];
    this.googleFileId = "1bG6xZpZ9UmR__fcR_6-f7emix-fFnV6V9TIlMbmQfKM";

  }
}



// DO NOT CHANGE ANYTHING BELOW THIS LINE
// These two lines are necessary for lede to pull in this module at runtime.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsConfig;
