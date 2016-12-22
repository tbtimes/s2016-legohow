
class SettingsConfig {
  constructor() {
    this.name = "legohow";
    this.dependsOn = ["tbt-core"];
    this.styles = ["legohow/styles.scss"];
    this.scripts = ["tbt-core/isMobile.js"];
    this.assets = ["legohow/animation.gif", "legohow/headline.gif"];
    this.blocks = ["core/header.html", "ARTICLE", "tbt-core/comments.html","core/footer.html","tbt-analytics/omniture.html"];
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
