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

## 4. requirepass
```
sudo vi /etc/redis/redis.conf

...
requirepass foobared
...

sudo service redis-server restart
```
```
redis-cli

127.0.0.1:6379> auth default foobared
```

## 5. ACL (Access Control List)
```
sudo vi /etc/redis/redis.conf

...
aclfile /etc/redis/users.acl
...

sudo touch /etc/redis/users.acl
sudo service redis-server restart
```
```
redis-cli

127.0.0.1:6379> acl setuser jaeuuon on >password ~* resetchannels +@all
127.0.0.1:6379> acl setuser default on >password ~* resetchannels -@all +@connection
127.0.0.1:6379> auth jaeuuon password
127.0.0.1:6379> acl save
```
