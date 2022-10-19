---
Alias: Potato
Date: 5/10/22
Platform: Linux
Difficulty: Easy
Tags: #AnonymousTFPlogin #phpJugglingMagicTricks #BurpsuiteDirectoryTraversalBruteForce
Status: Finished
IP: 
---

# {{Potato}}


# Resolution summary
- Found admin login page from gobuster scan
- Found we were able to login to ftp port 2112 anonymously
- Downloaded index.php.bak file from ftp server
- Found the username and password in the .bak file 
- Found the following string of code in the .bak file "strcmp($_POST['password'], $pass) == 0)" and googled it
- Found Type Juggling PHP Magic tricks
- Utilized Burpsuite when logging into the admin login page with found credentials and  sent the request to repeater
- Followed the steps for th Juggling PHP Magic Tricks and was redirected to a dashboard.php page
- Found a webpage which would pull log.txt files from the machine
- Sent web request/page to intruder in Burpsuite and retreived a cheatsheet/manual ist of directory traversal requests for /etc/passwd/
- Bruteforced the different directory traversal commands for retreiving /etc/passwd and found a hit using intruder in Burpsuite
- Was able to read the /etc/passwd file and retreived a username and hashed password 
- Utilized John to crack the users hash 
- Logged in via SSH session with found credentials

## Improved skills
- PHP Magic Tricks
- Burpsuite intruder directory traversal bruteforcing

## Used tools
- nmap
- gobuster
- rustscan
- burpsuite

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.127.101 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
🌍HACK THE PLANET🌍

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.127.101:22
Open 192.168.127.101:80
Open 192.168.127.101:2112
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.127.101
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-18 13:34 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 13:34
Completed NSE at 13:34, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 13:34
Completed NSE at 13:34, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 13:34
Completed NSE at 13:34, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 13:34
Completed Parallel DNS resolution of 1 host. at 13:34, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 13:34
Scanning 192.168.127.101 [3 ports]
Stats: 0:00:15 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 0.00% done
Discovered open port 80/tcp on 192.168.127.101
Stats: 0:00:30 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 33.33% done; ETC: 13:36 (0:01:00 remaining)
Discovered open port 22/tcp on 192.168.127.101
Discovered open port 2112/tcp on 192.168.127.101
Completed Connect Scan at 13:35, 45.09s elapsed (3 total ports)
Initiating Service scan at 13:35
Scanning 3 services on 192.168.127.101
Completed Service scan at 13:35, 17.65s elapsed (3 services on 1 host)
NSE: Script scanning 192.168.127.101.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 13:35
NSE: [ftp-bounce 192.168.127.101:2112] PORT response: 500 Illegal PORT command
Completed NSE at 13:35, 5.33s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 13:35
Completed NSE at 13:35, 0.83s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 13:35
Completed NSE at 13:35, 0.00s elapsed
Nmap scan report for 192.168.127.101
Host is up, received user-set (0.085s latency).
Scanned at 2022-10-18 13:34:51 PDT for 54s

