---
Alias: Zino
Date: 6/1/22
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 192.168.108.64
---

# {{Zino}}


# Resolution summary
- Text
- Text

## Improved skills
- skill 1
- skill 2

## Used tools
- nmap
- gobuster

---

# Information Gathering
Scanned all TCP ports:
```bash
# Nmap 7.92 scan initiated Thu Mar 31 03:03:58 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -oN /home/brian/Downloads/ProvingGroundsBoxes/Zino/results/192.168.108.64/scans/_quick_tcp_nmap.txt -oX /home/brian/Downloads/ProvingGroundsBoxes/Zino/results/192.168.108.64/scans/xml/_quick_tcp_nmap.xml 192.168.108.64
Nmap scan report for 192.168.108.64
Host is up, received user-set (0.079s latency).
Scanned at 2022-03-31 03:03:59 PDT for 63s
Not shown: 995 filtered tcp ports (no-response)
PORT     STATE SERVICE     REASON  VERSION
21/tcp   open  ftp         syn-ack vsftpd 3.0.3
22/tcp   open  ssh         syn-ack OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 b2:66:75:50:1b:18:f5:e9:9f:db:2c:d4:e3:95:7a:44 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC44YysvRUv+02vB7LK+DbEvDnTUU2Zzaj42pbyX7gL4I5DhhWWZmK4Sr/MulEE2XPnKhXCCwTVuA12C/VuFhVdnq7WjDwfV+4a1DEuDG8P7wQAux0waAsly34mGtd7HQhQIv9h7nQWcTx8hoOrF6D71eHiZmLJ6fk01VlFN75XKJGn/T/ClJHz9UJ33zwkhqXskMO9At21LfOBE+I3IQCHuFFO6DcQWw/SsZaXQxHNzLqnI/9j1aQuvyuh6KMdT6p10D577maBz+T+Hyq/qeOgbGU0YGAoXXMU36FibkoQ+WwDRYbEHYKJccUXhzFWp980PYCIDtZNaWuo/AbgryLB
|   256 91:2d:26:f1:ba:af:d1:8b:69:8f:81:4a:32:af:9c:77 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBOmcORNC6GjDnH1cqJrCeytZJjGrpJyY+CgseFsH27PJmSbmVYEz0ls0w/oXR0xrG/IfvxxyH9RRX2BIsBTx2cY=
|   256 ec:6f:df:8b:ce:19:13:8a:52:57:3e:72:a3:14:6f:40 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIP9wfKL6wusRXGDMv5Tcf2OxMAIkhvOofRPsrSQ+aMbK
139/tcp  open  netbios-ssn syn-ack Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn syn-ack Samba smbd 4.9.5-Debian (workgroup: WORKGROUP)
3306/tcp open  mysql?      syn-ack
| mysql-info: 
|_  MySQL Error: Host '192.168.49.108' is not allowed to connect to this MariaDB server
| fingerprint-strings: 
|   GetRequest, HELP4STOMP, JMON, LSCP, NULL, SMBProgNeg, TerminalServer, X11Probe, erlang-node, metasploit-msgrpc, minecraft-ping, mongodb, mqtt, pervasive-btrieve, riak-pbc: 
|_    Host '192.168.49.108' is not allowed to connect to this MariaDB server
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port3306-TCP:V=7.92%I=9%D=3/31%Time=62457C95%P=x86_64-pc-linux-gnu%r(NU
SF:LL,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20al
SF:lowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(GetReques
SF:t,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20all
SF:owed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(SMBProgNeg
SF:,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allo
SF:wed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(X11Probe,4D
SF:,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allowed
SF:\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(TerminalServer
SF:,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allo
SF:wed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(HELP4STOMP,
SF:4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allow
SF:ed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(pervasive-bt
SF:rieve,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x2
SF:0allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(mongod
SF:b,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20all
SF:owed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(riak-pbc,4
SF:D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allowe
SF:d\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(metasploit-ms
SF:grpc,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20
SF:allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(minecra
SF:ft-ping,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\
SF:x20allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(erla
SF:ng-node,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\
SF:x20allowed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(mqtt
SF:,4D,"I\0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allo
SF:wed\x20to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(JMON,4D,"I\
SF:0\0\x01\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allowed\x20
SF:to\x20connect\x20to\x20this\x20MariaDB\x20server")%r(LSCP,4D,"I\0\0\x01
SF:\xffj\x04Host\x20'192\.168\.49\.108'\x20is\x20not\x20allowed\x20to\x20c
SF:onnect\x20to\x20this\x20MariaDB\x20server");
Service Info: Host: ZINO; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
 
Host script results:
| smb2-time: 
|   date: 2022-03-31T10:04:22
|_  start_date: N/A
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.9.5-Debian)
|   Computer name: zino
|   NetBIOS computer name: ZINO\x00
|   Domain name: \x00
|   FQDN: zino
|_  System time: 2022-03-31T06:04:24-04:00
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 18634/tcp): CLEAN (Timeout)
|   Check 2 (port 46068/tcp): CLEAN (Timeout)
|   Check 3 (port 21774/udp): CLEAN (Timeout)
|   Check 4 (port 19787/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
|_clock-skew: mean: 1h20m00s, deviation: 2h18m35s, median: 0s

8003/tcp open  http    Apache httpd 2.4.38
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: Index of /
| http-ls: Volume /
| SIZE  TIME              FILENAME
| -     2019-02-05 21:02  booked/
|_
Service Info: Host: 127.0.1.1

 
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Thu Mar 31 03:05:02 2022 -- 1 IP address (1 host up) scanned in 63.96 seconds
```

Enumerated open TCP ports:
```bash
445

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 445 - Samba smbd 4.9.5-Debian

##### -Per NMAP scan port 445 was open. Typed "smbmap -H 192.168.108.64" and found share "zino" which had read permissions to Logs files:

![](Pasted%20image%2020221018230328.png)

#### -Typed "smbmap -R zino -H 192.168.108.64" and found the following files in the "zino" share logs files:

![](Pasted%20image%2020221018230621.png)

#### -Typed "smbmap -R zino -H 192.168.108.64 -A misc.log" as well as every other file listed in the zino share to download to my kali machine:

![](Pasted%20image%2020221018230715.png)

#### -Typed "cat 192.168.108.64-zino_misc.log" and found username "admin" password "adminadmin":

![](Pasted%20image%2020221018230819.png)

#### -Navigated to http://192.168.108.64:8003 as nmap scan showed port 8003 as an http apache server and found the below web page showing file/folder "booked":

![](Pasted%20image%2020221018230914.png)

#### -Clicked on the "booked" link and was navigated to the below web page showing "booked scheduler v2.7.5"

![](Pasted%20image%2020221018231035.png)



---

# Exploitation
## Name of the technique
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Lateral Movement to user
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Lateral Movement vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

# Privilege Escalation
## Local Enumeration
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---

