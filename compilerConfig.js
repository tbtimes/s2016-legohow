let path = require('path');
let os = require('os');
let slug = require('slug');
let lede = require('lede');

let baseContext = new (require("./baseContext").default)();

let tweetLineCt = 0;

module.exports = {
 compilers: {
   html: new lede.NunjucksCompiler({
     watch: false,
     noCache: true,
     autoescape: false,
     filters: [
       {
         name: "linebreaks",
         fn: function(txt) {
           return txt
             .split("\r\n").join("\n").split("\n")
             .filter(x => x.trim().length)
             .map(x => `<p>${x}</p>`)
             .join("\n")
         }
       },
       {
         name: "slugify",
         fn: function(txt, opts) {
           return slug(txt, opts);
         }
       },
       {
         name: "tweetlines",
         fn: function (txt, url, splitChar="|") {
           let regex = new RegExp('tweet\{.+\}', 'g');
           let tweetLine = txt.match(regex);

           if (tweetLine) {
             let replacer = tweetLine.map(function (line, ind) {
               let tweetText = line.slice(6, -1);
               let copyText = tweetText;

               let split = tweetText.split(splitChar);
               if(split.length > 1) {
                 copyText = split[0];
                 tweetText = split[1];
               } else {
                 if (tweetText.length > 117) {
                   tweetText = tweetText.slice(0, 114) + '...';
                 }
               }
               let uniq = `tweetline_${tweetLineCt++}`;

               return `<span class="tweetline" id="${uniq}" onclick="gigya.services.socialize.plugins.reactions.instances[\'componentDiv${uniq}\'].buttonInstances[\'componentDiv${uniq}-reaction0\'].onClick()">${copyText}<script type="text/javascript">var act = new gigya.socialize.UserAction();act.setTitle("${tweetText}");act.setLinkBack("${baseContext.seo.url}?tweetline");var showShareBarUI_params={containerID: "componentDiv${uniq}", shareButtons: [{provider: "twitter", iconImgUp: "http://www.tampabay.com/projects/assets/sharing/twitter_inline.png"}], showCounts: "none", iconsOnly: "true", userAction: act};var params = {userAction:act, enabledProviders: "twitter"};</script><span class="componentDivInline" id="componentDiv${uniq}"></span></span><script type="text/javascript">gigya.socialize.showShareBarUI(showShareBarUI_params);</script>`;
             });
             tweetLine.forEach((e, i) => {
               txt = txt.replace(/tweet{.+}/, replacer[i]);
             });
             return txt;
           } else {
             return txt;
           }
         }
       }
     ]
   }),
   css: new lede.SassCompiler({
     includePaths: [],
     outputStyle: 'compact',
     sourceComments: false,
     sourceMapEmbed: false
   }),
   js: new lede.Es6Compiler()
 }
};