PORT     STATE SERVICE REASON  VERSION
22/tcp   open  ssh     syn-ack OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 ef:24:0e:ab:d2:b3:16:b4:4b:2e:27:c0:5f:48:79:8b (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDamdAqH2ZyWoYj0tstPK0vbVKI+9OCgtkGDoynffxqV2kE4ceZn77FBuMGFKLU50Uv5RMUTFTX4hm1ijh77KMGG1CmAk2YWvEDhxbCBPCohp+xXMBXHBYoMbEVl/loKL2UW6USnKorOgwxUdoMAwDxIrohGHQ5WNUADRaqt1eHuHxuJ8Bgi8yzqP/26ePQTLCfwAZMq+SYPJedZBmfJJ3Brhb/CGgzgRU8BpJGI8IfBL5791JTn2niEgoMAZ1vdfnSx0m49uk8npd0h5hPQ+ucyMh+Q35lJ1zDq94E24mkgawDhEgmLtb23JDNdY4rv/7mAAHYA5AsRSDDFgmbXEVcC7N1c3cyrwVH/w+zF5SKOqQ8hOF7LRCqv0YQZ05wyiBu2OzbeAvhhiKJteICMuitQAuF6zU/dwjX7oEAxbZ2GsQ66kU3/JnL4clTDATbT01REKJzH9nHpO5sZdebfLJdVfx38qDrlS+risx1QngpnRvWTmJ7XBXt8UrfXGenR3U=
|   256 f2:d8:35:3f:49:59:85:85:07:e6:a2:0e:65:7a:8c:4b (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNoh1z4mRbfROqXjtv9CG7ZYGiwN29OQQCVXMLce4ejLzy+0Bvo7tYSb5PKVqgO5jd1JaB3LLGWreXo6ZY3Z8T8=
|   256 0b:23:89:c3:c0:26:d5:64:5e:93:b7:ba:f5:14:7f:3e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDXv++bn0YEgaoSEmMm3RzCzm6pyUJJSsSW9FMBqvZQ3
80/tcp   open  http    syn-ack Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Potato company
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
2112/tcp open  ftp     syn-ack ProFTPD
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| -rw-r--r--   1 ftp      ftp           901 Aug  2  2020 index.php.bak
|_-rw-r--r--   1 ftp      ftp            54 Aug  2  2020 welcome.msg
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 13:35
Completed NSE at 13:35, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 13:35
Completed NSE at 13:35, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 13:35
Completed NSE at 13:35, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 69.29 seconds

```

Enumerated open TCP ports:
```bash
80
22
2112
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - Apache httpd 2.4.41 ((Ubuntu))

#### -My initial NMAP scan only showed port 22 and 80 open. I was unable to locate anything useful on webpage and robots.txt didn't show anything:

![](Pasted%20image%2020221018163833.png)

![](Pasted%20image%2020221018163902.png)

#### -Ran gobuster scan and only found directory "/admin". Navigated to the admin directory and found the following login web page and attempted to input default like credentials but nothing worked: 

![](Pasted%20image%2020221018164122.png)

![](Pasted%20image%2020221018164331.png)

## Port 2112 - ProFTPD

#### -Ran a general NMAP scan to scan all ports showing services and versions and found port "2112" (which is an FTP server) and shows we can connect anonymously and found file "index.php.bak": Navigated into FTP server with user anonymous and no password for password:

![](Pasted%20image%2020221018164658.png)
![](Pasted%20image%2020221018164838.png)

#### -Downloaded file "index.php.bak" using "mget" command onto my kali machine: 

![](Pasted%20image%2020221018164938.png)

#### -Cat'd file "index.php.bak" and found the following. Then googled "strcmp($_POST['password'], $pass) == 0)" and found the following link which has the syntax "strcmp($_POST['password']" which I used ctrl+f and that syntax on other pages/links I found before the "PHP Magic Tricks: Type Juggling" link: 

![](Pasted%20image%2020221018165212.png)
![](Pasted%20image%2020221018165322.png)
#phpJugglingMagicTricks

#### -The found webpage shows the following to post a password string (e.g "password=password" submit and array "password[ ]=" additionally showing PHP translates POST variables like this to an empty array with quotation marks (" "). So you will need to submit an array with the following {password[ ]=" "}: 

![](Pasted%20image%2020221018165802.png)
![](Pasted%20image%2020221018170047.png)

#### -Started Burp Suite and turned on Foxyproxy. As the username "admin" was found in file "index.php.bak". Typed "admin" into username and "pass" into the password on the /admin login webpage and clicked "login" and sent the POST information to repeater in Burp Suite and which showed the following: 

![](Pasted%20image%2020221018170308.png)
![](Pasted%20image%2020221018170455.png)

![](Pasted%20image%2020221018170532.png)

#### -Changed "password=" to password[ ]=" " and clicked send to send response and found the following response directing me to "dashboard.php": 

![](Pasted%20image%2020221018170641.png)

#### -I then navigated to the "proxy" tab in Burp Suite and input the same password[ ]=" " into the POST information and clicked "forward" and received the following webpage: 

![](Pasted%20image%2020221018170749.png)
![](Pasted%20image%2020221018170837.png)

#### -I then tuned off Foxyproxy and navigated to the "dashboard" link and found the following webpage 

![](Pasted%20image%2020221018170942.png)






---

# Exploitation
## Name of the technique

#### -Found the following "log.txt" file on the web page above and ran Burp Suite and found the following "log.txt" file: 

![](Pasted%20image%2020221018171240.png)

#### -As the log file was found on the server I used "sniper" attack type on "intruder" tab and clicked into "options" tab and copied the following web traversal manual cheat sheet found in web page https://pentestlab.blog/2012/06/29/directory-traversal-cheat-sheet/ and copied and pasted on Burp Suite via the following to bruteforce the "/etc/password" location. Grep'd "1000" as that is a normal number for a user on a linux machine and found the different "2" which is the correct directory traversal to receive the "/etc/password" credentials: 

![](Pasted%20image%2020221018172236.png)
![](Pasted%20image%2020221018172846.png)
![](Pasted%20image%2020221018172931.png)
![](Pasted%20image%2020221018173015.png)
![](Pasted%20image%2020221018173053.png)
#DirectoryTraversalBruteForce

#### -Copied the raw request from the first "2" 1000 found in the bruteforce and pasted into the "proxy" page of burpsuite and clicked "forward" and the following web page came up showing user "webadmin" along with the password hash.  
 
#### -Copied everything after user "webadmin" and before the first colon (which will be the hash) and pasted into a "hash.txt" file in my kali machine: 

![](Pasted%20image%2020221018173305.png)

![](Pasted%20image%2020221018173355.png)

![](Pasted%20image%2020221018173454.png)

#### -Typed "john hash.txt" and cracked the hash finding the password for "webadmin" to be "dragon": 

![](Pasted%20image%2020221018173609.png)

#### -I was unable to login to the admin login page with the credentials found but was able to login to SSH with username webadmin and password dragon: 

![](Pasted%20image%2020221018173704.png)

---

# Privilege Escalation
## Local Enumeration

#### -Typed "sudo –l" I found the user can run sudo on (ALL : ALL) /bin/nice /notes/* : 
![](Pasted%20image%2020221018174853.png)

## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---
