---
Alias: ClamAV
Date: 5/18/2022
Platform: Linux
Difficulty: Easy
Tags: #Sendmailwithclamav-milter<0.91.2 #RCE
Status: Finished
IP: 192.168.229.42
---

# {{ClamAV}}


# Resolution summary
- Discovered a CLAMAV remote code execution vulnerability
- Using the exploit enabled a connection to a different port.
- Obtained a root shell after running a netcat listener.

## Improved skills
- Exploit enumeration

## Used tools
- nmap
- rustscan

### **Vulnerability Explanation:** 

#### Sendmail with clamav-milter < 0.91.2 -Remote Code Execution Exploit

#### Title: Remote Command Execution in ClamAV-Milter Integration with Sendmail

#### Type of Vulnerability: Remote Command Execution (RCE)

#### CWE Reference: CWE-77: Improper Neutralization of Special Elements used in a Command ('Command Injection')

#### Proposal for CVSS Score: 9.8 (Critical)

- **CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H**
- This score reflects the critical severity of allowing remote attackers to execute arbitrary commands on the server hosting Sendmail with an unpatched version of ClamAV-Milter. The attack does not require local access, user interaction, or special privileges, posing a high risk to confidentiality, integrity, and availability.

#### Generic Description:

The vulnerability affects systems running Sendmail with ClamAV-Milter versions prior to 0.91.2. ClamAV-Milter is used as a mail filter for Sendmail to scan incoming emails for viruses using the ClamAV antivirus engine. This specific vulnerability allows remote attackers to execute arbitrary commands on the system. It is caused by improper input validation and sanitization of email content that is processed by ClamAV-Milter. By crafting a malicious email that exploits this vulnerability, an attacker could execute commands on the host system with the same privileges as the ClamAV-Milter process.

#### Specific Description:

This Remote Command Execution (RCE) vulnerability arises from ClamAV-Milter's handling of certain inputs that are not properly sanitized when processing email messages. Specifically, an attacker can send an email with specially crafted headers or attachments that exploit this flaw, leading to arbitrary command execution on the server running the Sendmail and ClamAV-Milter integration. The commands are executed with the privileges of the user running ClamAV-Milter, which often has sufficient permissions to compromise the server's security, access sensitive information, install malware, or create backdoors for persistent access.

### **Vulnerability Fix:** 

#### Sendmail with clamav-milter < 0.91.2 -Remote Code Execution Exploit

1. **Upgrade ClamAV-Milter:** Immediately upgrade to ClamAV-Milter version 0.91.2 or later. This version includes patches that address the vulnerability by properly sanitizing and validating input before processing.
    
2. **Patch Sendmail if Necessary:** Ensure that Sendmail is also running a version that is patched against known vulnerabilities, as attackers may use complex attacks that exploit vulnerabilities in multiple components.
    
3. **Restrict Email Processing:** If possible, restrict the processing of emails to only those that must be accepted, and reject emails from unknown or suspicious sources at the SMTP level.
    
4. **Implement Additional Mail Filters:** Use additional email filtering solutions that can provide another layer of security by detecting and blocking malicious emails before they reach ClamAV-Milter.
    
5. **Regularly Update Antivirus Definitions:** Keep ClamAV's antivirus definitions up to date to detect and prevent the latest known threats from impacting your system.
    
6. **Monitor and Audit:** Implement comprehensive logging and monitoring for incoming email traffic and system activities related to Sendmail and ClamAV-Milter. Regularly audit these logs for suspicious activities.
    
7. **Educate Users:** Educate users about the risks of phishing and malicious emails. Encourage them to report suspicious emails to the IT department.
    
8. **Backup and Disaster Recovery:** Maintain regular backups of critical data and have a disaster recovery plan in place to minimize damage in case of a successful attack.
    

By following these remediation steps, administrators can protect their systems against the exploitation of this vulnerability in ClamAV-Milter and ensure the integrity and security of their email infrastructure.


