# Nginx

[Installing NGINX Open Source | NGINX Documentation](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)

[Configuring NGINX and NGINX Plus as a Web Server | NGINX Documentation](https://docs.nginx.com/nginx/admin-guide/web-server/web-server/)

[NGINX Reverse Proxy | NGINX Documentation](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

[NGINX SSL Termination | NGINX Documentation](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/)

## 1. 설치
```
sudo apt update
sudo apt install nginx
```

## 2. 실행
```
sudo service nginx start
```

## 3. 변경된 설정을 적용
```
sudo service nginx reload
```

## 4. 설정
```
sudo vi /etc/nginx/sites-available/jaeuuon.kr

upstream apis {
	server localhost:8080;
}

server {
	listen 80 default_server;
	listen [::]:80 default_server;

	return 301 https://$host$request_uri;
}

server {
	listen 443 ssl;
	listen [::]:443 ssl;

	root /var/www/html;

	server_name jaeuuon.kr www.jaeuuon.kr;

	ssl_certificate /etc/nginx/ssl/jaeuuon.kr.pem;
	ssl_certificate_key /etc/nginx/ssl/jaeuuon.kr.key;

	location / {
		try_files $uri $uri/ /;
	}

	location /apis/ {
		proxy_pass http://apis;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}
}
```
```
sudo ln -s /etc/nginx/sites-available/jaeuuon.kr /etc/nginx/sites-enabled/
```
```
sudo vi /etc/nginx/nginx.conf

http {
	...
	server_names_hash_bucket_size 64;
	...
}
```
```
sudo nginx -t
```
