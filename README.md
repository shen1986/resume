<!--
 * @Description: 个人介绍说明文件
 * @Author: shenxf
 * @Date: 2019-03-06 09:17:38
 -->
# 个人介绍页说明
运用已经学到的知识做了一个模板介绍网页,支持手机端查看。

## 如何使用 //TODO
- 个人介绍的模版,只要修改`staticData/resumeData.json`里面的数据就可以让这份介绍变成你自己的介绍
- 如果你考虑到SEO的话，你可以自己修改`index.html`的11~12行，`keywords`是网站搜索关键字，`description`是本网站的简单描述，没有加`h1`标签,如有需要你可以在`logo`里面自己添加。

## 如何部署 //TODO
- 本人部署比较喜欢用Linux系统，会对Linux的部署方式进行简单的讲解。如果你用window server的服务器，请自己去网上搜索IIS部署网站方法非常简单
- 因为我只是做了一个静态网站，所以不需要服务器，只用一个反向代理就可以访问了。
- docker 社区版安装 注意，docker虽然有中文网站，但是里面的安装内容比较老，安装的时候最好看源网站
    + 我用的是CentOS系统 [社区版安装方法](https://docs.docker.com/install/linux/docker-ce/centos/)
- 把我的docker文件放到服务器上。
    + 进入到docker目录，执行`docker build -t shenxf/nginx .`
    + 查看docker镜像`docker images`，检查nginx是否已经安装
    + 运行反向代理`docker run -d -p 3000:80 --name staticweb -v $PWD/website:/var/www/html/website shenxf/nginx nginx`，启动nginx，并且绑定website目录，外部访问端口是3000
    + 把我们的静态页面放入website文件夹
    + 打开对应的网址 www.shenxf.com:3000
## 补充
- 还有一些功能没有完成，如有什么好的点子和想法或则问题的话，可以联系我`shenxf1986@qq.com`
- fullpage 3.0以后要开源许可证了，还要联系作者，以后自己压缩，就先用2.0版本的。