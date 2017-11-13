var snatchAPPBot = 0;
var snatchAPPWidth = 400;
var snatchAPPHeight = 970;
var HOST = 'snatchbot.me';
var Prot = 'https://';

function Init(bot, width, height, customImg, contactButton, btnColor, btnWidth, btnHeigth, iconSize, btnLabel, hideBtnIcon) {
    if (width) snatchAPPWidth = width;
    if (height) snatchAPPHeight = height;
    snatchAPPBot = bot;
    var chatprompt = document.createElement('div');
    this.snatchAPP_Open();
    //    chatprompt.className = 'chatprompt';
    // chatprompt.onclick = snatchAPP_Open;
    var regEx = /botID=([0-9]*)/g;
    var botID = regEx.exec(bot);

    if (location.host == 'dev.snatchbot.me') {
        HOST = location.host;
    }
    //    try {
    //        HOST = location.host;
    //    } catch(ex) {}
    var sizeText;
    if(btnHeigth < (btnWidth / btnLabel.length)) {
        sizeText = btnWidth / btnLabel.length;
    } else {
        sizeText = 20;
    }
    if (hideBtnIcon == 1) {
            chatprompt.innerHTML = '<span class="snatch-button" data-text=""><a class="lwc-chat-button '+ contactButton +'" style="background-color:'+ btnColor+'; width:'+ btnWidth+'px; height:'+ btnHeigth+'px;"><span style="font-size: ' + sizeText + 'px;" class="lwc-button-text">'+ btnLabel +'</span>';
    } else {
        if (customImg && customImg != 'false') {
            var matchCustomImg = customImg,
                result = '';
            if (matchCustomImg.indexOf('amazonaws') !== -1) {
                result = customImg;
            } else {
                result = Prot + HOST + customImg;
            }

            if (contactButton == 'bubble') {
                chatprompt.innerHTML = '<span class="snatch-button" data-text=""><a class="lwc-chat-button lwc-chat-button--bubble" style="background-image: url('+ result+'); width:'+ btnWidth+'px; height:'+ btnHeigth+'px; border-radius: 50%;"></span>';
            } else {
                chatprompt.innerHTML = '<span class="snatch-button" data-text=""><a class="lwc-chat-button '+ contactButton +'" style="background-color:'+ btnColor+'; width:'+ btnWidth+'px; height:'+ btnHeigth+'px;"><img style="color: white; max-width: 100px; max-height: 100px; font-size:'+ iconSize+'px;" src="' + result + '"><span style="font-size:' + sizeText + 'px;" class="lwc-button-text">'+ btnLabel +'</span>';
            }

            
        } else {
            chatprompt.innerHTML = '<span class="snatch-button" data-text=""><a class="lwc-chat-button '+ contactButton +'" style="background-color:'+ btnColor+'; width:'+ btnWidth+'px; height:'+ btnHeigth+'px;"><img style="color: white; max-width: 100px; max-height: 100px; font-size:'+ iconSize+'px;" src="' + Prot + HOST + '/sdk/logo2.png"><span style="font-size: ' + sizeText + 'px;" class="lwc-button-text">'+ btnLabel +'</span>';
        }
    }
    
    document.body.appendChild(chatprompt);
}

