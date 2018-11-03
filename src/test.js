import AliApiSign from './lib/sign.js';

const sign = new AliApiSign({
            AccessKeyId: 'accessKeyId',
            AccessKeySecret: 'accessKeySecret',
            SecurityToken: 'securityToken',
            //private params
            Action: 'CreateUploadVideo',
            Title: 'title', 
            FileName: 'nani.mp4'
});

const url = 'http://vod.cn-shanghai.aliyuncs.com/?' + sign.genParamStr();
console.log(url);

const params = sign.genParam();
console.log(params);

