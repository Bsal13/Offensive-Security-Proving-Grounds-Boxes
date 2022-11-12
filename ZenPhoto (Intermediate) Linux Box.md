---
Alias: ZenPhoto
Date: {{date}}
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 192.168.241.41
---

# {{ZenPhoto}}


# Resolution summary
- Text
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap
- rustscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.241.41 --ulimit 5000       
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

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.241.41:22
Open 192.168.241.41:23
Open 192.168.241.41:80
Open 192.168.241.41:3306
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-10 18:14 EDT
Initiating Ping Scan at 18:14
Scanning 192.168.241.41 [2 ports]
Completed Ping Scan at 18:14, 0.12s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 18:14
Completed Parallel DNS resolution of 1 host. at 18:14, 0.01s elapsed
DNS resolution of 1 IPs took 0.08s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 18:14
Scanning 192.168.241.41 [4 ports]
Discovered open port 23/tcp on 192.168.241.41
Discovered open port 80/tcp on 192.168.241.41
Discovered open port 22/tcp on 192.168.241.41
Discovered open port 3306/tcp on 192.168.241.41
Completed Connect Scan at 18:14, 0.08s elapsed (4 total ports)
Nmap scan report for 192.168.241.41
Host is up, received syn-ack (0.093s latency).
Scanned at 2022-05-10 18:14:31 EDT for 1s

PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack
23/tcp   open  telnet  syn-ack
80/tcp   open  http    syn-ack
3306/tcp open  mysql   syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 2.97 seconds



sudo nmap -sC -sV -O 192.168.241.41 -p 22,23,80,3306
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-10 18:18 EDT
Nmap scan report for 192.168.241.41
Host is up (0.080s latency).

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 5.3p1 Debian 3ubuntu7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 83:92:ab:f2:b7:6e:27:08:7b:a9:b8:72:32:8c:cc:29 (DSA)
|_  2048 65:77:fa:50:fd:4d:9e:f1:67:e5:cc:0c:c6:96:f2:3e (RSA)
23/tcp   open  ipp     CUPS 1.4
|_http-title: 403 Forbidden
| http-methods: 
|_  Potentially risky methods: PUT
|_http-server-header: CUPS/1.4
80/tcp   open  http    Apache httpd 2.2.14 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.2.14 (Ubuntu)
3306/tcp open  mysql   MySQL (unauthorized)
|_ssl-cert: ERROR: Script execution failed (use -d to debug)
|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug)
|_tls-alpn: ERROR: Script execution failed (use -d to debug)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose|WAP|terminal|printer|firewall
Running (JUST GUESSING): Linux 3.X|2.6.X|2.4.X (95%), HP embedded (94%), IGEL embedded (93%), Kyocera embedded (92%), IPFire 2.X (92%), Check Point embedded (90%)
OS CPE: cpe:/o:linux:linux_kernel:3.2.0 cpe:/o:linux:linux_kernel:2.6.32 cpe:/h:hp:msm410 cpe:/o:linux:linux_kernel:2.6 cpe:/h:igel:ud3 cpe:/h:kyocera:cs-2560 cpe:/o:ipfire:ipfire:2.11 cpe:/o:linux:linux_kernel:2.4
Aggressive OS guesses: Linux 3.2.0 (95%), Linux 2.6.32 (94%), HP MSM410 WAP (94%), Linux 2.6.35 (93%), IGEL UD3 thin client (Linux 2.6) (93%), Kyocera CopyStar CS-2560 printer (92%), IPFire 2.11 firewall (Linux 2.6.32) (92%), DD-WRT v24-sp1 (Linux 2.4) (91%), Linux 2.6.31 - 2.6.32 (91%), DD-WRT v24-sp1 (Linux 2.4.36) (91%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 45.27 seconds
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

#### -Navigated to "target IP" and found the following web page:
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

