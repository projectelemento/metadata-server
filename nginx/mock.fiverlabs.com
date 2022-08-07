server {
        listen 80;
        listen [::]:80;

        server_name mock.fiverlabs.xyz;

        location / {
                proxy_pass http://localhost:3000
        }
}