# WSL (Windows Subsystem for Linux)

[WSL 설치 | Microsoft Learn](https://learn.microsoft.com/ko-kr/windows/wsl/install)

[WSL의 고급 설정 구성 | Microsoft Learn](https://learn.microsoft.com/ko-kr/windows/wsl/wsl-config)

## 1. 설치
```
wsl --install
```

## 2. 실행 중인 WSL 버전 확인
```
wsl -l -v
```

## 3. 유효한 배포판 목록 확인
```
wsl -l -o
```

## 4. 추가 배포판 설치
```
wsl --install -d <Distribution Name>
```

## 5. 배포판 삭제
```
wsl --unregister <Distribution Name>
```

## 6. wslconfig
```
C:\Users\<UserName>\.wslconfig

[wsl2]
networkingMode=mirrored
```
```
wsl --shutdown
```
