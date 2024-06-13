# OpenSSL

[OpenSSL로 사설인증서 생성 방법 – 엔지니어의 기록](https://binwrite.com/openssl-certificate/)

## 1. 루트 인증서 키 생성
```
openssl ecparam -out RootCA.key -name prime256v1 -genkey
```

## 2. 루트 인증서 CSR(Certificate Signing Request) 생성
```
openssl req -new -sha256 -key RootCA.key -out RootCA.csr

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:KR
State or Province Name (full name) [Some-State]:Seoul
Locality Name (eg, city) []:Gangdong
Organization Name (eg, company) [Internet Widgits Pty Ltd]:jaeuuon
Organizational Unit Name (eg, section) []:jaeuuon
Common Name (e.g. server FQDN or YOUR name) []:jaeuuon CA
Email Address []:jaeuuon0157@outlook.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

## 3. 자체 서명 루트 인증서 생성
```
openssl x509 -req -sha256 -days 36500 -in RootCA.csr -signkey RootCA.key -out RootCA.crt

Certificate request self-signature ok
subject=C = KR, ST = Seoul, L = Gangdong, O = jaeuuon, OU = jaeuuon, CN = jaeuuon CA, emailAddress = jaeuuon0157@outlook.com
```

## 4. 서버 인증서 키 생성
```
openssl ecparam -out jaeuuon.kr.key -name prime256v1 -genkey
```

## 5. 서버 인증서 CSR(Certificate Signing Request) 생성
```
openssl req -new -sha256 -key jaeuuon.kr.key -out jaeuuon.kr.csr

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:KR
State or Province Name (full name) [Some-State]:Seoul
Locality Name (eg, city) []:Gangdong
Organization Name (eg, company) [Internet Widgits Pty Ltd]:jaeuuon
Organizational Unit Name (eg, section) []:jaeuuon
Common Name (e.g. server FQDN or YOUR name) []:jaeuuon.kr
Email Address []:jaeuuon0157@outlook.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

## 6. 자체 서명 서버 인증서 생성
```
openssl x509 -req -sha256 -days 36500 -in jaeuuon.kr.csr -CA RootCA.crt -CAkey RootCA.key -CAcreateserial -out jaeuuon.kr.crt

Certificate request self-signature ok
subject=C = KR, ST = Seoul, L = Gangdong, O = jaeuuon, OU = jaeuuon, CN = jaeuuon.kr, emailAddress = jaeuuon0157@outlook.com
```

## 7. 루트 인증서를 포함하는 서버 인증서 생성
```
cat jaeuuon.kr.crt RootCA.crt > jaeuuon.kr.pem
```
