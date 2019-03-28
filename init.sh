#!/bin/sh
chown -R mysql:mysql /var/lib/mysql

mysqld --user=mysql &

sleep 10

mysql < /usr/share/work/scoreShop/init.sql

# sleep 5

# ps -wef | grep mysql | grep -v grep | awk '{print $2}' | xargs kill -9

# mysqld --user=mysql
