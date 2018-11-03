import uriEncode from 'strict-uri-encode'
import crypto from 'crypto'
import uuid from 'uuid'

const DEBUG = false;
export default class AliApiSign{
    constructor(options) {
        this.options = options;
    }

    genParamStr() {
        let keyArr = Object.keys(this.genParam()).sort();
        let result = new Array();
        for (let i=0; i<keyArr.length; i++) {
            let key = keyArr[i];
            let value = this.options[key];
            if (key === 'AccessKeySecret') {
                continue;
            }
            result.push(uriEncode(key) + '=' + uriEncode(value)); 
        }
        return result.join('&');
    }

    genParam() {
        const publicOptions = {
            Format: 'json',
            Version: '2017-03-21',
            SignatureMethod: 'Hmac-SHA1', 
            SignatureNonce: uuid.v4(),
            SignatureVersion: '1.0',
            Action: '',
            AccessKeyId: '',
            AccessKeySecret: '',
            Timestamp: new Date().toISOString().replace(/\.\d{3}/, ''),
            SecurityToken: '', 
        };

        this.options = Object.assign(publicOptions, this.options);
        if (DEBUG) {
            console.log(this.options);
        }
        
        //0.params sort
        let keyArr = Object.keys(this.options).sort();

        //1.get CQS string
        let encodeCqsStr = this._getCQS(keyArr, true);        

        //2.gen StringToSign
        let stringToSign = this._genStringToSign('GET', encodeCqsStr); 

        //3.Signature
        let signStr = this._hmacSHA1(stringToSign, this.options.AccessKeySecret + '&');
        this.options.Signature = signStr;

        return this.options;
    }

    _genStringToSign(method, cqsStr) {
        return method + '&' + uriEncode('/') + '&' + uriEncode(cqsStr);
    }

    _getCQS(keyArr, isEncode=false) {
        let result = new Array();
        for (let i=0; i<keyArr.length; i++) {
            let key = keyArr[i];
            let value = this.options[key];
            if (key === 'AccessKeySecret') {
                continue;
            }
            if (typeof value !== 'string') {
               value = JSON.stringify(value); 
            }
            if (isEncode) {
                result.push(uriEncode(key) + '=' + uriEncode(value)); 
            } else {
                result.push(key + '=' + value); 
            }
        }
        return result.join('&');
    }
    
    _hmacSHA1(str, key) {
        let hmac = crypto.createHmac('sha1', key)
        hmac.update(str)
        return hmac.digest('base64')
    }
}

