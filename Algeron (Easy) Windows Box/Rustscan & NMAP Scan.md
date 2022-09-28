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