function snatchAPP_Open() {
    Modal.open({
        content: '<iframe style="width:' + snatchAPPWidth + 'px; height:' + snatchAPPHeight + 'px; border:0" src="' + Prot + HOST + '/webchat/'+ snatchAPPBot +'" ></iframe>',
        draggable: false,
        openCallback: function() {}
    });
}
var Modal = (function() {
    "use strict";
    var method = {},
        settings = {},
        modalOverlay = document.createElement('div'),
        modalContainer = document.createElement('div'),
        modalHeader = document.createElement('div'),
        modalContent = document.createElement('div'),
        modalClose = document.createElement('div'),
        centerModal, closeModalEvent, defaultSettings = {
            width: 'auto',
            height: 'auto',
            lock: false,
            hideClose: false,
            draggable: false,
            closeAfter: 0,
            openCallback: false,
            closeCallback: false,
            hideOverlay: false
        };
    method.open = function(parameters) {
        settings.width = parameters.width || defaultSettings.width;
        settings.height = parameters.height || defaultSettings.height;
        settings.lock = parameters.lock || defaultSettings.lock;
        settings.hideClose = parameters.hideClose || defaultSettings.hideClose;
        settings.draggable = parameters.draggable || defaultSettings.draggable;
        settings.closeAfter = parameters.closeAfter || defaultSettings.closeAfter;
        settings.closeCallback = parameters.closeCallback || defaultSettings.closeCallback;
        settings.openCallback = parameters.openCallback || defaultSettings.openCallback;
        settings.hideOverlay = parameters.hideOverlay || defaultSettings.hideOverlay;
        centerModal = function() {
            method.center({});
        };
        if (parameters.content && !parameters.ajaxContent) {
            modalContent.innerHTML = parameters.content;
        } else if (parameters.ajaxContent && !parameters.content) {
            modalContainer.className = 'loading';
            method.ajax(parameters.ajaxContent, function insertAjaxResult(ajaxResult) {
                modalContent.innerHTML = ajaxResult;
            });
        } else {
            modalContent.innerHTML = '';
        }
        modalContainer.style.width = settings.width;
        modalContainer.style.height = settings.height;
        method.center({});
        if (settings.lock || settings.hideClose) {
            modalClose.style.visibility = 'hidden';
        }
        if (!settings.hideOverlay) {
            modalOverlay.style.visibility = 'visible';
        }
        modalContainer.style.visibility = 'visible';
        document.onkeypress = function(e) {
            if (e.keyCode === 27 && settings.lock !== true) {
                method.close();
            }
        };
        modalClose.onclick = function() {
            if (!settings.hideClose) {
                method.close();
            } else {
                return false;
            }
        };
        modalOverlay.onclick = function() {
            if (!settings.lock) {
                method.close();
            } else {
                return false;
            }
        };
        if (window.addEventListener) {
            window.addEventListener('resize', centerModal, false);
        } else if (window.attachEvent) {
            window.attachEvent('onresize', centerModal);
        }
        if (settings.draggable) {
            modalHeader.style.cursor = 'move';
            modalHeader.onmousedown = function(e) {
                method.drag(e);
                return false;
            };
        } else {
            modalHeader.onmousedown = function() {
                return false;
            };
        }
        if (settings.closeAfter > 0) {
            closeModalEvent = window.setTimeout(function() {
                method.close();
            }, settings.closeAfter * 1000);
        }
        if (settings.openCallback) {
            settings.openCallback();
        }
    };
    method.drag = function(e) {
        var xPosition = (window.event !== undefined) ? window.event.clientX : e.clientX,
            yPosition = (window.event !== undefined) ? window.event.clientY : e.clientY,
            differenceX = xPosition - modalContainer.offsetLeft,
            differenceY = yPosition - modalContainer.offsetTop;
        document.onmousemove = function(e) {
            xPosition = (window.event !== undefined) ? window.event.clientX : e.clientX;
            yPosition = (window.event !== undefined) ? window.event.clientY : e.clientY;
            modalContainer.style.left = ((xPosition - differenceX) > 0) ? (xPosition - differenceX) + 'px' : 0;
            modalContainer.style.top = ((yPosition - differenceY) > 0) ? (yPosition - differenceY) + 'px' : 0;
            document.onmouseup = function() {
                window.document.onmousemove = null;
            };
        };
    };


    method.close = function() {
        modalContent.innerHTML = '';
        modalOverlay.setAttribute('style', '');
        modalOverlay.style.cssText = '';
        modalOverlay.style.visibility = 'hidden';
        modalContainer.setAttribute('style', '');
        modalContainer.style.cssText = '';
        modalContainer.style.visibility = 'hidden';
        modalHeader.style.cursor = 'default';
        modalClose.setAttribute('style', '');
        modalClose.style.cssText = '';
        if (closeModalEvent) {
            window.clearTimeout(closeModalEvent);
        }
        if (settings.closeCallback) {
            settings.closeCallback();
        }
        if (window.removeEventListener) {
            window.removeEventListener('resize', centerModal, false);
        } else if (window.detachEvent) {
            window.detachEvent('onresize', centerModal);
        }
    };
    method.center = function(parameters) {};
    modalOverlay.setAttribute('id', 'overlay');
    modalContainer.setAttribute('id', 'sntchWebChat');
    modalHeader.setAttribute('id', 'header');
    modalContent.setAttribute('id', 'content');
    modalClose.setAttribute('id', 'close');
    modalHeader.appendChild(modalClose);
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalContent);
    modalOverlay.style.visibility = 'hidden';
    modalContainer.style.visibility = 'hidden';
    if (window.addEventListener) {
        window.addEventListener('load', function() {
            document.body.appendChild(modalContainer);
        }, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', function () {
            document.body.appendChild(modalContainer);
        });
    }
    return method;
}());