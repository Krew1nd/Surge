#!/usr/bin/env bash

echo -e "\033[41;37m 1.arm64 2.amd64  不输入则默认 arm64 \033[0m"
read type
if [ ! -n "$type" ] || [ "$type" = 1 ]; then
  export architecture=aarch64
else
  export architecture=amd64
fi
mkdir ~/docker-snell
cd ~/docker-snell
echo -e "\033[41;37m 输出文件位于 $PWD \033[0m"
echo -e "\033[41;37m 输入密码 不输入即为 password \033[0m"
read password
echo -e "[snell-server]
listen = ::0:port
psk = $password
ipv6 = true" > snell-server.conf
echo -e "version: '3.8'
services:

  snell:
    image: accors/snell:latest
    container_name: snell
    network_mode: host
    restart: always
    volumes:
      - $PWD/snell-server.conf:/etc/snell-server.conf
    environment:
      - SNELL_URL=https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-amd64.zip" > docker-compose.yml
echo -e "\033[41;37m 启动 snell docker, 有修改配置需求自行修改 \033[0m"
docker compose up -d
echo -e "\033[41;37m 配置如下 \033[0m"
cat $PWD/snell-server.conf
