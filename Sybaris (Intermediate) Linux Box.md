---
Alias: Sybaris
Date: {{date}}
Platform: Linux Box
Difficulty: Intermediate
Tags: #anonymousFTPlogin #FTPwriteabledirectory #htlmy #RedisModules-ExecuteCommands #HackTricksLoadRedisModule 
Status: Finished
IP: 192.168.241.93
---

# {{Sybaris}}


# Resolution summary
- Text
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap
- gobuster

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.241.93 --ulimit 5000                                                                    (master✱) 
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Nmap? More like slowmap.🐢

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.241.93:21
Open 192.168.241.93:22
Open 192.168.241.93:80
Open 192.168.241.93:6379
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-05 18:44 EDT
Initiating Ping Scan at 18:44
Scanning 192.168.241.93 [2 ports]
Completed Ping Scan at 18:44, 0.08s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 18:44
Completed Parallel DNS resolution of 1 host. at 18:44, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 18:44
Scanning 192.168.241.93 [4 ports]
Discovered open port 80/tcp on 192.168.241.93
Discovered open port 21/tcp on 192.168.241.93
Discovered open port 22/tcp on 192.168.241.93
Discovered open port 6379/tcp on 192.168.241.93
Completed Connect Scan at 18:44, 0.08s elapsed (4 total ports)
Nmap scan report for 192.168.241.93
Host is up, received syn-ack (0.078s latency).
Scanned at 2022-05-05 18:44:13 EDT for 0s

PORT     STATE SERVICE REASON
21/tcp   open  ftp     syn-ack
22/tcp   open  ssh     syn-ack
80/tcp   open  http    syn-ack
6379/tcp open  redis   syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.28 seconds



sudo nmap -sC -sV -O 192.168.241.93 -p 21,22,80,6379                                                        (master✱) 
[sudo] password for kali: 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-05 21:03 EDT
Nmap scan report for 192.168.241.93
Host is up (0.084s latency).

PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.2
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxrwxrwx    2 0        0               6 Apr 01  2020 pub [NSE: writeable]
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 192.168.49.241
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.2 - secure, fast, stable
|_End of status
22/tcp   open  ssh     OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 21:94:de:d3:69:64:a8:4d:a8:f0:b5:0a:ea:bd:02:ad (RSA)
|   256 67:42:45:19:8b:f5:f9:a5:a4:cf:fb:87:48:a2:66:d0 (ECDSA)
|_  256 f3:e2:29:a3:41:1e:76:1e:b1:b7:46:dc:0b:b9:91:77 (ED25519)
80/tcp   open  http    Apache httpd 2.4.6 ((CentOS) PHP/7.3.22)
|_http-title: Sybaris - Just another HTMLy blog
| http-robots.txt: 11 disallowed entries 
| /config/ /system/ /themes/ /vendor/ /cache/ 
| /changelog.txt /composer.json /composer.lock /composer.phar /search/ 
|_/admin/
|_http-generator: HTMLy v2.7.5
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: Apache/2.4.6 (CentOS) PHP/7.3.22
6379/tcp open  redis   Redis key-value store 5.0.9
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running (JUST GUESSING): Linux 3.X|4.X|5.X (91%)
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4.4 cpe:/o:linux:linux_kernel:5.1
Aggressive OS guesses: Linux 3.10 - 3.12 (91%), Linux 4.4 (91%), Linux 4.9 (89%), Linux 3.10 - 3.16 (86%), Linux 3.10 - 4.11 (85%), Linux 3.11 - 4.1 (85%), Linux 3.2 - 4.9 (85%), Linux 5.1 (85%)
No exact OS matches for host (test conditions non-ideal).
Service Info: OS: Unix

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 16.61 seconds
```

Enumerated open TCP ports:
```bash
21
80
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 21 - FTP vsftpd 3.0.2

#### -Typed "ftp 192.168.55.93", logged in as anonymous and found writable directory "pub" containing no files:

![](Pasted%20image%2020221109235702.png)
#anonymousFTPlogin #FTPwriteabledirectory

# Port 80 - Apache httpd 2.4.6

#### -Navigated to the targets website and found the following blog page powered by HTMLY:

![](Pasted%20image%2020221109235857.png)
#htlmy

#### -Ran feroxbuster "feroxbuster -u http://192.168.241.93 -C 401 403 405 -x php,txt,json,docx" on kali machine and found the following login page:

![](Pasted%20image%2020221110000023.png)
![](Pasted%20image%2020221110000336.png)

#### -Attempted to login with user "admin" and password "admin". The error message when attempting to login with username admin discloses if it the username provided is found in the database:

![](Pasted%20image%2020221110000432.png)
#LoginWebPageUserDisclosure

# Port 6349 - Redis

#### Googled redis enumeration and came across hacktricks website and found we should be able to upload a redis module to the ftp server as we have write permissions on directory "pub":

![](Pasted%20image%2020221110000655.png)

---

# Exploitation
## Name of the technique

#### -Followed the "Load Redis Module" steps listed in the hacktricks website:

#### -Navigated to "RedisModules-ExecuteCommands" github website and git cloned the repository in kai machine:

![](Pasted%20image%2020221110000832.png)

#### -Navigated to the repository and typed "make" to create the compiled "module.so":

![](Pasted%20image%2020221110000913.png)

![](Pasted%20image%2020221110000948.png)
#RedisModules-ExecuteCommands #HackTricksLoadRedisModule

#### -Navigated to directory "pub" on ftp server and typed "put module.so" to upload the module to the ftp server:

![](Pasted%20image%2020221110001235.png)

#### -Googled "where is the anonymous ftp directory located" and found the following webpage showing it is located in the path "/var/ftp/pub"

![](Pasted%20image%2020221110001330.png)

![](Pasted%20image%2020221110001600.png)

#AnonymousFTPdirectorylocation


---

# Lateral Movement to user
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Lateral Movement vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Privilege Escalation
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---
