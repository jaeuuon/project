# Redis (Install Redis on Windows)
[Install Redis on Windows | Docs](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)

## 1. 설치
```
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

## 2. 실행
```
sudo service redis-server start
```

## 3. 연결
```
redis-cli 
127.0.0.1:6379> ping
PONG
```
