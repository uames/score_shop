FROM reidblomquist/node-mysql-codebuild
MAINTAINER guangcai.ji <uames.ji@gmail.com>
# RUN mkdir -p /usr/share/score

COPY . /usr/share/work/scoreShop

# WORKDIR /usr/share/work/socreShop

# ADD init.sql /root/init.sql
# ADD server.cnf /etc/my.cnf.d/server.cnf
# ADD init.sh /root/init.sh

# RUN chmod +x /usr/share/work/scoreShop/init.sh

# RUN /usr/share/work/scoreShop/init.sh
# RUN mysql < /usr/share/work/scoreShop/init.sql
EXPOSE 3308
EXPOSE 3000

# CMD  npm run resetTables

# docker run --name node-mysql -v /d/work:/usr/share/work -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=shop -p 3308:3306 -p 3000:3000 -d reidblomquist/node-mysql-codebuild
# docker run --name node_mysql -p 3308:3306 -p 3000:3000 -d node-mysql