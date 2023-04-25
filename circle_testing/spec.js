// spec.js
describe("changeColor function", function() {
  beforeEach(function() {
    chrome = {
      tabs: {
        query: function(options, callback) {
          callback([{id: 123}]);
        },
        executeScript: function(tabId, options) {
          var color = options.code.match(/'(.*)'/)[1];
          document.body.style.backgroundColor = color;
        }
      },
      runtime: {
        onMessage: {
          addListener: function(callback) {
            chrome.runtime.sendMessage = callback;
          }
        }
      }
    };
  });

  afterEach(function() {
    document.body.style.backgroundColor = "";
  });

  it("should change the background color to red", function() {
    chrome.runtime.sendMessage({type: "changeColor", color: "red"});
    expect(document.body.style.backgroundColor).toEqual("red");
  });

  it("should change the background color to green", function() {
    chrome.runtime.sendMessage({type: "changeColor", color: "green"});
    expect(document.body.style.backgroundColor).toEqual("green");
  });

  it("should change the background color to blue", function() {
    chrome.runtime.sendMessage({type: "changeColor", color: "blue"});
    expect(document.body.style.backgroundColor).toEqual("blue");
  });
});
