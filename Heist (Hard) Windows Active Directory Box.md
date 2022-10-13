---
Alias: Heist
Date: 9/9/2022
Platform: Windows
Difficulty: Hard
Tags:
Status: Finished
IP: 192.168.231.165 
---

# {{Heist}}


# Resolution summary
- Text
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap
- LibreOffice

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.231.165 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
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

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.231.165:53
Open 192.168.231.165:88
Open 192.168.231.165:135
Open 192.168.231.165:139
Open 192.168.231.165:389
Open 192.168.231.165:445
Open 192.168.231.165:464
Open 192.168.231.165:593
Open 192.168.231.165:636
Open 192.168.231.165:3268
Open 192.168.231.165:3269
Open 192.168.231.165:3389
Open 192.168.231.165:5985
Open 192.168.231.165:8080
Open 192.168.231.165:9389
Open 192.168.231.165:49666
Open 192.168.231.165:49669
Open 192.168.231.165:49668
Open 192.168.231.165:49670
Open 192.168.231.165:49672
Open 192.168.231.165:49689
Open 192.168.231.165:49716
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.231.165
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-01 20:18 PDT
Happy 25th Birthday to Nmap, may it live to be 125!
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 20:18
Completed NSE at 20:18, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 20:18
Completed NSE at 20:18, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 20:18
Completed NSE at 20:18, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 20:18
Completed Parallel DNS resolution of 1 host. at 20:18, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 20:18
Scanning 192.168.231.165 [22 ports]
Discovered open port 135/tcp on 192.168.231.165
Discovered open port 139/tcp on 192.168.231.165
Connect Scan Timing: About 11.36% done; ETC: 20:25 (0:05:51 remaining)
Discovered open port 8080/tcp on 192.168.231.165
Discovered open port 53/tcp on 192.168.231.165
Connect Scan Timing: About 20.45% done; ETC: 20:24 (0:04:52 remaining)
Discovered open port 3389/tcp on 192.168.231.165
Discovered open port 445/tcp on 192.168.231.165
Connect Scan Timing: About 29.55% done; ETC: 20:24 (0:04:10 remaining)
Discovered open port 49669/tcp on 192.168.231.165
Discovered open port 49716/tcp on 192.168.231.165
Connect Scan Timing: About 38.64% done; ETC: 20:24 (0:03:34 remaining)
Discovered open port 593/tcp on 192.168.231.165
Discovered open port 88/tcp on 192.168.231.165
Discovered open port 49672/tcp on 192.168.231.165
Connect Scan Timing: About 52.27% done; ETC: 20:24 (0:02:58 remaining)
Discovered open port 3268/tcp on 192.168.231.165
Discovered open port 5985/tcp on 192.168.231.165
Connect Scan Timing: About 61.36% done; ETC: 20:24 (0:02:22 remaining)
Discovered open port 49670/tcp on 192.168.231.165
Discovered open port 49689/tcp on 192.168.231.165
Connect Scan Timing: About 70.45% done; ETC: 20:24 (0:01:47 remaining)
Discovered open port 9389/tcp on 192.168.231.165
Discovered open port 636/tcp on 192.168.231.165
Connect Scan Timing: About 79.55% done; ETC: 20:24 (0:01:13 remaining)
Discovered open port 49668/tcp on 192.168.231.165
Discovered open port 389/tcp on 192.168.231.165
Connect Scan Timing: About 88.64% done; ETC: 20:24 (0:00:40 remaining)
Discovered open port 464/tcp on 192.168.231.165
Discovered open port 3269/tcp on 192.168.231.165
Discovered open port 49666/tcp on 192.168.231.165
Completed Connect Scan at 20:24, 360.18s elapsed (22 total ports)
Initiating Service scan at 20:24
Scanning 22 services on 192.168.231.165
Service scan Timing: About 22.73% done; ETC: 20:26 (0:01:49 remaining)
Service scan Timing: About 31.82% done; ETC: 20:27 (0:02:13 remaining)
Service scan Timing: About 68.18% done; ETC: 20:26 (0:00:45 remaining)
Service scan Timing: About 72.73% done; ETC: 20:27 (0:00:57 remaining)
Service scan Timing: About 81.82% done; ETC: 20:29 (0:00:59 remaining)
Service scan Timing: About 90.91% done; ETC: 20:30 (0:00:32 remaining)
Completed Service scan at 20:31, 433.82s elapsed (22 services on 1 host)
NSE: Script scanning 192.168.231.165.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 20:31
NSE Timing: About 98.13% done; ETC: 20:32 (0:00:01 remaining)
NSE Timing: About 99.23% done; ETC: 20:32 (0:00:00 remaining)
Completed NSE at 20:32, 76.54s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 20:32
Completed NSE at 20:33, 5.90s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 20:33
Completed NSE at 20:33, 0.00s elapsed
Nmap scan report for 192.168.231.165
Host is up, received user-set (0.16s latency).
Scanned at 2022-09-01 20:18:42 PDT for 861s