---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.145.42 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
🌍HACK THE PLANET🌍

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.145.42:22
Open 192.168.145.42:25
Open 192.168.145.42:80
Open 192.168.145.42:139
Open 192.168.145.42:199
Open 192.168.145.42:445
Open 192.168.145.42:60000
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.145.42
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-07 10:08 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:08
Completed NSE at 10:08, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:08
Completed NSE at 10:08, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:08
Completed NSE at 10:08, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 10:08
Completed Parallel DNS resolution of 1 host. at 10:08, 8.01s elapsed
DNS resolution of 1 IPs took 8.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 3, CN: 0]
Initiating Connect Scan at 10:08
Scanning 192.168.145.42 [7 ports]
Stats: 0:00:23 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 0.00% done
Discovered open port 25/tcp on 192.168.145.42
Stats: 0:00:38 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 14.29% done; ETC: 10:12 (0:03:00 remaining)
Discovered open port 80/tcp on 192.168.145.42
Discovered open port 139/tcp on 192.168.145.42
Connect Scan Timing: About 50.00% done; ETC: 10:10 (0:01:00 remaining)
Discovered open port 22/tcp on 192.168.145.42
Discovered open port 445/tcp on 192.168.145.42
Discovered open port 199/tcp on 192.168.145.42
Discovered open port 60000/tcp on 192.168.145.42
Completed Connect Scan at 10:10, 105.16s elapsed (7 total ports)
Initiating Service scan at 10:10
Scanning 7 services on 192.168.145.42
Completed Service scan at 10:11, 31.46s elapsed (7 services on 1 host)
NSE: Script scanning 192.168.145.42.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:11
NSE Timing: About 99.90% done; ETC: 10:11 (0:00:00 remaining)
Completed NSE at 10:11, 39.24s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:11
Completed NSE at 10:11, 1.68s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:11
Completed NSE at 10:11, 0.00s elapsed
Nmap scan report for 192.168.145.42
Host is up, received user-set (0.15s latency).
Scanned at 2022-10-07 10:09:12 PDT for 163s

