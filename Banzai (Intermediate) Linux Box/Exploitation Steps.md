#### -Navigated to "/usr/share/seclists/Passwords/ftp-betterdefaultpasslist.txt" and cat'd the file and placed the usernames:passwords into a file named "ftp_common_passwords.txt"

![](../Images/Pasted%20image%2020220605134715.png)
![](../Images/Pasted%20image%2020220605134810.png)
![](../Images/Pasted%20image%2020220605134818.png)

#### -Typed "hydra -f -C ftp_common_passwords.txt 192.168.177.56 ftp" which "-C" flag allows inputting a username and password with the following combo list:
"username:password" and found ftp server username is "admin" and password is "admin"

![](../Images/Pasted%20image%2020220605134846.png)

#### -Logged into ftp server with username "admin" and password "admin" and found directory "/js" found accessible in the gobuster scan above:

![](../Images/Pasted%20image%2020220605134936.png)

#### -Typed "lcd" in ftp server and found I was in local directory "/home/kali":

![](../Images/Pasted%20image%2020220605135123.png)

#### -Created php pentest reverse shell script in vim file named "reverse_shell.php" on my kali machine in the "/home/kali"directory

#### -Navigated to directory "/js" in ftp server:

#### -Typed "mput reverse_shell.php" to upload the reverse shell into the ftp server on directory "/js":

![](../Images/Pasted%20image%2020220605135414.png)

#### -Navigated to http://192.168.143.56:8295/js/ and found the reverse shell uploaded on the page and clicked the link and received a reverse shell on penelope:

![](../Images/Pasted%20image%2020220605135439.png)
![](../Images/Pasted%20image%2020220605135448.png)