PORT      STATE SERVICE       REASON  VERSION
53/tcp    open  domain        syn-ack Simple DNS Plus
88/tcp    open  kerberos-sec  syn-ack Microsoft Windows Kerberos (server time: 2022-09-02 03:24:40Z)
135/tcp   open  msrpc         syn-ack Microsoft Windows RPC
139/tcp   open  netbios-ssn   syn-ack Microsoft Windows netbios-ssn
389/tcp   open  ldap          syn-ack Microsoft Windows Active Directory LDAP (Domain: heist.offsec0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds? syn-ack
464/tcp   open  kpasswd5?     syn-ack
593/tcp   open  ncacn_http    syn-ack Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped    syn-ack
3268/tcp  open  ldap          syn-ack Microsoft Windows Active Directory LDAP (Domain: heist.offsec0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped    syn-ack
3389/tcp  open  ms-wbt-server syn-ack Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: HEIST
|   NetBIOS_Domain_Name: HEIST
|   NetBIOS_Computer_Name: DC01
|   DNS_Domain_Name: heist.offsec
|   DNS_Computer_Name: DC01.heist.offsec
|   DNS_Tree_Name: heist.offsec
|   Product_Version: 10.0.17763
|_  System_Time: 2022-09-02T03:32:54+00:00
| ssl-cert: Subject: commonName=DC01.heist.offsec
| Issuer: commonName=DC01.heist.offsec
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2022-07-17T22:04:25
| Not valid after:  2023-01-16T22:04:25
| MD5:   73c5 30c0 df09 668f d701 ff17 6129 0493
| SHA-1: 74b0 f22f 5449 5d47 b100 4ffe 266d c51c 8d9b 2d5d
| -----BEGIN CERTIFICATE-----
| MIIC5jCCAc6gAwIBAgIQbNn2IUrUjY9PdO2Odd610zANBgkqhkiG9w0BAQsFADAc
| MRowGAYDVQQDExFEQzAxLmhlaXN0Lm9mZnNlYzAeFw0yMjA3MTcyMjA0MjVaFw0y
| MzAxMTYyMjA0MjVaMBwxGjAYBgNVBAMTEURDMDEuaGVpc3Qub2Zmc2VjMIIBIjAN
| BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvFxcdBIGl7TjIoHZGdLV9Kzu+4o4
| e/p2hQj8A8ES3sVFiWDjJRQtGueQIYjIe6iUjAvwURU/okUe1DGUTKpelabApuVi
| kbQnnlGxOXdisdfqt+p5spSeq4/qB5B/OCC+/5ZgtARhtUTKoDP8WECwMrORQr8x
| nqQlpDdus7SXsJrDhv2f29YCDsN0oyd0f6x1LUuJE1glGb/nBJcYtU+npaYJbe7W
| 1FD/i5LUR3tS1D89Fa9jjjoCdo5Zknb+vdXiMGPlsIgBVoNqVdd6gqmO6bIX0J/I
| PL2txQKwcuK7p+9jFc+G6sbHQHyGUyx4T0GP2lCRvosXVNA/v/1Miuu59QIDAQAB
| oyQwIjATBgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBDAwDQYJKoZIhvcN
| AQELBQADggEBAF+bP5Z/SwmiKeDOmwTXIBHPY5cvhDQCSsLXkSYSlrPB4X2KggaK
| IA473Gnx8X0mm3OR/GN6u4a8OrgEKOhA4IFkv2GWE03zX5OIFy5o/mEtFeOMvfOc
| 0XgLjzBFp15r54UqrT+ZlDTx4ktcdy6Or7pqStwp/OZkVz8JSRXXMDG9t6bRWcA/
| 0pGkPcxYoMr35RSjsh/TkQaySnORugXbggeyWm+yv3EGQEyXQpB/84jl64+WnQCW
| ZG44P4PfAWOxeDlaoY46thr/9OZuPU9FBERGzyrK1zlz8yTUEVvRzHqtkVuJ//IE
| ulwyR0DC8nLrOAqTOXttifFW8fsf6qFRnjQ=
|_-----END CERTIFICATE-----
|_ssl-date: 2022-09-02T03:33:01+00:00; -1s from scanner time.
5985/tcp  open  http          syn-ack Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
8080/tcp  open  http          syn-ack Werkzeug httpd 2.0.1 (Python 3.9.0)
| http-methods: 
|_  Supported Methods: HEAD GET OPTIONS
|_http-server-header: Werkzeug/2.0.1 Python/3.9.0
|_http-title: Super Secure Web Browser
9389/tcp  open  mc-nmf        syn-ack .NET Message Framing
49666/tcp open  msrpc         syn-ack Microsoft Windows RPC
49668/tcp open  msrpc         syn-ack Microsoft Windows RPC
49669/tcp open  msrpc         syn-ack Microsoft Windows RPC
49670/tcp open  ncacn_http    syn-ack Microsoft Windows RPC over HTTP 1.0
49672/tcp open  msrpc         syn-ack Microsoft Windows RPC
49689/tcp open  msrpc         syn-ack Microsoft Windows RPC
49716/tcp open  msrpc         syn-ack Microsoft Windows RPC
Service Info: Host: DC01; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2022-09-02T03:32:40
|_  start_date: N/A
|_clock-skew: mean: 0s, deviation: 0s, median: 0s
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 56666/tcp): CLEAN (Timeout)
|   Check 2 (port 39499/tcp): CLEAN (Timeout)
|   Check 3 (port 11903/udp): CLEAN (Timeout)
|   Check 4 (port 7767/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 20:33
Completed NSE at 20:33, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 20:33
Completed NSE at 20:33, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 20:33
Completed NSE at 20:33, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 876.72 seconds







nmap -sC -sV -p 53,88,135,139,445,464,593,636,3268,3269,3389,5985,8080,9389,49666,49669,49668,49670,49672,49689,49716 192.168.231.165 -Pn
Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-01 20:26 PDT
Stats: 0:00:13 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 61.90% done; ETC: 20:27 (0:00:08 remaining)
Stats: 0:00:17 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 71.43% done; ETC: 20:27 (0:00:06 remaining)
Stats: 0:00:22 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 71.43% done; ETC: 20:27 (0:00:08 remaining)
Stats: 0:00:27 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 71.43% done; ETC: 20:27 (0:00:11 remaining)
Stats: 0:00:46 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 71.43% done; ETC: 20:27 (0:00:18 remaining)
Nmap scan report for 192.168.231.165
Host is up (0.15s latency).

PORT      STATE SERVICE       VERSION
53/tcp    open  domain        Simple DNS Plus
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos (server time: 2022-09-02 03:26:48Z)
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds?
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped
3268/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: heist.offsec0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
|_ssl-date: 2022-09-02T03:28:18+00:00; -1s from scanner time.
| rdp-ntlm-info: 
|   Target_Name: HEIST
|   NetBIOS_Domain_Name: HEIST
|   NetBIOS_Computer_Name: DC01
|   DNS_Domain_Name: heist.offsec
|   DNS_Computer_Name: DC01.heist.offsec
|   DNS_Tree_Name: heist.offsec
|   Product_Version: 10.0.17763
|_  System_Time: 2022-09-02T03:27:40+00:00
| ssl-cert: Subject: commonName=DC01.heist.offsec
| Not valid before: 2022-07-17T22:04:25
|_Not valid after:  2023-01-16T22:04:25
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
8080/tcp  open  http          Werkzeug httpd 2.0.1 (Python 3.9.0)
|_http-server-header: Werkzeug/2.0.1 Python/3.9.0
|_http-title: Super Secure Web Browser
9389/tcp  open  mc-nmf        .NET Message Framing
49666/tcp open  msrpc         Microsoft Windows RPC
49668/tcp open  msrpc         Microsoft Windows RPC
49669/tcp open  msrpc         Microsoft Windows RPC
49670/tcp open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
49672/tcp open  msrpc         Microsoft Windows RPC
49689/tcp open  msrpc         Microsoft Windows RPC
49716/tcp open  msrpc         Microsoft Windows RPC
Service Info: Host: DC01; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2022-09-02T03:27:41
|_  start_date: N/A
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled and required

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 101.06 seconds
```

Enumerated open TCP ports:
```bash

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - Apache httpd 2.4.48


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