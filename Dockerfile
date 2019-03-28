FROM reidblomquist/node-mysql-codebuild
MAINTAINER guangcai.ji <uames.ji@gmail.com>

COPY . /usr/share/work/scoreShop/

WORKDIR /usr/share/work/scoreShop/

RUN npm install

RUN chmod +x /usr/share/work/scoreShop/init.sh

EXPOSE 3000

CMD /usr/share/work/scoreShop/init.sh && npm run resetTables

# docker build -t node_mysql .
# docker run --name node-mysql -v /d/work:/usr/share/work -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=shop -p 3308:3306 -p 3000:3000 -d reidblomquist/node-mysql-codebuild
# docker run --name nm -p 3000:3000 -d nm