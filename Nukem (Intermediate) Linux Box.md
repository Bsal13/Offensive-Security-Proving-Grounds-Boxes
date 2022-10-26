---
Alias: Nukem
Date: 5/20/2022
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 192.168.230.105 
---

# {{Nukem}}


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
rustscan -a 192.168.230.105 --ulimit 5000                                                                   (master✱) 
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
Real hackers hack time ⌛

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.230.105:22
Open 192.168.230.105:80
Open 192.168.230.105:3306
Open 192.168.230.105:5000
Open 192.168.230.105:13000
Open 192.168.230.105:36445
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-17 22:33 EDT
Initiating Ping Scan at 22:33
Scanning 192.168.230.105 [2 ports]
Completed Ping Scan at 22:33, 3.06s elapsed (1 total hosts)
Nmap scan report for 192.168.230.105 [host down, received no-response]
Read data files from: /usr/bin/../share/nmap
Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
Nmap done: 1 IP address (0 hosts up) scanned in 3.35 seconds


nmap -sC -sV -p 22,80,3306,5000,13000,36445 192.168.230.105                                                 (master✱) 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-17 22:35 EDT
Nmap scan report for 192.168.230.105
Host is up (0.078s latency).

PORT      STATE SERVICE     VERSION
22/tcp    open  ssh         OpenSSH 8.3 (protocol 2.0)
| ssh-hostkey: 
|   3072 3e:6a:f5:d3:30:08:7a:ec:38:28:a0:88:4d:75:da:19 (RSA)
|   256 43:3b:b5:bf:93:86:68:e9:d5:75:9c:7d:26:94:55:81 (ECDSA)
|_  256 e3:f7:1c:ae:cd:91:c1:28:a3:3a:5b:f6:3e:da:3f:58 (ED25519)
80/tcp    open  http        Apache httpd 2.4.46 ((Unix) PHP/7.4.10)
|_http-server-header: Apache/2.4.46 (Unix) PHP/7.4.10
|_http-title: Retro Gamming &#8211; Just another WordPress site
|_http-generator: WordPress 5.5.1
3306/tcp  open  mysql?
| fingerprint-strings: 
|   NULL, RPCCheck, RTSPRequest, TLSSessionReq, TerminalServer, WMSRequest: 
|_    Host '192.168.49.230' is not allowed to connect to this MariaDB server
5000/tcp  open  http        Werkzeug httpd 1.0.1 (Python 3.8.5)
|_http-server-header: Werkzeug/1.0.1 Python/3.8.5
|_http-title: 404 Not Found
13000/tcp open  http        nginx 1.18.0
|_http-server-header: nginx/1.18.0
|_http-title: Login V14
36445/tcp open  netbios-ssn Samba smbd 4.6.2
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port3306-TCP:V=7.92%I=7%D=5/17%Time=62845B7F%P=x86_64-pc-linux-gnu%r(NU
SF:LL,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.230'\x20is\x20not\x20al
SF:lowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(RTSPReque
SF:st,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.230'\x20is\x20not\x20al
SF:lowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(RPCCheck,
SF:4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.230'\x20is\x20not\x20allow
SF:ed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(TLSSessionRe
SF:q,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.230'\x20is\x20not\x20all
SF:owed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(TerminalSe
SF:rver,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.230'\x20is\x20not\x20
SF:allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(WMSRequ
SF:est,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.230'\x20is\x20not\x20a
SF:llowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server");

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 67.31 seconds

```

Enumerated open TCP ports:
```bash

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - HTTP (Apache)
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Exploitation
## Name of the technique
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

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
