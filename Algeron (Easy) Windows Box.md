---
Alias: Algeron
Date: 7/10/2022
Platform: Windows
Difficulty: Easy
Tags: #CVE2019-7214 #RCE #SmarterMailBuild6985
Status: Finished
IP: 192.168.114.65 
---

# {{Algeron}}


# Resolution summary
- SmarterMail server was located
- CVE for SmarterMail was located. 
- Executed the discovered CVE Python Exploit script and obtained a netcat session operating as the NT Authority System.
  
## Used tools
- Rustscan

### **Vulnerability Explanation:** 
Title: SmarterMail Remote Code Execution via Deserialization
Type of Vulnerability: Insecure Deserialization (OWASP Top 10: A8:2017-Insecure Deserialization)
CWE Reference: CWE-502: Deserialization of Untrusted Data
Proposal for CVSS Score: 9.8 (Critical)

    CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
    This score reflects the vulnerability's critical nature, allowing remote attackers to execute arbitrary code without any user interaction or privileges.

Generic Description:

The vulnerability in question affects SmarterMail, a popular mail server software, specifically in its Build 6985. It allows remote attackers to execute arbitrary code on the server where SmarterMail is installed. This can lead to full system compromise. The vulnerability is due to insecure deserialization of user-supplied content, which can be exploited by an attacker by sending specially crafted serialized objects to the server. When the server deserializes these objects, it can execute arbitrary code in the context of the SmarterMail server.
Specific Description:

This Remote Code Execution (RCE) vulnerability is specifically caused by the application's failure to securely deserialize user-supplied data. Insecure deserialization vulnerabilities occur when an application deserializes data from untrusted sources without sufficient validation, leading to the execution of malicious code, denial of service, or other attacks. In the case of SmarterMail Build 6985, attackers can exploit this by sending crafted payloads that, when deserialized, execute arbitrary code with the privileges of the SmarterMail service. This could lead to unauthorized access, data leakage, or full system compromise.

### **Vulnerability Fix:** 
    Patch/Upgrade: The first and most crucial step is to upgrade to the latest version of SmarterMail, where this vulnerability has been fixed. Check the vendor's website for the latest security updates.

    Input Validation: Implement strict input validation to ensure only valid, expected data is processed by the application. This can help mitigate the impact of insecure deserialization vulnerabilities.

    Deserialization Safeguards: Use deserialization mechanisms that allow for the whitelisting of safe classes or the rejection of potentially dangerous classes. Libraries or frameworks that automatically enforce safe deserialization practices should be utilized.

    Regular Security Audits: Conduct regular security audits of your systems and applications to identify and mitigate vulnerabilities. This should include penetration testing and code reviews focused on deserialization vulnerabilities.

    Least Privilege Principle: Run services with the least privileges necessary for functionality. This limits the potential damage from a breach or exploitation of a vulnerability like this one.

    Security Awareness and Training: Educate developers and IT staff on the risks associated with insecure deserialization and other common attack vectors. Promote secure coding practices and the importance of regular updates.

    Monitoring and Anomaly Detection: Implement monitoring and anomaly detection tools to quickly identify unusual activities that could indicate an attack in progress. This can help in early detection and response to security incidents.

By adopting these preventative measures, organizations can significantly reduce the risk associated with the SmarterMail Build 6985 Remote Code Execution vulnerability and enhance their overall security posture against similar threats.

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.114.65 --ulimit 5000                                                                    (master✱) 
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
Open 192.168.114.65:21
Open 192.168.114.65:80
Open 192.168.114.65:135
Open 192.168.114.65:139
Open 192.168.114.65:445
Open 192.168.114.65:9998
Open 192.168.114.65:17001
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-10 02:49 EDT
Initiating Ping Scan at 02:49
Scanning 192.168.114.65 [2 ports]
Completed Ping Scan at 02:49, 0.13s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 02:49
Completed Parallel DNS resolution of 1 host. at 02:49, 0.01s elapsed
DNS resolution of 1 IPs took 0.15s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 02:49
Scanning 192.168.114.65 [7 ports]
Discovered open port 21/tcp on 192.168.114.65
Discovered open port 445/tcp on 192.168.114.65
Discovered open port 139/tcp on 192.168.114.65
Discovered open port 80/tcp on 192.168.114.65
Discovered open port 135/tcp on 192.168.114.65
Discovered open port 17001/tcp on 192.168.114.65
Discovered open port 9998/tcp on 192.168.114.65
Completed Connect Scan at 02:49, 0.09s elapsed (7 total ports)
Nmap scan report for 192.168.114.65
Host is up, received syn-ack (0.086s latency).
Scanned at 2022-07-10 02:49:10 EDT for 0s

