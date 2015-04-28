/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];
    callback(tab.url);
  });
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function secureSecret(secret, domain) {
  // this function needs to generate a unique result for every site, but
  // the result should not change over time
  var secretHash = secret + domain;
  var sum = 0;
  var prime = 31;
  var factor = 1;
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var aLength = alphabet.length;
  for(var i = 0; i < secretHash.length; i++) {
    factor = factor * prime % aLength;
    sum = (sum + factor * secretHash.charAt(i)) % aLength;
  }
  return alphabet[sum];
}

$(document).ready(function() {
  $("#generateBtn").click(function () {
    getCurrentTabUrl(function(url) {
      var secret = $("#yourPassword").val();
      var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      var domain = matches && matches[1];
      if (domain != null) {
        secret = secureSecret(secret, domain);
        $("#generatedPassword").html(secret);
      }
    });
  });
});
