---
Alias: Squid
Date: 8/31/2022
Platform: Windows
Difficulty: Intermediate
Tags:
Status: Finished
IP: 
---

# {{Squid}}


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
#Nmap 7.92 scan initiated Thu Aug 25 17:18:06 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -oN /home/brian/Downloads/Proving_Grounds/Squid/results/192.168.122.189/scans/_quick_tcp_nmap.txt -oX /home/brian/Downloads/Proving_Grounds/Squid/results/192.168.122.189/scans/xml/_quick_tcp_nmap.xml 192.168.122.189
Nmap scan report for 192.168.122.189
Host is up, received user-set (0.16s latency).
Scanned at 2022-08-25 17:18:07 PDT for 80s
Not shown: 999 filtered tcp ports (no-response)
PORT     STATE SERVICE    REASON  VERSION
3128/tcp open  http-proxy syn-ack Squid http proxy 4.14
|_http-title: ERROR: The requested URL could not be retrieved
|_http-server-header: squid/4.14

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
#Nmap done at Thu Aug 25 17:19:27 2022 -- 1 IP address (1 host up) scanned in 80.17 seconds
```

Enumerated open TCP ports:
```bash
3128
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
# Port 3128 - Squid http proxy 4.14

#### - Navigated to "http://192.168.231.189:3128" and found the following webpage:

![](Pasted%20image%2020221026235704.png)

#### - Googled "port 3128 enumeration" and found the following Hacktricks webpage:

![](Pasted%20image%2020221026235844.png)

#### - Attempted the following steps but I was unsuccessful:

![](Pasted%20image%2020221027001124.png)

#### - Googled "internal port scanner for Squid github" and found the following tool:

![](Pasted%20image%2020221027001302.png)




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
