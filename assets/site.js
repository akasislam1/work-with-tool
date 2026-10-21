/* Shared footer for every page. Reads the tool list from tools.js. */
(function () {
  var tools = window.TOOLS || [], cats = window.TOOL_CATS || {};
  function col(cat) {
    var live = tools.filter(function (t) { return t.cat === cat && t.ready; });
    if (!live.length) return "";
    return '<div><h3>' + cats[cat].title + '</h3><ul>' + live.map(function (t) {
      return '<li><a href="/' + t.slug + '/">' + t.name + '</a></li>';
    }).join("") + '</ul></div>';
  }
  var f = document.createElement("footer");
  f.className = "wt-foot";
  f.innerHTML =
    '<div class="wt-foot-in">' +
      '<div class="wt-foot-brand"><a class="wt-logo" href="/"><span class="wt-mark">W</span>Work With Tools</a>' +
      '<p>Free image and PDF tools that run in your browser. Your files stay on your device.</p></div>' +
      col("image") + col("pdf") +
    '</div><div class="wt-foot-base">© ' + new Date().getFullYear() + ' Work With Tools</div>';
  document.body.appendChild(f);
})();