PORT      STATE SERVICE      REASON
21/tcp    open  ftp          syn-ack
80/tcp    open  http         syn-ack
135/tcp   open  msrpc        syn-ack
139/tcp   open  netbios-ssn  syn-ack
445/tcp   open  microsoft-ds syn-ack
9998/tcp  open  distinct32   syn-ack
17001/tcp open  unknown      syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 2.85 seconds

nmap -sC -sV -Pn -p 21,80,135,139,445,9998,17001 192.168.114.65                                                (main) 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-10 02:50 EDT
Nmap scan report for 192.168.114.65
Host is up (0.077s latency).

PORT      STATE SERVICE       VERSION
21/tcp    open  ftp           Microsoft ftpd
| ftp-syst: 
|_  SYST: Windows_NT
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
80/tcp    open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
|_http-title: IIS Windows
| http-methods: 
|_  Potentially risky methods: TRACE
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds?
9998/tcp  open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
| uptime-agent-info: HTTP/1.1 400 Bad Request\x0D
| Content-Type: text/html; charset=us-ascii\x0D
| Server: Microsoft-HTTPAPI/2.0\x0D
| Date: Sun, 10 Jul 2022 06:51:11 GMT\x0D
| Connection: close\x0D
| Content-Length: 326\x0D
| \x0D
| <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd">\x0D
| <HTML><HEAD><TITLE>Bad Request</TITLE>\x0D
| <META HTTP-EQUIV="Content-Type" Content="text/html; charset=us-ascii"></HEAD>\x0D
| <BODY><h2>Bad Request - Invalid Verb</h2>\x0D
| <hr><p>HTTP Error 400. The request verb is invalid.</p>\x0D
|_</BODY></HTML>\x0D
| http-title: Site doesn't have a title (text/html; charset=utf-8).
|_Requested resource was /interface/root
17001/tcp open  remoting      MS .NET Remoting services
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2022-07-10T06:51:19
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 78.26 seconds
```

Enumerated open TCP ports:
```bash
21
9998
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## PORT 21

- The scan revealed that the FTP server permitted anonymous login, but the directory listing was unavailable due to a timeout. The HTTP server was running Microsoft IIS 10.0.

## PORT 9998

- When we access "http://192.168.114.65:9998," the following Smartermail login page appears.

![](Images/Pasted%20image%2020221001115950.png)

- We discover the following remote code execution script when we enter "searchsploit smartermail":

![](Images/Pasted%20image%2020221001120543.png)

- When we search for "windows/remote/49216.py" on Google, we come across this EDB exploit:

![](Images/Pasted%20image%2020221001120904.png)

![](Images/Pasted%20image%2020221001120943.png)

- When we search for "2019–7214 github" on Google, we find the following exploit with improved comments:

![](Images/Pasted%20image%2020221001121009.png)

![](Images/Pasted%20image%2020221001121219.png)


---

# Exploitation - SmarterMail Build 6985 - Remote Code Execution (CVE-2019-7214)

- We download the CVE 2019–7214 script to our Kali machine and save it as exploit.py, updating the IP addresses as necessary.

- On our Kali machine, we configure a netcat listener on port 17001.

- On our Kali machine, we input "python3 exploit.py" and receive a reverse shell that executes as nt authority\system.
  
![](Images/Pasted%20image%2020221001121328.png)

---

