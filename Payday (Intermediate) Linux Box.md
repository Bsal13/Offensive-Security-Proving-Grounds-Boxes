---
Alias: Payday
Date: 5/22/22
Platform: Linux
Difficulty: Intermediate
Tags: #CS-cart
Status: Finished
IP: 192.168.170.39 
---

# {{Payday}}


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
Starting Nmap 7.92 ( https://nmap.org ) at 2022-03-02 17:28 EST 

Nmap scan report for 192.168.170.39 

Host is up (0.18s latency). 

  

PORT    STATE SERVICE     VERSION 

22/tcp  open  ssh         OpenSSH 4.6p1 Debian 5build1 (protocol 2.0) 

80/tcp  open  http        Apache httpd 2.2.4 ((Ubuntu) PHP/5.2.3-1ubuntu6) 

|_http-title: CS-Cart. Powerful PHP shopping cart software 

110/tcp open  pop3        Dovecot pop3d 

|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug) 

|_ssl-date: ERROR: Script execution failed (use -d to debug) 

|_tls-alpn: ERROR: Script execution failed (use -d to debug) 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

|_pop3-capabilities: RESP-CODES CAPA STLS PIPELINING SASL UIDL TOP 

| sslv2:  

|   SSLv2 supported 

|   ciphers:  

|     SSL2_RC4_128_EXPORT40_WITH_MD5 

|     SSL2_RC2_128_CBC_WITH_MD5 

|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5 

|     SSL2_RC4_128_WITH_MD5 

|_    SSL2_DES_192_EDE3_CBC_WITH_MD5 

139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: MSHOME) 

143/tcp open  imap        Dovecot imapd 

|_tls-alpn: ERROR: Script execution failed (use -d to debug) 

|_tls-nextprotoneg: ERROR: Script execution failed (use -d to debug) 

|_ssl-date: ERROR: Script execution failed (use -d to debug) 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

|_imap-ntlm-info: ERROR: Script execution failed (use -d to debug) 

|_sslv2: ERROR: Script execution failed (use -d to debug) 

445/tcp open  netbios-ssn Samba smbd 3.0.26a (workgroup: MSHOME) 

993/tcp open  ssl/imap    Dovecot imapd 

|_ssl-date: 2022-03-02T22:29:25+00:00; +7s from scanner time. 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

|_imap-capabilities: CAPABILITY 

| sslv2:  

|   SSLv2 supported 

|   ciphers:  

|     SSL2_RC4_128_EXPORT40_WITH_MD5 

|     SSL2_RC2_128_CBC_WITH_MD5 

|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5 

|     SSL2_RC4_128_WITH_MD5 

|_    SSL2_DES_192_EDE3_CBC_WITH_MD5 

995/tcp open  ssl/pop3    Dovecot pop3d 

|_ssl-date: 2022-03-02T22:29:24+00:00; +7s from scanner time. 

| ssl-cert: Subject: commonName=ubuntu01/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX 

| Not valid before: 2008-04-25T02:02:48 

|_Not valid after:  2008-05-25T02:02:48 

| sslv2:  

|   SSLv2 supported 

|   ciphers:  

|     SSL2_RC4_128_EXPORT40_WITH_MD5 

|     SSL2_RC2_128_CBC_WITH_MD5 

|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5 

|     SSL2_RC4_128_WITH_MD5 

|_    SSL2_DES_192_EDE3_CBC_WITH_MD5 

Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel 

  

Host script results: 

|_clock-skew: mean: 1h15m08s, deviation: 2h30m03s, median: 6s 

| smb-security-mode:  

|   account_used: guest 

|   authentication_level: user 

|   challenge_response: supported 

|_  message_signing: disabled (dangerous, but default) 

|_smb2-time: Protocol negotiation failed (SMB2) 

| smb-os-discovery:  

|   OS: Unix (Samba 3.0.26a) 

|   Computer name: payday 

|   NetBIOS computer name:  

|   Domain name:  

|   FQDN: payday 

|_  System time: 2022-03-02T17:29:08-05:00 

  

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ . 

Nmap done: 1 IP address (1 host up) scanned in 43.06 seconds 
```

Enumerated open TCP ports:
```bash

```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 80 - Apache httpd 2.2.4

#### --Found directory "/admin/login.php" via nikto scan and advises "may allow user admin accounts to be inserted without proper authentication. Attempt to log in with user 'test' password 'test' to verify."

#### -Navigated to the admin login page and attempted to login in with credentials "test" "test" and "admin" "password" then "admin" "admin" and I was able to login: 

![](Pasted%20image%2020221018124838.png)
![](Pasted%20image%2020221018124945.png)

![](Pasted%20image%2020221018125058.png)
#CS-cart

#### -I also checked the users in the cscart database and found the following users: 

admin, admin 

customer, customer 

#### -Navigated to "upgrade center" and found the current version of CS-Cart it was running was "version 1.3.3": 

![](Pasted%20image%2020221018125237.png)

![](Pasted%20image%2020221018125326.png)

---

# Exploitation
## CS-Cart 1.3.3 Authenticated Remote Command Execution exploit

#### -Ran "searchsploit CS-Cart" and found the following "Authenticated RCE" exploit: 

![](Pasted%20image%2020221018125459.png)

#### -Googled "CS-Cart 1.3.3 Authenticated RCE Github" and found the following link and navigated to it and showed the following steps: 

![](Pasted%20image%2020221018125642.png)

![](Pasted%20image%2020221018125727.png)

#### -Typed "locate webshells" on kali machine and found "/usr/share/webshells/php/php-reverse-shell.php" and typed cat "/usr/share/webshells/php/php-reverse-shell.php" and copied contents into a file called "reverse.phtml" and changed the "ip" and "port" number in script: 

![](Pasted%20image%2020221018125837.png)

![](Pasted%20image%2020221018125919.png)

![](Pasted%20image%2020221018125957.png)

#### -Set up a "penelope" listener on port 80

![](Pasted%20image%2020221018130054.png)

#### -Navigated to "template editor" as the steps previously stated to navigate to

![](Pasted%20image%2020221018130158.png)

#### -Uploaded file "reverse.phtml" 

![](Pasted%20image%2020221018130321.png)

![](Pasted%20image%2020221018130358.png)

#### -Navigated to http://192.168.76.39/skins/reverse.phtml as shown in previous exploit steps other than having my file being named differently and navigated back to penelope listener and received a reverse shell: 

![](../Pasted%20Images/Pasted%20image%2020220521191124.png)

![](Pasted%20image%2020221018130526.png)

---

# Lateral Movement to user
## Local Enumeration

#### -I was able to read the "/etc/passwd" file and found a user patrick 

 

Per previously found users 

customer, customer 

admin, admin 

 

I attempted to ssh with user patrick and tried password patrick 


## Lateral Movement vector
## SSH'd into found username from reading /etc/passwd and password guessing

![](Pasted%20image%2020221018130838.png)

---

# Privilege Escalation
## Local Enumeration

#### -When I typed sudo –l it showed I was able to run all commands with sudo 



## Privilege Escalation vector
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet tortor scelerisque, fringilla sapien sit amet, rhoncus lorem. Nullam imperdiet nisi ut tortor eleifend tincidunt. Mauris in aliquam orci. Nam congue sollicitudin ex, sit amet placerat ipsum congue quis. Maecenas et ligula et libero congue sollicitudin non eget neque. Phasellus bibendum ornare magna. Donec a gravida lacus.

---
