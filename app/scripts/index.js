'use strict';


document.addEventListener('DOMContentLoaded', function() {
    var listening;

    var defaultCommmands = {
        '*hello': {
            fn: function(term) { 
                chrome.browser.openTab({url:"http://www.w3schools.com"}, function(){
                    console.log("tab opened")
                })
            },
            custom: false,
            enabled: true
        }
    };

    if(window.annyang) {
          console.log('init');
          window.annyang.addCommands(Object.keys(defaultCommmands).reduce(function(m,v){ m[v] = defaultCommmands[v].fn; return m; }, {}));
          window.annyang.setLanguage("en-IN");
    }

    var toggleListener = function(toggle){
        if (toggle){
          window.annyang.start();
        } else {
          window.annyang.abort();
        }
    }

    if(chrome.commands)
        chrome.commands.onCommand.addListener(function(command) {
            console.log('Command:', command);
            if(command === 'toggle-feature-foo')
                listening = !listening, toggleListener(listening);
        });
    else
       toggleListener(true) 

}, false);


