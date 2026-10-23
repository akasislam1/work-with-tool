/* Shared footer + "paused" screen for every page. Reads tools.js (managed by /admin/). */
(function () {
  var tools = window.TOOLS || [], cats = window.TOOL_CATS || [], site = window.SITE || {};
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* Paused tool: cover the page with a friendly message (tool pages live at /<slug>/) */
  var slug = location.pathname.split("/").filter(Boolean)[0];
  var me = tools.filter(function (t) { return t.slug === slug; })[0];
  if (me && me.status === "paused") {
    var o = document.createElement("div");
    o.className = "wt-pause";
    o.setAttribute("role", "alert");
    o.innerHTML = '<div class="wt-pause-box"><a class="wt-logo" href="/"><span class="wt-mark">W</span>Work With Tools</a>' +
      '<h1>' + esc(me.name) + ' is paused</h1>' +
      '<p>' + esc(me.pauseNote || "This tool is temporarily unavailable. Please check back soon.") + '</p>' +
      '<a class="wt-btn" href="/">Browse other tools</a></div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";
  }

  /* Footer: only live tools are listed */
  function col(cat) {
    var live = tools.filter(function (t) { return t.cat === cat.id && t.status === "live"; });
    if (!live.length) return "";
    return '<div><h3>' + esc(cat.title) + '</h3><ul>' + live.map(function (t) {
      return '<li><a href="/' + esc(t.slug) + '/">' + esc(t.name) + '</a></li>';
    }).join("") + '</ul></div>';
  }
  var blurb = site.footerText || "Free image and PDF tools that run in your browser. Your files stay on your device.";
  var f = document.createElement("footer");
  f.className = "wt-foot";
  f.innerHTML =
    '<div class="wt-foot-in">' +
      '<div class="wt-foot-brand"><a class="wt-logo" href="/"><span class="wt-mark">W</span>Work With Tools</a><p>' + esc(blurb) + '</p></div>' +
      cats.map(col).join("") +
    '</div><div class="wt-foot-base">© ' + new Date().getFullYear() + ' Work With Tools</div>';
  document.body.appendChild(f);
})();