PORT      STATE SERVICE     REASON  VERSION
22/tcp    open  ssh         syn-ack OpenSSH 3.8.1p1 Debian 8.sarge.6 (protocol 2.0)
| ssh-hostkey: 
|   1024 30:3e:a4:13:5f:9a:32:c0:8e:46:eb:26:b3:5e:ee:6d (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBALr/RyBq802QXa1Bh4SQEUHqD+p9TEx3SUvPHACbT0tQqR3aali+ifDiOpqMToVaRfWzYOOsoM2Neg0EPa4KsJIwSTkFqjd/3Ynp3Yzus0nN+gtmbQRKzo8QfStr6IGt6kaI6viXl4z3ww6ryEkjNnb74KCooHOjyeGPi3o89GVnAAAAFQDSg0dwMrSn9juW/XPvo8S8kVOhDQAAAIARaqFuvZCqiTY8i/PITsr5WvyZm8mQ0nuqB6gW6y1h4jDAvtHO4TIZEMJ5vtPst0w9mVSYGVFlukhCqhbJdBigqH1WB1p7kwC78M9k23zZmzuwbnzYPiLHpEdfFEWdO62ZoCSFBXWOqe1IZaTaRCgUZPeB1QFXRCQ96VrJizPLUAAAAIEArOALxR78fZrUqmUcYOs5tf8wu5xChAUqAfh1ElJ6r3EjcWwXId12jo1uAz0JmCTluUQhjhNDJB6XIgUzoFzW1NZPjGCkex7s1+2+TUTmqFr6Nr97k2RIy91Bpuxwg5jzE83cKPCOoWVbYlfzAqNkF4xxznfC3fRtmj2e/L9chzg=
|   1024 af:a2:49:3e:d8:f2:26:12:4a:a0:b5:ee:62:76:b0:18 (RSA)
|_ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAviGcDkDxKzv7w++DXy6q+5AJDpG/q8Um8j4BheW9fgwsOvQCuDvLcPUIKMYEz4aUgkt/sSCXu29XTlu79pEkb48+BnaRCKrHLH/YWM79GT6Q5ie9jP47HjjJeCCBI/c02qpkH/fjz9FK4HQPC7WtXY9EgW4IMB+pzX2KZxK2PF0=
25/tcp    open  smtp        syn-ack Sendmail 8.13.4/8.13.4/Debian-3sarge3
| smtp-commands: localhost.localdomain Hello [192.168.49.145], pleased to meet you, ENHANCEDSTATUSCODES, PIPELINING, EXPN, VERB, 8BITMIME, SIZE, DSN, ETRN, DELIVERBY, HELP
|_ 2.0.0 This is sendmail version 8.13.4 2.0.0 Topics: 2.0.0 HELO EHLO MAIL RCPT DATA 2.0.0 RSET NOOP QUIT HELP VRFY 2.0.0 EXPN VERB ETRN DSN AUTH 2.0.0 STARTTLS 2.0.0 For more info use "HELP <topic>". 2.0.0 To report bugs in the implementation send email to 2.0.0 sendmail-bugs@sendmail.org. 2.0.0 For local information send email to Postmaster at your site. 2.0.0 End of HELP info
80/tcp    open  http        syn-ack Apache httpd 1.3.33 ((Debian GNU/Linux))
|_http-title: Ph33r
|_http-server-header: Apache/1.3.33 (Debian GNU/Linux)
| http-methods: 
|   Supported Methods: GET HEAD OPTIONS TRACE
|_  Potentially risky methods: TRACE
139/tcp   open  netbios-ssn syn-ack Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
199/tcp   open  smux        syn-ack Linux SNMP multiplexer
445/tcp   open  netbios-ssn syn-ack Samba smbd 3.0.14a-Debian (workgroup: WORKGROUP)
60000/tcp open  ssh         syn-ack OpenSSH 3.8.1p1 Debian 8.sarge.6 (protocol 2.0)
| ssh-hostkey: 
|   1024 30:3e:a4:13:5f:9a:32:c0:8e:46:eb:26:b3:5e:ee:6d (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBALr/RyBq802QXa1Bh4SQEUHqD+p9TEx3SUvPHACbT0tQqR3aali+ifDiOpqMToVaRfWzYOOsoM2Neg0EPa4KsJIwSTkFqjd/3Ynp3Yzus0nN+gtmbQRKzo8QfStr6IGt6kaI6viXl4z3ww6ryEkjNnb74KCooHOjyeGPi3o89GVnAAAAFQDSg0dwMrSn9juW/XPvo8S8kVOhDQAAAIARaqFuvZCqiTY8i/PITsr5WvyZm8mQ0nuqB6gW6y1h4jDAvtHO4TIZEMJ5vtPst0w9mVSYGVFlukhCqhbJdBigqH1WB1p7kwC78M9k23zZmzuwbnzYPiLHpEdfFEWdO62ZoCSFBXWOqe1IZaTaRCgUZPeB1QFXRCQ96VrJizPLUAAAAIEArOALxR78fZrUqmUcYOs5tf8wu5xChAUqAfh1ElJ6r3EjcWwXId12jo1uAz0JmCTluUQhjhNDJB6XIgUzoFzW1NZPjGCkex7s1+2+TUTmqFr6Nr97k2RIy91Bpuxwg5jzE83cKPCOoWVbYlfzAqNkF4xxznfC3fRtmj2e/L9chzg=
|   1024 af:a2:49:3e:d8:f2:26:12:4a:a0:b5:ee:62:76:b0:18 (RSA)
|_ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAviGcDkDxKzv7w++DXy6q+5AJDpG/q8Um8j4BheW9fgwsOvQCuDvLcPUIKMYEz4aUgkt/sSCXu29XTlu79pEkb48+BnaRCKrHLH/YWM79GT6Q5ie9jP47HjjJeCCBI/c02qpkH/fjz9FK4HQPC7WtXY9EgW4IMB+pzX2KZxK2PF0=
Service Info: Host: localhost.localdomain; OSs: Linux, Unix; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 6h00m01s, deviation: 2h49m45s, median: 3h59m58s
|_smb2-security-mode: Couldn't establish a SMBv2 connection.
|_smb2-time: Protocol negotiation failed (SMB2)
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.14a-Debian)
|   NetBIOS computer name: 
|   Workgroup: WORKGROUP\x00
|_  System time: 2022-10-07T17:11:18-04:00
| nbstat: NetBIOS name: 0XBABE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   0XBABE<00>           Flags: <unique><active>
|   0XBABE<03>           Flags: <unique><active>
|   0XBABE<20>           Flags: <unique><active>
|   WORKGROUP<00>        Flags: <group><active>
|   WORKGROUP<1e>        Flags: <group><active>
| Statistics:
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|_  00 00 00 00 00 00 00 00 00 00 00 00 00 00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: share (dangerous)
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 25198/tcp): CLEAN (Couldn't connect)
|   Check 2 (port 20556/tcp): CLEAN (Couldn't connect)
|   Check 3 (port 4432/udp): CLEAN (Failed to receive data)
|   Check 4 (port 37319/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:11
Completed NSE at 10:11, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:11
Completed NSE at 10:11, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:11
Completed NSE at 10:11, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 185.97 seconds

```

Enumerated open TCP ports:
```bash
25
31337
```

Enumerated top 200 UDP ports:
```bash

```

---

- Given that the challenge is called “ClamAV,” we choose to use searchsploit against it. What we discover is as follows:

![](Images/Pasted%20image%2020221007131752.png)

- We attempt to use the "Sendmail with clamav-milter < 0.91.2-Remote Command Execution" attack as our NMAP scan revealed that port 25 was running the "Sendmail" version.

![](Images/Pasted%20image%2020221007131859.png)

Exploitation
Sendmail with clamav-milter < 0.91.2 -Remote Code Execution Exploit

- We type "cat 4761.pl" to examine the script. It instructs us to supply a host to connect to and displays port 31337

![](Images/Pasted%20image%2020221007132014.png)

- We discover that port 31337 is closed after performing an NMAP scan

![](Images/Pasted%20image%2020221007132057.png)

- As ".pl" is a Perl extension, We type "perl 4761.pl 192.168.229.42" and receive the following output:

![](Images/Pasted%20image%2020221008215215.png)

- We rerun an NMAP scan against port 31337 and discover that it is now open.

![](Images/Pasted%20image%2020221008215315.png)

- We receive a root shell when we type "nc 192.168.229.42 31337":

![](Images/Pasted%20image%2020221008215351.png)

---

