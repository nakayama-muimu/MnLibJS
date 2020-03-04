"use strict";
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    /**
     * GET で指定 URL にアクセス
     * @param sURL 送信先
     * @param sData 送信データ（query string）
     * @param cbFuncSent ロード完了時のコールバック
     * @param cbFuncSending ロード完了時以外の onreadystatechange のコールバック
     * @param bPreventCache 毎回異なる乱数を送信データに付与してキャッシュをさせないようにする
     */
    Ajax.prototype.get = function (sURL, sData, cbFuncSent, cbFuncSending, bPreventCache) {
        if (bPreventCache === void 0) { bPreventCache = true; }
        this.funcSent = cbFuncSent;
        this.funcSending = cbFuncSending;
        if (bPreventCache) {
            sData += "&dummy=" + Date.now();
        }
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open("GET", sURL + "?" + sData);
        var me = this;
        xhr.onreadystatechange = function () {
            me.cbReadyStateChange();
        };
        xhr.send();
    };
    /**
     * POST で指定 URL にアクセス
     * @param sURL 送信先
     * @param sData 送信データ（application/x-www-form-urlencoded）※query string と同様の形式
     * @param cbFuncSent ロード完了時のコールバック
     * @param cbFuncSending ロード完了時以外の onreadystatechange のコールバック
     * @param bPreventCache 毎回異なる乱数を送信データに付与してキャッシュをさせないようにする
     */
    Ajax.prototype.post = function (sURL, sData, cbFuncSent, cbFuncSending, bPreventCache) {
        if (bPreventCache === void 0) { bPreventCache = true; }
        this.funcSent = cbFuncSent;
        this.funcSending = cbFuncSending;
        if (bPreventCache) {
            sData += "&dummy=" + Date.now();
        }
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open("POST", sURL);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var me = this;
        xhr.onreadystatechange = function () {
            me.cbReadyStateChange();
        };
        xhr.send(sData);
    };
    /**
     * ファイルをアップロード
     * @param sURL 送信先
     * @param oFormData 送信データ（FormData オブジェクト）
     * @param cbFuncSent ロード完了時のコールバック
     * @param cbFuncSending ロード完了時以外の onreadystatechange のコールバック
     */
    Ajax.prototype.postFile = function (sURL, oFormData, cbFuncSent, cbFuncSending) {
        this.funcSent = cbFuncSent;
        this.funcSending = cbFuncSending;
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open("POST", sURL);
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var me = this;
        xhr.onreadystatechange = function () {
            me.cbReadyStateChange();
        };
        xhr.send(oFormData);
    };
    /**
     * GET, POST のコールバック
     */
    Ajax.prototype.cbReadyStateChange = function () {
        var xhr = this.xhr;
        if (!xhr)
            return;
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Finished loading
            if (this.funcSent) {
                if (xhr.status === 200) {
                    this.funcSent(xhr.responseText);
                }
                else {
                    this.funcSent("Failed to load. status=" + xhr.status);
                }
            }
        }
        else {
            // Still loading
            if (this.funcSending)
                this.funcSending();
        }
    };
    /**
     * ページの URL の取得
     * @param bAsParent 最後の「/」以降を削除
     *     https://example.com/test.php
     *     -> https://example.com/
     * @return URL を表す文字列
     */
    Ajax.getMyURL = function (bAsParent) {
        if (bAsParent === void 0) { bAsParent = true; }
        var sURL = location.href;
        if (bAsParent) {
            return sURL.substring(0, sURL.lastIndexOf("/") + 1);
        }
        else {
            return sURL;
        }
    };
    /**
     * query string などで利用できるように文字列をエンコード
     * @param sTarget 対象文字列
     * @return Base64にエンコードし，+ / = を - * _ に置き換えた文字列
     */
    Ajax.encodeData = function (sTarget) {
        var a = btoa(unescape(encodeURIComponent(sTarget)));
        var ret = '';
        var c;
        for (var i = 0, len = a.length; i < len; i++) {
            c = a.charAt(i);
            switch (c) {
                case '+':
                    ret += '-';
                    break;
                case '/':
                    ret += '*';
                    break;
                case '=':
                    ret += '_';
                    break;
                default:
                    ret += c;
                    break;
            }
        }
        return ret;
    };
    /**
     * HTML タグ等をエスケープ
     * @param sTarget 対象文字列
     */
    Ajax.escapeHTML = function (sTarget) {
        sTarget = sTarget.replace(/&/g, '&amp;');
        sTarget = sTarget.replace(/</g, '&lt;');
        sTarget = sTarget.replace(/>/g, '&gt;');
        sTarget = sTarget.replace(/'/g, '&#x27;');
        sTarget = sTarget.replace(/"/g, '&quot;');
        sTarget = sTarget.replace(/`/g, '&#x60;');
        return sTarget;
    };
    return Ajax;
}());
