# aliyun-api-sign
为阿里云api的参数做签名

[阿里云api公共参数](https://help.aliyun.com/document_detail/44432.html?spm=a2c4g.11186623.2.23.519e794eayGWYj)
[签名机制](https://help.aliyun.com/document_detail/44434.html?spm=a2c4g.11186623.2.13.20974bd3lM27eI)

```
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
```

```
npm test
```

```
http://vod.cn-shanghai.aliyuncs.com/?AccessKeyId=accessKeyId&Action=CreateUploadVideo&FileName=nani.mp4&Format=json&SecurityToken=securityToken&Signature=wq%2Fbx76g%2FkWAiwumPOQNQNXBxCM%3D&SignatureMethod=Hmac-SHA1&SignatureNonce=9fe0e14a-0b50-48b7-9468-2db4258abf4a&SignatureVersion=1.0&Timestamp=2018-11-03T13%3A33%3A15Z&Title=title&Version=2017-03-21
{ Format: 'json',
  Version: '2017-03-21',
  SignatureMethod: 'Hmac-SHA1',
  SignatureNonce: '9fe0e14a-0b50-48b7-9468-2db4258abf4a',
  SignatureVersion: '1.0',
  Action: 'CreateUploadVideo',
  AccessKeyId: 'accessKeyId',
  AccessKeySecret: 'accessKeySecret',
  Timestamp: '2018-11-03T13:33:15Z',
  SecurityToken: 'securityToken',
  Title: 'title',
  FileName: 'nani.mp4',
  Signature: 'pfuvo+EqSYm8ZIEp2sJDlteS7ho=' }
```

const url = 'http://vod.cn-shanghai.aliyuncs.com/?' + sign.genParamStr();
console.log(url);

const params = sign.genParam();
console.log(params);
