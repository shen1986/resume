FROM ubuntu:18.04
LABEL maintainer="shenxf1986@qq.com"
ENV REFRESHED_AT 2019-03-13

RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/mirrors.163.com\/ubuntu\//g' /etc/apt/sources.list
RUN apt-get -qq update && apt-get -qq install nginx

RUN mkdir -p /var/www/html/website
ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/

EXPOSE 80
